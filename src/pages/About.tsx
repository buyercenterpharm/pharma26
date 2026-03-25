import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-20">
      <section className="bg-brand-grey py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-brand-blue mb-8">About PHARMA26 LTD</h1>
            <p className="text-xl text-brand-blue/70 leading-relaxed">
              A Cyprus-based leader in international wholesale trading and distribution of premium skincare and cosmetic products.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-4">Our Foundation</h2>
              <p className="text-brand-blue/70 leading-relaxed">
                PHARMA26 LTD was established with a clear mission: to streamline the international distribution of high-quality cosmetic products. Registered and headquartered in Cyprus, with strategic warehouses in both Paris and Cyprus, we leverage our unique position to facilitate seamless operations and serve clients across Europe, Asia, and the Middle East.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-4">Professionalism & Integrity</h2>
              <p className="text-brand-blue/70 leading-relaxed">
                In the wholesale industry, trust is the primary currency. We have built our reputation on unwavering professionalism and integrity. Every partnership we enter is treated with the highest level of corporate responsibility, ensuring that our clients receive not only products but a reliable supply chain solution.
              </p>
            </div>
          </div>
          
          <div className="bg-brand-blue p-12 text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6">Why PHARMA26 LTD?</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-brand-accent flex-shrink-0 mr-4 mt-1"></span>
                <div>
                  <h4 className="font-bold">Strategic Location</h4>
                  <p className="text-sm text-white/60">We have warehouses in Paris and Cyprus, which facilitates all operations and ensures optimal access to international markets.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-brand-accent flex-shrink-0 mr-4 mt-1"></span>
                <div>
                  <h4 className="font-bold">Verified Network</h4>
                  <p className="text-sm text-white/60">We only source from approved, reputable suppliers and manufacturers.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-brand-accent flex-shrink-0 mr-4 mt-1"></span>
                <div>
                  <h4 className="font-bold">B2B Specialization</h4>
                  <p className="text-sm text-white/60">Our systems and processes are designed specifically for high-volume wholesale.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-brand-grey">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-12">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-4xl font-bold text-brand-blue mb-2">100%</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-50">B2B Focused</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-blue mb-2">Global</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-50">Distribution Network</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-blue mb-2">Cyprus</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-50">Registered & Regulated</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
