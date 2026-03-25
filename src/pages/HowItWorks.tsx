import { motion } from 'motion/react';
import { Search, Warehouse, Truck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Sourcing Products",
      icon: <Search size={48} />,
      desc: "Our trading team identifies and sources high-demand cosmetic and skincare products from a network of approved international suppliers and manufacturers. We ensure all products meet our strict quality and regulatory standards."
    },
    {
      step: "02",
      title: "Storage & Logistics",
      icon: <Warehouse size={48} />,
      desc: "Sourced goods are securely stored in our strategic warehouse locations or transit hubs. We manage the inventory with precision, ensuring that products are ready for collection or onward shipping according to client requirements."
    },
    {
      step: "03",
      title: "Client Collection or Shipping",
      icon: <Truck size={48} />,
      desc: "Once the transaction is finalized, goods are made available for collection by the client's logistics partners or shipped via our trusted freight network. We provide all necessary documentation for international transit and customs."
    }
  ];

  return (
    <div className="pt-20">
      <section className="bg-brand-grey py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-brand-blue mb-8">Our Process</h1>
            <p className="text-xl text-brand-blue/70 leading-relaxed">
              A clear, professional approach to international trading and distribution.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-24">
            {steps.map((item, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="text-6xl font-black text-brand-grey mb-6">{item.step}</div>
                  <h2 className="text-3xl font-bold mb-6">{item.title}</h2>
                  <p className="text-lg text-brand-blue/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="flex-1 w-full flex justify-center">
                  <div className="w-full max-w-md aspect-square bg-brand-grey flex items-center justify-center text-brand-blue/20">
                    <div className="transform scale-[2] opacity-50">
                      {item.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-blue text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Streamlined B2B Operations</h2>
          <p className="max-w-2xl mx-auto text-white/60 leading-relaxed mb-12">
            Our operational model is designed to minimize friction in the wholesale supply chain. By managing the complexities of sourcing and storage, we allow our partners to focus on their core business activities.
          </p>
          <div className="inline-flex items-center space-x-4 text-xs font-bold uppercase tracking-[0.3em]">
            <span>Reliability</span>
            <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
            <span>Efficiency</span>
            <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
            <span>Scale</span>
          </div>
        </div>
      </section>
    </div>
  );
}
