(() => {
  const key='ec-webdev-home-position';
  const home=location.pathname.endsWith('/landing-page.html');
  document.addEventListener('click',e=>{
    const link=e.target.closest('a');
    if(!link)return;
    if(home && link.getAttribute('href')?.endsWith('.html') && !link.hasAttribute('download')){
      try{sessionStorage.setItem(key,String(window.scrollY))}catch(_){}
    }
    if(link.hasAttribute('data-page-back')){
      try{sessionStorage.setItem('ec-webdev-restore-home','1')}catch(_){}
    }
  });
  if(home){
    try{if(sessionStorage.getItem('ec-webdev-restore-home')){
      const y=Number(sessionStorage.getItem(key));
      sessionStorage.removeItem('ec-webdev-restore-home');
      window.addEventListener('load',()=>requestAnimationFrame(()=>window.scrollTo(0,Number.isFinite(y)?y:0)));
    }}catch(_){}
  }
})();
