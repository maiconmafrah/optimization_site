import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Thermometer, Cpu, Layers, 
  HelpCircle, Info, Play, Plus, Trash2, 
  Share2, Globe, Sun, Volume2, Gamepad2, Video, 
  Settings, Check, LayoutGrid, Radio, ShieldAlert,
  ArrowRight, RefreshCw, Zap
} from 'lucide-react';
import { AppTab, AppDeviceState } from '../types';

interface PhoneSimulatorProps {
  onNotify?: (message: string) => void;
}

export default function PhoneSimulator({ onNotify }: PhoneSimulatorProps) {
  const [activeTab, setActiveTab] = useState<AppTab>('painel');
  const [deviceState, setDeviceState] = useState<AppDeviceState>({
    ramUsed: 2.2,
    ramMax: 3.0,
    cpuUsed: 44.7,
    temperature: 25.0,
    storageUsed: 42,
    storageFreeGb: 3.4,
    isOptimized: false,
    isActiveGamingMode: false,
    pingBoosterEnabled: false,
    recordResolution: '720p',
    isRecording: false,
    recordedVideos: [
      { id: '1', name: 'ScreenRecord_178025345.mp4', duration: '03:14', timestamp: 'Hoje, 10:24' },
      { id: '2', name: 'ScreenRecord_178009121.mp4', duration: '12:45', timestamp: 'Ontem, 16:50' }
    ],
    brightness: 80,
    volume: 70,
    selectedLanguage: 'Portuguese'
  });

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [addedGames, setAddedGames] = useState<string[]>([]);
  const [newGameName, setNewGameName] = useState('');
  const [showAddGameModal, setShowAddGameModal] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Counter loop for recorder
  useEffect(() => {
    let interval: any;
    if (deviceState.isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [deviceState.isRecording]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const ramPercent = Math.round((deviceState.ramUsed / deviceState.ramMax) * 100);

  // Optimization simulation
  const handleOptimize = () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    if (onNotify) onNotify('Iniciando Otimização Extrema de RAM e CPU...');

    setTimeout(() => {
      setDeviceState(prev => ({
        ...prev,
        ramUsed: 1.2,
        cpuUsed: 14.5,
        temperature: 20.5,
        isOptimized: true
      }));
      setIsOptimizing(false);
      if (onNotify) onNotify('Aplicativo otimizado! Memória liberada com sucesso.');
    }, 2000);
  };

  const togglePingBooster = () => {
    setDeviceState(prev => {
      const nextVal = !prev.pingBoosterEnabled;
      if (onNotify) {
        onNotify(nextVal 
          ? 'DNS Cloudflare (1.1.1.1) configurado! Latência de rede reduzida.' 
          : 'Ping Booster desativado. Utilizando DNS padrão da operadora.'
        );
      }
      return {
        ...prev,
        pingBoosterEnabled: nextVal
      };
    });
  };

  const handleAddGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameName.trim()) return;
    setAddedGames(prev => [...prev, newGameName.trim()]);
    if (onNotify) onNotify(`Jogo "${newGameName}" adicionado ao Game Launcher com overclock automático.`);
    setNewGameName('');
    setShowAddGameModal(false);
  };

  const toggleRecording = () => {
    setDeviceState(prev => {
      const nextRecording = !prev.isRecording;
      if (nextRecording) {
        if (onNotify) onNotify('Gravação de tela iniciada! Capturando som do sistema e gameplay.');
        return { ...prev, isRecording: true };
      } else {
        const id = (Date.now()).toString();
        const newVideo = {
          id,
          name: `ScreenRecord_${Math.floor(100000000 + Math.random() * 900000000)}.mp4`,
          duration: formatTime(recordingSeconds),
          timestamp: 'Agora mesmo'
        };
        if (onNotify) onNotify(`Gravação concluída e salva localmente como ${newVideo.name}`);
        return {
          ...prev,
          isRecording: false,
          recordedVideos: [newVideo, ...prev.recordedVideos]
        };
      }
    });
  };

  const deleteVideo = (id: string, name: string) => {
    setDeviceState(prev => ({
      ...prev,
      recordedVideos: prev.recordedVideos.filter(v => v.id !== id)
    }));
    if (onNotify) onNotify(`Vídeo "${name}" deletado do armazenamento local.`);
  };

  const switchLanguage = (lang: 'Portuguese' | 'English') => {
    setDeviceState(prev => ({ ...prev, selectedLanguage: lang }));
    if (onNotify) onNotify(`Idioma do simulador alterado para ${lang === 'Portuguese' ? 'Português' : 'English'}`);
  };

  return (
    <div id="simulator-container" className="flex flex-col items-center justify-center p-4">
      {/* Title */}
      <div className="mb-4 flex items-center space-x-2">
        <Smartphone className="h-5 w-5 text-brand-cyan animate-pulse" />
        <span className="font-mono text-xs tracking-widest text-brand-cyan uppercase font-bold">Simulador Interativo do App</span>
      </div>

      {/* Styled Smartphone Mockup */}
      <div className="relative w-[360px] h-[720px] bg-brand-bg rounded-[45px] border-8 border-[#10223e] ring-4 ring-slate-800 flex flex-col overflow-hidden shadow-2xl grow-cyan select-none">
        {/* Dynamic Notch / Camera */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black rounded-full z-20 flex items-center justify-center">
          <div className="w-3 h-3 bg-slate-900 border border-slate-700 rounded-full" />
        </div>

        {/* Dynamic Status Bar */}
        <div className="h-10 bg-black flex items-center justify-between px-6 pt-3 text-[10px] font-mono text-slate-400 z-10">
          <span>12:55</span>
          <div className="flex items-center space-x-2">
            <Radio className={`h-3 w-3 ${deviceState.pingBoosterEnabled ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
            <span>5G</span>
            <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex">
              <div className="bg-slate-400 w-full h-full rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Internal Screen Content */}
        <div className="flex-1 flex flex-col bg-[#030914] relative overflow-hidden text-white pt-2">
          {/* Header */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-white/5 bg-[#0a1428]">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 block uppercase">Optimization</span>
              <h1 className="text-xl font-bold tracking-tight text-white font-display flex items-center">
                BOOST
                <span className="h-2 w-2 rounded-full bg-brand-cyan ml-1 animate-ping" />
              </h1>
            </div>
            <div className="flex items-center space-x-3 text-brand-cyan">
              <HelpCircle className="h-4 w-4 cursor-pointer hover:text-white transition-colors" />
              <Info className="h-4 w-4 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          {/* DYNAMIC SCREEN VIEW CORES */}
          <div className="flex-1 overflow-y-auto px-4 py-3 scroll-hidden">
            {activeTab === 'painel' && (
              <div id="screen-painel" className="space-y-4 animate-fadeIn">
                {/* Gauge Section */}
                <div className="flex flex-col items-center justify-center py-4 relative">
                  {/* Circular Progress Representation */}
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    {/* SVG circle track and arc */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="65" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="10" fill="transparent" />
                      <circle 
                        cx="80" cy="80" r="65" 
                        stroke="#00f0ff" strokeWidth="10" 
                        fill="transparent" 
                        strokeDasharray="408" 
                        strokeDashoffset={408 - (408 * ramPercent) / 100}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Gauge metrics inside */}
                    <div className="absolute text-center flex flex-col items-center">
                      <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">Uso de RAM</span>
                      <span className="text-4xl font-bold text-white font-display">
                        {ramPercent}%
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {deviceState.ramUsed.toFixed(1)} GB / {deviceState.ramMax} GB
                      </span>
                    </div>
                  </div>
                </div>

                {/* Big Glow Optimize Button */}
                <div className="flex justify-center -mt-2">
                  <button 
                    onClick={handleOptimize}
                    disabled={isOptimizing}
                    className={`relative w-36 h-36 rounded-full flex flex-col items-center justify-center border-4 border-[#00f0ff] bg-[#0a1428] text-white cursor-pointer select-none transition-all duration-300 ${isOptimizing ? 'animate-pulse scale-95 border-[#008fa3]' : 'hover:scale-105 active:scale-95 glow-btn-cyan'}`}
                  >
                    <div className="absolute inset-0.5 rounded-full border border-[#00f0ff]/20 animate-spin" style={{ animationDuration: '4s' }} />
                    <Zap className={`h-8 w-8 mb-1 transition-all ${isOptimizing ? 'text-[#008fa3] rotate-45' : 'text-brand-cyan'}`} />
                    <span className="text-xs font-bold tracking-wider uppercase font-display">
                      {isOptimizing ? 'Otimizando' : 'Otimizar'}
                    </span>
                    <span className="text-[8px] text-brand-cyan tracking-wider font-mono font-bold mt-0.5">JOGO</span>
                  </button>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {/* Temperature card */}
                  <div className="bg-[#0a1428] rounded-xl p-3 border border-white/5 flex items-start space-x-2">
                    <div className={`p-1.5 rounded-lg ${deviceState.temperature < 22 ? 'bg-brand-cyan/10 text-brand-cyan' : 'bg-orange-500/10 text-orange-400'}`}>
                      <Thermometer className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[7px] text-slate-400 block font-mono uppercase">Temp Bateria/CPU</span>
                      <span className="text-sm font-bold block">{deviceState.temperature.toFixed(1)} °C</span>
                      <span className="text-[7px] font-bold text-brand-cyan font-mono uppercase">
                        {deviceState.temperature < 22 ? 'Fresco' : 'Resfriado'}
                      </span>
                    </div>
                  </div>
 
                  {/* Status card */}
                  <div className="bg-[#0a1428] rounded-xl p-3 border border-white/5 flex items-start space-x-2">
                    <div className="p-1.5 rounded-lg bg-brand-cyan/10 text-brand-cyan">
                      <LayoutGrid className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[7px] text-slate-400 block font-mono uppercase">Status Geral</span>
                      <span className="text-sm font-bold block">
                        {deviceState.isOptimized ? 'EXCELENTE' : 'REGULAR'}
                      </span>
                      <span className="text-[7px] font-semibold text-slate-400 font-mono block uppercase">Monitor ativo</span>
                    </div>
                  </div>
 
                  {/* CPU card */}
                  <div className="bg-[#0a1428] rounded-xl p-3 border border-white/5 flex items-start space-x-2">
                    <div className="p-1.5 rounded-lg bg-brand-purple/10 text-brand-purple">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[7px] text-slate-400 block font-mono uppercase">CPU</span>
                      <span className="text-sm font-bold block">{deviceState.cpuUsed.toFixed(1)}%</span>
                      <span className="text-[7px] font-bold text-brand-cyan font-mono uppercase">
                        {deviceState.cpuUsed < 20 ? 'Excelente' : 'Estável'}
                      </span>
                    </div>
                  </div>
 
                  {/* Storage card */}
                  <div className="bg-[#0a1428] rounded-xl p-3 border border-white/5 flex items-start space-x-2">
                    <div className="p-1.5 rounded-lg bg-brand-cyan/10 text-brand-cyan">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[7px] text-slate-400 block font-mono uppercase">Armazenamento</span>
                      <span className="text-sm font-bold block">{deviceState.storageUsed}% USADO</span>
                      <span className="text-[7px] text-slate-400 block font-mono text-[6px]">Resta {deviceState.storageFreeGb} GB</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'gaming' && (
              <div id="screen-gaming" className="space-y-4 animate-fadeIn">
                <div className="bg-[#0a1428] p-3 rounded-xl border border-brand-cyan/20">
                  <h3 className="text-xs font-bold text-brand-cyan uppercase font-display tracking-wider">Game Launcher</h3>
                  <p className="text-[9px] text-slate-400 mt-1">Inicie seus jogos preferidos com overclock automático de sistema para fps máximo.</p>
                </div>
 
                {/* Ping Booster Panel */}
                <div className="bg-[#0a1428] rounded-xl p-4 border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1.5 rounded-lg ${deviceState.pingBoosterEnabled ? 'bg-brand-cyan/10 text-brand-cyan' : 'bg-[#030914] text-slate-400'}`}>
                        <Globe className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-display">PING BOOSTER</h4>
                        <span className="text-[8px] text-slate-400 font-mono">Status: {deviceState.pingBoosterEnabled ? 'ATIVADO (Cloudflare DNS)' : 'DESATIVADO'}</span>
                      </div>
                    </div>
                    <button 
                      onClick={togglePingBooster}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${deviceState.pingBoosterEnabled ? 'bg-brand-cyan' : 'bg-slate-750'}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-slate-900 shadow ring-0 transition duration-200 ease-in-out ${deviceState.pingBoosterEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
 
                  <div className="flex justify-between items-center bg-[#030914] p-2.5 rounded-lg">
                    <div className="text-center flex-1">
                      <span className="text-[7px] text-slate-400 block uppercase font-mono">Sem Booster</span>
                      <span className="text-xs font-bold text-red-400 font-mono">94 ms</span>
                    </div>
                    <div className="h-6 w-px bg-slate-800" />
                    <div className="text-center flex-1">
                      <span className="text-[7px] text-slate-400 block uppercase font-mono">Com Booster</span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">28 ms</span>
                    </div>
                  </div>
                </div>
 
                {/* Collapsible Game Section */}
                <div className="bg-[#0a1428] rounded-xl p-3 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Gamepad2 className="h-3.5 w-3.5 text-brand-cyan" />
                      <span className="text-xs font-bold font-display">Jogos Otimizados</span>
                    </div>
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan font-mono">
                      {addedGames.length + 3} jogos
                    </span>
                  </div>
 
                  <div className="grid grid-cols-3 gap-2 py-1.5">
                    {/* Native default games in screen */}
                    <div className="flex flex-col items-center bg-[#030914] p-2 rounded-lg border border-white/5 cursor-pointer hover:border-brand-cyan/35">
                      <div className="w-8 h-8 rounded bg-gradient-to-tr from-yellow-700 to-amber-900 flex items-center justify-center font-bold text-xs text-white">FF</div>
                      <span className="text-[7px] text-slate-300 truncate mt-1">Free Fire</span>
                    </div>
                    <div className="flex flex-col items-center bg-[#030914] p-2 rounded-lg border border-white/5 cursor-pointer hover:border-brand-cyan/35">
                      <div className="w-8 h-8 rounded bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center font-bold text-xs text-white">PUBG</div>
                      <span className="text-[7px] text-slate-300 truncate mt-1">PUBG Mobile</span>
                    </div>
                    <div className="flex flex-col items-center bg-[#030914] p-2 rounded-lg border border-white/5 cursor-pointer hover:border-brand-cyan/35">
                      <div className="w-8 h-8 rounded bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xs text-white">ML</div>
                      <span className="text-[7px] text-slate-300 truncate mt-1">Mobile Legends</span>
                    </div>
 
                    {addedGames.map((game, i) => (
                      <div key={i} className="flex flex-col items-center bg-[#030914] p-2 rounded-lg border border-brand-cyan/20 relative animate-scaleIn">
                        <div className="w-8 h-8 rounded bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center font-bold text-xs text-slate-950">
                          {game.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-[7px] text-slate-300 truncate mt-1 w-full text-center">{game}</span>
                      </div>
                    ))}
                  </div>
 
                  {/* Add Custom Game Button */}
                  <button 
                    onClick={() => setShowAddGameModal(true)}
                    className="w-full flex items-center justify-center space-x-1.5 py-1.5 bg-brand-cyan/10 hover:bg-brand-cyan/20 text-brand-cyan rounded-lg text-[9px] font-bold font-mono transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    <span>ADICIONAR NOVO JOGO</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'gravacao' && (
              <div id="screen-recording" className="space-y-4 animate-fadeIn">
                {/* Recorder Main Hub */}
                <div className="bg-[#0a1428] rounded-xl p-4 border border-white/5 flex flex-col items-center text-center">
                  <div className="mb-2">
                    <h3 className="text-xs font-bold font-display uppercase text-white tracking-wider flex items-center justify-center">
                      GRAVADOR DE TELA
                    </h3>
                    <p className="text-[8px] text-slate-400 max-w-[200px] mx-auto mt-1">Grave vídeos de suas partidas sem perda de desempenho e armazene localmente.</p>
                  </div>

                  {/* Big Record Button */}
                  <button 
                    onClick={toggleRecording}
                    className={`h-24 w-24 rounded-full flex flex-col items-center justify-center cursor-pointer select-none border-4 transition-all duration-300 ${deviceState.isRecording ? 'border-red-500 bg-red-950/20 text-red-500 glow-purple scale-95' : 'border-brand-cyan bg-cyan-950/20 text-brand-cyan hover:scale-105'}`}
                  >
                    <Video className={`h-8 w-8 mb-1 ${deviceState.isRecording ? 'animate-pulse' : ''}`} />
                    <span className="text-[9px] font-bold tracking-wider font-mono uppercase">
                      {deviceState.isRecording ? 'GRAVANDO' : 'GRAVAR TELA'}
                    </span>
                    {deviceState.isRecording && (
                      <span className="text-[8px] text-red-400 mt-0.5 font-mono font-bold animate-ping">
                        {formatTime(recordingSeconds)}
                      </span>
                    )}
                  </button>

                  <div className="flex items-center space-x-1 mt-3 bg-[#030914] border border-white/5 py-1 px-3 rounded-full">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-slate-300 lowercase">diretório: videos/</span>
                  </div>
                </div>

                {/* Config Row */}
                <div className="bg-[#0a1428] rounded-xl p-3 border border-white/5 space-y-2">
                  <span className="text-[8px] uppercase tracking-wider text-slate-400 font-mono font-bold block">Resolução de Saída</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setDeviceState(p => ({ ...p, recordResolution: '720p' }))}
                      className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${deviceState.recordResolution === '720p' ? 'bg-brand-cyan text-slate-950 glow-btn-cyan' : 'bg-[#030914] border border-white/5 text-slate-400'}`}
                    >
                      720p 60FPS
                    </button>
                    <button 
                      onClick={() => {
                        setDeviceState(p => ({ ...p, recordResolution: '1080p' }));
                        if (onNotify) onNotify('Visualizando modo 1080p 60FPS (Premium desbloqueado para testes).');
                      }}
                      className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all relative overflow-hidden ${deviceState.recordResolution === '1080p' ? 'bg-[#bc3ffd] text-white glow-purple' : 'bg-[#030914] border border-white/5 text-slate-400'}`}
                    >
                      1080p 60FPS
                      <span className="absolute top-0 right-1 bg-yellow-400 text-[6px] text-black px-1 rounded-bl">PRO</span>
                    </button>
                  </div>
                </div>

                {/* Saved recordings lists */}
                <div className="bg-[#0a1428] rounded-xl p-3 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold font-display text-white">Histórico de Gravações</span>
                    <span className="text-[7px] text-slate-400 font-mono capitalize">Local (Não enviado a nuvem)</span>
                  </div>

                  <div className="space-y-1.5 max-h-40 overflow-y-auto scroll-hidden">
                    {deviceState.recordedVideos.length === 0 ? (
                      <p className="text-[8px] text-center text-slate-500 py-3 font-mono">Nenhum vídeo gravado ainda.</p>
                    ) : (
                      deviceState.recordedVideos.map((vid) => (
                        <div key={vid.id} className="bg-[#030914] p-2 rounded-lg flex items-center justify-between border border-white/5 animate-fadeIn">
                          <div className="flex items-center space-x-2">
                            <Video className="h-3 w-3 text-brand-cyan" />
                            <div className="max-w-[140px]">
                              <span className="text-[8px] font-mono font-bold text-slate-200 block truncate">{vid.name}</span>
                              <span className="text-[6px] text-slate-400 block font-mono">{vid.timestamp} • {vid.duration} mins</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <Share2 className="h-3 w-3 text-slate-400 cursor-pointer hover:text-white" onClick={() => onNotify && onNotify(`Simulando compartilhamento do vídeo ${vid.name}`)} />
                            <Trash2 className="h-3 w-3 text-red-400 cursor-pointer hover:text-white" onClick={() => deleteVideo(vid.id, vid.name)} />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ajustes' && (
              <div id="screen-ajustes" className="space-y-4 animate-fadeIn">
                {/* Language section from screenshots */}
                <div className="bg-[#0a1428] rounded-xl p-4 border border-white/5 space-y-2.5">
                  <div className="flex items-center space-x-2 text-brand-cyan">
                    <Globe className="h-4 w-4" />
                    <span className="text-xs font-bold font-display uppercase tracking-wider">Idioma / Language</span>
                  </div>
                  <p className="text-[8px] text-slate-400">Selecione o idioma de preferência para o aplicativo:</p>
                  
                  <div className="grid grid-cols-2 gap-2 bg-[#030914] p-1 rounded-lg">
                    <button 
                      onClick={() => switchLanguage('Portuguese')}
                      className={`py-1.5 rounded text-xs font-semibold ${deviceState.selectedLanguage === 'Portuguese' ? 'bg-gradient-to-r from-brand-cyan to-brand-cyan-muted text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                    >
                      Português
                    </button>
                    <button 
                      onClick={() => switchLanguage('English')}
                      className={`py-1.5 rounded text-xs font-semibold ${deviceState.selectedLanguage === 'English' ? 'bg-gradient-to-r from-brand-cyan to-brand-cyan-muted text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                    >
                      English
                    </button>
                  </div>
                </div>
 
                {/* Metrics configurations from screenshots */}
                <div className="bg-[#0a1428] rounded-xl p-4 border border-white/5 space-y-3.5">
                  <span className="text-xs font-bold font-display uppercase text-white block">Ajustes Rápidos</span>
 
                  <div className="space-y-1">
                     <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Sun className="h-3 w-3" />
                        <span>BRILHO DA TELA</span>
                      </span>
                      <span>{deviceState.brightness}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="100" 
                      value={deviceState.brightness}
                      onChange={(e) => setDeviceState(p => ({ ...p, brightness: parseInt(e.target.value) }))}
                      className="w-full accent-brand-cyan cursor-pointer h-1 rounded bg-[#030914]"
                    />
                  </div>
 
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Volume2 className="h-3 w-3" />
                        <span>VOLUME DO DISPOSITIVO</span>
                      </span>
                      <span>{deviceState.volume}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={deviceState.volume}
                      onChange={(e) => setDeviceState(p => ({ ...p, volume: parseInt(e.target.value) }))}
                      className="w-full accent-brand-cyan cursor-pointer h-1 rounded bg-[#030914]"
                    />
                  </div>
                </div>
 
                {/* Circular widgets */}
                <div className="grid grid-cols-2 gap-2 text-center text-slate-300 py-1">
                  <div className="bg-[#0a1428] p-2.5 rounded-xl border border-white/5 flex flex-col items-center">
                    <Zap className="h-4 w-4 text-brand-cyan mb-1" />
                    <span className="text-[8px] font-mono uppercase font-bold tracking-wider">Ajuste Métricas</span>
                  </div>
                  <div className="bg-[#0a1428] p-2.5 rounded-xl border border-brand-purple/20 flex flex-col items-center">
                    <ShieldAlert className="h-4 w-4 text-brand-purple mb-1" />
                    <span className="text-[8px] font-mono uppercase font-bold tracking-wider">Modo Foco</span>
                  </div>
                </div>
              </div>
            )}
          </div>
 
          {/* DYNAMIC SMARTPHONE TAB NAVIGATION AT BOTTOM */}
          <div className="h-16 border-t border-white/5 bg-[#050c18] flex items-center justify-around px-2 z-10">
            <button 
              onClick={() => setActiveTab('painel')}
              className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all ${activeTab === 'painel' ? 'text-brand-cyan' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <LayoutGrid className="h-4 w-4 mb-0.5" />
              <span className="text-[7.5px] font-bold font-mono tracking-wider">PAINEL</span>
            </button>
 
            <button 
              onClick={() => setActiveTab('gaming')}
              className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all ${activeTab === 'gaming' ? 'text-brand-cyan' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Gamepad2 className="h-4 w-4 mb-0.5" />
              <span className="text-[7.5px] font-bold font-mono tracking-wider">MODO GAMING</span>
            </button>
 
            <button 
              onClick={() => setActiveTab('gravacao')}
              className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all ${activeTab === 'gravacao' ? 'text-brand-cyan' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Video className="h-4 w-4 mb-0.5" />
              <span className="text-[7.5px] font-bold font-mono tracking-wider">GRAVAÇÃO</span>
            </button>
 
            <button 
              onClick={() => setActiveTab('ajustes')}
              className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all ${activeTab === 'ajustes' ? 'text-brand-cyan' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Settings className="h-4 w-4 mb-0.5" />
              <span className="text-[7.5px] font-bold font-mono tracking-wider">AJUSTES</span>
            </button>
          </div>
        </div>
 
        {/* Home indicator bar at bottom */}
        <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
      </div>
 
      {/* Add Custom Game Modal Form */}
      {showAddGameModal && (
        <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-4 z-40 animate-fadeIn">
          <div className="bg-[#0a1428] border border-brand-cyan/30 rounded-2xl p-5 w-full max-w-sm">
            <h3 className="text-sm font-bold text-white font-display mb-3">Adicionar Jogo</h3>
            <form onSubmit={handleAddGame} className="space-y-3">
              <div>
                <label className="block text-[10px] text-slate-400 font-mono mb-1 uppercase">Nome do Aplicativo</label>
                <input 
                  type="text"
                  placeholder="Ex: Minecraft, Brawl Stars..."
                  value={newGameName}
                  onChange={(e) => setNewGameName(e.target.value)}
                  className="w-full bg-[#030914] text-white border border-white/10 rounded-lg p-2 text-xs focus:border-brand-cyan outline-none"
                  autoFocus
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddGameModal(false)}
                  className="flex-1 py-2 bg-[#2d2d2d] text-white rounded-lg text-xs font-semibold hover:bg-slate-700 font-mono"
                >
                  CANCELAR
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 bg-brand-cyan text-slate-950 rounded-lg text-xs font-bold hover:bg-cyan-450 font-mono shadow-md glow-cyan"
                >
                  ADICIONAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
