import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import './styles.css';

const A='/assets/';
const products=[
 {key:'play',type:'MEDIA',name:'Foldrone Play',logo:'foldrone-play-wordmark.webp',desc:'Your media, understood.',status:'ready',cta:'Enter Play',href:'https://play.foldrone.com'},
 {key:'studio',type:'CREATION',name:'Foldrone Studio',logo:'foldrone-studio-wordmark.webp',desc:'A creative environment taking shape within the Foldrone ecosystem.',status:'coming',cta:'Coming into view'},
 {key:'workspace',type:'PRODUCTIVITY',name:'Foldrone Workspace',logo:'foldrone-workspace-logo.webp',desc:'Documents, PDF tools, productivity and intelligent utilities in one workspace.',status:'coming',cta:'Coming into view'}
];

function CosmicEnvironment(){
 const reduce=useReducedMotion();
 const {scrollYProgress}=useScroll();
 const y=useTransform(scrollYProgress,[0,1],[0,reduce?0:-120]);
 const rotate=useTransform(scrollYProgress,[0,1],[0,reduce?0:2]);
 const scale=useTransform(scrollYProgress,[0,1],[1,reduce?1:1.04]);
 const stars=useMemo(()=>Array.from({length:34},(_,i)=>({id:i,left:`${(i*29)%100}%`,top:`${(i*47)%100}%`,delay:`${(i%9)*.6}s`,duration:`${4+(i%6)}s`,size:1+(i%3)})),[]);
 return <div className="cosmos" aria-hidden="true">
   <div className="cosmos-photo"/>
   <motion.div className="cosmos-depth" style={{y,rotate,scale}}/>
   <div className="nebula nebula-a"/><div className="nebula nebula-b"/><div className="nebula nebula-c"/>
   <div className="starfield">{stars.map(s=><i key={s.id} style={{left:s.left,top:s.top,width:s.size,height:s.size,animationDelay:s.delay,animationDuration:s.duration}}/>)}</div>
   <div className="cosmic-vignette"/>
   <div className="cosmic-grid"/>
 </div>
}

function Header({open,setOpen}){
 const [productsOpen,setProductsOpen]=useState(false);
 useEffect(()=>{document.body.classList.toggle('menu-open',open); return()=>document.body.classList.remove('menu-open')},[open]);
 return <header className="header">
  <a className="brand" href="/" aria-label="Foldrone home"><img src={A+'foldrone-wordmark.webp'} alt="Foldrone"/></a>
  <button className={`menu-button ${open?'is-open':''}`} onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="site-menu" aria-label={open?'Close navigation':'Open navigation'}><span/><span/><span/></button>
  <aside id="site-menu" className={`menu-panel ${open?'open':''}`} aria-hidden={!open}>
   <div className="menu-head"><span>Navigation</span><span>01</span></div>
   <button className="menu-products" onClick={()=>setProductsOpen(v=>!v)} aria-expanded={productsOpen}><span>Products</span><b>{productsOpen?'−':'+'}</b></button>
   <div className={`menu-products-list ${productsOpen?'expanded':''}`}>
    {products.map(p=><a key={p.key} href={p.href||'#products'} onClick={()=>setOpen(false)}><span>{p.name}</span><small>{p.status==='ready'?'Ready':'Coming into view'}</small></a>)}
   </div>
   <a href="/about.html" onClick={()=>setOpen(false)}>About</a>
   <a href="/security.html" onClick={()=>setOpen(false)}>Security</a>
   <a href="/privacy.html" onClick={()=>setOpen(false)}>Privacy</a>
   <a href="/contact.html" onClick={()=>setOpen(false)}>Contact</a>
  </aside>
 </header>
}

function MagneticLink({children,...props}){
 const [p,setP]=useState({x:0,y:0}); const reduce=useReducedMotion();
 return <a {...props} className={`${props.className||''} magnetic`} onPointerMove={e=>{if(reduce)return;const r=e.currentTarget.getBoundingClientRect();setP({x:(e.clientX-r.left-r.width/2)*.12,y:(e.clientY-r.top-r.height/2)*.12})}} onPointerLeave={()=>setP({x:0,y:0})} style={{transform:`translate3d(${p.x}px,${p.y}px,0)`}}>{children}</a>
}

function Reveal({children,className=''}){const reduce=useReducedMotion(); return <motion.div className={className} initial={reduce?false:{opacity:0,y:42}} whileInView={reduce?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.8,ease:[.22,1,.36,1]}}>{children}</motion.div>}

function ProductCard({p,i}){const reduce=useReducedMotion(); return <motion.article className={`product-card ${p.key}`} initial={reduce?false:{opacity:0,y:45}} whileInView={reduce?undefined:{opacity:1,y:0}} whileHover={reduce?undefined:{y:-8}} viewport={{once:true,amount:.18}} transition={{duration:.7,delay:i*.08,ease:[.22,1,.36,1]}}>
 <div className="card-meta"><span>{p.type}</span><span>{p.status==='ready'?'READY':'IN DEVELOPMENT'}</span></div>
 <div className="logo-wrap"><img src={A+p.logo} alt={p.name}/></div>
 <p>{p.desc}</p>
 {p.href?<MagneticLink className="card-action" href={p.href}>{p.cta}<b>↗</b></MagneticLink>:<span className="card-action muted">{p.cta}<b>·</b></span>}
 </motion.article>}

function App(){
 useEffect(()=>{ if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(()=>{}); },[]);
 const [menu,setMenu]=useState(false); const [top,setTop]=useState(true); const reduce=useReducedMotion();
 const {scrollY}=useScroll(); const scrollSmooth=useSpring(scrollY,{stiffness:90,damping:24,mass:.5});
 useEffect(()=>{const fn=()=>setTop(window.scrollY<500); window.addEventListener('scroll',fn,{passive:true});fn();return()=>window.removeEventListener('scroll',fn)},[]);
 return <div id="top" className="universe">
  <CosmicEnvironment/><Header open={menu} setOpen={setMenu}/>
  <main id="main-content">
   <section className="hero" aria-labelledby="hero-title">
    <div className="hero-safe"><motion.div className="hero-copy" initial={reduce?false:{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[.22,1,.36,1],delay:.1}}>
      <p className="eyebrow">FOLDRONE</p><h1 id="hero-title"><span>Digital products.</span><em>One universe.</em></h1>
      <p className="lead">A growing ecosystem of focused digital experiences, brought together by Foldrone.</p>
      <MagneticLink className="explore" href="#products">Explore <span>→</span></MagneticLink>
    </motion.div></div>
   </section>
   <section className="statement"><Reveal className="statement-inner"><p className="eyebrow">THE UNIVERSE</p><h2>The universe is<br/><em>just getting started.</em></h2><p className="statement-body">New experiences can enter the ecosystem without changing what Foldrone stands for.</p></Reveal></section>
   <section className="ecosystem"><Reveal className="ecosystem-inner"><div className="ecosystem-title"><p className="eyebrow">ONE ECOSYSTEM</p><h2>Different worlds.<br/><em>One Foldrone.</em></h2></div><p className="ecosystem-body">Foldrone brings focused digital experiences together under one evolving ecosystem. Each product has its own purpose and identity, while sharing the same commitment to thoughtful technology.</p></Reveal></section>
   <section className="products" id="products" aria-labelledby="products-title"><Reveal className="products-head"><p className="eyebrow">THE EXPERIENCES</p><h2 id="products-title">Explore Foldrone.</h2></Reveal><div className="product-grid">{products.map((p,i)=><ProductCard p={p} i={i} key={p.key}/>)}</div></section>
   <section className="closing"><Reveal><p className="eyebrow">FOLDRONE</p><h2>More worlds.<br/><em>One universe.</em></h2></Reveal></section>
   <footer className="footer"><div className="footer-top"><img src={A+'foldrone-wordmark.webp'} alt="Foldrone" className="footer-logo"/><div className="footer-links"><div><strong>Explore</strong><a href="#products">Products</a><a href="/about.html">About</a></div><div><strong>Trust</strong><a href="/security.html">Security</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></div><div><strong>Connect</strong><a href="/contact.html">Contact</a></div></div></div><div className="footer-bottom"><span>© 2026 Foldrone. All rights reserved.</span><span>Digital products. One universe.</span></div></footer>
  </main>
  <motion.a href="#top" className="space-control" aria-label="Return to top" initial={false} animate={{opacity:top?.0:1,scale:top?.75:1,pointerEvents:top?'none':'auto'}} transition={{duration:.2}}><svg viewBox="0 0 32 32"><path d="M16 3c4 3 6 8 6 13v3l4 5-7-2-3 6-3-6-7 2 4-5v-3c0-5 2-10 6-13Z"/><circle cx="16" cy="11" r="2"/><path d="M11 26l-3 3M21 26l3 3"/></svg></motion.a>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
