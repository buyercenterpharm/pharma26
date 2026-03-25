import { motion } from 'motion/react';
import { Package, Sparkles, Droplets } from 'lucide-react';

export default function Products() {
  const categories = [
    {
      title: "Skincare Solutions",
      icon: <Droplets size={40} />,
      desc: "Comprehensive range of professional skincare products, including moisturizers, serums, and specialized treatments from international manufacturers.",
      items: ["Anti-aging treatments", "Hydration systems", "Dermatological solutions", "Sun protection"]
    },
    {
      title: "Cosmetic Products",
      icon: <Sparkles size={40} />,
      desc: "High-quality color cosmetics and beauty essentials sourced for professional distribution and retail pharmacies.",
      items: ["Face & Base products", "Eye cosmetics", "Lip care and color", "Professional tools"]
    },
    {
      title: "Personal Care",
      icon: <Package size={40} />,
      desc: "Daily essentials and premium personal care items for wholesale distribution across global markets.",
      items: ["Body care", "Hair treatments", "Hygiene essentials", "Professional salon supplies"]
    }
  ];

  return (
    <div className="pt-20">
      <section className="bg-brand-blue text-white py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Product Categories</h1>
            <p className="text-xl text-white/70 leading-relaxed">
              We specialize in the high-volume distribution of premium cosmetic and skincare products. Our inventory is managed with a focus on sourcing and availability.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <div key={idx} className="border border-brand-grey p-10 hover:shadow-2xl transition-all duration-500 group">
                <div className="text-brand-accent mb-8 group-hover:scale-110 transition-transform duration-500">
                  {cat.icon}
                </div>
                <h2 className="text-2xl font-bold mb-4">{cat.title}</h2>
                <p className="text-brand-blue/60 text-sm leading-relaxed mb-8">
                  {cat.desc}
                </p>
                <ul className="space-y-3">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-center text-xs font-bold uppercase tracking-widest text-brand-blue/40">
                      <span className="w-1.5 h-1.5 bg-brand-accent mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-grey">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Sourcing & Availability</h2>
          <p className="text-brand-blue/70 leading-relaxed mb-10">
            PHARMA26 LTD does not operate as a retail storefront. We focus on the wholesale acquisition and distribution of goods. Our product availability fluctuates based on global supply chains and pre-ordered allocations. For specific inquiries regarding current stock or sourcing capabilities, please contact our trading department.
          </p>
          <div className="p-8 border-2 border-dashed border-brand-blue/20 rounded-sm">
            <p className="text-sm font-medium text-brand-blue italic">
              "We emphasize legitimacy and quality in every product we handle, ensuring that our B2B partners receive authentic goods through a transparent supply chain."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
