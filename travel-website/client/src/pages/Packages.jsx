import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { IMAGES } from '../config/images';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    axios
      .get('/api/packages')
      .then((res) => setPackages(res.data))
      .catch(() => {
        setPackages([]);
      });
  }, []);

  return (
    <>
      <SEO
        title="Travel Packages"
        description="Explore curated travel packages from Hubli - weekend getaways, family tours, group trips, and custom itineraries designed for memorable adventures."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Travel Packages
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Discover carefully curated travel packages for weekend getaways, family vacations, group adventures, and custom itineraries. All packages include transport, accommodation, and guided tours.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
            {packages.map((p) => (
              <article
                key={p._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredId(p._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={IMAGES.services.package}
                    alt={p.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredId === p._id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-bold text-xl text-slate-900 mb-2">{p.name}</h2>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {p.description || 'A wonderful travel experience awaits you'}
                  </p>
                  <div className="flex justify-between items-center mb-6 text-sm text-slate-600">
                    <span>🗓️ Multi-day Tour</span>
                    <span>🎒 All-inclusive</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#1E90FF]">₹{p.price}</span>
                    <Link to={`/packages/${p._id}`} className="bg-[#1E90FF] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1560D6] transition-colors duration-300">
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {packages.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-lg mb-4">No packages listed yet</p>
              <p className="text-slate-400">Contact us to customize a perfect package for you</p>
            </div>
          )}

          {/* Package types section */}
          <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Package Types</h3>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
                <h4 className="font-semibold text-slate-900 mb-2 text-lg">Family Tours</h4>
                <p className="text-slate-600 text-sm">Create lasting memories with loved ones</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🙏</div>
                <h4 className="font-semibold text-slate-900 mb-2 text-lg">Pilgrimages</h4>
                <p className="text-slate-600 text-sm">Spiritual journeys with guided tours</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">👥</div>
                <h4 className="font-semibold text-slate-900 mb-2 text-lg">Group Tours</h4>
                <p className="text-slate-600 text-sm">Perfect for friends and organizations</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">⚙️</div>
                <h4 className="font-semibold text-slate-900 mb-2 text-lg">Custom Packages</h4>
                <p className="text-slate-600 text-sm">Tailor-made itineraries for you</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Why choose packages */}
      <section className="mt-12 bg-white rounded-2xl p-8 md:p-12 border border-slate-100 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Choose Our Packages?</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Expert Planning</h4>
              <p className="text-slate-600 text-sm">Itineraries designed by travel experts</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Best Rates</h4>
              <p className="text-slate-600 text-sm">Competitive pricing with no hidden costs</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">24/7 Support</h4>
              <p className="text-slate-600 text-sm">Round-the-clock customer assistance</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Flexible Dates</h4>
              <p className="text-slate-600 text-sm">Customize your travel dates</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Safe Travel</h4>
              <p className="text-slate-600 text-sm">Insurance & safety measures included</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Local Expertise</h4>
              <p className="text-slate-600 text-sm">Insider knowledge of destinations</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

