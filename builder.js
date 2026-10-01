(() => {
  const modal = document.getElementById('builderModal');
  if (!modal) return;
  const $ = (id) => document.getElementById(id);
  const preview = $('sitePreview');
  const brand = $('builderBrand'), title = $('builderTitleInput'), copy = $('builderCopy');
  const accent = $('builderAccent'), accentText = $('builderAccentText'), font = $('builderFont');
  const projectType = $('builderProjectType');
  const palettes = {
    tech: {bg:'#020812',surface:'#061323',accent:'#16B8FF',soft:'#62DCFF',text:'#EDF7FF',light:false},
    green:{bg:'#07110e',surface:'#0b241b',accent:'#36E0B0',soft:'#a6ffe5',text:'#F0FFFA',light:false},
    light:{bg:'#f6f9fc',surface:'#e8eef5',accent:'#176CFF',soft:'#0b2b57',text:'#12263a',light:true},
    gold:{bg:'#070707',surface:'#171717',accent:'#d9a441',soft:'#f5d78e',text:'#fff8e8',light:false}
  };
  let state = {palette:'tech', hero:'split'};

  function open(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; update(); }
  function close(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  document.querySelectorAll('[data-builder-open]').forEach(b => b.addEventListener('click', open));
  modal.querySelectorAll('[data-builder-close]').forEach(b => b.addEventListener('click', close));
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal.classList.contains('open')) close(); });

  function setPalette(key){
    state.palette=key; const p=palettes[key];
    accent.value=p.accent; accentText.value=p.accent; update();
    document.querySelectorAll('[data-palette]').forEach(b=>b.classList.toggle('active', b.dataset.palette===key));
  }
  document.querySelectorAll('[data-palette]').forEach(b=>b.addEventListener('click',()=>setPalette(b.dataset.palette)));
  document.querySelectorAll('[data-hero]').forEach(b=>b.addEventListener('click',()=>{state.hero=b.dataset.hero;document.querySelectorAll('[data-hero]').forEach(x=>x.classList.toggle('active',x===b));update();}));
  [brand,title,copy,font,projectType,accent,accentText].forEach(el=>el.addEventListener('input',()=>{
    if(el===accent) accentText.value=accent.value;
    if(el===accentText && /^#[0-9a-fA-F]{6}$/.test(accentText.value)) accent.value=accentText.value;
    update();
  }));
  document.querySelectorAll('[data-section]').forEach(el=>el.addEventListener('change',update));

  function update(){
    const p=palettes[state.palette] || palettes.tech;
    let ac=accentText.value.trim(); if(!/^#[0-9a-fA-F]{6}$/.test(ac)) ac=p.accent;
    preview.style.setProperty('--p-bg',p.bg); preview.style.setProperty('--p-surface',p.surface); preview.style.setProperty('--p-accent',ac); preview.style.setProperty('--p-text',p.text); preview.style.setProperty('--p-font',font.value);
    preview.classList.toggle('p-light',p.light);
    $('pBrand').innerHTML = escapeHTML(brand.value || 'Minha Empresa').replace(/\s(.+)/,' <span>$1</span>');
    $('pTitle').textContent = title.value || 'Um site feito para apresentar meu negócio.';
    $('pCopy').textContent = copy.value || 'Quero uma presença digital profissional, clara e adaptada ao meu público.';
    $('pKicker').textContent = (projectType.value || 'PRESENÇA DIGITAL').toUpperCase();
    $('pFooter').textContent = brand.value || 'Minha Empresa';
    const show=(id,key)=>$(id).style.display=document.querySelector(`[data-section="${key}"]`)?.checked?'':'none';
    show('pServices','services'); show('pGallery','gallery'); show('pAbout','about'); show('pContact','contact');
    $('pFooterLinks').textContent = [document.querySelector('[data-section="whatsapp"]')?.checked?'WhatsApp':'',document.querySelector('[data-section="social"]')?.checked?'Redes sociais':''].filter(Boolean).join(' · ') || 'Contato';
    $('pHero').classList.toggle('center',state.hero==='center');
    $('pMainBtn').textContent = document.querySelector('[data-section="whatsapp"]')?.checked ? 'Falar no WhatsApp' : 'Conhecer';
  }
  function escapeHTML(v){ return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }

  function makeCanvas(){
    const c=document.createElement('canvas'), w=1400, h=940; c.width=w;c.height=h; const ctx=c.getContext('2d');
    const p=palettes[state.palette] || palettes.tech; let ac=accentText.value.trim(); if(!/^#[0-9a-fA-F]{6}$/.test(ac)) ac=p.accent;
    const bg=p.bg, surface=p.surface, text=p.text;
    const fontName=(font.value||'Inter').split(',')[0].replace(/['"]/g,'');
    ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
    const grad=ctx.createLinearGradient(0,0,w,h);grad.addColorStop(0,surface);grad.addColorStop(1,bg);ctx.fillStyle=grad;ctx.fillRect(0,70,w,350);
    ctx.fillStyle=text;ctx.font=`900 25px ${fontName}`;ctx.fillText((brand.value||'Minha Empresa').slice(0,28),50,42);ctx.fillStyle=ac;ctx.fillText('•',260,42);
    ctx.fillStyle='rgba(255,255,255,.55)';ctx.font=`500 14px ${fontName}`;ctx.fillText('Início     Serviços     Projetos     Contato',820,42);
    ctx.fillStyle=ac;ctx.font=`900 13px ${fontName}`;ctx.fillText((projectType.value||'PRESENÇA DIGITAL').toUpperCase(),60,120);
    ctx.fillStyle=text;ctx.font=`900 58px ${fontName}`;wrapText(ctx,title.value||'Um site feito para apresentar meu negócio.',60,180,690,68,3);
    ctx.fillStyle='rgba(255,255,255,.65)';ctx.font=`400 19px ${fontName}`;wrapText(ctx,copy.value||'',60,305,610,31,3);
    ctx.fillStyle=ac;roundRect(ctx,60,355,180,48,12);ctx.fill();ctx.fillStyle='#00111b';ctx.font=`900 15px ${fontName}`;ctx.fillText('Conhecer projeto',82,386);
    ctx.strokeStyle='rgba(255,255,255,.14)';ctx.lineWidth=2;roundRect(ctx,800,130,510,245,22);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.07)';roundRect(ctx,825,165,460,42,10);ctx.fill();ctx.fillStyle=ac;roundRect(ctx,825,230,275,24,8);ctx.fill();ctx.fillStyle='rgba(255,255,255,.08)';roundRect(ctx,825,275,370,16,7);ctx.fill();roundRect(ctx,825,305,290,16,7);ctx.fill();
    let y=455; const checks=[['services','Serviços'],['gallery','Projetos'],['about','Sobre'],['contact','Contato']]; checks.forEach(([key,label])=>{if(document.querySelector(`[data-section="${key}"]`)?.checked){ctx.fillStyle=surface;roundRect(ctx,60,y,w-120,72,14);ctx.fill();ctx.fillStyle=text;ctx.font=`800 19px ${fontName}`;ctx.fillText(label,84,y+30);ctx.fillStyle='rgba(255,255,255,.5)';ctx.font=`400 13px ${fontName}`;ctx.fillText('Área planejada conforme a necessidade do negócio.',84,y+51);y+=86;}});
    ctx.fillStyle='rgba(255,255,255,.35)';ctx.font=`400 12px ${fontName}`;ctx.fillText(`${brand.value||'Minha Empresa'} • prévia criada no Laboratório Visual da EC WebDev`,60,900);
    return c;
  }
  function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
  function wrapText(ctx,text,x,y,maxWidth,lineHeight,maxLines){const words=String(text).split(/\s+/),lines=[];let line='';for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=word;}else line=test;}if(line)lines.push(line);lines.slice(0,maxLines).forEach((l,i)=>ctx.fillText(l,x,y+i*lineHeight));}
  $('builderDownload').addEventListener('click',()=>{const c=makeCanvas();c.toBlob(blob=>{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='previsao-site-ec-webdev.png';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);},'image/png');});
  $('builderShare').addEventListener('click',async()=>{const c=makeCanvas();c.toBlob(async blob=>{const file=new File([blob],'previsao-site-ec-webdev.png',{type:'image/png'});const text=`Olá! Montei uma ideia de site no Laboratório Visual da EC WebDev. Tipo: ${projectType.value}. Marca: ${brand.value}.`;
      if(navigator.share && navigator.canShare && navigator.canShare({files:[file]})){try{await navigator.share({title:'Prévia do meu site',text,files:[file]});return;}catch(e){}}
      const wa='https://wa.me/5591985687099?text='+encodeURIComponent(text+' Vou enviar a imagem da prévia em seguida.'); window.open(wa,'_blank','noopener');
    },'image/png');});
  update();
})();
