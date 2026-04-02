import { LayoutDashboard, Car, Bus, Package, CalendarCheck, LogOut } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'packages', label: 'Travel Packages', icon: <Package size={20} /> },
    { id: 'cars', label: 'Cars', icon: <Car size={20} /> },
    { id: 'buses', label: 'Buses', icon: <Bus size={20} /> },
    { id: 'bookings', label: 'Bookings', icon: <CalendarCheck size={20} /> }
  ];

  return (
    <aside className="w-64 bg-black border-r border-white/10 h-screen sticky top-0 flex flex-col p-6 overflow-y-auto hidden md:flex">
      <div className="mb-10 text-center">
        <div className="inline-block bg-primary/20 text-primary border border-primary/30 rounded-full p-3 mb-3">
          <span className="text-2xl">⚡</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-wide">Admin Panel</h2>
        <p className="text-xs text-white/40">Jyothu Travels</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
              activeTab === item.id 
              ? 'bg-primary text-white shadow-[0_0_15px_rgba(108,99,255,0.4)]' 
              : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10 mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
