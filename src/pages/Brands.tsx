import { useSearchParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Search, ArrowUpRight, X } from 'lucide-react';
import BrandMark from '../components/BrandMark';
import { brands, brandCategories, brandDisclaimer, categoryCount, categoryLabel, findBrands } from '../data/brands';
import './brands.css';

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
  return <div className="brands-page">
    <section className="brands-hero">
      <div className="brands-container brands-hero-layout">
        <motion.div initial={reduced ? false : {opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.65}}>
          <p className="catalogue-eyebrow"><span /> THE PHARMA26 TRADING CATALOGUE</p>
          <h1>Our Brands<span>Beauty. Care. Possibility.</span></h1>
          <p className="brands-introduction">An international perspective on beauty and healthcare. Explore the brands in our B2B trading catalogue, from dermocosmetics and prestige beauty to professional haircare and pharmacy.</p>
          <p className="brands-independent">Independent sourcing. A conversation built around your business.</p>
        </motion.div>
        <aside className="catalogue-folio" aria-label="Catalogue overview">
          <span className="folio-label">THE BRAND DIRECTORY</span>
          <div className="folio-count">{brands.length}<span>distinct brands</span></div>
          <div className="folio-foot"><span>0{brandCategories.length} categories</span><span>One trading conversation.</span></div>
        </aside>
      </div>
    </section>
    <section className="brand-directory brands-container" aria-labelledby="directory-heading">
      <div className="directory-heading"><div><p className="catalogue-eyebrow">EXPLORE THE CATALOGUE</p><h2 id="directory-heading">Find your next conversation.</h2></div><p>Browse by category or search a brand.</p></div>
      <div className="directory-controls">
        <div className="brand-search"><Search size={18} aria-hidden="true"/><label htmlFor="brand-search" className="sr-only">Search brands</label><input id="brand-search" type="search" value={query} maxLength={120} placeholder="Search a brand…" autoComplete="off" onChange={event => update('q',event.target.value)} aria-controls="brand-results" />{query && <button type="button" aria-label="Clear search" onClick={() => update('q','')}><X size={16}/></button>}</div>
        <div className="brand-filters" role="group" aria-label="Brand categories">
          <button type="button" aria-pressed={category === 'all'} onClick={() => update('category','all')}>All brands <span>{brands.length}</span></button>
          {brandCategories.map(item => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => update('category',item.id)}>{item.label} <span>{categoryCount(item.id)}</span></button>)}
        </div>
      </div>
      <div className="directory-status"><p role="status" aria-live="polite" aria-atomic="true">{results.length} {results.length === 1 ? 'brand' : 'brands'}{category !== 'all' ? ` · ${categoryLabel(category as Parameters<typeof categoryLabel>[0])}` : ' · All categories'}{query ? ` matching “${query}”` : ''}</p><span>ALPHABETICAL DIRECTORY</span></div>
      <div id="brand-results">
        {results.length > 0 ? <ul className="brand-grid">{results.map(brand => <li key={brand.id} data-brand-id={brand.id}><article className="brand-card"><h3><BrandMark brand={brand}/></h3><p>{brand.categories.map(categoryLabel).join(' · ')}</p></article></li>)}</ul> : <div className="brand-empty"><Search size={30} aria-hidden="true"/><h3>No brands match your search.</h3><p>Try another name or explore the full catalogue.</p><button type="button" onClick={() => setParams({},{replace:true})}>Reset all filters <ArrowUpRight size={16}/></button></div>}
      </div>
      <p className="brand-disclaimer">{brandDisclaimer}</p>
    </section>
    <section className="brands-contact"><div className="brands-container brands-contact-inner"><div><p className="catalogue-eyebrow">LET’S TALK SOURCING</p><h2>Looking for a<br/><em>specific brand?</em></h2><p>Tell us what you are looking for. Our trading team can discuss your sourcing requirements and current availability.</p></div><Link to="/contact">Contact our trading team <ArrowUpRight size={20}/></Link></div></section>
  </div>;
}
