import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

function useAdminApi() {
  const token = localStorage.getItem('jyothu_admin_token');
  const client = axios.create({
    baseURL: '/api/admin',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return client;
}

function ServiceForm({ title, onSubmit, type }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [file, setFile] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let imageUrl = form.imageUrl;
    if (file) {
      const token = localStorage.getItem('jyothu_admin_token');
      const data = new FormData();
      data.append('image', file);
      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: data
      });
      if (res.ok) {
        const json = await res.json();
        imageUrl = json.url;
      }
    }
    await onSubmit({ ...form, imageUrl, type });
    setForm({ name: '', description: '', price: '', imageUrl: '' });
    setFile(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-3"
    >
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows="2"
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
      />
      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="Image URL (optional – will be overwritten if a file is uploaded)"
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-light"
      >
        Add
      </button>
    </form>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const api = useAdminApi();
  const [cars, setCars] = useState([]);
  const [buses, setBuses] = useState([]);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  // Check if token exists on mount
  useEffect(() => {
    const token = localStorage.getItem('jyothu_admin_token');
    if (!token) {
      navigate('/admin-login');
      return;
    }
  }, [navigate]);

  async function loadData() {
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
      setError(null);
    } catch (e) {
      if (e.response?.status === 401) {
        localStorage.removeItem('jyothu_admin_token');
        navigate('/admin-login?session_expired=true');
      } else {
        setError('Unable to load admin data. Please try again.');
      }
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogout() {
    localStorage.removeItem('jyothu_admin_token');
    navigate('/admin-login');
  }

  async function handleAddService(data) {
    if (data.type === 'car') {
      await api.post('/add-car', data);
    } else if (data.type === 'bus') {
      await api.post('/add-bus', data);
    } else if (data.type === 'package') {
      await api.post('/add-package', data);
    }
    await loadData();
  }

  async function handleDelete(type, id) {
    await api.delete(`/delete/${type}/${id}`);
    await loadData();
  }

  async function handleUpdatePrice(type, id, price) {
    await api.patch(`/update-price/${type}/${id}`, { price });
    await loadData();
  }

  async function handleBookingStatus(id, status) {
    await api.patch(`/bookings/${id}`, { status });
    await loadData();
  }

  return (
    <>
      <SEO title="Admin Dashboard" />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

        <section className="grid gap-6 md:grid-cols-3">
          <ServiceForm
            title="Add new car"
            type="car"
            onSubmit={handleAddService}
          />
          <ServiceForm
            title="Add new bus"
            type="bus"
            onSubmit={handleAddService}
          />
          <ServiceForm
            title="Add new travel package"
            type="package"
            onSubmit={handleAddService}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Manage services
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[{ label: 'Cars', data: cars, type: 'car' }].map(({ label, data, type }) => (
              <div key={label}>
                <h3 className="font-semibold mb-2">{label}</h3>
                <div className="space-y-2 text-sm">
                  {data.map((item) => (
                    <div
                      key={item._id}
                      className="border border-slate-200 rounded-lg p-3 flex flex-col gap-1"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-slate-500 line-clamp-2">
                        {item.description}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          defaultValue={item.price}
                          onBlur={(e) =>
                            handleUpdatePrice(type, item._id, e.target.value)
                          }
                          className="w-20 rounded-md border border-slate-200 px-2 py-1 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleDelete(type, item._id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {data.length === 0 && (
                    <p className="text-xs text-slate-400">No {label} yet.</p>
                  )}
                </div>
              </div>
            ))}
            {[{ label: 'Buses', data: buses, type: 'bus' }].map(({ label, data, type }) => (
              <div key={label}>
                <h3 className="font-semibold mb-2">{label}</h3>
                <div className="space-y-2 text-sm">
                  {data.map((item) => (
                    <div
                      key={item._id}
                      className="border border-slate-200 rounded-lg p-3 flex flex-col gap-1"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-slate-500 line-clamp-2">
                        {item.description}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          defaultValue={item.price}
                          onBlur={(e) =>
                            handleUpdatePrice(type, item._id, e.target.value)
                          }
                          className="w-20 rounded-md border border-slate-200 px-2 py-1 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleDelete(type, item._id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {data.length === 0 && (
                    <p className="text-xs text-slate-400">No {label} yet.</p>
                  )}
                </div>
              </div>
            ))}
            {[{ label: 'Packages', data: packages, type: 'package' }].map(
              ({ label, data, type }) => (
                <div key={label}>
                  <h3 className="font-semibold mb-2">{label}</h3>
                  <div className="space-y-2 text-sm">
                    {data.map((item) => (
                      <div
                        key={item._id}
                        className="border border-slate-200 rounded-lg p-3 flex flex-col gap-1"
                      >
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-slate-500 line-clamp-2">
                          {item.description}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="text"
                            defaultValue={item.price}
                            onBlur={(e) =>
                              handleUpdatePrice(type, item._id, e.target.value)
                            }
                            className="w-20 rounded-md border border-slate-200 px-2 py-1 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => handleDelete(type, item._id)}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    {data.length === 0 && (
                      <p className="text-xs text-slate-400">No {label} yet.</p>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Booking requests
          </h2>
          <div className="space-y-3 text-sm">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="border border-slate-200 rounded-lg p-3 flex flex-col gap-1 bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {b.name} – {b.type.toUpperCase()}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      b.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : b.status === 'Accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {b.phone} · {b.email}
                  <br />
                  Date: {new Date(b.travelDate).toLocaleDateString()} · People:{' '}
                  {b.numberOfPeople}
                </div>
                {b.message && (
                  <div className="text-xs text-slate-600 mt-1">
                    Message: {b.message}
                  </div>
                )}
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleBookingStatus(b._id, 'Accepted')}
                    className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBookingStatus(b._id, 'Rejected')}
                    className="px-3 py-1 rounded-full bg-red-600 text-white text-xs"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {bookings.length === 0 && (
              <p className="text-xs text-slate-400">No bookings yet.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

