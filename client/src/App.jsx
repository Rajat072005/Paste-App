import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import Loading from './components/Loading';

// lazy load pages
const Home = React.lazy(() => import('./components/Home'));
const Paste = React.lazy(() => import('./components/Paste'));
const ViewPaste = React.lazy(() => import('./components/ViewPaste'));
const ContactPage = React.lazy(() => import('./components/ContactPage'));
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

function RoutesWithTransition() {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // show loader on every location change
    setTransitioning(true);

    // Increased minimum duration to ensure smooth transitions
    const minDuration = 800; // increased from 600
    const timer = setTimeout(() => setTransitioning(false), minDuration);

    // If your pages are lazy this Suspense fallback will also show until the chunk loads.
    return () => clearTimeout(timer);
  }, [location]);
  

  return (
    
    <>

    
      {/* Suspense fallback handles the case when a lazy chunk is still loading */}
      <Suspense fallback={<Loading visible={true} loop={true} />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/pastes" element={<Paste />} />
          <Route path="/view/:id" element={<ViewPaste />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>

      {/* Overlay on every navigation for a consistent transition effect */}
      <Loading visible={transitioning} loop={true} />
    </>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen(prev => !prev);

  return (
    <>
    
      <BrowserRouter>
        <button className="toggle-btn" onClick={toggleNavbar}>☰</button>
        <Navbar isOpen={isOpen} toggleNavbar={toggleNavbar} />
        <RoutesWithTransition />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;


