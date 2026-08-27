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
    if (window.matchMedia('(max-width: 800px)').matches) {
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

document.querySelectorAll('.door-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.door-item');
    const shouldOpen = !item.classList.contains('is-open');
    item.classList.toggle('is-open', shouldOpen);
    button.setAttribute('aria-expanded', String(shouldOpen));
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

const officeNotice = document.querySelector('.office-notice');
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
  '.about-intro', '.about-grid', '.rumi-quote',
  '.narrow-intro', '.wheelhouse-item', '.door-intro', '.door-item',
  '.centered-intro', '.approach-card', '.centered-link',
  '.people-intro', '.person-card', '.modalities-intro', '.modality-item',
  '.modality-quote', '.modality-link', '.contact-main', '.contact-aside',
  '.office-copy', '.map-frame', '.detail-hero', '.detail-content > *', '.detail-cta'
].join(','));

if (scrollRevealTargets.length && 'IntersectionObserver' in window) {
  scrollRevealTargets.forEach((element, index) => {
    element.classList.add('scroll-reveal');
    if (index % 4) element.style.transitionDelay = `${(index % 4) * 0.12}s`;
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
