import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { IMAGES } from '../config/images';

const heroImages = IMAGES.hero;

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Family Trip',
    feedback: 'Exceptional service! The entire trip was perfectly planned. The driver was professional and the accommodations were comfortable. Highly recommend!',
  },
  {
    name: 'Priya Sharma',
    role: 'Corporate Travel',
    feedback: 'Best experience with a travel agency. Our group had an amazing time. The coordination, safety measures, and hospitality were outstanding!',
  },
  {
    name: 'Amit Patel',
    role: 'Weekend Getaway',
    feedback: 'Quick bookings, transparent pricing, and excellent customer support. Jyothu Travels made our trip stress-free and memorable. Will definitely book again!',
  }
];

const standards = [
  {
    title: 'On-time, Every-time',
    description: 'We value your time. Our punctuality is guaranteed. Whether it\'s a pickup, departure, or tour schedule, we ensure you\'re never left waiting.',
    icon: '⏳',
    image: IMAGES.standards[0]
  },
  {
    title: 'Safety First',
    description: 'Your safety is our priority. All vehicles are regularly maintained, drivers are professionally trained, and we follow strict safety protocols.',
    icon: '🛡️',
    image: IMAGES.standards[1]
  },
  {
    title: 'Comfort Through Journey',
    description: 'Enjoy a smooth and comfortable ride. From well-maintained vehicles to courteous staff, every detail is designed for your comfort and relaxation.',
    icon: '✨',
    image: IMAGES.standards[2]
  }
];

const faq = [
  {
    question: 'How can I book a travel package?',
    answer: 'You can book a package through our website enquiry form, phone number, or email. Our team will assist you with the full booking process.'
  },
  {
    question: 'Do you offer customized travel packages?',
    answer: 'Yes. We create customized packages based on your destination, travel dates, budget, and number of travelers.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept online transfers, bank payments, and other secure payment options. Our team will guide you during booking.'
  },
  {
    question: 'Can I modify my travel plan after booking?',
    answer: 'Yes. Modifications may be possible depending on booking stage and availability. Contact our support team for assistance.'
  }
];

// Reusable Components
function GlassCard({ children, className = '' }) {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:border-primary/50 hover:shadow-[0_0_40px_rgba(108,99,255,0.2)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 text-lg">Quick answers to common travel questions</p>
        </motion.div>

        <div className="space-y-4">
          {faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center"
              >
                <h3 className="font-bold text-lg text-white">{item.question}</h3>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  className="text-primary text-xl"
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-white/70"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden selection:bg-primary selection:text-white">
      <SEO
        title="Home - Jyothu Travels"
        description="Premium travel agency offering customized tour packages, car rentals, and bus bookings."
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Crossfading Hero Images */}
        <motion.div className="absolute inset-0 z-0" style={{ y: yParallax, opacity: opacityFade }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentHero}
              src={heroImages[currentHero]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Beautiful travel destination"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold tracking-widest uppercase mb-6 text-primary-100">
              Welcome to the Extraordinary
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black mb-6 leading-none tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-100 to-white pb-2 block">
                Jyothu Travels
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary block text-shine drop-shadow-2xl">
                & Tourism
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light mb-12 px-4 leading-relaxed">
              Discover breathtaking destinations with our premium curated packages and luxury rentals. Your journey to the extraordinary begins here.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      <div className="relative z-10 bg-black">
        {/* Global animated shapes are now handled by GlobalBgShapes component in App.jsx */}

        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
          
          {/* Services Teaser */}
          <section className="mb-40">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-7xl font-extrabold mb-6">World-Class Services</h2>
              <p className="text-white/60 text-xl max-w-2xl mx-auto">Experience seamless travel solutions designed for ultimate comfort and luxury.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 relative z-20">
              {[
                { title: 'Curated Packages', icon: '🌍', desc: 'Exclusive tailored trips to the most beautiful destinations.', tab: 'packages' },
                { title: 'Luxury Cars', icon: '🚘', desc: 'Premium fleet of cars with professional chauffeurs.', tab: 'cars' },
                { title: 'Spacious Buses', icon: '🚌', desc: 'Comfortable group travel for events and tours.', tab: 'buses' }
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <GlassCard className="h-full flex flex-col items-center text-center group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform duration-500 relative z-10">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 relative z-10 text-shine">{service.title}</h3>
                    <p className="text-white/60 mb-8 relative z-10">{service.desc}</p>
                    <Link to={`/services?tab=${service.tab}`} className="mt-auto font-bold text-primary group-hover:text-secondary group-hover:drop-shadow-[0_0_10px_rgba(0,212,255,0.8)] tracking-wider uppercase text-sm flex items-center gap-2 relative z-10 transition-all">
                      Discover More
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Standards Section with Parallax Image */}
          <section className="mb-40">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-6xl font-extrabold mb-8">Our Signature Standards</h2>
                <div className="space-y-8">
                  {standards.map((std, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 10 }}
                      className="flex gap-6 items-start bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors"
                    >
                      <span className="text-4xl bg-gradient-to-br from-primary to-secondary p-4 rounded-xl shadow-lg">{std.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{std.title}</h3>
                        <p className="text-white/60 leading-relaxed">{std.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <div className="relative h-[600px] rounded-3xl overflow-hidden hidden lg:block border border-white/20 shadow-2xl">
                <img src={IMAGES.standards[0]} className="w-full h-full object-cover" alt="Standards" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
            </div>
          </section>

          {/* Horizontal Scrolling Testimonials */}
          <section className="mb-40">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-extrabold mb-6">Traveler Diaries</h2>
              <p className="text-white/60 text-xl max-w-2xl mx-auto">Don't just take our word for it.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <GlassCard className="h-full relative overflow-hidden">
                    <div className="text-primary text-6xl absolute -top-4 -right-4 opacity-20 font-serif">"</div>
                    <div className="flex text-yellow-500 mb-6 drop-shadow-md">
                      {Array(5).fill('★').map((s, i) => <span key={i}>{s}</span>)}
                    </div>
                    <p className="text-lg italic text-white/80 mb-8 relative z-10 leading-relaxed">
                      "{t.feedback}"
                    </p>
                    <div className="border-t border-white/10 pt-6 mt-auto">
                      <p className="font-bold text-xl">{t.name}</p>
                      <p className="text-primary font-medium tracking-wide text-sm">{t.role}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          <FAQSection />

          {/* Epic CTA */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 relative overflow-hidden rounded-[3rem] p-16 text-center shadow-[0_0_100px_rgba(108,99,255,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-lg text-white">
                Begin Your Next Chapter
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium">
                Unlock extraordinary destinations and create memories that span a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/booking">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white text-primary rounded-2xl font-black text-xl shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all"
                  >
                    Start Booking
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all"
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
}
