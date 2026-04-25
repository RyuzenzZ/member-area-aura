/**
 * @file App.jsx
 * @path /src/App.jsx
 * @description Integrated Premium SaaS Landing Page, Login, and Member Dashboard
 * @dependencies react, lucide-react, tailwindcss
 * @author AURA Engine v2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Zap, Terminal, Cpu, Layers, Shield, ArrowRight, 
  Sparkles, Globe, Code, Box, CheckCircle, ChevronRight,
  Search, Bell, User, LayoutDashboard, Key, RefreshCw, 
  LifeBuoy, Share2, Settings, LogOut, Clock, Lock, Play, 
  Gamepad2, Video, Smartphone, Brain, Download, Menu, X, Crown, Star,
  AlertCircle, MessageSquare, Send, Upload, Info, Users, Rocket, Target, Check, 
} from 'lucide-react';

// --- DATA PRODUK GLOBAL ---
const ECOSYSTEM_PRODUCTS = [
  {
    id: 'web-gen', title: 'Gems Web Generator', shortDesc: 'Engine pembuat Web SaaS dan Landing Page instan dengan komponen Tailwind premium.',
    fullDesc: 'Gems Web Generator adalah toolkit eksklusif AURA untuk mengotomatisasi pembuatan arsitektur web modern. Sistem ini menghasilkan struktur React/Next.js yang sudah terintegrasi database.',
    icon: Globe, color: 'blue', theme: 'from-blue-600 to-cyan-500', bgGlow: 'bg-blue-500/10', borderHover: 'hover:border-blue-500/50',
    features: ['React & Next.js App Router', 'Premium Dark/Light Components', 'API & Database Ready'], status: 'READY - BATCH 1', actionText: 'Buka Web Generator', link: 'https://gemini.google.com/gem/1lvEGr5TfZDPZbQkNNZxA2Fvf4FPn085K?usp=sharing'
  },
  {
    id: 'prompt-eng', title: 'Gems Prompt Engineering', shortDesc: 'Kuasai seni berkomunikasi dengan AI menggunakan template tingkat lanjut dan kerangka logis.',
    fullDesc: 'Jangan sekadar bertanya pada AI, programlah mereka. Gems Prompt Engineering memberikan akses ke framework eksklusif (Zero-shot, Few-shot, Chain-of-Thought).',
    icon: Terminal, color: 'purple', theme: 'from-purple-600 to-indigo-500', bgGlow: 'bg-purple-500/10', borderHover: 'hover:border-purple-500/50',
    features: ['Master Prompt Frameworks', 'Zero-shot & Few-shot Mastery', 'Logic & Parameter Tuning'], status: 'READY - BATCH 1', actionText: 'Akses Prompt Library', link: 'https://gemini.google.com/gem/13EBxBQ_-A-OadWMwk1TXxt4eLvIN_KQQ?usp=sharing'
  },
  {
    id: 'code-puzzle', title: 'Gems Code Puzzle', shortDesc: 'Sistem pelatihan logika tingkat lanjut untuk developer dan engineer AI.',
    fullDesc: 'Tingkatkan intuisi algoritmik Anda. Gems Code Puzzle menyajikan tantangan rekayasa perangkat lunak dunia nyata.',
    icon: Cpu, color: 'emerald', theme: 'from-emerald-500 to-teal-400', bgGlow: 'bg-emerald-500/10', borderHover: 'hover:border-emerald-500/50',
    features: ['Algorithmic Challenges', 'Real-world Bug Fixing', 'System Design Scenarios'], status: 'READY - BATCH 1', actionText: 'Mulai Latihan Logika', link :'https://gemini.google.com/gem/1p5bCIEugvBBhuT7MX3ssJ9fyaHJ7sBsg?usp=sharing'
  },
  {
    id: 'game-engine', title: 'Gems Game Engine', shortDesc: 'Mesin pembuat game HTML5/Canvas dengan dukungan fisika dan sprite rendering.',
    fullDesc: 'Bangun ekosistem gamifikasi langsung di browser. Engine ini dilengkapi dengan deteksi tabrakan (collision detection), manajemen state game loop, dan rendering 60FPS.',
    icon: Gamepad2, color: 'rose', theme: 'from-rose-500 to-pink-500', bgGlow: 'bg-rose-500/10', borderHover: 'hover:border-rose-500/50',
    features: ['60FPS Canvas Rendering', 'Physics & Collision System', 'Sprite Animation Manager'], status: 'READY - BATCH 1', actionText: 'Luncurkan Game Engine', link: 'https://gemini.google.com/gem/1iLpHJZWcnro9SnV1lNpKBOmV4cVkXrke?usp=sharing'
  }
];

// ==========================================
// TOAST NOTIFICATION SYSTEM
// ==========================================
const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
    {toasts.map((toast) => (
      <div key={toast.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md pointer-events-auto transform transition-all animate-in slide-in-from-right-8 fade-in duration-300
        ${toast.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-100' : 
          toast.type === 'warning' ? 'bg-yellow-950/80 border-yellow-500/30 text-yellow-100' : 
          'bg-blue-950/80 border-blue-500/30 text-blue-100'}`}>
        {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" /> : 
         toast.type === 'warning' ? <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0" /> : 
         <Info className="w-5 h-5 text-blue-400 shrink-0" />}
        <p className="text-sm font-medium pr-4">{toast.message}</p>
        <button onClick={() => removeToast(toast.id)} className="ml-auto text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
      </div>
    ))}
  </div>
);

// ==========================================
// 1. KOMPONEN LANDING PAGE
// ==========================================
function LandingPage({ onNavigateToLogin, showToast }) {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLockedAccess = () => {
    showToast('Akses Terkunci. Silakan masuk ke Dashboard terlebih dahulu untuk mengakses fitur ini.', 'warning');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans overflow-x-hidden relative scroll-smooth">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]"></div>
      </div>

      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-[#0a0f1c]/90 backdrop-blur-md border-b border-slate-800/60 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-wider text-white">AURA<span className="font-light text-slate-400">SYSTEM</span></h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#tentang" className="hover:text-white transition-colors">Tentang</a>
            <a href="#cara-kerja" className="hover:text-white transition-colors">Cara Kerja</a>
            <a href="#target" className="hover:text-white transition-colors">Untuk Siapa</a>
            <a href="#ekosistem" className="hover:text-white transition-colors">Ekosistem</a>
            <a href="#kreator" className="hover:text-white transition-colors">Kreator</a>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onNavigateToLogin} className="bg-white text-slate-900 hover:bg-slate-200 px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center gap-2 group">
              Member Login <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 text-center max-w-7xl mx-auto px-6 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase mb-8">
          <Sparkles className="w-3.5 h-3.5" /> Engine v2.0 Telah Rilis
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Membangun <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">Mahakarya</span> <br className="hidden md:block" />
          Bukan Sekadar Kode.
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Sistem rekayasa perangkat lunak enterprise-grade. Kami menciptakan produk digital yang scalable, aman, dan siap produksi secara instan menggunakan bantuan kecerdasan buatan.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={onNavigateToLogin} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:opacity-90 flex items-center justify-center gap-2 transition-all">
            <Terminal className="w-5 h-5" /> Masuk Workspace
          </button>
          <a href="#tentang" className="bg-[#0a0f1c] border border-slate-700 hover:border-slate-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
            Pelajari Lebih Lanjut
          </a>
        </div>
      </section>

      {/* WHAT IS AURA */}
      <section id="tentang" className="py-24 relative z-10 bg-[#060a14] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">Apa itu AURA System?</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Architectural Engine Masa Depan.</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                AURA (Advanced Universal Runtime Architect) bukan sekadar alat pembuat kode atau template generator. Ini adalah <strong className="text-white">Ekosistem Rekayasa Perangkat Lunak</strong> cerdas yang dirancang untuk membangun sistem kompleks dalam hitungan menit, bukan bulan.
              </p>
              <ul className="space-y-4">
                {[
                  'Mengeliminasi 90% waktu penulisan kode boilerplate.',
                  'Infrastruktur siap pakai: Frontend, Backend, dan Database.',
                  'Ditenagai oleh framework Prompt Engineering tingkat lanjut.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl rounded-full"></div>
              <div className="relative bg-[#030712] border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="ml-2 text-xs text-slate-500 font-mono">aura-core-engine.tsx</span>
                </div>
                <pre className="text-sm text-slate-400 font-mono overflow-x-auto">
                  <code className="text-blue-400">import</code> {"{ AURA }"} <code className="text-blue-400">from</code> <span className="text-emerald-400">'@logicfunnel/aura'</span>;{'\n\n'}
                  <code className="text-purple-400">const</code> system = <code className="text-blue-400">new</code> AURA({"{"}{'\n'}
                  {'  '}type: <span className="text-emerald-400">'SaaS_Platform'</span>,{'\n'}
                  {'  '}database: <span className="text-emerald-400">'PostgreSQL'</span>,{'\n'}
                  {'  '}auth: <span className="text-emerald-400">'JWT_Advanced'</span>{'\n'}
                  {"}"});{'\n\n'}
                  <span className="text-slate-500">// Menghasilkan 24 file siap produksi dalam 3 detik</span>{'\n'}
                  <code className="text-yellow-400">await</code> system.compile();
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="cara-kerja" className="py-24 relative z-10 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-3">Bagaimana Cara Kerjanya?</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-16">Otomatisasi Dari Ide ke Produksi</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 -z-10 -translate-y-1/2"></div>
            
            {[
              { step: '01', title: 'Brainstorm', desc: 'Gunakan modul Prompt Engineering kami untuk merumuskan arsitektur.', icon: Brain },
              { step: '02', title: 'Generate', desc: 'Web Generator akan menulis ribuan baris kode UI/UX secara instan.', icon: Code },
              { step: '03', title: 'Integrate', desc: 'Kode otomatis terhubung dengan logika Database dan Autentikasi.', icon: Layers },
              { step: '04', title: 'Launch', desc: 'Aplikasi siap diluncurkan dan digunakan oleh pengguna nyata.', icon: Rocket }
            ].map((item, i) => (
              <div key={i} className="bg-[#0a0f1c] border border-slate-800 p-8 rounded-2xl relative group hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 mx-auto bg-[#030712] border border-slate-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:border-blue-500 transition-colors">
                  <item.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold text-white border-4 border-[#030712] shadow-xl">
                  {item.step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section id="target" className="py-24 relative z-10 bg-[#060a14] border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">Untuk Siapa?</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white">Dirancang untuk Para Eksekutor</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { role: 'Software Developer', desc: 'Tingkatkan kecepatan coding Anda 10x lipat. Lewati setup yang membosankan dan fokus pada logika bisnis inti.', icon: Terminal },
              { role: 'Agency & Freelancer', desc: 'Selesaikan proyek klien lebih cepat dengan standar arsitektur kualitas tinggi. Skalakan bisnis Anda tanpa batas.', icon: Users },
              { role: 'Startup Founder', desc: 'Validasi ide Anda ke pasar dalam hitungan hari. Bangun MVP yang solid tanpa perlu menyewa tim engineer besar.', icon: Target }
            ].map((target, i) => (
              <div key={i} className="bg-gradient-to-br from-[#0a0f1c] to-[#030712] border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors">
                <target.icon className="w-10 h-10 text-emerald-400 mb-6" />
                <h4 className="text-2xl font-bold text-white mb-3">{target.role}</h4>
                <p className="text-slate-400 leading-relaxed">{target.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section id="ekosistem" className="py-24 relative z-10 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">Ekosistem Produk</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Kuasai <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Aset Digital</span>.</h3>
            <p className="text-slate-400 max-w-xl">Klik modul di bawah untuk melihat spesifikasi detail (Akses fitur terkunci untuk non-member).</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ECOSYSTEM_PRODUCTS.map((product) => (
              <div key={product.id} onClick={() => setSelectedProduct(product)} className={`group cursor-pointer rounded-3xl bg-gradient-to-br from-slate-800 to-[#0a0f1c] border border-slate-800/80 p-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] ${product.borderHover} transition-all`}>
                <div className="bg-[#030712] rounded-[23px] h-full p-8 flex flex-col relative overflow-hidden">
                  <div className={`absolute -top-10 -right-10 w-48 h-48 ${product.bgGlow} blur-[60px] rounded-full`}></div>
                  <div className="flex justify-between items-start mb-6 z-10">
                    <div className={`w-14 h-14 rounded-2xl ${product.bgGlow} flex items-center justify-center`}>
                      <product.icon className={`w-7 h-7 text-${product.color}-400`} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 group-hover:text-white flex items-center gap-1">Detail <ArrowRight className="w-3 h-3"/></span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 z-10">{product.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 flex-1 z-10">{product.shortDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATOR / @LogicFunnel */}
      <section id="kreator" className="py-24 relative z-10 bg-[#060a14] border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-1 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            <div className="w-full h-full bg-[#0a0f1c] rounded-full flex items-center justify-center">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Dikembangkan Eksklusif Oleh</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">@LogicFunnel</h3>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Misi kami adalah mendemokratisasi arsitektur software level enterprise. Melalui AURA System, kami menggabungkan logika bisnis yang presisi dengan kekuatan Artificial Intelligence untuk menciptakan workflow masa depan.
          </p>
          <button onClick={onNavigateToLogin} className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all inline-flex items-center gap-2">
            Bergabung dengan Ekosistem <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* PRODUCT MODAL WITH LOCKED BUTTON */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative w-full max-w-3xl bg-[#0a0f1c] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className={`h-24 w-full bg-gradient-to-r ${selectedProduct.theme} opacity-10 absolute top-0`}></div>
            <div className="relative p-6 sm:p-8">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
              <div className="flex items-center gap-4 mb-6 mt-2">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${selectedProduct.theme} shadow-lg shrink-0`}><selectedProduct.icon className="w-8 h-8 text-white" /></div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedProduct.title}</h2>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md mt-1 inline-block">{selectedProduct.status}</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{selectedProduct.fullDesc}</p>
              
              <div className="bg-[#030712] rounded-xl border border-slate-800 p-5 mt-4">
                <div className="flex items-center gap-3 text-sm text-rose-400 mb-4 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                  <Lock className="w-5 h-5 shrink-0" />
                  <p><b>Akses Terkunci.</b> Anda harus login ke Member Dashboard untuk membuka engine ini.</p>
                </div>
                <button 
                  onClick={handleLockedAccess}
                  className="w-full bg-slate-800 text-slate-400 py-3 rounded-lg font-bold text-sm cursor-not-allowed border border-slate-700 flex justify-center items-center gap-2"
                >
                  <Lock className="w-4 h-4" /> {selectedProduct.actionText} (Terkunci)
                </button>
                <button onClick={onNavigateToLogin} className="w-full mt-3 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold text-sm transition-colors">
                  Login ke Dashboard Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. KOMPONEN LOGIN PAGE
// ==========================================
function LoginPage({ onLoginSuccess, onBack }) {
  const [formData, setFormData] = useState({ username: '', password: '', batch: 'Batch 1', rememberMe: false });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: formData.username || 'Member AURA',
      username: formData.username.toLowerCase().replace(/\s/g, '') || 'member',
      batch: formData.batch,
      avatar: null,
      role: formData.username.toLowerCase().includes('admin') ? 'admin' : 'member'
    });
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"></div>
      
      <button onClick={onBack} className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2">
        <ArrowRight className="w-4 h-4 rotate-180" /> Kembali
      </button>

      <div className="w-full max-w-md bg-[#0a0f1c]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Member Login</h2>
          <p className="text-slate-400 text-sm mt-1">Masuk ke workspace AURA Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username / Email</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input required type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} placeholder="Masukkan username..." className="w-full bg-[#030712] border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••••" className="w-full bg-[#030712] border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Akses Batch</label>
            <select value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} className="w-full bg-[#030712] border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 appearance-none">
              <option value="Batch 1">Bundle Batch 1 (Gems Series)</option>
              <option value="Batch 2">Bundle Batch 2 (Automation)</option>
              <option value="Elite">Elite Lifetime Access</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="peer sr-only" 
                  checked={formData.rememberMe} 
                  onChange={e => setFormData({...formData, rememberMe: e.target.checked})} 
                />
                <div className="w-5 h-5 border-2 border-slate-700 rounded bg-[#030712] peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
                <Check className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Ingat saya</span>
            </label>
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">Lupa Password?</a>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-bold mt-4 shadow-lg hover:opacity-90 transition-opacity">
            Masuk ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 3. KOMPONEN MEMBER DASHBOARD
// ==========================================
function MemberDashboard({ user, updateUser, onLogout, showToast }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeChatTab, setActiveChatTab] = useState('member'); 
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [messages, setMessages] = useState({
    member: [
      { id: 1, sender: 'Alex (Batch 1)', text: 'Halo semua! Ada yang sudah coba integrasi Database di Web Gen?', time: '10:00' },
      { id: 2, sender: 'Siti_Dev', text: 'Sudah! Sangat mulus pakai Prisma.', time: '10:05' }
    ],
    admin: [
      { id: 1, sender: 'AURA Bot', text: `Halo ${user.name}, saya AURA Bot. Ada yang bisa saya bantu terkait produk AURA hari ini?`, time: '09:00', isAdmin: true }
    ]
  });

  const sidebarLinks = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Batch 1 Products', icon: Box },
    { name: 'Batch 2 Preview', icon: Sparkles },
    { name: 'My License', icon: Key },
    { name: 'Update Center', icon: RefreshCw },
    { name: 'Live Support', icon: MessageSquare },
    { name: 'Settings', icon: Settings },
  ];

 const handleLaunchProduct = (product) => {
  if (product.link) {
    window.open(product.link, '_blank', 'noopener,noreferrer');
    showToast(`Engine ${product.title} sedang diinisialisasi...`, 'success');
  } else {
    showToast(`Link untuk ${product.title} belum tersedia.`, 'warning');
  }
};

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(!chatInput.trim()) return;
    
    const userText = chatInput;
    const newMessage = { id: Date.now(), sender: user.name, text: userText, time: 'Baru saja', isSelf: true };
    
    setMessages(prev => ({ ...prev, [activeChatTab]: [...prev[activeChatTab], newMessage] }));
    setChatInput('');
    
    if(activeChatTab === 'admin') {
      setIsBotTyping(true);
      
      const apiKey = ""; 
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      
      const history = messages.admin.map(msg => ({
        role: msg.isAdmin ? "model" : "user",
        parts: [{ text: msg.text }]
      }));
      history.push({ role: "user", parts: [{ text: userText }] });

      const payload = {
        contents: history,
        systemInstruction: {
          parts: [{ text: "Anda adalah AURA Bot, asisten AI resmi untuk AURA PROJECT SYSTEM yang diciptakan oleh LogicFunnel. Tugas Anda adalah membantu member dengan pertanyaan teknis, panduan instalasi, atau info umum seputar produk (Gems Web Generator, Prompt Engineering, Code Puzzle, Game Engine). Jawab dengan profesional, cerdas, ramah, dan ringkas menggunakan bahasa Indonesia. Anda juga bisa memberi saran teknis atau potongan kode sederhana jika diminta. JANGAN gunakan simbol asterisk (*) untuk menebalkan (bold) atau memiringkan (italic) teks, cukup gunakan format teks biasa agar mudah dibaca." }]
        }
      };

      let retries = 5;
      let delay = 1000;
      let botReply = "Maaf, terjadi kesalahan internal saat memproses pesan.";

      while (retries > 0) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const result = await response.json();
          botReply = result.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak dapat memahami permintaan Anda.";
          botReply = botReply.replace(/\*/g, '');
          break;
        } catch (error) {
          retries--;
          if (retries === 0) {
            botReply = "Maaf, koneksi ke server AURA Bot sedang terganggu. Silakan coba lagi nanti.";
          } else {
            await new Promise(res => setTimeout(res, delay));
            delay *= 2;
          }
        }
      }

      setMessages(prev => ({ ...prev, admin: [...prev.admin, { id: Date.now(), sender: 'AURA Bot', text: botReply, time: 'Baru saja', isAdmin: true }]}));
      setIsBotTyping(false);
      showToast('Balasan baru dari AURA Bot', 'info');
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    updateUser({ ...user, name: formData.get('name') });
    showToast('Profil berhasil diperbarui!', 'success');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0a0f1c]/40 backdrop-blur-sm p-8">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-600/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Akses {user.batch} Aktif
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Selamat Datang, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{user.name}</span></h2>
                <p className="text-slate-400 max-w-xl text-sm">Gunakan panel ini untuk mengakses semua modul AURA Bundle yang telah Anda dapatkan. Arsitektur siap dibangun.</p>
              </div>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[ { title: 'Modul Aktif', value: '4 Engine', icon: Cpu, color: 'text-blue-400' },
                 { title: 'Status Lisensi', value: 'Lifetime', icon: Shield, color: 'text-emerald-400' },
                 { title: 'Cloud Sync', value: 'Connected', icon: Globe, color: 'text-purple-400' }
              ].map((stat, i) => (
                <div key={i} className="bg-[#0a0f1c] border border-slate-800 rounded-xl p-5 flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-slate-800/50"><stat.icon className={`w-6 h-6 ${stat.color}`} /></div>
                  <div><p className="text-sm text-slate-400">{stat.title}</p><p className="text-xl font-bold text-white">{stat.value}</p></div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Batch 1 Products':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-2"><Box className="text-blue-400"/> Modul Aktif (Batch 1)</h3>
            <p className="text-slate-400 text-sm mb-6">Klik tombol buka untuk mulai menggunakan engine generator.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ECOSYSTEM_PRODUCTS.map((product) => (
                <div key={product.id} className="bg-[#0a0f1c] rounded-xl border border-slate-800 p-6 flex flex-col hover:border-slate-700 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.theme} flex items-center justify-center`}><product.icon className="w-6 h-6 text-white"/></div>
                    <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md">READY</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{product.title}</h4>
                  <p className="text-sm text-slate-400 mb-6 flex-1">{product.shortDesc}</p>
                  <button onClick={() => handleLaunchProduct(product)} className="w-full bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/20 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2">
                    {product.actionText} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Live Support':
        return (
          <div className="h-[calc(100vh-140px)] flex flex-col bg-[#0a0f1c] border border-slate-800 rounded-2xl overflow-hidden animate-in fade-in duration-500">
            <div className="border-b border-slate-800 bg-[#030712] p-4 flex gap-4">
              <button onClick={() => setActiveChatTab('member')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeChatTab === 'member' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>Global Member Chat</button>
              <button onClick={() => setActiveChatTab('admin')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeChatTab === 'admin' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><Zap className="w-4 h-4"/> AURA Bot AI</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages[activeChatTab].map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-400">{msg.sender} {msg.isAdmin && <Crown className="inline w-3 h-3 text-yellow-500"/>}</span>
                    <span className="text-[10px] text-slate-600">{msg.time}</span>
                  </div>
                  <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm whitespace-pre-wrap ${msg.isSelf ? 'bg-blue-600 text-white rounded-tr-sm' : msg.isAdmin ? 'bg-purple-900/50 border border-purple-500/30 text-white rounded-tl-sm' : 'bg-slate-800 text-slate-200 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isBotTyping && activeChatTab === 'admin' && (
                <div className="flex flex-col items-start animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-400">AURA Bot <Crown className="inline w-3 h-3 text-yellow-500"/></span>
                  </div>
                  <div className="px-5 py-4 rounded-2xl max-w-[80%] bg-purple-900/50 border border-purple-500/30 text-white rounded-tl-sm flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-[#030712] flex gap-3">
              <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder={activeChatTab === 'admin' ? 'Tanya sesuatu ke AURA Bot (AI)...' : 'Tanya sesuatu ke komunitas...'} className="flex-1 bg-[#0a0f1c] border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 disabled:opacity-50" disabled={isBotTyping && activeChatTab === 'admin'} />
              <button type="submit" disabled={isBotTyping && activeChatTab === 'admin'} className={`px-5 rounded-xl flex items-center justify-center transition-colors ${isBotTyping && activeChatTab === 'admin' ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}><Send className="w-5 h-5"/></button>
            </form>
          </div>
        );

      case 'Settings':
        return (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-6"><Settings className="text-slate-400"/> Pengaturan Profil</h3>
            <div className="bg-[#0a0f1c] border border-slate-800 rounded-2xl p-6 md:p-8">
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="flex items-center gap-6 pb-6 border-b border-slate-800">
                  <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                    {user.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : <User className="w-10 h-10 text-slate-500" />}
                  </div>
                  <div>
                    <button type="button" onClick={() => showToast('Fitur upload gambar akan segera tersedia', 'info')} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"><Upload className="w-4 h-4"/> Ubah Foto</button>
                    <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max size of 2MB</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">Nama Tampilan</label>
                  <input name="name" defaultValue={user.name} required className="w-full bg-[#030712] border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">Username</label>
                  <input readOnly value={`@${user.username}`} className="w-full bg-[#030712]/50 border border-slate-800 text-slate-500 rounded-xl py-3 px-4 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">Tingkat Akses (Batch)</label>
                  <div className="bg-blue-900/20 border border-blue-500/30 text-blue-300 rounded-xl py-3 px-4 text-sm font-bold flex items-center gap-2">
                    <Crown className="w-4 h-4" /> {user.batch} Member
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-colors">Simpan Perubahan</button>
                </div>
              </form>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 animate-in fade-in">
            <Code className="w-12 h-12 mb-4 opacity-20" />
            <p>Fitur <b className="text-slate-300">{activeTab}</b> sedang dalam pengembangan.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans overflow-hidden flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 md:w-72 bg-[#0a0f1c]/95 backdrop-blur-xl border-r border-slate-800/60 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center px-6 border-b border-slate-800/60 relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mr-3"><Zap className="w-4 h-4 text-white" /></div>
            <div>
              <h1 className="text-base md:text-lg font-bold tracking-wider text-white">AURA<span className="font-light text-slate-400">SYSTEM</span></h1>
              <p className="text-[9px] text-blue-400 uppercase tracking-widest font-semibold">Member Area</p>
            </div>
            <button className="lg:hidden ml-auto text-slate-400" onClick={() => setIsMobileMenuOpen(false)}><X className="w-5 h-5" /></button>
          </div>
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
            <p className="px-3 text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-3">Main Menu</p>
            {sidebarLinks.map((link, idx) => {
              const Icon = link.icon;
              const isActive = activeTab === link.name;
              return (
                <button key={idx} onClick={() => { setActiveTab(link.name); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="font-medium text-sm">{link.name}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-800/60">
            <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-rose-400/80 hover:bg-rose-500/10 hover:text-rose-400 transition-all text-sm font-bold">
              <LogOut className="w-4 h-4" /> Keluar
            </button>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-[#0a0f1c]/80 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-6 z-40 shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-400" onClick={() => setIsMobileMenuOpen(true)}><Menu className="w-6 h-6" /></button>
            <h2 className="hidden md:block font-bold text-white text-lg">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-slate-400 hover:text-white relative"><Bell className="w-5 h-5" /><span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span></button>
            <div className="h-6 w-px bg-slate-700"></div>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('Settings')}>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white">{user.name}</p>
                <p className="text-[10px] text-blue-400 uppercase tracking-widest">{user.batch}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600"><User className="w-5 h-5 text-slate-400" /></div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 relative">
           {renderContent()}
        </main>
      </div>
    </div>
  );
}

// ==========================================
// 4. MAIN APP ROUTER (STATE BASED)
// ==========================================
export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-scrollbar::-webkit-scrollbar { width: 6px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #1e293b; border-radius: 20px; }
      .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #334155; }
      html { scroll-behavior: smooth; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage 
          onNavigateToLogin={() => { window.scrollTo(0, 0); setCurrentView('login'); }}
          showToast={showToast} 
        />
      )}
      {currentView === 'login' && (
        <LoginPage 
          onLoginSuccess={(userData) => {
            setUser(userData);
            setCurrentView('dashboard');
            showToast(`Berhasil masuk! Selamat datang, ${userData.name}`, 'success');
          }}
          onBack={() => setCurrentView('landing')}
        />
      )}
      {currentView === 'dashboard' && user && (
        <MemberDashboard 
          user={user}
          updateUser={setUser}
          showToast={showToast}
          onLogout={() => {
            setUser(null);
            setCurrentView('landing');
            showToast('Anda telah keluar dari sesi.', 'info');
          }} 
        />
      )}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
