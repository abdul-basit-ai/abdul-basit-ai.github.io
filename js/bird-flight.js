'use strict';
// Pip makes one arrival flight, then stays on the illustration.
(() => {
  const bird=document.querySelector('.bird-companion');
  const button=document.querySelector('#pip-button');
  const panel=document.querySelector('#pip-panel');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let animation,overlay,arrived=false;
  function settle(showOptions=true){
    animation=undefined;overlay?.remove();overlay=undefined;
    bird.classList.remove('pip-travelling','pip-docked','pip-dock-left');
    arrived=true;
    if(showOptions){panel.hidden=false;button.setAttribute('aria-expanded','true');}
  }
  function arrive(){
    if(arrived)return;
    if(motion.matches||!Element.prototype.animate){settle();return;}
    const r=button.getBoundingClientRect(),base=matchMedia('(max-width:520px)').matches?76:90;
    overlay=document.createElement('div');overlay.className='pip-flight';overlay.setAttribute('aria-hidden','true');overlay.inert=true;
    overlay.append(button.querySelector('svg').cloneNode(true));document.body.append(overlay);
    bird.classList.add('pip-travelling');
    const transform=(x,y,rotation,scale)=>'translate('+x+'px,'+y+'px) rotate('+rotation+'deg) scale('+scale+')';
    animation=overlay.animate([
      {transform:transform(innerWidth+40,-70,-12,1)},
      {transform:transform((innerWidth+r.x)/2,Math.max(55,r.y-100),-8,(1+r.width/base)/2),offset:.55},
      {transform:transform(r.x,r.y,0,r.width/base)}
    ],{duration:850,easing:'cubic-bezier(.22,.65,.3,1)',fill:'forwards'});
    animation.finished.then(()=>settle()).catch(()=>{});
  }
  motion.addEventListener('change',()=>{if(motion.matches&&animation){animation.cancel();settle();}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&animation){animation.cancel();settle(false);}});
  if(document.readyState==='complete')requestAnimationFrame(arrive);
  else addEventListener('load',()=>requestAnimationFrame(arrive),{once:true});
})();
