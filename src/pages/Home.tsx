import BrandsShowcase from '../components/BrandsShowcase';
import CinematicHero from '../components/CinematicHero';
import TradeInfrastructure from '../components/TradeInfrastructure';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-20">
      <CinematicHero />

      <TradeInfrastructure />

      <BrandsShowcase />

      {/* CTA Section */}
      <section className="py-24 bg-brand-blue text-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to expand your distribution network?</h2>
          <p className="text-xl text-white/70 mb-12">
            Connect with PHARMA26 LTD today to discuss wholesale opportunities and global sourcing requirements.
          </p>
          <Link to="/contact" className="bg-white text-brand-blue px-12 py-4 rounded-sm font-bold hover:bg-brand-grey transition-colors inline-block">
            ESTABLISH PARTNERSHIP
          </Link>
        </div>
      </section>
    </div>
  );
}
