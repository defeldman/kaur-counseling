const root = document.body.dataset.root || './';

const esc = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));
const link = (path) => `${root}${path}`;
const paras = (items) => items.map((item) => `<p>${esc(item)}</p>`).join('');
const section = (heading, items, className = '') => `<section class="detail-section ${className}"><h2>${esc(heading)}</h2>${paras(items)}</section>`;
const leaf = '<span class="detail-leaf" aria-hidden="true"></span>';

function header() {
  return `<header class="site-header" id="home">
    <a class="brand" href="${link('')}" aria-label="Kaur Counseling, home"><span class="brand-name">Kaur Counseling</span><span class="brand-subtitle">Marriage and Family Therapy, Inc.</span></a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      <a href="${link('')}">Home</a>
      <div class="nav-dropdown"><a class="dropdown-trigger" href="${link('about/')}" aria-haspopup="true" aria-expanded="false">About <span class="nav-chevron">⌄</span></a><div class="nav-dropdown-menu"><div class="nav-dropdown-panel"><a href="${link('about/')}">What to Expect</a><a href="${link('about/cost/')}">Cost of Therapy</a><a href="${link('about/resources/')}">Resources</a></div></div></div>
      <a href="${link('modalities/')}">Modalities</a><a href="${link('get-started/')}">Contact</a>
      <div class="nav-dropdown"><a class="dropdown-trigger" href="${link('#services')}" aria-haspopup="true" aria-expanded="false">Services <span class="nav-chevron">⌄</span></a><div class="nav-dropdown-menu"><div class="nav-dropdown-panel nav-dropdown-services"><a href="${link('services/adhd/')}">ADHD &amp; Late-Stage Diagnosis</a><a href="${link('services/multiculturalism/')}">Multicultural &amp; Cross-Cultural Therapy</a><a href="${link('services/burnout/')}">Burnout</a><a href="${link('services/anxiety-depression/')}">Anxiety &amp; Depression</a><a href="${link('services/transitions/')}">Transitions</a><a href="${link('services/teens/')}">Teens</a></div></div></div>
      <a class="nav-cta" href="${link('get-started/')}">Get Started</a>
    </nav>
    <button class="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="mobile-nav" aria-label="Mobile navigation">
      <a href="${link('')}">Home</a>
      <div class="nav-dropdown"><a class="dropdown-trigger" href="${link('about/')}" aria-haspopup="true" aria-expanded="false">About <span class="nav-chevron">⌄</span></a><div class="nav-dropdown-menu"><div class="nav-dropdown-panel"><a href="${link('about/')}">What to Expect</a><a href="${link('about/cost/')}">Cost of Therapy</a><a href="${link('about/resources/')}">Resources</a></div></div></div>
      <a href="${link('modalities/')}">Modalities</a><a href="${link('get-started/')}">Contact</a>
      <div class="nav-dropdown"><a class="dropdown-trigger" href="${link('#services')}" aria-haspopup="true" aria-expanded="false">Services <span class="nav-chevron">⌄</span></a><div class="nav-dropdown-menu"><div class="nav-dropdown-panel nav-dropdown-services"><a href="${link('services/adhd/')}">ADHD &amp; Late-Stage Diagnosis</a><a href="${link('services/multiculturalism/')}">Multicultural &amp; Cross-Cultural Therapy</a><a href="${link('services/burnout/')}">Burnout</a><a href="${link('services/anxiety-depression/')}">Anxiety &amp; Depression</a><a href="${link('services/transitions/')}">Transitions</a><a href="${link('services/teens/')}">Teens</a></div></div></div>
      <a class="nav-cta" href="${link('get-started/')}">Get Started</a>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="site-footer" id="footer">
    <div class="footer-top"><div class="footer-name">Sohavani Mand,<br />LMFT</div><div class="footer-license">CA LIC.<br />#150884</div><div class="footer-business">Kaur Counseling, Marriage &amp; Family<br />Therapy, Inc.</div><a class="footer-phone" href="tel:+14159305395">415-930-<br />5395</a><div class="footer-nav"><a href="${link('')}">Home</a><a href="${link('about/')}">About</a><a href="${link('#services')}">Services</a><a href="${link('get-started/')}">Contact</a><a href="${link('privacy/')}">Privacy &amp;<br />Disclaimer</a></div></div>
    <div class="footer-bottom"><p>If you are in crisis, call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline) or <strong>911</strong> for emergencies. This site is not monitored 24/7.</p><p>© 2026 Sohavani Mand, LMFT. Confidential by design.</p></div>
  </footer>`;
}

function cta() {
  return `<section class="detail-cta"><p class="eyebrow">A place to begin</p><h2>Ready to start a conversation?</h2><p>Reach out for a free consultation and we’ll begin with wherever you are.</p><a class="button" href="${link('get-started/')}">Get Started <span>↗</span></a></section>`;
}

const pages = {
  about: {
    eyebrow: 'Starting out', title: 'Therapy as a practice in honesty and <em>self love.</em>',
    lede: "I'm a brown, South Asian therapist practicing in San Francisco's Mission District. My work is neurodivergent-affirming and culturally-informed, with a focus on late-diagnosis ADHD in women, burnout, and the quiet weight of living between cultures. You don't have to translate yourself here.",
    body: [
      `<section class="about-sessions"><div><p class="eyebrow">Sessions</p><h2>What to expect</h2></div><div class="about-verification"><a class="button" href="${link('get-started/')}">Get Started</a><p>Verified on Psychology Today</p></div></section>`,
      `<div class="detail-card-grid about-cards"><article class="detail-card"><span class="card-leaf" aria-hidden="true">⌁</span><h3>Our first session</h3>${paras(["In our first session, I'll learn more about what brought you to therapy, get a better understanding of your history and symptoms, and discuss goals. The first four sessions are continued assessment as I get to know you and we build a safe relationship that helps you be honest and authentic."])}</article><article class="detail-card"><span class="card-leaf" aria-hidden="true">⌁</span><h3>How I show up</h3>${paras(["I'm client-led, but I'm not a blank-wall therapist. I'm engaged, having a real conversation with you where I ask questions, share insights, and help you voice and name your experiences. We'll keep checking in about your goals and progress throughout our work together."])}</article><article class="detail-card"><span class="card-leaf" aria-hidden="true">⌁</span><h3>We're a team</h3>${paras(["I work collaboratively. You're the expert on your own life — I just help you see things you might have missed and understand things you might not have had the tools for before. I welcome your feedback, and I aim to tailor the tools and modalities we use to be right for you."])}</article></div>`,
      `<section class="detail-section about-human"><div class="about-human-head"><figure><img src="${link('assets/images/about-portrait.webp')}" alt="Sohavani Mand, LMFT, near the Golden Gate Bridge" loading="lazy" /></figure><div><p class="eyebrow">A little more human</p><h2>A few things about me</h2></div></div><div class="fact-grid"><div><strong>First-gen Indian woman</strong><span>I'm a mix of Indian values, American independence, and a healthy amount of “but why do I have to do it that way?” I've spent a lot of time figuring out which pieces of both cultures actually belong to me, and which ones I'm happy to leave behind.</span></div><div><strong>ADHD brain</strong><span>I know what it's like to have a brain that does things its own way. Learning to work with it instead of constantly fighting it changed a lot for me.</span></div><div><strong>Dog mom</strong><span>I believe dogs make almost everything better. Mine also makes sure I leave the house, get some fresh air, and remember that a little bit of chaos is essential for a well balanced life.</span></div><div><strong>Lifelong learner</strong><span>I'm endlessly curious and will happily go down a completely unnecessary rabbit hole about something I became interested in five minutes ago.</span></div><div><strong>Chocolate fiend</strong><span>If there's chocolate involved, I'm interested. Dandelion Mission hot chocolate is my favorite cold-day drink, and I'm pretty sure I've convinced myself that the walk there makes it healthy.</span></div><div><strong>Duct tape &amp; coffee</strong><span>Because sometimes that's honestly what getting through the day looks like. I won't pretend otherwise.</span></div></div></section>`,
      `<section class="detail-section about-work"><p class="eyebrow">The work</p><h2>How we’ll work together</h2><div class="work-note"><h3>How I work</h3>${paras(["My approach is relational, strengths-based, and collaborative. We'll have check-ins and I'll welcome your feedback. I use evidence-based practices to build insight and help you reach your goals. Sessions are tailored to you and can include art, walks, journaling, mindfulness, and, of course, talk therapy."])}</div><div class="work-note"><h3>What therapy feels like</h3>${paras(["You'll find a safe, nonjudgmental space to set down the weight you've been carrying, yes, even the invisible backpack of expectations. Together we'll unpack the pressure, build usable tools, and create a path that feels lighter and authentic. Our work will be warm and kind, sometimes even a little funny, but always focused on your goals: lightening the load, building confidence, and creating real change."])}</div></section>`,
      `<section class="detail-section about-who"><h2>Who I see</h2><div class="who-card">${paras(["I see individuals, couples, and families, teens through elders. I hold a particular tenderness for clients living between cultures, navigating late-diagnosed neurodivergence, and those quietly carrying burnout. This room welcomes every identity: queer, Black, brown, and all the places in between. You are not asked to translate yourself here."])}</div></section>`,
      `<section class="detail-section credentials"><h2>Training &amp; credentials</h2><ul><li>Licensed Marriage &amp; Family Therapist (LMFT) · CA Lic. #150884</li><li>Master's in Counseling, Sonoma State University</li><li>Six years in practice across private and community settings</li><li>Specialties: ADHD, Immigration &amp; Acculturation, Women's Issues</li><li>Modality training: Attachment-based, CBT, DBT, Relational, Trauma-Focused</li></ul><p>If this feels like the right place to begin, you don't have to figure it out alone.</p></section>`
    ]
  },
  cost: {
    eyebrow: 'The investment', title: 'The cost of individual therapy', lede: 'Private-pay, with a clear path to reimbursement.',
    body: [
      `<figure class="cost-image"><img src="${link('assets/images/cost-flatlay.webp')}" alt="A calm flat lay of a notebook, pen, and tea on a cream linen surface" loading="lazy" /></figure>`,
      section('The cost of individual therapy', ["Therapy is an investment in your relationship with yourself, your people, and the life you're building. I want the practical details to feel clear from the beginning."]),
      `<section class="detail-section"><h2>Session rates</h2><div class="rate-list"><div><span>50-minute individual session</span><strong>$200</strong></div><div><span>80-minute extended session</span><strong>$300</strong></div><div><span>Couples and family sessions · 50 minutes</span><strong>$250</strong></div></div></section>`,
      section('Payment details', ["Payment is due at the time of service. I accept major credit and debit cards and can provide receipts for your records."]),
      section('A superbill for reimbursement', ["I'm out-of-network with insurance plans, but I can provide a superbill after each session. You submit it to your insurance company for possible reimbursement.", "Many clients receive 50–80% of the session fee back, depending on their plan. Call the number on your insurance card to ask about out-of-network mental health benefits, deductibles, and reimbursement rates."]),
      section('Why pay out of pocket?', ["Choosing not to bill insurance means your care stays private and your treatment is shaped by what you need, not by a diagnosis or a limit set by your plan. It's also a way to work at the pace and depth that is right for you."])
    ]
  },
  resources: {
    eyebrow: 'Resources', title: 'A reading list for the <em>curious and healing.</em>', lede: "Books I return to and often share with clients. These aren't homework, just companions for the work we do in the room.", backLabel: '← Back to About', backPath: 'about/',
    body: [
      `<section class="poem-card"><span class="poem-corner poem-corner-top" aria-hidden="true">⌁</span><span class="poem-corner poem-corner-bottom" aria-hidden="true">⌁</span><p class="eyebrow">A poem to sit with</p><h2>The Guest House</h2><div class="poem-preview">This being human is a guest house.<br />Every morning a new arrival.<br />A joy, a depression, a meanness,<br />some momentary awareness comes<br />as an unexpected visitor.</div><div class="poem-full">This being human is a guest house.<br />Every morning a new arrival.<br />A joy, a depression, a meanness,<br />some momentary awareness comes<br />as an unexpected visitor.<br /><br />Welcome and entertain them all!<br />Even if they're a crowd of sorrows,<br />who violently sweep your house<br />empty of its furniture,<br />still, treat each guest honorably.<br /><br />He may be clearing you out<br />for some new delight.<br />The dark thought, the shame, the malice,<br />meet them at the door laughing,<br />and invite them in.<br /><br />Be grateful for whoever comes,<br />because each has been sent<br />as a guide from beyond.</div><p class="poem-credit">Jalaluddin Rumi<br /><span>Translated by Coleman Barks · Scottish Poetry Library</span></p><p class="poem-hint">Hover to read the full poem</p></section>`,
      `<section class="detail-section book-section"><h2>Relationships</h2>${book('Attached', 'Amir Levine &amp; Rachel Heller', 'Practical adult attachment styles.')}${book('Hold Me Tight', 'Sue Johnson', 'Emotionally focused therapy.')}${book('The Seven Principles for Making Marriage Work', 'John Gottman', 'Research-grounded tools.')}${book('I Want This to Work', 'Tracee Sioux', 'A compassionate guide for couples.')}</section>`,
      `<section class="detail-section book-section"><h2>Parenting</h2>${book('The Whole-Brain Child', 'Daniel Siegel &amp; Tina Payne Bryson', 'Understanding the developing mind.')}${book('No-Drama Discipline', 'Daniel Siegel &amp; Tina Payne Bryson', 'Connection before correction.')}${book('Raising an Emotionally Intelligent Child', 'John Gottman', 'Building emotional awareness.')}${book('How to Talk So Kids Will Listen &amp; Listen So Kids Will Talk', 'Adele Faber &amp; Elaine Mazlish', 'A practical classic for connection.')}</section>`,
      `<section class="detail-section book-section"><h2>Self-help</h2>${book('Atomic Habits', 'James Clear', 'Small changes that compound.')}${book('The Gifts of Imperfection', 'Brené Brown', 'A wholehearted way of living.')}${book('No Bad Parts', 'Richard Schwartz', 'Healing through Internal Family Systems.')}</section>`,
      `<section class="detail-section book-section"><h2>Trauma</h2>${book('What My Bones Know', 'Stephanie Foo', 'A memoir of complex trauma and healing.')}</section>`
    ]
  },
  modalities: {
    eyebrow: 'Modalities', title: 'The lenses<br /><em>I work from.</em>', lede: 'No single approach fits every life. These are the frameworks I draw from. Sometimes one at a time, more often woven together, they meet your particular story with both structure and care.',
    body: [
      section('Each one a different way of listening.', [], 'framework-intro'),
      framework('Internal Family Systems', "IFS sees you as a whole inner world, not one self but many parts. There are protectors who work hard to keep you safe, exiles who carry old wounds, and a calm, compassionate core beneath all of it. We get curious about each part rather than trying to silence it.", "I reach for IFS when inner conflict is loud — when one part of you wants rest and another won't stop working, or when harsh self-talk burns beneath the surface. It's especially kind to the over-achievers and the children of immigrants who've learned to perform; here, every part is welcomed, none are exiled."),
      framework('Dialectical Behavior Therapy', "DBT balances two truths at once: you are doing your best, and you can learn to do better. It teaches concrete skills across four pillars — mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness — so that big feelings become something you can move through instead of drown in.", "I use DBT when emotions arrive in waves that feel unmanageable, when a quick escalation pulls you out of yourself, or when relationships keep hitting the same walls. It gives us a shared vocabulary and a toolkit for the moments between sessions, when the work has to be carried alone."),
      framework('Cognitive Behavioral Therapy', "CBT traces the quiet loop between thoughts, feelings, and actions — the stories you tell yourself, and the way they shape what you do next. Together we slow that loop down, examine the beliefs underneath, and gently build thoughts that fit the life you actually want.", "I reach for CBT when anxiety or depression has a specific, repeating shape — the intrusive worry, the inner critic, the spiral at 3 a.m. It's practical and structured, a clarifying companion to the deeper, slower work elsewhere in the room."),
      framework('Art', "Sometimes the truest things don't arrive as words. Art therapy lets image, color, and movement speak first, giving shape to what the thinking mind hasn't found language for, and then we listen to what the art has to tell us.", "I reach for art when words run out, when a feeling is too layered for sentences, or when you've spent a lifetime living in your head and need another door in. No talent required; only a willingness to let something emerge before you explain it."),
      framework('Attachment', "Attachment work listens for the blueprint your earliest bonds left behind — the quiet rules you learned about closeness, worth, and safety. We trace those patterns with care, making the invisible legible so that security can grow where uncertainty once lived.", "I reach for this when the same shape keeps showing up in your relationships — the pull toward distance or the fear of being left, the way connection can feel both longed for and unsafe. It's the lens beneath much of the work, helping you build the steady ground you may not have been handed."),
      `<section class="detail-quote"><p>Curious which lens fits your story?</p><h2>We’ll find the right shape together.</h2><p>Reach out for a free consultation and we’ll begin the conversation.</p><a class="text-link" href="${link('get-started/')}">Get started <span>→</span></a></section>`
    ]
  },
  'get-started': {
    eyebrow: 'Get started', title: 'Are we the <em>right fit?</em>', lede: "I'm glad you're here. Finding the right therapist is such a personal process, and feeling comfortable makes all the difference. Come say hi. Book a 15-minute consultation to chat, ask questions, and see if I'm the right therapist for you.",
    body: [
      `<section class="appointment-card detail-appointment"><h2>Request an appointment</h2>${paras(["Choose a service, share a brief note about what brings you in, and pick a time, all through my secure SimplePractice portal."])}<a class="button" href="https://sohavani-mand.clientsecure.me/widget-redirect?scopeId=b0a05cdc-3559-497f-86e9-4c0eae004bbe&amp;scopeUri=sohavani-mand&amp;scopeGlobal=true&amp;applicationId=7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b&amp;appearance=%7B%22fullScreen%22%3Atrue%7D&amp;contact=false" target="_blank" rel="noreferrer">Request Appointment <span>↗</span></a><small>Opens a secure scheduling window, no email form.</small></section>`,
      `<section class="get-started-office"><div><p class="eyebrow">Office</p><h2>A room in the <em>Mission.</em></h2>${paras(["My office is a calm, private space in the heart of the Mission District, easy to reach by Muni or on foot, with a parking garage attached to the building. You are welcome here exactly as you arrive.", "Virtual sessions are always available, but in-person sessions start October 1st."])}<div class="office-facts"><a href="https://www.google.com/maps/search/?api=1&amp;query=3150%2018th%20St%2C%20Suite%20404%2C%20San%20Francisco%2C%20CA%2094110" target="_blank" rel="noreferrer"><span>⌖</span>3150 18th St, Suite 404, San Francisco, CA 94110 <small>↗</small></a><a href="tel:+14159305395"><span>⌕</span>415-930-5395</a></div></div><div class="map-frame"><iframe title="Map of the Kaur Counseling office" src="https://maps.google.com/maps?q=3150%2018th%20St%2C%20Suite%20404%2C%20San%20Francisco%2C%20CA%2094110&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></section>`
    ], noCta: true
  },
  privacy: {
    eyebrow: 'Legal & privacy', title: 'Privacy, Disclaimer &amp; Crisis Resources', lede: 'Your trust and safety matter. This page explains how your information is handled, the limits of this website, and where to turn if you need immediate help.',
    body: [
      section('If you are in crisis', ["This website is not monitored for emergencies and is not a substitute for urgent care. If you or someone else is in immediate danger, please use the resources below.", "911 for life-threatening emergencies.", "988 Suicide & Crisis Lifeline. Call or text 988, 24/7.", "741741 Crisis Text Line. Text HOME to 741741, 24/7."]),
      section('Professional disclaimer', ["The content on this website is provided for general informational and educational purposes only. It is not medical or mental health advice and does not create a therapist-client relationship between you and Sohavani Mand, LMFT. A therapist-client relationship is formed only after a formal intake, signed informed consent, and the scheduling of a clinical appointment. Please do not rely on this site in place of seeking professional care."]),
      section('Licensee identification', ["Sohavani Mand, Licensed Marriage and Family Therapist (LMFT)", "California License #150884"]),
      section('Website privacy', ["This website does not store protected health information (PHI) directly. Any information you submit through the appointment request form is transmitted to Sohavani Mand's secure practice management system for the purpose of scheduling and intake. Please avoid including sensitive clinical details in your initial request, and do not use this website to communicate emergencies or urgent clinical concerns."]),
      section('Notice of Privacy Practices (summary)', ["As a licensed health care provider, Sohavani Mand, LMFT maintains confidentiality in accordance with HIPAA and California's Confidentiality of Medical Information Act (CMIA). Your protected health information may be used and disclosed for treatment, payment, and health care operations, and as otherwise permitted or required by law. A complete Notice of Privacy Practices is provided to you at the start of care. This online summary is for general awareness and does not replace the full notice."]),
      section('Telehealth', ["Where telehealth is offered, services are provided under a valid California license, with informed consent, disclosure of risks and limitations, and verification of your identity and location at each session, consistent with California law.", "This page provides a general overview and is not legal advice. For questions about your privacy or care, contact the office directly."])
    ], noCta: true
  },
  'services/adhd': service('ADHD & Late-Stage', 'Diagnosis.', 'SPECIALTY', "A diagnosis arriving in adulthood reframes a lifetime. We make sense of the years before: the masking, the shame, the gifts. And we build rhythms that fit the mind you actually have.", [
    ['ADD in women looks different', ["ADHD in women is often missed, minimized, or explained away as anxiety, laziness, or not trying hard enough. Many women become experts at compensating until the strategies stop working." ]],
    ['When the diagnosis arrives later', ["A late diagnosis can bring relief and grief at the same time. It can explain the unfinished projects, the exhaustion, and the sense that everyone else received an instruction manual you never got." ]],
    ['How it shows up', ["Relationships · Rejection sensitivity can make a pause, a tone, or a missed text feel enormous.", "Work & career · You may be capable and praised while privately relying on urgency, overwork, and last-minute adrenaline.", "School & study · You were bright enough to coast, until the structure became more complex than motivation could carry.", "Self-esteem · A running inner monologue can turn ordinary friction into evidence that you are failing.", "Body & food · Forgetting to eat, sleep, or notice your own needs can become part of the rhythm.", "Sex & intimacy · Being distracted, flooded, or disconnected from your body can make closeness harder to access."]],
    ['The grief, and the broken trust in yourself', ["There may be grief for the years you spent blaming yourself, and anger at how hard you had to work to look okay. Part of our work is rebuilding trust with the person who has been carrying all of this." ]],
    ['How we work with it', ["A thousand things at once · We practice turning a storm into one next thing.", "Hyperfocus ↔ overwhelm · We build a rhythm that does not depend on crisis.", "Forgetfulness about what you love · We make room for the interests and people that restore you.", "Time warps and vanishes · We externalize time without turning your life into a punishment.", "The exhaustion of masking · We notice where performing has replaced being.", "The intention-action gap · We separate knowing what to do from having the support to do it.", "You are not a problem to be fixed. Your brain is asking for a different kind of environment."]]
  ]),
  'services/multiculturalism': service('Multicultural & Cross-Cultural Therapy', '', 'SPECIALTY', "When your identity doesn't fit neatly into one box.", [
    ['Multicultural Therapy', ["Living between cultures is a quiet, ongoing negotiation. We hold the grief and the resilience of adaptation, the questions of belonging, and the tension of holding more than one home." ]],
    ['Acculturation & Assimilation Stress', ["You may feel pulled between the values you grew up with and the expectations of the world around you. We can make space for the choices, compromises, and anger that come with finding your own way." ]],
    ['First-Generation & Second-Generation Issues', ["Being the first in your family to move through a particular world can mean carrying responsibility, translation, and pressure that is difficult to explain to anyone else." ]],
    ['Third Culture Kid (TCK) Therapy', ["Home may be a feeling rather than a place. We can explore the disorientation, flexibility, and deep perspective that come from growing up across cultures." ]],
    ['Intergenerational Trauma Therapy', ["We can look at what has been carried forward through family stories, silence, survival strategies, and expectations — without reducing your family or your culture to a diagnosis.", "You do not have to compress yourself into one identity to be understood here."]]
  ]),
  'services/burnout': service('Burnout.', '', 'SPECIALTY', 'The slow creep, and the difficulty of asking for help.', [
    ['The slow creep', ["Burnout rarely arrives all at once. It accretes, quietly, through one more task, one more morning pushed through, one more weekend that disappears. By the time it has a name, it has often been living in you for a long while. My work is to help you listen to what it's telling you, and to rebuild a life that can be sustained." ]],
    ["Why it's so hard to ask for help", ["Burnout doesn't always show up as a complete breakdown. Sometimes it looks like having less energy for things you used to enjoy, needing more effort to get started, or feeling strangely flat even when something good happens. For people who are used to pushing through, it can be especially hard to recognize these changes as signs that something is wrong. You may just think you need to try harder, get more organized, or get back on track — when what you actually need is to recognize that you've been running on empty for a while." ]],
    ['Tending and rebuilding', ["When you're used to measuring your worth by how much you accomplish, needing help can feel like falling short. Rest can feel unearned, and asking for support can bring up shame, guilt, or the fear that you should be able to handle it on your own. But struggling to reach out doesn't mean you're failing. Sometimes, it's part of what happens when you've been carrying too much for too long. Recognizing that you need support isn't giving up — it's finally paying attention.", "We start by listening to what the depletion is asking for. We tend the exhaustion before we touch the goals. Then, slowly and with care, we rebuild a life with margins in it, one with rest and meaning, with permission to be a person rather than only a function.", "Recovery is not a project to optimize. It is a returning."]]
  ]),
  'services/anxiety-depression': service('Anxiety & Depression.', '', 'SPECIALTY', 'Anxiety and depression can look completely different, but both have a way of adding a layer to everyday life that can make everything feel harder than it should.', [
    ['Anxiety', ["Anxiety can keep your mind running long after you want it to stop. It can make decisions feel overwhelming, turn small things into big things, and leave you constantly anticipating what might go wrong." ]],
    ['Depression', ["Depression can make everything feel heavier in a different way. Things that once felt meaningful can feel distant, motivation can disappear, and even basic tasks can take more effort than you have to give." ]],
    ['When they show up together', ["Sometimes they show up together. Sometimes one takes over for a while and the other follows. And sometimes it's hard to explain what's happening at all — you just know that life feels harder than it used to. You don't have to figure it out alone." ]],
    ['How we work with it', ["I'm not here to tell you to “just think positively” or hand you a list of things you should be doing differently. I'm here to meet you where you are, understand what you're carrying, and work through it with you — one piece at a time.", "One piece at a time."]]
  ]),
  'services/transitions': service('Going Through a Transition?', '', 'SPECIALTY', "You don't have to do it alone.", [
    ['You might be navigating…', ["A transition can be chosen, expected, or completely outside your control. It can bring excitement and grief in the same breath, even when it is the change you wanted." ]],
    ['Becoming a Parent', ["The arrival of a child changes your days, your identity, your partnership, and your relationship with your own history. There is room here for the joy and the overwhelm." ]],
    ['Career Changes', ["Whether you are leaving, starting, returning, or questioning your path, we can explore purpose, pressure, and what you want work to make possible." ]],
    ['Moving', ["Relocation can unsettle belonging and routines while asking you to create a home again. We can tend the loss and the possibility together." ]],
    ['Relationship Changes', ["Beginning, ending, deepening, or renegotiating a relationship can bring old patterns into focus. Therapy can help you move with clarity and care." ]],
    ['College & Future Decisions', ["There is no single right way to become an adult. We can slow down the noise of expectations and listen for what feels like yours." ]],
    ['Finding Your Next Chapter', ["Therapy can help you name what is ending, stay connected to what matters, and build a next step that is sustainable rather than simply impressive."]]
  ]),
  'services/teens': service('Therapy for Teens.', '', 'SPECIALTY', "You don't have to have it all figured out.", [
    ['What you might be carrying', ["Being a teenager can mean holding school pressure, friendship shifts, family expectations, and questions about who you are — often while feeling like you are supposed to already know the answers." ]],
    ['School Pressure', ["Grades, comparison, workload, and the fear of disappointing people can turn every assignment into a measure of your worth. We can separate your value from your performance." ]],
    ['College Prep & Application Stress', ["Applications can make the future feel like a deadline. We can make room for uncertainty, pressure, and the possibility that your path does not have to look like anyone else's." ]],
    ["A Safe Adult Who Isn't Your Parent", ["Therapy is a private space with an adult who is not grading you, parenting you, or asking you to take care of their feelings. You can be honest here." ]],
    ['Evolving Friendships & Identity', ["Friendships, identity, body, culture, and belonging can all feel in motion at once. We can get curious about what fits and what no longer does." ]],
    ['ADHD', ["Whether you are newly diagnosed or wondering if ADHD explains more than you thought, we can work with your brain rather than against it." ]],
    ['What you get here:', ["What you share here stays here, with the limits of confidentiality explained clearly. You get a place to slow down, ask hard questions, and be taken seriously while you figure things out."]]
  ])
};

function service(title, italic, eyebrow, lede, sections) {
  const leads = {
    'ADHD & Late-Stage': 'A diagnosis found in adulthood re-reads an entire life.',
    'Burnout.': 'The slow creep, and the difficulty of asking for help.',
    'Anxiety & Depression.': 'Anxiety and depression can look completely different, but both have a way of adding a layer to everyday life that can make everything feel harder than it should.',
    'Multicultural & Cross-Cultural Therapy': "When your identity doesn't fit neatly into one box.",
    'Going Through a Transition?': "You don't have to do it alone.",
    'Therapy for Teens.': "You don't have to have it all figured out."
  };
  const heroBodies = {
    'ADHD & Late-Stage': "An ADHD diagnosis arriving later in life doesn't only name the present. It offers a new language for the past. The relief it can bring is real, and so is the grief that travels beside it. My work is to hold both, and to help you build a life that fits the mind you actually have.",
    'Burnout.': "Burnout rarely arrives all at once. It accretes, quietly, through one more task, one more morning pushed through, one more weekend that disappears. By the time it has a name, it has often been living in you for a long while.",
    'Anxiety & Depression.': "Anxiety can keep your mind running long after you want it to stop. Depression can make everything feel heavier in a different way. You don't have to figure out what is happening alone.",
    'Multicultural & Cross-Cultural Therapy': 'Living between cultures is a quiet, ongoing negotiation. We hold the grief and the resilience of adaptation, the questions of belonging, and the tension of holding more than one home.',
    'Going Through a Transition?': 'A transition can be chosen, expected, or completely outside your control. It can bring excitement and grief in the same breath, even when it is the change you wanted.',
    'Therapy for Teens.': "Being a teenager can mean holding school pressure, friendship shifts, family expectations, and questions about who you are — often while feeling like you are supposed to already know the answers."
  };
  const titleMarkup = `${esc(title)}${italic ? `<br /><em>${esc(italic)}</em>` : ''}`;
  return { eyebrow, title: titleMarkup, lede: leads[title] || lede, heroBody: heroBodies[title] || '', isService: true, body: sections.map(([heading, items], index) => section(heading, items, index % 2 ? 'detail-section-tint' : '') ) };
}

function framework(title, what, why) {
  return `<section class="detail-section framework"><h2>${esc(title)}</h2><div class="framework-copy"><div><p class="eyebrow">What it is</p>${paras([what])}</div><div><p class="eyebrow">When &amp; why I use it</p>${paras([why])}</div></div></section>`;
}

function book(title, author, note) {
  return `<article class="book"><h3>${title}</h3><p class="book-author">${author}</p><p>${note}</p></article>`;
}

function render() {
  const pageId = document.body.dataset.page;
  const page = pages[pageId];
  if (!page) return;
  document.body.classList.add(`page-${pageId.replaceAll('/', '-')}`);
  if (page.isService) document.body.classList.add('page-service');
  document.title = `Sohavani Mand, LMFT | ${pageId === 'privacy' ? 'Privacy' : 'Kaur Counseling'}`;
  const body = page.body.join('');
  const backLabel = page.backLabel || (page.isService ? '← Back to Services' : '← Back to Home');
  const backHref = page.backPath ? link(page.backPath) : (page.isService ? link('#services') : link(''));
  document.getElementById('page-app').innerHTML = `${header()}<main class="detail-page"><div class="detail-shell"><a class="back-link" href="${backHref}">${backLabel}</a><section class="detail-hero">${leaf}<p class="eyebrow">${esc(page.eyebrow)}</p><h1>${page.title}</h1><p class="detail-lede">${esc(page.lede)}</p>${page.heroBody ? `<p class="detail-hero-body">${esc(page.heroBody)}</p>` : ''}</section><div class="detail-content">${body}</div>${page.noCta ? '' : cta()}</div></main>${footer()}`;
}

render();
