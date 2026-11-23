'use strict';
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
let language = 'en';
try { language = localStorage.getItem('portfolio-language') === 'fr' ? 'fr' : 'en'; } catch {}
let filter = 'all';
let openProjectId = null;
const dialog = $('#project-dialog');
const t = (en, fr) => language === 'fr' ? fr : en;
const localized = value => Array.isArray(value) ? value[language === 'fr' ? 1 : 0] : value;
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function visual(project, extra = '') {
  const graphics = {
    volt: '<svg class="circuit" viewBox="0 0 460 220" aria-hidden="true"><path d="M40 80h65m40 0h30l8-15 12 30 12-30 12 30 12-30 8 15h47m0 0h75v90H40V80m70 0v45m-12 0h24m-24 6h24m-12 0v39m176-90v35m-12 0h24m-24 7h24m-12 0v48"/><rect x="105" y="60" width="40" height="40" rx="3"/><circle cx="40" cy="125" r="16"/><text x="25" y="130">Vin</text><text x="113" y="85">SW</text><text x="194" y="50">L</text><text x="305" y="124">C</text><text x="319" y="65">Vout</text><path d="M65 205h55l5-15 10 25 10-25 10 25 10-25 10 25 10-25 10 15h115" opacity=".5"/></svg>',
    playora: '<div class="playora-screen"><span class="tiny">PLAYORA</span><strong>Your move.</strong><div class="board">'+ '<span></span>'.repeat(16) +'</div><span class="chess-piece">♞</span><span class="voice-small">∿ &nbsp; Knight to f3</span></div>',
    spatial: '<div class="spatial-scene"><div class="spatial-block"></div><div class="spatial-block round"></div><div class="spatial-block outline"></div></div>',
    finance: '<div class="finance-flow"><div class="flow-stack"><div class="flow-node">Graph</div><div class="flow-node">Vectors</div></div><span class="flow-line"></span><div class="flow-hub">Reason</div><span class="flow-line"></span><div class="flow-node">Evidence</div></div>',
    vision: '<div class="satellite"><div class="sat-tile"><span>OPTICAL</span></div><div class="sat-tile"><span>SAR</span></div><div class="sat-tile"><span>MULTISPECTRAL</span></div></div>',
    feed: '<div class="feed-window"><header>FeedIntel <span style="float:right;font-weight:400;font-size:10px">ILLUSTRATIVE VIEW</span></header><div class="feed-chart">'+[32,55,42,75,61,90,73,100].map(h=>'<span style="--h:'+h+'%"></span>').join('')+'</div></div>'
  };
  return '<div class="project-visual visual-'+project.visual+' '+extra+'"><span class="visual-label">'+escapeHTML(project.title.toUpperCase())+'</span>'+graphics[project.visual]+'</div>';
}
function renderProjects() {
  $('#project-grid').innerHTML = PROJECTS.map(p => '<article class="project-card"'+(filter !== 'all' && p.category !== filter ? ' hidden' : '')+'><button class="visual-button" data-project="'+p.id+'" aria-label="'+escapeHTML(t('Explore ','Découvrir ')+(language === 'fr' && p.titleFr || p.title))+'">'+visual(p)+'</button><div class="project-meta"><span>'+escapeHTML(localized(p.type))+'</span><span>2026</span></div><h3><button data-project="'+p.id+'">'+escapeHTML(language === 'fr' && p.titleFr || p.title)+'</button></h3><p>'+escapeHTML(localized(p.summary))+'</p><div class="tags">'+p.tags.map(tag=>'<span>'+escapeHTML(tag)+'</span>').join('')+'</div></article>').join('');
  const count = PROJECTS.filter(p => filter === 'all' || p.category === filter).length;
  $('#project-count').textContent = count + t(' projects', ' projets');
}
function renderArchive() {
  $('#archive-list').innerHTML = ARCHIVE.map(([title,repo]) => '<div class="archive-item"><span>'+escapeHTML(title)+'</span><a href="'+escapeHTML(repo.startsWith('https://') ? repo : 'https://github.com/abdul-basit-ai/'+repo)+'" target="_blank" rel="noopener noreferrer">'+t('Explore','Explorer')+'</a></div>').join('');
}
function renderDialog() {
  const p = PROJECTS.find(p=>p.id === openProjectId);
  if (!p) return;
  $('#dialog-content').innerHTML = visual(p,'dialog-visual')+'<div class="dialog-body"><p class="eyebrow">'+escapeHTML(localized(p.type))+'</p><h2 id="dialog-title">'+escapeHTML(language === 'fr' && p.titleFr || p.title)+'</h2><p>'+escapeHTML(localized(p.summary))+'</p><div class="tags">'+p.tags.map(x=>'<span>'+escapeHTML(x)+'</span>').join('')+'</div><h3>'+t('The question','Le défi')+'</h3><p>'+escapeHTML(localized(p.challenge))+'</p><h3>'+t('How I approached it','Mon approche')+'</h3><p>'+escapeHTML(localized(p.approach))+'</p><h3>'+t('What came out of it','Le résultat')+'</h3><p>'+escapeHTML(localized(p.outcome))+'</p><p class="dialog-note">'+escapeHTML(localized(p.scope))+'</p><div class="dialog-actions"><a class="button dark" href="https://github.com/abdul-basit-ai/'+p.repo+'" target="_blank" rel="noopener noreferrer">'+t('Explore the code','Explorer le code')+'</a><a class="text-link" href="https://github.com/abdul-basit-ai/'+p.repo+'#readme" target="_blank" rel="noopener noreferrer">'+t('Full documentation','Documentation')+'</a></div></div>';
}
function applyLanguage() {
  document.documentElement.lang = language;
  $$('[data-en][data-fr]').forEach(el=>{el.textContent=el.dataset[language];});
  $('#language-toggle').textContent = t('FR','EN');
  $('#language-toggle').setAttribute('aria-label',t('Switch to French','Passer en anglais'));
  $('#cv-link').href = 'Abdul_Basit_CV-'+language+'.pdf';
  $('#copy-email').setAttribute('aria-label',t('Copy email address','Copier l’adresse e-mail'));
  $('#copy-email').title = t('Copy email address','Copier l’adresse e-mail');
  $('#dialog-close').setAttribute('aria-label',t('Close project','Fermer le projet'));
  $('#main-nav').setAttribute('aria-label',t('Main navigation','Navigation principale'));
  $('.filters').setAttribute('aria-label',t('Filter projects','Filtrer les projets'));
  $('.shape-controls').setAttribute('aria-label',t('Point cloud shape','Forme du nuage de points'));
  $('#network-canvas').setAttribute('aria-label',t('Rotating point cloud. Change its form using the buttons below.','Nuage de points en rotation. Changez sa forme avec les boutons ci-dessous.'));
  renderProjects(); renderArchive();
  if (dialog.open) renderDialog();
  updateMotionLabel();
}
$('#language-toggle').addEventListener('click',()=>{language = t('fr','en');try{localStorage.setItem('portfolio-language',language);}catch{}applyLanguage();});
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  filter=button.dataset.filter;
  $$('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  renderProjects();
}));
let dialogTrigger = null;
$('#project-grid').addEventListener('click',event=>{
  const button=event.target.closest('[data-project]');
  if(!button)return;
  dialogTrigger=button;openProjectId=button.dataset.project;renderDialog();dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');$('#dialog-close').focus();
});
$('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');openProjectId=null;dialogTrigger?.focus();});
const menuButton=$('#menu-toggle'),nav=$('#main-nav');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){$$('#main-nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));}});},{rootMargin:'-15% 0px -55% 0px'});
$$('main section[id], #about').forEach(section=>navObserver.observe(section));
let toastTimeout;
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove('visible'),3000);}
$('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('basitmal36@gmail.com');toast(t('Email copied. Say hello!','Adresse copiée. À bientôt !'));}catch{toast(t('Email: basitmal36@gmail.com','E-mail : basitmal36@gmail.com'));}});
function updateTime(){$('#paris-time').textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Paris',hour:'2-digit',minute:'2-digit'}).format(new Date());}
updateTime();setInterval(updateTime,60000);$('#year').textContent=new Date().getFullYear();
// The hero is a small, locally rendered experiment, not a model-performance visualization.
const canvas=$('#network-canvas'),ctx=canvas.getContext('2d');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reducedMotion.matches,visible=true,shape='torus',angle=.4,width=0,height=0,frame=0,lastTime=0;
let pointer={x:0,y:0},targetPointer={x:0,y:0};
const pointCount=1152,points=[],targets=[];
function setShape(next){
  shape=next;targets.length=0;
  for(let i=0;i<pointCount;i++){
    const u=(i%48)/48*Math.PI*2,v=Math.floor(i/48)/24*Math.PI*2;
    let p;
    if(shape==='torus')p={x:(1+.4*Math.cos(v))*Math.cos(u),y:(1+.4*Math.cos(v))*Math.sin(u),z:.4*Math.sin(v)};
    else if(shape==='sphere'){const y=1-2*(i+.5)/pointCount,r=Math.sqrt(1-y*y),a=i*2.3999632297;p={x:1.3*r*Math.cos(a),y:1.3*y,z:1.3*r*Math.sin(a)};}
    else{const x=(i%48)/47*2.8-1.4,z=Math.floor(i/48)/23*2.8-1.4;p={x,y:.4*Math.sin(x*2.5)*Math.cos(z*2),z};}
    targets.push(p);if(!points[i])points.push({...p});
  }
  $$('[data-shape]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.shape===shape)));
}
function resizeCanvas(){const r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);width=r.width;height=r.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);draw(false);}
function draw(animate){
  if(!ctx||!width)return;
  ctx.clearRect(0,0,width,height);
  if(animate){angle+=.004;pointer.x+=(targetPointer.x-pointer.x)*.035;pointer.y+=(targetPointer.y-pointer.y)*.035;}
  const scale=width*.235,rx=.9+pointer.y*.4,ry=angle+pointer.x*.5,rz=-.4;
  const projected=points.map((p,i)=>{
    const q=targets[i];const ease=animate ? 0.07 : 1;
    p.x+=(q.x-p.x)*ease;p.y+=(q.y-p.y)*ease;p.z+=(q.z-p.z)*ease;
    let x=p.x*Math.cos(ry)+p.z*Math.sin(ry),z=-p.x*Math.sin(ry)+p.z*Math.cos(ry);
    let y=p.y*Math.cos(rx)-z*Math.sin(rx);z=p.y*Math.sin(rx)+z*Math.cos(rx);
    const xx=x*Math.cos(rz)-y*Math.sin(rz),yy=x*Math.sin(rz)+y*Math.cos(rz),perspective=4.5/(4.5+z);
    return {x:width/2+xx*scale*perspective,y:height*.48+yy*scale*perspective,z,r:(1.1+(z+1.5)*.28)*Math.min(width/460,1.3)};
  }).sort((a,b)=>b.z-a.z);
  projected.forEach(p=>{ctx.beginPath();ctx.fillStyle='hsla('+(84+p.z*8)+', '+(45-p.z*10)+'%, '+(30+p.z*10)+'%, '+(.8-p.z*.15)+')';ctx.arc(p.x,p.y,Math.max(.5,p.r),0,Math.PI*2);ctx.fill();});
}
function tick(time){frame=0;if(paused||!visible||document.hidden)return;if(time-lastTime>30){draw(true);lastTime=time;}frame=requestAnimationFrame(tick);}
function syncAnimation(){if(frame)cancelAnimationFrame(frame);frame=0;if(!paused&&visible&&!document.hidden&&ctx)frame=requestAnimationFrame(tick);else draw(false);}
function updateMotionLabel(){$('#motion-toggle').textContent=paused?t('Play','Animer'):t('Pause','Pause');$('#motion-toggle').setAttribute('aria-pressed',String(paused));}
$('#motion-toggle').addEventListener('click',()=>{paused=!paused;updateMotionLabel();syncAnimation();});
$$('[data-shape]').forEach(b=>b.addEventListener('click',()=>{setShape(b.dataset.shape);if(paused)draw(false);}));
canvas.addEventListener('pointermove',event=>{const r=canvas.getBoundingClientRect();targetPointer={x:(event.clientX-r.left)/r.width-.5,y:(event.clientY-r.top)/r.height-.5};});
canvas.addEventListener('pointerleave',()=>{targetPointer={x:0,y:0};});
reducedMotion.addEventListener('change',event=>{paused=event.matches;updateMotionLabel();syncAnimation();});
document.addEventListener('visibilitychange',syncAnimation);
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncAnimation();}).observe(canvas);
setShape('torus');new ResizeObserver(resizeCanvas).observe(canvas);applyLanguage();syncAnimation();
