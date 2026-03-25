import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/packages', label: 'Packages' },
  { to: '/cars', label: 'Car Rental' },
  { to: '/buses', label: 'Bus Booking' },
  { to: '/booking', label: 'Book Now' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Glow top divider */}
      <div className="divider-glow" />

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-orb w-80 h-80 bg-primary -bottom-20 -left-20" />
        <div className="hero-orb w-64 h-64 bg-accent -bottom-10 right-10" />
      </div>

      <div className="relative bg-black/95 backdrop-blur-3xl border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] z-10">
        <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.h3
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-xl font-bold font-montserrat text-shine mb-3"
            >
              Jyothu Travels and Tourism
            </motion.h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Trusted travel agency in Hubli for curated tour packages, car rentals and bus bookings across India. Your dream journey starts here.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://wa.me/919742100545"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-sm hover:bg-green-500/30 transition-all"
              >
                💬 WhatsApp
              </a>
              <a
                href="tel:+919742100545"
                className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/30 text-primary text-sm hover:bg-primary/30 transition-all"
              >
                📞 Call Now
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-slate-400 hover:text-accent transition-colors duration-300 flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-300 text-accent">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Contact</h4>
            <address className="not-italic text-sm text-slate-400 space-y-2">
              <p>#12, Shetter Layout<br />Lingarajnagar, Near Global College<br />Hubli - 580031</p>
              <p>
                <a href="mailto:jyothutravelsandtourism@gmail.com" className="hover:text-accent transition-colors">
                  jyothutravelsandtourism@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:9742100545" className="hover:text-accent transition-colors">9742100545</a>
                {' / '}
                <a href="tel:9483868523" className="hover:text-accent transition-colors">9483868523</a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/5 py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Jyothu Travels and Tourism. All rights reserved. Made with ❤️ in Hubli.
        </div>
      </div>
    </footer>
  );
}
