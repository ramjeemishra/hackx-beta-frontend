import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import {
  Trophy,
  Zap,
  Maximize2,
  Crown,
  X,
  CheckCircle,
  Mail,
  Phone,
  Users,
  Hash,
} from "lucide-react";

interface TeamMember {
  name: string;
  email: string;
  phone?: string;
}

interface TeamScanResult {
  teamId: string;
  teamCode: string;
  teamName: string;
  leader: TeamMember;
  members: TeamMember[];
  totalMembers: number;
  time: string;
  attendance?: boolean;
  foodStatus?: {
    BREAKFAST: string[];
    LUNCH: string[];
    DINNER: string[];
  };
}

const STORAGE_KEY = "scanned_teams";
const API_BASE = "https://hackx-beta-backend.onrender.com/api";

const F1ScannerApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const isProcessingRef = useRef(false);

  const [mode, setMode] = useState<"ATTENDANCE" | "FOOD">("ATTENDANCE");
  const [mealType, setMealType] =
    useState<"BREAKFAST" | "LUNCH" | "DINNER" | "">("");

  const [status, setStatus] = useState<"READY" | "SCANNING">("READY");
  const [teams, setTeams] = useState<TeamScanResult[]>([]);
  const [previewTeam, setPreviewTeam] = useState<TeamScanResult | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamScanResult | null>(null);
  const [presentMembers, setPresentMembers] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTeams(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    setPreviewTeam(null);
    setSelectedTeam(null);
    setPresentMembers([]);
    isProcessingRef.current = false;
  }, [mode]);

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
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    try {
      const parsed = JSON.parse(data);
      if (!parsed.teamCode) return;

      const res = await fetch(`${API_BASE}/scanner/verify/${parsed.teamCode}`);
      if (!res.ok) return;

      const teamFromDb = await res.json();

      const normalized: TeamScanResult = {
        teamId: teamFromDb._id,
        teamCode: teamFromDb.teamCode,
        teamName: teamFromDb.teamName,
        leader: {
          name: teamFromDb.lead.name,
          email: teamFromDb.lead.email,
          phone: teamFromDb.lead.phone,
        },
        members: teamFromDb.members.map((m: any) => ({
          name: m.fullName,
          email: m.email,
          phone: m.phone,
        })),
        totalMembers: teamFromDb.totalMembers,
        attendance: teamFromDb.attendance,
        foodStatus: teamFromDb.foodStatus,
        time: new Date().toLocaleTimeString(),
      };
      scannerRef.current?.stop();
      setPreviewTeam(normalized);
      setTeams((p) => [normalized, ...p]);
    } finally {
      scannerRef.current?.stop();
      setStatus("READY");
      setTimeout(() => (isProcessingRef.current = false), 300);
    }
  };

  const startCameraScan = () => {
    setPreviewTeam(null);
    setSelectedTeam(null);
    setPresentMembers([]);
    isProcessingRef.current = false;
    setStatus("SCANNING");
    scannerRef.current?.start();
  };

  const scanFromImage = async (file: File) => {
    try {
      isProcessingRef.current = false;
      setPresentMembers([]);
      const result = await QrScanner.scanImage(file);
      onScanSuccess(result);
    } catch { }
  };

  const toggleMember = (email: string) => {
    setPresentMembers((p) =>
      p.includes(email) ? p.filter((e) => e !== email) : [...p, email]
    );
  };

  const submitAttendance = async () => {
    if (!previewTeam) return;

    await fetch(`${API_BASE}/scanner/member-attendance`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teamCode: previewTeam.teamCode,
        presentMembers,
      }),
    });

    setPreviewTeam((p) => (p ? { ...p, attendance: true } : p));
  };

const submitFood = async () => {
  const team = previewTeam || selectedTeam;
  if (!team) return;

  await fetch(`${API_BASE}/scanner/food`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      teamCode: team.teamCode,
      mealType,
      members: presentMembers,
    }),
  });

  setPreviewTeam(null);
  setSelectedTeam(null);
  setPresentMembers([]);
};


  const activeTeam = previewTeam || selectedTeam;
  const attendanceCompleted =
    mode === "ATTENDANCE" && activeTeam?.attendance === true;

  return (
    <div className="min-h-screen bg-[#0e0e14] text-white p-4 sm:p-6 flex flex-col">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 p-3 skew-x-[-12deg]">
            <Trophy className="skew-x-[12deg]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black italic uppercase">
            Team <span className="text-red-600">Scanner</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setMode("ATTENDANCE")}
            className={`px-4 py-2 rounded ${mode === "ATTENDANCE" ? "bg-red-600" : "bg-white/10"
              }`}
          >
            Attendance
          </button>
          <button
            onClick={() => setMode("FOOD")}
            className={`px-4 py-2 rounded ${mode === "FOOD" ? "bg-red-600" : "bg-white/10"
              }`}
          >
            Food
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-6">
        <section className="relative bg-black/50 border border-white/10 rounded-xl overflow-hidden min-h-[260px] lg:flex-1">
          <video
            ref={videoRef}
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover ${status === "SCANNING" ? "opacity-100" : "opacity-0"
              }`}
          />
          {status === "READY" && (
            <div className="absolute inset-0 flex items-center justify-center text-white/40">
              <Maximize2 className="w-12 h-12 mr-3" />
              Ready to scan
            </div>
          )}
        </section>

        <aside className="w-full lg:w-96 flex flex-col gap-4">
          {mode === "FOOD" && (
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value as any)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
            >
              <option value="">Select Meal</option>
              <option value="BREAKFAST">Breakfast</option>
              <option value="LUNCH">Lunch</option>
              <option value="DINNER">Dinner</option>
            </select>
          )}

          <button
            onClick={startCameraScan}
            className="py-4 bg-red-600 font-black italic uppercase rounded-xl"
          >
            <Zap className="inline mr-2" /> Start Scan
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

          <div className="flex-1 bg-black/30 border border-white/10 rounded-xl p-4 overflow-y-auto max-h-[40vh] lg:max-h-none">
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

      {activeTeam && mode === "ATTENDANCE" && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111118] w-full max-w-3xl rounded-2xl border border-white/10">
            <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between">
              <div>
                <h2 className="text-xl sm:text-3xl font-black uppercase">
                  {activeTeam.teamName}
                </h2>
                <p className="text-white/60 flex items-center gap-2 mt-1">
                  <Hash size={14} /> {activeTeam.teamCode}
                </p>
              </div>
              <button
                onClick={() => {
                  setPreviewTeam(null);
                  setSelectedTeam(null);
                }}
              >
                <X />
              </button>
            </div>

            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                <p className="text-red-500 font-bold flex items-center gap-2 mb-3">
                  <Crown size={16} /> Team Leader
                </p>
                <p className="font-semibold">{activeTeam.leader.name}</p>
                <p className="text-sm text-white/60 flex items-center gap-2">
                  <Mail size={14} /> {activeTeam.leader.email}
                </p>
                <p className="text-sm text-white/60 flex items-center gap-2">
                  <Phone size={14} /> {activeTeam.leader.phone}
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                <p className="font-bold flex items-center gap-2 mb-3">
                  <Users size={16} /> Members
                </p>

                <div className="space-y-3 max-h-[50vh] overflow-y-auto">
                  {activeTeam.members.map((m) => (
                    <div
                      key={m.email}
                      className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">{m.name}</p>
                        <p className="text-xs text-white/60">{m.email}</p>
                        <p className="text-xs text-white/60">{m.phone}</p>
                      </div>

                      {attendanceCompleted ? (
                        <span className="text-green-400 text-xs font-bold flex items-center gap-1">
                          <CheckCircle size={14} /> Completed
                        </span>
                      ) : (
                        <input
                          type="checkbox"
                          checked={presentMembers.includes(m.email)}
                          onChange={() => toggleMember(m.email)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!attendanceCompleted && (
              <div className="p-4 sm:p-6 border-t border-white/10">
                <button
                  onClick={submitAttendance}
                  className="w-full bg-red-600 py-4 rounded-xl font-black uppercase"
                >
                  Submit Attendance
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTeam && mode === "FOOD" && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e14] w-full max-w-xl p-4 sm:p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase">
                  {activeTeam.teamName}
                </h2>
                <p className="text-sm text-white/60">
                  Lead: {activeTeam.leader.name}
                </p>
                {mealType && (
                  <span className="inline-block mt-2 px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-xs font-bold">
                    {mealType}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setPreviewTeam(null);
                  setSelectedTeam(null);
                }}
              >
                <X />
              </button>
            </div>

            <div className="space-y-2 max-h-[50vh] overflow-y-auto mb-4">
              {activeTeam.members.map((m) => {
                const alreadyFed =
                  mealType &&
                  activeTeam.foodStatus?.[mealType]?.includes(m.email);

                return (
                  <div
                    key={m.email}
                    className="bg-white/5 p-3 rounded flex justify-between items-center"
                  >
                    <p className="font-semibold">{m.name}</p>

                    {alreadyFed ? (
                      <span className="text-green-400 text-xs font-bold flex items-center gap-1">
                        <CheckCircle size={14} /> Completed
                      </span>
                    ) : (
                      <input
                        type="checkbox"
                        checked={presentMembers.includes(m.email)}
                        onChange={() => toggleMember(m.email)}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={submitFood}
              disabled={!mealType}
              className="w-full bg-red-600 py-3 rounded font-bold"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default F1ScannerApp;
