import { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function BookingsManager({ bookings, onUpdateStatus }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredBookings = bookings
    .filter(b => filter === 'All' || b.status === filter)
    .filter(b => 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm)
    );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Manage Bookings</h2>
        <p className="text-white/60">Review and process customer booking requests.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Pending', 'Accepted', 'Rejected'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === f 
                ? 'bg-primary text-white shadow-[0_0_15px_rgba(108,99,255,0.3)]' 
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-white/10">
                <th className="p-4 text-sm font-bold text-white/60 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-sm font-bold text-white/60 uppercase tracking-wider">Service</th>
                <th className="p-4 text-sm font-bold text-white/60 uppercase tracking-wider">Details</th>
                <th className="p-4 text-sm font-bold text-white/60 uppercase tracking-wider">Status</th>
                <th className="p-4 text-sm font-bold text-white/60 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(b => (
                <tr key={b._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-white">{b.name}</p>
                    <p className="text-sm text-white/50">{b.email}</p>
                    <p className="text-sm text-white/50">{b.phone}</p>
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 bg-white/10 rounded text-xs font-bold text-white uppercase tracking-wider mb-1">
                      {b.type}
                    </span>
                    <p className="text-sm text-white/80">{b.serviceId || 'General'}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-white/80"><span className="text-white/40">Date:</span> {new Date(b.travelDate).toLocaleDateString()}</p>
                    <p className="text-sm text-white/80"><span className="text-white/40">People:</span> {b.numberOfPeople}</p>
                    {b.message && (
                      <p className="text-xs text-white/50 mt-1 max-w-[200px] truncate" title={b.message}>
                        <span className="text-white/40">Note:</span> {b.message}
                      </p>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${
                      b.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      b.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {b.status === 'Pending' && <Clock size={12} />}
                      {b.status === 'Accepted' && <CheckCircle size={12} />}
                      {b.status === 'Rejected' && <XCircle size={12} />}
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {b.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => onUpdateStatus(b._id, 'Accepted')}
                          className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors text-xs font-bold"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => onUpdateStatus(b._id, 'Rejected')}
                          className="px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-xs font-bold"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBookings.length === 0 && (
            <div className="p-8 text-center text-white/40">
              No bookings found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
