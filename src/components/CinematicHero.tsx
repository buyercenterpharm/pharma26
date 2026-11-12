import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

export default function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const [desktop, setDesktop] = useState(false);
  const [paused, setPaused] = useState(false);
  const visible = useInView(ref);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)');
    const update = () => setDesktop(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const active = desktop && !reduced && !paused && visible;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 45, damping: 22 });
  const rotateX = useSpring(pointerY, { stiffness: 45, damping: 22 });
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  return <section ref={ref} className="cinema-hero" aria-labelledby="hero-title">
    <div className="hero-topline"><span>BEAUTY. BUSINESS. BEYOND.</span><span>INTERNATIONAL B2B TRADING</span></div>
    <div className="hero-composition">
      <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
        <p className="hero-eyebrow"><span /> A WORLD OF POSSIBILITY</p>
        <h1 id="hero-title">The business<br />of beauty.<br /><em>Beautifully connected.</em></h1>
        <p className="hero-description">International trading and wholesale distribution of cosmetics, skincare and beauty products. Connecting your business to what comes next.</p>
        <div className="hero-actions"><Link to="/products" className="hero-button">Explore Our Expertise <ArrowUpRight size={17} /></Link><Link to="/contact" className="hero-text-link">Request a Quote <ArrowUpRight size={16} /></Link></div>
      </motion.div>
      <figure className="cosmetic-study">
        <div className="study-frame" onPointerMove={event => {
          if (!active || event.pointerType !== 'mouse') return;
          const rect = event.currentTarget.getBoundingClientRect();
          pointerX.set(((event.clientX - rect.left) / rect.width - .5) * 3);
          pointerY.set(-((event.clientY - rect.top) / rect.height - .5) * 3);
        }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
          <motion.div className="study-reveal" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: .15, ease: [.22, 1, .36, 1] }}>
            <motion.div className="study-camera" style={{ y: active ? y : 0, scale: active ? scale : 1, rotateX: active ? rotateX : 0, rotateY: active ? rotateY : 0 }}>
              <div className={`study-drift ${active ? 'is-active' : ''}`}>
                <img src="/images/cosmetic-study-1120.webp" srcSet="/images/cosmetic-study-640.webp 640w, /images/cosmetic-study-1120.webp 1120w" sizes="(max-width: 899px) 90vw, 46vw" width="1120" height="1400" fetchPriority="high" alt="Illustrative unbranded glass skincare bottles and cream jar with champagne metallic caps on pale stone." />
              </div>
            </motion.div>
          </motion.div>
          <span className="study-number" aria-hidden="true">THE BEAUTY PERSPECTIVE / 01</span>
          {desktop && !reduced && <button className="study-motion-control" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Resume motion' : 'Pause motion'}</button>}
        </div>
        <figcaption>Illustrative packaging study. Not PHARMA26 products or inventory.</figcaption>
      </figure>
    </div>
    <div className="hero-baseline"><a href="#company-introduction"><ArrowDown size={15} /> DISCOVER PHARMA26</a><span>COSMETICS <i /> SKINCARE <i /> BEAUTY</span><span className="baseline-note">Built on connection.</span></div>
  </section>;
}
