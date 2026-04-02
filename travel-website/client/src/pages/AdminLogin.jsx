import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('jyothu_admin_token', res.data.token);
      navigate('/admin-dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SEO
        title="Admin Login"
        description="Admin login for Jyothu Travels and Tourism to manage travel packages, cars, buses and bookings."
      />
      <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 relative overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

        <div className="max-w-md w-full relative z-10">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-block bg-primary/20 text-primary border border-primary/30 rounded-full p-4 mb-4 shadow-[0_0_30px_rgba(108,99,255,0.3)]">
              <span className="text-4xl text-white">🔐</span>
            </div>
            <h1 className="text-4xl font-black text-shine mb-2">
              Admin Access
            </h1>
            <p className="text-white/60 font-medium tracking-wide">Jyothu Travels Management System</p>
          </div>

          {/* Login Card */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/10"
          >
            <div>
              <label className="block text-sm font-bold text-white/80 mb-3 tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@jyothutravels.com"
                className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-white placeholder-white/30"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-white/80 mb-3 tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-white placeholder-white/30"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm font-medium backdrop-blur-sm">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>

            <div className="pt-6 border-t border-white/10">
              <p className="text-xs text-white/40 text-center mb-3">
                This is a secure admin area. Only authorized personnel should access.
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-sm text-primary">
                <p className="font-bold mb-2 text-white">🔑 Admin Login</p>
                <p className="text-xs text-white/50">Contact system administrator for login credentials.</p>
              </div>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-8 text-center text-white/30 text-xs">
            <p>🛡️ Secured Connection • Encrypted Data</p>
            <p className="mt-2">Copyright © 2024 Jyothu Travels. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

