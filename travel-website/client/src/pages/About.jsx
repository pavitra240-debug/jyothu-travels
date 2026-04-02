import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { IMAGES } from '../config/images';

export default function About() {
  return (
    <>
      <SEO 
        title="About Us - Jyothu Travels" 
        description="Learn about Jyothu Travels & Tourism, our mission, and our luxury travel services." 
      />
      <div className="relative min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
        
        <div className="text-center mb-20 relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block drop-shadow-md"
          >
            Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 text-shine"
          >
            Redefining Travel Experience
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Jyothu Travels & Tourism is your premier partner for exploring the world with unmatched comfort, safety, and luxury.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden glass p-2 shadow-2xl glow-primary"
          >
            <div className="rounded-[1.3rem] overflow-hidden">
              <img 
                src={IMAGES.hero[0]} 
                alt="Our journey" 
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-strong p-8 rounded-3xl border border-white/20 animate-float z-10 hidden md:block">
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-1 text-glow-primary">10+</p>
              <p className="font-medium text-white/80">Years of Excellence</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-white/70 leading-relaxed">
                To provide seamless, unforgettable travel experiences that cater to the unique desires of every client. We believe that the journey should be just as remarkable as the destination.
              </p>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-start gap-4">
                  <span className="text-xl">✨</span>
                  <span><strong>Premium Quality:</strong> From luxury sedans to state-of-the-art coaches, our fleet defines comfort.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-xl">🛡️</span>
                  <span><strong>Uncompromising Safety:</strong> Rigorous maintenance records and highly trained professional chauffeurs.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-xl">🤝</span>
                  <span><strong>Customer Centricity:</strong> 24/7 dedicated support to ensure your peace of mind throughout the trip.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

      </div>
    </>
  );
}
