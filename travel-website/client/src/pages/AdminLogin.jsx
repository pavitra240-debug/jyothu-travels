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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-block bg-emerald-500 rounded-full p-4 mb-4">
              <span className="text-4xl">🔐</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Admin Access
            </h1>
            <p className="text-emerald-200">Jyothu Travels Management System</p>
          </div>

          {/* Login Card */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-2xl p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@jyothutravels.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-300 rounded-lg text-red-800 text-sm">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>

            <div className="pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-600 text-center mb-3">
                This is a secure admin area. Only authorized personnel should access.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                <p className="font-semibold mb-2">🔑 Admin Login</p>
                <p className="text-xs">Contact system administrator for login credentials.</p>
              </div>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-8 text-center text-emerald-200 text-xs">
            <p>🛡️ Secured Connection • Encrypted Data</p>
            <p className="mt-2">Copyright © 2024 Jyothu Travels. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

