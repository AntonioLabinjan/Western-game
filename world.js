/* Dead Man's Gulch – open-world biomes. Load AFTER the main script and BEFORE enhance.js. */
(()=>{
const og=gy,sm=(a,b,x)=>{x=cl((x-a)/(b-a),0,1);return x*x*(3-2*x)},mk=(cx,cz,a,b,x,z)=>1-sm(a,b,Math.hypot(x-cx,z-cz)),
RV=z=>-380+60*Math.sin(z*.012+1),
mg=(x,z)=>mk(0,-1010,140,420,x,z),GP=(x,z)=>mk(800,-780,90,320,x,z),BD=(x,z)=>mk(820,170,90,300,x,z),DN=(x,z)=>mk(-850,190,90,300,x,z),BY=(x,z)=>mk(-860,-720,60,250,x,z),IS=(x,z)=>mk(330,640,22,80,x,z),
M=(x,z)=>Math.max(mk(-300,-450,150,330,x,z),.8*mk(430,-440,90,230,x,z),mg(x,z)),
F=(x,z)=>Math.max(mk(170,-340,110,250,x,z),mk(-250,340,50,150,x,z),mk(-720,-280,60,180,x,z),mk(930,-430,50,150,x,z))*(1-sm(.15,.5,M(x,z)))*(1-sm(380,420,z)),
NA=(x,z)=>mk(470,-40,60,200,x,z),LK=(x,z)=>Math.hypot(x-190,z-330),
OP2=[[470,-40],[190,-380],[-230,-300],[40,392],[80,-960],[780,-780],[820,150],[858,188],[786,192],[-850,252],[-860,-690],[-550,392],[-720,-280]],FL=OP.concat(OP2),VX=470,VZ=-40;
const pk=(x,z)=>{const m=M(x,z);if(m<.01)return 0;return(Math.abs(Math.sin(x*.021+z*.013))*.6+Math.abs(Math.sin(x*.047-z*.031))*.35+.15*Math.abs(Math.sin(z*.083+x*.05)))*(150+90*mg(x,z))*m*m+12*m};
/* ---- new terrain: mountains, river, lake, sea, plateaus ---- */
gy=(x,z)=>{if(x*x+z*z<7225)return 0;let h=og(x,z);if(h<0)h*=.05;h+=pk(x,z)*sm(30,100,Math.abs(z+150));
 const dn=DN(x,z),gp=GP(x,z),bd=BD(x,z),by=BY(x,z);
 if(dn>.001)h+=dn*(Math.abs(Math.sin(x*.022+z*.009+2*Math.sin(z*.012)))*10+Math.abs(Math.sin(x*.05-z*.03))*2.2);
 if(gp>.001)h+=gp*(4*Math.sin(x*.012)*Math.sin(z*.011)+2*Math.sin(x*.03+z*.02));
 if(bd>.001){const n=.5+.28*Math.sin(x*.011+1)*Math.sin(z*.013)+.2*Math.sin(x*.03+z*.021)+.1*Math.sin(z*.057-x*.04);h+=bd*(sm(.5,.54,n)*30+sm(.66,.7,n)*22+6*n)}
 if(by>.001){const n=Math.sin(x*.045)*Math.sin(z*.04)+.5*Math.sin(x*.1+z*.07);h=h*(1-by)+by*(.45-2.6*sm(.2,.5,n))}
 let f=1;for(const o of FL)f=Math.min(f,sm(26,70,Math.hypot(x-o[0],z-o[1])));h*=f;
 let r=sm(4,20,Math.abs(x-RV(z)));h=h*r-2.8*(1-r);r=sm(20,48,LK(x,z));h=h*r-2.8*(1-r);r=sm(20,48,Math.hypot(x+850,z-190));h=h*r-2.8*(1-r);r=sm(395,470,z);const is=IS(x,z);return Math.max(h*(1-r)-2.6*r,-2.6+5.2*is+2*is*is)};
const ob=blocked;blocked=(x,z)=>ob(x,z)||gy(x,z)<-.45;
{const g=new T.PlaneGeometry(2400,2400,480,480);g.rotateX(-Math.PI/2);const p=g.attributes.position,cn=new Float32Array(p.count*3),c0=new T.Color(),c1=new T.Color(),lp=(c,t)=>{if(t>.001)c0.lerp(c1.set(c),t)};
 for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),h=gy(x,z),m=M(x,z);p.setY(i,h);c0.set(0xc79258);
  lp(0x9aa046,.35*sm(0,1,Math.sin(x*.013)*Math.sin(z*.017)+.3));lp(0x6e8a3a,.8*(1-sm(14,75,Math.abs(x-RV(z))))*(z<420?1:0));lp(0x6e8a3a,.8*(1-sm(25,80,LK(x,z))));
  lp(0xb25c34,.85*NA(x,z));lp(0x405c2c,.9*F(x,z));lp(0x7d6b60,sm(.05,.35,m));lp(0xf4f7fb,sm(34,62,h)*(m>.1?1:0));lp(0xe4cd96,sm(350,385,z));lp(0x6a5a40,sm(-.2,-1.2,h));
  {const dr=h>-.3?1:0,gp=GP(x,z),bd=BD(x,z),dn=DN(x,z),by=BY(x,z);
  lp(0xe6c27c,.92*dn*dr);lp(0xd9b44a,.9*gp*dr);lp(0xefcf6a,.35*gp*dr*(.5+.5*Math.sin(x*.35+Math.sin(z*.05)*3)));
  lp(0xc4562e,.92*bd*dr);lp(Math.sin(h*.7)>0?0xe39a68:0x8a3820,.5*bd*dr*sm(2,8,h));lp(0x4f6232,.92*by*dr);lp(0xeef4fa,sm(.25,.6,mg(x,z))*sm(6,22,h))}
  c0.multiplyScalar(.93+.1*Math.sin(x*.37)*Math.sin(z*.31));cn[i*3]=c0.r;cn[i*3+1]=c0.g;cn[i*3+2]=c0.b}
 g.setAttribute('color',new T.BufferAttribute(cn,3));g.computeVertexNormals();ground.geometry.dispose();ground.geometry=g;
 const nt=canvasTex(256,256,(x,w)=>{x.fillStyle='#ddd';x.fillRect(0,0,w,w);for(let i=0;i<2500;i++){x.fillStyle=`rgba(${R(0,1)<.5?'80,60,40':'255,245,220'},${R(.04,.14)})`;x.fillRect(R(0,w),R(0,w),R(1,3),R(1,3))}},270,270);nt.anisotropy=8;
 ground.material=new T.MeshStandardMaterial({map:nt,vertexColors:true,roughness:1});window.WORLD={pos:p.array,col:cn,n:481,size:2400,fl:FL,cur:''}}
/* ---- re-seat old scattered objects on the new terrain ---- */
{const dc=new T.Matrix4(),pp=new T.Vector3(),qq=new T.Quaternion(),ss=new T.Vector3();
 scene.traverse(o=>{if(o.isInstancedMesh&&[220,500,240].includes(o.count)){for(let i=0;i<o.count;i++){o.getMatrixAt(i,dc);dc.decompose(pp,qq,ss);const x=pp.x,z=pp.z,n=gy(x,z);pp.y+=n-og(x,z);
   if(o.count==240?(n<.3||F(x,z)>.15||M(x,z)>.1||z>370):o.count==500?(n<.2||M(x,z)>.5||z>380):n<-.3)ss.set(0,0,0);dc.compose(pp,qq,ss);o.setMatrixAt(i,dc)}o.instanceMatrix.needsUpdate=true}
  else if(o.isMesh&&o.geometry.type=='CylinderGeometry'&&o.geometry.parameters.radialSegments==7){const x=o.position.x,z=o.position.z,n=gy(x,z);o.position.y+=n-og(x,z);if(n<.3||M(x,z)>.15||F(x,z)>.2||z>370||Math.abs(x-RV(z))<45)o.visible=false}})}
/* ---- water: rivers, lake and sea ---- */
const wm=new T.ShaderMaterial({transparent:true,fog:true,uniforms:T.UniformsUtils.merge([T.UniformsLib.fog,{t:{value:0},sd:{value:sunDir}}]),
vertexShader:`#include <fog_pars_vertex>
varying vec3 wp;void main(){vec4 w=modelMatrix*vec4(position,1.);wp=w.xyz;vec4 mvPosition=viewMatrix*w;gl_Position=projectionMatrix*mvPosition;
#include <fog_vertex>
}`,fragmentShader:`#include <fog_pars_fragment>
varying vec3 wp;uniform float t;uniform vec3 sd;
void main(){vec2 q=wp.xz*.3;vec3 n=normalize(vec3(.09*(cos(q.x*1.9+t*1.2)+cos((q.x+q.y)*3.1-t*1.7)),1.,.09*(cos(q.y*2.3-t*1.1)+cos((q.x-q.y)*2.7+t*1.4))));
vec3 V=normalize(cameraPosition-wp),Rf=reflect(-V,n);vec3 sk=mix(vec3(.95,.5,.3),vec3(.3,.42,.75),smoothstep(0.,.5,Rf.y));
float fr=pow(1.-max(dot(n,V),0.),3.)*.85+.12;vec3 c=mix(vec3(.04,.2,.26),sk,fr)+vec3(1.,.7,.4)*pow(max(dot(Rf,sd),0.),180.)*2.;
gl_FragColor=vec4(c,.88);
#include <fog_fragment>
}`});
{const w=new T.Mesh(new T.PlaneGeometry(2400,2400),wm);w.rotation.x=-Math.PI/2;w.position.y=-.5;scene.add(w)}
/* ---- forests: pines (snow-dusted on mountains) + river cottonwoods ---- */
const tg=new Map(),o3=new T.Object3D(),cc=new T.Color(),tr=[],cw=[];
const put=(im,i,x,y,z,sx,sy,sz)=>{o3.position.set(x,y,z);o3.scale.set(sx,sy,sz);o3.updateMatrix();im.setMatrixAt(i,o3.matrix)};
const inst=(g,m,n)=>{const im=new T.InstancedMesh(g,m,n);im.frustumCulled=false;im.castShadow=im.receiveShadow=true;scene.add(im);return im};
const grid=(x,z,r)=>{const k=Math.floor(x/8)*4096+Math.floor(z/8);let b=tg.get(k);if(!b)tg.set(k,b=[]);b.push([x,z,r])};
for(let a=0;a<600000&&tr.length<9000;a++){const x=R(-1150,1150),z=R(-1150,1150);if(x*x+z*z<10000||Math.abs(z+150)<8||x*x+z*z>1322500)continue;
 const m=M(x,z);if(Math.random()>Math.max(F(x,z)*.85,sm(.04,.25,m)*(1-sm(.5,.85,m))*.8))continue;const h=gy(x,z);if(h<.15||h>58||FL.some(o=>Math.hypot(x-o[0],z-o[1])<24))continue;
 const s=R(.8,1.9);tr.push([x,h,z,s,sm(18,48,h)]);grid(x,z,.5*s)}
for(let a=0;a<80000&&cw.length<900;a++){const z=R(-1100,370),q=Math.random(),sw=q<.4,l=!sw&&q<.55,an=R(0,6.28),d=R(30,70);let x,zz=z;if(sw){const e=R(0,230);x=-860+Math.cos(an)*e;zz=-720+Math.sin(an)*e}else if(l){x=190+Math.cos(an)*d;zz=330+Math.sin(an)*d}else x=RV(z)+R(-50,50);
 const h=gy(x,zz);if(h<.15||h>3||(!l&&!sw&&Math.abs(x-RV(zz))<16)||Math.abs(zz+150)<10||M(x,zz)>.1||Math.hypot(x,zz)<100)continue;const s=R(.8,1.5);cw.push([x,h,zz,s,sw]);grid(x,zz,.4*s)}
{const n=tr.length,A=inst(new T.CylinderGeometry(.22,.34,1,6),mat(0x4a2e1a),n),B=inst(new T.ConeGeometry(1,1,8),new T.MeshStandardMaterial({roughness:1}),n),C2=inst(new T.ConeGeometry(1,1,8),new T.MeshStandardMaterial({roughness:1}),n),G=[0x2f5a2c,0x3a6a32,0x264a28];
 tr.forEach((t,i)=>{const[x,h,z,s,w]=t;put(A,i,x,h+1.1*s,z,s,2.2*s,s);put(B,i,x,h+3.8*s,z,1.7*s,4.4*s,1.7*s);put(C2,i,x,h+6*s,z,1.2*s,3.6*s,1.2*s);
  cc.setHex(G[i%3]).multiplyScalar(R(.8,1.2));cc.lerp(new T.Color(0xeaf0f6),w*.8);B.setColorAt(i,cc);cc.lerp(new T.Color(0xeaf0f6),.25*w);C2.setColorAt(i,cc)});}
{const n=cw.length,A=inst(new T.CylinderGeometry(.2,.3,1,6),mat(0x6a5a44),n),B=inst(new T.IcosahedronGeometry(1,1),new T.MeshStandardMaterial({roughness:1,flatShading:true}),n),Y=[0xb8a83a,0x7a9a3a,0xd49a3a];
 cw.forEach((t,i)=>{const[x,h,z,s,sw]=t;put(A,i,x,h+1.6*s,z,s,3.2*s,s);put(B,i,x,h+4*s,z,2.3*s,1.8*s,2.3*s);B.setColorAt(i,cc.setHex(sw?[0x5d7a3c,0x4a6a34,0x6f8a48][i%3]:Y[i%3]).multiplyScalar(R(.85,1.15)))})}
/* ---- native village ---- */
const tpT=canvasTex(256,128,(x,w,h)=>{x.fillStyle='#e3cf9f';x.fillRect(0,0,w,h);for(let i=0;i<500;i++){x.fillStyle=`rgba(90,60,30,${R(0,.07)})`;x.fillRect(R(0,w),R(0,h),R(2,18),1)}
 x.fillStyle='#a8321f';x.fillRect(0,h-26,w,12);x.fillStyle='#1f4e6e';x.fillRect(0,h-12,w,12);x.fillStyle='#a8321f';for(let i=0;i<8;i++){x.beginPath();x.moveTo(i*32,h-26);x.lineTo(i*32+16,h-58);x.lineTo(i*32+32,h-26);x.fill()}
 x.fillStyle='#1f4e6e';for(let i=0;i<8;i++){x.beginPath();x.moveTo(i*32+8,h-62);x.lineTo(i*32+16,h-82);x.lineTo(i*32+24,h-62);x.fill()}}),
tpm=new T.MeshStandardMaterial({map:tpT,roughness:1}),tcg=new T.ConeGeometry(2.3,6.2,14),stk=new T.CylinderGeometry(.05,.05,2.6,5),dkm=mat(0x2a170c);
function tipi(x,z,s){const g=new T.Mesh(tcg,tpm);g.scale.setScalar(s);g.position.set(x,gy(x,z)+3.1*s,z);g.rotation.y=R(0,6);g.castShadow=g.receiveShadow=true;scene.add(g);
 const a=Math.atan2(VX-x,VZ-z),dr=new T.Mesh(new T.PlaneGeometry(1,1.9),dkm);dr.position.set(x+Math.sin(a)*1.98*s,.95*s,z+Math.cos(a)*1.98*s);dr.rotation.y=a;dr.scale.set(s,s,1);scene.add(dr);
 for(let k=0;k<4;k++){const b=k*1.57+.3,p=new T.Mesh(stk,dkm);p.position.set(x+Math.sin(b)*.4*s,6.5*s,z+Math.cos(b)*.4*s);p.rotation.set(Math.cos(b)*.25,0,-Math.sin(b)*.25);scene.add(p)}
 C.push({x0:x-1.9*s,x1:x+1.9*s,z0:z-1.9*s,z1:z+1.9*s,h:6})}
for(let i=0;i<7;i++){const a=i*.9+.3,r=14+R(0,6);tipi(VX+Math.cos(a)*r,VZ+Math.sin(a)*r,R(.9,1.2))}tipi(VX,VZ-24,1.6);
const fires=[];function campfire(x,z,I){const y=gy(x,z);for(let i=0;i<8;i++){const s=new T.Mesh(new T.DodecahedronGeometry(.28),mat(0x777770));s.position.set(x+Math.cos(i*.785)*.9,y+.15,z+Math.sin(i*.785)*.9);scene.add(s)}
 const f=new T.Mesh(new T.ConeGeometry(.5,1.3,6),new T.MeshBasicMaterial({color:0xff8a2a})),f2=new T.Mesh(new T.ConeGeometry(.28,.8,6),new T.MeshBasicMaterial({color:0xffd060}));f.position.set(x,y+.65,z);f2.position.set(x,y+.45,z);
 const l=new T.PointLight(0xff8a30,I,26,2);l.position.set(x,y+1.4,z);scene.add(f,f2,l);fires.push([f,f2,l,I])}
campfire(VX,VZ,2);
[[VX+9,VZ+10,0xb0804a],[VX-10,VZ+9,0x6b3f1e],[VX+3,VZ-14,0xe8e0d0],[VX-20,VZ+30,0x8a8a8a]].forEach(h=>mkHorse(...h));
[{name:'Chief Running Elk',x:VX+2.5,z:VZ+3,col:0x9a4a2a,hat:0x1a1a1a,line:'You ride in peace, friend. Outlaws have troubled our valley.'},{name:'Little Dove',x:VX-3,z:VZ+2,col:0x6a3a5a,hat:0x1a1a1a,line:'The fire is warm. Our herd is thin since the raiders came.'},{name:'Standing Wolf',x:VX+1,z:VZ-4,col:0x2a4a5a,hat:0x8a2a2a,line:'I scout these plains. There is much to see beyond the ridge.'}]
.forEach(d=>mkNpc(Object.assign(d,{ty:['hold','fetch','kill']})));
for(let i=0;i<6;i++){const a=i*1.05+.4,d=R(95,150),x=VX+Math.cos(a)*d,z=VZ+Math.sin(a)*d,h=R(25,55),r=R(14,26);if(gy(x,z)<.5)continue;
 const m=new T.Mesh(new T.CylinderGeometry(r*.7,r,h,7),mm[i%3]);m.position.set(x,gy(x,z)+h/2-3,z);m.rotation.y=R(0,3);m.castShadow=true;scene.add(m)}
/* ---- frontier outposts: pine camp, mountain lodge, harbour ---- */
outpost(190,-380,0x5a3a22);outpost(-230,-300,0x6e4a30);outpost(40,392,0x7a4a32);
[{name:'Trapper Gus',x:196.2,z:-379.5,col:0x5a4a2a,hat:0x3a2a1a,line:'Pelts are down and the pines are crawling with outlaws.'},{name:'Ranger Hollis',x:-223.8,z:-299.5,col:0x3a5a3a,hat:0x2a2a1a,line:'Snow is early this year. Watch your footing up there.'},{name:'Captain Salt',x:46.2,z:392.5,col:0x2a3a5a,hat:0xe0d8c0,line:'Ships have not docked in months. The gang takes every cargo.'}]
.forEach(d=>mkNpc(Object.assign(d,{ty:['hold','fetch','kill']})));
[[196,-368,0x6b3f1e],[-220,-312,0x8a8a8a],[52,398,0xb0804a],[-60,60,0x2a1a10],[260,-60,0x8a8a8a],[-200,-200,0x6b3f1e]].forEach(h=>mkHorse(...h));
/* ---- seaside: lighthouse, pier, boats, gulls ---- */
const LX=100,LZ=398,wh=mat(0xf2ece0),rd=mat(0xb3321f),lb=[];
{const lh=new T.Mesh(new T.CylinderGeometry(1.7,2.7,24,14),wh);lh.position.set(LX,9,LZ);lh.castShadow=true;scene.add(lh);
 for(const y of[4,10,16]){const r=2.7-(y+3)/24,b=new T.Mesh(new T.CylinderGeometry(r-.05,r+.03,3,14),rd);b.position.set(LX,y,LZ);scene.add(b)}
 bx(4,.4,4,dkm,LX,21.2,LZ);const ln=new T.Mesh(new T.CylinderGeometry(1,1.1,1.6,10),new T.MeshBasicMaterial({color:0xffe0a0}));ln.position.set(LX,22.2,LZ);scene.add(ln);
 const rf=new T.Mesh(new T.ConeGeometry(1.5,1.4,10),rd);rf.position.set(LX,23.7,LZ);scene.add(rf);
 const bm=new T.MeshBasicMaterial({color:0xffe8a0,transparent:true,opacity:.22,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide,fog:false}),g=new T.Group();
 for(const s of[1,-1]){const b=new T.Mesh(new T.CylinderGeometry(.2,7,50,10,1,true).rotateZ(Math.PI/2).translate(s*25,0,0),bm);g.add(b)}g.position.set(LX,22.2,LZ);scene.add(g);lb.push(g);
 const pl=new T.PointLight(0xffe0a0,2,70,2);pl.position.set(LX,22,LZ);scene.add(pl);C.push({x0:LX-2.7,x1:LX+2.7,z0:LZ-2.7,z1:LZ+2.7,h:30})}
{const pm=mat(0x6b4a2b,{map:plank(0x6b4a2b,1,24)});bx(3.2,.25,74,pm,20,.175,433,false);C.push({x0:18.4,x1:21.6,z0:396,z1:470,h:.3});
 for(let z=398;z<=468;z+=8)for(const x of[18.6,21.4])bx(.3,4.5,.3,dkm,x,-.9,z,false)}
const boats=[];[[60,448,.3],[-25,458,1.8],[115,472,3.9]].forEach(b=>{const g=new T.Group();const h=new T.Mesh(GB,mat(0x6b4a2b));h.scale.set(2.4,.9,6.5);h.castShadow=true;g.add(h);
 const m=new T.Mesh(new T.CylinderGeometry(.08,.1,6,6),dkm);m.position.set(0,3.4,-.5);g.add(m);const s=new T.Mesh(new T.PlaneGeometry(2.4,4),new T.MeshStandardMaterial({color:0xf0e8d0,side:T.DoubleSide,roughness:1}));s.position.set(0,3.3,-.5);s.rotation.y=Math.PI/2;g.add(s);
 g.position.set(b[0],-.3,b[1]);g.rotation.y=b[2];scene.add(g);boats.push(g)});
const gulls=[];for(let i=0;i<14;i++){const g=new T.Mesh(new T.PlaneGeometry(1.5,.45).rotateX(-Math.PI/2),new T.MeshBasicMaterial({color:0xffffff,side:T.DoubleSide}));g.userData={a:R(0,6.28),r:R(15,60),h:R(14,34),s:R(.15,.35),f:R(8,13)};scene.add(g);gulls.push(g)}
/* ---- v2 expansion: new biomes, settlements, props ---- */
camera.far=2400;camera.updateProjectionMatrix();
const area=(f,n,x0,x1,z0,z1,hn,hx)=>{const r=[];for(let a=0;a<n*60&&r.length<n;a++){const x=R(x0,x1),z=R(z0,z1);if(Math.random()>f(x,z))continue;const h=gy(x,z);if(h>hn&&h<(hx||999)&&!FL.some(o=>Math.hypot(x-o[0],z-o[1])<24))r.push([x,h,z])}return r},
ring=(cx,cz,d0,d1,n,hn)=>{const r=[];for(let a=0;a<n*40&&r.length<n;a++){const an=R(0,6.28),d=R(d0,d1),x=cx+Math.cos(an)*d,z=cz+Math.sin(an)*d,h=gy(x,z);if(h>hn)r.push([x,h,z])}return r},
rs=()=>o3.rotation.set(0,0,0);
/* cacti (dunes + badlands) */
{const c=[...area(DN,170,-1150,-560,-100,390,.3),...area(BD,230,520,1120,-130,390,.3,12)],n=c.length,gm=mat(0x4f7a3a),A=inst(new T.CylinderGeometry(.28,.34,1,7),gm,n),Hh=inst(new T.CylinderGeometry(.15,.15,1,6),gm,n*2),V=inst(new T.CylinderGeometry(.15,.17,1,6),gm,n*2);
 c.forEach((p,i)=>{const[x,h,z]=p,s=R(1.8,3.8);rs();put(A,i,x,h+s/2,z,1,s,1);grid(x,z,.5);[-1,1].forEach((k,j)=>{const dy=h+s*(.4+.15*j);o3.rotation.set(0,0,Math.PI/2);put(Hh,i*2+j,x+k*.35,dy,z,1,.7,1);rs();put(V,i*2+j,x+k*.7,dy+s*.18,z,1,s*.36,1)})});rs()}
/* palms: oasis + skull island */
{const p=[...ring(-850,190,42,68,30,.3),...ring(330,640,8,36,34,.4)],n=p.length,A=inst(new T.CylinderGeometry(.18,.3,1,6),mat(0x7a5a3a),n),Fr=inst(new T.BoxGeometry(3.4,.07,.7).translate(1.7,0,0),mat(0x3f8a3a,{side:T.DoubleSide}),n*7);
 p.forEach((q,i)=>{const[x,h,z]=q,s=R(5,8);rs();put(A,i,x,h+s/2,z,1,s,1);grid(x,z,.35);for(let k=0;k<7;k++){o3.rotation.set(0,k*.9+i,-.45);put(Fr,i*7+k,x,h+s,z,1,1,1)}});rs()}
/* glacier ice spires */
{const p=area((x,z)=>mg(x,z)>.25?.6:0,260,-420,420,-1150,-640,2,90),I=inst(new T.ConeGeometry(1,1,5),new T.MeshStandardMaterial({color:0xbfe6f5,roughness:.12,metalness:.2,flatShading:true,emissive:0x2a5a78,emissiveIntensity:.35}),p.length);
 p.forEach((q,i)=>{const s=R(2,6);o3.rotation.set(R(-.15,.15),R(0,6),R(-.15,.15));put(I,i,q[0],q[1]+s*1.2,q[2],s*.8,s*3,s*.8)});rs()}
/* boulders in new biomes */
{const p=[...area(BD,220,520,1120,-130,390,.2),...area(DN,70,-1150,-560,-100,390,.2),...area(GP,60,440,1120,-1100,-420,.2),...area(BY,60,-1120,-600,-980,-460,.4)],I=inst(new T.DodecahedronGeometry(1,0),new T.MeshStandardMaterial({roughness:1,flatShading:true}),p.length);
 p.forEach((q,i)=>{const s=R(.6,3.5),x=q[0],z=q[2];o3.rotation.set(R(0,3),R(0,3),0);put(I,i,x,q[1]+s*.3,z,s*1.2,s,s);I.setColorAt(i,cc.setHex(BD(x,z)>.3?0xa8472a:DN(x,z)>.3?0xc7a46a:0x86806f).multiplyScalar(R(.8,1.15)))});rs()}
/* wheat fields */
{const p=area(GP,13000,440,1120,-1100,-420,.3),I=inst(new T.ConeGeometry(.22,1.3,4),new T.MeshStandardMaterial({roughness:1}),p.length);I.castShadow=false;
 p.forEach((q,i)=>{const s=R(.8,1.5);o3.rotation.set(R(-.2,.2),R(0,6),R(-.2,.2));put(I,i,q[0],q[1]+.55*s,q[2],1,s,1);I.setColorAt(i,cc.setHex(0xe0b94a).multiplyScalar(R(.8,1.2)))});rs()}
/* farm: barn, silo, windmill, hay */
const wb=new T.Group();
{const fx=780,fz=-780,rm=mat(0x9a2a1e),rf=mat(0x3a2a20);bx(12,6,16,rm,fx-8,3,fz-6,true);
 [[-11.2,.6],[-4.8,-.6]].forEach(a=>{bx(8,.4,17,rf,fx+a[0],7.4,fz-6,true).rotation.z=a[1]});
 bx(4.5,3.4,.2,dkm,fx-8,1.7,fz+2.1,false);C.push({x0:fx-14,x1:fx-2,z0:fz-14,z1:fz+2,h:8});
 const sl=new T.Mesh(new T.CylinderGeometry(2.2,2.2,12,12),mat(0xc8c0b0));sl.position.set(fx+8,6,fz-8);sl.castShadow=true;scene.add(sl);
 const dm=new T.Mesh(new T.SphereGeometry(2.2,12,8,0,6.29,0,1.57),rf);dm.position.set(fx+8,12,fz-8);scene.add(dm);C.push({x0:fx+5.8,x1:fx+10.2,z0:fz-10.2,z1:fz-5.8,h:13});
 const tw=new T.Mesh(new T.CylinderGeometry(1.1,2.2,12,8),mat(0xd8ccb0));tw.position.set(fx+7,6,fz+9);tw.castShadow=true;scene.add(tw);C.push({x0:fx+4.8,x1:fx+9.2,z0:fz+6.8,z1:fz+11.2,h:12});
 wb.position.set(fx+7,11.5,fz+10.4);for(let k=0;k<4;k++){const b=new T.Mesh(new T.BoxGeometry(.9,7,.12),mat(0xe8e0cc));b.position.y=3.5;const g=new T.Group();g.rotation.z=k*1.571;g.add(b);wb.add(g)}scene.add(wb);
 for(let i=0;i<7;i++){const b=new T.Mesh(new T.CylinderGeometry(.8,.8,1.2,10),mat(0xd8b84a));b.rotation.z=1.571;b.position.set(fx-10+(i*2.6)%9,.6,fz+8+Math.floor(i/3)*2.2);b.castShadow=true;scene.add(b)}}
/* skull island + pirate treasure */
let tre=null;
{const ix=336,iz=632,iy=gy(ix,iz),sk=new T.Mesh(new T.SphereGeometry(6,18,14),mat(0xd9d2c0));sk.scale.set(1,.9,1.05);sk.position.set(ix,iy+4.5,iz);sk.castShadow=true;scene.add(sk);
 [-2.3,2.3].forEach(s=>{const e=new T.Mesh(new T.SphereGeometry(1.4,10,8),new T.MeshBasicMaterial({color:0xff5a1a}));e.position.set(ix+s,iy+5.2,iz-5);scene.add(e)});
 const el=new T.PointLight(0xff6a2a,2.2,40,2);el.position.set(ix,iy+5.2,iz-7);scene.add(el);
 tre=bx(1.6,1,1.1,mat(0x7a4a22),ix+3,iy+.5,iz-11,true);const gd=new T.Mesh(new T.BoxGeometry(1.2,.3,.8),new T.MeshBasicMaterial({color:0xffd23a}));gd.position.y=.65;tre.add(gd);tre.userData.gd=gd;
 const tl=new T.PointLight(0xffd060,1.4,14,2);tl.position.set(ix+3,iy+2,iz-11);scene.add(tl)}
/* new settlements, people, horses */
[[80,-960,0x4a5a6a],[820,150,0x7a5a3a],[858,188,0x6a4a30],[786,192,0x5a4028],[-850,252,0x8a6a40],[-860,-690,0x4a3a28],[-550,392,0x7a4a32],[-720,-280,0x5a3a22]].forEach(o=>outpost(...o));
[['Farmer Brown',783,-776,0x7a6a3a,0xc8a860,'Wheat as far as you can see, and not a soul to sell it to.'],['Ice Fisher Nils',86.2,-959.5,0x3a5a7a,0xe0e0e8,'The ice sings at night. Do not wander far from the fire.'],['Old Silas',826.2,150.5,0x6a4a2a,0x3a2a1a,'This town died with the silver. Only ghosts and gangs remain.'],['Nomad Amira',-843.8,252.5,0x8a3a5a,0xd8c8a0,'Water is worth more than gold out here, stranger.'],['Bayou Pete',-853.8,-689.5,0x4a5a3a,0x2a2a1a,'Folks say a skull-shaped island off the southern coast hides pirate gold.'],['Dockhand Rosa',-543.8,392.5,0x2a4a6a,0xe0d8c0,'The tide brings only trouble lately.'],['Big Tom',-713.8,-279.5,0x7a2a2a,0x2a1a10,'Timber is thick here, and so are the wolves.']]
.forEach(a=>mkNpc({name:a[0],x:a[1],z:a[2],col:a[3],hat:a[4],line:a[5],ty:['hold','fetch','kill']}));
[[790,-770,0xc8a060],[-840,245,0xe8e0d0],[826,158,0x6b3f1e],[90,-952,0x8a8a8a],[-860,-682,0x2a1a10],[-545,398,0xb0804a],[-710,-272,0x6b3f1e],[400,-100,0xb0804a],[-420,100,0x8a8a8a]].forEach(h=>mkHorse(...h));
{const pm2=mat(0x6b4a2b,{map:plank(0x6b4a2b,1,16)}),px=-540;bx(3.2,.25,50,pm2,px,.175,420,false);C.push({x0:px-1.6,x1:px+1.6,z0:395,z1:445,h:.3});for(let z=398;z<=444;z+=8)for(const x of[px-1.4,px+1.4])bx(.3,4.5,.3,dkm,x,-.9,z,false);
 [[-505,440,.5],[-580,452,2.2]].forEach(b=>{const g=new T.Mesh(GB,mat(0x6b4a2b));g.scale.set(2.4,.9,6.5);g.position.set(b[0],-.3,b[1]);g.rotation.y=b[2];scene.add(g);boats.push(g)})}
/* tumbleweeds + bayou fireflies + treasure + windmill */
const tws=Array.from({length:14},()=>{const m=new T.Mesh(new T.IcosahedronGeometry(.7,1),new T.MeshStandardMaterial({color:0x9a7a4a,wireframe:true}));m.userData={ox:R(-120,120),oz:R(-120,120),s:R(2,4)};scene.add(m);return m}),
FF=140,ffp=new Float32Array(FF*3),ffo=Array.from({length:FF},()=>[R(0,60),R(0,60),R(0,6.28)]),
ff=new T.Points(new T.BufferGeometry().setAttribute('position',new T.BufferAttribute(ffp,3)),new T.PointsMaterial({color:0xd8ff60,size:.45,transparent:true,blending:T.AdditiveBlending,depthWrite:false}));ff.frustumCulled=false;scene.add(ff);
const wr=(a,L)=>((a%L)+L)%L-L/2;
function anim(t,dt){wb.rotation.z=t*.7;
 if(typeof P=='undefined'||!P||state!='playing'){ff.visible=false;tws.forEach(m=>m.visible=false);return}
 const x=P.x,z=P.z,by=BY(x,z),dry=Math.max(DN(x,z),BD(x,z),mk(0,0,150,400,x,z))>.15;
 ff.visible=by>.15;if(ff.visible){const y0=Math.max(gy(x,z),0)+1.4;for(let i=0;i<FF;i++){const o=ffo[i];ffp[i*3]=x+wr(o[0]-x,60)+Math.sin(t*.7+o[2])*1.5;ffp[i*3+1]=y0+Math.sin(t+o[2]*3)*1.2;ffp[i*3+2]=z+wr(o[1]-z,60)+Math.cos(t*.6+o[2])*1.5}ff.geometry.attributes.position.needsUpdate=true;ff.material.opacity=.5+.5*Math.sin(t*3)}
 tws.forEach(m=>{m.visible=dry;if(!dry)return;const u=m.userData,mx=x+wr(u.ox+t*3*u.s-x,240),mz=z+wr(u.oz+t*u.s-z,240);m.position.set(mx,Math.max(gy(mx,mz),-.3)+.7+Math.abs(Math.sin(t*u.s*2+u.ox))*.5,mz);m.rotation.x+=dt*u.s;m.rotation.z+=dt});
 if(tre){const u=tre.userData,open=u.s!==S;u.gd.visible=open;if(open&&Math.hypot(x-tre.position.x,z-tre.position.z)<3){u.s=S;S.money+=500;S.score+=1000;banner('Pirate treasure found! +$500',4);snd.buy()}}}
const XR=[['Skull Island',(x,z)=>IS(x,z)>.3],['Desert Oasis',(x,z)=>Math.hypot(x+850,z-190)<65],['Glacier Peaks',(x,z)=>mg(x,z)>.4],['Thunder Ridge',(x,z)=>mk(430,-440,90,230,x,z)>.45],['Golden Plains',(x,z)=>GP(x,z)>.45],['Red Rock Badlands',(x,z)=>BD(x,z)>.45],['Sandstone Dunes',(x,z)=>DN(x,z)>.45],['Misty Bayou',(x,z)=>BY(x,z)>.45],['Whispering Pines',(x,z)=>mk(-720,-280,60,180,x,z)>.5],['Cedar Ridge',(x,z)=>mk(930,-430,50,150,x,z)>.5]];
WORLD.reg=[["Dead Man's Gulch",0,0],['Frostpeak Range',-300,-450],['Thunder Ridge',430,-440],['Eagle Rock Valley',470,-40],['Pine Hollow',170,-340],['Silver River',-380,-100],['Mirror Lake',190,330],['Sunset Coast',-120,425],['Glacier Peaks',0,-1010],['Golden Plains',800,-780],['Red Rock Badlands',820,170],['Sandstone Dunes',-930,60],['Desert Oasis',-850,190],['Misty Bayou',-860,-720],['Skull Island',330,640],['Whispering Pines',-720,-280],['Cedar Ridge',930,-430]];
/* ---- snowfall, underwater tint, region banner ---- */
const SN=600,sp=new Float32Array(SN*3);for(let i=0;i<SN;i++){sp[i*3]=R(-30,30);sp[i*3+1]=R(0,28);sp[i*3+2]=R(-30,30)}
const sn=new T.Points(new T.BufferGeometry().setAttribute('position',new T.BufferAttribute(sp,3)),new T.PointsMaterial({color:0xffffff,size:.16,transparent:true,depthWrite:false}));sn.frustumCulled=false;scene.add(sn);
const wt=document.createElement('div');wt.style.cssText='position:fixed;inset:0;pointer-events:none;background:rgba(20,80,100,.45);display:none';document.body.appendChild(wt);
const rg=document.createElement('div');rg.className='box';rg.style.cssText='top:116px;right:14px;text-align:right;font-size:15px;display:none';$('hud').appendChild(rg);
const RG=[...XR,['Mirror Lake',(x,z)=>LK(x,z)<60],['Silver River',(x,z)=>Math.abs(x-RV(z))<26&&z<400],['Sunset Coast',(x,z)=>z>385],['Eagle Rock Valley',(x,z)=>Math.hypot(x-VX,z-VZ)<80],['Frostpeak Range',(x,z)=>M(x,z)>.4],['Pine Hollow',(x,z)=>F(x,z)>.55],["Dead Man's Gulch",(x,z)=>Math.hypot(x,z)<95]];
let ds=new Set(),lS,rt=0,wt2=0,last=performance.now(),vv=new T.Vector3();
(function lp(n){requestAnimationFrame(lp);const dt=Math.min((n-last)/1000,.05);last=n;const t=n*.001;wm.uniforms.t.value=t;
 fires.forEach((f,i)=>{const k=1+Math.sin(t*14+i)*.15+Math.sin(t*31)*.1;f[0].scale.set(1,k,1);f[1].scale.set(1,2-k,1);f[2].intensity=f[3]*(.9+(k-1));});
 boats.forEach((b,i)=>{b.position.y=-.3+Math.sin(t*1.2+i)*.12;b.rotation.z=Math.sin(t*.9+i)*.04});lb.forEach(g=>g.rotation.y=t*.8);anim(t,dt);
 for(const g of gulls){const u=g.userData;u.a+=dt*u.s;g.position.set(60+Math.cos(u.a)*u.r*1.6,u.h+Math.sin(t+u.f)*1.5,440+Math.sin(u.a)*u.r);g.rotation.y=-u.a;g.rotation.z=Math.sin(t*u.f)*.5}
 const on=typeof P!=='undefined'&&P&&state=='playing';if(!on){sn.visible=false;wt.style.display='none';rg.style.display='none';return}
 const x=P.x,z=P.z;
 for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){const a=tg.get((Math.floor(x/8)+i)*4096+Math.floor(z/8)+j);if(a)for(const q of a){const dx=P.x-q[0],dz=P.z-q[1],r=(P.horse?1.1:.45)+q[2],d2=dx*dx+dz*dz;if(d2<r*r&&d2>1e-6){const d=Math.sqrt(d2);P.x+=dx/d*(r-d);P.z+=dz/d*(r-d)}}}
 if(P.z>760)P.z=760;
 if(P.y<-.6){const k=Math.exp(-dt*8);P.vx*=k;P.vz*=k;wt2-=dt;if(wt2<0&&Math.hypot(P.vx,P.vz)>1){wt2=.12;burst(vv.set(P.x,-.4,P.z),4,0x9ad0e0,2.2)}}
 wt.style.display=camera.position.y<-.45?'block':'none';
 const sa=sm(.2,.55,M(x,z));sn.visible=sa>.02;sn.material.opacity=sa;if(sn.visible){for(let i=0;i<SN;i++){sp[i*3+1]-=dt*2.5;sp[i*3]+=Math.sin(t+i)*dt*.6;if(sp[i*3+1]<0)sp[i*3+1]=28}sn.geometry.attributes.position.needsUpdate=true;sn.position.set(x,P.y,z)}
 scene.fog.density=.0046*(1+.7*F(x,z)+.6*sa+1.1*BY(x,z));
 if(!roam){rg.style.display='none';return}rg.style.display='block';rt-=dt;
 if(rt<=0){rt=.5;if(S!==lS){lS=S;ds=new Set}let cur='Open Range';for(const r of RG)if(r[1](x,z)){cur=r[0];break}
  if(cur!='Open Range'&&!ds.has(cur)){ds.add(cur);if(cur!="Dead Man's Gulch"){banner('Discovered: '+cur,3);S.money+=75;S.score+=200;snd.buy()}}
  WORLD.cur=cur;WORLD.ds=ds;rg.textContent=cur+' · Discovered '+ds.size+'/'+RG.length}})(performance.now());
})();
