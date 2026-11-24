(()=>{
  // Shared desktop mega-menu and mobile accordion.
  const header=document.querySelector('.site-header');
  const shell=document.querySelector('#menu-shell');
  const mega=document.querySelector('#mega-menu');
  const triggers=[...document.querySelectorAll('[data-menu-trigger]')];
  const items=[...document.querySelectorAll('[data-menu-group]')];
  const cols=[...document.querySelectorAll('[data-menu-column]')];
  const mobileToggle=document.querySelector('.mobile-nav-toggle');
  const media=window.matchMedia('(max-width:1050px)');
  if(header && shell && mega && mobileToggle){
    let selected=null;
    function sync(){
      const desktopOpen=!!selected && !media.matches;
      mega.classList.toggle('is-open',desktopOpen);
      mega.setAttribute('aria-hidden',String(!desktopOpen));
      cols.forEach(x=>x.classList.toggle('is-highlighted',x.dataset.menuColumn===selected));
      items.forEach(x=>x.classList.toggle('is-selected',x.dataset.menuGroup===selected));
      triggers.forEach(x=>x.setAttribute('aria-expanded',String(x.dataset.menuTrigger===selected)));
    }
    function closeAll(){selected=null;sync();shell.classList.remove('is-mobile-open');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.setAttribute('aria-label','전체 메뉴 열기');}
    triggers.forEach(btn=>btn.addEventListener('click',()=>{selected=selected===btn.dataset.menuTrigger?null:btn.dataset.menuTrigger;sync()}));
    mobileToggle.addEventListener('click',()=>{
      const opened=shell.classList.toggle('is-mobile-open');mobileToggle.setAttribute('aria-expanded',String(opened));mobileToggle.setAttribute('aria-label',opened?'전체 메뉴 닫기':'전체 메뉴 열기');if(!opened)selected=null;sync();
    });
    document.addEventListener('click',e=>{if(!header.contains(e.target))closeAll()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeAll();mobileToggle.focus()}});
    shell.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeAll));
    media.addEventListener('change',closeAll);window.addEventListener('hashchange',closeAll);
  }
  const topBtn=document.querySelector('.top-button');
  if(topBtn){
    const update=()=>topBtn.classList.toggle('visible',window.scrollY>380);
    addEventListener('scroll',update,{passive:true});update();
    topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
  }
  // Homepage-only slider, preserved from V3.
  const slides=[...document.querySelectorAll('.hero-slide')];
  const dots=document.querySelector('.hero-dots');
  const counter=document.querySelector('#current');
  const pause=document.querySelector('#pause');
  if(slides.length && dots && counter && pause){
    let index=0,paused=false,timer;
    const change=(next)=>{index=(next+slides.length)%slides.length;slides.forEach((el,i)=>{const on=i===index;el.classList.toggle('on',on);el.setAttribute('aria-hidden',String(!on));});[...dots.children].forEach((b,i)=>{b.setAttribute('aria-current',String(i===index));});counter.textContent=String(index+1).padStart(2,'0');};
    slides.forEach((_,i)=>{const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`배너 ${i+1} 보기`);dot.addEventListener('click',()=>{change(i);restart()});dots.appendChild(dot)});
    function restart(){clearInterval(timer);if(!paused&&!document.hidden&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>change(index+1),3500)}
    document.querySelector('#prev').addEventListener('click',()=>{change(index-1);restart()});
    document.querySelector('#next').addEventListener('click',()=>{change(index+1);restart()});
    pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'자동 넘김 다시 시작':'자동 넘김 일시정지');restart()});
    document.addEventListener('visibilitychange',restart);change(0);restart();
  }
})();
