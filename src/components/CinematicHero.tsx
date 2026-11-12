import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export default function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 95]);
  return <section ref={ref} className="cinema-hero" aria-labelledby="hero-title">
    <div className="hero-topline"><span>BEAUTY. BUSINESS. BEYOND.</span><span>INTERNATIONAL B2B TRADING</span></div>
    <div className="hero-composition">
      <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
        <p className="hero-eyebrow"><span /> A WORLD OF POSSIBILITY</p>
        <h1 id="hero-title">The business<br />of beauty.<br /><em>Beautifully connected.</em></h1>
        <p className="hero-description">International trading and wholesale distribution of cosmetics, skincare and beauty products. Connecting your business to what comes next.</p>
        <div className="hero-actions"><Link to="/products" className="hero-button">Explore Our Expertise <ArrowUpRight size={17} /></Link><Link to="/contact" className="hero-text-link">Request a Quote <ArrowUpRight size={16} /></Link></div>
      </motion.div>
      <motion.div className="hero-art" aria-hidden="true" initial={reduced ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6 }}>
        <motion.div className="art-scene" style={{ y: reduced ? 0 : y }}>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="art-halo" /><div className="art-plinth" />
          <div className="glass-bottle bottle-back"><div className="bottle-cap" /><div className="bottle-inscription">BEAUTY<br /><span>IN PERSPECTIVE</span></div></div>
          <div className="glass-bottle bottle-front"><div className="bottle-cap" /><div className="bottle-inscription">26<span>THE BEAUTY OF CONNECTION</span></div></div>
          <div className="glass-sphere" /><div className="art-caption"><span>01 / BEAUTY IN PERSPECTIVE</span><span>FORM. LIGHT. POSSIBILITY.</span></div>
        </motion.div>
      </motion.div>
    </div>
    <div className="hero-baseline"><a href="#company-introduction"><ArrowDown size={15} /> DISCOVER PHARMA26</a><span>COSMETICS <i /> SKINCARE <i /> BEAUTY</span><span className="baseline-note">Built on connection.</span></div>
  </section>;
}
