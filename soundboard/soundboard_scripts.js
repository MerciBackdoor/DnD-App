const $=s=>document.querySelector(s);
let ctx,master,rev;const bufs={};
const rnd=(a,b)=>a+Math.random()*(b-a);
const F=(t,f,q=1)=>{const n=ctx.createBiquadFilter();n.type=t;n.frequency.value=f;n.Q.value=q;return n};
const G=v=>{const n=ctx.createGain();n.gain.value=v;return n};
const P=v=>{const n=ctx.createStereoPanner();n.pan.value=v;return n};
const chain=(...n)=>{for(let i=0;i<n.length-1;i++)n[i].connect(n[i+1]);return n[n.length-1]};
const N=(t='pink',wide=true)=>{const o=G(1),ss=[];
const mk=p=>{const s=ctx.createBufferSource();s.buffer=bufs[t];s.loop=true;if(p===undefined)s.connect(o);else{const pn=P(p);s.connect(pn);pn.connect(o)}ss.push(s)};
if(wide){mk(-.8);mk(.8)}else mk();
o.start=(t0=0)=>ss.forEach((s,i)=>s.start(t0,Math.random()*3+i*.7));
o.stop=(t1=0)=>ss.forEach(s=>s.stop(t1));return o};
const wet=(n,a=.3)=>{const g=G(a);n.connect(g);g.connect(rev)};
const adsr=(g,t,a,p,d)=>{g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(p,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+d)};
const tone=(out,ty,f,t,a,d,p,f2,pan=0)=>{const o=ctx.createOscillator();o.type=ty;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+a+d);const g=G(0);adsr(g,t,a,p,d);chain(o,g,P(pan),out);o.start(t);o.stop(t+a+d+.05);return g};
const burst=(out,t,d,p,ft,ff,q=1,nt='white',pan=rnd(-.6,.6))=>{const s=ctx.createBufferSource();s.buffer=bufs[nt];const g=G(0);adsr(g,t,Math.min(.004,d/3),p,d);chain(s,F(ft,ff,q),g,P(pan),out);s.start(t,Math.random()*3);s.stop(t+d+.05)};
const rep=(fn,a,b)=>{let on=true,id;const go=()=>{if(!on)return;fn();id=setTimeout(go,rnd(a,b))};go();return()=>{on=false;clearTimeout(id)}};
const drift=(p,a,b,ms)=>rep(()=>p.setTargetAtTime(rnd(a,b),ctx.currentTime,ms/2200),ms*.7,ms*1.3);
const now=()=>ctx.currentTime;

function init(){
if(ctx){if(ctx.state==='suspended')ctx.resume();return}
ctx=new(window.AudioContext||window.webkitAudioContext)();
master=G(+$('#vol').value);
const c=ctx.createDynamicsCompressor();master.connect(c);c.connect(ctx.destination);
const len=ctx.sampleRate*2.8,ib=ctx.createBuffer(2,len,ctx.sampleRate);
for(let k=0;k<2;k++){const d=ib.getChannelData(k);let lp=0;for(let i=0;i<len;i++){lp+=(Math.random()*2-1-lp)*(.9-.82*i/len);d[i]=lp*2.5*Math.pow(1-i/len,2.5)}}
rev=ctx.createConvolver();rev.buffer=ib;const rg=G(.5);rev.connect(rg);rg.connect(master);
const L=ctx.sampleRate*6;
const w=ctx.createBuffer(1,L,ctx.sampleRate),b=ctx.createBuffer(1,L,ctx.sampleRate),p=ctx.createBuffer(1,L,ctx.sampleRate);
const wd=w.getChannelData(0),bd=b.getChannelData(0),pd=p.getChannelData(0);
let last=0,b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
for(let i=0;i<L;i++){const r=Math.random()*2-1;wd[i]=r;last=(last+.02*r)/1.02;bd[i]=last*3.5;
b0=.99886*b0+r*.0555179;b1=.99332*b1+r*.0750759;b2=.969*b2+r*.153852;b3=.8665*b3+r*.3104856;b4=.55*b4+r*.5329522;b5=-.7616*b5-r*.016898;
pd[i]=(b0+b1+b2+b3+b4+b5+b6+r*.5362)*.11;b6=r*.115926}
bufs.white=w;bufs.brown=b;bufs.pink=p;
}

const voice=(out,t,o)=>{
const{f,T,env,forms,vib=[5,0],rough=0,br=.05,det=1.006,gain=1,type='sawtooth'}=o;
const e=G(0),sm=G(1);
e.gain.setValueAtTime(.0001,t);env.forEach(([x,v])=>e.gain.linearRampToValueAtTime(Math.max(.0001,v),t+x));
forms.forEach(([fs,fe,q,a])=>{const bp=F('bandpass',fs,q);bp.frequency.setValueAtTime(fs,t);bp.frequency.linearRampToValueAtTime(fe,t+T);chain(sm,bp,G(a*4),e)});
[1,det].forEach(dt=>{const c=ctx.createOscillator();c.type=type;const fr=c.frequency;
fr.setValueAtTime(f[0][1]*dt,t);f.slice(1).forEach(([x,v])=>fr.linearRampToValueAtTime(v*dt,t+x));
const am=G(.5);
if(rough){const l=ctx.createOscillator();l.frequency.value=rough;chain(l,G(.35),am.gain);l.start(t);l.stop(t+T+.1)}
if(vib[1]){const v=ctx.createOscillator();v.frequency.value=vib[0];const vg=G(0);vg.gain.setValueAtTime(0,t);vg.gain.linearRampToValueAtTime(vib[1],t+T*.6);chain(v,vg,fr);v.start(t);v.stop(t+T+.1)}
chain(c,am,sm);c.start(t);c.stop(t+T+.1)});
if(br){const n=N('pink',false);chain(n,F('bandpass',1200,1),G(br),e);n.start(t);n.stop(t+T+.1)}
chain(e,G(gain),out)};

const clink=(m,t,f=rnd(2500,3500),p=.15,d=.3)=>{[[1,1],[2.32,.6],[3.9,.35]].forEach(([r,a],i)=>tone(m,'sine',f*r,t,.001,d/(1+i*.6),p*a));burst(m,t,.01,p*3,'highpass',5000)};

const pluck=(out,t,f,p=.3,d=1.2,pan=0)=>{const g=G(0),lp=F('lowpass',f*10);lp.frequency.setValueAtTime(f*10,t);lp.frequency.exponentialRampToValueAtTime(f*1.5,t+d*.6);adsr(g,t,.002,p,d);[['sawtooth',f],['triangle',f*1.002]].forEach(([ty,ff])=>{const o=ctx.createOscillator();o.type=ty;o.frequency.value=ff;chain(o,G(.5),lp);o.start(t);o.stop(t+d+.05)});chain(lp,g,P(pan),out);return g};
const vox=(out,t,T,f0,f1,v,o={})=>{const p=P(rnd(-.8,.8));p.connect(out);voice(p,t,{T,f:[[0,f0],[T,f1]],env:[[0,0],[.05,v],[T*.7,v*.8],[T,0]],forms:o.forms,br:.15,...o})};

const sounds=[
{cat:'Погода',id:'rain',n:'Дождь',i:'🌧️',loop:1,play(o){
const a=N('pink'),b=N('white'),bg=G(.35);
chain(a,F('highpass',350),F('lowpass',8000),bg,o);chain(b,F('bandpass',4500,.5),G(.05),o);a.start();b.start();
return[a,b,
rep(()=>burst(o,now(),rnd(.015,.05),rnd(.05,.22),'bandpass',rnd(1500,6500),2.5),8,30),
rep(()=>tone(o,'sine',rnd(1200,3200),now(),.001,rnd(.03,.07),rnd(.02,.06),rnd(2000,5000),rnd(-.8,.8)),60,200),
drift(bg.gain,.28,.42,2500)]}},
{cat:'Погода',id:'wind',n:'Ветер',i:'💨',loop:1,play(o){
const a=N('pink'),r=N('brown'),w=N('pink'),b1=F('bandpass',350,1.2),g1=G(.8),b2=F('bandpass',1000,7),g2=G(.06),rg=G(.25);
chain(a,b1,g1,o);chain(w,b2,g2,o);chain(r,F('lowpass',200),rg,o);a.start();r.start();w.start();
return[a,r,w,drift(b1.frequency,180,800,1400),drift(g1.gain,.2,1,1800),drift(b2.frequency,600,1600,900),drift(g2.gain,.01,.14,1200),drift(rg.gain,.08,.3,2000)]}},
{cat:'Погода',id:'thunder',n:'Гром',i:'⛈️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.5);
burst(m,t,.18,.9,'highpass',900);burst(m,t,.3,.6,'bandpass',2200,.7);
for(let i=0;i<6;i++)burst(m,t+rnd(.05,.6),rnd(.03,.12),rnd(.2,.6),'bandpass',rnd(600,2500),1);
[[.2,1.1,5.5],[.9,.8,5],[1.9,.6,4.5]].forEach(([d,pk,L])=>{
const s=N('brown'),f=F('lowpass',650),g=G(0);
f.frequency.setValueAtTime(650,t+d);f.frequency.exponentialRampToValueAtTime(70,t+d+L);
g.gain.setValueAtTime(.0001,t+d);g.gain.linearRampToValueAtTime(pk,t+d+.4);
for(let i=1;i<=10;i++)g.gain.linearRampToValueAtTime(pk*rnd(.35,1)*(1-i/11),t+d+.4+i*L/11);
g.gain.linearRampToValueAtTime(.0001,t+d+L+.5);
chain(s,f,g,m);s.start(t);s.stop(t+d+L+.6)})}},
{cat:'Погода',id:'waves',n:'Волны',i:'🌊',loop:1,play(o){
const a=N('pink'),lp=F('lowpass',400),g=G(.05),f=N('white'),fg=G(.0001);
chain(a,lp,g,o);chain(f,F('highpass',3000),fg,o);a.start();f.start();
const sw=()=>{const t=now(),pk=rnd(.35,.6),T=rnd(2,3);
g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(pk,t+T);g.gain.linearRampToValueAtTime(.05,t+T+rnd(3,4.5));
lp.frequency.cancelScheduledValues(t);lp.frequency.setValueAtTime(lp.frequency.value,t);lp.frequency.linearRampToValueAtTime(rnd(1800,3000),t+T);lp.frequency.linearRampToValueAtTime(350,t+T+4);
fg.gain.cancelScheduledValues(t);fg.gain.setValueAtTime(.0001,t+T*.8);fg.gain.linearRampToValueAtTime(pk*.5,t+T+.3);fg.gain.exponentialRampToValueAtTime(.001,t+T+3.5)};
return[a,f,rep(sw,6500,9500)]}},
{cat:'Погода',id:'fire',n:'Костёр',i:'🔥',loop:1,play(o){
const a=N('brown'),h=N('white'),ag=G(.6),hg=G(.02),lp=F('lowpass',350);
chain(a,lp,ag,o);chain(h,F('highpass',4000),hg,o);a.start();h.start();
const c=rep(()=>{const n=Math.random()<.25?rnd(3,6)|0:1;
for(let i=0;i<n;i++)burst(o,now()+i*rnd(.004,.03),rnd(.005,.025),rnd(.25,.8),'bandpass',rnd(2000,7000),1.5);
if(Math.random()<.12){const t=now();burst(o,t,rnd(.04,.09),rnd(.4,.8),'bandpass',rnd(700,1600),2);tone(o,'sine',rnd(150,300),t,.002,.06,.25,rnd(70,120))}},40,260);
return[a,h,c,drift(ag.gain,.35,.8,500),drift(lp.frequency,220,500,700),drift(hg.gain,.005,.03,300)]}},
{cat:'Подземелье',id:'door',n:'Скрип двери',i:'🚪',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.3);
burst(m,t,.03,.5,'bandpass',2500,2);burst(m,t+.02,.02,.3,'lowpass',500,1,'brown');
const T=rnd(1.4,1.9),s0=t+.12,n=Math.floor(T/.04);
const c=ctx.createOscillator();c.type='sawtooth';let fr=rnd(90,140),tg=fr;
c.frequency.setValueAtTime(fr,s0);
for(let k=1;k<=n;k++){if(k%8===1)tg=rnd(70,230);fr+=(tg-fr)*.15+rnd(-6,6);c.frequency.linearRampToValueAtTime(Math.max(50,fr),s0+k*.04)}
const g=G(0);g.gain.setValueAtTime(.0001,s0);g.gain.linearRampToValueAtTime(1.2,s0+.15);
for(let x=.25;x<T;x+=.1)g.gain.linearRampToValueAtTime(rnd(.5,1.4),s0+x);
g.gain.linearRampToValueAtTime(.0001,s0+T+.1);
const sm=G(1);
[[rnd(500,700),7,1,rnd(350,900)],[rnd(1000,1500),9,.5,rnd(800,1700)],[2400,8,.15,2400]].forEach(([f,q,a,f2])=>{
const bp=F('bandpass',f,q);bp.frequency.setValueAtTime(f,s0);bp.frequency.linearRampToValueAtTime(f2,s0+T);chain(c,bp,G(a),sm)});
const nz=N('pink',false);chain(nz,F('bandpass',1500,3),G(.05),g);
chain(sm,g,m);c.start(s0);c.stop(s0+T+.2);nz.start(s0);nz.stop(s0+T+.2);
tone(m,'sine',85,s0+T+.05,.005,.12,.3,50);burst(m,s0+T+.05,.08,.2,'lowpass',400,1,'brown')}},
{cat:'Подземелье',id:'slam',n:'Хлопок двери',i:'🚪',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.4);
burst(m,t,.3,1,'lowpass',350,1,'brown');tone(m,'sine',85,t,.003,.4,1,32);burst(m,t,.05,.5,'bandpass',1500,1.5);
[180,320,540].forEach(f=>burst(m,t,.25,.3,'bandpass',f,10));
for(let i=0;i<4;i++)burst(m,t+.05+i*rnd(.03,.08),rnd(.02,.05),rnd(.1,.3),'bandpass',rnd(800,2500),3)}},
{cat:'Подземелье',id:'stones',n:'Камень о камень',i:'🪨',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.15);
const T=rnd(.9,1.3),s=N('pink',false),bp=F('bandpass',900,2),g=G(0);
bp.frequency.setValueAtTime(700,t);for(let k=1;k<=8;k++)bp.frequency.linearRampToValueAtTime(rnd(500,2200),t+k*T/8);
g.gain.setValueAtTime(0,t);let x=0;while(x<T){x+=rnd(.008,.02);g.gain.setValueAtTime(rnd(.05,.7)*Math.sin(Math.PI*Math.min(x,T)/T),t+x)}
g.gain.setValueAtTime(0,t+T+.02);chain(s,bp,g,m);s.start(t);s.stop(t+T+.1);
const b=N('brown',false),bg=G(0);bg.gain.setValueAtTime(.0001,t);bg.gain.linearRampToValueAtTime(.5,t+.15);bg.gain.linearRampToValueAtTime(.0001,t+T);
chain(b,F('lowpass',250),bg,m);b.start(t);b.stop(t+T+.1);
[0,T].forEach(d=>{burst(m,t+d,.08,.6,'bandpass',rnd(1200,1800),8);tone(m,'sine',rnd(500,800),t+d,.001,.05,.12)})}},
{cat:'Подземелье',id:'rockfall',n:'Обвал',i:'⛰️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.35);
burst(m,t,.5,1,'lowpass',250,1,'brown');tone(m,'sine',70,t,.005,.5,.7,30);
for(let i=0;i<50;i++){const x=t+.05+Math.pow(Math.random(),1.8)*2.4,big=Math.random()<.2;
burst(m,x,rnd(.03,.12),big?rnd(.5,.9):rnd(.15,.5),'bandpass',big?rnd(250,700):rnd(700,2500),big?3:5);
tone(m,'sine',big?rnd(80,180):rnd(300,1000),x,.001,rnd(.03,.1),big?.35:.12,0,rnd(-.8,.8))}
const d=N('pink'),dg=G(0);dg.gain.setValueAtTime(.0001,t);dg.gain.linearRampToValueAtTime(.25,t+.5);dg.gain.linearRampToValueAtTime(.0001,t+3);
chain(d,F('lowpass',2500),dg,m);d.start(t);d.stop(t+3.1)}},
{cat:'Подземелье',id:'steps',n:'Шаги',i:'👣',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.15);
for(let i=0;i<8;i++){const x=t+.05+i*.55+rnd(-.04,.04),pn=i%2?.35:-.35,pp=rnd(.8,1.1);
burst(m,x,.09,.8*pp,'lowpass',rnd(250,380),1,'brown',pn);tone(m,'sine',rnd(75,95),x,.002,.1,.5*pp,45,pn);
burst(m,x+.09,.06,.35*pp,'lowpass',rnd(400,700),1,'brown',pn);
for(let k=0;k<6;k++)burst(m,x+rnd(0,.12),rnd(.01,.04),rnd(.06,.2),'highpass',rnd(2000,4500),1,'white',pn)}}},
{cat:'Подземелье',id:'drips',n:'Капли в пещере',i:'💧',loop:1,play(o){
return[rep(()=>{const t=now(),f=rnd(500,1300),pn=rnd(-.7,.7);
const g=tone(o,'sine',f,t,.001,.1,.8,f*rnd(1.8,2.6),pn);burst(o,t,.01,.08,'bandpass',3000,1);wet(g,1.5);
if(Math.random()<.3){const f2=f*rnd(.8,1.2);wet(tone(o,'sine',f2,t+rnd(.12,.3),.001,.09,.45,f2*2,pn),1.5)}},600,2800)]}},
{cat:'Бой',id:'sword',n:'Лязг мечей',i:'⚔️',play(o){
const sl=now(),t=sl+.1,m=G(1);m.connect(o);wet(m,.25);
const s=N('white',false),bp=F('bandpass',3000,3),g=G(0);
bp.frequency.setValueAtTime(2500,sl);bp.frequency.linearRampToValueAtTime(7000,t);
g.gain.setValueAtTime(.0001,sl);g.gain.linearRampToValueAtTime(.2,t-.02);g.gain.linearRampToValueAtTime(.0001,t);
chain(s,bp,g,m);s.start(sl);s.stop(t+.05);
const b=rnd(650,1000);burst(m,t,.015,.9,'highpass',4000);burst(m,t,.05,.5,'bandpass',rnd(2500,4000),2);
[[1,1],[2.76,.7],[5.4,.5],[8.93,.35],[13.3,.2],[18.6,.12]].forEach(([r,a],i)=>[1,1.004].forEach(dt=>tone(m,'sine',b*r*dt,t,.001,1.6/(1+i*.7),.16*a)))}},
{cat:'Бой',id:'boom',n:'Взрыв',i:'💥',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.6);
burst(m,t,.12,1,'highpass',800);
const s=N('brown'),f=F('lowpass',2200),g=G(0);
f.frequency.setValueAtTime(2200,t);f.frequency.exponentialRampToValueAtTime(45,t+2.8);adsr(g,t,.004,1.6,2.9);chain(s,f,g,m);s.start(t);s.stop(t+3.1);
tone(m,'sine',95,t,.004,1.4,1.3,24);
const p=N('pink'),pg=G(0);adsr(pg,t,.01,.8,.9);chain(p,F('bandpass',500,.6),pg,m);p.start(t);p.stop(t+1);
for(let i=0;i<25;i++)burst(m,t+rnd(.1,1.8),rnd(.02,.08),rnd(.1,.4),'bandpass',rnd(500,3000),3)}},
{cat:'Прочее',id:'bell',n:'Колокол',i:'🔔',play(o){
const t=now(),m=G(1),f=rnd(260,330);m.connect(o);wet(m,.7);
[[.5,.6,9],[1,1,8],[1.2,.55,6],[1.5,.4,5],[2,.5,4.5],[2.5,.3,3.5],[3,.25,3],[4,.15,2.2]].forEach(([r,a,d])=>[1,1.003].forEach(dt=>tone(m,'sine',f*r*dt,t,.003,d,.18*a)));
burst(m,t,.04,.35,'bandpass',3000,1.2);tone(m,'sine',f*5.4,t,.001,.4,.05)}},
{cat:'Прочее',id:'horn',n:'Боевой рог',i:'📯',play(o){
const t=now(),m=G(1),sm=G(1),lp=F('lowpass',300),e=G(0),pk=F('peaking',1200,1);m.connect(o);wet(m,.45);pk.gain.value=6;
lp.frequency.setValueAtTime(300,t);lp.frequency.linearRampToValueAtTime(1800,t+.5);lp.frequency.linearRampToValueAtTime(1000,t+2.4);
e.gain.setValueAtTime(.0001,t);e.gain.linearRampToValueAtTime(.45,t+.25);e.gain.setValueAtTime(.45,t+1.7);e.gain.linearRampToValueAtTime(.0001,t+2.6);
chain(sm,lp,pk,e,m);
[[130,'sawtooth',1],[130.9,'sawtooth',.8],[65,'square',.4]].forEach(([f,ty,a])=>{
const c=ctx.createOscillator();c.type=ty;c.frequency.setValueAtTime(f*.96,t);c.frequency.linearRampToValueAtTime(f,t+.25);
const v=ctx.createOscillator();v.frequency.value=5;const vg=G(0);vg.gain.setValueAtTime(0,t);vg.gain.linearRampToValueAtTime(f*.012,t+1.5);v.connect(vg);vg.connect(c.frequency);
chain(c,G(a),sm);c.start(t);v.start(t);c.stop(t+2.7);v.stop(t+2.7)});
burst(m,t,.25,.12,'bandpass',1500,1.5,'pink')}},
{cat:'Прочее',id:'wolf',n:'Вой волка',i:'🐺',play(o){
const t=now(),m=G(1),sm=G(1),e=G(0);m.connect(o);wet(m,.75);e.connect(m);
e.gain.setValueAtTime(.0001,t);e.gain.linearRampToValueAtTime(.35,t+.5);e.gain.linearRampToValueAtTime(.42,t+2);e.gain.linearRampToValueAtTime(.0001,t+3.5);
[[600,7,1,420],[1100,9,.55,800],[2600,10,.18,2600]].forEach(([f,q,a,f2])=>{
const bp=F('bandpass',f,q);bp.frequency.setValueAtTime(f,t);bp.frequency.linearRampToValueAtTime(f2,t+3.4);chain(sm,bp,G(a*4),e)});
[0,1].forEach(k=>{const c=ctx.createOscillator();c.type='sawtooth';const fr=c.frequency,dt=k?1.006:1;
fr.setValueAtTime(280*dt,t);fr.linearRampToValueAtTime(500*dt,t+.9);fr.linearRampToValueAtTime(560*dt,t+1.8);fr.linearRampToValueAtTime(300*dt,t+3.4);
const v=ctx.createOscillator();v.frequency.value=5.2+k*.4;const vg=G(0);vg.gain.setValueAtTime(0,t);vg.gain.linearRampToValueAtTime(11,t+2);v.connect(vg);vg.connect(fr);
chain(c,G(.5),sm);c.start(t);v.start(t);c.stop(t+3.6);v.stop(t+3.6)});
const n=N('pink',false);chain(n,F('bandpass',1200,1),G(.05),e);n.start(t);n.stop(t+3.6)}},
{cat:'Прочее',id:'magic',n:'Магия',i:'✨',play(o){
const t=now(),m=G(1),sc=[523,587,659,784,880,1047,1175,1319,1568,1760,2093];m.connect(o);wet(m,.85);
for(let i=0;i<14;i++){const f=sc[Math.min(10,Math.floor(i*.75+rnd(0,2)))]*(Math.random()<.2?2:1),x=t+i*rnd(.05,.09),pn=rnd(-.8,.8);
tone(m,'sine',f,x,.004,.9,.13,0,pn);tone(m,'sine',f*2.76,x,.002,.25,.03,0,pn)}
for(let i=0;i<24;i++)tone(m,'sine',rnd(2500,6000),t+rnd(0,1.5),.002,rnd(.1,.3),.04,0,rnd(-.9,.9));
const s=N('white'),sg=G(0);adsr(sg,t,.8,.06,1.2);chain(s,F('highpass',5000),sg,m);s.start(t);s.stop(t+2.2);
tone(m,'triangle',261,t+.9,.3,1.8,.08)}}
,
{cat:'Чудовища',id:'growl',n:'Рык',i:'🐻',play(o){
const m=G(1);m.connect(o);wet(m,.4);
voice(m,now(),{T:1.6,f:[[0,95],[.4,110],[1.2,85],[1.6,70]],env:[[0,0],[.15,.5],[1,.45],[1.6,0]],forms:[[700,500,6,1],[1100,900,8,.5],[2400,2000,10,.2]],vib:[6,3],rough:38,br:.1})}},
{cat:'Чудовища',id:'roar',n:'Рёв дракона',i:'🐲',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.7);
voice(m,t,{T:3,f:[[0,160],[.5,230],[1.5,150],[3,60]],env:[[0,0],[.2,.6],[1.8,.7],[3,0]],forms:[[500,350,5,1],[900,700,6,.7],[1800,1200,8,.3]],vib:[5,6],rough:28,br:.25,gain:1.2});
const s=N('brown'),g=G(0);adsr(g,t,.3,.5,2.5);chain(s,F('lowpass',250),g,m);s.start(t);s.stop(t+3.2);
tone(m,'sine',55,t,.3,2.4,.4,35)}},
{cat:'Чудовища',id:'firebreath',n:'Дыхание огня',i:'🔥',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.3);
const s=N('pink'),bp=F('bandpass',600,.8),g=G(0);
bp.frequency.setValueAtTime(600,t);bp.frequency.linearRampToValueAtTime(2500,t+.6);bp.frequency.linearRampToValueAtTime(900,t+2.4);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.8,t+.3);g.gain.setValueAtTime(.8,t+1.6);g.gain.linearRampToValueAtTime(.0001,t+2.6);
chain(s,bp,g,m);s.start(t);s.stop(t+2.7);
const b=N('brown'),bg=G(0);bg.gain.setValueAtTime(.0001,t);bg.gain.linearRampToValueAtTime(.7,t+.3);bg.gain.setValueAtTime(.7,t+1.6);bg.gain.linearRampToValueAtTime(.0001,t+2.8);
chain(b,F('lowpass',300),bg,m);b.start(t);b.stop(t+2.9);
const h=N('white'),hg=G(0);hg.gain.setValueAtTime(.0001,t);hg.gain.linearRampToValueAtTime(.12,t+.2);hg.gain.linearRampToValueAtTime(.0001,t+2.6);
chain(h,F('highpass',5000),hg,m);h.start(t);h.stop(t+2.7);
for(let i=0;i<20;i++)burst(m,t+rnd(.3,2.4),rnd(.01,.04),rnd(.2,.6),'bandpass',rnd(2000,6000),1.5)}},
{cat:'Чудовища',id:'wings',n:'Взмахи крыльев',i:'🦇',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.3);
for(let i=0;i<4;i++){const x=t+.05+i*(.55+i*.03),s=N('brown',false),f=F('lowpass',200),g=G(0);
f.frequency.setValueAtTime(150,x);f.frequency.linearRampToValueAtTime(600,x+.18);f.frequency.linearRampToValueAtTime(150,x+.45);
adsr(g,x,.18,1,.3);chain(s,f,g,P(rnd(-.4,.4)),m);s.start(x);s.stop(x+.55);
tone(m,'sine',48,x+.15,.01,.2,.4,30);burst(m,x+.1,.2,.15,'bandpass',900,.8,'pink')}}},
{cat:'Чудовища',id:'shriek',n:'Визг',i:'👹',play(o){
const m=G(1);m.connect(o);wet(m,.5);
voice(m,now(),{T:1.4,f:[[0,700],[.3,1400],[.9,2000],[1.4,1500]],env:[[0,0],[.05,.5],[1,.5],[1.4,0]],forms:[[900,1200,8,1],[2200,2800,10,.6],[3500,3800,10,.3]],vib:[7,25],rough:60,br:.15,det:1.01})}},
{cat:'Чудовища',id:'hiss',n:'Шипение',i:'🐍',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.2);
const s=N('white'),g=G(0),f=N('white'),fg=G(0);
chain(s,F('bandpass',6000,.6),F('highpass',3000),g,m);chain(f,F('bandpass',5500,3),fg,m);
g.gain.setValueAtTime(0,t);fg.gain.setValueAtTime(0,t);
for(let x=0;x<1.8;x+=.03){const e=Math.sin(Math.PI*x/1.8);g.gain.setValueAtTime(.35*e*rnd(.7,1.1),t+x);fg.gain.setValueAtTime(.2*e*rnd(.6,1.1),t+x)}
g.gain.setValueAtTime(0,t+1.85);fg.gain.setValueAtTime(0,t+1.85);
s.start(t);s.stop(t+1.9);f.start(t);f.stop(t+1.9)}},
{cat:'Чудовища',id:'zombie',n:'Стон зомби',i:'🧟',play(o){
const m=G(1);m.connect(o);wet(m,.5);
voice(m,now(),{T:2.4,f:[[0,120],[.5,105],[1.4,95],[2.4,70]],env:[[0,0],[.4,.5],[1.8,.5],[2.4,0]],forms:[[650,500,5,1],[1000,850,6,.5],[2400,2200,8,.15]],vib:[4.5,4],rough:14,br:.15})}},
{cat:'Чудовища',id:'bones',n:'Стук костей',i:'💀',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.25);
for(let i=0;i<14;i++){const x=t+.05+Math.pow(i/14,.8)*1.2+rnd(0,.03);
burst(m,x,rnd(.04,.08),rnd(1.5,2.5),'bandpass',rnd(1500,3500),12);tone(m,'sine',rnd(900,2200),x,.001,.03,.15)}
for(let i=0;i<3;i++)burst(m,t+.05+i*rnd(.2,.4),.12,1.5,'bandpass',rnd(500,800),8)}},
{cat:'Чудовища',id:'ooze',n:'Слизь',i:'🟢',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.3);
for(let i=0;i<8;i++){const x=t+.05+i*rnd(.12,.22),f=rnd(120,300),b=rnd(600,1200);
tone(m,'sine',f,x,.005,.12,.5,f*rnd(1.5,2.5));burst(m,x,.1,.2,'lowpass',600,1,'pink');tone(m,'sine',b,x+rnd(.03,.08),.002,.05,.2,b*2)}
const s=N('pink',false),g=G(0);g.gain.setValueAtTime(0,t);
for(let x=0;x<1.5;x+=.02)g.gain.setValueAtTime(rnd(0,.4)*Math.sin(Math.PI*x/1.5),t+x);g.gain.setValueAtTime(0,t+1.55);
chain(s,F('bandpass',400,2),g,m);s.start(t);s.stop(t+1.6)}},
{cat:'Чудовища',id:'goblin',n:'Смех гоблина',i:'👺',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.25);
for(let i=0;i<7;i++){const x=t+.05+i*rnd(.13,.17),f0=520-i*12+rnd(-20,20);
voice(m,x,{T:.12,f:[[0,f0],[.12,f0*.72]],env:[[0,0],[.02,.5],[.08,.4],[.12,0]],forms:[[700,550,6,1],[1700,1500,8,.7],[2800,2600,10,.2]],br:.2,det:1.01})}}},
{cat:'Чудовища',id:'troll',n:'Ворчание тролля',i:'🧌',play(o){
const m=G(1);m.connect(o);wet(m,.4);
voice(m,now(),{T:.9,f:[[0,70],[.3,85],[.9,55]],env:[[0,0],[.1,.6],[.6,.5],[.9,0]],forms:[[400,300,5,1],[800,600,6,.6],[1500,1200,8,.2]],vib:[5,2],rough:30,br:.15,gain:1.4})}},
{cat:'Чудовища',id:'swarm',n:'Рой',i:'🪰',loop:1,play(o){
const a=[],st=[],sm=G(1),am=G(.6);
for(let i=0;i<6;i++){const c=ctx.createOscillator();c.type='sawtooth';c.frequency.value=rnd(160,260);chain(c,G(.06),sm);c.start();a.push(c);st.push(drift(c.frequency,150,280,rnd(300,700)))}
const l=ctx.createOscillator();l.frequency.value=22;chain(l,G(.25),am.gain);l.start();
const n=N('pink');chain(n,F('highpass',3000),G(.03),o);n.start();
chain(sm,F('bandpass',900,.7),am,o);
return[...a,l,n,...st]}},
{cat:'Чудовища',id:'breath',n:'Тяжёлое дыхание',i:'👁️',loop:1,play(o){
const n=N('pink'),bp=F('bandpass',500,.7),g=G(.0001),r=N('brown'),rg=G(.0001);
chain(n,bp,g,o);chain(r,F('lowpass',220),rg,o);n.start();r.start();
const cyc=()=>{const t=now();
g.gain.cancelScheduledValues(t);bp.frequency.cancelScheduledValues(t);rg.gain.cancelScheduledValues(t);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.3,t+.9);g.gain.linearRampToValueAtTime(.05,t+1.15);g.gain.linearRampToValueAtTime(.45,t+1.7);g.gain.linearRampToValueAtTime(.0001,t+2.9);
bp.frequency.setValueAtTime(500,t);bp.frequency.linearRampToValueAtTime(800,t+.9);bp.frequency.linearRampToValueAtTime(400,t+2.9);
rg.gain.setValueAtTime(.0001,t+1.1);rg.gain.linearRampToValueAtTime(.5,t+1.7);rg.gain.linearRampToValueAtTime(.0001,t+2.9)};
return[n,r,rep(cyc,3300,3900)]}}
,
{cat:'Природа',id:'crickets',n:'Сверчки',i:'🦗',loop:1,play(o){
const b=N('brown');chain(b,F('lowpass',160),G(.08),o);b.start();const r=[];
for(let i=0;i<5;i++){const f=rnd(4000,5000),pn=rnd(-.9,.9),k=rnd(3,5)|0;
r.push(rep(()=>{for(let j=0;j<k;j++)tone(o,'sine',f,now()+j*.055,.004,.03,.09,0,pn)},500+i*90,1100+i*120))}
return[b,...r]}},
{cat:'Природа',id:'brook',n:'Ручей',i:'🏞️',loop:1,play(o){
const a=N('pink'),g=G(.4),h=N('white'),bp=F('bandpass',1500,.5);
chain(a,bp,g,o);chain(h,F('highpass',5000),G(.015),o);a.start();h.start();
return[a,h,rep(()=>{const f=rnd(500,2500);tone(o,'sine',f,now(),.002,.05,.05,f*rnd(1.5,2.2),rnd(-.8,.8))},10,40),drift(bp.frequency,1000,2200,600),drift(g.gain,.3,.5,800)]}},
{cat:'Природа',id:'owl',n:'Сова',i:'🦉',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.6);
const h=(x,f,d)=>{tone(m,'sine',f,x,.04,d,.5,f*.9);tone(m,'sine',f*2,x,.04,d*.8,.08)};
h(t+.05,430,.25);h(t+.5,400,.7);h(t+2,430,.25);h(t+2.45,400,.7)}},
{cat:'Природа',id:'birds',n:'Птицы',i:'🐦',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.35);
for(let b=0;b<2;b++){const pn=rnd(-.8,.8),base=rnd(2600,4200),n=rnd(4,9)|0;let x=t+.05+b*.9;
for(let i=0;i<n;i++){const f=base*rnd(.8,1.3);tone(m,'sine',f,x,.004,.06,.4,f*rnd(.6,1.7),pn);x+=rnd(.05,.12)}}}},
{cat:'Магия',id:'fireball',n:'Огненный шар',i:'☄️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.5);
const s=N('pink'),bp=F('bandpass',300,1),g=G(0);bp.frequency.setValueAtTime(300,t);bp.frequency.exponentialRampToValueAtTime(3500,t+.9);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.7,t+.85);g.gain.linearRampToValueAtTime(.0001,t+1);chain(s,bp,g,m);s.start(t);s.stop(t+1.1);
tone(m,'sawtooth',120,t,.8,.1,.1,600);
const x=t+.9,b=N('brown'),f=F('lowpass',2000),bg=G(0);f.frequency.setValueAtTime(2000,x);f.frequency.exponentialRampToValueAtTime(50,x+2.2);
adsr(bg,x,.005,1.4,2.3);chain(b,f,bg,m);b.start(x);b.stop(x+2.6);
tone(m,'sine',85,x,.005,1,1.1,26);burst(m,x,.15,1,'highpass',900);
for(let i=0;i<30;i++)burst(m,x+rnd(.05,1.6),rnd(.01,.04),rnd(.2,.6),'bandpass',rnd(1500,6000),1.5)}},
{cat:'Магия',id:'lightning',n:'Молния',i:'⚡',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.35);
const c=ctx.createOscillator();c.type='sawtooth';c.frequency.setValueAtTime(4000,t);c.frequency.exponentialRampToValueAtTime(150,t+.25);
const cg=G(0);adsr(cg,t,.002,.35,.25);chain(c,F('highpass',800),cg,m);c.start(t);c.stop(t+.3);
for(let i=0;i<40;i++)burst(m,t+i*rnd(.004,.012),rnd(.005,.02),rnd(.3,.9),'highpass',rnd(2000,6000));
burst(m,t,.5,.8,'bandpass',2500,.6);
const s=N('brown'),f=F('lowpass',500),g=G(0);adsr(g,t+.1,.1,1,1.4);chain(s,f,g,m);s.start(t);s.stop(t+1.8)}},
{cat:'Магия',id:'heal',n:'Лечение',i:'💚',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.8);
[523,659,784,1047,1319].forEach((f,i)=>{tone(m,'sine',f,t+i*.1,.01,1.2,.14);tone(m,'sine',f*2,t+i*.1,.01,.5,.04)});
tone(m,'triangle',523,t,.6,1.6,.1);tone(m,'triangle',784,t+.1,.6,1.5,.08);
for(let i=0;i<16;i++)tone(m,'sine',rnd(2500,5000),t+rnd(.3,1.6),.002,rnd(.15,.35),.04,0,rnd(-.9,.9))}},
{cat:'Магия',id:'teleport',n:'Телепорт',i:'🌀',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.5);
const s=N('white'),bp=F('bandpass',500,2),g=G(0);bp.frequency.setValueAtTime(500,t);bp.frequency.exponentialRampToValueAtTime(6000,t+.6);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.5,t+.55);g.gain.linearRampToValueAtTime(.0001,t+.65);chain(s,bp,g,m);s.start(t);s.stop(t+.7);
tone(m,'sine',300,t,.55,.1,.3,2400);tone(m,'sine',450,t,.55,.1,.15,3600);
tone(m,'sine',1500,t+.62,.005,.3,.35,180);burst(m,t+.62,.08,.7,'lowpass',500,1,'brown');
for(let i=0;i<14;i++)tone(m,'sine',rnd(2500,6000),t+.62+rnd(0,.6),.002,rnd(.1,.3),.04,0,rnd(-.9,.9))}},
{cat:'Магия',id:'portal',n:'Портал',i:'🔮',loop:1,play(o){
const sm=G(1),lp=F('lowpass',400),am=G(.6),os=[];
[55,82.5,110,165].forEach((f,i)=>{const c=ctx.createOscillator();c.type='sawtooth';c.frequency.value=f*(1+i*.002);chain(c,G(.2),sm);c.start();os.push(c)});
const l=ctx.createOscillator();l.frequency.value=3.5;chain(l,G(.25),am.gain);l.start();
const w=ctx.createOscillator();w.frequency.value=660;const wl=ctx.createOscillator();wl.frequency.value=5;chain(wl,G(15),w.frequency);chain(w,G(.03),o);w.start();wl.start();
const n=N('pink'),nb=F('bandpass',1800,3);chain(n,nb,G(.08),o);n.start();
chain(sm,lp,am,o);
return[...os,l,w,wl,n,drift(lp.frequency,300,800,1500),drift(nb.frequency,1000,3200,800)]}},
{cat:'Подземелье',id:'chains',n:'Цепи',i:'⛓️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.3);
for(let i=0;i<26;i++){const x=t+.05+Math.pow(Math.random(),1.2)*1.4;
clink(m,x,rnd(1800,3200),rnd(.05,.12),.12);burst(m,x,rnd(.03,.08),rnd(.5,1.2),'bandpass',rnd(3000,7000),10)}
burst(m,t+.05,.2,.5,'lowpass',300,1,'brown')}},
{cat:'Подземелье',id:'chest',n:'Сундук',i:'🧰',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.3);
burst(m,t,.04,.6,'bandpass',1800,2);burst(m,t,.1,.5,'lowpass',400,1,'brown');
voice(m,t+.1,{T:1,f:[[0,140],[.3,200],[.6,120],[1,180]],env:[[0,0],[.1,.5],[.8,.5],[1,0]],forms:[[700,1000,8,1],[1500,1800,9,.5]],vib:[18,8],br:.1});
for(let i=0;i<6;i++)clink(m,t+1.25+i*rnd(.03,.08),rnd(2500,3500),.1,.2);
tone(m,'sine',120,t+1.15,.003,.12,.5,60)}},
{cat:'Подземелье',id:'lockpick',n:'Взлом замка',i:'🗝️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.15);
let x=t+.05;for(let i=0;i<7;i++){burst(m,x,.012,rnd(1,1.8),'bandpass',3500,3);tone(m,'sine',rnd(3500,4500),x,.001,.012,.1);x+=rnd(.12,.35)}
burst(m,x,.06,1.5,'bandpass',1500,2);tone(m,'sine',300,x,.002,.05,.5,200);clink(m,x+.02,2200,.08,.4)}},
{cat:'Бой',id:'arrow',n:'Выстрел из лука',i:'🏹',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.25);
tone(m,'triangle',200,t,.002,.25,.5,90);tone(m,'sine',400,t,.002,.15,.2,170);burst(m,t,.03,.5,'bandpass',2000,2);
const s=N('pink',false),bp=F('bandpass',3500,1),g=G(0);bp.frequency.setValueAtTime(3500,t+.03);bp.frequency.linearRampToValueAtTime(1500,t+.45);
g.gain.setValueAtTime(.0001,t+.03);g.gain.linearRampToValueAtTime(.3,t+.2);g.gain.linearRampToValueAtTime(.0001,t+.5);chain(s,bp,g,m);s.start(t);s.stop(t+.55);
const h=t+.5;burst(m,h,.06,.9,'lowpass',500,1,'brown');tone(m,'sine',150,h,.002,.1,.7,60);
const q=ctx.createOscillator();q.type='triangle';q.frequency.value=320;const v=ctx.createOscillator();v.frequency.value=22;chain(v,G(12),q.frequency);
const qg=G(0);adsr(qg,h,.002,.12,.5);chain(q,qg,m);q.start(h);v.start(h);q.stop(h+.6);v.stop(h+.6)}},
{cat:'Бой',id:'hit',n:'Удар',i:'👊',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.15);
burst(m,t,.1,1,'lowpass',300,1,'brown');tone(m,'sine',120,t,.003,.15,.8,45);burst(m,t,.04,.6,'bandpass',1200,1);burst(m,t+.02,.15,.15,'lowpass',800,1,'pink')}},
{cat:'Таверна',id:'mugs',n:'Звон кружек',i:'🍺',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.3);
clink(m,t+.02,rnd(1200,1600),.28,.6);clink(m,t+.03,rnd(1700,2100),.18,.5);tone(m,'sine',220,t,.002,.06,.3,120);
const s=N('pink',false),g=G(0);adsr(g,t+.05,.05,.15,.35);chain(s,F('bandpass',700,1),g,m);s.start(t);s.stop(t+.5)}},
{cat:'Таверна',id:'coins',n:'Монеты',i:'🪙',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.3);
for(let i=0;i<9;i++)clink(m,t+.02+Math.pow(Math.random(),1.5)*.7,rnd(2200,3400),rnd(.08,.16),.35);
burst(m,t,.5,.1,'bandpass',3500,3)}},
{cat:'Таверна',id:'dice',n:'Бросок кубика',i:'🎲',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.2);
let x=t+.02,gp=.035,p=1;
while(x<t+1.3){burst(m,x,rnd(.015,.04),p*rnd(1.5,2.5),'bandpass',rnd(1500,3500),4);tone(m,'sine',rnd(500,1000),x,.001,.03,p*.5);x+=gp;gp*=rnd(1.1,1.3);p*=.88}
burst(m,x,.02,.25,'bandpass',2500,4)}},
{cat:'Прочее',id:'heartbeat',n:'Сердцебиение',i:'❤️',loop:1,play(o){
const b=(x,p)=>{tone(o,'sine',90,x,.004,.12,p,45);burst(o,x,.06,p*.4,'lowpass',200,1,'brown',0)};
return[rep(()=>{const t=now();b(t,.9);b(t+.2,.6)},880,900)]}},
{cat:'Прочее',id:'drums',n:'Боевые барабаны',i:'🥁',loop:1,play(o){
const pat=[1,0,.6,.6,1,0,.6,0];let i=0;
return[rep(()=>{const v=pat[i++%8];if(!v)return;const t=now();
const g=tone(o,'sine',130,t,.003,.35,v,55);wet(g,.4);burst(o,t,.08,v*.6,'lowpass',500,1,'brown',0);burst(o,t,.03,v*.3,'bandpass',1500,1,'white',0)},430,430)]}},
{cat:'Чудовища',id:'ghost',n:'Плач призрака',i:'👻',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.9);
voice(m,t,{T:3,f:[[0,500],[.8,720],[1.6,650],[3,300]],env:[[0,0],[.8,.4],[2,.4],[3,0]],forms:[[500,700,12,1],[1400,1800,14,.6],[2400,2000,10,.2]],vib:[5,15],br:.25,det:1.012});
const s=N('pink'),g=G(0);adsr(g,t,1,.08,2);chain(s,F('bandpass',2500,2),g,m);s.start(t);s.stop(t+3.2)}},
{cat:'Чудовища',id:'whisper',n:'Шёпот',i:'🗣️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.6);
const s=N('white'),bp=F('bandpass',2500,1.5),g=G(0);
g.gain.setValueAtTime(.0001,t);bp.frequency.setValueAtTime(2500,t);
let x=0;for(let i=0;i<14;i++){x+=rnd(.1,.17);bp.frequency.setValueAtTime(rnd(1200,3800),t+x);g.gain.linearRampToValueAtTime(rnd(.15,.45),t+x+.03);g.gain.linearRampToValueAtTime(.0001,t+x+.1)}
chain(s,bp,g,m);s.start(t);s.stop(t+x+.3)}}
,
{cat:'Природа',id:'waterfall',n:'Водопад',i:'💦',loop:1,play(o){
const a=N('pink'),b=N('white'),c=N('brown'),g=G(.5);
chain(a,F('highpass',200),F('lowpass',6000),g,o);chain(b,F('bandpass',3000,.3),G(.15),o);chain(c,F('lowpass',200),G(.4),o);a.start();b.start();c.start();
return[a,b,c,drift(g.gain,.4,.6,1500)]}},
{cat:'Природа',id:'swamp',n:'Болото',i:'🐸',loop:1,play(o){
const b=N('brown');chain(b,F('lowpass',140),G(.08),o);b.start();
const croak=()=>{const x=now(),n=rnd(2,4)|0,f=rnd(130,200),pn=P(rnd(-.8,.8));pn.connect(o);
for(let j=0;j<n;j++)voice(pn,x+j*.09,{T:.08,f:[[0,f],[.08,f*.7]],env:[[0,0],[.01,.5],[.05,.4],[.08,0]],forms:[[500,400,6,1],[1400,1200,8,.5]],br:0,det:1.01,gain:.8})};
return[b,rep(croak,700,2500),rep(()=>{const f=rnd(200,500);tone(o,'sine',f,now(),.003,.06,.12,f*2,rnd(-.7,.7))},900,3000)]}},
{cat:'Природа',id:'crow',n:'Ворона',i:'🐦‍⬛',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.4);
[0,.45,.9].forEach((d,i)=>voice(m,t+.05+d,{T:.35,f:[[0,450-i*20],[.15,400],[.35,300]],env:[[0,0],[.03,.5],[.25,.4],[.35,0]],forms:[[900,1100,6,1],[1800,1500,7,.6]],rough:60,br:.25,gain:1.2}))}},
{cat:'Природа',id:'blizzard',n:'Метель',i:'❄️',loop:1,play(o){
const a=N('pink'),h=N('white'),w=N('pink'),b1=F('bandpass',900,.8),g1=G(.7),hg=G(.1),b2=F('bandpass',1200,12),g2=G(.1);
chain(a,b1,g1,o);chain(h,F('highpass',3000),hg,o);chain(w,b2,g2,o);a.start();h.start();w.start();
return[a,h,w,drift(b1.frequency,500,1500,1000),drift(g1.gain,.3,.9,1400),drift(hg.gain,.03,.15,900),drift(b2.frequency,800,1800,1200),drift(g2.gain,.02,.18,1000)]}},
{cat:'Природа',id:'quake',n:'Землетрясение',i:'🌋',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.4);
const s=N('brown'),f=F('lowpass',150),g=G(0);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.3,t+.3);
for(let i=1;i<=45;i++)g.gain.linearRampToValueAtTime(rnd(.5,1)*Math.sin(Math.PI*i/46)+.05,t+.3+i*.1);
g.gain.linearRampToValueAtTime(.0001,t+5);chain(s,f,g,m);s.start(t);s.stop(t+5.1);
tone(m,'sine',35,t,.5,4,.6,28);
for(let i=0;i<40;i++){const x=t+rnd(.3,4.2);burst(m,x,rnd(.05,.2),rnd(.3,.9),'bandpass',rnd(150,900),2);tone(m,'sine',rnd(50,110),x,.002,.15,.4,0,rnd(-.8,.8))}}},
{cat:'Природа',id:'cave',n:'Эхо пещеры',i:'🕳️',loop:1,play(o){
const os=[],b=N('brown'),bg=G(.2),n=N('pink'),nb=F('bandpass',300,2),ng=G(.08);
[41,61.7].forEach(f=>{const c=ctx.createOscillator();c.type='triangle';c.frequency.value=f;chain(c,G(.12),o);c.start();os.push(c)});
chain(b,F('lowpass',200),bg,o);chain(n,nb,ng,o);b.start();n.start();
return[...os,b,n,drift(bg.gain,.1,.3,2500),drift(nb.frequency,200,600,2000),drift(ng.gain,.02,.12,1800),
rep(()=>{const f=rnd(500,1200);wet(tone(o,'sine',f,now(),.002,.1,.2,f*2,rnd(-.7,.7)),1.5)},2500,7000)]}},
{cat:'Подземелье',id:'portcullis',n:'Решётка',i:'🏰',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.4);
const s=N('brown'),g=G(0);adsr(g,t,.3,.5,2);chain(s,F('lowpass',250),g,m);s.start(t);s.stop(t+2.5);
for(let i=0;i<45;i++)burst(m,t+.05+i*.035,.02,rnd(.5,1),'bandpass',rnd(1500,3000),6);
for(let i=0;i<14;i++){const x=t+rnd(.1,1.6);clink(m,x,rnd(1500,2600),.08,.15)}
const e=t+1.7;burst(m,e,.2,.9,'lowpass',500,1,'brown');tone(m,'sine',90,e,.003,.4,.9,40);clink(m,e,700,.3,.8)}},
{cat:'Подземелье',id:'stonedoor',n:'Каменная дверь',i:'🗿',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.45);
const T=2.2,s=N('pink',false),bp=F('bandpass',500,1.5),g=G(0);
bp.frequency.setValueAtTime(300,t);for(let k=1;k<=8;k++)bp.frequency.linearRampToValueAtTime(rnd(250,900),t+k*T/8);
g.gain.setValueAtTime(0,t);let x=0;while(x<T){x+=rnd(.01,.03);g.gain.setValueAtTime(rnd(.1,.8)*Math.sin(Math.PI*Math.min(x,T)/T),t+x)}g.gain.setValueAtTime(0,t+T+.02);
chain(s,bp,g,m);s.start(t);s.stop(t+T+.1);
const b=N('brown'),bg=G(0);adsr(bg,t,.3,.8,T);chain(b,F('lowpass',200),bg,m);b.start(t);b.stop(t+T+.5);
const d=N('white'),dg=G(0);adsr(dg,t,.5,.05,T);chain(d,F('highpass',4000),dg,m);d.start(t);d.stop(t+T+.5);
const e=t+T;tone(m,'sine',65,e,.005,.5,1,30);burst(m,e,.3,.8,'lowpass',300,1,'brown')}},
{cat:'Подземелье',id:'lever',n:'Рычаг',i:'🕹️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.3);
voice(m,t,{T:.4,f:[[0,300],[.4,220]],env:[[0,0],[.05,.4],[.35,.35],[.4,0]],forms:[[900,1100,8,1]],vib:[20,10],br:.1});
for(let i=0;i<6;i++){const x=t+.45+i*.06;burst(m,x,.012,1.2,'bandpass',2500,4);tone(m,'sine',3000,x,.001,.01,.1)}
const e=t+.9;burst(m,e,.08,1,'bandpass',900,2);tone(m,'sine',150,e,.002,.12,.7,70);clink(m,e,1800,.08,.3);
const r=N('brown'),rg=G(0);adsr(rg,e+.05,.2,.4,.8);chain(r,F('lowpass',250),rg,m);r.start(e);r.stop(e+1.3)}},
{cat:'Подземелье',id:'trapplate',n:'Нажимная плита',i:'⚠️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.25);
burst(m,t,.03,1.3,'bandpass',3000,2);tone(m,'sine',200,t,.002,.06,.4,100);
const x=t+.3;tone(m,'triangle',250,x,.002,.15,.5,120);
const s=N('pink',false),bp=F('bandpass',4000,1),g=G(0);bp.frequency.setValueAtTime(4000,x+.02);bp.frequency.linearRampToValueAtTime(2000,x+.25);
g.gain.setValueAtTime(.0001,x+.02);g.gain.linearRampToValueAtTime(.3,x+.12);g.gain.linearRampToValueAtTime(.0001,x+.28);chain(s,bp,g,m);s.start(x);s.stop(x+.3);
const h=x+.3;burst(m,h,.05,.9,'lowpass',600,1,'brown');tone(m,'sine',180,h,.002,.08,.6,70);tone(m,'triangle',400,h,.002,.4,.1)}},
{cat:'Подземелье',id:'boulder',n:'Катящийся валун',i:'🪨',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.4);
const s=N('brown'),lp=F('lowpass',300),am=G(.6),g=G(0),l=ctx.createOscillator();
lp.frequency.setValueAtTime(300,t);lp.frequency.linearRampToValueAtTime(900,t+2.2);
l.frequency.setValueAtTime(3,t);l.frequency.linearRampToValueAtTime(7,t+2.5);chain(l,G(.35),am.gain);l.start(t);l.stop(t+3.5);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(1.4,t+2.2);g.gain.linearRampToValueAtTime(.0001,t+3.4);
chain(s,lp,am,g,m);s.start(t);s.stop(t+3.5);
for(let i=0;i<60;i++){const x=t+Math.pow(Math.random(),.7)*2.6;burst(m,x,rnd(.02,.08),rnd(.1,.4)*(.3+x/3),'bandpass',rnd(300,2000),2)}
for(let i=0;i<7;i++)tone(m,'sine',rnd(50,90),t+i*.35+rnd(0,.1),.003,.2,.5,35,rnd(-.6,.6))}},
{cat:'Подземелье',id:'fall',n:'Падение',i:'⬇️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.4);
const s=N('pink'),bp=F('bandpass',2000,1),g=G(0);bp.frequency.setValueAtTime(2000,t);bp.frequency.exponentialRampToValueAtTime(500,t+1.8);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.8,t+1.7);g.gain.linearRampToValueAtTime(.0001,t+1.85);chain(s,bp,g,m);s.start(t);s.stop(t+1.9);
const e=t+1.85;burst(m,e,.25,1,'lowpass',350,1,'brown');tone(m,'sine',80,e,.003,.4,1,30);
for(let i=0;i<10;i++)burst(m,e+rnd(.05,.6),rnd(.02,.06),rnd(.2,.5),'bandpass',rnd(500,2500),3)}},
{cat:'Бой',id:'unsheathe',n:'Меч из ножен',i:'🗡️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.25);
const s=N('white',false),bp=F('bandpass',2000,6),g=G(0);bp.frequency.setValueAtTime(2000,t);bp.frequency.exponentialRampToValueAtTime(8000,t+.4);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.5,t+.3);g.gain.linearRampToValueAtTime(.0001,t+.45);chain(s,bp,g,m);s.start(t);s.stop(t+.5);
const l=N('pink',false),lg=G(0);adsr(lg,t,.1,.2,.3);chain(l,F('bandpass',800,1),lg,m);l.start(t);l.stop(t+.5);
[3000,4300,6100].forEach((f,i)=>tone(m,'sine',f,t+.38,.002,.6/(1+i),.07))}},
{cat:'Бой',id:'swing',n:'Взмах оружия',i:'💫',play(o){
const t=now(),m=G(1);m.connect(o);
const s=N('white'),bp=F('bandpass',600,1.5),g=G(0);bp.frequency.setValueAtTime(600,t);bp.frequency.exponentialRampToValueAtTime(2500,t+.12);bp.frequency.exponentialRampToValueAtTime(800,t+.3);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.6,t+.1);g.gain.linearRampToValueAtTime(.0001,t+.32);chain(s,bp,g,m);s.start(t);s.stop(t+.35)}},
{cat:'Бой',id:'crossbow',n:'Арбалет',i:'🎯',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.2);
burst(m,t,.015,1.4,'bandpass',2800,3);tone(m,'triangle',160,t+.01,.002,.15,.7,80);burst(m,t+.01,.06,.6,'lowpass',700,1,'brown');
const s=N('white',false),bp=F('bandpass',4500,1),g=G(0);g.gain.setValueAtTime(.0001,t+.02);g.gain.linearRampToValueAtTime(.2,t+.08);g.gain.linearRampToValueAtTime(.0001,t+.25);chain(s,bp,g,m);s.start(t);s.stop(t+.3);
const h=t+.35;burst(m,h,.05,.9,'lowpass',500,1,'brown');tone(m,'sine',140,h,.002,.08,.6,60)}},
{cat:'Бой',id:'shield',n:'Удар по щиту',i:'🛡️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.25);
burst(m,t,.08,1,'lowpass',1000,1,'brown');burst(m,t,.02,.8,'highpass',2500);tone(m,'sine',100,t,.003,.15,.7,60);
[[1,1],[2.76,.6],[5.4,.35]].forEach(([r,a],i)=>[1,1.005].forEach(dt=>tone(m,'sine',330*r*dt,t,.001,.5/(1+i*.5),.14*a)))}},
{cat:'Бой',id:'armor',n:'Шаги в доспехах',i:'🪖',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.2);
for(let i=0;i<6;i++){const x=t+.05+i*.52+rnd(-.03,.03),pn=i%2?.3:-.3;
burst(m,x,.08,.7,'lowpass',rnd(250,380),1,'brown',pn);tone(m,'sine',rnd(70,90),x,.002,.1,.4,45,pn);
for(let k=0;k<8;k++){const y=x+rnd(0,.15);clink(m,y,rnd(1500,2600),rnd(.03,.08),.12);burst(m,y,rnd(.01,.04),rnd(.2,.5),'bandpass',rnd(3000,6000),8,'white',pn)}}}},
{cat:'Магия',id:'missile',n:'Волшебная стрела',i:'🌠',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.5);
for(let i=0;i<3;i++){const x=t+i*.12;
tone(m,'sine',2500,x,.005,.25,.3,600,-.5+i*.5);tone(m,'triangle',1250,x,.005,.25,.1,300,-.5+i*.5);burst(m,x,.05,.3,'highpass',5000);
tone(m,'sine',800,x+.28,.002,.12,.3,200,-.5+i*.5);burst(m,x+.28,.04,.5,'bandpass',2000,2)}}},
{cat:'Магия',id:'frost',n:'Ледяная магия',i:'🧊',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.6);
const s=N('white'),g=G(0);adsr(g,t,.5,.08,1.5);chain(s,F('highpass',4000),g,m);s.start(t);s.stop(t+2.1);
for(let i=0;i<30;i++)burst(m,t+rnd(0,1.6),rnd(.005,.02),rnd(.3,.9),'highpass',rnd(3000,8000),2);
[3000,3700,4600,5900].forEach((f,i)=>{const x=t+i*.06;tone(m,'sine',f,x,.01,.8,.07,0,rnd(-.8,.8));tone(m,'sine',f*1.01,x,.01,.8,.05)});
tone(m,'sine',1800,t+.05,.002,.5,.2,400);burst(m,t,.06,1,'bandpass',2500,2)}},
{cat:'Магия',id:'acid',n:'Кислота',i:'🧪',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.2);
const s=N('white'),g=G(0);g.gain.setValueAtTime(0,t);
for(let x=0;x<2;x+=rnd(.005,.015))g.gain.setValueAtTime(rnd(.02,.4)*(1-x/2),t+x);
g.gain.setValueAtTime(0,t+2.05);chain(s,F('highpass',4000),g,m);s.start(t);s.stop(t+2.1);
const p=N('pink'),pg=G(0);adsr(pg,t,.05,.2,1.8);chain(p,F('bandpass',2000,1),pg,m);p.start(t);p.stop(t+2);
for(let i=0;i<20;i++){const f=rnd(300,900);tone(m,'sine',f,t+rnd(0,1.8),.002,.04,.12,f*1.8,rnd(-.8,.8))}}},
{cat:'Магия',id:'curse',n:'Проклятие',i:'☠️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.8);
const sm=G(1),lp=F('lowpass',300),e=G(0);lp.frequency.setValueAtTime(300,t);lp.frequency.linearRampToValueAtTime(900,t+1.3);lp.frequency.linearRampToValueAtTime(200,t+3);
e.gain.setValueAtTime(.0001,t);e.gain.linearRampToValueAtTime(.4,t+1.2);e.gain.linearRampToValueAtTime(.0001,t+3);
[[110,1],[116.5,1],[155.6,.7],[55,1]].forEach(([f,a])=>{const c=ctx.createOscillator();c.type='sawtooth';c.frequency.setValueAtTime(f*1.05,t);c.frequency.linearRampToValueAtTime(f*.95,t+3);
const v=ctx.createOscillator();v.frequency.value=rnd(3,6);const vg=G(f*.01);chain(v,vg,c.frequency);chain(c,G(.15*a),sm);c.start(t);v.start(t);c.stop(t+3.1);v.stop(t+3.1)});
chain(sm,lp,e,m);
const n=N('pink'),ng=G(0);adsr(ng,t,1,.05,2);chain(n,F('highpass',3000),ng,m);n.start(t);n.stop(t+3.1);
tone(m,'sine',50,t+2.6,.01,.8,.6,30)}},
{cat:'Магия',id:'holy',n:'Божественный свет',i:'😇',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.9);
const forms=[[800,800,6,1],[1150,1150,8,.6],[2900,2900,10,.2]];
[196,247,294,392].forEach((f,i)=>voice(m,t+i*.1,{T:3,f:[[0,f],[3,f]],env:[[0,0],[.7,.3],[2.2,.3],[3,0]],forms,vib:[5,f*.01],br:.03,gain:.8}));
[784,988,1175,1568].forEach((f,i)=>{tone(m,'sine',f,t+i*.12,.005,1.8,.1);tone(m,'sine',f*2.76,t+i*.12,.005,.5,.03)});
for(let i=0;i<14;i++)tone(m,'sine',rnd(2500,5500),t+rnd(.3,2),.002,rnd(.2,.4),.03,0,rnd(-.9,.9))}},
{cat:'Магия',id:'fizzle',n:'Сорванное заклинание',i:'💨',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.2);
const s=N('white'),bp=F('bandpass',3000,1.5),g=G(0);bp.frequency.setValueAtTime(3000,t);bp.frequency.exponentialRampToValueAtTime(300,t+.6);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.4,t+.05);g.gain.linearRampToValueAtTime(.0001,t+.65);chain(s,bp,g,m);s.start(t);s.stop(t+.7);
tone(m,'sine',600,t,.005,.5,.2,100);
for(let i=0;i<14;i++)burst(m,t+rnd(0,.5),rnd(.005,.02),rnd(.2,.5),'bandpass',rnd(1500,5000),2);
burst(m,t+.6,.05,.5,'lowpass',500,1,'brown')}},
{cat:'Магия',id:'summon',n:'Призыв',i:'🕯️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.7);
const s=N('brown'),f=F('lowpass',100),g=G(0);f.frequency.setValueAtTime(100,t);f.frequency.exponentialRampToValueAtTime(900,t+2);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(1,t+2);g.gain.linearRampToValueAtTime(.0001,t+2.1);chain(s,f,g,m);s.start(t);s.stop(t+2.2);
const e=G(0),sm=G(1);e.gain.setValueAtTime(.0001,t);e.gain.linearRampToValueAtTime(.3,t+2);e.gain.linearRampToValueAtTime(.0001,t+3.5);
[55,82.5,110,165].forEach(fr=>{const c=ctx.createOscillator();c.type='sawtooth';c.frequency.setValueAtTime(fr*.8,t);c.frequency.exponentialRampToValueAtTime(fr,t+2);chain(c,G(.15),sm);c.start(t);c.stop(t+3.6)});
chain(sm,F('lowpass',700),e,m);
for(let i=0;i<20;i++)tone(m,'sine',rnd(1500,5000),t+rnd(0,2),.002,rnd(.15,.4),.04,0,rnd(-.9,.9));
const x=t+2;tone(m,'sine',70,x,.005,1.2,1,28);burst(m,x,.2,.8,'highpass',1000);clink(m,x,900,.25,1.5)}},
{cat:'Таверна',id:'lute',n:'Лютня',i:'🪕',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.4);
const ch=[[130.8,196,261.6,329.6,392],[110,164.8,220,261.6,329.6],[164.8,246.9,329.6,392,493.9],[98,146.8,196,246.9,392]];
[0,.55,1.1,1.65].forEach((d,k)=>{const c=ch[k%4],dir=k%2?-1:1;
(dir>0?c:[...c].reverse()).forEach((f,i)=>pluck(m,t+.05+d+i*.03,f,.28,1.3,-.5+i*.25))})}},
{cat:'Таверна',id:'flute',n:'Флейта',i:'🎼',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.5);
const sc=[587,659,740,880,988,1175],c=ctx.createOscillator(),h=ctx.createOscillator(),g=G(0),v=ctx.createOscillator(),vg=G(0);
let x=t+.05,i=2;g.gain.setValueAtTime(.0001,t);
const notes=[];for(let k=0;k<7;k++){i=Math.max(0,Math.min(5,i+Math.round(rnd(-2,2))));notes.push([sc[i],rnd(.22,.5)])}
notes.forEach(([f,d])=>{c.frequency.setValueAtTime(f,x);h.frequency.setValueAtTime(f*2,x);g.gain.linearRampToValueAtTime(.3,x+.04);g.gain.setValueAtTime(.3,x+d-.05);g.gain.linearRampToValueAtTime(.08,x+d);x+=d});
g.gain.linearRampToValueAtTime(.0001,x+.15);
v.frequency.value=5;vg.gain.setValueAtTime(0,t);vg.gain.linearRampToValueAtTime(6,t+1.5);chain(v,vg,c.frequency);
c.type='sine';h.type='sine';chain(c,g);chain(h,G(.08),g);chain(g,m);
const n=N('pink',false);chain(n,F('bandpass',3000,1),G(.05),g);
c.start(t);h.start(t);v.start(t);n.start(t);c.stop(x+.3);h.stop(x+.3);v.stop(x+.3);n.stop(x+.3)}},
{cat:'Таверна',id:'harp',n:'Арфа',i:'🎶',play(o){
const t=now(),m=G(1),sc=[262,294,330,392,440,523,587,659,784,880,1047,1175,1319,1568];m.connect(o);wet(m,.9);
sc.forEach((f,i)=>{const x=t+i*.07,pn=-.7+i*.1;tone(m,'sine',f,x,.002,1.6,.18,0,pn);tone(m,'sine',f*2,x,.002,.6,.04,0,pn);tone(m,'sine',f*3,x,.002,.3,.02,0,pn)})}},
{cat:'Таверна',id:'crowd',n:'Гул таверны',i:'🍻',loop:1,play(o){
const vw=[[700,1100],[400,2000],[300,800],[550,1700],[800,1200]],b=N('pink'),bg=G(.04);
chain(b,F('bandpass',600,.8),bg,o);b.start();
return[b,rep(()=>{const T=rnd(.25,.6),f0=rnd(100,230),[a,c]=vw[Math.random()*5|0],pn=P(rnd(-.8,.8));pn.connect(o);
voice(pn,now(),{T,f:[[0,f0],[T,f0*rnd(.8,1.2)]],env:[[0,0],[.05,.4],[T*.7,.35],[T,0]],forms:[[a,a*.9,6,1],[c,c*.95,8,.5]],br:.15,gain:1})},60,150)]}},
{cat:'Таверна',id:'applause',n:'Аплодисменты',i:'👏',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.3);
for(let i=0;i<220;i++){const x=Math.random()*3.2,d=Math.sin(Math.PI*x/3.2)**.7;if(Math.random()<d)burst(m,t+x,rnd(.01,.03),rnd(.1,.5),'bandpass',rnd(1200,4000),1)}
const s=N('pink'),g=G(0);adsr(g,t,1.2,.12,2.2);chain(s,F('highpass',1500),g,m);s.start(t);s.stop(t+3.5)}},
{cat:'Таверна',id:'pour',n:'Наливают эль',i:'🍺',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.1);
const s=N('white'),g=G(0);adsr(g,t,.1,.12,1.6);chain(s,F('bandpass',2500,1),g,m);s.start(t);s.stop(t+1.8);
for(let i=0;i<45;i++){const f=300+600*(i/45)+rnd(-40,40);tone(m,'sine',f,t+i*.035,.002,.04,.1,f*1.3)}
tone(m,'sine',150,t+1.65,.005,.15,.3,100)}},
{cat:'Таверна',id:'doorbell',n:'Колокольчик двери',i:'🛎️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.3);
clink(m,t,3200,.2,.9);clink(m,t+.07,3800,.15,.8);clink(m,t+.14,2800,.15,.8);clink(m,t+.25,3500,.08,.6)}},
{cat:'Чудовища',id:'bats',n:'Летучие мыши',i:'🦇',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.4);
for(let i=0;i<14;i++){const x=t+rnd(0,1.6),f=rnd(5000,7500),pn=rnd(-.9,.9);tone(m,'sine',f,x,.002,.04,.35,f*rnd(.7,1.4),pn);tone(m,'sine',f*.5,x,.002,.03,.15,0,pn)}
for(let i=0;i<10;i++)burst(m,t+rnd(0,1.6),rnd(.05,.12),rnd(.1,.3),'bandpass',rnd(900,1800),1,'pink')}},
{cat:'Чудовища',id:'spider',n:'Паук',i:'🕷️',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.2);
let x=t+.05;for(let r=0;r<5;r++){const n=rnd(5,9)|0,pn=rnd(-.7,.7);for(let i=0;i<n;i++){burst(m,x,rnd(.004,.012),rnd(.5,1.1),'bandpass',rnd(4000,7000),4,'white',pn);x+=rnd(.02,.04)}x+=rnd(.1,.3)}}},
{cat:'Чудовища',id:'rattle',n:'Гремучая змея',i:'🪱',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.2);
const s=N('white'),bp=F('bandpass',6500,1.2),am=G(.5),g=G(0),l=ctx.createOscillator();
l.frequency.value=65;chain(l,G(.5),am.gain);l.start(t);l.stop(t+2.4);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.7,t+.1);g.gain.setValueAtTime(.7,t+1.8);g.gain.linearRampToValueAtTime(.0001,t+2.2);
chain(s,bp,am,g,m);s.start(t);s.stop(t+2.3)}},
{cat:'Чудовища',id:'demon',n:'Голос демона',i:'😈',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.7);
voice(m,t,{T:2.2,f:[[0,55],[.5,60],[1.5,45],[2.2,40]],env:[[0,0],[.2,.6],[1.6,.6],[2.2,0]],forms:[[300,250,5,1],[700,500,7,.7],[1500,900,8,.3]],vib:[4,2],rough:20,br:.3,gain:1.2});
voice(m,t+.05,{T:2.2,f:[[0,110],[.5,125],[1.5,90],[2.2,75]],env:[[0,0],[.2,.4],[1.6,.4],[2.2,0]],forms:[[500,400,6,1],[1100,800,8,.5]],vib:[5,4],rough:35,br:.2,det:1.012})}},
{cat:'Чудовища',id:'gnoll',n:'Хохот гнолла',i:'🐕',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.4);let x=t+.05,f0=340;
for(let i=0;i<10;i++){voice(m,x,{T:.13,f:[[0,f0],[.13,f0*.7]],env:[[0,0],[.02,.5],[.09,.4],[.13,0]],forms:[[600,500,6,1],[1300,1100,8,.7],[2400,2200,9,.2]],rough:40,br:.25,gain:1.1});x+=.17-i*.008;f0*=.97}}},
{cat:'Чудовища',id:'stomp',n:'Шаги великана',i:'🦶',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.5);
for(let i=0;i<4;i++){const x=t+.05+i*.9+rnd(-.03,.03),pn=i%2?.3:-.3;
tone(m,'sine',50,x,.004,.5,1.3,25,pn);burst(m,x,.5,1,'lowpass',150,1,'brown',pn);burst(m,x+.03,.2,.3,'lowpass',600,1,'brown',pn);
for(let k=0;k<8;k++)burst(m,x+rnd(.05,.5),rnd(.02,.06),rnd(.1,.3),'bandpass',rnd(500,2500),3)}}},
{cat:'Путешествие',id:'hooves',n:'Цокот копыт',i:'🐎',loop:1,play(o){
let i=0;
return[rep(()=>{const x=now(),pn=i++%2?.3:-.3;
burst(o,x,.04,1,'bandpass',1200,3,'white',pn);burst(o,x,.06,.8,'lowpass',400,1,'pink',pn);tone(o,'sine',600,x,.002,.04,.3,300,pn)},170,170)]}},
{cat:'Путешествие',id:'neigh',n:'Ржание',i:'🐴',play(o){
const m=G(1);m.connect(o);wet(m,.4);
voice(m,now(),{T:1.1,f:[[0,500],[.15,950],[.4,820],[.7,650],[1.1,350]],env:[[0,0],[.05,.5],[.8,.45],[1.1,0]],forms:[[800,1200,8,1],[2000,2600,10,.5]],vib:[28,25],rough:45,br:.2,det:1.01,gain:1.2})}},
{cat:'Путешествие',id:'ship',n:'Скрип корабля',i:'⛵',play(o){
const t=now(),m=G(1);m.connect(o);wet(m,.4);
voice(m,t,{T:2,f:[[0,95],[.6,140],[1.2,100],[2,160]],env:[[0,0],[.2,.4],[1.6,.4],[2,0]],forms:[[300,500,8,1],[700,900,9,.6]],vib:[6,6],rough:15,br:.15});
const s=N('brown'),g=G(0);adsr(g,t,1,.4,1.2);chain(s,F('bandpass',300,1),g,m);s.start(t);s.stop(t+2.4)}}
];

const active=new Map();
const root=$('#root');
const cats=[...new Set(sounds.map(s=>s.cat))];
cats.forEach(c=>{
const sec=document.createElement('section');
sec.innerHTML=`<h2>${c}</h2><div class="grid"></div>`;
const grid=sec.querySelector('.grid');
sounds.filter(s=>s.cat===c).forEach(s=>{
const b=document.createElement('button');b.className='snd';
b.innerHTML=`<span class="i">${s.i}</span><span class="n">${s.n}</span>${s.loop?'<span class="t">∞</span>':''}`;
b.onclick=()=>{init();
if(s.loop)active.has(s.id)?stopLoop(s.id):startLoop(s,b);
else{const g=G(1);g.connect(master);s.play(g);b.classList.remove('hit');void b.offsetWidth;b.classList.add('hit')}};
s.btn=b;grid.appendChild(b)});
root.appendChild(sec)});

function startLoop(s,b){
const g=G(1);g.connect(master);
const items=s.play(g);
active.set(s.id,{g,b,stop:()=>items.forEach(x=>typeof x==='function'?x():x.stop())});
b.classList.add('on')}
function stopLoop(id){
const a=active.get(id);if(!a)return;active.delete(id);
a.b.classList.remove('on');
const t=now();a.g.gain.setValueAtTime(a.g.gain.value,t);a.g.gain.linearRampToValueAtTime(0,t+.4);
setTimeout(()=>{a.stop();a.g.disconnect()},500)}
$('#stop').onclick=()=>[...active.keys()].forEach(stopLoop);
const VOL_KEY='soundboard_volume';
try{const v=localStorage.getItem(VOL_KEY);if(v!==null&&!isNaN(+v))$('#vol').value=v}catch(e){}
$('#vol').oninput=e=>{if(master)master.gain.value=+e.target.value;try{localStorage.setItem(VOL_KEY,e.target.value)}catch(err){}};
