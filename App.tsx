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
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Register from "./components/Registration";
import Scanner from "./components/Scanner";
import LockScreen from "./screens/LockScreen";

const Home = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Schedule />
      <Tracks />
      <Prizes />
      <FAQ />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  const APP_ID = "hackx-website";
  const BACKEND_URL = "https://admin-panel-hackx-backend.onrender.com";

  const [loading, setLoading] = useState(true);
  const [locked, setLocked] = useState(false);
  const [checking, setChecking] = useState(true);

  const location = useLocation();

  useEffect(() => {
    let socket: WebSocket | null = null;

    const fetchInitialStatus = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/super/status?appId=${APP_ID}`
        );

        const data = await res.json();
        setLocked(data.allowed === false);
      } catch (err) {
        console.error("Initial status error:", err);
      } finally {
        setChecking(false);
      }
    };

    const connectWebSocket = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/super/ws-token?appId=${APP_ID}`
        );

        const { token } = await res.json();

        socket = new WebSocket(
          `wss://admin-panel-hackx-backend.onrender.com?token=${token}`
        );

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.appId === APP_ID) {
              setLocked(data.status === false);
            }
          } catch (err) {
            console.error("WebSocket message error:", err);
          }
        };

        socket.onerror = (err) => {
          console.error("WebSocket error:", err);
        };

        socket.onclose = () => {
          console.warn("WebSocket closed. Reconnecting in 3s...");
          setTimeout(connectWebSocket, 3000);
        };
      } catch (err) {
        console.error("WebSocket connection error:", err);
      }
    };

    fetchInitialStatus();
    connectWebSocket();

    return () => {
      if (socket) socket.close();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "unset";
  }, [loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  if (checking) return null;

  if (locked) return <LockScreen />;

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