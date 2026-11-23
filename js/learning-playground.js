'use strict';
(() => {
  const root=document.querySelector('#playground');
  const canvas=root.querySelector('#learning-canvas'),ctx=canvas.getContext('2d');
  if(!ctx)return;
  const $=selector=>root.querySelector(selector);
  const tr=(en,fr)=>document.documentElement.lang==='fr'?fr:en;
  const initial=[
    [.17,.23,0],[.25,.18,0],[.31,.32,0],[.16,.42,0],
    [.36,.48,0],[.24,.61,0],[.42,.29,0],[.12,.66,0],
    [.69,.27,1],[.79,.42,1],[.65,.57,1],[.84,.68,1],
    [.56,.74,1],[.72,.81,1],[.47,.59,1],[.88,.28,1]
  ];
  let points=initial.map(([x,y,label])=>({x,y,label}));
  let mode='mint',k=3,width=0,height=0,aspect=1,query={x:.5,y:.5},hasQuery=false;
  let inView=false,frame=0,fieldDirty=true;
  const field=document.createElement('canvas');field.width=128;field.height=96;
  const fieldContext=field.getContext('2d');
  const colours=['#638a46','#8a67a7'];
  const clamp=v=>Math.max(.025,Math.min(.975,v));
  function nearest(x,y){
    return points.map((p,index)=>({index,d:((p.x-x)*aspect)**2+(p.y-y)**2})).sort((a,b)=>a.d-b.d||b.index-a.index).slice(0,k);
  }
  function vote(neighbours){const mint=neighbours.reduce((n,p)=>n+(points[p.index].label===0),0);return {label:mint>neighbours.length/2?0:1,mint,total:neighbours.length};}
  function announce(message){$('#learning-status').textContent=message;}
  function updateAnswer(){
    $('#learning-count').textContent=points.length+tr(' examples',' exemples');
    $('#learning-neighbour-value').value=String(k);
    $('#learning-undo').disabled=points.length===initial.length;
    const answer=$('#learning-prediction'),votes=$('#learning-votes');
    if(!hasQuery){answer.textContent=tr('What will it learn?','Que va-t-il apprendre ?');answer.removeAttribute('data-class');votes.textContent=tr('Add examples, or choose Ask to test the model.','Ajoutez des exemples, ou choisissez Tester pour interroger le modèle.');return;}
    const result=vote(nearest(query.x,query.y));
    const label=result.label===0?tr('Mint','Menthe'):tr('Plum','Prune');
    answer.textContent=label;answer.dataset.class=String(result.label);
    const count=result.label===0?result.mint:result.total-result.mint;
    votes.textContent=tr(count+' of '+result.total+' nearest examples vote '+label+'.',count+' des '+result.total+' plus proches exemples votent '+label+'.');
  }
  function buildField(){
    const image=fieldContext.createImageData(field.width,field.height);
    const distances=new Float64Array(k),labels=new Uint8Array(k);
    const palette=Array.from({length:k+1},(_,mint)=>[229+(218-229)*mint/k,219+(235-219)*mint/k,239+(200-239)*mint/k]);
    for(let y=0;y<field.height;y++)for(let x=0;x<field.width;x++){
      distances.fill(Infinity);labels.fill(1);
      const px=(x+.5)/field.width,py=(y+.5)/field.height;
      for(const p of points){
        const d=((p.x-px)*aspect)**2+(p.y-py)**2;
        let j=k-1;if(d>distances[j])continue;
        while(j>0&&d<=distances[j-1]){distances[j]=distances[j-1];labels[j]=labels[j-1];j--;}
        distances[j]=d;labels[j]=p.label;
      }
      let mint=0;for(const label of labels)if(label===0)mint++;
      const colour=palette[mint],offset=(y*field.width+x)*4;
      image.data[offset]=colour[0];image.data[offset+1]=colour[1];image.data[offset+2]=colour[2];image.data[offset+3]=255;
    }
    fieldContext.putImageData(image,0,0);fieldDirty=false;
  }
  function point(x,y,label,radius){
    ctx.beginPath();
    if(label===0)ctx.arc(x,y,radius,0,Math.PI*2);
    else{ctx.moveTo(x,y-radius-1);ctx.lineTo(x+radius+1,y);ctx.lineTo(x,y+radius+1);ctx.lineTo(x-radius-1,y);ctx.closePath();}
    ctx.fillStyle=colours[label];ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='#f8faf3';ctx.stroke();
  }
  function draw(){
    if(!width||!height)return;
    if(fieldDirty)buildField();
    ctx.clearRect(0,0,width,height);ctx.drawImage(field,0,0,width,height);
    ctx.lineWidth=1;ctx.strokeStyle='#71866720';ctx.beginPath();
    for(let i=1;i<10;i++){ctx.moveTo(width*i/10,0);ctx.lineTo(width*i/10,height);ctx.moveTo(0,height*i/10);ctx.lineTo(width,height*i/10);}
    ctx.stroke();
    const neighbours=hasQuery&&mode==='ask'?nearest(query.x,query.y):[];
    if(neighbours.length){
      ctx.setLineDash([4,5]);ctx.strokeStyle='#40513c88';ctx.beginPath();
      for(const {index} of neighbours){ctx.moveTo(query.x*width,query.y*height);ctx.lineTo(points[index].x*width,points[index].y*height);}
      ctx.stroke();ctx.setLineDash([]);
    }
    for(let i=0;i<points.length;i++){
      const p=points[i];
      if(neighbours.some(n=>n.index===i)){ctx.beginPath();ctx.arc(p.x*width,p.y*height,11,0,Math.PI*2);ctx.strokeStyle='#4c5b4599';ctx.lineWidth=1;ctx.stroke();}
      point(p.x*width,p.y*height,p.label,6);
    }
    if(hasQuery){
      const x=query.x*width,y=query.y*height;
      ctx.beginPath();ctx.arc(x,y,10,0,Math.PI*2);ctx.fillStyle='#f8faf3e8';ctx.fill();ctx.strokeStyle='#34482d';ctx.lineWidth=1.5;ctx.stroke();
      if(mode==='ask'){ctx.fillStyle='#34482d';ctx.font='600 13px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('?',x,y+.5);}
      else{ctx.strokeStyle=colours[mode==='mint'?0:1];ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+4,y);ctx.moveTo(x,y-4);ctx.lineTo(x,y+4);ctx.stroke();}
    }
  }
  function requestDraw(){if(frame||!inView||document.hidden)return;frame=requestAnimationFrame(()=>{frame=0;if(inView&&!document.hidden)draw();});}
  function setMode(next){mode=next;root.dataset.mode=mode;root.querySelectorAll('[data-learning-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.learningMode===mode)));if(mode==='ask')hasQuery=true;updateAnswer();requestDraw();}
  function usePoint(){
    hasQuery=true;
    if(mode!=='ask'){
      if(points.length>=64){announce(tr('The board has 64 examples. Undo one or start again.','Le tableau contient 64 exemples. Annulez-en un ou recommencez.'));return;}
      points.push({x:query.x,y:query.y,label:mode==='mint'?0:1});fieldDirty=true;
      announce(tr('Example added. '+points.length+' examples on the board.','Exemple ajouté. '+points.length+' exemples dans le tableau.'));
    }else announce($('#learning-votes').textContent);
    updateAnswer();requestDraw();
  }
  function pointer(event){const r=canvas.getBoundingClientRect();query={x:clamp((event.clientX-r.left)/r.width),y:clamp((event.clientY-r.top)/r.height)};hasQuery=true;updateAnswer();requestDraw();}
  canvas.addEventListener('pointermove',event=>{if(event.pointerType!=='touch')pointer(event);},{passive:true});
  canvas.addEventListener('pointerdown',event=>{if(event.button!==0)return;pointer(event);canvas.focus({preventScroll:true});usePoint();});
  canvas.addEventListener('keydown',event=>{
    const step=event.shiftKey ? 0.1 : 0.025;
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
      event.preventDefault();hasQuery=true;
      if(event.key==='ArrowLeft')query.x=clamp(query.x-step);if(event.key==='ArrowRight')query.x=clamp(query.x+step);
      if(event.key==='ArrowUp')query.y=clamp(query.y-step);if(event.key==='ArrowDown')query.y=clamp(query.y+step);
      updateAnswer();requestDraw();
    }else if(event.key==='Enter'||event.key===' '){event.preventDefault();hasQuery=true;updateAnswer();usePoint();}
  });
  root.querySelectorAll('[data-learning-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.learningMode)));
  $('#learning-neighbours').addEventListener('input',event=>{k=Number(event.target.value);fieldDirty=true;updateAnswer();requestDraw();});
  $('#learning-undo').addEventListener('click',()=>{if(points.length<=initial.length)return;points.pop();fieldDirty=true;updateAnswer();requestDraw();announce(tr('Last example removed.','Dernier exemple supprimé.'));});
  $('#learning-reset').addEventListener('click',()=>{points=initial.map(([x,y,label])=>({x,y,label}));hasQuery=false;query={x:.5,y:.5};k=3;$('#learning-neighbours').value='3';fieldDirty=true;setMode('mint');announce(tr('Back to the original examples.','Les exemples initiaux sont rétablis.'));});
  function localize(){
    canvas.setAttribute('aria-label',tr('Interactive nearest-neighbour classifier. Arrow keys move the cursor. Enter adds an example or tests a point.','Classificateur interactif par plus proches voisins. Les flèches déplacent le curseur. Entrée ajoute un exemple ou teste un point.'));
    $('.learning-modes').setAttribute('aria-label',tr('Choose an action','Choisir une action'));updateAnswer();requestDraw();
  }
  new ResizeObserver(()=>{
    const r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
    width=r.width;height=r.height;aspect=width/height;
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);fieldDirty=true;updateAnswer();requestDraw();
  }).observe(canvas);
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(!inView&&frame){cancelAnimationFrame(frame);frame=0;}requestDraw();}).observe(canvas);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}else requestDraw();});
  document.addEventListener('portfolio:languagechange',localize);
  setMode('mint');localize();
})();
