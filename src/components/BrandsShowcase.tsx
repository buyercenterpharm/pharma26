import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import BrandMark from './BrandMark';
import { brands, showcasedBrands, brandDisclaimer } from '../data/brands';
import '../pages/brands.css';

export default function BrandsShowcase() {
  const reduced = useReducedMotion();
  return <section className="brands-showcase" aria-labelledby="brands-showcase-heading"><div className="brands-container">
    <motion.div className="showcase-heading" initial={reduced ? false : {opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:.6}}>
      <div><p className="catalogue-eyebrow">A WORLD OF BEAUTY & CARE</p><h2 id="brands-showcase-heading">Brands We Source</h2><p>A selection from our trading catalogue. Independent sourcing for international B2B enquiries.</p></div>
      <Link to="/brands">Explore all {brands.length} brands <ArrowUpRight size={18}/></Link>
    </motion.div>
    <ul className="showcase-grid">{showcasedBrands.map(brand => <li key={brand.id}><BrandMark brand={brand}/></li>)}</ul>
    <p className="brand-disclaimer">{brandDisclaimer}</p>
  </div></section>;
}
