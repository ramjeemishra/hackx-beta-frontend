import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { Trophy, Zap, Maximize2 } from "lucide-react";

interface Attendee {
  id: string;
  name: string;
  team: string;
  role: string;
  time: string;
  avatar: string;
}

const F1ScannerApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const [status, setStatus] = useState<"READY" | "SCANNING" | "SUCCESS">("READY");
  const [last, setLast] = useState<Attendee | null>(null);
  const [history, setHistory] = useState<Attendee[]>([]);

  useEffect(() => {
    if (!videoRef.current) return;

    scannerRef.current = new QrScanner(
      videoRef.current,
      (result) => onScanSuccess(result.data),
      {
        preferredCamera: "environment",
        maxScansPerSecond: 25,
        highlightScanRegion: false,
        highlightCodeOutline: false,
        returnDetailedScanResult: true,
      }
    );

    return () => {
      scannerRef.current?.stop();
      scannerRef.current?.destroy();
      scannerRef.current = null;
    };
  }, []);

  const onScanSuccess = (data: string) => {
    try {
      const parsed = JSON.parse(data);

      const attendee: Attendee = {
        id: parsed.id,
        name: parsed.name,
        team: parsed.team,
        role: parsed.role || "Participant",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsed.id}`,
      };

      setLast(attendee);
      setHistory((prev) => [attendee, ...prev.slice(0, 9)]);
      setStatus("SUCCESS");

      scannerRef.current?.stop();

      setTimeout(() => {
        setStatus("READY");
        scannerRef.current?.start();
      }, 2000);

    } catch {
      setStatus("READY");
    }
  };
const requestCameraPermission = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (err) {
    console.error("Camera permission denied", err);
    return false;
  }
};

const startCameraScan = async () => {
  if (!scannerRef.current) return;

  const allowed = await requestCameraPermission();
  if (!allowed) {
    alert("Camera permission is required to scan QR codes.");
    return;
  }

  try {
    setStatus("SCANNING");
    await scannerRef.current.start();
  } catch (err) {
    console.error("Failed to start scanner", err);
    setStatus("READY");
  }
};



  const scanFromImage = async (file: File) => {
    try {
      const result = await QrScanner.scanImage(file, {
        returnDetailedScanResult: true,
      });
      onScanSuccess(result.data);
    } catch {
      setStatus("READY");
    }
  };

  return (
    <div className="min-h-screen bg-[#15151E] text-white flex flex-col p-6">
      <header className="flex items-center gap-4 mb-6">
        <div className="bg-red-600 p-2 skew-x-[-12deg]">
          <Trophy className="text-white skew-x-[12deg]" />
        </div>
        <h1 className="text-2xl font-black italic uppercase">
          Grand Prix <span className="text-red-600">Hackathon</span>
        </h1>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-6">
        <section className="flex-1 relative bg-black/40 border border-white/10 overflow-hidden">
          <video
            ref={videoRef}
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${status === "SCANNING" ? "opacity-100" : "opacity-0"
              }`}
          />


          <div className="absolute inset-0 flex items-center justify-center">
            {status === "READY" && (
              <div className="flex flex-col items-center text-white/30 animate-pulse">
                <Maximize2 className="w-16 h-16 mb-4" />
                Awaiting QR
              </div>
            )}

            {status === "SCANNING" && (
              <div className="text-xl font-black italic uppercase animate-pulse">
                Scanning…
              </div>
            )}

            {status === "SUCCESS" && last && (
              <div className="bg-red-600 p-1 animate-pop">
                <div className="bg-black p-6 flex gap-6">
                  <img src={last.avatar} className="w-20 h-20" />
                  <div>
                    <h3 className="text-2xl font-black italic uppercase">
                      {last.name}
                    </h3>
                    <p className="text-white/60 uppercase text-sm">
                      {last.team}
                    </p>
                    <p className="text-xs font-mono mt-1">{last.time}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <aside className="w-full lg:w-96 flex flex-col gap-4">
          <button
            onClick={startCameraScan}
            className="py-5 bg-red-600 font-black italic uppercase active:scale-95"
          >
            <Zap className="inline mr-2" />
            Start Camera Scan
          </button>

          <button
            onClick={() => fileRef.current?.click()}
            className="py-5 bg-black border border-white/10 font-black italic uppercase"
          >
            Scan from Gallery
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && scanFromImage(e.target.files[0])}
          />

          <div className="flex-1 bg-black/20 border border-white/10 p-4 overflow-y-auto">
            <h4 className="text-xs uppercase tracking-widest mb-3">
              Scan History
            </h4>
            {history.map((h) => (
              <div key={h.id} className="flex gap-3 mb-3 bg-white/5 p-2">
                <img src={h.avatar} className="w-10 h-10" />
                <div>
                  <p className="font-bold text-sm uppercase">{h.name}</p>
                  <p className="text-[10px] text-white/40 uppercase">
                    {h.team}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>

      <style>{`
        @keyframes pop {
          from { transform: scale(0.9); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
        }
        .animate-pop { animation: pop 0.3s ease }
      `}</style>
    </div>
  );
};

export default F1ScannerApp;
