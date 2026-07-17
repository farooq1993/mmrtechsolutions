"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { useState, useRef } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Why Us", href: "#why" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Compliance", href: "#compliance" },
  { label: "Contact", href: "#contact" },
];

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: "Offline POS Mode",
    desc: "Billing never stops. A lightning-fast point-of-sale that runs fully offline on Service Worker and IndexedDB, auto-syncing sales when internet returns.",
    tag: "Offline Sync",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      </svg>
    ),
    title: "AI Prescription Scanning",
    desc: "Digital prescription capture using AI models. Instantly scan handwritten or printed prescription images to extract medicines and match inventory.",
    tag: "AI Smart Scan",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "FEFO Batch Management",
    desc: "Batch-wise inventory tracking using FEFO (First Expiry, First Out). Auto-promote batches nearing expiry to minimize medicine wastage.",
    tag: "Drug Inventory",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: "GST & Financial Reports",
    desc: "Auto-calculate CGST/SGST per bill. Generate instant daily summaries, profit-loss dashboards, and complete ledger journals.",
    tag: "GST Compliance",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
      </svg>
    ),
    title: "Smart Reorder Suggestions",
    desc: "Advanced reordering tool analyzing historical daily sales velocities over active days to predict and suggest optimal reorder quantities.",
    tag: "Pharma Analytics",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Multi-Tenant SaaS isolation",
    desc: "Strict data privacy boundaries. Connect multiple branches or independent pharmacies with safe routing and separate secure workspaces.",
    tag: "Multi-Tenancy",
  },
];

const TESTIMONIALS = [
  {
    quote: "EasyPharma's offline billing saved our store during a 4-hour internet outage. We billed over 120 patients without a single delay, and everything auto-synced the moment the internet returned. Absolute lifesaver!",
    author: "Dr. Sandeep Deshmukh",
    role: "Owner, Deshmukh Medicos",
    location: "Pusad",
    rating: 5,
  },
  {
    quote: "The AI Prescription Scanning feature is magic. We just scan the handwritten doctor slips and it auto-fills the products and quantities in the invoice. What used to take 2 minutes now takes 15 seconds!",
    author: "Rahul Sharma",
    role: "Managing Director, Apex Pharma Chain",
    location: "Mumbai",
    rating: 5,
  },
  {
    quote: "Managing expiry dates was our biggest nightmare. With EasyPharma's FEFO batch management, we reduced our medicine wastage to zero. The smart purchase suggest tool also helped optimize our cash flow.",
    author: "Amit Patel",
    role: "Founder, Care Pharmacy Group",
    location: "Pune",
    rating: 5,
  }
];


const STEPS = [
  { n: "01", title: "Sign Up Free", desc: "Create your account in under 2 minutes. No credit card required." },
  { n: "02", title: "Import Your Data", desc: "Upload existing stock, supplier lists and patient records instantly." },
  { n: "03", title: "Start Billing", desc: "Issue your first GST-compliant invoice on day one." },
  { n: "04", title: "Grow Smarter", desc: "Use built-in analytics to optimize inventory and maximize profits." },
];

const WHY = [
  { title: "WhatsApp Integration", desc: "Send bills, refill reminders and offers directly to patients via WhatsApp." },
  { title: "Drug Interaction Alerts", desc: "Automatic safety warnings for harmful drug combinations at the point of billing." },
  { title: "Secure Cloud Backup", desc: "Daily encrypted cloud backups — your pharmacy data is always safe." },
  { title: "Easy to Learn", desc: "Simple, intuitive interface — your entire staff trained within one day." },
  { title: "Supplier Management", desc: "Track purchase orders, outstanding payments and complete supplier history." },
  { title: "Dedicated Support", desc: "Personalised onboarding and priority support for every account." },
];

const BADGES = ["CDSCO Ready", "GST Compliant", "Schedule H / H1", "Narcotic Drug Logs"];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="min-h-screen bg-[#040d1a] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .grad-text {
          background: linear-gradient(135deg, #00e5a0 0%, #00c896 50%, #00a8d0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-glow:hover { box-shadow: 0 0 0 1px rgba(0,200,150,0.3), 0 20px 40px rgba(0,200,150,0.08); }
        .nav-link { position: relative; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:#00c896; transition: width 0.3s ease; }
        .nav-link:hover::after { width:100%; }
        .pill-tag { font-size:10px; font-weight:600; letter-spacing:1px; text-transform:uppercase; padding:3px 10px; border-radius:20px; background:rgba(0,200,150,0.1); color:#00c896; border:1px solid rgba(0,200,150,0.25); }
        .dot-grid { background-image: radial-gradient(rgba(0,200,150,0.12) 1px, transparent 1px); background-size: 28px 28px; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5" style={{ background: 'rgba(4,13,26,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#00c896,#00a8d0)' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="serif font-bold text-xl text-white">Easy<span style={{ color: '#00c896' }}>Pharma</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav-link text-sm font-medium text-white/60 hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-600 text-[#040d1a] transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg,#00c896,#00a8d0)', fontWeight: 600 }}>
            Free Demo
          </a>
          <button className="md:hidden text-white/70" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3 border-t border-white/5">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm text-white/70 py-1">{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center dot-grid overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #00c896 0%, transparent 70%)' }}/>
          <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #00a8d0 0%, transparent 70%)' }}/>
        </div>
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* <span className="pill-tag">India's #1 Pharmacy Management Software</span> */}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7, ease: [0.22,1,0.36,1] }} className="serif mt-6 text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight">
            Run Your Pharmacy<br /><span className="grad-text">Smarter.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.7 }} className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
            Complete pharmacy operations — billing, inventory, prescriptions, compliance and analytics — all in one powerful platform built for modern Indian pharmacists.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#contact" className="px-8 py-4 rounded-xl text-base font-semibold text-[#040d1a] transition-all hover:scale-105 hover:shadow-2xl" style={{ background: 'linear-gradient(135deg,#00c896,#00a8d0)', boxShadow: '0 0 40px rgba(0,200,150,0.3)' }}>
              Book a Free Demo →
            </a>
            <a href="#features" className="px-8 py-4 rounded-xl text-base font-medium text-white/70 border border-white/10 hover:border-white/30 hover:text-white transition-all">
              Explore Features
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[["GST", "Compliant"], ["CDSCO", "Ready"], ["24/7", "Cloud Access"]].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="serif text-2xl font-bold" style={{ color: '#00c896' }}>{v}</div>
                <div className="text-xs text-white/40 mt-1 uppercase tracking-widest">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #040d1a, transparent)' }}/>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} className="pill-tag inline-block mb-4">Platform Features</motion.p>
            <motion.h2 variants={fadeUp} className="serif text-4xl md:text-5xl font-bold">Everything a Pharmacy Needs,<br /><span className="grad-text">Nothing It Doesn&apos;t</span></motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="card-glow rounded-2xl p-6 border border-white/5 transition-all duration-300" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,200,150,0.12)', color: '#00c896' }}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-base text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed font-light">{f.desc}</p>
                <span className="pill-tag mt-4 inline-block">{f.tag}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-6 border-y border-white/5" style={{ background: 'rgba(0,200,150,0.03)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} className="pill-tag inline-block mb-4">Getting Started</motion.p>
            <motion.h2 variants={fadeUp} className="serif text-4xl md:text-5xl font-bold">Up &amp; Running <span className="grad-text">in Minutes</span></motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-full w-full h-px border-t border-dashed border-white/10 z-0"/>
                )}
                <div className="relative z-10">
                  <div className="serif text-4xl font-bold mb-3" style={{ color: 'rgba(0,200,150,0.25)' }}>{s.n}</div>
                  <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY EASYPHARMA ── */}
      <section id="why" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} className="pill-tag inline-block mb-4">Why EasyPharma</motion.p>
            <motion.h2 variants={fadeUp} className="serif text-4xl md:text-5xl font-bold">Built for <span className="grad-text">Indian Pharmacies</span></motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY.map((w) => (
              <motion.div key={w.title} variants={fadeUp} className="card-glow flex gap-4 p-5 rounded-2xl border border-white/5 transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="w-8 h-8 min-w-[32px] rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(0,200,150,0.12)' }}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#00c896" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white mb-1">{w.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed font-light">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-28 px-6 border-t border-white/5" style={{ background: 'rgba(0,168,208,0.02)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} className="pill-tag inline-block mb-4">Success Stories</motion.p>
            <motion.h2 variants={fadeUp} className="serif text-4xl md:text-5xl font-bold">Trusted by <span className="grad-text">Pharmacists</span></motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, index) => (
              <motion.div key={index} variants={fadeUp} className="card-glow rounded-2xl p-8 border border-white/5 transition-all duration-300 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                {/* Decorative quote icon */}
                <div className="absolute -top-4 -right-2 text-9xl font-serif text-white/5 select-none pointer-events-none">“</div>
                
                {/* Rating stars */}
                <div className="flex gap-1 mb-4 text-emerald-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                
                {/* Quote text */}
                <p className="text-sm text-white/70 leading-relaxed font-light italic mb-6 relative z-10">
                  "{t.quote}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-[#040d1a]" style={{ background: 'linear-gradient(135deg,#00c896,#00a8d0)' }}>
                    {t.author.split(' ').pop().charAt(0) || 'P'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">{t.author}</h4>
                    <p className="text-xs text-white/45">{t.role} • {t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section id="compliance" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-3xl p-10 md:p-14 text-center border border-white/8" style={{ background: 'linear-gradient(135deg, rgba(0,200,150,0.08) 0%, rgba(0,168,208,0.06) 100%)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(0,200,150,0.15)', border: '1px solid rgba(0,200,150,0.3)' }}>
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#00c896" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h2 className="serif text-3xl md:text-4xl font-bold mb-4">100% Regulatory Compliant</h2>
            <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed font-light mb-8">EasyPharma keeps your pharmacy audit-ready at all times — all government-mandated records are maintained automatically without any extra effort on your part.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {BADGES.map(b => (
                <span key={b} className="pill-tag">{b}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="pill-tag inline-block mb-4">Get Started Today</motion.p>
            <motion.h2 variants={fadeUp} className="serif text-4xl md:text-5xl font-bold mb-4">Start Your <span className="grad-text">Free Trial</span></motion.h2>
            <motion.p variants={fadeUp} className="text-white/45 text-base mb-10 font-light">No setup fees. No contracts. 30-day free trial. Cancel anytime.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="mailto:farooqaziz1993@gmail.com?subject=EasyPharma Free Demo Request" className="px-8 py-4 rounded-xl text-base font-semibold text-[#040d1a] transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg,#00c896,#00a8d0)', boxShadow: '0 0 30px rgba(0,200,150,0.25)' }}>
                Book a Free Demo →
              </a>
              <a href="tel:+919657847644" className="px-8 py-4 rounded-xl text-base font-medium text-white/70 border border-white/10 hover:border-white/30 hover:text-white transition-all">
                Call Us Now
              </a>
            </motion.div>
            <motion.div variants={stagger} className="flex flex-col gap-3 items-center">
              {[
                { icon: "📞", label: "+91 96578 47644", href: "tel:+919657847644" },
                { icon: "📧", label: "farooqaziz1993@gmail.com", href: "mailto:farooqaziz1993@gmail.com" },
                { icon: "📍", label: "Pusad, Maharashtra, India", href: null },
              ].map(({ icon, label, href }) => (
                <motion.div key={label} variants={fadeUp}>
                  {href ? (
                    <a href={href} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                      <span>{icon}</span><span>{label}</span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 text-sm text-white/50"><span>{icon}</span><span>{label}</span></span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#00c896,#00a8d0)' }}>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="serif font-bold text-white/80">Easy<span style={{ color: '#00c896' }}>Pharma</span></span>
          </div>
          <p className="text-xs text-white/25">© {new Date().getFullYear()} EasyPharma by MMR Tech Solution. All rights reserved.</p>
          <div className="flex gap-5">
            {NAV_LINKS.slice(0, 3).map(l => (
              <a key={l.href} href={l.href} className="text-xs text-white/30 hover:text-white/70 transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}