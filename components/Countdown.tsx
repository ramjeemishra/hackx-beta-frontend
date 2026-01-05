import React, { useEffect, useState } from "react";

const EVENT_START = new Date("2026-02-28T00:00:00");
const EVENT_END = new Date("2026-03-01T00:00:00");

const Countdown: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (now >= EVENT_END) {
    return (
      <div className="text-4xl md:text-6xl font-black italic text-red-500">
        EVENT ENDED
      </div>
    );
  }

  if (now >= EVENT_START) {
    return (
      <div className="text-4xl md:text-6xl font-black italic text-green-400">
        EVENT STARTED
      </div>
    );
  }

  const diff = EVENT_START.getTime() - now.getTime();
  const totalSeconds = Math.floor(diff / 1000);

  const totalDays = Math.floor(totalSeconds / (60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);

  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);

  const showWeeks = totalDays >= 7;
  const showDays = totalDays <= 7;

  return (
    <div className="flex space-x-8 md:space-x-12 bg-black/60 px-8 py-6 rounded-md backdrop-blur-sm">
      {showWeeks && (
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-7xl font-black italic tracking-tighter text-white leading-none mb-2">
            {weeks.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase font-bold text-zinc-300 tracking-widest">
            WEEKS
          </span>
        </div>
      )}

      {showDays && (
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-7xl font-black italic tracking-tighter text-white leading-none mb-2">
            {totalDays.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase font-bold text-zinc-300 tracking-widest">
            DAYS
          </span>
        </div>
      )}

      <div className="flex flex-col items-center">
        <span className="text-5xl md:text-7xl font-black italic tracking-tighter text-white leading-none mb-2">
          {hours.toString().padStart(2, "0")}
        </span>
        <span className="text-[10px] uppercase font-bold text-zinc-300 tracking-widest">
          HRS
        </span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-5xl md:text-7xl font-black italic tracking-tighter text-white leading-none mb-2">
          {minutes.toString().padStart(2, "0")}
        </span>
        <span className="text-[10px] uppercase font-bold text-zinc-300 tracking-widest">
          MIN
        </span>
      </div>
    </div>
  );
};

export default Countdown;
