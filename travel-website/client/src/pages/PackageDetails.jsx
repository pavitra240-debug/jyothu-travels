import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';
import { IMAGES } from '../config/images';

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/packages/${id}`)
      .then((res) => {
        setPkg(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Package not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Package Not Found</h1>
          <p className="text-slate-600 mb-8">{error || 'The package you are looking for does not exist.'}</p>
          <Link to="/packages" className="inline-block bg-[#1E90FF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1560D6] transition-colors">
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${pkg.name} - Travel Package`}
        description={pkg.description || 'Explore this amazing travel package'}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back button */}
          <Link to="/packages" className="inline-block text-[#1E90FF] font-semibold mb-8 hover:text-[#1560D6] transition">
            ← Back to Packages
          </Link>

          {/* Package card */}
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 mb-8">
            {/* Main image */}
            <div className="h-96 bg-slate-200 overflow-hidden">
              <img
                src={pkg.imageUrl || IMAGES.services.package}
                alt={pkg.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-8">
              <h1 className="text-5xl font-bold text-slate-900 mb-4">{pkg.name}</h1>
              
              <div className="flex flex-wrap gap-6 mb-8 text-sm text-slate-600 border-b border-slate-200 pb-8">
                <span className="flex items-center gap-2">
                  <span className="text-xl">📍</span> Destination Package
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-xl">⏱️</span> Multi-day Tour
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-xl">👥</span> Group & Individual
                </span>
              </div>

              {/* Price and action */}
              <div className="flex gap-6 items-center justify-between mb-12 bg-blue-50 p-6 rounded-xl">
                <div>
                  <p className="text-slate-600 mb-2">Starting from</p>
                  <p className="text-5xl font-bold text-[#1E90FF]">₹{pkg.price.toLocaleString()}</p>
                  <p className="text-sm text-slate-600 mt-2">per person / all-inclusive</p>
                </div>
                <Link
                  to="/booking"
                  className="bg-[#1E90FF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1560D6] transition-colors whitespace-nowrap"
                >
                  Book Now
                </Link>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Package Overview</h2>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {pkg.description || 'Experience the journey of a lifetime with this carefully curated travel package. Enjoy comfortable accommodation, guided tours, and unforgettable memories.'}
                </p>
              </div>

              {/* What's included */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">What's Included</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex gap-3 items-start p-4 bg-slate-50 rounded-lg">
                    <span className="text-2xl">✈️</span>
                    <div>
                      <h3 className="font-semibold text-slate-900">Transportation</h3>
                      <p className="text-sm text-slate-600">Comfortable travel between destinations</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start p-4 bg-slate-50 rounded-lg">
                    <span className="text-2xl">🏨</span>
                    <div>
                      <h3 className="font-semibold text-slate-900">Accommodation</h3>
                      <p className="text-sm text-slate-600">Quality hotels and resorts</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start p-4 bg-slate-50 rounded-lg">
                    <span className="text-2xl">🍽️</span>
                    <div>
                      <h3 className="font-semibold text-slate-900">Meals</h3>
                      <p className="text-sm text-slate-600">Breakfast, lunch, and dinner included</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start p-4 bg-slate-50 rounded-lg">
                    <span className="text-2xl">👨‍🏫</span>
                    <div>
                      <h3 className="font-semibold text-slate-900">Guided Tours</h3>
                      <p className="text-sm text-slate-600">Expert tour guides and sightseeing</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why book with us */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Book With Jyothu Travels?</h2>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <span className="text-green-600 font-bold">✓</span>
                    <p className="text-slate-700"><strong>Expert Planning:</strong> Carefully designed itineraries for unforgettable experiences</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-green-600 font-bold">✓</span>
                    <p className="text-slate-700"><strong>Best Prices:</strong> Competitive rates with no hidden charges</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-green-600 font-bold">✓</span>
                    <p className="text-slate-700"><strong>24/7 Support:</strong> Round-the-clock customer assistance</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-green-600 font-bold">✓</span>
                    <p className="text-slate-700"><strong>Safe & Secure:</strong> Insurance and safety measures included</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 p-8 bg-[#1E90FF] rounded-xl text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Book?</h3>
                <p className="mb-6 text-blue-100">Start your adventure today with Jyothu Travels</p>
                <Link
                  to="/booking"
                  className="inline-block bg-white text-[#1E90FF] px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
                >
                  Book This Package
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
