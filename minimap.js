/* Dead Man's Gulch – GTA-SA style radar + full map (hold nothing, press M). Load AFTER world.js. */
(()=>{const W=window.WORLD;if(!W)return;
const N=W.n,SZ=W.size,HF=SZ/2,B=1200,bc=document.createElement('canvas');bc.width=bc.height=B;
{const x=bc.getContext('2d'),im=x.createImageData(B,B),d=im.data,p=W.pos,c=W.col,k=(N-1.002)/B,
 S=(a,u,v,o)=>{const i=u|0,j=v|0,fa=u-i,fb=v-j,q=(j*N+i)*3+o;return a[q]*(1-fa)*(1-fb)+a[q+3]*fa*(1-fb)+a[q+N*3]*(1-fa)*fb+a[q+N*3+3]*fa*fb};
 for(let py=0;py<B;py++)for(let px=0;px<B;px++){const u=(px+.5)*k,v=(py+.5)*k,h=S(p,u,v,1),o=(py*B+px)*4;let r,g,b;
  if(h<-.5){const t=Math.min(1,(-h-.5)/2);r=96-58*t;g=170-84*t;b=200-60*t}
  else{const sh=Math.max(.65,Math.min(1.35,1+(S(p,Math.max(0,u-.8),Math.max(0,v-.8),1)-S(p,Math.min(N-1.1,u+.8),Math.min(N-1.1,v+.8),1))*.05))*.92;r=S(c,u,v,0)*255*sh;g=S(c,u,v,1)*255*sh;b=S(c,u,v,2)*255*sh}
  d[o]=r;d[o+1]=g;d[o+2]=b;d[o+3]=255}
 x.putImageData(im,0,0)}
const R0=92,C0=R0+7,CW=C0*2,rc=document.createElement('canvas');rc.width=CW;rc.height=CW+24;
rc.style.cssText='position:absolute;left:12px;bottom:84px;pointer-events:none;filter:drop-shadow(0 3px 6px #000a)';document.getElementById('hud').appendChild(rc);
const g=rc.getContext('2d'),fo=document.createElement('div'),fc=document.createElement('canvas'),f=fc.getContext('2d');
fo.style.cssText='position:fixed;inset:0;z-index:4;background:rgba(10,6,2,.72);display:none;align-items:center;justify-content:center;pointer-events:none';fo.appendChild(fc);document.body.appendChild(fo);
let zm=1,open=false;
const star=(c,x,y,r,col)=>{c.fillStyle=col;c.beginPath();for(let i=0;i<10;i++){const a=i*.628-1.57,d=i%2?r*.45:r;c.lineTo(x+Math.cos(a)*d,y+Math.sin(a)*d)}c.fill()},
 dot=(c,x,y,r,col)=>{c.fillStyle=col;c.strokeStyle='#000b';c.lineWidth=1.5;c.beginPath();c.arc(x,y,r,0,6.283);c.fill();c.stroke()},
 arrow=(c,sz,col)=>{c.fillStyle=col;c.strokeStyle='#000';c.lineWidth=1.5;c.beginPath();c.moveTo(0,-sz);c.lineTo(sz*.7,sz*.8);c.lineTo(0,sz*.4);c.lineTo(-sz*.7,sz*.8);c.closePath();c.fill();c.stroke()};
function blips(c,sx,sz,r,m){ // m(x,z)->[px,py]
 for(const o of W.fl){const[a,b]=m(o[0],o[1]);if(a*a+b*b<r*r){c.fillStyle='#fff';c.strokeStyle='#000';c.lineWidth=1.5;c.fillRect(a-3.5,b-3.5,7,7);c.strokeRect(a-3.5,b-3.5,7,7)}}
 for(const h of H){const[a,b]=m(h.g.position.x,h.g.position.z);if(a*a+b*b<r*r)dot(c,a,b,2.4,'#c98b4a')}
 for(const n of NPS){const[a,b]=m(n.x,n.z);if(a*a+b*b<r*r)dot(c,a,b,3.4,'#ffd060')}
 if(c===g)for(const e of E){if(e.hp<=0||!e.g)continue;const[a,b]=m(e.g.position.x,e.g.position.z);if(a*a+b*b<r*r)dot(c,a,b,3.2,'#e8342a')}}
function radar(){const c=C0;g.clearRect(0,0,CW,CW+24);g.save();g.translate(c,c);g.beginPath();g.arc(0,0,R0,0,6.283);g.fillStyle='#1b2a38';g.fill();g.clip();
 g.rotate(P.yaw);g.imageSmoothingQuality='high';g.drawImage(bc,-(P.x+HF)*zm,-(P.z+HF)*zm,SZ*zm,SZ*zm);
 const m=(x,z)=>[(x-P.x)*zm,(z-P.z)*zm];blips(g,0,0,R0-5,m);
 g.rotate(-P.yaw);const fg=g.createLinearGradient(0,0,0,-R0);fg.addColorStop(0,'rgba(255,255,255,.28)');fg.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=fg;g.beginPath();g.moveTo(0,0);g.lineTo(-R0*.62,-R0);g.lineTo(R0*.62,-R0);g.fill();
 g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.arc(0,0,R0,0,6.283);g.arc(0,0,R0*.62,0,6.283,true);g.fill();arrow(g,8,'#fff');g.restore();
 g.lineWidth=5;g.strokeStyle='#2a170c';g.beginPath();g.arc(c,c,R0+1,0,6.283);g.stroke();g.lineWidth=2;g.strokeStyle='#d4a24a';g.beginPath();g.arc(c,c,R0-1,0,6.283);g.stroke();
 const nx=c+Math.sin(P.yaw)*(R0-11),ny=c-Math.cos(P.yaw)*(R0-11);dot(g,nx,ny,8,'#b3321f');g.fillStyle='#fff';g.font='bold 11px serif';g.textAlign='center';g.textBaseline='middle';g.fillText('N',nx,ny+.5);
 g.font='bold 13px serif';g.lineWidth=3;g.strokeStyle='#000';g.fillStyle='#ffe9b0';const t=(W.cur||'Open Range').toUpperCase();g.strokeText(t,c,CW+10);g.fillText(t,c,CW+10)}
function full(){const S=Math.floor(Math.min(innerWidth,innerHeight)*.88),I=S-36;if(fc.width!=S){fc.width=fc.height=S}
 f.fillStyle='#d9c08a';f.fillRect(0,0,S,S);f.drawImage(bc,18,18,I,I);f.strokeStyle='#2a170c';f.lineWidth=6;f.strokeRect(15,15,I+6,I+6);
 const m=(x,z)=>[(x+HF)/SZ*I+18,(z+HF)/SZ*I+18],sub=(x,z)=>{const[a,b]=m(x,z);return[a-S/2,b-S/2]};
 f.save();f.translate(S/2,S/2);blips(f,0,0,S,sub);f.restore();
 f.font='bold 13px serif';f.textAlign='center';f.textBaseline='middle';f.lineWidth=3.5;f.strokeStyle='#000c';
 for(const r of W.reg){const[a,b]=m(r[1],r[2]),ok=r[0]=="Dead Man's Gulch"||(W.ds&&W.ds.has(r[0]));f.fillStyle=ok?'#fff0c8':'#c9b98e';const t=ok?r[0]:'? ? ?';f.strokeText(t,a,b);f.fillText(t,a,b)}
 const[ta,tb]=m(0,0);star(f,ta,tb+14,8,'#ffd060');
 const[pa,pb]=m(P.x,P.z);f.save();f.translate(pa,pb);f.rotate(-P.yaw);arrow(f,10,'#fff');f.restore();
 f.fillStyle='#2a170c';f.font='bold 16px serif';f.textAlign='left';f.fillText('TERRITORY MAP  ·  M to close  ·  discovered '+(W.ds?W.ds.size:0)+'/'+(W.reg.length),26,S-9);
 f.textAlign='right';f.fillStyle='#2a170c';f.fillText('☐ settlement  ● friendly  ● horse',S-26,S-9)}
const tog=()=>{open=!open;fo.style.display=open?'flex':'none'};
addEventListener('keydown',e=>{if(e.code=='KeyM'&&!e.repeat&&(state=='playing'||open))tog()});
(function l(){requestAnimationFrame(l);const on=typeof P!='undefined'&&P&&(state=='playing'||state=='paused');rc.style.display=on?'block':'none';
 if(!on){if(open)tog();return}zm+=((P.horse?.62:1)-zm)*.08;radar();if(open)full()})();
})();
/* ---- Peaceful Roam: free roam with no enemies ---- */
(()=>{let peace=false;const r=$('bRoam');if(!r)return;
const b=r.cloneNode(true);b.id='bPeace';b.textContent='Peaceful Roam (no enemies)';r.after(b);
const oh=hurt;hurt=(...a)=>peace?0:oh(...a);
b.onclick=()=>{r.click();peace=true;banner('Peaceful roam: explore in peace',3)};
for(const id of['bStart','bRoam'])$(id).addEventListener('click',()=>peace=false);
(function l(){requestAnimationFrame(l);if(!peace||typeof state=='undefined'||state!='playing')return;
 P.hp=100;for(const e of E.slice())rm(e);$('wanted').style.display='none'})();
})();
/* ---- remove the old 620 m world limit at runtime (no HTML edit needed) ---- */
{const px=(f,a,b)=>(0,eval)('('+f.toString().split(a).join(b)+')');
 updP=px(updP,'roam?620:72','roam?1150:72');updLaw=px(updLaw,'Math.hypot(x,z)<650','Math.hypot(x,z)<1180');updRoam=px(updRoam,'Math.hypot(x,z)<650','Math.hypot(x,z)<1180')}
