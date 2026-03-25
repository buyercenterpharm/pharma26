import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav pt-1 pb-2' : 'bg-transparent pt-2 pb-4'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        <Link to="/" className="flex items-center mb-2">
          <img 
            src="/logo.png" 
            alt="PHARMA26 LTD" 
            className="h-16 md:h-28 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.fallback-logo')) {
                const span = document.createElement('span');
                span.className = 'fallback-logo text-xl font-bold tracking-tighter text-brand-blue';
                span.innerHTML = 'PHARMA<span class="text-brand-accent">26</span> LTD';
                parent.appendChild(span);
              }
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center border-t border-brand-blue/10 pt-3 w-full justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-brand-accent ${
                location.pathname === link.path ? 'text-brand-accent' : 'text-brand-blue/70'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle - Absolute positioned to keep logo centered */}
        <button className="md:hidden text-brand-blue absolute left-6 top-6" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white border-b border-brand-grey p-6 flex flex-col space-y-4 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-brand-blue"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
