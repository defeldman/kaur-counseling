window.hydrateLucideIcons();

const tickerTrack = document.querySelector('.ticker-track');
const tickerSet = tickerTrack?.querySelector('.ticker-set');
if (tickerTrack && tickerSet) {
  const setTickerSpeed = () => {
    const width = tickerSet.getBoundingClientRect().width;
    if (width > 0) tickerTrack.style.setProperty('--marquee-duration', `${width / 22.5}s`);
  };
  setTickerSpeed();
  if ('ResizeObserver' in window) new ResizeObserver(setTickerSpeed).observe(tickerSet);
  document.fonts?.ready.then(setTickerSpeed);
}

const menuToggle = document.querySelector('.menu-toggle');
const siteHeader = document.querySelector('.site-header');

const syncHeader = () => siteHeader?.classList.toggle('is-scrolled', window.scrollY > 24);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = siteHeader.classList.toggle('menu-open');
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.mobile-nav .dropdown-trigger').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    if (window.matchMedia('(max-width: 1100px)').matches) {
      event.preventDefault();
      const dropdown = trigger.closest('.nav-dropdown');
      const open = !dropdown.classList.contains('is-open');
      dropdown.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    }
  });
});

document.querySelectorAll('.mobile-nav a:not(.dropdown-trigger)').forEach((link) => {
  link.addEventListener('click', () => {
    siteHeader.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.home-door-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.home-door-item');
    const shouldOpen = !item.classList.contains('is-open');
    item.classList.toggle('is-open', shouldOpen);
    button.setAttribute('aria-expanded', String(shouldOpen));
    item.querySelector('.panel')?.setAttribute('aria-hidden', String(!shouldOpen));
  });
});

const privacyNote = document.querySelector('.privacy-note');
const privacyClose = document.querySelector('.privacy-close');
document.querySelectorAll('a[href="#privacy"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    privacyNote?.removeAttribute('hidden');
  });
});
privacyClose?.addEventListener('click', () => privacyNote?.setAttribute('hidden', ''));
privacyNote?.addEventListener('click', (event) => {
  if (event.target === privacyNote) privacyNote.setAttribute('hidden', '');
});

const officeNotice = document.querySelector('#office-notice .office-notice');
if (officeNotice && 'IntersectionObserver' in window) {
  const revealNotice = new IntersectionObserver((entries, observer) => {
    if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.3)) {
      officeNotice.classList.add('is-visible');
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  revealNotice.observe(officeNotice);
} else {
  officeNotice?.classList.add('is-visible');
}

const scrollRevealTargets = document.querySelectorAll([
  '.scroll-reveal',
  '.home-about-intro', '.home-about-left', '.home-about-right',
  '.home-wheel-intro', '.home-wheel-card', '.home-door-intro', '.home-door-item', '.home-door',
  '.home-approach-intro', '.home-approach-card', '.home-approach-more',
  '.home-people-intro', '.home-person', '.home-mod-intro', '.home-mod-card',
  '.home-mod-quote', '.home-mod-more', '.home-contact-aside',
  '.home-contact-office', '.detail-hero', '.detail-content > *', '.detail-cta',
  '.cost-article > .reveal', '.cost-sections > .reveal', '.transitions-navigating', '.transitions-card', '.transitions-support', '.transitions-cta', '.svc-burnout-panel', '.svc-burnout-cta', '.anxiety-topics > .reveal', '.anxiety-overlap', '.anxiety-work', '.anxiety-step', '.anxiety-cta', '.about-intro', '.about-callout', '.about-session-heading', '.about-card-grid > *', '.about-content-section',
  '.privacy-article > .reveal', '.multiculturalism-article > .reveal', '.multiculturalism-sections > .reveal', '.multiculturalism-panel',
  '.get-started-intro', '.get-started-office-reveal',
  '.res-article > .reveal', '.res-sections > .reveal',
  '.teens-article > .reveal', '.teens-card',
  '.mod-hero-copy', '.mod-card', '.mod-framework-intro', '.mod-closing-card'
].join(','));

const revealStaggerGroups = [
  { selector: '.home-about-right', delay: 0.15 },
  { selector: '.home-contact-aside', delay: 0.15 },
  { selector: '.home-contact-map', delay: 0.15 },
  { selector: '.home-wheel-card', step: 0.12 },
  { selector: '.home-approach-card', step: 0.12 },
  { selector: '.home-person', step: 0.08 },
  { selector: '.home-mod-card', step: 0.12 },
  { selector: '.framework-card', delay: 0.04, step: 0.12 },
  { selector: '.mod-card', delay: 0.04, step: 0.12 }
];
const revealDelays = new Map();
revealStaggerGroups.forEach(({ selector, delay, step }) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    revealDelays.set(element, delay ?? index * step);
  });
});

if (scrollRevealTargets.length && 'IntersectionObserver' in window) {
  scrollRevealTargets.forEach((element) => {
    element.classList.add('scroll-reveal');
    const delay = revealDelays.get(element);
    if (delay !== undefined) element.style.transitionDelay = `${delay}s`;
  });
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  scrollRevealTargets.forEach((element) => {
    revealObserver.observe(element);
    // IntersectionObserver callbacks can be delayed when a newly opened page is
    // briefly backgrounded. Make the initial viewport deterministic as well.
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add('is-visible');
      revealObserver.unobserve(element);
    }
  });
} else {
  scrollRevealTargets.forEach((element) => element.classList.add('is-visible'));
}
