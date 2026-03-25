import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import CornerLogo from './components/CornerLogo';
import Home from './pages/Home';
import Services from './pages/Services';
import PackageDetails from './pages/PackageDetails';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FloatingContact from './components/FloatingContact';
import ScrollToTop from './components/ScrollToTop';
import GlobalBgShapes from './components/GlobalBgShapes';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <GlobalBgShapes />
      <CornerLogo />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <FloatingContact />
      <Footer />
    </div>
  );
}

