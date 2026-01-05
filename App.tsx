import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Schedule from "./components/Schedule";
import Tracks from "./components/Tracks";
import Prizes from "./components/Prizes";
import Sponsors from "./components/Sponsors";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Register from "./components/Registration";
import Scanner from "./components/Scanner";

const Home = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Schedule />
      <Tracks />
      <Prizes />
      <Sponsors />
      <FAQ />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "unset";
  }, [loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full bg-white selection:bg-red-600 selection:text-white">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/scanner" element={<Scanner />} />
          </Routes>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
