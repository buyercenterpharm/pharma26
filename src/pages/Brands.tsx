import { useSearchParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Search, ArrowUpRight, X } from 'lucide-react';
import BrandMark from '../components/BrandMark';
import { brands, brandCategories, brandDisclaimer, categoryCount, categoryLabel, findBrands, type BrandCategory } from '../data/brands';
import './brands.css';

const categoryVisuals: Record<BrandCategory, { image: string; detail: string }> = {
  dermocosmetics: { image: '/images/category-dermocosmetics.webp', detail: 'Clinical skincare and daily care.' },
  cosmetics: { image: '/images/category-cosmetics.webp', detail: 'Prestige and professional beauty.' },
  perfumes: { image: '/images/category-perfumes.webp', detail: 'International fragrance houses.' },
  'professional-haircare': { image: '/images/category-haircare.webp', detail: 'Salon and specialist haircare.' },
  pharmacy: { image: '/images/category-pharmacy.webp', detail: 'Healthcare and pharmacy lines.' },
  'other-brands': { image: '/images/category-other.webp', detail: 'Personal care and specialist essentials.' },
};

export default function Brands() {
  const [params, setParams] = useSearchParams();
  const query = (params.get('q') ?? '').slice(0,120);
  const requestedCategory = params.get('category') ?? 'all';
  const category = brandCategories.some(item => item.id === requestedCategory) ? requestedCategory : 'all';
  const results = findBrands(category, query);
  const reduced = useReducedMotion();
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all') next.delete(key); else next.set(key, value);
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const selectCategory = (id: BrandCategory) => {
    const next = new URLSearchParams(params);
    next.set('category', id);
    next.delete('q');
    setParams(next, { replace: true, preventScrollReset: true });
    requestAnimationFrame(() => document.getElementById('brand-directory')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }));
  };
  return <div className="brands-page">
    <section className="brands-hero">
      <div className="brands-container brands-hero-layout">
        <motion.div initial={reduced ? false : {opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.65}}>
          <p className="catalogue-eyebrow"><span /> THE PHARMA26 TRADING CATALOGUE</p>
          <h1>Brands &amp; Products<span>Beauty. Care. Possibility.</span></h1>
          <p className="brands-introduction">Explore an international B2B portfolio spanning dermocosmetics, beauty, fragrance, professional haircare and healthcare brands—sourced according to market conditions and buyer requirements.</p>
          <p className="brands-independent">Independent sourcing. Built around professional buying requirements.</p>
        </motion.div>
      </div>
    </section>

    <section className="product-category-gallery" aria-labelledby="product-category-heading">
      <div className="brands-container">
        <div className="category-gallery-heading">
          <div><p className="catalogue-eyebrow"><span /> PRODUCT CATEGORIES</p><h2 id="product-category-heading">Explore the portfolio.</h2></div>
          <p>Select a category to view the corresponding brands.</p>
        </div>
        <div className="product-category-grid">
          {brandCategories.map((item, index) => <motion.button key={item.id} type="button" data-category={item.id} onClick={() => selectCategory(item.id)} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, delay: reduced ? 0 : index * .055 }}>
            <img src={categoryVisuals[item.id].image} alt="" width="1200" height="800" loading="lazy" decoding="async" />
            <span className="category-card-shade" aria-hidden="true" />
            <span className="category-card-number">0{index + 1}</span>
            <span className="category-card-copy"><strong>{item.label}</strong><small>{categoryVisuals[item.id].detail}</small><span>View brands <ArrowUpRight size={16} aria-hidden="true" /></span></span>
          </motion.button>)}
        </div>
        <p className="category-image-note">Illustrative category imagery. Brand availability remains subject to sourcing and market conditions.</p>
      </div>
    </section>

    <section id="brand-directory" className="brand-directory brands-container" aria-labelledby="directory-heading">
      <div className="directory-heading"><div><p className="catalogue-eyebrow">EXPLORE THE CATALOGUE</p><h2 id="directory-heading">Find your next conversation.</h2></div><p>Browse by category or search a brand.</p></div>
      <div className="directory-controls">
        <div className="brand-search"><Search size={18} aria-hidden="true"/><label htmlFor="brand-search" className="sr-only">Search brands</label><input id="brand-search" type="search" value={query} maxLength={120} placeholder="Search a brand…" autoComplete="off" onChange={event => update('q',event.target.value)} aria-controls="brand-results" />{query && <button type="button" aria-label="Clear search" onClick={() => update('q','')}><X size={16}/></button>}</div>
        <div className="brand-filters" role="group" aria-label="Brand categories">
          <button type="button" aria-pressed={category === 'all'} onClick={() => update('category','all')}>All brands <span>{brands.length}</span></button>
          {brandCategories.map(item => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => update('category',item.id)}>{item.label} <span>{categoryCount(item.id)}</span></button>)}
        </div>
      </div>
      <div className="directory-status"><p role="status" aria-live="polite" aria-atomic="true">{results.length} {results.length === 1 ? 'brand' : 'brands'}{category !== 'all' ? ` · ${categoryLabel(category as Parameters<typeof categoryLabel>[0])}` : ' · All categories'}{query ? ` matching “${query}”` : ''}</p><span>ALPHABETICAL DIRECTORY</span></div>
      <motion.div id="brand-results" key={`${category}:${query}`} initial={reduced ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }}>
        {results.length > 0 ? <ul className="brand-grid">{results.map(brand => <li key={brand.id} data-brand-id={brand.id}><article className="brand-card"><h3><BrandMark brand={brand}/></h3><p>{brand.categories.map(categoryLabel).join(' · ')}</p></article></li>)}</ul> : <div className="brand-empty"><Search size={30} aria-hidden="true"/><h3>No brands match your search.</h3><p>Try another name or explore the full catalogue.</p><button type="button" onClick={() => setParams({},{replace:true})}>Reset all filters <ArrowUpRight size={16}/></button></div>}
      </motion.div>
      <p className="brand-disclaimer">{brandDisclaimer}</p>
    </section>
    <section className="brands-contact"><div className="brands-container brands-contact-inner"><div><p className="catalogue-eyebrow">LET’S TALK SOURCING</p><h2>Looking for a<br/><em>specific brand?</em></h2><p>Tell us what you are looking for. Our trading team can discuss your sourcing requirements and current availability.</p></div><Link to="/contact">Request a Quote <ArrowUpRight size={20}/></Link></div></section>
  </div>;
}
