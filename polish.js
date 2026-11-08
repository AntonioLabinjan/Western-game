/* Dead Man's Gulch – polish: day/night cycle, moon+stars, wind sway, dust motes. Load LAST (after enhance.js). Hold T to fast-forward time. */
(()=>{
const ss=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)},L=(a,b,k)=>a.map((v,i)=>v+(b[i]-v)*k),LS=(a,b,k)=>a+(b-a)*k;
/* ---- sky with sun / moon / stars driven by sunDir ---- */
sky.material=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{sd:{value:sunDir},t:{value:0}},
vertexShader:'varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
fragmentShader:`varying vec3 p;uniform vec3 sd;uniform float t;
float h(vec2 q){return fract(sin(dot(q,vec2(127.1,311.7)))*43758.5);}
float n(vec2 q){vec2 i=floor(q),f=fract(q);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1)),f.x),f.y);}
float fbm(vec2 q){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n(q);q=q*2.03+7.;a*=.5;}return s;}
void main(){vec3 d=normalize(p);float y=d.y,e=sd.y;
vec3 hz=mix(mix(vec3(.03,.04,.09),vec3(1.,.5,.22),smoothstep(-.12,.1,e)),vec3(.78,.86,.95),smoothstep(.12,.55,e));
vec3 zn=mix(mix(vec3(.01,.015,.05),vec3(.17,.2,.42),smoothstep(-.15,.08,e)),vec3(.16,.4,.88),smoothstep(.1,.5,e));
vec3 c=mix(hz,zn,pow(smoothstep(0.,.6,max(y,0.)),.65));
float s=max(dot(d,sd),0.),dg=smoothstep(-.1,.08,e),nt=1.-dg;
c+=vec3(1.,.6,.25)*(pow(s,6.)*.5+pow(s,60.)*.8)*dg;
float mo=dot(d,-sd);c+=vec3(.7,.78,1.)*(smoothstep(.9994,.9997,mo)*2.+pow(max(mo,0.),40.)*.25)*nt;
if(y>0.){vec2 q=d.xz/(y+.12)*.9+vec2(t*.01,0.);float k=smoothstep(.45,.8,fbm(q*1.6));
vec3 cl=mix(vec3(.55,.3,.38),vec3(1.,.97,.95),smoothstep(.1,.5,e));cl=mix(vec3(.05,.06,.11),cl,dg)*(.65+.5*pow(s,3.)*dg);
c=mix(c,cl,k*smoothstep(0.,.12,y)*.85);
c+=vec3(.9,.9,1.)*step(.985,h(floor(d.xz/(y+.3)*260.)))*smoothstep(.15,.6,y)*(.55+.45*sin(t*3.+h(floor(d.xz*90.))*20.))*nt;}
gl_FragColor=vec4(c,1.);}`});
const hemi=scene.children.find(o=>o.isHemisphereLight),ml=new T.DirectionalLight(0x7088ff,0);scene.add(ml);
const pls=[];scene.traverse(o=>{if(o.isPointLight)pls.push(o)});
/* ---- wind sway on grass, wheat, pines, cottonwoods ---- */
const WU={value:0};
scene.traverse(o=>{if(!o.isInstancedMesh)return;const g=o.geometry,m=o.material,gt=g.type;
 if(!(gt=='ConeGeometry'||(gt=='IcosahedronGeometry'&&g.parameters.detail==1))||m.emissiveIntensity>0||m.roughness<.5)return;
 const H=gt=='ConeGeometry'?g.parameters.height:2,A=(gt=='ConeGeometry'?.18:.05)*H;
 m.onBeforeCompile=sh=>{sh.uniforms.uW=WU;sh.uniforms.uA={value:A};sh.uniforms.uH={value:H};
  sh.vertexShader=sh.vertexShader.replace('void main() {','uniform float uW,uA,uH;void main() {').replace('#include <begin_vertex>',`#include <begin_vertex>
#ifdef USE_INSTANCING
float ph=instanceMatrix[3].x*.21+instanceMatrix[3].z*.17,kk=clamp((position.y+uH*.5)/uH,0.,1.);kk*=kk;
transformed.x+=(sin(uW*1.7+ph)+.5*sin(uW*3.1+ph*2.))*uA*kk;transformed.z+=cos(uW*1.3+ph*1.3)*uA*.7*kk;
#endif`)};m.needsUpdate=true});
/* ---- dust motes / pollen ---- */
const DN2=200,dp=new Float32Array(DN2*3),dO=Array.from({length:DN2},()=>[R(0,50),R(0,50),R(0,8),R(0,6.28)]),
dust=new T.Points(new T.BufferGeometry().setAttribute('position',new T.BufferAttribute(dp,3)),new T.PointsMaterial({color:0xffe2a8,size:.09,transparent:true,opacity:.5,blending:T.AdditiveBlending,depthWrite:false}));dust.frustumCulled=false;scene.add(dust);
const wr=(a,l)=>((a%l)+l)%l-l/2;
/* ---- day/night loop ---- */
let tt=0,last=performance.now(),fast=0,lm=new Map();
addEventListener('keydown',e=>{if(e.code=='KeyT')fast=1});addEventListener('keyup',e=>{if(e.code=='KeyT')fast=0});
(function lp(now){requestAnimationFrame(lp);const dt=Math.min((now-last)/1000,.05);last=now;
 if(typeof state!='undefined'&&state=='playing')tt+=dt*(fast?25:1);
 const ph=tt*6.283/420+.15;sunDir.set(Math.cos(ph)*.8,Math.sin(ph),-.6).normalize();const e=sunDir.y,nt=1-ss(-.1,.08,e),k=ss(-.03,.3,e);
 WU.value=now*.001;
 const fc=L(L([.035,.045,.1],[.86,.54,.36],ss(-.12,.1,e)),[.74,.82,.9],ss(.12,.55,e));scene.fog.color.setRGB(...fc);scene.background.setRGB(...fc);
 dl.intensity=2.1*Math.pow(k,.6);dl.color.setRGB(...L([1,.69,.44],[1,.95,.86],ss(.1,.5,e)));
 ml.intensity=.5*nt;ml.position.copy(sunDir).multiplyScalar(-100);
 if(hemi){const dk=ss(-.12,.1,e),dy=ss(.12,.55,e);hemi.color.setRGB(...L(L([.1,.14,.31],[1,.7,.48],dk),[.81,.9,1],dy));hemi.groundColor.setRGB(...L(L([.04,.04,.08],[.42,.26,.15],dk),[.55,.42,.3],dy));hemi.intensity=LS(LS(.55,.75,dk),1,dy)}
 sun.visible=glowS.visible=e>-.08;
 const kl=.3+1.3*nt;for(const l of pls){let b=lm.get(l);if(!b){b={base:l.intensity,last:l.intensity};lm.set(l,b)}if(l.intensity!==b.last)b.base=l.intensity;if(l===dl)continue;l.intensity=b.last=b.base*kl}
 if(typeof P!='undefined'&&P&&state=='playing'){dust.visible=true;dust.material.opacity=.15+.45*k;const x=P.x,z=P.z,y0=Math.max(gy(x,z),0),t=now*.001;
  for(let i=0;i<DN2;i++){const o=dO[i];dp[i*3]=x+wr(o[0]+t*.8-x,50);dp[i*3+1]=y0+.4+o[2]+Math.sin(t*.8+o[3])*.5;dp[i*3+2]=z+wr(o[1]+t*.3-z,50)}dust.geometry.attributes.position.needsUpdate=true}else dust.visible=false;
})(performance.now());
})();
