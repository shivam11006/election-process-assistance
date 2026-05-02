import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';

/**
 * Component Preloading Helper
 * Allows us to fetch chunks before the user clicks on a link
 */
const preloadDashboard = () => import('./pages/Dashboard');
const preloadTimeline = () => import('./pages/Timeline');
const preloadChat = () => import('./pages/ChatAssistant');

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(preloadDashboard);
const ChatAssistant = lazy(preloadChat);
const Timeline = lazy(preloadTimeline);
const Eligibility = lazy(() => import('./pages/Eligibility'));
const Booths = lazy(() => import('./pages/Booths'));

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { user } = useAuth();

  // TASK 6: OPTIONAL PRELOADING
  useEffect(() => {
    // Preload Timeline after landing (Home page)
    if (window.location.pathname === '/') {
      const timer = setTimeout(preloadTimeline, 2000); // Wait 2s after landing
      return () => clearTimeout(timer);
    }
    
    // Preload Dashboard and Chat after login
    if (user) {
      preloadDashboard();
      preloadChat();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-6 w-full">
        <Routes>
          {/* Landing page loads instantly */}
          <Route path="/" element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          } />

          <Route path="/login" element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          } />

          <Route path="/register" element={
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          } />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            </PrivateRoute>
          } />

          <Route path="/chat" element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <ChatAssistant />
              </Suspense>
            </PrivateRoute>
          } />

          <Route path="/timeline" element={
            <Suspense fallback={<Loader />}>
              <Timeline />
            </Suspense>
          } />

          <Route path="/eligibility" element={
            <Suspense fallback={<Loader />}>
              <Eligibility />
            </Suspense>
          } />

          <Route path="/booths" element={
            <Suspense fallback={<Loader />}>
              <Booths />
            </Suspense>
          } />

          {/* Catch all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;


