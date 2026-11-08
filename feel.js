/* Dead Man's Gulch – game-feel tweaks: cinematic menu camera, muzzle flash, bullet impacts, hoof dust, health regen + heartbeat. Load LAST. */
(()=>{
const v=new T.Vector3(),d=new T.Vector3(),mf=new T.PointLight(0xffc070,0,18,2);scene.add(mf);
let last=performance.now(),la=0,lhp=100,hurtT=0,hb=0,hd=0,fl=0;
function impact(){camera.getWorldDirection(d);for(let t=2;t<160;t+=2){v.copy(camera.position).addScaledVector(d,t);
 for(const e of E)if(e.g&&Math.abs(e.g.position.x-v.x)<1.1&&Math.abs(e.g.position.z-v.z)<1.1&&v.y<e.g.position.y+2.4&&v.y>e.g.position.y-.2){burst(v,8,0xa01010,3);return}
 if(v.y<gy(v.x,v.z)){burst(v,10,0xcfae7a,2.6);return}}}
(function lp(n){requestAnimationFrame(lp);const dt=Math.min((n-last)/1000,.05);last=n;const t=n*.001;
 if(state=='menu'){const a=t*.05;camera.position.set(Math.cos(a)*70,22+Math.sin(t*.2)*4,Math.sin(a)*70);camera.lookAt(0,7,0);return}
 if(typeof P=='undefined'||!P||state!='playing'){return}
 if(P.ammo<la){fl=.07;camera.getWorldDirection(d);mf.position.copy(camera.position).addScaledVector(d,1.4);impact()}la=P.ammo;
 fl=Math.max(0,fl-dt);mf.intensity=fl>0?4:0;
 if(P.hp<lhp)hurtT=n;lhp=P.hp;if(n-hurtT>8000&&P.hp<100&&P.hp>0){P.hp=Math.min(100,P.hp+dt*4);lhp=P.hp}
 if(P.hp<30&&P.hp>0){P.vig=Math.max(P.vig,.3+.1*Math.sin(t*6));hb-=dt;if(hb<0){hb=.9;tn(0,.12,70,50,.5,'sine');tn(.18,.1,60,45,.4,'sine')}}
 hd-=dt;if(P.horse&&P.g&&hd<0&&Math.hypot(P.vx,P.vz)>8){hd=.07;burst(v.set(P.x,P.y+.2,P.z),3,0xc9a878,1.5)}
})(performance.now());
})();
