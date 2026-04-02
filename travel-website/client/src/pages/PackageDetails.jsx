import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { IMAGES } from '../config/images';

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/packages/${id}`)
      .then((res) => {
        setPkg(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Package not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-primary border-r-transparent border-b-transparent"></div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Package Not Found</h1>
        <p className="text-white/60 mb-8 max-w-lg text-center">{error || 'The package you are looking for does not exist.'}</p>
        <Link to="/services?tab=packages" className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all">
          Browse All Packages
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${pkg.name} - Jyothu Travels`}
        description={pkg.description || 'Explore this amazing premium travel package'}
      />
      <div className="relative min-h-screen bg-black overflow-hidden pt-28 pb-20 text-white">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <Link to="/services?tab=packages" className="inline-flex items-center text-primary font-bold mb-8 hover:text-white transition-colors group tracking-wide uppercase text-sm">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Services
          </Link>

          {/* Main Content Area */}
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left Side: Images & Info */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl overflow-hidden glass p-2 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
              >
                <img
                  src={pkg.imageUrl || IMAGES.services.package}
                  alt={pkg.name}
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-[1.3rem]"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-4xl md:text-6xl font-black text-shine mb-6">{pkg.name}</h1>
                <div className="flex flex-wrap gap-4 mb-8">
                  <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    🌍 Premium Destination
                  </span>
                  <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    ⏱️ Flexible Itinerary
                  </span>
                  <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    🤝 Guided Tour
                  </span>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-12 shadow-xl">
                  <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                    <span className="text-primary">📝</span> Package Overview
                  </h2>
                  <p className="text-white/70 leading-relaxed text-lg font-light">
                    {pkg.description || 'Experience the journey of a lifetime with this carefully curated luxury travel package. Enjoy comfortable accommodation, guided tours, and unforgettable memories.'}
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
                  <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                    <span className="text-accent">✨</span> What's Included
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/20 p-3 rounded-xl text-primary text-xl">🚘</div>
                      <div>
                        <h3 className="font-bold text-white mb-1">Luxury Transport</h3>
                        <p className="text-sm text-white/50">Comfortable AC travel</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/20 p-3 rounded-xl text-primary text-xl">🏨</div>
                      <div>
                        <h3 className="font-bold text-white mb-1">Premium Stays</h3>
                        <p className="text-sm text-white/50">3 to 5 star accommodations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/20 p-3 rounded-xl text-primary text-xl">🍽️</div>
                      <div>
                        <h3 className="font-bold text-white mb-1">Meals</h3>
                        <p className="text-sm text-white/50">Breakfast & selected dinners</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/20 p-3 rounded-xl text-primary text-xl">👨‍✈️</div>
                      <div>
                        <h3 className="font-bold text-white mb-1">Expert Guides</h3>
                        <p className="text-sm text-white/50">Knowledgeable local guides</p>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Right Side: Sticky Booking Card */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-32 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[0_0_40px_rgba(108,99,255,0.15)]"
              >
                <div className="mb-8 pb-8 border-b border-white/10">
                  <p className="text-white/60 mb-2 uppercase tracking-wider text-sm font-medium">Starting from</p>
                  <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                    ₹{pkg.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-white/40">per person / all-inclusive</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80 text-sm">Best Price Guarantee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80 text-sm">Secure Booking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80 text-sm">24/7 Trip Support</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/booking?type=package&id=${pkg._id}`)}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-black text-lg hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  Book This Package
                </button>
                <p className="text-center text-white/40 text-xs mt-4">
                  No charges until your booking is confirmed
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
