import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import CornerLogo from './components/CornerLogo';
import FloatingContact from './components/FloatingContact';
import ScrollToTop from './components/ScrollToTop';
import GlobalBgShapes from './components/GlobalBgShapes';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const PackageDetails = lazy(() => import('./pages/PackageDetails'));
const Booking = lazy(() => import('./pages/Booking'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const About = lazy(() => import('./pages/About'));

// Global Fallback Loader
function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 rounded-full border-t-4 border-primary border-opacity-30 animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-accent animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col font-inter bg-dark-900 text-white">
      <ScrollToTop />
      <GlobalBgShapes />
      <CornerLogo />
      <Navbar />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A27',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin-dashboard/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <FloatingContact />
      <Footer />
    </div>
  );
}

