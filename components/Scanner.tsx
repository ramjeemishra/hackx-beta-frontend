import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { Trophy, Zap, Maximize2, Crown, X } from "lucide-react";

interface TeamMember {
  name: string;
  email: string;
  phone?: string;
}

interface TeamScanResult {
  teamId: string;
  teamName: string;
  leader: TeamMember & { gender?: string };
  members: TeamMember[];
  totalMembers: number;
  time: string;
}

const STORAGE_KEY = "scanned_teams";

const F1ScannerApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const [status, setStatus] = useState<"READY" | "SCANNING">("READY");
  const [teams, setTeams] = useState<TeamScanResult[]>([]);
  const [previewTeam, setPreviewTeam] = useState<TeamScanResult | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamScanResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTeams(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    if (!videoRef.current) return;

    scannerRef.current = new QrScanner(
      videoRef.current,
      (result) => onScanSuccess(result.data),
      { preferredCamera: "environment" }
    );

    return () => {
      scannerRef.current?.stop();
      scannerRef.current?.destroy();
    };
  }, []);

  const onScanSuccess = async (data: string) => {
    try {
      const parsed = JSON.parse(data);
      if (!parsed.teamCode) return;

      const res = await fetch(
        `https://hackx-beta-backend.onrender.com/api/scanner/verify/${parsed.teamCode}`
      );

      if (!res.ok) {
        alert("Invalid team");
        return;
      }

      const teamFromDb = await res.json();
      const teamId = teamFromDb._id;

      const alreadyScanned =
        teams.some((t) => t.teamId === teamId) ||
        previewTeam?.teamId === teamId;

      if (alreadyScanned) {
        alert("Team already scanned");
        scannerRef.current?.stop();
        setStatus("READY");
        return;
      }

      const normalizedTeam: TeamScanResult = {
        teamId,
        teamName: teamFromDb.teamName,
        leader: {
          name: teamFromDb.lead.name,
          email: teamFromDb.lead.email,
          phone: teamFromDb.lead.phone,
          gender: teamFromDb.lead.gender,
        },
        members: teamFromDb.members.map((m: any) => ({
          name: m.fullName,
          email: m.email,
          phone: m.phone,
        })),
        totalMembers: teamFromDb.totalMembers,
        time: new Date().toLocaleTimeString(),
      };

      setPreviewTeam(normalizedTeam);
      setTeams((prev) => [normalizedTeam, ...prev]);
      scannerRef.current?.stop();
      setStatus("READY");
    } catch {
      console.error("Invalid QR");
    }
  };

  const startCameraScan = () => {
    if (!scannerRef.current) return;
    setPreviewTeam(null);
    setSelectedTeam(null);
    setStatus("SCANNING");
    scannerRef.current.start();
  };

  const scanFromImage = async (file: File) => {
    try {
      const result = await QrScanner.scanImage(file);
      onScanSuccess(result);
    } catch {}
  };

  const activeTeam = previewTeam || selectedTeam;

  return (
    <div className="min-h-screen bg-[#0e0e14] text-white p-6 flex flex-col">
      <header className="flex items-center gap-4 mb-6">
        <div className="bg-red-600 p-3 skew-x-[-12deg]">
          <Trophy className="skew-x-[12deg]" />
        </div>
        <h1 className="text-3xl font-black italic uppercase">
          Team <span className="text-red-600">Scanner</span>
        </h1>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-6">
        <section className="flex-1 relative bg-black/50 border border-white/10 rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover ${
              status === "SCANNING" ? "opacity-100" : "opacity-0"
            }`}
          />

          {status === "READY" && (
            <div className="absolute inset-0 flex items-center justify-center text-white/40">
              <Maximize2 className="w-16 h-16 mr-3" />
              Ready to scan
            </div>
          )}
        </section>

        <aside className="w-full lg:w-96 flex flex-col gap-4">
          <button
            onClick={startCameraScan}
            className="py-4 bg-red-600 font-black italic uppercase rounded-xl"
          >
            <Zap className="inline mr-2" />
            Start Scan
          </button>

          <button
            onClick={() => fileRef.current?.click()}
            className="py-4 bg-black border border-white/10 font-black italic uppercase rounded-xl"
          >
            Scan from Gallery
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.target.files && scanFromImage(e.target.files[0])
            }
          />

          <div className="flex-1 bg-black/30 border border-white/10 rounded-xl p-4 overflow-y-auto">
            <p className="text-xs uppercase tracking-widest mb-3">
              Scanned Teams ({teams.length})
            </p>

            {teams.map((t) => (
              <button
                key={t.teamId}
                onClick={() => setSelectedTeam(t)}
                className="w-full text-left bg-white/5 hover:bg-white/10 p-3 mb-2 rounded"
              >
                <p className="font-bold uppercase">{t.teamName}</p>
                <p className="text-xs text-white/50">
                  {t.leader.name} • {t.time}
                </p>
              </button>
            ))}
          </div>
        </aside>
      </main>

      {activeTeam && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6">
          <div className="bg-[#0e0e14] border border-white/10 rounded-xl max-w-xl w-full p-6 space-y-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-black uppercase">
                {activeTeam.teamName}
              </h2>
              <button
                onClick={() => {
                  setPreviewTeam(null);
                  setSelectedTeam(null);
                }}
              >
                <X />
              </button>
            </div>

            <div>
              <p className="text-red-500 font-bold uppercase flex items-center gap-2">
                <Crown className="w-4 h-4" /> Leader
              </p>
              <p className="font-bold">{activeTeam.leader.name}</p>
              <p className="text-xs text-white/50">{activeTeam.leader.email}</p>
              <p className="text-xs text-white/50">{activeTeam.leader.phone}</p>
            </div>

            <div>
              <p className="uppercase text-sm font-bold text-red-500 mb-2">
                Members ({activeTeam.members.length})
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {activeTeam.members.map((m, i) => (
                  <div key={i} className="bg-white/5 p-2 rounded">
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-xs text-white/50">{m.email}</p>
                    <p className="text-xs text-white/50">{m.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default F1ScannerApp;
