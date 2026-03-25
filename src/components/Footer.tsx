import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <img 
            src="/logo.png" 
            alt="PHARMA26 LTD" 
            className="h-24 w-auto mb-6 object-contain brightness-0 invert" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.fallback-footer-logo')) {
                const h3 = document.createElement('h3');
                h3.className = 'fallback-footer-logo text-xl font-bold tracking-tighter mb-6';
                h3.innerText = 'PHARMA26 LTD';
                parent.appendChild(h3);
              }
            }}
          />
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            International wholesale trading and distribution of premium cosmetic and skincare products. Registered in Cyprus.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-50">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-brand-grey transition-colors">About Us</Link></li>
            <li><Link to="/products" className="hover:text-brand-grey transition-colors">Product Categories</Link></li>
            <li><Link to="/how-it-works" className="hover:text-brand-grey transition-colors">Our Process</Link></li>
            <li><Link to="/contact" className="hover:text-brand-grey transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-50">Headquarters</h4>
          <p className="text-sm text-white/60">
            PHARMA26 LTD<br />
            Cyprus<br />
            Registration: HE 123456 (Placeholder)<br />
            Email: buyercenterpharm@gmail.com
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] uppercase tracking-[0.2em] text-white/40">
        <p>© 2026 PHARMA26 LTD. ALL RIGHTS RESERVED.</p>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 text-[10px] text-white/20 text-center md:text-left leading-relaxed">
        PHARMA26 LTD is a registered entity in the Republic of Cyprus. We operate exclusively as a B2B wholesaler and distributor. This website does not facilitate retail transactions or direct consumer sales. All product availability is subject to verification and logistics confirmation.
      </div>
    </footer>
  );
}
