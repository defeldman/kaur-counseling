const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('.site-header');

menuToggle?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
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
