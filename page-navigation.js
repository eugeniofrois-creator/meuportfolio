(() => {
  const key='ec-webdev-home-position';
  const here=location.pathname.split('/').pop()||'index.html';
  try{const restore=sessionStorage.getItem('ec-return-to');if(restore===here){const y=Number(sessionStorage.getItem('ec-position-'+here));sessionStorage.removeItem('ec-return-to');window.addEventListener('load',()=>window.scrollTo(0,Number.isFinite(y)?y:0));}}catch{}
  const home=location.pathname.endsWith('/landing-page.html');
  document.addEventListener('click',e=>{
    const link=e.target.closest('a');
    if(!link)return;
    try{sessionStorage.setItem('ec-position-'+here,String(window.scrollY));if(link.id==='labBack'){const target=new URL(link.href).pathname.split('/').pop();sessionStorage.setItem('ec-return-to',target);}}catch{}
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
