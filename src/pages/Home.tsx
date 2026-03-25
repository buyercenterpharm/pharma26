import { motion } from 'motion/react';
import { ArrowRight, Globe, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-brand-grey">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-blue via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue/50 mb-4 block">
              International B2B Distribution
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-brand-blue leading-[1.1] mb-8">
              International Trading & Distribution of Cosmetic Products
            </h1>
            <p className="text-lg text-brand-blue/70 mb-10 leading-relaxed max-w-xl">
              PHARMA26 LTD provides high-scale wholesale solutions for the global beauty and skincare industry. We bridge the gap between approved suppliers and international distributors.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact" className="btn-primary flex items-center justify-center">
                Contact Us <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link to="/about" className="btn-secondary flex items-center justify-center">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">A Trusted Partner in Global Wholesale</h2>
              <p className="text-brand-blue/70 leading-relaxed mb-6">
                With strategic warehouses in Paris and Cyprus, PHARMA26 LTD operates at the intersection of global supply chains. We specialize in the sourcing and distribution of high-demand cosmetic and skincare products, serving a network of pharmacies, wholesalers, and professional distributors worldwide.
              </p>
              <p className="text-brand-blue/70 leading-relaxed">
                Our business model is built on reliability, transparency, and a deep understanding of international logistics. We ensure that every product we distribute meets the highest standards of quality and regulatory compliance.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <Globe size={32} />, title: "Global Sourcing", desc: "Direct access to approved international suppliers and manufacturers." },
                { icon: <ShieldCheck size={32} />, title: "Reliable Supply", desc: "Consistent inventory management and secure transit locations." },
                { icon: <Zap size={32} />, title: "B2B Focus", desc: "Tailored wholesale solutions for businesses and distributors." },
                { icon: <ShieldCheck size={32} />, title: "Compliance", desc: "Strict adherence to international trade and safety regulations." }
              ].map((item, idx) => (
                <div key={idx} className="p-8 border border-brand-grey bg-brand-grey/30 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="text-brand-accent mb-4">{item.icon}</div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-blue/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
