import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Network, Search, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './home-operations.css';

const operationalFlow = [
  {
    number: '01',
    place: 'CYPRUS',
    title: 'Headquarters',
    description: 'Corporate base and trading coordination.',
    photo: '/images/trade-cyprus-architecture.webp',
    alt: "Illustrative corporate architecture photograph; not PHARMA26's Cyprus headquarters.",
  },
  {
    number: '02',
    place: 'BELGIUM',
    title: 'Warehousing & Logistics',
    description: 'Merchandise stored through a trusted third-party logistics provider.',
    photo: '/images/trade-belgium-warehouse.webp',
    alt: 'Illustrative professional warehouse photograph; not the Belgium third-party facility used by PHARMA26.',
    featured: true,
  },
  {
    number: '03',
    place: 'INTERNATIONAL',
    title: 'B2B Distribution',
    description: 'Sourcing and logistics coordination for professional buyers.',
    photo: '/images/trade-international-logistics.webp',
    alt: 'Illustrative international container logistics photograph; not a PHARMA26 operation.',
  },
];

const capabilities = [
  { title: 'Global Sourcing', detail: 'Cross-market brand sourcing.', icon: Search },
  { title: 'B2B Focus', detail: 'Built for wholesale conversations.', icon: Network },
  { title: 'Operational Clarity', detail: 'Clear coordination at each stage.', icon: ShieldCheck },
];

export default function TradeInfrastructure() {
  const reduced = useReducedMotion();
  return (
    <section id="company-introduction" className="trade-foundation" aria-labelledby="trade-foundation-heading">
      <div className="trade-foundation-container">
        <motion.header initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .65 }} className="trade-foundation-heading">
          <div>
            <p className="trade-kicker"><span /> BUILT FOR INTERNATIONAL B2B TRADE</p>
            <h2 id="trade-foundation-heading">Strategic sourcing.<br /><em>European warehousing.</em><br />B2B distribution.</h2>
          </div>
          <div className="trade-intro">
            <p>Headquartered in Cyprus, PHARMA26 LTD operates with Belgium-based warehousing through a trusted third-party logistics provider.</p>
            <Link to="/how-it-works">Explore our process <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </motion.header>

        <ol className="trade-flow" aria-label="PHARMA26 operating model">
          {operationalFlow.map((item, index) => {
            return <motion.li key={item.place} className={item.featured ? 'trade-flow-card trade-flow-featured' : 'trade-flow-card'} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .55, delay: reduced ? 0 : index * .09 }}>
              <img className="trade-card-photo" src={item.photo} alt={item.alt} width="1800" height="1200" loading="lazy" decoding="async" />
              <div className="trade-card-shade" aria-hidden="true" />
              <div className="trade-card-top"><span>{item.number}</span><span>ILLUSTRATIVE</span></div>
              <div className="trade-card-content">
                <p>{item.place}</p>
                <h3>{item.title}</h3>
                <span className="trade-card-detail">{item.description}</span>
                {item.featured && <small>External 3PL facility — not owned or directly operated by PHARMA26.</small>}
              </div>
            </motion.li>;
          })}
        </ol>
        <p className="trade-photo-disclaimer">Illustrative photography — not PHARMA26 offices, facilities or operations.</p>

        <div className="trade-capabilities">
          <p className="trade-capabilities-label">THE PHARMA26 APPROACH</p>
          <ul>{capabilities.map(item => {
            const Icon = item.icon;
            return <li key={item.title}><Icon size={20} strokeWidth={1.45} aria-hidden="true"/><div><h3>{item.title}</h3><p>{item.detail}</p></div></li>;
          })}</ul>
        </div>
        <p className="trade-logistics-note">Our merchandise is stored in Belgium, supporting efficient European and international B2B logistics.</p>
      </div>
    </section>
  );
}
