import { motion } from 'framer-motion';

export default function SkeletonCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden glow-card">
      <div className="h-52 shimmer bg-dark-700 rounded-t-2xl" />
      <div className="p-6 space-y-3">
        <div className="h-5 shimmer bg-dark-600 rounded-lg w-3/4" />
        <div className="h-4 shimmer bg-dark-600 rounded-lg w-full" />
        <div className="h-4 shimmer bg-dark-600 rounded-lg w-5/6" />
        <div className="h-4 shimmer bg-dark-600 rounded-lg w-4/6" />
        <div className="flex justify-between items-center pt-3">
          <div className="h-7 shimmer bg-dark-600 rounded-lg w-24" />
          <div className="h-9 shimmer bg-dark-600 rounded-lg w-28" />
        </div>
      </div>
    </div>
  );
}
