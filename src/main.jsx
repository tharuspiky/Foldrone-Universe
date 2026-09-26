import React, {useEffect, useRef, useState} from "react";
import {createRoot} from "react-dom/client";
import {motion, useScroll, useTransform, useReducedMotion} from "motion/react";
import "./styles.css";

const A="/assets/";
const products=[
 {key:"play",type:"MEDIA",name:"Foldrone Play",logo:"foldrone-play-wordmark.webp",desc:"Your media, understood.",status:"ready",cta:"Enter Play",href:"https://play.foldrone.com"},
 {key:"studio",type:"CREATION",name:"Foldrone Studio",logo:"foldrone-studio-wordmark.webp",desc:"A creative environment taking shape within the Foldrone ecosystem.",status:"coming",cta:"Coming into view"},
 {key:"workspace",type:"PRODUCTIVITY",name:"Foldrone Workspace",logo:"foldrone-workspace-logo.webp",desc:"Documents, PDF tools, productivity and intelligent utilities in one workspace.",status:"coming",cta:"Coming into view"}
];

function Header({open,setOpen}) {
 const [expanded,setExpanded]=useState(false);
 return <header className="header">
   <a className="brand" href="#top" aria-label="Foldrone home"><img src={A+"foldrone-wordmark.webp"} alt="Foldrone"/></a>
   <button className={"menu-button "+(open?"is-open":"")} onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?"Close menu":"Open menu"}><i/><i/><i/></button>
   <nav className={"menu-panel "+(open?"open":"")} aria-hidden={!open}>
     <button className="menu-products" onClick={()=>setExpanded(!expanded)} aria-expanded={expanded}><span>{expanded?"−":"+"}</span> Products</button>
     <div className={"menu-products-list "+(expanded?"expanded":"")}>
       {products.map(p=><a key={p.key} href={p.href||"#products"} onClick={()=>setOpen(false)}>{p.name}<small>{p.status==="ready"?"Ready":"Coming into view"}</small></a>)}
     </div>
     <a href="#about" onClick={()=>setOpen(false)}>About</a>
     <a href="#security" onClick={()=>setOpen(false)}>Security</a>
     <a href="#privacy" onClick={()=>setOpen(false)}>Privacy</a>
     <a href="#contact" onClick={()=>setOpen(false)}>Contact</a>
   </nav>
 </header>
}

function ProductCard({p,i}) {
 const reduced=useReducedMotion();
 return <motion.article className={"product-card "+p.key}
   initial={reduced?false:{opacity:0,y:42}}
   whileInView={reduced?undefined:{opacity:1,y:0}}
   viewport={{once:true,amount:.24}}
   transition={{duration:.7,delay:i*.08,ease:[.22,1,.36,1]}}>
   <div className="card-meta"><span>{p.type}</span><span>{p.status==="ready"?"READY":"IN DEVELOPMENT"}</span></div>
   <div className="logo-wrap"><img src={A+p.logo} alt={p.name}/></div>
   <p>{p.desc}</p>
   {p.href?<a className="card-action" href={p.href}>{p.cta}<b>↗</b></a>:<span className="card-action muted">{p.cta}</span>}
 </motion.article>
}

function App(){
 const [menu,setMenu]=useState(false);
 const [atBottom,setAtBottom]=useState(false);
 const reduced=useReducedMotion();
 const heroRef=useRef(null);
 const {scrollYProgress}=useScroll();
 const heroY=useTransform(scrollYProgress,[0,.25],[0,reduced?0:-90]);
 const heroScale=useTransform(scrollYProgress,[0,.25],[1,reduced?1:1.045]);
 useEffect(()=>{
   const onScroll=()=>setAtBottom(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-140);
   onScroll(); window.addEventListener("scroll",onScroll,{passive:true}); return()=>window.removeEventListener("scroll",onScroll);
 },[]);
 return <div id="top" className="universe">
   <div className="universe-art" aria-hidden="true"/>
   <div className="grain" aria-hidden="true"/>
   <Header open={menu} setOpen={setMenu}/>
   <main>
    <section ref={heroRef} className="hero">
      <motion.div className="hero-art-depth" style={{y:heroY,scale:heroScale}} aria-hidden="true"/>
      <motion.div className="hero-copy" initial={reduced?false:{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:.9,ease:[.22,1,.36,1],delay:.12}}>
        <p className="eyebrow">FOLDRONE</p>
        <h1>Digital products.<br/><em>One universe.</em></h1>
        <p className="lead">A growing ecosystem of focused digital experiences, brought together by Foldrone.</p>
        <a className="explore" href="#products">Explore <span>→</span></a>
      </motion.div>
    </section>

    <section className="statement">
      <motion.div className="statement-inner" initial={reduced?false:{opacity:0,y:34}} whileInView={reduced?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.35}}>
        <p className="eyebrow">THE UNIVERSE</p>
        <h2>The universe is<br/><em>just getting started.</em></h2>
        <p className="statement-body">New experiences can enter the ecosystem without changing what Foldrone stands for.</p>
      </motion.div>
    </section>

    <section className="ecosystem">
      <div className="ecosystem-inner">
        <div className="ecosystem-title">
          <p className="eyebrow">ONE ECOSYSTEM</p>
          <h2>Different worlds.<br/><em>One Foldrone.</em></h2>
        </div>
        <p className="ecosystem-body">Foldrone brings focused digital experiences together under one evolving ecosystem. Each product has its own purpose and identity, while sharing the same commitment to thoughtful technology.</p>
      </div>
    </section>

    <section className="products" id="products">
      <div className="products-head"><p className="eyebrow">THE EXPERIENCES</p><h2>Explore Foldrone.</h2></div>
      <div className="product-grid">{products.map((p,i)=><ProductCard key={p.key} p={p} i={i}/>)}</div>
    </section>

    <section className="closing">
      <motion.div initial={reduced?false:{opacity:0,y:30}} whileInView={reduced?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.4}}>
        <p className="eyebrow">FOLDRONE</p>
        <h2>More worlds.<br/><em>One universe.</em></h2>
      </motion.div>
    </section>

    <footer className="footer" id="contact">
      <div className="footer-top">
        <img src={A+"foldrone-wordmark.webp"} alt="Foldrone" className="footer-logo"/>
        <div className="footer-links">
          <div><strong>Explore</strong><a href="#products">Products</a><a href="#about">About</a></div>
          <div><strong>Information</strong><a href="#security">Security</a><a href="#privacy">Privacy</a><a href="#contact">Contact</a></div>
        </div>
      </div>
      <div className="footer-company" id="about"><span>Foldrone</span> is the home of a growing family of digital experiences.</div>
      <div className="footer-company" id="security"><span>Security</span> and privacy are considered throughout the design and operation of Foldrone products.</div>
      <div className="footer-company" id="privacy"><span>Privacy</span> remains a core principle of the Foldrone experience.</div>
      <div className="footer-bottom">© 2026 Foldrone. All rights reserved.</div>
    </footer>
   </main>
   <motion.button className="space-control" initial={{opacity:0,scale:.7}} animate={{opacity:atBottom?1:0,scale:atBottom?1:.7,pointerEvents:atBottom?"auto":"none"}} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Return to top" title="Return to top">
    <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3c4 3 6 8 6 13v3l4 5-7-2-3 6-3-6-7 2 4-5v-3c0-5 2-10 6-13Z"/><circle cx="16" cy="11" r="2"/><path d="M11 26l-3 3M21 26l3 3"/></svg>
   </motion.button>
 </div>
}
createRoot(document.getElementById("root")).render(<App/>);
