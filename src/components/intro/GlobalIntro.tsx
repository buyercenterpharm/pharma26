import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './intro.css';

const SESSION_KEY='pharma26.global-intro.v1';
// No query-string bypass or production replay flag: session behavior is consistent.
export default function GlobalIntro() {
  const { pathname }=useLocation();
  const [phase,setPhase]=useState<'preparing'|'playing'|'done'>('preparing');
  const [compact,setCompact]=useState(false);
  const host=useRef<HTMLDivElement>(null);
  const skip=useRef<HTMLButtonElement>(null);
  const finishRef=useRef<()=>void>(()=>{});
  useEffect(()=>{
    if(pathname!=='/'){setPhase('done');return;}
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    try { if(media.matches || sessionStorage.getItem(SESSION_KEY)){setPhase('done');return;} }
    catch {setPhase('done');return;} // Restricted storage must never cause repeated interruptions.
    const nav=navigator as Navigator & {deviceMemory?:number;connection?:{saveData?:boolean}};
    if(nav.connection?.saveData){setPhase('done');return;}
    const mobile=window.matchMedia('(max-width: 767px)').matches || (nav.deviceMemory!==undefined && nav.deviceMemory<=2) || navigator.hardwareConcurrency<=2;
    setCompact(mobile);setPhase('preparing');
    const abort=new AbortController();
    let ended=false,playing=false,cleanupScene=()=>{};
    let endTimer:ReturnType<typeof setTimeout>;
    const mark=()=>{try{sessionStorage.setItem(SESSION_KEY,'seen');}catch{/* No storage dependency for dismissal. */}};
    const finish=()=>{if(ended)return;ended=true;mark();clearTimeout(endTimer);clearTimeout(loadTimer);abort.abort();cleanupScene();setPhase('done');};
    finishRef.current=finish;
    // While preparation happens, the homepage remains fully interactive. User intent cancels the intro.
    const interaction=()=>{if(!playing)finish();};
    const visibility=()=>{if(document.hidden)finish();};
    const preference=()=>{if(media.matches)finish();};
    window.addEventListener('pointerdown',interaction);window.addEventListener('keydown',interaction);window.addEventListener('wheel',interaction,{passive:true});
    document.addEventListener('visibilitychange',visibility);media.addEventListener('change',preference);
    const loadTimer=setTimeout(finish,1800);
    const start=()=>{if(ended)return;clearTimeout(loadTimer);playing=true;mark();setPhase('playing');endTimer=setTimeout(finish,mobile?1800:6000);};
    const loadLogo=(src:string)=>{const image=new Image();image.src=src;return image.decode();};
    Promise.all([loadLogo('/favicon.png'),loadLogo('/logo.png')]).then(async()=>{
      if(ended)return;
      if(mobile){start();return;}
      const {createGlobeScene}=await import('./globeScene');
      if(ended||!host.current)return;
      const scene=await createGlobeScene(host.current,abort.signal,finish);
      cleanupScene=scene.dispose;
      if(ended){scene.dispose();return;}
      start();scene.start();
    }).catch(finish);
    return ()=>{
      ended=true;clearTimeout(loadTimer);clearTimeout(endTimer);abort.abort();cleanupScene();
      window.removeEventListener('pointerdown',interaction);window.removeEventListener('keydown',interaction);window.removeEventListener('wheel',interaction);
      document.removeEventListener('visibilitychange',visibility);media.removeEventListener('change',preference);
    };
  },[pathname]);
  useEffect(()=>{
    if(phase!=='playing')return;
    const site=document.getElementById('site-content');
    const focusBefore=document.activeElement as HTMLElement|null;
    const overflow=document.body.style.overflow;
    const wasInert=site?.inert??false;
    if(site)site.inert=true;
    document.body.style.overflow='hidden';skip.current?.focus({preventScroll:true});
    const keyboard=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();finishRef.current();}
      if(event.key==='Tab'){event.preventDefault();skip.current?.focus();}
    };
    window.addEventListener('keydown',keyboard);
    return ()=>{
      if(site)site.inert=wasInert;document.body.style.overflow=overflow;
      window.removeEventListener('keydown',keyboard);
      if(focusBefore && focusBefore!==document.body && focusBefore.isConnected)focusBefore.focus({preventScroll:true});
      else (document.querySelector('.premium-logo') as HTMLElement|null)?.focus({preventScroll:true});
    };
  },[phase]);
  if(phase==='done'||pathname!=='/')return null;
  return <div className={`global-intro ${phase==='playing'?'intro-playing':''} ${compact?'intro-compact':''}`} role={phase==='playing'?'dialog':undefined} aria-modal={phase==='playing'?true:undefined} aria-label="PHARMA26 introduction" aria-hidden={phase!=='playing'}>
    <div className="intro-canvas" ref={host} aria-hidden="true" />
    <div className="intro-vignette" aria-hidden="true" />
    <div className="intro-top"><span>PHARMA26 LTD</span><span>INTERNATIONAL BEAUTY TRADE</span></div>
    <div className="intro-editorial" aria-hidden="true"><p>GLOBAL CONNECTIONS</p><h2>A world of possibility.</h2><span>Beauty. Business. Beyond.</span></div>
    <div className="intro-brand" aria-hidden="true"><div className="intro-ivory" /><div className="intro-monogram"><img src="/favicon.png" alt="" /></div><img className="intro-full-logo" src="/logo.png" alt="" /></div>
    <div className="intro-bottom"><span>Symbolic connections · Not a service coverage map</span><button ref={skip} type="button" onClick={()=>finishRef.current()} tabIndex={phase==='playing'?0:-1}>Skip Intro <span aria-hidden="true">↗</span></button></div>
  </div>;
}
