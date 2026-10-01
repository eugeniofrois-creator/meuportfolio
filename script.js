document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const journey = document.querySelector("[data-journey]");
  if (!journey) return;

  const tabs = [...journey.querySelectorAll(".journey-tab")];
  const contents = [...journey.querySelectorAll(".journey-content")];
  const progress = journey.querySelector(".journey-progress span");
  const current = journey.querySelector("[data-current]");
  const prev = journey.querySelector("[data-prev]");
  const next = journey.querySelector("[data-next]");
  let index = 0;

  function showSlide(nextIndex) {
    index = (nextIndex + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    contents.forEach((content, i) => content.classList.toggle("active", i === index));
    if (progress) progress.style.width = `${((index + 1) / tabs.length) * 100}%`;
    if (current) current.textContent = String(index + 1).padStart(2, "0");
  }

  tabs.forEach((tab, i) => tab.addEventListener("click", () => showSlide(i)));
  prev?.addEventListener("click", () => showSlide(index - 1));
  next?.addEventListener("click", () => showSlide(index + 1));
});


// v10 — seletor de identidade visual
(() => {
  const paletteChoices = document.querySelectorAll('#paletteChoices .ec-palette');
  const styleChoices = document.querySelectorAll('#styleChoices .ec-style-choice');
  const result = document.getElementById('choiceResult');
  if (!result) return;
  let palette = document.querySelector('#paletteChoices .ec-palette.active')?.dataset.name || 'Tech Blue';
  let layout = document.querySelector('#styleChoices .ec-style-choice.active')?.dataset.name || 'Landing Page';
  const update = () => {
    result.innerHTML = `<strong>Direção escolhida:</strong> ${palette} + ${layout}.<br>Podemos combinar essa direção com WhatsApp, formulário, redes sociais, galeria, FAQ e outras seções conforme o objetivo.`;
  };
  paletteChoices.forEach(btn => btn.addEventListener('click', () => {
    paletteChoices.forEach(x => x.classList.remove('active')); btn.classList.add('active'); palette = btn.dataset.name; update();
  }));
  styleChoices.forEach(btn => btn.addEventListener('click', () => {
    styleChoices.forEach(x => x.classList.remove('active')); btn.classList.add('active'); layout = btn.dataset.name; update();
  }));
})();


// v11 — abrir o guia de identidade visual dentro da Landing Page
(() => {
  const modal = document.getElementById('guideModal');
  if (!modal) return;
  const openers = document.querySelectorAll('[data-guide-open]');
  const closers = document.querySelectorAll('[data-guide-close]');
  const open = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  };
  openers.forEach(btn => btn.addEventListener('click', open));
  closers.forEach(btn => btn.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
})();
