import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';
import { IMAGES } from '../config/images';

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/cars')
      .then((res) => setCars(res.data))
      .catch(() => setCars([]));
  }, []);

  return (
    <>
      <SEO
        title="Car Rental Hubli"
        description="Book car rental in Hubli with Jyothu Travels and Tourism – sedans, SUVs and premium cars with experienced drivers for local and outstation trips."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Car Rental in Hubli
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Clean, comfortable cars with professional drivers for local, outstation trips and special occasions. Choose from our fleet of well-maintained vehicles.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
            {cars.map((car) => (
              <article
                key={car._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredId(car._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={IMAGES.services.car}
                    alt={car.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredId === car._id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-bold text-xl text-slate-900 mb-2">{car.name}</h2>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {car.description || 'Premium vehicle for your comfort'}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[#1E90FF] font-bold text-2xl">
                      ₹{car.pricePerDay || car.price}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                  <button 
                    onClick={() => navigate(`/booking?type=car&id=${car._id}`)}
                    className="w-full bg-[#1E90FF] text-white py-2 rounded-lg font-semibold hover:bg-[#1560D6] transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </article>
            ))}
          </div>

          {cars.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-lg mb-4">No cars listed yet</p>
              <p className="text-slate-400">Contact us for availability and custom quotes</p>
            </div>
          )}blue-50 to-blue

          {/* Why choose us section */}
          <section className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why Choose Our Cars?</h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="text-5xl mb-4">🛡️</div>
                <h4 className="font-semibold text-slate-900 mb-2 text-lg">Well Maintained</h4>
                <p className="text-slate-600 text-sm">Regular servicing and safety checks ensure your safety</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">👨‍💼</div>
                <h4 className="font-semibold text-slate-900 mb-2 text-lg">Professional Drivers</h4>
                <p className="text-slate-600 text-sm">Courteous, trained drivers with excellent track record</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">💰</div>
                <h4 className="font-semibold text-slate-900 mb-2 text-lg">Best Rates</h4>
                <p className="text-slate-600 text-sm">Transparent pricing with no hidden charges</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

