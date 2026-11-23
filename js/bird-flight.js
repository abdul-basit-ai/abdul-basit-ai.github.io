'use strict';
(() => {
  const bird=document.querySelector('.bird-companion');
  const button=document.querySelector('#pip-button');
  const scene=document.querySelector('.hero-scene');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let perch='hero',animation,overlay,scrollTimer,flightVersion=0;
  const small=()=>matchMedia('(max-width:520px)').matches;
  const size=()=>small()?76:90;
  function targetFor(next){
    if(next==='hero'){
      const r=scene.getBoundingClientRect(),s=small()?126:145;
      return {x:r.right-(small()?0:8)-s,y:r.bottom-s,size:s};
    }
    const s=size(),padding=small()?10:18;
    return {x:next==='left'?padding:innerWidth-padding-s,y:innerHeight-(small()?10:14)-s,size:s};
  }
  function settle(next){
    perch=next;
    bird.classList.toggle('pip-docked',next!=='hero');
    bird.classList.toggle('pip-dock-left',next==='left');
    bird.classList.remove('pip-travelling');
  }
  function cancel(){
    flightVersion++;
    animation?.cancel();overlay?.remove();animation=undefined;overlay=undefined;
    bird.classList.remove('pip-travelling');
  }
  function fly(next,entrance=false){
    if(!entrance&&next===perch)return;
    if(!entrance&&(bird.contains(document.activeElement)||!document.querySelector('#pip-panel').hidden))return;
    const r=button.getBoundingClientRect();
    const start=entrance?{x:innerWidth+40,y:-70,size:90}:{x:Math.max(-80,Math.min(innerWidth,r.x)),y:Math.max(40,Math.min(innerHeight-80,r.y)),size:r.width};
    cancel();
    if(motion.matches||!Element.prototype.animate){settle(next);return;}
    const end=targetFor(next),version=flightVersion;
    closePip();
    overlay=document.createElement('div');overlay.className='pip-flight';overlay.setAttribute('aria-hidden','true');overlay.inert=true;
    overlay.append(button.querySelector('svg').cloneNode(true));document.body.append(overlay);
    bird.classList.add('pip-travelling');
    const base=size(),middle={x:(start.x+end.x)/2,y:Math.max(55,Math.min(start.y,end.y)-100)};
    const transform=(p,rotation)=>'translate('+p.x+'px,'+p.y+'px) rotate('+rotation+'deg) scale('+(p.size||end.size)/base+')';
    animation=overlay.animate([{transform:transform(start,-12)},{transform:transform({...middle,size:(start.size+end.size)/2},start.x>end.x?-8:8),offset:.55},{transform:transform(end,0)}],{duration:entrance?850:650,easing:'cubic-bezier(.22,.65,.3,1)',fill:'forwards'});
    animation.finished.then(()=>{if(version!==flightVersion)return;overlay?.remove();overlay=undefined;animation=undefined;settle(next);}).catch(()=>{});
  }
  function desiredPerch(){
    const r=scene.getBoundingClientRect();
    if(r.bottom>=(small()?214:235)&&r.bottom<=innerHeight+30)return 'hero';
    const sections=[...document.querySelectorAll('main>section[id]')];
    const active=sections.filter(section=>section.getBoundingClientRect().top<innerHeight*.45).at(-1);
    return ['work','writing','contact'].includes(active?.id)?'left':'right';
  }
  function check(){scrollTimer=undefined;if(!document.hidden&&!document.querySelector('dialog[open]'))fly(desiredPerch());}
  function queueCheck(){if(scrollTimer)return;scrollTimer=setTimeout(check,160);}
  addEventListener('scroll',queueCheck,{passive:true});
  addEventListener('resize',queueCheck,{passive:true});
  bird.addEventListener('focusout',()=>setTimeout(queueCheck,0));
  motion.addEventListener('change',()=>{cancel();settle(desiredPerch());});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancel();settle(perch);}});
  function arrive(){requestAnimationFrame(()=>fly(desiredPerch(),true));}
  if(document.readyState==='complete')arrive();else addEventListener('load',arrive,{once:true});
})();
