import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Smartphone, HelpCircle, FileText, 
  Settings, CheckCircle, ArrowRight, Download, 
  Globe, Menu, X, Mail, Cpu, Code, Zap, HeartHandshake,
  Lock, Trash2, ChevronRight, Check
} from 'lucide-react';
import { Language } from './types';

// Importing custom components
import PhoneSimulator from './components/PhoneSimulator';
import PrivacyPolicyView from './components/PrivacyPolicyView';
import TermsOfServiceView from './components/TermsOfServiceView';

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  
  // Try to determine initial view from hash
  const initialHash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
  const initialView = ['inicio', 'privacidade', 'termos'].includes(initialHash) 
    ? initialHash as 'inicio' | 'privacidade' | 'termos' 
    : 'inicio';

  const [activeView, setActiveView] = useState<'inicio' | 'privacidade' | 'termos'>(initialView);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  // Update hash when activeView changes to support direct links
  useEffect(() => {
    if (activeView !== 'inicio') {
      window.location.hash = activeView;
    } else {
      // Clean up hash if it's the home view
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [activeView]);

  // Listen for hash changes to sync view (e.g. back button or manual hash change)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['inicio', 'privacidade', 'termos'].includes(hash)) {
        setActiveView(hash as 'inicio' | 'privacidade' | 'termos');
      } else if (!hash) {
        setActiveView('inicio');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Action helper to show beautiful notifications
  const triggerNotification = (message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const toggleLanguage = () => {
    const nextLang = lang === 'pt' ? 'en' : 'pt';
    setLang(nextLang);
    triggerNotification(
      nextLang === 'pt' 
        ? 'Website traduzido para Português!' 
        : 'Website switched to English language!'
    );
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-sans selection:bg-brand-cyan/20 selection:text-white transition-colors relative overflow-hidden font-sans">
      
      {/* Decorative Aurora Gradients */}
      <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[50%] rounded-full bg-brand-cyan/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-25%] w-[60%] h-[50%] rounded-full bg-brand-purple/5 blur-[120px] -z-10 pointer-events-none" />

      {/* FIXED TOAST NOTIFICATION VIEWPORT */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-[#0a1428]/95 border-2 border-cyan-400/40 text-white rounded-xl py-3 px-4 shadow-xl flex items-center space-x-3 pointer-events-auto backdrop-blur-md glow-cyan"
            >
              <div className="h-5 w-5 bg-cyan-400/10 text-cyan-400 rounded-full flex items-center justify-center shrink-0">
                <Check className="h-3.5 w-3.5" />
              </div>
              <p className="text-xs font-medium">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          
          {/* Logo Brand Accent */}
          <div 
            onClick={() => { setActiveView('inicio'); setMobileMenuOpen(false); }} 
            className="flex items-center space-x-2.5 cursor-pointer filter hover:brightness-110 active:scale-98 transition-all"
          >
            <div className="h-8 md:h-10 w-8 md:w-10 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-purple p-0.5 flex items-center justify-center glow-cyan">
              <div className="w-full h-full bg-[#0a0a0a] rounded-[10px] flex items-center justify-center">
                <Zap className="h-4 md:h-5 w-4 md:w-5 text-brand-cyan animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-display font-bold text-sm md:text-lg tracking-tight text-white uppercase">Optimization</span>
                <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan font-bold">BOOST</span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 block uppercase font-medium">{lang === 'pt' ? 'Site de Conformidade' : 'Compliance Hub'}</span>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs md:text-sm font-semibold text-slate-300">
            <button 
              onClick={() => setActiveView('inicio')}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${activeView === 'inicio' ? 'text-brand-cyan bg-brand-cyan/5 border-b border-brand-cyan/20' : 'hover:text-white hover:bg-white/3'}`}
            >
              {lang === 'pt' ? 'Aplicativo' : 'Overview'}
            </button>
            <button 
              onClick={() => setActiveView('privacidade')}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${activeView === 'privacidade' ? 'text-brand-cyan bg-brand-cyan/5' : 'hover:text-white hover:bg-white/3'}`}
            >
              {lang === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
            </button>
            <button 
              onClick={() => setActiveView('termos')}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${activeView === 'termos' ? 'text-brand-cyan bg-brand-cyan/5' : 'hover:text-white hover:bg-white/3'}`}
            >
              {lang === 'pt' ? 'Termos de Uso' : 'Terms of Use'}
            </button>
          </nav>

          {/* Language Toggle & Support Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 border border-white/10 hover:border-white/25 bg-[#141414] hover:bg-white/5 text-slate-100 text-xs font-mono px-3.5 py-2 rounded-lg transition-all active:scale-95"
            >
              <Globe className="h-3.5 w-3.5 text-brand-cyan" />
              <span>{lang === 'pt' ? 'ENGLISH (EN)' : 'PORTUGUÊS (PT)'}</span>
            </button>
            <a 
              href="#simulator-container" 
              onClick={() => setActiveView('inicio')}
              className="bg-brand-cyan hover:bg-[#bf9b30] text-[#0a0a0a] text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-md hover:shadow-brand-cyan/25 active:scale-95 glow-btn-cyan"
            >
              {lang === 'pt' ? 'VER SIMULADOR' : 'OPEN DEMO'}
            </a>
          </div>

          {/* Mobile Right Bar actions */}
          <div className="flex lg:hidden items-center space-x-2">
            <button 
              onClick={toggleLanguage}
              className="p-2 border border-white/5 rounded-lg bg-[#141414] text-brand-cyan"
              title="Traduzir / Translate"
            >
              <Globe className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 border border-white/5 rounded-lg bg-[#141414] text-white hover:text-brand-cyan"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE COLLAPSIBLE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-white/10 bg-[#141414] overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2 flex flex-col text-sm font-semibold">
              <button 
                onClick={() => { setActiveView('inicio'); setMobileMenuOpen(false); }}
                className={`w-full text-left py-2 px-3 rounded-lg ${activeView === 'inicio' ? 'bg-brand-cyan/10 text-brand-cyan' : 'text-slate-300'}`}
              >
                {lang === 'pt' ? '📱 Aplicativo e Simulador' : '📱 App Overview'}
              </button>
              <button 
                onClick={() => { setActiveView('privacidade'); setMobileMenuOpen(false); }}
                className={`w-full text-left py-2 px-3 rounded-lg ${activeView === 'privacidade' ? 'bg-brand-cyan/10 text-brand-cyan' : 'text-slate-300'}`}
              >
                {lang === 'pt' ? '🛡️ Política de Privacidade' : '🛡️ Privacy Policy'}
              </button>
              <button 
                onClick={() => { setActiveView('termos'); setMobileMenuOpen(false); }}
                className={`w-full text-left py-2 px-3 rounded-lg ${activeView === 'termos' ? 'bg-brand-cyan/10 text-brand-cyan' : 'text-slate-300'}`}
              >
                {lang === 'pt' ? '📝 Termos de Uso' : '📝 Terms of Use'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE DISPLAY MAIN ROUTER */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex-1">
        <AnimatePresence mode="wait">
          {activeView === 'inicio' && (
            <motion.div 
              key="inicio-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Panel: Content / Store Badges */}
              <div className="lg:col-span-7 space-y-6 md:space-y-8">
                <div>
                  {/* Glowing chips */}
                  <div className="inline-flex items-center space-x-2 bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1.5 rounded-full text-xs text-brand-cyan font-mono font-bold uppercase tracking-wider mb-3.5">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Conformidade Google Play Store Ativa</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-display leading-[1.15] text-white tracking-tight">
                    {lang === 'pt' ? (
                      <>
                        Jogo fluido. <br />
                        <span className="italic text-brand-cyan">Sem lag ou travamentos.</span>
                      </>
                    ) : (
                      <>
                        Smooth gaming. <br />
                        <span className="italic text-brand-cyan">Zero lag, zero frame drops.</span>
                      </>
                    )}
                  </h1>

                  <p className="text-slate-400 text-sm md:text-base mt-4 max-w-xl leading-relaxed">
                    {lang === 'pt' 
                      ? 'Optimization Boost é o seu parceiro indispensável para gerenciar recursos do Android. Otimize memória RAM sob demanda, resfrie a bateria do dispositivo, grave gameplays sem lag e desfrute do Ping Booster configurado localmente.'
                      : 'Optimization Boost is your ultimate utility companion to control Android systems. Release RAM cache safely on demand, cool battery hardware state, record videos of gameplays, and toggle network DNS routes.'}
                  </p>
                </div>

                {/* Instructions */}
                <div className="text-xs text-slate-500 leading-normal font-mono relative pl-4 border-l-2 border-slate-700">
                  <p>{lang === 'pt' ? '🕹️ INTERATIVO: No painel ao lado, simule a otimização de RAM, adicione novos jogos em MODO GAMING e teste o gravador de tela diretamente do navegador!' : '🕹️ INTERACTIVE: In the panel on the right, simulate RAM boosting, add custom games under MODO GAMING to test overclocking thresholds!'}</p>
                </div>
              </div>

              {/* Right Panel: Smartphone Simulator Component */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative">
                  {/* Neon radial glow backdrops */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-cyan/5 blur-[55px] -z-10 animate-pulse" />
                  <PhoneSimulator onNotify={triggerNotification} />
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'privacidade' && (
            <motion.div 
              key="privacidade-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <PrivacyPolicyView lang={lang} onNotify={triggerNotification} />
            </motion.div>
          )}

          {activeView === 'termos' && (
            <motion.div 
              key="termos-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <TermsOfServiceView lang={lang} onNotify={triggerNotification} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#050505] py-12 text-slate-500 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-brand-cyan" />
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">Optimization Boost</span>
            <span className="text-xs font-mono">• {lang === 'pt' ? 'Suporte Oficial Play Store' : 'Play Store Support'}</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
            <button onClick={() => setActiveView('inicio')} className="hover:text-white transition-colors">
              {lang === 'pt' ? 'Início' : 'Home'}
            </button>
            <span>•</span>
            <button onClick={() => setActiveView('privacidade')} className="hover:text-white transition-colors">
              {lang === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
            </button>
            <span>•</span>
            <button onClick={() => setActiveView('termos')} className="hover:text-white transition-colors">
              {lang === 'pt' ? 'Termos de Uso' : 'Terms of Use'}
            </button>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] font-mono leading-none">© 2026 Optimization Boost. All rights reserved.</p>
            <p className="text-[9px] font-mono text-slate-600 mt-1">{lang === 'pt' ? 'Criado em conformidade com as políticas Google Play' : 'Fulfills and mirrors Play Console declarations'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
