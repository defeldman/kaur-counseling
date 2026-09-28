const root = document.body.dataset.root || './';

const esc = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));
const link = (path) => `${root}${path}`;
const paras = (items) => items.map((item) => `<p>${esc(item)}</p>`).join('');
const section = (heading, items, className = '') => `<section class="detail-section ${className}"><h2>${esc(heading)}</h2>${paras(items)}</section>`;
const serviceSection = (heading, content, className = '') => `<section class="detail-section ${className}"><h2>${esc(heading)}</h2>${content}</section>`;
const serviceCards = (heading, cards, className = '') => `<section class="detail-section ${className}"><h2>${esc(heading)}</h2><div class="detail-card-grid">${cards.map(([title, copy]) => `<article class="detail-card"><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join('')}</div></section>`;
const serviceLabeledCards = (cards) => `<div class="detail-card-grid">${cards.map(([title, copy]) => `<article class="detail-card"><p><strong>${esc(title)}</strong></p><p>${esc(copy)}</p></article>`).join('')}</div>`;
const serviceList = (items) => `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;
const serviceSteps = (items) => `<div>${items.map((item) => `<div>${esc(item)}</div>`).join('')}</div>`;
const crisisPhoneIcon = '<svg viewBox="0 0 24 24"><path d="M6.5 3.5 10 7 8 9c1.4 2.9 3.1 4.6 6 6l2-2 3.5 3.5v2.2c0 .9-.7 1.6-1.6 1.6C10.2 20.3 3.7 13.8 3.7 6.1c0-.9.7-1.6 1.6-1.6h1.2Z"/></svg>';
const crisisSection = () => `<section class="detail-section privacy-crisis"><div class="privacy-crisis-card"><div class="privacy-crisis-heading"><span class="privacy-crisis-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m12 3 9 17H3L12 3Z"/><path d="M12 8v5m0 3h.01"/></svg></span><h2>If you are in crisis</h2></div><p>This website is not monitored for emergencies and is not a substitute for urgent care. If you or someone else is in immediate danger, please use the resources below.</p><ul><li><a href="tel:911"><span class="crisis-phone" aria-hidden="true">${crisisPhoneIcon}</span><span><strong>911</strong> for life-threatening emergencies.</span></a></li><li><a href="tel:988"><span class="crisis-phone" aria-hidden="true">${crisisPhoneIcon}</span><span><strong>988</strong> Suicide &amp; Crisis Lifeline. Call or text 988, 24/7.</span></a></li><li><a href="sms:741741"><span class="crisis-phone" aria-hidden="true">${crisisPhoneIcon}</span><span><strong>741741</strong> Crisis Text Line. Text HOME to 741741, 24/7.</span></a></li></ul></div></section>`;
const navChevron = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-chevron lucide lucide-chevron-down" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>';
const leaf = '<span class="detail-leaf" aria-hidden="true"></span>';
const featherPaths = '<path d="M50 16 C26 40 24 88 48 114"></path><path d="M50 16 C74 40 76 88 52 114"></path><path d="M48 114 C46 124 48 134 42 146"></path><path d="M50 20 L49 112"></path><path d="M50 42 L32 50"></path><path d="M50 62 L28 74"></path><path d="M50 82 L32 92"></path><path d="M50 42 L68 50"></path><path d="M50 62 L72 74"></path><path d="M50 82 L68 92"></path>';
const featherSvg = (className) => `<svg viewBox="0 0 100 150" class="${className}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${featherPaths}</svg>`;

function header() {
  return `<header class="site-header" id="home">
    <a class="brand" href="${link('')}" aria-label="Kaur Counseling, home"><span class="brand-name">Kaur Counseling</span><span class="brand-subtitle">Marriage and Family Therapy, Inc.</span></a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      <a href="${link('')}">Home</a>
      <a href="${link('about/cost/')}">Cost</a>
      <div class="nav-dropdown"><a class="dropdown-trigger" href="${link('about/')}" aria-haspopup="true" aria-expanded="false">About ${navChevron}</a><div class="nav-dropdown-menu"><div class="nav-dropdown-panel"><a href="${link('about/')}">What to Expect</a><a href="${link('about/resources/')}">Resources</a></div></div></div>
      <a href="${link('modalities/')}">Modalities</a><a href="${link('get-started/')}">Contact</a>
      <div class="nav-dropdown"><a class="dropdown-trigger" href="${link('#services')}" aria-haspopup="true" aria-expanded="false">Services ${navChevron}</a><div class="nav-dropdown-menu"><div class="nav-dropdown-panel nav-dropdown-services"><a href="${link('services/adhd/')}">ADHD &amp; Late-Stage Diagnosis</a><a href="${link('services/multiculturalism/')}">Multicultural &amp; Cross-Cultural Therapy</a><a href="${link('services/burnout/')}">Burnout</a><a href="${link('services/anxiety-depression/')}">Anxiety &amp; Depression</a><a href="${link('services/transitions/')}">Transitions</a><a href="${link('services/teens/')}">Teens</a></div></div></div>
      <a class="nav-cta" href="${link('get-started/')}">Get Started</a>
    </nav>
    <button class="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="mobile-nav" aria-label="Mobile navigation">
      <a href="${link('')}">Home</a>
      <a href="${link('about/cost/')}">Cost</a>
      <div class="nav-dropdown"><a class="dropdown-trigger" href="${link('about/')}" aria-haspopup="true" aria-expanded="false">About ${navChevron}</a><div class="nav-dropdown-menu"><div class="nav-dropdown-panel"><a href="${link('about/')}">What to Expect</a><a href="${link('about/resources/')}">Resources</a></div></div></div>
      <a href="${link('modalities/')}">Modalities</a><a href="${link('get-started/')}">Contact</a>
      <div class="nav-dropdown"><a class="dropdown-trigger" href="${link('#services')}" aria-haspopup="true" aria-expanded="false">Services ${navChevron}</a><div class="nav-dropdown-menu"><div class="nav-dropdown-panel nav-dropdown-services"><a href="${link('services/adhd/')}">ADHD &amp; Late-Stage Diagnosis</a><a href="${link('services/multiculturalism/')}">Multicultural &amp; Cross-Cultural Therapy</a><a href="${link('services/burnout/')}">Burnout</a><a href="${link('services/anxiety-depression/')}">Anxiety &amp; Depression</a><a href="${link('services/transitions/')}">Transitions</a><a href="${link('services/teens/')}">Teens</a></div></div></div>
      <a class="nav-cta" href="${link('get-started/')}">Get Started</a>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="site-footer" id="footer">
    <div class="footer-top"><div class="footer-name">Sohavani Mand, LMFT</div><div class="footer-license">CA Lic. #150884</div><div class="footer-business">Kaur Counseling, Marriage &amp; Family Therapy, Inc.</div><a class="footer-phone" href="tel:+14159305395">415-930-5395</a><div class="footer-nav"><a href="${link('')}">Home</a><a href="${link('about/')}">About</a><a href="${link('#services')}">Services</a><a href="${link('get-started/')}">Contact</a><a href="${link('privacy/')}">Privacy &amp; Disclaimer</a></div></div>
    <div class="footer-bottom"><p>If you are in crisis, call or text <span class="crisis-number">988</span> (Suicide &amp; Crisis Lifeline) or <span class="crisis-number">911</span> for emergencies. This site is not monitored 24/7.</p><p class="footer-copyright">© 2026 Sohavani Mand, LMFT. Confidential by design.</p></div>
  </footer>`;
}

function cta() {
  return `<section class="detail-cta"><p class="eyebrow">A place to begin</p><h2>Ready to start a conversation?</h2><p>Reach out for a free consultation and we’ll begin with wherever you are.</p><a class="button" href="${link('get-started/')}">Get Started <span>↗</span></a></section>`;
}

function serviceCta(quote) {
  return `<section class="service-cta">${featherSvg('service-cta-leaf')}<p class="service-cta-quote">${esc(quote)}</p><a class="service-cta-button" href="${link('get-started/')}">Get Started<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></a></section>`;
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
      `<section class="detail-section credentials"><h2>Training &amp; credentials</h2><ul><li>Licensed Marriage &amp; Family Therapist (LMFT) · CA Lic. #150884</li><li>Master's in Counseling, Sonoma State University</li><li>Six years in practice across private and community settings</li><li>Specialties: ADHD, Immigration &amp; Acculturation, Women's Issues</li><li>Modality training: Attachment-based, CBT, DBT, Relational, Trauma-Focused</li></ul></section>`,
      `<section class="about-cta reveal">${featherSvg('about-cta-leaf')}<p class="about-cta-quote">If this feels like the right place to begin, you don't have to figure it out alone.</p><a class="about-cta-button" href="${link('get-started/')}">Get Started</a></section>`
    ],
    noCta: true
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
      `<section class="detail-section framework-intro"><p class="eyebrow">Five frameworks</p><h2>Each one a different way of listening.</h2></section>`,
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
      `<section class="appointment-card detail-appointment"><h3>Request an appointment</h3>${paras(["Choose a service, share a brief note about what brings you in, and pick a time, all through my secure SimplePractice portal."])}<a class="button" href="https://sohavani-mand.clientsecure.me/widget-redirect?scopeId=b0a05cdc-3559-497f-86e9-4c0eae004bbe&amp;scopeUri=sohavani-mand&amp;scopeGlobal=true&amp;applicationId=7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b&amp;appearance=%7B%22fullScreen%22%3Atrue%7D&amp;contact=false" target="_blank" rel="noreferrer">Request Appointment <span>↗</span></a><small>Opens a secure scheduling window, no email form.</small></section>`,
      `<section class="get-started-office"><div><p class="eyebrow">Office</p><h3>A room in the <em class="spruce">Mission.</em></h3>${paras(["My office is a calm, private space in the heart of the Mission District, easy to reach by Muni or on foot, with a parking garage attached to the building. You are welcome here exactly as you arrive.", "Virtual sessions are always available, but in-person sessions start October 1st."])}<div class="office-facts"><a href="https://www.google.com/maps/search/?api=1&amp;query=3150%2018th%20St%2C%20Suite%20404%2C%20San%20Francisco%2C%20CA%2094110" target="_blank" rel="noreferrer"><span>⌖</span>3150 18th St, Suite 404, San Francisco, CA 94110 <small>↗</small></a><a href="tel:+14159305395"><span>⌕</span>415-930-5395</a></div></div><div class="map-frame"><iframe title="Map of the Kaur Counseling office" src="https://maps.google.com/maps?q=3150%2018th%20St%2C%20Suite%20404%2C%20San%20Francisco%2C%20CA%2094110&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></section>`
    ], noCta: true, noBack: true
  },
  privacy: {
    eyebrow: 'Legal & privacy', title: 'Privacy, Disclaimer &amp; Crisis Resources', lede: 'Your trust and safety matter. This page explains how your information is handled, the limits of this website, and where to turn if you need immediate help.',
    body: [
      crisisSection(),
      section('Professional disclaimer', ["The content on this website is provided for general informational and educational purposes only. It is not medical or mental health advice and does not create a therapist-client relationship between you and Sohavani Mand, LMFT. A therapist-client relationship is formed only after a formal intake, signed informed consent, and the scheduling of a clinical appointment. Please do not rely on this site in place of seeking professional care."]),
      section('Licensee identification', ["Sohavani Mand, Licensed Marriage and Family Therapist (LMFT)", "California License #150884"]),
      section('Website privacy', ["This website does not store protected health information (PHI) directly. Any information you submit through the appointment request form is transmitted to Sohavani Mand's secure practice management system for the purpose of scheduling and intake. Please avoid including sensitive clinical details in your initial request, and do not use this website to communicate emergencies or urgent clinical concerns."]),
      section('Notice of Privacy Practices (summary)', ["As a licensed health care provider, Sohavani Mand, LMFT maintains confidentiality in accordance with HIPAA and California's Confidentiality of Medical Information Act (CMIA). Your protected health information may be used and disclosed for treatment, payment, and health care operations, and as otherwise permitted or required by law. A complete Notice of Privacy Practices is provided to you at the start of care. This online summary is for general awareness and does not replace the full notice."]),
      section('Telehealth', ["Where telehealth is offered, services are provided under a valid California license, with informed consent, disclosure of risks and limitations, and verification of your identity and location at each session, consistent with California law.", "This page provides a general overview and is not legal advice. For questions about your privacy or care, contact the office directly."])
    ], noCta: true, noBack: true
  },
  'services/adhd': service('ADHD & Late-Stage', 'Diagnosis.', 'SPECIALTY', "A diagnosis arriving in adulthood reframes a lifetime. We make sense of the years before: the masking, the shame, the gifts. And we build rhythms that fit the mind you actually have.", [
    serviceSection('ADD in women looks different', paras(["The picture most people carry is a boy who can't sit still. Women and girls more often live with the inattentive kind: quiet, internal, easy to miss. Daydreaming in class. Losing track of conversations. Holding it together in public, then collapsing at home. Because it hides so well, it's missed for years, and the story becomes \"lazy,\" \"scattered,\" \"too sensitive.\" My clinical focus is women with ADD, and I know its shape intimately."]) + serviceLabeledCards([
      ['Relationships', "Rejection sensitivity, people-pleasing, losing the thread of what you wanted to say."],
      ['Work & career', 'Capable and praised, then quietly drowning in the details no one sees.'],
      ['School & study', "Bright enough to coast, until you couldn't, and the shame set in."],
      ['Self-esteem', "A running inner monologue of 'I should have been able to.'"],
      ['Body & food', "Forgetting to eat, then overeating; restless sleep; tension you can't name."],
      ['Sex & intimacy', 'Distracted, disconnected, or running on high alert instead of ease.']
    ])),
    ['When the diagnosis arrives later', ["For years you may have moved through the world believing you were simply too much, or never quite enough: too scattered, too intense, too easily overwhelmed, working twice as hard to do the ordinary. A late diagnosis reframes all of it. What you called laziness or brokenness was often a brilliant, exhausting act of holding on."]],
    serviceSection('How it shows up', serviceLabeledCards([
        ['A thousand things at once', 'Ping-ponging between tasks, a mind juggling everything at the same time.'],
        ['Hyperfocus ↔ overwhelm', 'Swinging between deep fixation and flood.'],
        ['Forgetfulness about what you love', 'Even the things and people that matter slip away.'],
        ['Time warps and vanishes', 'Hours pass like minutes, or crawl like days.'],
        ['The exhaustion of masking', 'Performing a version of yourself, all day.'],
        ['The intention-action gap', "Knowing exactly what to do, wanting to do it, and feeling paralyzed even when you're smart enough to execute."]
      ]) + '<article class="detail-card"><p><strong>50%+</strong></p><p>of adults with ADHD also live with anxiety or depression, and some struggle with both. You are not overreacting; you are responding to a lifetime of feeling unreliable in a world that demanded reliability.</p></article>'),
    ['The grief, and the broken trust in yourself', [
      'A late diagnosis often arrives with grief: for the years spent believing you were broken, for the support you never received, for the life that might have felt easier. Living so long without an explanation can erode your trust in your own memory, your follow-through, your word. That fractured trust in yourself can settle into anxiety or depression, which is why so many adults with ADHD carry both.',
      'This fractured trust often creates a cycle of self-frustration: setting high expectations you desperately want to meet, only to find yourself procrastinating or unable to initiate even the simplest tasks. It can be deeply isolating to recognize your own capacity and intelligence while feeling like you\'re fighting a physical block that keeps you from following through on the routines you know would help you feel better.'
    ]],
    serviceSection('How we work with it', serviceList(['Honor your gifts: creativity, intensity, range.', 'Tend the costs of pretending.', 'Grieve what was, and slowly rebuild trust in yourself.', 'Build rhythms and boundaries shaped for how your brain actually works.']))
  ], "You are not a problem to be fixed. You are a person learning to live well with yourself."),
  'services/multiculturalism': service('Multicultural & Cross-Cultural Therapy', '', 'SPECIALTY', "When your identity doesn't fit neatly into one box.", [
    ['Multicultural Therapy', ['We explore how your race, ethnicity, and cultural background have shaped the way you see yourself and the world, making room for every layer of your identity rather than asking you to choose just one.']],
    ['Acculturation & Assimilation Stress', ["We tend to the strain of holding your heritage culture alongside a dominant one that doesn't always make space for it: the codeswitching, the guilt, the quiet exhaustion, so you can move between worlds without losing yourself."]],
    ['First-Generation & Second-Generation Issues', ["We unpack the family pressures, guilt, and identity conflicts that come with being a child of immigrants: the expectations you carry, the roles you play, and the version of yourself you're finally allowed to become."]],
    ['Third Culture Kid (TCK) Therapy', ["We make sense of a belonging that never felt simple, raised in a culture that wasn't your parents' and maybe wasn't your passport's, so the question of 'where are you from?' stops feeling like a small crisis."]],
    ['Intergenerational Trauma Therapy', ["We gently trace the trauma, expectations, and communication gaps passed down from your parents, not to assign blame, but to understand what was inherited and choose what you want to carry forward."]]
  ], 'You do not have to compress yourself to be understood here.'),
  'services/burnout': service('Burnout.', '', 'SPECIALTY', 'The slow creep, and the difficulty of asking for help.', [
    ['The slow creep', ["Burnout doesn't always show up as a complete breakdown. Sometimes it looks like having less energy for things you used to enjoy, needing more effort to get started, or feeling strangely flat even when something good happens. For people who are used to pushing through, it can be especially hard to recognize these changes as signs that something is wrong. You may just think you need to try harder, get more organized, or get back on track — when what you actually need is to recognize that you've been running on empty for a while."]],
    ["Why it's so hard to ask for help", ["When you're used to measuring your worth by how much you accomplish, needing help can feel like falling short. Rest can feel unearned, and asking for support can bring up shame, guilt, or the fear that you should be able to handle it on your own. But struggling to reach out doesn't mean you're failing. Sometimes, it's part of what happens when you've been carrying too much for too long. Recognizing that you need support isn't giving up — it's finally paying attention."]],
    ['Tending and rebuilding', [
      "We start by listening to what the depletion is asking for. We tend the exhaustion before we touch the goals. Then, slowly and with care, we rebuild a life with margins in it, one with rest and meaning, with permission to be a person rather than only a function."
    ]]
  ], 'Recovery is not a project to optimize. It is a returning.'),
  'services/anxiety-depression': service('Anxiety & Depression.', '', 'ALSO IN MY CARE', 'Anxiety and depression can look completely different, but both have a way of adding a layer to everyday life that can make everything feel harder than it should.', [
    ['Anxiety', ["Anxiety can keep your mind running long after you want it to stop. It can make decisions feel overwhelming, turn small things into big things, and leave you constantly anticipating what might go wrong." ]],
    ['Depression', ["Depression can make everything feel heavier in a different way. Things that once felt meaningful can feel distant, motivation can disappear, and even basic tasks can take more effort than you have to give." ]],
    ['When they show up together', ["Sometimes they show up together. Sometimes one takes over for a while and the other follows. And sometimes it's hard to explain what's happening at all — you just know that life feels harder than it used to. You don't have to figure it out alone." ]],
    serviceSection('How we work with it', paras(['I\'m not here to tell you to "just think positively" or hand you a list of things you should be doing differently. I\'m here to meet you where you are, understand what you\'re carrying, and work through it with you — one piece at a time.']) + serviceSteps(["Understand what's happening beneath the surface", 'Recognize the patterns that keep you stuck', 'Respond to overwhelm without shutting down', "Challenge thoughts that aren't serving you", 'Reconnect with the things that matter to you', 'Make changes that feel realistic, not overwhelming']), 'detail-section-tint')
  ], 'One piece at a time.'),
  'services/transitions': service('Going Through a Transition?', '', 'SPECIALTY', "You don't have to do it alone.", [
    serviceCards('You might be navigating…', [
      ['Becoming a Parent', 'The identity shift, the overwhelm, the way love and loss can arrive in the same breath.'],
      ['Career Changes', 'A new role, a departure, a pivot — and the questions of purpose and self-worth that travel with them.'],
      ['Moving', 'Uprooting a life and replanting it, and the quiet grief of leaving a place that held you.'],
      ['Relationship Changes', 'Beginning, deepening, or ending partnerships — and renegotiating who you are to one another.'],
      ['College & Future Decisions', 'The pressure of the open road, and the weight of choosing a direction that feels like yours.'],
      ['Finding Your Next Chapter', "When one season closes before the next has a name, and you're holding the in-between."]
    ]),
    serviceSection('Therapy can help you:', serviceList(['Process your emotions', 'Find clarity and direction', 'Build confidence in this next chapter', 'Feel more grounded and supported']), 'detail-section-tint')
  ], "You don't have to navigate this next chapter alone."),
  'services/teens': service('Therapy for Teens.', '', 'SPECIALTY', "You don't have to have it all figured out.", [
    serviceCards('What you might be carrying', [
      ['School Pressure', "Grades, expectations, the weight of performing. School can feel like it asks for more than you have to give — and like resting is something you can't afford."],
      ['College Prep & Application Stress', "Applications, test scores, the question of what's next. The future can feel like it's due all at once, and like one decision carries your whole life."],
      ["A Safe Adult Who Isn't Your Parent", "Some questions feel too hard or shameful to bring home — and that's okay. This is a trusted adult outside your family to explore them with, who listens without lecturing and keeps what you share private."],
      ['Evolving Friendships & Identity', 'Friendships shift, you change, and the question of who you are gets louder. We make room to explore it — without rushing you toward an answer.'],
      ['ADHD', "A mind that runs fast, gets distracted, or feels like 'too much.' We understand how it shows up — especially for girls who've been missed or told they're just 'not trying.'"]
    ]),
    serviceSection('What you get here:', serviceList(["A space that's just yours", 'Tools for the pressure', 'Words for what you feel', 'A safe adult outside your family']) + paras(["What you share here stays here. The exception is safety — if I'm worried about your wellbeing, we talk about it together first, and figure out next steps as a team."]), 'detail-section-tint')
  ], "You don't have to figure it out alone.")
};

function service(title, italic, eyebrow, lede, sections, closingQuote) {
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
    'Burnout.': "Burnout rarely arrives all at once. It accretes, quietly, through one more task, one more morning pushed through, one more weekend that disappears. By the time it has a name, it has often been living in you for a long while. My work is to help you listen to what it's telling you, and to rebuild a life that can be sustained.",
    'Multicultural & Cross-Cultural Therapy': "To live between cultures is to hold more than one home inside you: its gifts and its grief, its belonging and its exile. My work is to make room for the whole of you: the language you dream in, the values you've chosen, and the ones still being negotiated. You do not have to compress yourself to be understood here.",
    'Going Through a Transition?': "Transitions can be difficult. It's hard to hold both the hope and excitement for something new with the grief of what was. Even the happiest transitions can be difficult. My work is to help you make room for all of it — the loss and the possibility — and to find your footing in the in-between.",
    'Therapy for Teens.': [
      'Being a teenager can feel like everyone expects something from you. Keep your grades up. Make good choices. Think about college. Get along with your family. Maintain friendships. Somehow figure out who you are in the middle of all of it.',
      "Therapy is a place where you don't have to impress anyone or pretend you're doing better than you are. We can talk about what's actually going on — anxiety, ADHD, family tension, school pressure, friendships, the future, or just feeling overwhelmed by all of it.",
      "You don't need to know exactly what you need yet. We can figure that out together."
    ]
  };
  const titleMarkup = `${esc(title)}${italic ? `<br /><em>${esc(italic)}</em>` : ''}`;
  const transitionBodyMarkup = title === 'Going Through a Transition?'
    ? heroBodies[title].replace('difficult.', '<em>difficult.</em>')
    : '';
  const serviceBody = sections.map((entry, index) => {
    if (typeof entry === 'string') return entry;
    const [heading, items] = entry;
    return section(heading, items, index % 2 ? 'detail-section-tint' : '');
  });
  return {
    eyebrow,
    title: titleMarkup,
    lede: leads[title] || lede,
    heroBodyMarkup: transitionBodyMarkup,
    heroBody: transitionBodyMarkup ? '' : heroBodies[title] || '',
    plainLede: title === 'Anxiety & Depression.',
    isService: true,
    closingQuote,
    noCta: true,
    body: serviceBody
  };
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
  const body = page.body.join('');
  const backLabel = page.backLabel || (page.isService ? '← Back to Services' : '← Back to Home');
  const backHref = page.backPath ? link(page.backPath) : (page.isService ? link('#services') : link(''));
  const back = page.noBack ? '' : `<a class="back-link" href="${backHref}">${backLabel}</a>`;
  const heroBody = page.heroBodyMarkup ? `<p class="detail-hero-body">${page.heroBodyMarkup}</p>` : Array.isArray(page.heroBody) ? page.heroBody.map((copy) => `<p class="detail-hero-body">${esc(copy)}</p>`).join('') : (page.heroBody ? `<p class="detail-hero-body">${esc(page.heroBody)}</p>` : '');
  document.getElementById('page-app').innerHTML = `${header()}<main class="detail-page"><div class="detail-shell">${back}<section class="detail-hero">${leaf}<p class="eyebrow">${esc(page.eyebrow)}</p><h1>${page.title}</h1><p class="${page.plainLede ? 'detail-hero-body plain-detail-lede' : 'detail-lede'}">${esc(page.lede)}</p>${heroBody}</section><div class="detail-content">${body}</div>${page.isService ? serviceCta(page.closingQuote) : page.noCta ? '' : cta()}</div></main>${footer()}`;
}

render();
