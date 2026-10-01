(() => {
  let origin = null;
  const routes = ['#configurador', '#laboratorio'];
  function sync() {
    const config = document.getElementById('configScreen');
    const lab = document.getElementById('labModal');
    if (!config || !lab) return;
    const screen = routes.includes(location.hash);
    for (const [el, hash] of [[config, '#configurador'], [lab, '#laboratorio']]) {
      const active = location.hash === hash;
      el.classList.toggle('open', active);
      el.setAttribute('aria-hidden', String(!active));
      el.inert = !active;
    }
    document.body.style.overflow = screen ? 'hidden' : '';
    document.querySelectorAll('body > main, body > header, body > footer, #ecWaChat').forEach(el => { el.inert = screen; });
    if (screen) {
      (location.hash === '#configurador' ? config : lab).querySelector('button').focus({preventScroll:true});
    } else if (origin) {
      const saved = origin;
      requestAnimationFrame(() => {window.scrollTo(0, saved.y); saved.focus?.focus({preventScroll:true});});
    }
  }
  window.ecScreens = {
    open(name) {
      const hash = name === 'laboratorio' ? '#laboratorio' : '#configurador';
      if (location.hash === hash) return;
      if (!routes.includes(location.hash)) origin = {y:window.scrollY, focus:document.activeElement};
      history.pushState({ecScreen:true}, '', hash);
      sync();
    },
    back() {
      if (history.state?.ecScreen) history.back();
      else {history.replaceState(null, '', '#identidade'); sync(); document.getElementById('identidade').scrollIntoView();}
    }
  };
  window.addEventListener('popstate', sync);
  window.addEventListener('hashchange', sync);
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-config-open]').forEach(b => b.addEventListener('click', () => window.ecScreens.open('configurador')));
    document.querySelectorAll('[data-screen-back]').forEach(b => b.addEventListener('click', window.ecScreens.back));
    document.addEventListener('keydown', e => {if(e.key === 'Escape' && location.hash === '#configurador') window.ecScreens.back();});
    sync();
  });
})();
