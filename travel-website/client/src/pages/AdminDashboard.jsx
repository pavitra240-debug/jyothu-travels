import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Menu, X } from 'lucide-react';
import SEO from '../components/SEO';

import Sidebar from '../components/admin/Sidebar';
import Overview from '../components/admin/Overview';
import ServicesManager from '../components/admin/ServicesManager';
import BookingsManager from '../components/admin/BookingsManager';

function useAdminApi() {
  const token = localStorage.getItem('jyothu_admin_token');
  const client = axios.create({
    baseURL: '/api/admin',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return client;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const api = useAdminApi();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [cars, setCars] = useState([]);
  const [buses, setBuses] = useState([]);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('jyothu_admin_token');
    if (!token) {
      navigate('/admin-login');
      return;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  async function loadData() {
    setLoading(true);
    try {
      const [carsRes, busesRes, packagesRes, bookingsRes] = await Promise.all([
        api.get('/cars'),
        api.get('/buses'),
        api.get('/packages'),
        api.get('/bookings')
      ]);
      setCars(carsRes.data);
      setBuses(busesRes.data);
      setPackages(packagesRes.data);
      setBookings(bookingsRes.data);
    } catch (e) {
      if (e.response?.status === 401) {
        localStorage.removeItem('jyothu_admin_token');
        navigate('/admin-login?session_expired=true');
      } else {
        toast.error('Unable to load admin data');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('jyothu_admin_token');
    navigate('/admin-login');
    toast.success('Logged out successfully');
  }

  async function handleAddService(data, file, type) {
    const toastId = toast.loading(`Adding new ${type}...`);
    try {
      let imageUrl = data.imageUrl;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const token = localStorage.getItem('jyothu_admin_token');
        const res = await fetch('/api/admin/upload-image', {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formData
        });
        if (res.ok) {
          const json = await res.json();
          imageUrl = json.url;
        }
      }

      const payload = { ...data, imageUrl };
      await api.post(`/add-${type}`, payload);
      toast.success(`Successfully added ${type}`, { id: toastId });
      await loadData();
    } catch (error) {
      toast.error(`Failed to add ${type}`, { id: toastId });
    }
  }

  async function handleDelete(type, id) {
    const confirm = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (!confirm) return;
    
    try {
      await api.delete(`/delete/${type}/${id}`);
      toast.success('Item deleted successfully');
      await loadData();
    } catch (error) {
      toast.error('Failed to delete item');
    }
  }

  async function handleUpdatePrice(type, id, price) {
    try {
      await api.patch(`/update-price/${type}/${id}`, { price });
      toast.success('Price updated successfully');
      await loadData();
    } catch (error) {
      toast.error('Failed to update price');
    }
  }

  async function handleBookingStatus(id, status) {
    try {
      await api.patch(`/bookings/${id}`, { status });
      toast.success(`Booking marked as ${status}`);
      await loadData();
    } catch (error) {
      toast.error(`Failed to update booking status`);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-primary border-r-transparent border-b-transparent"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview data={{ cars, buses, packages, bookings }} />;
      case 'packages':
        return <ServicesManager type="package" data={packages} onAdd={handleAddService} onDelete={handleDelete} onUpdatePrice={handleUpdatePrice} />;
      case 'cars':
        return <ServicesManager type="car" data={cars} onAdd={handleAddService} onDelete={handleDelete} onUpdatePrice={handleUpdatePrice} />;
      case 'buses':
        return <ServicesManager type="bus" data={buses} onAdd={handleAddService} onDelete={handleDelete} onUpdatePrice={handleUpdatePrice} />;
      case 'bookings':
        return <BookingsManager bookings={bookings} onUpdateStatus={handleBookingStatus} />;
      default:
        return <Overview data={{ cars, buses, packages, bookings }} />;
    }
  };

  return (
    <>
      <SEO title="Admin Dashboard | Jyothu Travels" />
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1a1a1a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      }} />

      <div className="min-h-screen bg-black text-white flex overflow-hidden">
        
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

        {/* Sidebar (Desktop) */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

        {/* Mobile Header & Sidebar */}
        <div className="md:hidden fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between p-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h2 className="text-lg font-bold">Admin Panel</h2>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/95 pt-20 flex flex-col p-6">
            <Sidebar activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setIsMobileMenuOpen(false); }} onLogout={handleLogout} />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto h-screen relative z-10 p-6 md:p-10 pt-24 md:pt-10 scrollbar-hide">
          {renderContent()}
        </main>
      </div>
    </>
  );
}
