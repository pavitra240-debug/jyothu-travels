import { Car, Bus, Package, CalendarCheck, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Overview({ data }) {
  const { cars, buses, packages, bookings } = data;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  
  const stats = [
    { label: 'Total Packages', value: packages.length, icon: <Package size={24} />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Total Cars', value: cars.length, icon: <Car size={24} />, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Total Buses', value: buses.length, icon: <Bus size={24} />, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Total Bookings', value: bookings.length, icon: <CalendarCheck size={24} />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Pending Requests', value: pendingBookings, icon: <Users size={24} />, color: 'text-red-400', bg: 'bg-red-400/10' },
    { label: 'Active Services', value: (packages.length + cars.length + buses.length), icon: <TrendingUp size={24} />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-white/60">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-white/60 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-white">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mt-8">
        <h3 className="text-xl font-bold text-white mb-6">Recent Pending Bookings</h3>
        <div className="space-y-4">
          {bookings.filter(b => b.status === 'Pending').slice(0, 5).map(b => (
            <div key={b._id} className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
              <div>
                <p className="font-bold text-white">{b.name} <span className="text-xs text-white/40 ml-2 uppercase px-2 py-1 bg-white/10 rounded">{b.type}</span></p>
                <p className="text-sm text-white/50">{b.phone} • {new Date(b.travelDate).toLocaleDateString()}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Pending
              </span>
            </div>
          ))}
          {pendingBookings === 0 && (
            <p className="text-white/40 text-center py-4">No pending bookings right now.</p>
          )}
        </div>
      </div>
    </div>
  );
}
