import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Building2, MapPin, Search, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';
import './how-it-works.css';

const steps = [
  { step: '01', title: 'Sourcing Requirements', icon: Search, desc: 'Our trading team reviews each B2B request and discusses the relevant brands, products, quantities and current sourcing conditions with the client.' },
  { step: '02', title: 'Belgium-Based Storage', icon: Warehouse, desc: 'Products are stored in Belgium at a facility operated by an external third-party logistics provider. PHARMA26 coordinates inventory and logistics requirements without owning or directly operating the warehouse.' },
  { step: '03', title: 'B2B Logistics Coordination', icon: ArrowUpRight, desc: 'Following commercial confirmation, PHARMA26 coordinates the next logistics steps with the relevant parties in accordance with the agreed transaction requirements.' },
];

export default function HowItWorks() {
  const reduced = useReducedMotion();
  return (
    <div className="process-page">
      <section className="process-hero">
        <div className="process-container">
          <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="process-hero-copy">
            <p className="process-eyebrow"><span /> FROM SOURCING TO LOGISTICS</p>
            <h1>Our Process<span>A clear path through international B2B trade.</span></h1>
            <p>PHARMA26 combines a Cyprus headquarters with Belgium-based warehousing through an external logistics provider.</p>
          </motion.div>
        </div>
      </section>

      <section className="belgium-logistics" aria-labelledby="belgium-logistics-heading">
        <div className="process-container logistics-grid">
          <motion.figure initial={reduced ? false : { opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .7 }} className="warehouse-visual">
            <img src="/images/belgium-3pl-warehouse.webp" alt="Illustrative interior of a modern third-party logistics warehouse with pallet racking and unbranded cartons" width="1586" height="992" loading="eager" decoding="async" />
            <figcaption>Illustrative logistics image — not a photograph of the specific facility.</figcaption>
            <div className="belgium-marker" aria-hidden="true"><MapPin size={16} /> BELGIUM</div>
          </motion.figure>
          <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .65 }} className="logistics-copy">
            <p className="process-eyebrow">WAREHOUSING & LOGISTICS</p>
            <h2 id="belgium-logistics-heading">Headquartered in Cyprus.<br /><em>Stored in Belgium.</em></h2>
            <p>Headquartered in Cyprus, PHARMA26 LTD benefits from warehousing facilities in Belgium through a trusted third-party logistics provider.</p>
            <p>Our products are stored in Belgium, allowing us to coordinate European and international B2B shipments efficiently.</p>
            <dl className="logistics-facts">
              <div><dt>Corporate base</dt><dd><Building2 size={17} aria-hidden="true" /> Cyprus</dd></div>
              <div><dt>Product storage</dt><dd><MapPin size={17} aria-hidden="true" /> Belgium</dd></div>
              <div><dt>Facility operation</dt><dd><Warehouse size={17} aria-hidden="true" /> Third-party logistics provider</dd></div>
            </dl>
            <p className="ownership-note">The Belgium facility is operated by an external 3PL. PHARMA26 does not own or directly operate the warehouse.</p>
          </motion.div>
        </div>
      </section>

      <section className="process-steps" aria-labelledby="process-steps-heading">
        <div className="process-container">
          <div className="steps-heading"><p className="process-eyebrow">HOW WE WORK</p><h2 id="process-steps-heading">A considered B2B process.</h2></div>
          <ol>
            {steps.map((item, index) => {
              const Icon = item.icon;
              return <motion.li key={item.step} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, delay: reduced ? 0 : index * .08 }}>
                <div className="step-number">{item.step}</div>
                <Icon size={25} strokeWidth={1.4} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.li>;
            })}
          </ol>
        </div>
      </section>

      <section className="process-cta">
        <div className="process-container process-cta-inner">
          <div><p className="process-eyebrow">START A CONVERSATION</p><h2>Discuss your sourcing<br /><em>requirements with us.</em></h2></div>
          <Link to="/contact">Contact our trading team <ArrowUpRight size={19} /></Link>
        </div>
      </section>
    </div>
  );
}
