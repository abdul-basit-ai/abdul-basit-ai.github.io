'use strict';
(() => {
  const root=document.querySelector('#orange-story');
  if(!root)return;
  const $=selector=>root.querySelector(selector);
  const buttons=[...root.querySelectorAll('[data-network-step]')];
  const steps=['normal','degrading','cascade','detected','reroute'];
  const base={A:80,B:88,C:28,D:54,E:30};
  const capacity={A:100,B:100,C:100,D:75,E:100};
  const text={
    normal:{title:['All connected. For now.','Tout le monde est connecté.'],body:['Five radio sites share a neighbourhood. Each serves people and passes traffic to nearby sites. Those connections mean a problem rarely stays in one place.','Cinq sites radio desservent un quartier et échangent du trafic. Ces dépendances font qu’un problème reste rarement isolé.'],detail:['The towers and loads are a small teaching example, not Orange operational data.','Les antennes et les charges sont un exemple pédagogique, pas des données opérationnelles Orange.']},
    degrading:{title:['The trouble starts quietly.','Le problème commence discrètement.'],body:['A radio site starts degrading. Drop rates rise and its service quality slips. Looking at a single tower misses the surrounding traffic dependencies—the context my research models as a directed graph.','Un site se dégrade : les coupures augmentent et la qualité baisse. Observer une antenne isolément ne révèle pas les dépendances de trafic que ma recherche représente dans un graphe dirigé.'],detail:['Observed degradation, not a prediction of a future outage.','Une dégradation observée, pas une prédiction de panne.']},
    cascade:{title:['One fault. More than one victim.','Une panne. Plusieurs victimes.'],body:['Site A fails. Some people lose service; others reconnect nearby. Traffic follows the usual paths, overloading B and then putting pressure on D. My report’s synthetic generator models this redistribution and its cascading KPI effects.','Le site A tombe en panne. Certains utilisateurs perdent le service ; d’autres se reconnectent ailleurs. Les trajets habituels surchargent B puis D. Mon générateur synthétique modélise cette redistribution et ses effets en cascade.'],detail:['Displayed percentages are illustrative offered demand relative to site capacity.','Les pourcentages représentent une demande illustrative rapportée à la capacité.']},
    detected:{title:['See the pattern, not just the tower.','Voir le motif, pas seulement l’antenne.'],body:['Rewind to the warning signs. I built an ANEMONE-inspired, self-supervised detector with edge-aware GATv2 encoders. Five-day windows combine recent radio KPIs with inter-site relationships to rank abnormal sites for investigation.','Revenons aux premiers signes. J’ai conçu un détecteur autosupervisé inspiré d’ANEMONE, avec GATv2 et les attributs des liens. Des fenêtres de cinq jours combinent les KPI récents et les relations entre sites pour classer les anomalies à analyser.'],detail:['Evaluated result: 0.963 AUROC on the synthetic anomaly test set.','Résultat évalué : 0,963 AUROC sur le test d’anomalies synthétiques.']},
    reroute:{title:['What if recovery respected spare capacity?','Et si la reprise respectait les capacités ?'],body:['A possible next step: distribute reconnecting users according to the spare capacity of reachable neighbours. In this toy example, 64 reconnecting users are spread without overloading the remaining sites; 16 initial disconnections remain.','Une piste de prolongement : répartir les utilisateurs selon la capacité disponible des voisins accessibles. Dans cet exemple, 64 reconnexions sont réparties sans surcharge ; les 16 déconnexions initiales restent présentes.'],detail:['Illustrative capacity-aware policy. The report evaluates detection, not this routing controller.','Politique de routage illustrative. Le rapport évalue la détection, pas ce contrôleur.']}
  };
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const phaseDuration=2400;
  let state='normal',playing=false,visible=false,autoEnabled=!motion.matches,manualSelection=false,timer;
  const tr=value=>value[document.documentElement.lang==='fr'?1:0];
  function updatePlayLabel(){const b=$('#network-play');b.textContent=tr(playing?['Pause the story','Mettre en pause']:['Play the story','Lancer l’histoire']);b.setAttribute('aria-pressed',String(playing));}
  function render(){
    const entry=text[state],copy=$('#network-story-copy');
    copy.setAttribute('aria-live',playing?'off':'polite');
    copy.replaceChildren();
    for(const [tag,key] of [['h3','title'],['p','body'],['p','detail']]){const el=document.createElement(tag);el.textContent=tr(entry[key]);if(key==='detail')el.className='story-detail';copy.append(el);}
    $('.network-stage').dataset.state=state;
    root.dataset.playing=String(playing);
    buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.networkStep===state)));
    let loads={...base};
    if(state==='cascade')loads={A:0,B:136,C:44,D:82.8,E:45};
    if(state==='reroute'){
      loads.A=0;
      const neighbours=['B','C','D','E'],spare=neighbours.reduce((sum,id)=>sum+capacity[id]-base[id],0);
      neighbours.forEach(id=>{loads[id]+=64*(capacity[id]-base[id])/spare;});
    }
    root.querySelectorAll('[data-node]').forEach(node=>{
      const id=node.dataset.node,load=loads[id],ratio=load/capacity[id];
      const down=id==='A'&&['cascade','reroute'].includes(state);
      const flagged=id==='A'&&state==='detected';
      const warning=ratio>1||(id==='A'&&state==='degrading');
      node.dataset.status=down?'down':flagged?'detected':warning?'pressure':'healthy';
      node.querySelector('.tower-load').textContent=down?tr(['Offline','Hors service']):Math.round(ratio*100)+'%';
      node.querySelector('.tower-meter').setAttribute('width',String(Math.min(1,ratio)*62));
    });
    root.querySelectorAll('[data-edge]').forEach(edge=>{
      const key=edge.dataset.edge;
      edge.dataset.flow=state==='cascade'&&['AB','BD','DE'].includes(key)?'pressure':state==='reroute'?'balanced':state==='normal'?'normal':'quiet';
    });
    $('#network-svg-title').textContent=tr(['How a radio anomaly affects neighbouring sites','Comment une anomalie affecte les sites voisins']);
    $('#network-svg-desc').textContent=tr(entry.body);
    $('.story-step-controls').setAttribute('aria-label',tr(['Explore the network story','Explorer l’histoire du réseau']));
    updatePlayLabel();
  }
  function schedule(){
    if(!playing)return;
    timer=setTimeout(()=>{
      timer=undefined;
      if(!shouldPlay()){syncPlayback();return;}
      state=steps[(steps.indexOf(state)+1)%steps.length];render();schedule();
    },phaseDuration);
  }
  function shouldPlay(){return autoEnabled&&visible&&!document.hidden&&!document.querySelector('#project-dialog[open]');}
  function syncPlayback(){
    const next=shouldPlay();
    if(next!==playing){playing=next;clearTimeout(timer);timer=undefined;if(playing)schedule();}
    $('#network-story-copy').setAttribute('aria-live',playing?'off':'polite');
    root.dataset.playing=String(playing);
    updatePlayLabel();
  }
  buttons.forEach(b=>b.addEventListener('click',()=>{manualSelection=true;autoEnabled=false;syncPlayback();state=b.dataset.networkStep;render();}));
  $('#network-play').addEventListener('click',()=>{
    autoEnabled=!playing;manualSelection=!autoEnabled;syncPlayback();render();
  });
  $('#network-reset').addEventListener('click',()=>{manualSelection=true;autoEnabled=false;syncPlayback();state='normal';render();});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.25;syncPlayback();},{threshold:[0,.25]}).observe($('.network-stage'));
  document.addEventListener('visibilitychange',syncPlayback);
  const projectDialog=document.querySelector('#project-dialog');
  projectDialog.addEventListener('toggle',syncPlayback);
  projectDialog.addEventListener('close',syncPlayback);
  motion.addEventListener('change',()=>{autoEnabled=!motion.matches&&!manualSelection;syncPlayback();});
  document.addEventListener('portfolio:languagechange',render);
  render();
})();
