import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function GlobalBgShapes() {
  const location = useLocation();
  // Don't render huge shapes over the admin panel
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[0] opacity-40 mix-blend-screen">
      <motion.div 
        animate={{ x: [0, 150, 0], y: [0, -150, 0], scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[5%] w-[400px] h-[400px] border-2 border-primary/20 shadow-[0_0_100px_rgba(108,99,255,0.2)] bg-primary/5 blur-[100px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
      />
      <motion.div 
        animate={{ x: [0, -150, 0], y: [0, 150, 0], scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] border-2 border-secondary/20 shadow-[0_0_120px_rgba(0,212,255,0.2)] bg-secondary/5 blur-[120px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%]"
      />
      <motion.div 
        animate={{ x: [-100, 100, -100], y: [-50, 50, -50], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[40%] w-[300px] h-[300px] border-2 border-purple-500/20 shadow-[0_0_90px_rgba(168,85,247,0.2)] bg-purple-500/5 blur-[90px] rounded-full"
      />
      <motion.div 
        animate={{ x: [0, 200, 0], y: [100, 0, 100], rotate: [0, 180, 360] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[10%] left-[20%] w-[350px] h-[350px] border border-blue-500/20 shadow-[0_0_80px_rgba(59,130,246,0.15)] bg-blue-500/5 blur-[80px] rounded-[30%_70%_70%_30%/30%_30%_70%_70%]"
      />
    </div>
  );
}
