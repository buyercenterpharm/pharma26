import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring, useInView, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

const products = [
  { name: 'serum', depth: 1, delay: .15 },
  { name: 'lotion', depth: .55, delay: .45 },
  { name: 'jar', depth: 1.6, delay: .75 },
];

function ProductLayer({ name, depth, delay, x, y, scroll, active }: {
  name: string; depth: number; delay: number; x: MotionValue<number>; y: MotionValue<number>;
  scroll: MotionValue<number>; active: boolean;
}) {
  const offsetX = useTransform(x, value => value * depth * 5);
  const offsetY = useTransform(y, value => value * depth * 4);
  const scrollY = useTransform(scroll, [0, 1], [0, -55 * depth]);
  return <motion.div className={`film-product film-${name}`} style={{ x: active ? offsetX : 0, y: active ? scrollY : 0 }}>
    <div className="product-arrival" style={{ animationDelay: `${delay}s` }}>
      <motion.div style={{ y: active ? offsetY : 0 }}>
        <div className="product-float"><img src={`/images/hero-${name}.webp`} alt="" width={name === 'jar' ? 800 : 667} height={name === 'jar' ? 731 : 1000} fetchPriority="high" draggable={false} /></div>
      </motion.div>
    </div>
  </motion.div>;
}

export default function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const [desktop, setDesktop] = useState(false);
  const [paused, setPaused] = useState(false);
  const visible = useInView(ref);
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const update = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)');
    const update = () => setDesktop(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const active = desktop && !reduced && !paused && visible && tabVisible;
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
        <h1 id="hero-title"><span className="headline-mask"><span>The business</span></span><span className="headline-mask"><span>of beauty.</span></span><em className="headline-mask"><span>Beautifully connected.</span></em></h1>
        <p className="hero-description">International trading and wholesale distribution of cosmetics, skincare and beauty products. Connecting your business to what comes next.</p>
        <div className="hero-actions"><Link to="/products" className="hero-button">Explore Our Expertise <ArrowUpRight size={17} /></Link><Link to="/contact" className="hero-text-link">Request a Quote <ArrowUpRight size={16} /></Link></div>
      </motion.div>
      <figure className="cosmetic-study film-study" data-running={active} data-paused={paused}>
        <div className="study-frame film-frame" onPointerMove={event => {
          if (!active || event.pointerType !== 'mouse') return;
          const rect = event.currentTarget.getBoundingClientRect();
          pointerX.set(((event.clientX - rect.left) / rect.width - .5) * 3);
          pointerY.set(-((event.clientY - rect.top) / rect.height - .5) * 3);
        }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
          <div className="film-atmosphere" aria-hidden="true"><div className="film-halo" /><div className="film-horizon" /><div className="film-shadow shadow-serum" /><div className="film-shadow shadow-lotion" /><div className="film-shadow shadow-jar" /></div>
          <motion.div className="film-camera" aria-hidden="true" style={{ y: active ? y : 0, scale: active ? scale : 1, rotateX: active ? rotateX : 0, rotateY: active ? rotateY : 0 }}>
            {products.map(product => <div key={product.name}><ProductLayer {...product} x={rotateY} y={rotateX} scroll={scrollYProgress} active={active} /></div>)}
          </motion.div>
          <div className="film-light" aria-hidden="true" />
          <span className="study-number" aria-hidden="true">FORM IN MOTION / 01</span>
          {desktop && !reduced && <button className="study-motion-control" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Resume motion' : 'Pause motion'}</button>}
        </div>
        <figcaption>Unbranded cosmetic packaging, shown for illustration. Not PHARMA26 products or inventory.</figcaption>
      </figure>
    </div>
    <div className="hero-baseline"><a href="#company-introduction"><ArrowDown size={15} /> DISCOVER PHARMA26</a><span>COSMETICS <i /> SKINCARE <i /> BEAUTY</span><span className="baseline-note">Built on connection.</span></div>
  </section>;
}
