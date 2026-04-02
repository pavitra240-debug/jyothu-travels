import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-black/40 backdrop-blur-xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-2'
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8">
        
        {/* Logo Text Section (No Image) */}
        <Link to="/" className="flex items-center gap-4 group z-20">
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-shine glow-text group-hover:scale-105 transition-transform duration-500">
              Jyothu Travels and Tourism
            </span>
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-white/50 uppercase mt-0.5 group-hover:text-accent transition-colors duration-500">
              Your Map Your Dream Our Mission
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative px-5 py-2.5 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'text-white shadow-[0_0_20px_rgba(108,99,255,0.4)]'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-xl z-0"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          
          {/* Always visible Book Now on Desktop */}
          <Link 
            to="/booking"
            className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-[0_0_20px_rgba(108,99,255,0.4)] hover:shadow-[0_0_30px_rgba(108,99,255,0.6)] transform hover:scale-105 transition-all uppercase tracking-widest text-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full skew-x-12 transition-transform duration-500" />
            Book Now
          </Link>
        </div>

        {/* Mobile menu button & Book Now */}
        <div className="flex items-center gap-3 md:hidden relative z-50">
          <Link 
            to="/booking"
            className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg shadow-[0_0_15px_rgba(108,99,255,0.4)] text-xs uppercase tracking-wider"
          >
            Book Now
          </Link>
          <button
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between overflow-hidden">
              <span className={`w-full h-0.5 bg-current rounded-full transform transition-all duration-300 origin-left ${mobileOpen ? 'rotate-45 translate-x-px' : ''}`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 translate-x-4' : ''}`} />
              <span className={`w-full h-0.5 bg-current rounded-full transform transition-all duration-300 origin-left ${mobileOpen ? '-rotate-45 translate-x-px' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-3xl border-b border-white/10 shadow-2xl absolute w-full top-full left-0 origin-top"
          >
            <nav className="flex flex-col p-6 gap-3">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <NavLink
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center w-full px-6 py-4 rounded-2xl text-lg font-bold tracking-wider uppercase transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-primary/30 shadow-[inset_0_0_20px_rgba(108,99,255,0.2)]'
                          : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
