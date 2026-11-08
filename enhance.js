/* Dead Man's Gulch – visual + audio enhancement layer. Load AFTER the main script. */
(()=>{
const CDN='https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/';
let comp,fin,inPP=0,t0=0;
/* ---- sky: sun halo, volumetric-style clouds, dusk gradient ---- */
sky.material=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{sd:{value:sunDir},t:{value:0}},
vertexShader:'varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
fragmentShader:`varying vec3 p;uniform vec3 sd;uniform float t;
float h(vec2 q){return fract(sin(dot(q,vec2(127.1,311.7)))*43758.5);}
float n(vec2 q){vec2 i=floor(q),f=fract(q);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1)),f.x),f.y);}
float fbm(vec2 q){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n(q);q=q*2.03+7.;a*=.5;}return s;}
void main(){vec3 d=normalize(p);float y=d.y;
vec3 c=mix(vec3(1.,.5,.22),vec3(.9,.42,.36),smoothstep(0.,.2,y));c=mix(c,vec3(.45,.3,.5),smoothstep(.1,.45,y));c=mix(c,vec3(.12,.16,.38),smoothstep(.4,.9,y));
float s=max(dot(d,sd),0.);c+=vec3(1.,.6,.25)*(pow(s,6.)*.5+pow(s,60.)*.8);
if(y>0.){vec2 q=d.xz/(y+.12)*.9+vec2(t*.01,0.);float k=smoothstep(.45,.8,fbm(q*1.6));float lit=pow(s,3.)*.8+.35;
c=mix(c,mix(vec3(.55,.3,.38),vec3(1.,.62,.34),lit),k*smoothstep(0.,.12,y)*.85);
c+=vec3(.9,.9,1.)*step(.985,h(floor(d.xz/(y+.3)*260.)))*smoothstep(.5,.9,y)*.6;}
gl_FragColor=vec4(c,1.);}`});
cv.style.filter='none';dl.shadow.radius=3;gtex.anisotropy=8;
/* ---- lantern lights with flicker + glowing lamps ---- */
const LT=[[-9,3.4,-8],[9,3.4,-12],[-9,3.4,14],[9,3.4,26]].map(p=>{const l=new T.PointLight(0xffa040,1.4,20,2);l.position.set(...p);scene.add(l);
const b=new T.Mesh(new T.SphereGeometry(.22,8,6),new T.MeshBasicMaterial({color:0xffd080}));b.position.set(...p);scene.add(b);return l});
/* ---- dry grass tufts around town ---- */
{const N=2600,im=new T.InstancedMesh(new T.ConeGeometry(.07,.7,4),new T.MeshStandardMaterial({color:0xb39a52,roughness:1}),N),o=new T.Object3D();let i=0;
while(i<N){const a=R(0,6.28),d=R(10,95),x=Math.cos(a)*d,z=Math.sin(a)*d;if(Math.abs(x)<8.5&&Math.abs(z)<72||blocked(x,z))continue;
const s=R(.6,1.6);o.position.set(x,gy(x,z)+.3*s,z);o.rotation.set(R(-.3,.3),R(0,6),R(-.3,.3));o.scale.set(1,s,1);o.updateMatrix();im.setMatrixAt(i++,o.matrix)}
im.frustumCulled=false;scene.add(im)}
/* ---- post-processing: MSAA + bloom + grade + vignette + grain ---- */
function initPP(){
 const pr=ren.getPixelRatio(),rt=new T.WebGLMultisampleRenderTarget(innerWidth*pr,innerHeight*pr,{format:T.RGBAFormat});rt.samples=4;
 comp=new T.EffectComposer(ren,rt);comp.addPass(new T.RenderPass(scene,camera));
 comp.addPass(new T.UnrealBloomPass(new T.Vector2(innerWidth,innerHeight),.55,.7,.82));
 fin=new T.ShaderPass({uniforms:{tDiffuse:{value:null},t:{value:0},hv:{value:0}},
 vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:`varying vec2 vUv;uniform sampler2D tDiffuse;uniform float t,hv;
 float r(vec2 s){return fract(sin(dot(s,vec2(12.9898,78.233)))*43758.5453);}
 void main(){vec2 u=vUv,c=u-.5;float d=dot(c,c);vec2 o=c*d*.012*(1.+hv*3.);
 vec3 col=vec3(texture2D(tDiffuse,u+o).r,texture2D(tDiffuse,u).g,texture2D(tDiffuse,u-o).b);
 float l=dot(col,vec3(.299,.587,.114));col=mix(vec3(l),col,1.12);
 col*=mix(vec3(1.,.96,.92),vec3(1.06,1.,.9),l);col=col*col*(3.-2.*col)*.35+col*.65;
 col*=1.-smoothstep(.12,.62,d*1.6)*.55;col+=(r(u*vec2(1920.,1080.)+t)-.5)*.035;
 col=mix(col,col*vec3(1.4,.5,.5),hv*clamp(d*3.,0.,1.));gl_FragColor=vec4(col,1.);}`});
 comp.addPass(fin);
 const oR=ren.render.bind(ren);ren.render=(s,c)=>{if(!comp||inPP)return oR(s,c);inPP=1;comp.render();inPP=0};
 addEventListener('resize',()=>comp.setSize(innerWidth,innerHeight))}
['shaders/CopyShader.js','shaders/LuminosityHighPassShader.js','postprocessing/EffectComposer.js','postprocessing/RenderPass.js','postprocessing/ShaderPass.js','postprocessing/MaskPass.js','postprocessing/UnrealBloomPass.js']
.forEach((f,i,a)=>{const s=document.createElement('script');s.src=CDN+f;s.async=false;if(i==a.length-1)s.onload=()=>{try{initPP()}catch(e){comp=null}};document.head.appendChild(s)});
/* ---- country music for the pause menu (procedural, no assets) ---- */
let mus,mT=0,mS=0,mOn=false;
const mf=m=>440*Math.pow(2,(m-69)/12),CH=[43,48,43,50,43,48,50,43],ML=[[12,null,9,null,7,null,4,null],[7,9,7,null,4,null,2,null],[0,2,4,7,9,7,4,2],[12,null,null,null,null,null,null,null]];
function pl(m,t,d,v,ty){const o=AC.createOscillator(),f=AC.createBiquadFilter(),g=AC.createGain();o.type=ty||'sawtooth';o.frequency.value=mf(m);f.type='lowpass';
f.frequency.setValueAtTime(3200,t);f.frequency.exponentialRampToValueAtTime(500,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(f);f.connect(g);g.connect(mus);o.start(t);o.stop(t+d+.05)}
function brush(t,v){const s=AC.createBufferSource();s.buffer=nb;const f=AC.createBiquadFilter();f.type='highpass';f.frequency.value=3500;const g=AC.createGain();
g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.12);s.connect(f);f.connect(g);g.connect(mus);s.start(t,Math.random());s.stop(t+.15)}
function tick(){if(!AC)return;if(!mus){mus=AC.createGain();mus.gain.value=0;mus.connect(mg)}
 const on=state=='paused';mus.gain.setTargetAtTime(on?.8:0,AC.currentTime,on?.4:.15);if(!on){mOn=false;return}
 if(!mOn){mOn=true;mT=AC.currentTime+.15;mS=0}
 const sp=60/96/2;
 while(mT<AC.currentTime+.4){const bar=Math.floor(mS/8)%8,i=mS%8,r=CH[bar],t=mT+(i%2?.03:0);
  if(i==0)pl(r,t,.5,.35,'triangle');if(i==4)pl(r+7,t,.5,.3,'triangle');
  if(i==2||i==6){[0,4,7,12].forEach((k,j)=>pl(r+24+k,t+j*.012,.35,.07));brush(t,.07)}else if(i%2)brush(t,.02);
  const m=ML[bar%4][i];if(m!=null)pl(r+24+m,t,.3,.06);
  mT+=sp;mS++}}
setInterval(tick,100);
$('pause').insertBefore(Object.assign(document.createElement('div'),{className:'sub',textContent:'♪ Dusty Road Waltz'}),$('bResume'));
/* ---- per-frame effects ---- */
(function loop(n){requestAnimationFrame(loop);const t=n*.001;sky.material.uniforms.t.value=t;
 LT.forEach((l,i)=>l.intensity=1.3+Math.sin(t*9+i*2)*.12+Math.sin(t*23+i)*.08);
 if(fin){fin.uniforms.t.value=t%10;fin.uniforms.hv.value=(P&&P.vig)||0}})(0);
})();
