import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ShieldAlert, Lock, Unlock, KeyRound, CornerDownLeft } from 'lucide-react';

const REQUIRED_PASSCODE = '123654';

export default function DeveloperTerminal({ isOpen, onClose, toggleGravity }) {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('terminal_unlocked') === 'true';
  });

  const [passcodeInput, setPasscodeInput] = useState('');
  const [authStatus, setAuthStatus] = useState('idle'); // 'idle' | 'error' | 'success'
  const [shakeKey, setShakeKey] = useState(0);

  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'YUNOVAX OS v2026.1 [Antigravity Core Initialized]' },
    { type: 'system', text: 'Komut listesini görmek için "help" yazın.' },
  ]);

  const passcodeRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (!isUnlocked) {
        setTimeout(() => passcodeRef.current?.focus(), 150);
      } else {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen, isUnlocked]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!passcodeInput) return;

    if (passcodeInput === REQUIRED_PASSCODE) {
      setAuthStatus('success');
      sessionStorage.setItem('terminal_unlocked', 'true');
      setTimeout(() => {
        setIsUnlocked(true);
        setAuthStatus('idle');
        setTimeout(() => inputRef.current?.focus(), 150);
      }, 700);
    } else {
      setAuthStatus('error');
      setShakeKey((prev) => prev + 1);
      setPasscodeInput('');
      setTimeout(() => setAuthStatus('idle'), 2500);
    }
  };

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${input}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Mevcut Komutlar:
  • help      : Komut listesini gösterir
  • whoami    : Yunus Emre Gedik (Yunovax) kimdir?
  • projects  : Geliştirilen projeleri listeler
  • gravity   : Sıfır-Yerçekimi modunu açar/kapatır
  • secret    : Gizli easter-egg mesajını açar!
  • contact   : İletişim bilgilerini verir
  • matrix    : Matrix yeşil kod akışını simüle eder
  • clear     : Terminal geçmişini temizler`,
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `Yunus Emre Gedik (Yunovax)
UI/UX Designer & Interactive Experience Developer.
"Sadece kod yazmıyorum; atmosfer inşa ediyorum."
Roblox (Lua), Flutter, Supabase & Web GL Specialist.`,
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `1. The Pier: Endless Depths (Roblox Psychological Horror)
2. YDCO - Yunovax's Difficulty Chart Obby (Meta Horror Obby)
3. Muzikors (Cross-Platform Modern Live Platform)`,
        });
        break;

      case 'gravity':
        toggleGravity();
        newHistory.push({
          type: 'output',
          text: `[SYSTEM]: Yerçekimi fizik modu değiştirildi!`,
        });
        break;

      case 'secret':
        newHistory.push({
          type: 'output',
          text: `[GİZLİ SİNYAL TESPİT EDİLDİ]:
"En derin korkular dışarıda değil, zihnimizin keşfedilmemiş derinliklerinde gizlidir."
- Yunovax (Roblox Dev Lore)`,
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `E-posta: iletisim@yunovax.com.tr
Web: https://yunovax.com.tr
Discord / Roblox: Yunovax`,
        });
        break;

      case 'matrix':
        newHistory.push({
          type: 'output',
          text: `01011001 01010101 01001110 01001111 01010110 01000001 01011000
SYSTEM MATRIX ACTIVE: WAKE UP NEO...`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Bilinmeyen komut: "${cmd}". Kullanılabilir komutları görmek için "help" yazın.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          key={shakeKey}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={
            authStatus === 'error'
              ? { x: [-10, 10, -8, 8, -4, 4, 0] }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 0.4 }}
          className={`w-[95vw] sm:w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] bg-slate-950 rounded-2xl border shadow-2xl overflow-hidden font-mono text-sm flex flex-col transition-colors duration-300 ${
            authStatus === 'error'
              ? 'border-rose-500 shadow-rose-950/80'
              : authStatus === 'success'
              ? 'border-emerald-400 shadow-emerald-950/80'
              : 'border-violet-500/40 shadow-violet-950/50'
          }`}
        >
          {/* Header with prominent touch target Close button */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
              <Terminal className="w-4 h-4 text-violet-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200 truncate">
                {isUnlocked ? 'yunovax-terminal@antigravity:~' : 'SECURITY GATEWAY'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* PASSCODE AUTHENTICATION GATE SCREEN */}
          {!isUnlocked ? (
            <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center flex-1 overflow-y-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-900 border border-violet-500/40 flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-violet-500/10">
                {authStatus === 'success' ? (
                  <Unlock className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 animate-bounce" />
                ) : authStatus === 'error' ? (
                  <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7 text-rose-400 animate-pulse" />
                ) : (
                  <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-violet-400" />
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white tracking-wider mb-1">
                ACCESS RESTRICTED. ENTER PASSCODE:
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Geliştirici konsoluna erişmek için şifreyi girin.
              </p>

              <form onSubmit={handleAuthSubmit} className="w-full max-w-sm flex flex-col items-center gap-4">
                <div className="relative w-full">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    ref={passcodeRef}
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    placeholder="Şifreyi girin..."
                    className={`w-full pl-10 pr-4 py-3 bg-slate-900 rounded-xl border text-center font-mono tracking-widest text-base focus:outline-none transition-all ${
                      authStatus === 'error'
                        ? 'border-rose-500 text-rose-400 focus:ring-2 focus:ring-rose-500/50'
                        : authStatus === 'success'
                        ? 'border-emerald-400 text-emerald-300'
                        : 'border-white/10 text-white focus:border-violet-500'
                    }`}
                  />
                </div>

                {authStatus === 'error' && (
                  <div className="text-xs text-rose-400 font-bold tracking-wide animate-pulse">
                    ACCESS DENIED - INVALID PASSCODE
                  </div>
                )}

                {authStatus === 'success' && (
                  <div className="text-xs text-emerald-400 font-bold tracking-wide animate-bounce">
                    ACCESS GRANTED - UNLOCKING TERMINAL...
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-700 hover:from-violet-600 hover:to-indigo-600 text-white font-semibold text-xs tracking-wider transition-all shadow-lg shadow-violet-700/30 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>GİRİŞ YAP</span>
                  <CornerDownLeft className="w-4 h-4 text-cyan-300" />
                </button>
              </form>
            </div>
          ) : (
            /* UNLOCKED TERMINAL SCREEN */
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 flex-1 overflow-y-auto space-y-2 text-slate-300 text-xs sm:text-sm">
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    className={
                      item.type === 'user'
                        ? 'text-cyan-300 font-semibold'
                        : item.type === 'error'
                        ? 'text-rose-400'
                        : item.type === 'system'
                        ? 'text-emerald-400'
                        : 'text-slate-200 whitespace-pre-line'
                    }
                  >
                    {item.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* CLI Input */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-t border-white/10 shrink-0">
                <span className="text-emerald-400">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  placeholder="help yazın..."
                  className="flex-1 bg-transparent text-emerald-300 focus:outline-none text-xs sm:text-sm placeholder:text-slate-600"
                />
                <CornerDownLeft className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
