import React, { useState, useEffect } from 'react';
import { TranslationSchema } from '../data/translations32';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';

interface CountdownProps {
  translations: TranslationSchema;
}

export const Countdown: React.FC<CountdownProps> = ({ translations }) => {
  const t = translations.hero;
  
  // Target: December 10, 2026 00:00:00 UTC+7 (Vietnam Time)
  const TARGET_TIMESTAMP = new Date('2026-12-10T00:00:00+07:00').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const difference = TARGET_TIMESTAMP - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPast: false
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [TARGET_TIMESTAMP]);

  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-5 sm:p-6 rounded-2xl lab-glass border border-cyan-500/20 shadow-2xl shadow-cyan-950/20 relative overflow-hidden">
      {/* Subtle top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cyan-300 font-medium">
          <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{t.announcementTargetText} <strong className="text-white font-semibold">{t.announcementDate}</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>{t.timezoneNote}</span>
        </div>
      </div>

      {timeLeft.isPast ? (
        <div className="py-6 flex items-center justify-center gap-3 text-emerald-400 font-medium text-center">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <span className="text-base sm:text-lg">{t.launchedStatus}</span>
        </div>
      ) : (
        <div className="pt-5">
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
            {/* Days */}
            <div className="bg-slate-900/60 border border-white/[0.05] rounded-xl p-3 sm:p-4 flex flex-col justify-center">
              <span className="text-2xl sm:text-4xl lg:text-5xl font-bold font-mono tabular-nums text-white tracking-tight">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
                {t.days}
              </span>
            </div>

            {/* Hours */}
            <div className="bg-slate-900/60 border border-white/[0.05] rounded-xl p-3 sm:p-4 flex flex-col justify-center">
              <span className="text-2xl sm:text-4xl lg:text-5xl font-bold font-mono tabular-nums text-cyan-200 tracking-tight">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
                {t.hours}
              </span>
            </div>

            {/* Minutes */}
            <div className="bg-slate-900/60 border border-white/[0.05] rounded-xl p-3 sm:p-4 flex flex-col justify-center">
              <span className="text-2xl sm:text-4xl lg:text-5xl font-bold font-mono tabular-nums text-cyan-300 tracking-tight">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
                {t.minutes}
              </span>
            </div>

            {/* Seconds */}
            <div className="bg-slate-900/60 border border-white/[0.05] rounded-xl p-3 sm:p-4 flex flex-col justify-center">
              <span className="text-2xl sm:text-4xl lg:text-5xl font-bold font-mono tabular-nums text-cyan-400 tracking-tight animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
                {t.seconds}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
