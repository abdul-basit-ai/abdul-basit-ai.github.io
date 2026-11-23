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
function workflowPreview(project) {
  const stages = {
    volt: [['Specify','Size','Simulate','Verify'],['Définir','Dimensionner','Simuler','Vérifier']],
    playora: [['Speak','Validate','Play','Narrate'],['Parler','Valider','Jouer','Raconter']],
    finance: [['Retrieve','Reason','Compute','Cite'],['Rechercher','Raisonner','Calculer','Sourcer']],
    vision: [['Curate','Fine-tune','Ablate','Evaluate'],['Préparer','Adapter','Tester','Évaluer']],
    feed: [['Retrieve','Calculate','Interpret','Report'],['Collecter','Calculer','Interpréter','Rapporter']],
    spatial: [['Select','Place','Check','Guide'],['Choisir','Placer','Vérifier','Guider']]
  };
  const artwork=visual(project);
  const overlay='<span class="workflow-hint" aria-hidden="true">'+t('Hover to follow the workflow','Survolez pour suivre le parcours')+'</span><div class="workflow-preview" aria-hidden="true">'+localized(stages[project.visual]).map((stage,index)=>'<span class="workflow-step" style="--step:'+index+'">'+escapeHTML(stage)+'</span>'+(index<3?'<span class="workflow-connector"></span>':'')).join('')+'</div>';
  return artwork.slice(0,-6)+overlay+'</div>';
}
function renderProjects() {
  $('#project-grid').innerHTML = PROJECTS.map(p => '<article class="project-card"'+(filter !== 'all' && p.category !== filter ? ' hidden' : '')+'><button class="visual-button" data-project="'+p.id+'" aria-label="'+escapeHTML(t('Explore ','Découvrir ')+(language === 'fr' && p.titleFr || p.title))+'">'+workflowPreview(p)+'</button><div class="project-meta"><span>'+escapeHTML(localized(p.type))+'</span><span>2026</span></div><h3><button data-project="'+p.id+'">'+escapeHTML(language === 'fr' && p.titleFr || p.title)+'</button></h3><p>'+escapeHTML(localized(p.summary))+'</p><div class="tags">'+p.tags.map(tag=>'<span>'+escapeHTML(tag)+'</span>').join('')+'</div></article>').join('');
  const count = PROJECTS.filter(p => filter === 'all' || p.category === filter).length;
  $('#project-count').textContent = count + t(' projects', ' projets');
  renderHeroPicks();
}
function renderHeroPicks() {
  const picks = [
    ['finance', ['Financial reasoning, with receipts.', 'Raisonnement financier, sources à l’appui.']],
    ['voltforge', ['An agent that engineers.', 'Un agent qui conçoit.']],
    ['playora', ['A voice. Five ways to play.', 'Une voix. Cinq façons de jouer.']]
  ];
  $('#hero-picks').innerHTML = picks.map(([id, caption]) => {
    const p = PROJECTS.find(project => project.id === id);
    const title = id === 'finance' ? t('Financial Agent', 'Agent financier') : p.title;
    return '<button class="hero-pick" data-project="'+p.id+'" aria-label="'+escapeHTML(t('Explore ', 'Découvrir ')+p.title)+'"><span class="pick-thumbnail" aria-hidden="true">'+visual(p)+'</span><span class="pick-copy"><strong>'+title+'</strong><span>'+escapeHTML(localized(caption))+'</span></span><span class="pick-open" aria-hidden="true">+</span></button>';
  }).join('');
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
  $('.nav-x').setAttribute('aria-label',t('Abdul Basit on X','Abdul Basit sur X'));
  $('.filters').setAttribute('aria-label',t('Filter projects','Filtrer les projets'));
  $('#pip-button').setAttribute('aria-label',t('Meet Pip, the little studio bird','Rencontrer Pip, le petit oiseau du studio'));
  $('#pip-close').setAttribute('aria-label',t('Close Pip menu','Fermer le menu de Pip'));
  $('.hero-picks').setAttribute('aria-label',t('A few things I have built','Quelques-unes de mes créations'));
  renderProjects(); renderArchive();
  if (dialog.open) renderDialog();
  document.dispatchEvent(new Event('portfolio:languagechange'));
}
$('#language-toggle').addEventListener('click',()=>{language = t('fr','en');try{localStorage.setItem('portfolio-language',language);}catch{}applyLanguage();});
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  filter=button.dataset.filter;
  $$('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  renderProjects();
}));
let dialogTrigger = null;
function openProject(id, trigger) {
  dialogTrigger=trigger;openProjectId=id;renderDialog();dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');$('#dialog-close').focus();
}
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-project]');
  if(!button)return;
  openProject(button.dataset.project, button);
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
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
applyLanguage();

// Pip reacts to input only: no perpetual animation or cursor-following loop.
const pipButton=$('#pip-button'),pipPanel=$('#pip-panel'),scene=$('.hero-scene');
let pipAnimationTimer,lastPick=-1,audioContext;
function closePip(restoreFocus=false){pipPanel.hidden=true;pipButton.setAttribute('aria-expanded','false');if(restoreFocus)pipButton.focus();}
function greetPip(){
  pipButton.classList.remove('pip-hop');
  clearTimeout(pipAnimationTimer);
  requestAnimationFrame(()=>{pipButton.classList.add('pip-hop');pipAnimationTimer=setTimeout(()=>pipButton.classList.remove('pip-hop'),700);});
}
pipButton.addEventListener('click',()=>{const open=pipPanel.hidden;pipPanel.hidden=!open;pipButton.setAttribute('aria-expanded',String(open));greetPip();});
$('#pip-close').addEventListener('click',()=>closePip(true));
document.addEventListener('click',event=>{if(!event.target.closest('.bird-companion'))closePip();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!pipPanel.hidden){closePip(true);}});
$('#pip-surprise').addEventListener('click',()=>{
  let index=Math.floor(Math.random()*PROJECTS.length);
  if(index===lastPick)index=(index+1)%PROJECTS.length;
  lastPick=index;closePip();openProject(PROJECTS[index].id,pipButton);
});
$('#pip-chirp').addEventListener('click',async()=>{
  greetPip();
  const message=$('#pip-message');
  message.dataset.en='Chirp! That’s bird for “thanks for stopping by.”';
  message.dataset.fr='Cui-cui ! Ça veut dire « merci pour la visite ».';
  message.textContent=message.dataset[language];
  const AudioEngine=window.AudioContext||window.webkitAudioContext;
  if(!AudioEngine)return;
  try{
    audioContext??=new AudioEngine();await audioContext.resume();
    for(let i=0;i<2;i++){
      const oscillator=audioContext.createOscillator(),gain=audioContext.createGain(),start=audioContext.currentTime+i*.15;
      oscillator.type='sine';oscillator.frequency.setValueAtTime(2100,start);oscillator.frequency.exponentialRampToValueAtTime(3600,start+.05);oscillator.frequency.exponentialRampToValueAtTime(2500,start+.11);
      gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(.035,start+.015);gain.gain.exponentialRampToValueAtTime(.001,start+.12);
      oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.start(start);oscillator.stop(start+.13);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
    }
  }catch{/* The visual greeting still works if audio is unavailable. */}
});
scene.addEventListener('pointermove',event=>{
  if(reducedMotion.matches||event.pointerType==='touch')return;
  const rect=scene.getBoundingClientRect();
  scene.style.setProperty('--pip-look-x',Math.max(-2,Math.min(2,(event.clientX-rect.left-rect.width*.75)/100))+'px');
  scene.style.setProperty('--pip-look-y',Math.max(-1.5,Math.min(1.5,(event.clientY-rect.top-rect.height*.7)/100))+'px');
},{passive:true});
scene.addEventListener('pointerleave',()=>{scene.style.setProperty('--pip-look-x','0px');scene.style.setProperty('--pip-look-y','0px');});
