import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-20">
      <section className="bg-brand-grey py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-brand-blue mb-8">Contact Us</h1>
            <p className="text-xl text-brand-blue/70 leading-relaxed">
              Connect with our trading department to discuss wholesale opportunities and partnerships.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-brand-blue">Inquiry Form</h2>
            <form 
              action="https://formspree.io/f/xqegzjoz" 
              method="POST"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-blue/50">Full Name</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    className="w-full border-b border-brand-grey py-3 focus:outline-none focus:border-brand-blue transition-colors" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-blue/50">Company Name</label>
                  <input 
                    name="company"
                    type="text" 
                    required
                    className="w-full border-b border-brand-grey py-3 focus:outline-none focus:border-brand-blue transition-colors" 
                    placeholder="Enterprise Ltd" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-blue/50">Business Email</label>
                <input 
                  name="email"
                  type="email" 
                  required
                  className="w-full border-b border-brand-grey py-3 focus:outline-none focus:border-brand-blue transition-colors" 
                  placeholder="contact@company.com" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-blue/50">Subject</label>
                <select 
                  name="subject"
                  className="w-full border-b border-brand-grey py-3 focus:outline-none focus:border-brand-blue transition-colors bg-transparent"
                >
                  <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                  <option value="Sourcing Request">Sourcing Request</option>
                  <option value="Logistics & Distribution">Logistics & Distribution</option>
                  <option value="Other Professional Inquiry">Other Professional Inquiry</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-blue/50">Message</label>
                <textarea 
                  name="message"
                  rows={4} 
                  required
                  className="w-full border-b border-brand-grey py-3 focus:outline-none focus:border-brand-blue transition-colors resize-none" 
                  placeholder="How can we assist your business?"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full md:w-auto">SEND INQUIRY</button>
            </form>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-brand-blue">Direct Contact</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-brand-grey flex items-center justify-center text-brand-blue mr-6 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-blue/50 mb-1">Email</h4>
                    <p className="text-lg font-medium">buyer@pharma26.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-brand-grey flex items-center justify-center text-brand-blue mr-6 flex-shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-blue/50 mb-1">Professional WhatsApp</h4>
                    <p className="text-lg font-medium">+33 7 49 64 72 00</p>
                    <p className="text-xs text-brand-blue/40 mt-1">Available for verified business partners.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-brand-grey flex items-center justify-center text-brand-blue mr-6 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-blue/50 mb-1">Headquarters</h4>
                    <p className="text-lg font-medium">Cyprus</p>
                    <p className="text-xs text-brand-blue/40 mt-1">Strategic hub for international distribution.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-brand-grey/50 border-l-4 border-brand-blue">
              <h4 className="font-bold mb-2">Business Hours</h4>
              <p className="text-sm text-brand-blue/60">
                Monday – Friday: 09:00 – 18:00 (EET)<br />
                Saturday – Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
