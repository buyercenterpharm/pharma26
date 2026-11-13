import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const links = [{name:'Home',path:'/'},{name:'About Us',path:'/about'},{name:'Brands & Products',path:'/brands'},{name:'How It Works',path:'/how-it-works'}];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } };
    const media = window.matchMedia('(min-width: 900px)');
    const resize = () => { if (media.matches) setOpen(false); };
    window.addEventListener('keydown', close); media.addEventListener('change', resize);
    return () => { window.removeEventListener('keydown', close); media.removeEventListener('change', resize); };
  }, [open]);
  return <header className="premium-header"><nav aria-label="Main navigation" className="premium-nav">
    <Link to="/" className="premium-logo" aria-label="PHARMA26 LTD home"><img src="/logo.png" alt="PHARMA26 LTD" /></Link>
    <div className="desktop-links">{links.map(link => <Link key={link.path} to={link.path} aria-current={location.pathname === link.path ? 'page' : undefined}>{link.name}</Link>)}</div>
    <Link to="/contact" className="nav-contact">Let’s Talk <ArrowUpRight size={16} /></Link>
    <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <AnimatePresence>{open && <motion.div id="mobile-navigation" className="mobile-links" initial={reduced ? false : {opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced ? 0 : .2}}>{[...links,{name:'Contact',path:'/contact'}].map((link,i) => <Link key={link.path} to={link.path} onClick={()=>setOpen(false)} aria-current={location.pathname === link.path ? 'page' : undefined}><span>0{i+1}</span>{link.name}<ArrowUpRight size={18}/></Link>)}</motion.div>}</AnimatePresence>
  </nav></header>;
}
