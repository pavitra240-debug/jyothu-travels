import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';
import { IMAGES } from '../config/images';

export default function Services() {
  const [packages, setPackages] = useState([]);
  const [cars, setCars] = useState([]);
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const initialTab = searchParams.get('tab') || 'packages';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['packages', 'cars', 'buses'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    // Fetch all services
    const fetchData = async () => {
      try {
        const [pkgRes, carRes, busRes] = await Promise.all([
          axios.get('/api/packages').catch(() => ({ data: [] })),
          axios.get('/api/cars').catch(() => ({ data: [] })),
          axios.get('/api/buses').catch(() => ({ data: [] }))
        ]);
        setPackages(pkgRes.data);
        setCars(carRes.data);
        setBuses(busRes.data);
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const renderPackages = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {packages.length === 0 ? <p className="text-white/60 col-span-full text-center py-10">No packages currently available.</p> : null}
      {packages.map((p) => (
        <motion.article
          variants={itemVariants}
          key={p._id}
          className="group relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors shadow-2xl"
        >
          <div className="relative h-60 overflow-hidden">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
            <img
              src={p.imageUrl || IMAGES.services.package}
              alt={p.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-sm font-semibold z-20">
              ₹{p.price}
            </div>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{p.name}</h3>
            <p className="text-white/60 mb-6 line-clamp-2 text-sm leading-relaxed">
              {p.description || 'A wonderful travel experience awaits you'}
            </p>
            {p.features && p.features.length > 0 && (
              <ul className="mb-6 space-y-2">
                {p.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="text-xs text-white/40 flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full" /> {f}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <button 
                onClick={() => navigate(`/booking?type=package&id=${p._id}`)}
                className="w-full text-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );

  const renderVehicles = (items, type) => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {items.length === 0 ? <p className="text-white/60 col-span-full text-center py-10">No {type}s currently available.</p> : null}
      {items.map((item) => (
        <motion.article
          variants={itemVariants}
          key={item._id}
          className="group relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-colors shadow-2xl"
        >
          <div className="relative h-60 overflow-hidden">
            <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-transparent transition-colors z-10" />
            <img
              src={item.imageUrl || (type === 'car' ? IMAGES.services.car : IMAGES.services.bus)}
              alt={item.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-sm font-bold z-20">
              ₹{item.pricePerDay || item.price} / day
              {item.pricePerKm > 0 && (
                <span className="block text-[10px] opacity-70 mt-0.5">₹{item.pricePerKm}/km extra</span>
              )}
            </div>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.name}</h3>
            <p className="text-white/60 mb-6 line-clamp-2 text-sm leading-relaxed">
              {item.description || `Premium ${type} for your comfort`}
            </p>
            {item.features && item.features.length > 0 && (
              <ul className="mb-6 space-y-2">
                {item.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="text-xs text-white/40 flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full" /> {f}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <button 
                onClick={() => navigate(`/booking?type=${type}&id=${item._id}`)}
                className="w-full bg-white/10 hover:bg-emerald-500 text-white border border-white/20 hover:border-emerald-500 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );

  return (
    <>
      <SEO
        title="Our Services - Jyothu Travels"
        description="Explore premium travel packages, luxury car rentals, and spacious buses for all your journey needs."
      />
      <div className="relative min-h-screen bg-black overflow-hidden pt-28 pb-20">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ y: yBg }}
            className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full mix-blend-screen"
          />
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-50%']) }}
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[150px] rounded-full mix-blend-screen"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-100 to-white mb-6"
            >
              Extraordinary Journeys
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl font-light"
            >
              Select from our meticulously crafted packages or rent premium vehicles to design your perfect adventure.
            </motion.p>
          </div>

          {/* Unified Tabs */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-2 shadow-2xl">
              {['packages', 'cars', 'buses'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-8 py-3 rounded-xl font-bold text-sm md:text-base capitalize transition-all duration-300 ${
                    activeTab === tab ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-xl shadow-lg"
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="min-h-[500px]">
            {activeTab === 'packages' && renderPackages()}
            {activeTab === 'cars' && renderVehicles(cars, 'car')}
            {activeTab === 'buses' && renderVehicles(buses, 'bus')}
          </div>

        </div>
      </div>
    </>
  );
}
