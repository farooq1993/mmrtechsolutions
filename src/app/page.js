"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { useState, useRef } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Product Tour", href: "#tour" },
  { label: "Comparison", href: "#comparison" },
  { label: "How It Works", href: "#how" },
  { label: "Why Us", href: "#why" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Compliance", href: "#compliance" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: "Zero-Downtime Hybrid POS",
    desc: "Built to eliminate sales leakage. Our proprietary hybrid-sync engine ensures 100% operational uptime, allowing pharmacies to bill offline and auto-sync to the cloud.",
    tag: "Business Continuity",
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
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    title: "WhatsApp Bills & Reminders",
    desc: "Send digital invoices, bill updates and refill reminders directly to your patients' WhatsApp numbers with one click.",
    tag: "Patient Engagement",
  },
];

const TOUR_TABS = [
  {
    id: "dashboard",
    title: "Interactive Dashboard",
    subtitle: "Real-time Store Command Center",
    image: "/dashboard.png",
    metric: "1-Click",
    metricLabel: "Total Business Control",
    desc: "The primary control center of your pharmacy. Get a visual overview of daily sales, total completed transactions, low-stock valuation, active expiry alerts, and top prescribing doctors instantly.",
    usefulness: "Provides pharmacy owners with complete operational visibility, helping make quick, data-driven decisions to optimize inventory and sales.",
    points: [
      "Real-time revenue tracking and sales metrics.",
      "Instant visibility of total transaction counts.",
      "Proactive alerts for batches expiring in the next 30-50 days.",
      "Visual charts of top-selling products and top prescribing doctors."
    ]
  },
  {
    id: "purchase-import",
    title: "CSV Purchase Entry",
    subtitle: "Automatic Invoice Ingestion",
    image: "/purchase_entry.png",
    metric: "95%",
    metricLabel: "Time Saved on Data Entry",
    desc: "Eliminate manual invoice typing. Simply upload the CSV file received from your distributor, and the system will automatically extract and populate the entire purchase entry form.",
    usefulness: "Reduces purchase entry time from 15-20 minutes down to just 30 seconds, eliminating manual data entry mistakes and saving pharmacists hours of clerical work daily.",
    points: [
      "Process complex 30+ item purchase bills in under 30 seconds.",
      "Smart reconciliation system matches names with database products.",
      "Automatically populates batch numbers, expiries, rates, and GST.",
      "Instantly updates supplier ledger records and outstanding dues."
    ]
  },
  {
    id: "suggestions",
    title: "Smart Purchase Suggestions",
    subtitle: "Data-Driven Inventory Ordering",
    image: "/purchase_suggestions.png",
    metric: "0%",
    metricLabel: "Stockout / Shortage Rate",
    desc: "An intelligent ordering helper that calculates drug sales velocity to recommend exactly what to reorder and from which supplier.",
    usefulness: "Ensures your store never runs out of essential medicines (zero stockouts) while preventing cash from being locked up in excess stock (zero dead stock).",
    points: [
      "Automatically highlights critical, low, and out-of-stock items.",
      "Predicts 'Days Left' for every medicine based on historical sales.",
      "Recommends the best supplier and pricing for reordering.",
      "Adds suggested quantities to your active purchase bill in one click."
    ]
  },
  {
    id: "analysis",
    title: "Purchase Analysis",
    subtitle: "Intelligent Purchase Analytics",
    image: "/purchase_analysis.png",
    metric: "100%",
    metricLabel: "GST & Cashflow Tracking",
    desc: "A comprehensive dashboard detailing total purchases, average invoice values, and GST tax rate distributions over time.",
    usefulness: "Gives clear cost visibility to help negotiate better discount terms with distributors, track payment modes, and simplify GST tax filing.",
    points: [
      "6-month historical purchase value trend charts.",
      "Detailed payment mode split (Cash vs. Credit) to manage cashflow.",
      "Insights into top suppliers by total spend.",
      "GST rate breakdown for easy auditing and compliance filing."
    ]
  }
];

const COMPARISON_FEATURES = [
  {
    feature: "Offline + Cloud Hybrid Billing",
    easyPharma: "100% Zero-downtime offline billing with auto-sync to cloud",
    regular: "Desktop-only (data loss risk) or Cloud-only (stops when internet drops)",
    highlight: true,
  },
  {
    feature: "CSV Purchase Import",
    easyPharma: "Instant CSV billing import and receipt parsing under 30 seconds",
    regular: "Manual typing of every single drug name, batch, rate, and expiry",
    highlight: true,
  },
  {
    feature: "FEFO Expiry Loss Control",
    easyPharma: "Auto FEFO batch selection + proactive near-expiry alerts",
    regular: "Manual batch verification; high risk of expired medicine wastage",
    highlight: false,
  },
  {
    feature: "WhatsApp Digital Invoicing",
    easyPharma: "Send instant e-invoices & refill reminders on WhatsApp",
    regular: "Paper receipts only; zero automated customer retention",
    highlight: true,
  },
  {
    feature: "Smart Purchase Suggestions",
    easyPharma: "AI calculates reorder points based on daily sales velocity",
    regular: "Manual stock checking & inventory guesswork",
    highlight: false,
  },
  {
    feature: "Cloud Data Backup & Remote Access",
    easyPharma: "View real-time sales & reports anytime from Phone or Laptop",
    regular: "Locked to single shop desktop PC",
    highlight: false,
  },
  {
    feature: "Automated Regulatory Audit Logs",
    easyPharma: "Auto-generated Schedule H/H1 & GST sales summary logs",
    regular: "Manual logbooks and laborious audit preparation",
    highlight: false,
  },
  {
    feature: "Pricing & Total Cost of Ownership",
    easyPharma: "Affordable ₹6,500 setup + ₹2,000/yr AMC (60-70% lower TCO)",
    regular: "₹12,000 - ₹25,000 upfront + ₹5,000+/yr AMC & hidden module fees",
    highlight: true,
  },
  {
    feature: "Ease of Use & Staff Onboarding",
    easyPharma: "Ultra-clean modern UI; staff fully trained in under 1 day",
    regular: "Complex legacy Windows UI with steep learning curve",
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    quote: "With EasyPharma, everything is visible in just a single click. The user interface is incredibly simple and clean. Truly, just like its name, this software makes pharmacy management absolutely easy!",
    author: "Adil Khan",
    role: "Owner, Prince Medical Store",
    location: "Pusad",
    rating: 5,
  },
  {
    quote: "Using EasyPharma has drastically reduced our purchase entry time. Plus, being cloud-based, I can securely access my store database and manage operations from anywhere, anytime.",
    author: "Mushaheed",
    role: "Owner, Tawakkal Medical & General Store",
    location: "Pusad",
    rating: 5,
  },
  {
    quote: "Operating from a tier-3 city, having a cloud-based app like EasyPharma has been a game-changer for us. Its smart CSV import feature is exceptionally fast and saves us hours of manual entry.",
    author: "Aditya",
    role: "Owner, Adishakti medical",
    location: "Pusad",
    rating: 5,
  }
];

const STEPS = [
  { n: "01", title: "Request a Demo", desc: "Book a personalized live walkthrough to see how EasyPharma fits your pharmacy store." },
  { n: "02", title: "Custom Setup", desc: "We deploy your dedicated, secure cloud database and configure branch isolation." },
  { n: "03", title: "Data Migration", desc: "Our tech team securely imports all your existing stocks, suppliers, and items." },
  { n: "04", title: "Go Live & Train", desc: "Get your staff trained in 1 day and start issuing GST-compliant invoices immediately." },
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

const FAQS = [
  {
    q: "What is EasyPharma and how does it differ from traditional desktop software?",
    a: "EasyPharma is a modern cloud-based hybrid POS and inventory management system designed for pharmacies. Unlike legacy desktop software, it gives you real-time access to your store data from any device, automated daily encrypted backups, and seamless offline billing without risking data loss."
  },
  {
    q: "How does the CSV Purchase Entry feature save time?",
    a: "Instead of manually typing every medicine name, packing size, rate, batch number, and expiry date from distributor bills, you can simply upload their CSV invoice. EasyPharma automatically reconciles and populates the details, reducing data entry time from 15-20 minutes down to just 30 seconds."
  },
  {
    q: "What happens if my internet connection goes down?",
    a: "Your operations will continue without interruption. EasyPharma features an offline hybrid billing engine, allowing you to generate GST-compliant invoices offline. As soon as your internet connection is restored, all data automatically syncs with the secure cloud."
  },
  {
    q: "Is EasyPharma compliant with drug regulations in India?",
    a: "Yes. EasyPharma is 100% CDSCO ready and GST compliant. It maintains automated registers for Schedule H & H1 drugs, records narcotic logs, handles batch-wise FEFO (First Expiry, First Out) inventory management, and calculates CGST/SGST per transaction automatically."
  },
  {
    q: "How fast can we migrate our data and start billing?",
    a: "The complete migration process takes less than 24 hours. Our technical onboarding team handles the secure transfer of your existing items, stocks, and supplier lists. Because the interface is modern and intuitive, your staff can be fully trained to start billing in under 1 day."
  }
];

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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="min-h-screen bg-white text-slate-800 overflow-x-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .grad-text {
          background: linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-glow {
          border: 1px solid rgba(124, 58, 237, 0.08);
          background: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-glow:hover {
          border-color: rgba(124, 58, 237, 0.3);
          box-shadow: 0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04);
          transform: translateY(-2px);
        }
        .nav-link { position: relative; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#7c3aed; transition: width 0.3s ease; }
        .nav-link:hover::after { width:100%; }
        .pill-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(124, 58, 237, 0.06);
          color: #7c3aed;
          border: 1px solid rgba(124, 58, 237, 0.15);
        }
        .dot-grid {
          background-image: radial-gradient(rgba(124, 58, 237, 0.07) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#7c3aed,#10b981)' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="serif font-bold text-xl text-slate-900">Easy<span style={{ color: '#7c3aed' }}>Pharma</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav-link text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">{l.label}</a>
            ))}
          </div>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg,#7c3aed,#10b981)' }}>
            Free Demo
          </a>
          <button className="md:hidden text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3 border-t border-slate-100 bg-white shadow-lg">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm text-slate-600 py-1">{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center dot-grid overflow-hidden pt-16 bg-gradient-to-b from-purple-50/20 via-white to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}/>
          <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}/>
        </div>
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="pill-tag" style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.15)' }}>🚀 Launched June 2026</span>
            <span className="pill-tag" style={{ background: 'rgba(124, 58, 237, 0.08)', color: '#7c3aed', borderColor: 'rgba(124, 58, 237, 0.15)' }}>📈 6+ Pharmacies Onboarded in Month 1</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7, ease: [0.22,1,0.36,1] }} className="serif mt-6 text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-slate-900">
            Run Your Pharmacy<br /><span className="grad-text">Smarter.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.7 }} className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            Complete pharmacy operations — billing, inventory, purchases, compliance and analytics — all in one powerful platform built for modern Indian pharmacists.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#contact" className="px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl" style={{ background: 'linear-gradient(135deg,#7c3aed,#10b981)', boxShadow: '0 10px 30px rgba(124,58,237,0.2)' }}>
              Book a Free Demo →
            </a>
            <a href="#features" className="px-8 py-4 rounded-xl text-base font-medium text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-950 transition-all bg-white">
              Explore Features
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              ["June 2026", "Official Launch"],
              ["6+ Stores", "Onboarded in Month 1"],
              ["100%", "Cloud Uptime"],
              ["CDSCO", "Ready & Compliant"]
            ].map(([v, l]) => (
              <div key={l} className="text-center p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                <div className="serif text-2xl font-bold" style={{ color: '#7c3aed' }}>{v}</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }}/>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-28 px-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} className="pill-tag inline-block mb-4">Platform Features</motion.p>
            <motion.h2 variants={fadeUp} className="serif text-4xl md:text-5xl font-bold text-slate-900">Everything a Pharmacy Needs,<br /><span className="grad-text">Nothing It Doesn&apos;t</span></motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="card-glow rounded-2xl p-6 border border-slate-100 transition-all duration-300 bg-white">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(124,58,237,0.06)', color: '#7c3aed' }}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-base text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light mb-4">{f.desc}</p>
                <span className="pill-tag inline-block">{f.tag}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── INTERACTIVE PRODUCT TOUR ── */}
      <section id="tour" className="py-24 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="pill-tag inline-block mb-4">Interactive Product Tour</span>
            <h2 className="serif text-4xl md:text-5xl font-bold text-slate-900">Experience EasyPharma <span className="grad-text">in Action</span></h2>
            <p className="mt-4 text-slate-600 text-base max-w-2xl mx-auto font-light">
              Explore real screenshots of our dashboard and modules to see exactly how EasyPharma simplifies your daily workflow.
            </p>
          </div>

          {/* Tabs header */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-100 pb-6">
            {TOUR_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-white scale-105 shadow-md shadow-purple-500/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                style={
                  activeTab === tab.id
                    ? { background: 'linear-gradient(135deg, #7c3aed, #10b981)' }
                    : {}
                }
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {TOUR_TABS.map((tab) => {
            if (tab.id !== activeTab) return null;
            return (
              <div key={tab.id} className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Left: Info details */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#10b981]">{tab.subtitle}</span>
                    <h3 className="serif text-3xl md:text-4xl font-bold mt-2 text-slate-900">{tab.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed font-light">{tab.desc}</p>
                    <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/20">
                      <span className="text-xs font-bold text-[#7c3aed] block mb-1">💼 Business Value</span>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">{tab.usefulness}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                    <div>
                      <div className="text-3xl font-extrabold text-[#7c3aed]">{tab.metric}</div>
                      <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{tab.metricLabel}</div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {tab.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <svg className="w-4.5 h-4.5 text-[#10b981] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Beautiful Browser Frame containing the screenshot */}
                <div className="lg:col-span-7">
                  <div className="relative rounded-2xl border border-slate-200 overflow-hidden shadow-2xl bg-slate-50 p-2.5">
                    {/* Browser Dots */}
                    <div className="flex items-center gap-1.5 mb-2.5 px-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                      <div className="text-[10px] text-slate-400 ml-4 font-mono select-none">https://app.easypharma.in/{tab.id}</div>
                    </div>
                    {/* Image */}
                    <img
                      src={tab.image}
                      alt={tab.title}
                      className="w-full h-auto rounded-lg border border-slate-100 shadow-md"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section id="comparison" className="py-28 px-6 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} className="pill-tag inline-block mb-4">Side-by-Side Comparison</motion.p>
            <motion.h2 variants={fadeUp} className="serif text-4xl md:text-5xl font-bold text-slate-900">
              EasyPharma <span className="grad-text">vs Traditional Software</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-slate-600 text-base max-w-2xl mx-auto font-light">
              See why forward-thinking pharmacy owners choose EasyPharma over legacy Windows desktop applications.
            </motion.p>
          </motion.div>

          {/* Desktop & Tablet Table */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-5 px-6 text-sm font-semibold text-slate-600 w-1/3">Feature / Capability</th>
                  <th className="py-5 px-6 text-sm font-bold text-slate-900 w-1/3" style={{ background: 'rgba(124,58,237,0.04)', borderLeft: '1px solid rgba(124,58,237,0.1)', borderRight: '1px solid rgba(124,58,237,0.1)' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#7c3aed,#10b981)' }}>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span className="text-base text-[#7c3aed]">EasyPharma</span>
                      <span className="pill-tag ml-auto text-[9px] py-0.5 px-2">Recommended</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-slate-500 w-1/3">Traditional Software</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_FEATURES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-slate-800">
                      {row.feature}
                      {row.highlight && (
                        <span className="ml-2.5 inline-block text-[10px] uppercase font-semibold text-[#7c3aed] bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">Key Advantage</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-[#0f766e] font-medium bg-[#10b981]/[0.03] border-x border-[#10b981]/10">
                      <div className="flex items-start gap-2.5">
                        <svg className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{row.easyPharma}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-500 font-light">
                      <div className="flex items-start gap-2.5">
                        <svg className="w-5 h-5 text-rose-500/80 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                        <span>{row.regular}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-4">
            {COMPARISON_FEATURES.map((row, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.05 }} className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm text-slate-800">{row.feature}</h4>
                  {row.highlight && <span className="pill-tag text-[9px] px-2 py-0.5">Key Advantage</span>}
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg border border-purple-100 bg-purple-50/30 text-purple-700 flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#7c3aed] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <div>
                      <span className="font-semibold text-[#7c3aed] block mb-0.5">EasyPharma</span>
                      {row.easyPharma}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 text-slate-500 flex items-start gap-2">
                    <svg className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    <div>
                      <span className="font-semibold text-slate-400 block mb-0.5">Traditional Software</span>
                      {row.regular}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-6 border-y border-slate-100" style={{ background: 'rgba(124,58,237,0.02)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} className="pill-tag inline-block mb-4">Onboarding Journey</motion.p>
            <motion.h2 variants={fadeUp} className="serif text-4xl md:text-5xl font-bold text-slate-900">Seamless Onboarding <span className="grad-text">in 4 Steps</span></motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-full w-full h-px border-t border-dashed border-slate-200 z-0"/>
                )}
                <div className="relative z-10">
                  <div className="serif text-4xl font-bold mb-3" style={{ color: 'rgba(124,58,237,0.15)' }}>{s.n}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">{s.desc}</p>
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
            <motion.h2 variants={fadeUp} className="serif text-4xl md:text-5xl font-bold text-slate-900">Built for <span className="grad-text">Indian Pharmacies</span></motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY.map((w) => (
              <motion.div key={w.title} variants={fadeUp} className="card-glow flex gap-4 p-5 rounded-2xl border border-slate-100 transition-all duration-300 bg-white">
                <div className="w-8 h-8 min-w-[32px] rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(124,58,237,0.06)' }}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 mb-1">{w.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-28 px-6 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} className="pill-tag inline-block mb-4">Success Stories</motion.p>
            <motion.h2 variants={fadeUp} className="serif text-4xl md:text-5xl font-bold text-slate-900">Trusted by <span className="grad-text">Pharmacists</span></motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, index) => (
              <motion.div key={index} variants={fadeUp} className="card-glow rounded-2xl p-8 border border-slate-100 transition-all duration-300 relative overflow-hidden bg-white">
                {/* Decorative quote icon */}
                <div className="absolute -top-4 -right-2 text-9xl font-serif text-slate-100 select-none pointer-events-none">“</div>
                
                {/* Rating stars */}
                <div className="flex gap-1 mb-4 text-[#10b981]">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                
                {/* Quote text */}
                <p className="text-sm text-slate-600 leading-relaxed font-light italic mb-6 relative z-10">
                  "{t.quote}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg,#7c3aed,#10b981)' }}>
                    {t.author.charAt(0) || 'P'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900">{t.author}</h4>
                    <p className="text-xs text-slate-500">{t.role} • {t.location}</p>
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
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-3xl p-10 md:p-14 text-center border border-purple-100 bg-gradient-to-br from-purple-50/30 to-emerald-50/20 shadow-sm">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.1)' }}>
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h2 className="serif text-3xl md:text-4xl font-bold mb-4 text-slate-900">100% Regulatory Compliant</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed font-light mb-8">EasyPharma keeps your pharmacy audit-ready at all times — all government-mandated records are maintained automatically without any extra effort on your part.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {BADGES.map(b => (
                <span key={b} className="pill-tag">{b}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section id="faq" className="py-28 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="pill-tag inline-block mb-4">Frequently Asked Questions</span>
            <h2 className="serif text-4xl md:text-5xl font-bold text-slate-900">Have Questions? <span className="grad-text">We Have Answers</span></h2>
            <p className="mt-4 text-slate-600 text-base max-w-xl mx-auto font-light">
              Find answers to common questions about migrating to EasyPharma, billing security, and compliance.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200/60 rounded-2xl overflow-hidden transition-all duration-300 bg-white shadow-sm hover:border-purple-200">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 font-semibold text-slate-800 hover:text-slate-900 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-xl text-[#7c3aed] transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed font-light border-t border-slate-100 pt-4 bg-slate-50/40 font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 px-6 border-t border-slate-100 bg-slate-50/30">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="pill-tag inline-block mb-4">Get Started Today</motion.p>
            <motion.h2 variants={fadeUp} className="serif text-4xl md:text-5xl font-bold mb-4 text-slate-900">Start Your <span className="grad-text">Free Trial</span></motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-base mb-10 font-light">No setup fees. No contracts. 30-day free trial. Cancel anytime.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="mailto:farooqaziz1993@gmail.com?subject=EasyPharma Free Demo Request" className="px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg,#7c3aed,#10b981)', boxShadow: '0 10px 30px rgba(124,58,237,0.15)' }}>
                Book a Free Demo →
              </a>
              <a href="tel:+919657847644" className="px-8 py-4 rounded-xl text-base font-medium text-slate-600 border border-slate-200 hover:border-slate-350 hover:text-slate-900 transition-all bg-white">
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
                    <a href={href} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-950 transition-colors">
                      <span>{icon}</span><span>{label}</span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 text-sm text-slate-500"><span>{icon}</span><span>{label}</span></span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-100 py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#7c3aed,#10b981)' }}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="serif font-bold text-slate-800">Easy<span style={{ color: '#7c3aed' }}>Pharma</span></span>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} EasyPharma by MMR Tech Solution. All rights reserved.</p>
          <div className="flex gap-5">
            {NAV_LINKS.slice(0, 3).map(l => (
              <a key={l.href} href={l.href} className="text-xs text-slate-400 hover:text-slate-700 transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}