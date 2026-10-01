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
