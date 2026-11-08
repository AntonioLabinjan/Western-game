/* Dead Man's Gulch – gameplay layer: wildlife + hunting, storms, ambient sound, kill streaks, horse whistle (H), hidden stashes, FOV kick. Load LAST (after polish.js). */
(()=>{
const ss=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)},V3=new T.Vector3(),hemi=scene.children.find(o=>o.isHemisphereLight);
/* ---------- wildlife ---------- */
const AN=[];
function mkAnimal(d,x,z){const g=new T.Group(),m=mat(d?0xb0804a:0x9a8a78),legs=[],add=(w,h,l,px,py,pz,mm)=>{const o=new T.Mesh(GB,mm||m);o.scale.set(w,h,l);o.position.set(px,py,pz);o.castShadow=true;g.add(o);return o};
 add(d?.5:.22,d?.55:.2,d?1.3:.4,0,d?1.15:.25,0);add(d?.25:.14,d?.3:.14,d?.4:.2,0,d?1.85:.38,d?-.85:-.22);
 if(d){add(.2,.7,.22,0,1.5,-.7).rotation.x=-.4;[-1,1].forEach(s=>add(.04,.5,.04,s*.12,2.2,-.85,mat(0x4a3a2a)))}else[-1,1].forEach(s=>add(.04,.22,.07,s*.05,.55,-.2));
 [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{const p=new T.Group(),h=d?.8:.18;p.position.set(a*(d?.2:.08),h,b*(d?.5:.14));const l=new T.Mesh(GB,m);l.scale.set(d?.1:.05,h,d?.1:.05);l.position.y=-h/2;p.add(l);g.add(p);legs.push(p)});
 g.position.set(x,gy(x,z),z);scene.add(g);AN.push({g,d,legs,v:0,th:R(0,6.28),t:R(0,5),dead:0,sc:0,ph:R(0,9)})}
/* ---------- weather ---------- */
const stormC=new T.Color(),dome=new T.Mesh(new T.SphereGeometry(430,16,10),new T.MeshBasicMaterial({color:0x3a4250,side:T.BackSide,transparent:true,opacity:0,depthWrite:false,fog:false}));dome.renderOrder=-1;scene.add(dome);
const RN=900,rp=new Float32Array(RN*6),ro=Array.from({length:RN},()=>[R(0,40),R(0,30),R(0,40)]),rain=new T.LineSegments(new T.BufferGeometry().setAttribute('position',new T.BufferAttribute(rp,3)),new T.LineBasicMaterial({color:0xaabbcc,transparent:true,opacity:0,depthWrite:false}));rain.frustumCulled=false;scene.add(rain);
const bolt=new T.LineSegments(new T.BufferGeometry().setAttribute('position',new T.BufferAttribute(new Float32Array(24*3),3)),new T.LineBasicMaterial({color:0xe8f0ff,fog:false}));bolt.frustumCulled=false;bolt.visible=false;scene.add(bolt);
let W=0,Wt=0,Wc=100+R(0,60),flash=0,nextL=3,boltT=0;
const wr=(a,l)=>((a%l)+l)%l-l/2;
function thunder(d){setTimeout(()=>{if(!AC)return;nz(0,2.8,500,50,.9);tn(0,1.6,70,35,.5,'sawtooth')},d/340*1000)}
function strike(){const a=R(0,6.28),d=R(150,450),bx0=P.x+Math.cos(a)*d,bz0=P.z+Math.sin(a)*d,p=bolt.geometry.attributes.position.array;let x=bx0,z=bz0;
 for(let i=0;i<12;i++){const y0=300-i*25;p.set([x,y0,z],i*6);x+=R(-12,12);z+=R(-12,12);p.set([x,y0-25,z],i*6+3)}bolt.geometry.attributes.position.needsUpdate=true;bolt.visible=true;boltT=.18;flash=1;thunder(d)}
/* ---------- ambient sound ---------- */
let aw,awf,ar,ev=2;
function aInit(){if(aw||!AC)return;const b=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 const mk=(ty,f,q)=>{const s=AC.createBufferSource();s.buffer=b;s.loop=true;const fl=AC.createBiquadFilter();fl.type=ty;fl.frequency.value=f;fl.Q.value=q;const g=AC.createGain();g.gain.value=0;s.connect(fl);fl.connect(g);g.connect(mg);s.start();return[g,fl]};
 [aw,awf]=mk('bandpass',420,.7);[ar]=mk('highpass',2600,.3)}
/* ---------- eagles ---------- */
const EG=Array.from({length:3},(_,i)=>{const m=new T.Mesh(new T.PlaneGeometry(3.4,.9).rotateX(-Math.PI/2),new T.MeshBasicMaterial({color:0x1a1008,side:T.DoubleSide}));m.userData={a:i*2.1,r:R(70,110),h:R(55,80),s:R(.12,.2)};scene.add(m);return m});
/* ---------- hidden stashes ---------- */
const SP=[[-100,-860],[650,-620],[900,60],[-980,40],[-770,-700],[270,-250],[-470,110],[560,-140],[-330,-560],[-60,380],[840,-900],[-640,300]],ST=[];
SP.forEach(q=>{let x=q[0],z=q[1];for(let r=0;r<90&&!(gy(x,z)>.4&&gy(x,z)<60);r+=3){const a=R(0,6.28);x=q[0]+Math.cos(a)*r;z=q[1]+Math.sin(a)*r}
 const y=gy(x,z),g=new T.Group(),bm=new T.Mesh(new T.CylinderGeometry(.35,.35,90,8,1,true),new T.MeshBasicMaterial({color:0xffd060,transparent:true,opacity:.3,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}));bm.position.y=45;
 const ch=new T.Mesh(GB,mat(0x7a4a22));ch.scale.set(1.3,.8,.9);ch.position.y=.4;const gd=new T.Mesh(GB,new T.MeshBasicMaterial({color:0xffd23a}));gd.scale.set(1,.2,.7);gd.position.y=.85;
 g.add(bm,ch,gd);g.position.set(x,y,z);scene.add(g);ST.push({g,x,z,bm})});
/* ---------- state ---------- */
let last=performance.now(),spawnT=0,lastAmmo=0,lS,got=new Set(),lk=0,streak=0,lastKill=0,lh=null,calling=false,t0=0;
addEventListener('keydown',e=>{if(e.code!='KeyH'||e.repeat||state!='playing'||P.horse)return;if(!lh){banner('Ride a horse first, then whistle with H',2);return}
 if(Math.hypot(lh.g.position.x-P.x,lh.g.position.z-P.z)>500){banner('Your horse is too far away',2);return}calling=true;tn(0,.35,1200,2200,.3,'sine');tn(.4,.4,1800,2600,.3,'sine');banner('Whistling for your horse...',2)});
function shot(){camera.getWorldDirection(V3);let best=null,bt=120;
 for(const a of AN){if(a.dead)continue;const dx=a.g.position.x-camera.position.x,dy=a.g.position.y+(a.d?1.2:.3)-camera.position.y,dz=a.g.position.z-camera.position.z,t=dx*V3.x+dy*V3.y+dz*V3.z;if(t<0||t>bt)continue;
  if(dx*dx+dy*dy+dz*dz-t*t<(a.d?1:.3)){best=a;bt=t}if(Math.hypot(dx,dz)<90)a.sc=7}
 if(best){best.dead=.01;best.g.rotation.z=1.5;best.g.position.y+=.35;const v=best.d?35:12;S.money+=v;S.score+=50;banner((best.d?'Deer pelt':'Rabbit')+' +$'+v,2);snd.hit();burst(V3.copy(best.g.position),10,0xa01010,3)}}
(function lp(now){requestAnimationFrame(lp);const dt=Math.min((now-last)/1000,.05);last=now;const t=now*.001;
 const on=typeof P!='undefined'&&P&&state=='playing';
 if(!on){rain.visible=false;EG.forEach(m=>m.visible=false);if(aw){aw.gain.value=0;ar.gain.value=0}return}
 if(S!==lS){lS=S;got=new Set();lk=S.kills;streak=0;lastAmmo=P.ammo;AN.forEach(a=>scene.remove(a.g));AN.length=0}
 if(P.horse)lh=P.horse;const x=P.x,z=P.z,e=sunDir.y,dk=ss(-.05,.4,e);
 /* shots, streaks */
 if(P.ammo<lastAmmo)shot();lastAmmo=P.ammo;
 if(S.kills>lk){const n=S.kills-lk;lk=S.kills;streak=now-lastKill<7000?streak+n:n;lastKill=now;if(streak>=2){const b=streak*10;S.money+=b;S.score+=streak*25;banner(streak+'x KILL STREAK  +$'+b,2);snd.buy()}}
 /* fov kick */
 const sp=Math.hypot(P.vx,P.vz),tf=75+Math.min(sp*(P.horse?.45:.5),P.horse?9:4);if(Math.abs(camera.fov-tf)>.02){camera.fov+=(tf-camera.fov)*Math.min(1,dt*6);camera.updateProjectionMatrix()}
 /* horse whistle */
 if(calling&&lh){const hp=lh.g.position,dx=x-hp.x,dz=z-hp.z,d=Math.hypot(dx,dz);if(d<4||P.horse){calling=false;if(!P.horse)banner('Your horse has arrived',2)}else{const s=Math.min(d-3,18*dt);hp.x+=dx/d*s;hp.z+=dz/d*s;hp.y=gy(hp.x,hp.z);lh.g.rotation.y=Math.atan2(-dx,-dz)}}
 /* stashes */
 for(const s of ST){const c=got.has(s);s.g.visible=!c;if(c)continue;s.bm.material.opacity=.22+.12*Math.sin(t*3+s.x);if(Math.hypot(x-s.x,z-s.z)<3){got.add(s);S.money+=250;S.score+=500;banner('Hidden stash found!  '+got.size+'/'+ST.length+'  +$250',3);snd.buy();burst(V3.set(s.x,gy(s.x,s.z)+1,s.z),20,0xffd23a,5);
  if(got.size==ST.length){S.money+=2000;setTimeout(()=>banner('ALL STASHES FOUND!  +$2000',4),3200)}}}
 /* wildlife */
 spawnT-=dt;if(spawnT<0&&AN.length<16){spawnT=.6;const a=R(0,6.28),d=R(70,150),sx=x+Math.cos(a)*d,sz=z+Math.sin(a)*d,h=gy(sx,sz);if(h>.4&&h<45&&!blocked(sx,sz)){if(Math.random()<.55)mkAnimal(true,sx,sz);else{mkAnimal(false,sx,sz);mkAnimal(false,sx+2,sz+1)}}}
 for(let i=AN.length-1;i>=0;i--){const a=AN[i],p=a.g.position,dx=p.x-x,dz=p.z-z,d=Math.hypot(dx,dz);
  if(a.dead){a.dead+=dt;if(a.dead>25||d>200){scene.remove(a.g);AN.splice(i,1)}continue}
  if(d>190){scene.remove(a.g);AN.splice(i,1);continue}
  a.sc-=dt;let spd=0,hx,hz;
  if(a.sc>0||d<(a.d?30:18)){hx=dx/(d||1)+Math.sin(t+a.ph)*.4;hz=dz/(d||1)+Math.cos(t+a.ph)*.4;spd=a.d?10:7}
  else{a.t-=dt;if(a.t<0){a.t=R(2,6);a.th=R(0,6.28);a.v=Math.random()<.5?0:1}hx=Math.cos(a.th);hz=Math.sin(a.th);spd=a.v*(a.d?1.4:1.1)}
  if(spd){const nx=p.x+hx*spd*dt,nz=p.z+hz*spd*dt,ny=gy(nx,nz);if(ny<.15||blocked(nx,nz)){a.th+=2.2;a.sc=0}else{p.x=nx;p.z=nz;p.y=ny+(a.d?0:Math.abs(Math.sin(t*10+a.ph))*.3);a.g.rotation.y=Math.atan2(-hx,-hz)}}else p.y=gy(p.x,p.z);
  const sw=spd?Math.sin(t*spd*1.6+a.ph)*.7:0;a.legs.forEach((l,k)=>l.rotation.x=k%2?-sw:sw)}
 /* weather timeline */
 Wc-=dt;if(Wc<0){Wt=Wt?0:1;Wc=Wt?R(70,110):R(120,240);if(Wt)banner('A storm is rolling in...',3)}
 W+=(Wt-W)*Math.min(1,dt*.35);
 const Wd=W>.01;rain.visible=Wd;dome.visible=Wd;dome.position.copy(camera.position);dome.material.opacity=W*.7*(.35+.65*dk);
 if(Wd){stormC.setRGB(.34*dk+.02,.37*dk+.02,.42*dk+.03);scene.fog.color.lerp(stormC,W*.7);scene.background.copy(scene.fog.color);scene.fog.density*=1+1.6*W;dl.intensity*=1-.65*W;
  if(W>.5){sun.visible=glowS.visible=false}
  rain.material.opacity=Math.min(.45,W*.5);const y0=Math.max(gy(x,z),0)-2;for(let i=0;i<RN;i++){const o=ro[i],px=x+wr(o[0]-x,40),pz=z+wr(o[2]-z,40),py=y0+((o[1]-t*24)%30+30)%30;rp.set([px,py,pz,px+.35,py+.9,pz],i*6)}rain.geometry.attributes.position.needsUpdate=true;
  if(W>.6){nextL-=dt;if(nextL<0){nextL=R(3,9);strike()}}}
 if(boltT>0){boltT-=dt;if(boltT<=0)bolt.visible=false}
 if(flash>.01){flash*=Math.exp(-dt*7);if(hemi)hemi.intensity+=flash*3;scene.fog.color.lerp(stormC.setRGB(1,1,1),flash*.5);scene.background.copy(scene.fog.color)}
 /* eagles */
 EG.forEach(m=>{const u=m.userData,v=dk>.3&&W<.3;m.visible=v;if(!v)return;u.a+=dt*u.s;m.position.set(x+Math.cos(u.a)*u.r,u.h+Math.sin(t*.5+u.r)*3,z+Math.sin(u.a)*u.r);m.rotation.y=-u.a;m.rotation.z=Math.sin(t*3+u.r)*.15});
 /* ambient audio */
 aInit();if(aw){const h=Math.max(P.y,0);aw.gain.setTargetAtTime(.03+.025*Math.sin(t*.35)+.05*W+Math.min(h,60)*.0006,AC.currentTime,.4);awf.frequency.setTargetAtTime(320+180*Math.sin(t*.23)+W*350,AC.currentTime,.4);ar.gain.setTargetAtTime(W*.2,AC.currentTime,.5)}
 ev-=dt;if(ev<0&&AC){ev=R(1.2,3.2);const n=e<-.05;
  if(!n&&W<.3&&Math.random()<.6){const f=2400+R(0,900);tn(0,.09,f,f+700,.05,'sine');tn(.14,.09,f+300,f+900,.05,'sine');if(Math.random()<.5)tn(.3,.1,f,f+500,.05,'sine')}
  if(n){for(let i=0;i<5;i++)tn(i*.11,.05,4100+R(0,200),4300,.012,'sine');const q=Math.random();if(q<.07){tn(0,1.4,520,900,.1,'sine');tn(1.3,1.2,900,560,.09,'sine')}else if(q<.14){tn(0,.35,360,320,.09,'sine');tn(.55,.4,350,310,.09,'sine')}}}
})(performance.now());
})();
