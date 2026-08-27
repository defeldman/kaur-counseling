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
      <a href="${link('')}">Home</a><a href="${link('about/')}">About <span class="nav-chevron">⌄</span></a><a href="${link('modalities/')}">Modalities</a><a href="${link('get-started/')}">Contact</a><a href="${link('#services')}">Services <span class="nav-chevron">⌄</span></a><a class="nav-cta" href="${link('get-started/')}">Get Started</a>
    </nav>
    <button class="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="mobile-nav" aria-label="Mobile navigation">
      <a href="${link('')}">Home</a><a href="${link('about/')}">About</a><a href="${link('modalities/')}">Modalities</a><a href="${link('get-started/')}">Contact</a><a href="${link('#services')}">Services</a><a class="nav-cta" href="${link('get-started/')}">Get Started</a>
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
      section('What to expect', ["Therapy is a space to slow down and pay attention to what's happening beneath the surface. We start with your story, your questions, and what you hope will feel different."]),
      `<div class="detail-card-grid"><article class="detail-card"><h3>Our first session</h3>${paras(["Our first session is a conversation, not a test. We'll talk about what brings you in, what you've tried, and what you're hoping for. You don't need to arrive with the right words."])}</article><article class="detail-card"><h3>How I show up</h3>${paras(["Warm, direct, curious, and human. I'll offer compassion, and I'll also gently challenge the patterns that aren't serving you anymore."])}</article><article class="detail-card"><h3>We're a team</h3>${paras(["You are the expert on your life. We'll work collaboratively, at a pace that respects your capacity, to make sense of what's happening and find a way forward."])}</article></div>`,
      `<section class="detail-section"><h2>A few things about me</h2><div class="fact-grid"><div><strong>First-gen Indian woman</strong><span>Living between cultures is part of my story too.</span></div><div><strong>ADHD brain</strong><span>I know the late diagnosis journey personally.</span></div><div><strong>Dog mom</strong><span>Usually accompanied by a little extra fur.</span></div><div><strong>Lifelong learner</strong><span>Still curious, always growing.</span></div><div><strong>Chocolate fiend</strong><span>A reliable source of joy.</span></div><div><strong>Duct tape &amp; coffee</strong><span>Some seasons call for both.</span></div></div></section>`,
      section('How we’ll work together', ["Therapy is not about becoming someone else. It's about getting closer to yourself: your needs, your values, your capacity, and your choices.", "We’ll make room for the parts of you that have been working hard to keep things moving, and build enough safety to try something new."]),
      section('How I work', ["My approach draws from Internal Family Systems, Dialectical Behavior Therapy, Cognitive Behavioral Therapy, attachment, and art. I weave these lenses together rather than asking you to fit into one model."]),
      section('What therapy feels like', ["There will be room for honesty, humor, silence, and the occasional beautifully messy thought. You can bring the version of yourself that is polished, overwhelmed, skeptical, or unsure."]),
      section('Who I see', ["I work with adults, teens, couples, and families, with particular attention to women with late-diagnosis ADHD, people navigating burnout, and clients holding multicultural or first-generation experiences."]),
      section('Training & credentials', ["Licensed Marriage and Family Therapist in California (CA LMFT #150884). My work is grounded in ongoing training, cultural humility, and a commitment to care that is affirming and collaborative."])
    ]
  },
  cost: {
    eyebrow: 'The investment', title: 'The cost of <em>individual therapy.</em>', lede: 'Private-pay, with a clear path to reimbursement.',
    body: [
      section('The cost of individual therapy', ["Therapy is an investment in your relationship with yourself, your people, and the life you're building. I want the practical details to feel clear from the beginning."]),
      `<section class="detail-section"><h2>Session rates</h2><div class="rate-list"><div><span>50-minute individual session</span><strong>$200</strong></div><div><span>80-minute extended session</span><strong>$300</strong></div><div><span>Couples and family sessions · 50 minutes</span><strong>$250</strong></div></div></section>`,
      section('Payment details', ["Payment is due at the time of service. I accept major credit and debit cards and can provide receipts for your records."]),
      section('A superbill for reimbursement', ["I'm out-of-network with insurance plans, but I can provide a superbill after each session. You submit it to your insurance company for possible reimbursement.", "Many clients receive 50–80% of the session fee back, depending on their plan. Call the number on your insurance card to ask about out-of-network mental health benefits, deductibles, and reimbursement rates."]),
      section('Why pay out of pocket?', ["Choosing not to bill insurance means your care stays private and your treatment is shaped by what you need, not by a diagnosis or a limit set by your plan. It's also a way to work at the pace and depth that is right for you."])
    ]
  },
  resources: {
    eyebrow: 'Resources', title: 'A reading list for the <em>curious and healing.</em>', lede: "Books I return to and often share with clients. These aren't homework, just companions for the work we do in the room.",
    body: [
      `<section class="poem-card"><p class="eyebrow">A poem to sit with</p><h2>The Guest House</h2><div class="poem-text">This being human is a guest house.<br />Every morning a new arrival.<br />A joy, a depression, a meanness,<br />some momentary awareness comes<br />as an unexpected visitor.<br /><br />Welcome and entertain them all!<br />Even if they're a crowd of sorrows,<br />who violently sweep your house<br />empty of its furniture,<br />still, treat each guest honorably.<br /><br />He may be clearing you out<br />for some new delight.<br />The dark thought, the shame, the malice,<br />meet them at the door laughing,<br />and invite them in.<br /><br />Be grateful for whoever comes,<br />because each has been sent<br />as a guide from beyond.</div><p class="poem-credit">Jalaluddin Rumi<br /><span>Translated by Coleman Barks · Scottish Poetry Library</span></p></section>`,
      `<section class="detail-section book-section"><h2>Relationships</h2>${book('Attached', 'Amir Levine &amp; Rachel Heller', 'Practical adult attachment styles.')}${book('Hold Me Tight', 'Sue Johnson', 'Emotionally focused therapy.')}${book('The Seven Principles for Making Marriage Work', 'John Gottman', 'Research-grounded tools.')}${book('I Want This to Work', 'Tracee Sioux', 'A compassionate guide for couples.')}</section>`,
      `<section class="detail-section book-section"><h2>Parenting</h2>${book('The Whole-Brain Child', 'Daniel Siegel &amp; Tina Payne Bryson', 'Understanding the developing mind.')}${book('No-Drama Discipline', 'Daniel Siegel &amp; Tina Payne Bryson', 'Connection before correction.')}${book('Raising an Emotionally Intelligent Child', 'John Gottman', 'Building emotional awareness.')}${book('How to Talk So Kids Will Listen &amp; Listen So Kids Will Talk', 'Adele Faber &amp; Elaine Mazlish', 'A practical classic for connection.')}</section>`,
      `<section class="detail-section book-section"><h2>Self-help</h2>${book('Atomic Habits', 'James Clear', 'Small changes that compound.')}${book('The Gifts of Imperfection', 'Brené Brown', 'A wholehearted way of living.')}${book('No Bad Parts', 'Richard Schwartz', 'Healing through Internal Family Systems.')}</section>`,
      `<section class="detail-section book-section"><h2>Trauma</h2>${book('What My Bones Know', 'Stephanie Foo', 'A memoir of complex trauma and healing.')}</section>`
    ]
  },
  modalities: {
    eyebrow: 'The lenses I work from', title: 'Each one a different way of <em>listening.</em>', lede: 'No single approach fits every life. I draw from several frameworks and weave them together to meet your particular story.',
    body: [
      section('Internal Family Systems', ["Inside you is a whole constellation of parts — protectors, exiles, and the calm core beneath. IFS helps us welcome each voice gently and understand what it is trying to do for you.", "Rather than fighting the parts of yourself you wish were different, we get curious about them. With compassion and enough safety, they can soften and make room for more choice."]),
      section('Dialectical Behavior Therapy', ["DBT offers practical skills for moving through intense emotions, difficult relationships, and moments when everything feels like too much. It holds acceptance and change together.", "We practice noticing what is happening, regulating your nervous system, and responding in ways that protect the life and relationships you care about."]),
      section('Cognitive Behavioral Therapy', ["Our thoughts, feelings, and behaviors are always in conversation. CBT helps make those patterns visible so you can question the beliefs that keep you stuck and experiment with different responses.", "The goal is not forced positivity. It is a more accurate, compassionate relationship with your mind and the choices available to you."]),
      section('Art', ["Sometimes a feeling arrives before language. Art can offer another way to listen, play, and make meaning without needing to explain everything perfectly.", "You do not need to consider yourself an artist. We use image, color, metaphor, and curiosity as invitations — never as a performance."]),
      section('Attachment', ["Early relationships leave a quiet blueprint for how we expect closeness, conflict, and care to work. Together we trace those patterns with kindness.", "As the therapy relationship becomes a secure place to practice, new experiences of connection can become possible in the rest of your life."]),
      `<section class="detail-quote"><p>Curious which lens fits your story?</p><h2>We’ll find the right shape together.</h2><p>Reach out for a free consultation and we’ll begin the conversation.</p><a class="text-link" href="${link('get-started/')}">Get started <span>→</span></a></section>`
    ]
  },
  'get-started': {
    eyebrow: 'Get started', title: 'Are we the <em>right fit?</em>', lede: "I'm glad you're here. Finding the right therapist is such a personal process, and feeling comfortable makes all the difference. Come say hi.",
    body: [
      `<section class="appointment-card detail-appointment"><h2>Request an appointment</h2>${paras(["Choose a service, share a brief note about what brings you in, and pick a time, all through my secure SimplePractice portal."])}<a class="button" href="https://sohavani-mand.clientsecure.me/widget-redirect?scopeId=b0a05cdc-3559-497f-86e9-4c0eae004bbe&amp;scopeUri=sohavani-mand&amp;scopeGlobal=true&amp;applicationId=7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b&amp;appearance=%7B%22fullScreen%22%3Atrue%7D&amp;contact=false" target="_blank" rel="noreferrer">Request Appointment <span>↗</span></a><small>Opens a secure scheduling window, no email form.</small></section>`,
      `<section class="get-started-office"><div><p class="eyebrow">Office</p><h2>A room in the <em>Mission.</em></h2>${paras(["My office is a calm, private space in the heart of the Mission District, easy to reach by Muni or on foot, with a parking garage attached to the building. You are welcome here exactly as you arrive.", "Virtual sessions are always available, but in-person sessions start October 1st."])}<div class="office-facts"><a href="https://www.google.com/maps/search/?api=1&amp;query=3150%2018th%20St%2C%20Suite%20404%2C%20San%20Francisco%2C%20CA%2094110" target="_blank" rel="noreferrer"><span>⌖</span>3150 18th St, Suite 404, San Francisco, CA 94110 <small>↗</small></a><a href="tel:+14159305395"><span>⌕</span>415-930-5395</a></div></div><div class="map-frame"><iframe title="Map of the Kaur Counseling office" src="https://maps.google.com/maps?q=3150%2018th%20St%2C%20Suite%20404%2C%20San%20Francisco%2C%20CA%2094110&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></section>`
    ], noCta: true
  },
  privacy: {
    eyebrow: 'Privacy, disclaimer & crisis resources', title: 'Care that is <em>clear and private.</em>', lede: 'A few important details about this website, therapy, and what to do in a crisis.',
    body: [
      section('If you are in crisis', ["If you are in immediate danger, call 911. You can also call or text 988, the Suicide & Crisis Lifeline. This site is not monitored 24/7 and is not a crisis service."]),
      section('Professional disclaimer', ["The information on this website is for general educational purposes and is not a substitute for professional mental health care. Reading this site does not create a therapist-client relationship."]),
      section('Licensee identification', ["Sohavani Mand, LMFT · California License #150884 · Kaur Counseling, Marriage & Family Therapy, Inc."]),
      section('Website privacy', ["This static website does not collect form submissions. Basic hosting and security logs may be processed by the hosting provider. Appointment requests go directly to the secure SimplePractice portal."]),
      section('Notice of Privacy Practices (summary)', ["Your health information is handled according to applicable privacy laws and the Notice of Privacy Practices provided as part of care. Please ask for a complete copy if you have questions about how information is used or disclosed."]),
      section('Telehealth', ["Virtual sessions are available when clinically appropriate and legally permitted. We’ll discuss privacy, technology, and what to do if you need immediate support before beginning telehealth care."])
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
  return { eyebrow, title: `${esc(title)}${italic ? ` <em>${esc(italic)}</em>` : ''}`, lede, body: sections.map(([heading, items], index) => section(heading, items, index % 2 ? 'detail-section-tint' : '') ) };
}

function book(title, author, note) {
  return `<article class="book"><h3>${title}</h3><p class="book-author">${author}</p><p>${note}</p></article>`;
}

function render() {
  const pageId = document.body.dataset.page;
  const page = pages[pageId];
  if (!page) return;
  document.title = `Sohavani Mand, LMFT | ${pageId === 'privacy' ? 'Privacy' : 'Kaur Counseling'}`;
  const body = page.body.join('');
  document.getElementById('page-app').innerHTML = `${header()}<main class="detail-page"><div class="detail-shell"><a class="back-link" href="${link('')}">← Back home</a><section class="detail-hero">${leaf}<p class="eyebrow">${esc(page.eyebrow)}</p><h1>${page.title}</h1><p class="detail-lede">${esc(page.lede)}</p></section><div class="detail-content">${body}</div>${page.noCta ? '' : cta()}</div></main>${footer()}`;
}

render();
