import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';
import { IMAGES } from '../config/images';

export default function Buses() {
  const [buses, setBuses] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/buses')
      .then((res) => setBuses(res.data))
      .catch(() => setBuses([]));
  }, []);

  return (
    <>
      <SEO
        title="Bus Rental & Booking"
        description="Book buses for group travel, weddings, and pilgrimages with Jyothu Travels – comfortable AC and non-AC buses with professional staff."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Buses for Group Travel
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Comfortable and spacious buses for groups of any size. Perfect for weddings, pilgrimages, corporate events, and family tours with experienced staff.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
            {buses.map((bus) => (
              <article
                key={bus._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredId(bus._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={IMAGES.services.bus}
                    alt={bus.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredId === bus._id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-bold text-xl text-slate-900 mb-2">{bus.name}</h2>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {bus.description || 'Comfortable bus for group travel'}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[#1E90FF] font-bold text-2xl">
                      ₹{bus.pricePerDay || bus.price}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                  <button 
                    onClick={() => navigate(`/booking?type=bus&id=${bus._id}`)}
                    className="w-full bg-[#1E90FF] text-white py-2 rounded-lg font-semibold hover:bg-[#1560D6] transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </article>
            ))}
          </div>

          {buses.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-lg mb-4">No buses listed yet</p>
              <p className="text-slate-400">Contact us for availability and custom quotes</p>
            </div>
          )}blue-50 to-blue

          {/* Features section */}
          <section className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Bus Travel Features</h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="text-5xl mb-4">❄️</div>
                <h4 className="font-semibold text-slate-900 mb-2 text-lg">AC & Non-AC Options</h4>
                <p className="text-slate-600 text-sm">Choose comfort level that suits your needs</p>
              </div>
              <div>
                <div className="text-5xl mb-4">📺</div>
                <h4 className="font-semibold text-slate-900 mb-2 text-lg">Entertainment Systems</h4>
                <p className="text-slate-600 text-sm">Enjoy your journey with music and entertainment</p>
              </div>
              <div>
                <div className="text-5xl mb-4">👨‍💼</div>
                <h4 className="font-semibold text-slate-900 mb-2 text-lg">Professional Staff</h4>
                <p className="text-slate-600 text-sm">Trained drivers and conductors for your safety</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

