'use strict';
// Only the current card animates; CSS performs the visual work.
(() => {
  const grid=document.querySelector('#project-grid');
  const dialog=document.querySelector('#project-dialog');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const visible=new WeakSet();
  let hovered=null,focused=null,active=null;
  function update(){
    const next=reduced.matches||document.hidden||dialog.open?null:(hovered||focused);
    const eligible=next?.isConnected&&!next.hidden&&visible.has(next)?next:null;
    if(eligible===active)return;
    active?.classList.remove('workflow-active');
    active=eligible;active?.classList.add('workflow-active');
  }
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);
    }
    update();
  });
  function observeCards(){
    observer.disconnect();
    if(!hovered?.isConnected)hovered=null;
    if(!focused?.isConnected)focused=null;
    grid.querySelectorAll('.project-card').forEach(card=>observer.observe(card));
    update();
  }
  grid.addEventListener('pointerover',event=>{
    if(event.pointerType==='touch')return;
    hovered=event.target.closest('.project-card');update();
  });
  grid.addEventListener('pointerout',event=>{
    if(event.pointerType==='touch')return;
    const next=event.relatedTarget?.closest?.('.project-card');
    hovered=next&&grid.contains(next)?next:null;update();
  });
  grid.addEventListener('focusin',event=>{
    focused=event.target.matches(':focus-visible')?event.target.closest('.project-card'):null;update();
  });
  grid.addEventListener('focusout',event=>{
    const next=event.relatedTarget;
    focused=next&&grid.contains(next)&&next.matches(':focus-visible')?next.closest('.project-card'):null;update();
  });
  // Switching to the keyboard releases any previous pointer selection.
  document.addEventListener('keydown',event=>{if(event.key==='Tab'){hovered=null;update();}});
  document.addEventListener('visibilitychange',update);
  dialog.addEventListener('toggle',update);dialog.addEventListener('close',update);
  reduced.addEventListener('change',update);
  new MutationObserver(observeCards).observe(grid,{childList:true});
  observeCards();
})();
