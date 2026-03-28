import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';

// Simple confetti animation
function Confetti() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2 + Math.random(),
    }));
    setParticles(confettiPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2 animate-pulse"
          style={{
            left: `${p.left}%`,
            top: '-10px',
            animation: `fall ${p.duration}s linear ${p.delay}s forwards`,
            backgroundColor: ['#0b6e4f', '#ff7a59', '#f6f8fa'][Math.floor(Math.random() * 3)],
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    travelDate: '',
    people: 1,
    type: 'package',
    serviceId: '',
    message: '',
    website: '' // honeypot field
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // On mount, pre-fill form if query params exist
  useEffect(() => {
    const paramType = searchParams.get('type');
    const paramId = searchParams.get('id');
    
    if (paramType && ['car', 'bus', 'package'].includes(paramType)) {
      setForm(prev => ({
        ...prev,
        type: paramType,
        serviceId: paramId || ''
      }));
    }
  }, [searchParams]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post('/api/booking', {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        travelDate: form.travelDate,
        numberOfPeople: Number(form.people),
        message: form.message.trim(),
        type: form.type,
        serviceId: form.serviceId ? form.serviceId.trim() : null,
        website: form.website // Honeypot field - bots will fill this
      });
      setStatus('success');
      setStep(4);
      setTimeout(() => {
        setForm({
          name: '',
          phone: '',
          email: '',
          travelDate: '',
          people: 1,
          type: 'package',
          serviceId: '',
          message: ''
        });
        setStep(1);
      }, 3000);
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  const isStep1Complete = form.name && form.phone && form.email;
  const isStep2Complete = form.travelDate && form.people && form.type;

  return (
    <>
      <SEO
        title="Book Your Journey - Jyothu Travels"
        description="Book travel packages, car rental or bus services from Hubli with Jyothu Travels and Tourism – secure online booking with instant confirmation."
      />
      <div className="relative min-h-screen bg-black overflow-hidden pt-28 pb-20 text-white">
        
        {/* Global animated shapes are now handled by GlobalBgShapes component in App.jsx */}

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold text-shine mb-4">
               Book Your Journey
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg font-light">
              Easy and secure booking in just 3 steps. Our team will confirm your travel details within 2 hours.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid gap-4 md:grid-cols-4 mb-12">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center hover:border-primary/50 transition-colors shadow-lg group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🔒</div>
              <p className="text-sm font-bold text-white">Secure Booking</p>
              <p className="text-xs text-white/50">SSL encrypted</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center hover:border-primary/50 transition-colors shadow-lg group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">⚡</div>
              <p className="text-sm font-bold text-white">Quick Response</p>
              <p className="text-xs text-white/50">Within 2 hours</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center hover:border-primary/50 transition-colors shadow-lg group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💰</div>
              <p className="text-sm font-bold text-white">Best Prices</p>
              <p className="text-xs text-white/50">Price match guarantee</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center hover:border-primary/50 transition-colors shadow-lg group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🌟</div>
              <p className="text-sm font-bold text-white">5-Star Rated</p>
              <p className="text-xs text-white/50">500+ happy travelers</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center flex-1 z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-3 transition-all duration-500 border-2 ${
                      step >= s
                        ? 'bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-[0_0_20px_rgba(108,99,255,0.6)]'
                        : 'bg-black/50 text-white/40 border-white/20'
                    }`}
                  >
                    {step > s ? '✓' : s}
                  </div>
                  <p className={`text-xs font-bold text-center tracking-wider uppercase transition-colors duration-300 ${step >= s ? 'text-primary' : 'text-white/40'}`}>
                    {s === 1 && 'Your Info'}
                    {s === 2 && 'Travel Date'}
                    {s === 3 && 'Review'}
                  </p>
                </div>
              ))}
            </div>
            <div className="h-2 bg-white/10 rounded-full relative -top-20 z-0 mx-6">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(108,99,255,0.5)]"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          {step < 4 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (step === 3) {
                  handleSubmit(e);
                } else {
                  setStep(step + 1);
                }
              }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/10"
            >
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-3xl font-bold text-white mb-8">
                    Your Information
                  </h2>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-white/30 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="10-digit phone number"
                      className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-white/30 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-white/30 text-white"
                    />
                  </div>
                  {/* Honeypot field (hidden from users) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Travel Details */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-3xl font-bold text-white mb-8">
                    Travel Details
                  </h2>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      name="travelDate"
                      value={form.travelDate}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-white [color-scheme:dark]"
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2">
                        Number of Travelers *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        name="people"
                        value={form.people}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2">
                        Booking For *
                      </label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-white [&>option]:bg-slate-900"
                      >
                        <option value="package">📦 Travel Package</option>
                        <option value="car">🚗 Car Rental</option>
                        <option value="bus">🚌 Bus Booking</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Package / Car / Bus Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="serviceId"
                      value={form.serviceId}
                      onChange={handleChange}
                      placeholder="E.g., Goa Weekend Escape, Innova, Tempo Traveller"
                      className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-white/30 text-white"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Review & Message */}
              {step === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-3xl font-bold text-white mb-8">
                    Review & Special Requests
                  </h2>
                  <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20 mb-8 shadow-inner backdrop-blur-md">
                    <h3 className="font-bold text-white mb-4 text-xl">Booking Summary</h3>
                    <div className="space-y-3 text-sm text-white/80">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span>Name:</span>
                        <span className="font-bold text-white">{form.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span>Phone:</span>
                        <span className="font-bold text-white">{form.phone}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span>Travel Date:</span>
                        <span className="font-bold text-white">{form.travelDate}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span>Travelers:</span>
                        <span className="font-bold text-white">{form.people} person(s)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-bold text-primary capitalize">{form.type}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Special Requests or Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your travel preferences, special requirements, or destinations you're interested in..."
                      className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-white/30 text-white resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 mt-10">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 px-6 py-4 border border-white/20 bg-white/5 rounded-xl font-bold text-white hover:bg-white/10 transition-colors duration-300"
                  >
                    ← Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={
                    loading ||
                    (step === 1 && !isStep1Complete) ||
                    (step === 2 && !isStep2Complete)
                  }
                  className={`flex-[2] px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                    loading || (step === 1 && !isStep1Complete) || (step === 2 && !isStep2Complete)
                      ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
                      : 'bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transform hover:scale-[1.02]'
                  }`}
                >
                  {loading ? '⏳ Processing...' : step === 3 ? '✓ Complete Booking' : 'Next Step →'}
                </button>
              </div>
            </form>
          )}

          {/* Success Screen */}
          {step === 4 && (
            <>
              <Confetti />
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(108,99,255,0.2)] p-12 border border-white/10 text-center animate-fadeIn">
                <div className="mb-8 animate-bounce text-8xl drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">🎉</div>
                <h2 className="text-4xl md:text-5xl font-bold text-shine mb-6">
                  Congratulations!
                </h2>
                <p className="text-secondary font-bold text-xl mb-4 tracking-wide">
                  Your booking request has been received
                </p>
                <p className="text-white/70 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                  Thank you for choosing Jyothu Travels! Our team will contact you on{' '}
                  <span className="font-bold text-white bg-white/10 px-2 py-1 rounded">{form.phone}</span> within 2 hours to confirm your travel details.
                </p>
                <div className="bg-primary/20 backdrop-blur-sm rounded-2xl p-6 mb-10 inline-block border border-primary/30 shadow-xl">
                  <p className="text-sm text-white/70 mb-2 uppercase tracking-widest font-bold">
                    📧 Confirmation email sent to
                  </p>
                  <p className="font-bold text-white text-xl tracking-wide">{form.email}</p>
                </div>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3 mb-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-primary/40 transition-colors">
                      <p className="text-3xl mb-3">📱</p>
                      <p className="text-sm font-bold text-white mb-1">Quick Response</p>
                      <p className="text-xs text-white/50">Within 2 hours</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-primary/40 transition-colors">
                      <p className="text-3xl mb-3 glow-text text-green-400">✓</p>
                      <p className="text-sm font-bold text-white mb-1">Confirmed Booking</p>
                      <p className="text-xs text-white/50">End-to-end support</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-primary/40 transition-colors">
                      <p className="text-3xl mb-3">💰</p>
                      <p className="text-sm font-bold text-white mb-1">Best Prices</p>
                      <p className="text-xs text-white/50">Guaranteed</p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-12 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all duration-300 transform hover:scale-105 tracking-widest uppercase text-sm"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

