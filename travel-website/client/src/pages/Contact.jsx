import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapInteractive, setMapInteractive] = useState(false);
  const [mapFullscreen, setMapFullscreen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await axios.post('/api/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - Jyothu Travels"
        description="Contact Jyothu Travels and Tourism in Hubli - Get travel packages, car rental, and bus booking services. Call us for instant quotes and bookings."
      />
      <div className="relative min-h-screen bg-black overflow-hidden pt-28 pb-20 text-white">
        
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="global-moving-shapes">
             <motion.div 
               animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full mix-blend-screen"
             />
             <motion.div 
               animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
               className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full mix-blend-screen"
             />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold text-shine mb-6"
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl font-light"
            >
              Have questions about our travel packages, car rentals, or bus services? We're here to help!
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-16">

            {/* Contact Information Cards */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 hover:border-primary/50 transition-colors group"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform origin-left">📱</div>
              <h3 className="font-bold text-white mb-2 text-xl">Call Number</h3>
              <p className="text-primary glow-text font-bold text-2xl mb-2">+91 9483868523</p>
              <p className="text-white/60">Quick responses to your calls</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 hover:border-green-500/50 transition-colors group"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform origin-left">💬</div>
              <h3 className="font-bold text-white mb-2 text-xl">WhatsApp Number</h3>
              <a 
                href="https://wa.me/919742100545?text=Hi%20Jyothu%20Travels!%20I%20want%20to%20know%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] font-bold text-2xl mb-2 hover:text-green-300 block transition-colors"
              >
                +91 9742100545
              </a>
              <p className="text-white/60">Chat with us instantly on WhatsApp</p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-16">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/10"
            >
              <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>
              {submitted && (
                <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-300 backdrop-blur-sm">
                  🎉 Thank you! We'll get back to you within 24 hours.
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 backdrop-blur-sm">
                  ❌ {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-white/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-white/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="10-digit phone number"
                    className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-white/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your travel plans..."
                    rows="5"
                    className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-white/30 text-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg tracking-wide"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            {/* Contact Details & Map block */}
            <div className="space-y-8 flex flex-col">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-6">📍 Visit Us</h3>
                <div className="space-y-2 text-white/70 text-sm leading-relaxed mb-8">
                  <p><span className="font-semibold block text-white text-lg mb-2">Jyothu Travels & Tourism</span>
                    #12, Shetter Layout<br />
                    Lingarajnagar<br />
                    Near Global College<br />
                    Hubli, Karnataka 580031<br />
                    India
                  </p>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">Email</h3>
                <a 
                  href="mailto:jyothutravelsandtourism@gmail.com"
                  className="text-primary hover:text-secondary font-semibold text-lg hover:underline transition-colors block break-all"
                >
                  jyothutravelsandtourism@gmail.com
                </a>
              </motion.div>

              {/* Improved Google Maps Section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 h-64 lg:h-full group cursor-pointer flex-grow"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.4346397502334!2d75.3380!3d15.3595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8be16be1be16b%3A0xc0e5e5e5e5e5e5e0!2sLingarajnagar%2C%20Hubballi%2C%20Karnataka%20580031!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: 'auto' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="opacity-90 grayscale md:grayscale-0 contrast-125 saturate-150 transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                  title="Jyothu Travels Location Map"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMapFullscreen(true);
                  }}
                  className="absolute bottom-4 right-4 bg-black/80 backdrop-blur border border-white/20 text-white p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="View Map Fullscreen"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                </button>
              </motion.div>
            </div>
          </div>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center text-white shadow-[0_0_40px_rgba(108,99,255,0.4)]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">Ready to Plan Your Trip?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg drop-shadow-sm">
              Connect with our team today and start your travel adventure
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919742100545?text=Hi%20Jyothu%20Travels!%20I%20want%20to%20know%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Chat on WhatsApp
              </a>
              <a
                href="tel:+919483868523"
                className="border-2 border-white bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Call Us Now
              </a>
            </div>
          </section>
        </div>

        {/* Fullscreen Map Modal - Dark Mode */}
        {mapFullscreen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex flex-col p-4 md:p-8">
            <div className="flex justify-between items-center mb-4 text-white max-w-7xl mx-auto w-full">
              <h2 className="text-2xl font-bold text-shine">Location Map</h2>
              <button
                onClick={() => setMapFullscreen(false)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition-all"
              >
                ✕ Close
              </button>
            </div>
            <div className="flex-1 relative max-w-7xl mx-auto w-full rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(108,99,255,0.3)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.4346397502334!2d75.3380!3d15.3595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8be16be1be16b%3A0xc0e5e5e5e5e5e5e0!2sLingarajnagar%2C%20Hubballi%2C%20Karnataka%20580031!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}

      </div>
    </>
  );
}

