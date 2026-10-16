import React, { useState, useEffect } from 'react';
import { SUPPORTED_32_LANGUAGES, LanguageInfo } from '../types/languages';
import { X, Search, Check, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LanguageModalProps {
  isOpen: boolean;
  currentLang: string;
  onSelectLang: (langCode: string) => void;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  currentLang,
  onSelectLang,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = SUPPORTED_32_LANGUAGES.filter((item) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.nativeName.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.region.toLowerCase().includes(q)
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full max-w-2xl bg-[#090d18] border border-white/[0.12] rounded-2xl shadow-2xl p-6 sm:p-7 overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Select Language</h3>
                  <p className="text-xs text-slate-400">
                    Hỗ trợ 32 ngôn ngữ thế giới (32 global languages)
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="py-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm ngôn ngữ / Search languages (e.g. Vietnamese, Japanese, French)..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-white/[0.1] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  autoFocus
                />
              </div>
            </div>

            {/* Language Grid */}
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2 scrollbar-thin">
              {filtered.map((item: LanguageInfo) => {
                const isSelected = currentLang === item.code;
                return (
                  <button
                    key={item.code}
                    onClick={() => {
                      onSelectLang(item.code);
                      onClose();
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400/50 text-white'
                        : 'bg-slate-900/40 border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.15] text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">
                          {item.nativeName}
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400/80 uppercase">
                          {item.code}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        {item.name} · {item.region}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-4 mt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-500">
              <span>Đang chọn: <strong className="text-cyan-400 font-mono">{currentLang.toUpperCase()}</strong></span>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
