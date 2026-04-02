import { useState } from 'react';
import { Search, Plus, Trash2, Edit, X } from 'lucide-react';

export default function ServicesManager({ type, data, onAdd, onDelete, onUpdatePrice }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const [file, setFile] = useState(null);

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await onAdd(form, file, type);
    setIsAdding(false);
    setForm({ name: '', description: '', price: '', imageUrl: '' });
    setFile(null);
  }

  const typeName = type.charAt(0).toUpperCase() + type.slice(1) + (type === 'bus' ? 'es' : 's');

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Manage {typeName}</h2>
          <p className="text-white/60">Add, edit, or remove {type} listings.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all"
        >
          <Plus size={20} /> Add New {typeName}
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
        <input 
          type="text" 
          placeholder={`Search ${typeName}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {isAdding && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl mb-6 relative">
          <button onClick={() => setIsAdding(false)} className="absolute top-4 right-4 text-white/40 hover:text-white">
            <X size={24} />
          </button>
          <h3 className="text-xl font-bold text-white mb-6">Add New {typeName}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input required placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
              <input required type="number" placeholder="Price (₹)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <textarea required placeholder="Description" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Image URL (Optional)" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80" />
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all">Save {typeName}</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredData.map(item => (
          <div key={item._id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
            <div className="h-48 bg-black/40 relative">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-white/20 font-bold">No Image</div>
              )}
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white font-black">
                ₹{item.price}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-white text-lg mb-2">{item.name}</h3>
              <p className="text-white/60 text-sm line-clamp-2 mb-4 flex-1">{item.description}</p>
              <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                <input 
                  type="number" 
                  defaultValue={item.price}
                  onBlur={(e) => onUpdatePrice(type, item._id, e.target.value)}
                  placeholder="Update Price"
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                />
                <button 
                  onClick={() => onDelete(type, item._id)}
                  className="p-2 text-white/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div className="col-span-full py-12 text-center text-white/40">
            No {type}s found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
