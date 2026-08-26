#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(repoRoot, "qa", "loop.config.json");
const schemaPath = path.join(repoRoot, "qa", "schemas", "agent-output.schema.json");
const promptsDir = path.join(repoRoot, "prompts");
const referenceDir = path.join(repoRoot, "qa", "reference");
const runsDir = path.join(repoRoot, "qa", "runs");

function usage() {
  console.log(`Usage:
  node scripts/visual-loop.mjs [options]

Options:
  --refresh-reference     Let Scout capture the live site once before comparing.
  --push                  Let Fixer commit and push approved fixes.
  --branch <name>         Automation branch (default: auto/visual-loop).
  --max-iterations <n>    Maximum Scout/Fixer cycles.
  --dry-run               Print the plan without launching agents.
  --run-id <id>           Resume or name a run directory.
  --help                  Show this help.

Examples:
  node scripts/visual-loop.mjs --refresh-reference --max-iterations 3
  node scripts/visual-loop.mjs --push --branch auto/visual-loop --max-iterations 10`);
}

function parseArgs(argv) {
  const args = {
    refreshReference: false,
    push: false,
    dryRun: false,
    branch: null,
    maxIterations: null,
    runId: null
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--refresh-reference") args.refreshReference = true;
    else if (arg === "--push") args.push = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--branch") args.branch = argv[++i];
    else if (arg === "--max-iterations") args.maxIterations = Number(argv[++i]);
    else if (arg === "--run-id") args.runId = argv[++i];
    else throw new Error(`Unknown option: ${arg}`);
  }

  return args;
}

async function readJson(file, fallback = null) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT" && fallback !== null) return fallback;
    throw error;
  }
}

async function writeJson(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

function timestamp() {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function issueKey(report) {
  return (report?.issues || []).map((issue) => issue.id || issue.description || "unknown").sort().join("|");
}

function renderContext({ config, runId, runDir, iteration, push, refreshReference, scoutReport, fixerReport }) {
  return `
## Run context

- Repository: ${repoRoot}
- Local URL: ${config.localUrl}
- Live reference URL: ${config.referenceUrl}
- Reference directory: ${referenceDir}
- Run directory: ${runDir}
- Iteration: ${iteration}
- Maximum issues this iteration: ${config.maxIssuesPerIteration}
- Scout mode: ${config.scoutMode}
- Maximum internal pages to map: ${config.maxInternalPages}
- SCOUT_LIVE_READS_EVERY_ITERATION=${config.scoutLiveReadEveryIteration ? "true" : "false"}
- Viewports: ${JSON.stringify(config.viewports)}
- Scroll checkpoints: ${JSON.stringify(config.scrollCheckpoints)}
- REFRESH_REFERENCE=${refreshReference ? "true" : "false"}
- PUSH_ENABLED=${push ? "true" : "false"}
- AUTOMATION_BRANCH=${config.automationBranch}
- PUSH_REMOTE=${config.pushRemote}

Write reports and evidence only in the paths named above. Return JSON matching the output schema at ${schemaPath}.

### Previous Scout report
${JSON.stringify(scoutReport || null, null, 2)}

### Previous Fixer report
${JSON.stringify(fixerReport || null, null, 2)}
`;
}

function spawnProcess(command, args, options) {
  return new Promise((resolve) => {
    const child = spawn(command, args, options);
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let noOutputTimedOut = false;
    let lastOutputAt = Date.now();
    const timeout = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
    }, options.timeoutMs);
    const noOutputTimeout = setInterval(() => {
      if (Date.now() - lastOutputAt >= options.noOutputTimeoutMs) {
        noOutputTimedOut = true;
        child.kill("SIGTERM");
      }
    }, 5000);
    const heartbeat = setInterval(() => {
      const idleSeconds = Math.floor((Date.now() - lastOutputAt) / 1000);
      options.onHeartbeat?.(idleSeconds);
    }, options.heartbeatMs);

    child.stdout?.on("data", (chunk) => {
      const text = chunk.toString();
      lastOutputAt = Date.now();
      stdout += text;
      options.onStdout?.(text);
    });
    child.stderr?.on("data", (chunk) => {
      const text = chunk.toString();
      lastOutputAt = Date.now();
      stderr += text;
      options.onStderr?.(text);
    });
    child.on("error", (error) => {
      clearTimeout(timeout);
      clearInterval(noOutputTimeout);
      clearInterval(heartbeat);
      resolve({ code: null, stdout, stderr, timedOut, noOutputTimedOut, error: String(error) });
    });
    child.on("close", (code, signal) => {
      clearTimeout(timeout);
      clearInterval(noOutputTimeout);
      clearInterval(heartbeat);
      resolve({ code, signal, stdout, stderr, timedOut, noOutputTimedOut });
    });
  });
}

function parseAgentOutput(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    const first = raw.indexOf("{");
    const last = raw.lastIndexOf("}");
    if (first >= 0 && last > first) {
      try { return JSON.parse(raw.slice(first, last + 1)); } catch { /* fall through */ }
    }
    return null;
  }
}

async function runAgent(role, context, config, runDir, iteration) {
  const promptFile = path.join(promptsDir, `${role}.md`);
  const prompt = `${await fs.readFile(promptFile, "utf8")}\n${context}`;
  const promptPath = path.join(runDir, `iteration-${String(iteration).padStart(2, "0")}-${role}.prompt.md`);
  const outputPath = path.join(runDir, `iteration-${String(iteration).padStart(2, "0")}-${role}.json`);
  const stdoutPath = path.join(runDir, `iteration-${String(iteration).padStart(2, "0")}-${role}.stdout.log`);
  const stderrPath = path.join(runDir, `iteration-${String(iteration).padStart(2, "0")}-${role}.stderr.log`);

  await fs.writeFile(promptPath, prompt);
  const args = [
    ...config.agent.baseArgs,
    "--cd", repoRoot,
    "--output-schema", schemaPath,
    "--output-last-message", outputPath,
    "-"
  ];
  const result = await spawnProcess(config.agent.command, args, {
    cwd: repoRoot,
    env: { ...process.env },
    stdio: ["pipe", "pipe", "pipe"],
    timeoutMs: config.agent.timeoutMs,
    noOutputTimeoutMs: config.agent.noOutputTimeoutMs,
    heartbeatMs: config.agent.heartbeatMs,
    onStdout: (text) => process.stdout.write(`[${role}] ${text}`),
    onStderr: (text) => process.stderr.write(`[${role}:stderr] ${text}`),
    onHeartbeat: (idleSeconds) => process.stdout.write(`[${role}] still running (${idleSeconds}s without child output)\n`)
  });

  await fs.writeFile(stdoutPath, result.stdout || "");
  await fs.writeFile(stderrPath, result.stderr || "");
  const outputRaw = await fs.readFile(outputPath, "utf8").catch(() => result.stdout.trim());
  const report = parseAgentOutput(outputRaw);

  if (!report) {
    return {
      status: "error",
      summary: `${role} did not return valid JSON`,
      issues: [],
      changed_files: [],
      tests: [],
      error: result.error || result.stderr || result.stdout || (result.noOutputTimedOut ? "agent produced no output within the no-output timeout" : result.timedOut ? "agent timed out" : `exit code ${result.code}`),
      evidence: { promptPath, outputPath, stdoutPath, stderrPath }
    };
  }

  return {
    ...report,
    evidence: { promptPath, outputPath, stdoutPath, stderrPath },
    process: { code: result.code, signal: result.signal, timedOut: result.timedOut }
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }

  const config = await readJson(configPath);
  config.automationBranch = args.branch || config.automationBranch;
  config.maxIterations = args.maxIterations || config.maxIterations;
  const runId = args.runId || `run-${timestamp()}`;
  const runDir = path.join(runsDir, runId);
  const statePath = path.join(runDir, "state.json");
  await fs.mkdir(runDir, { recursive: true });

  const state = await readJson(statePath, {
    runId,
    status: "running",
    iteration: 0,
    stalls: 0,
    history: [],
    startedAt: new Date().toISOString(),
    options: args
  });

  if (args.dryRun) {
    console.log(JSON.stringify({
      mode: "dry-run",
      runId,
      roles: ["orchestrator", "scout", "fixer"],
      maxIterations: config.maxIterations,
      refreshReference: args.refreshReference,
      pushEnabled: args.push,
      branch: config.automationBranch,
      localUrl: config.localUrl,
      referenceUrl: config.referenceUrl,
      runDir
    }, null, 2));
    state.status = "dry_run";
    await writeJson(statePath, state);
    return;
  }

  console.log(`Starting visual loop ${runId}`);
  console.log(`Local: ${config.localUrl}`);
  console.log(`Push enabled: ${args.push ? "yes" : "no"}`);

  let lastScout = null;
  let lastFixer = null;
  let previousIssues = "";
  let refreshReference = args.refreshReference;

  for (let iteration = state.iteration + 1; iteration <= config.maxIterations; iteration += 1) {
    state.iteration = iteration;
    await writeJson(statePath, state);
    console.log(`\nIteration ${iteration}/${config.maxIterations}: Scout`);

    const scoutContext = renderContext({ config, runId, runDir, iteration, push: args.push, refreshReference, scoutReport: lastScout, fixerReport: lastFixer });
    const scout = await runAgent("scout", scoutContext, config, runDir, iteration);
    lastScout = scout;
    refreshReference = false;

    if (scout.status === "clean") {
      state.status = "complete";
      state.completedAt = new Date().toISOString();
      state.history.push({ iteration, scout: scout.summary, status: "clean" });
      await writeJson(statePath, state);
      console.log("Scout reports clean; loop complete.");
      return;
    }
    if (scout.status === "blocked" || scout.status === "error" || !Array.isArray(scout.issues)) {
      state.status = "blocked";
      state.blockedReason = scout.summary || "Scout could not produce a report";
      state.history.push({ iteration, status: "blocked", scout: scout.summary });
      await writeJson(statePath, state);
      console.error(`Loop stopped: ${state.blockedReason}`);
      process.exitCode = 2;
      return;
    }

    const currentIssues = issueKey(scout);
    if (currentIssues && currentIssues === previousIssues) state.stalls += 1;
    else state.stalls = 0;
    previousIssues = currentIssues;
    if (state.stalls >= config.maxStalls) {
      state.status = "blocked";
      state.blockedReason = "The same Scout issues remained unchanged across the stall limit.";
      state.history.push({ iteration, status: "stalled", issueKey: currentIssues });
      await writeJson(statePath, state);
      console.error(`Loop stopped: ${state.blockedReason}`);
      process.exitCode = 2;
      return;
    }

    console.log(`Scout found ${scout.issues.length} issue(s): ${scout.summary}`);
    console.log("Fixer");
    const fixerContext = renderContext({ config, runId, runDir, iteration, push: args.push, refreshReference: false, scoutReport: scout, fixerReport: lastFixer });
    const fixer = await runAgent("fixer", fixerContext, config, runDir, iteration);
    lastFixer = fixer;

    if (fixer.status === "blocked" || fixer.status === "error" || fixer.status === "needs_review" || fixer.status === "no_change") {
      state.status = "blocked";
      state.blockedReason = fixer.summary || "Fixer could not complete the change";
      state.history.push({ iteration, status: "blocked", scout: scout.summary, fixer: fixer.summary });
      await writeJson(statePath, state);
      console.error(`Loop stopped: ${state.blockedReason}`);
      process.exitCode = 2;
      return;
    }

    state.history.push({
      iteration,
      status: "fixed",
      issueKey: currentIssues,
      scout: scout.summary,
      fixer: fixer.summary,
      changedFiles: fixer.changed_files || [],
      commit: fixer.commit || null,
      push: fixer.push || null
    });
    await writeJson(statePath, state);
    console.log(`Fixer completed: ${fixer.summary}`);
  }

  state.status = "max_iterations";
  state.completedAt = new Date().toISOString();
  await writeJson(statePath, state);
  console.log(`Stopped after ${config.maxIterations} iterations; inspect ${statePath}`);
  process.exitCode = 1;
}

main().catch(async (error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
