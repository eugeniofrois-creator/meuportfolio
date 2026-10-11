(() => {
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('.ec-reveal').forEach(el => el.classList.add('show'));
  const toggle = document.querySelector('[data-menu-toggle]'), menu = document.querySelector('.ec-menu');
  toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); menu?.classList.toggle('mobile-open', open); });
  document.addEventListener('click', e => {
    if(e.target.closest('[data-config-open],[data-lab-open]')) location.href='laboratorio.html';
    const model=e.target.closest('[data-template]'); if(model) location.href='laboratorio.html?modelo='+encodeURIComponent(model.dataset.template);
    if(e.target.closest('[data-guide-open]')) location.href='identidade-visual.html';
  });
})();
