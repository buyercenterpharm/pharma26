import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './intro.css';

const SESSION_KEY = 'pharma26.global-intro.v1';
const LOGO_START = 7;
const LOGO_REVEAL_DURATION = .9;
type Phase = 'preparing' | 'playing' | 'fallback' | 'exiting' | 'done';

export default function GlobalIntro() {
  const { pathname } = useLocation();
  const [phase, setPhase] = useState<Phase>(() => {
    try {
      return pathname === '/' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !sessionStorage.getItem(SESSION_KEY) ? 'preparing' : 'done';
    } catch { return 'done'; }
  });
  const [fallback, setFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const finishRef = useRef<() => void>(() => {});

  // Hand off the early HTML curtain only after React's dark stage is in the DOM.
  useLayoutEffect(() => {
    window.dispatchEvent(new Event('pharma26:intro-ready'));
    document.documentElement.removeAttribute('data-intro-boot');
    document.getElementById('intro-boot')?.remove();
  }, []);

  useEffect(() => {
    if (pathname !== '/') { setPhase('done'); return; }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    try {
      if (reduced.matches || sessionStorage.getItem(SESSION_KEY)) { setPhase('done'); return; }
    } catch { setPhase('done'); return; }
    const video = videoRef.current;
    if (!video) return;
    let disposed = false, shown = false, exiting = false, staticMode = false, logoReady = false;
    let frame = 0, videoFrame = 0;
    let prepareTimer: ReturnType<typeof setTimeout>;
    let finishTimer: ReturnType<typeof setTimeout>;
    let stallTimer: ReturnType<typeof setTimeout>;
    let safetyTimer: ReturnType<typeof setTimeout>;
    const markSeen = () => { try { sessionStorage.setItem(SESSION_KEY, 'seen'); } catch { /* optional storage */ } };
    const stopFrames = () => {
      cancelAnimationFrame(frame);
      if ('cancelVideoFrameCallback' in video) video.cancelVideoFrameCallback(videoFrame);
    };
    const clearTimers = () => { clearTimeout(prepareTimer); clearTimeout(finishTimer); clearTimeout(stallTimer); clearTimeout(safetyTimer); };
    const finish = () => {
      if (disposed) return;
      disposed = true; clearTimers(); stopFrames(); video.pause();
      video.removeAttribute('src'); video.load(); markSeen(); setPhase('done');
    };
    finishRef.current = finish;
    const exit = () => {
      if (disposed || exiting) return;
      exiting = true; clearTimers(); stopFrames(); video.pause(); setPhase('exiting');
      finishTimer = setTimeout(finish, 550);
    };
    const showFallback = () => {
      if (disposed || exiting || staticMode) return;
      clearTimers(); stopFrames(); video.pause();
      if (!logoReady) { finish(); return; }
      staticMode = true; shown = true; video.removeAttribute('src'); video.load();
      markSeen(); setFallback(true); setPhase('fallback');
      if (logoRef.current) { logoRef.current.style.opacity = '1'; logoRef.current.style.transform = 'scale(1)'; }
      finishTimer = setTimeout(exit, 1500);
    };
    // The actual decoded video time controls the logo, including after buffering or seeking.
    const syncLogo = (time: number) => {
      if (disposed || staticMode || !logoRef.current) return;
      const progress = Math.max(0, Math.min(1, (time - LOGO_START) / LOGO_REVEAL_DURATION));
      const eased = progress * progress * (3 - 2 * progress);
      logoRef.current.style.opacity = String(eased);
      logoRef.current.style.transform = `scale(${.96 + .04 * eased})`;
    };
    const trackFrame = () => {
      if (disposed || exiting || staticMode) return;
      if ('requestVideoFrameCallback' in video) {
        videoFrame = video.requestVideoFrameCallback((_now, metadata) => { syncLogo(metadata.mediaTime); trackFrame(); });
      } else {
        frame = requestAnimationFrame(() => { syncLogo(video.currentTime); trackFrame(); });
      }
    };
    const onPlaying = () => {
      if (disposed || exiting || staticMode) { video.pause(); return; }
      clearTimeout(stallTimer);
      if (!shown) {
        shown = true; clearTimeout(prepareTimer); markSeen(); setPhase('playing'); trackFrame();
        safetyTimer = setTimeout(showFallback, 16000);
      }
    };
    const onWaiting = () => {
      if (!disposed && shown && !staticMode && !exiting) { clearTimeout(stallTimer); stallTimer = setTimeout(showFallback, 2000); }
    };
    const onTime = () => syncLogo(video.currentTime);
    const onEnded = () => { syncLogo(video.duration); exit(); };
    const onVisibility = () => { if (document.hidden) finish(); };
    const onPreference = () => { if (reduced.matches) finish(); };
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener('change', onPreference);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('error', showFallback);
    video.addEventListener('ended', onEnded);
    video.addEventListener('timeupdate', onTime);
    prepareTimer = setTimeout(showFallback, 2500);
    const logo = new Image(); logo.src = '/logo.png';
    logo.decode().then(() => {
      if (disposed) return;
      logoReady = true;
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      if (connection?.saveData) { showFallback(); return; }
      video.muted = true; video.defaultMuted = true; video.playsInline = true;
      video.src = '/video/global-connections.mp4'; video.preload = 'auto';
      video.play().catch(showFallback);
    }).catch(finish);
    return () => {
      disposed = true; clearTimers(); stopFrames();
      video.removeEventListener('playing', onPlaying); video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('error', showFallback); video.removeEventListener('ended', onEnded); video.removeEventListener('timeupdate', onTime);
      video.pause(); video.removeAttribute('src'); video.load();
      document.removeEventListener('visibilitychange', onVisibility); reduced.removeEventListener('change', onPreference);
    };
  }, [pathname]);

  const visible = phase !== 'done' && pathname === '/';
  useLayoutEffect(() => {
    if (!visible) return;
    const site = document.getElementById('site-content');
    const before = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow, wasInert = site?.inert ?? false;
    if (site) site.inert = true;
    document.body.style.overflow = 'hidden'; skip.current?.focus({ preventScroll: true });
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); finishRef.current(); }
      if (event.key === 'Tab') { event.preventDefault(); skip.current?.focus(); }
    };
    window.addEventListener('keydown', keyboard);
    return () => {
      if (site) site.inert = wasInert;
      document.body.style.overflow = overflow; window.removeEventListener('keydown', keyboard);
      if (before && before !== document.body && before.isConnected) before.focus({ preventScroll: true });
      else (document.querySelector('.premium-logo') as HTMLElement | null)?.focus({ preventScroll: true });
    };
  }, [visible]);

  if (phase === 'done' || pathname !== '/') return null;
  return <div className={`global-intro video-intro ${visible ? 'intro-visible' : ''} ${phase === 'exiting' ? 'intro-exiting' : ''} ${fallback ? 'intro-fallback' : ''}`} data-phase={phase} role={visible ? 'dialog' : undefined} aria-modal={visible ? true : undefined} aria-label="PHARMA26 introduction" aria-hidden={!visible}>
    <div className="intro-film-frame">
      <video ref={videoRef} muted playsInline preload="none" disablePictureInPicture aria-hidden="true" tabIndex={-1} />
      <img ref={logoRef} className="intro-full-logo" src="/logo.png" alt="PHARMA26 LTD — Cosmetic Wholesale Trading" width="622" height="416" />
    </div>
    <div className="intro-bottom"><span>Global Connections · An illustrative brand film</span><button ref={skip} type="button" onClick={() => finishRef.current()} tabIndex={visible ? 0 : -1}>Skip Intro <ArrowUpRight size={16} aria-hidden="true" /></button></div>
  </div>;
}
