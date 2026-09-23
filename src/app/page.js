"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Photo Bill Scanner", href: "#scanner" },
  { label: "Retail POS", href: "#retail" },
  { label: "Wholesale ERP", href: "#wholesale" },
  { label: "Problems Solved", href: "#solutions" },
  { label: "Interactive Tour", href: "#tour" },
  { label: "Head Office", href: "#contact" },
];

// REAL RETAIL FEATURES
const RETAIL_FEATURES = [
  {
    icon: "⚡",
    title: "Instant 3-Second Counter POS",
    desc: "Lightning-fast billing with barcode scanning, generic molecule search, and substitute recommendations to handle peak counter rush effortlessly.",
    tag: "Retail Speed",
  },
  {
    icon: "📸",
    title: "Photo Upload Purchase Auto-Entry",
    desc: "Simply take a photo or upload distributor bill image. All medicines, batch numbers, expiries, MRP, PTR, and GST auto-populate in seconds.",
    tag: "Killer Feature",
  },
  {
    icon: "🛡️",
    title: "FEFO Expiry Waste Protection",
    desc: "Auto-selects First Expiry First Out batches during billing. Proactive 30, 60, and 90-day expiry loss alerts so you never lose money on expired stock.",
    tag: "Zero Wastage",
  },
  {
    icon: "📱",
    title: "WhatsApp Digital Invoices & Refill CRM",
    desc: "Direct 1-click WhatsApp bills with Rx dosage details and automated monthly chronic medicine refill reminders to retain patients forever.",
    tag: "Patient Loyalty",
  },
  {
    icon: "🔄",
    title: "100% Offline Hybrid Sync",
    desc: "Internet cut? Billing never stops! Generate GST invoices offline seamlessly. All records auto-sync to the cloud once connectivity resumes.",
    tag: "Zero Downtime",
  },
  {
    icon: "📋",
    title: "Schedule H/H1 & CDSCO Compliance",
    desc: "Automated digital registers for habit-forming, narcotic, and Schedule H/H1 drugs. 100% audit-ready for drug inspector visits.",
    tag: "100% Compliant",
  },
];

// REAL WHOLESALE FEATURES (Accurate: Photo upload, no CSV, no multi-warehouse, no multi-state GST)
const WHOLESALE_FEATURES = [
  {
    icon: "🚀",
    title: "High-Speed Wholesale Invoicing",
    desc: "Create large multi-item distributor bills for retail chemists in seconds. Fast keyboard shortcuts, bulk quantity pricing, and instant printouts.",
    tag: "Wholesale Billing",
  },
  {
    icon: "📸",
    title: "Bill Photo Upload Auto-Ingestion",
    desc: "Upload distributor invoice photos/images. Instant auto-extraction of batch numbers, PTR, MRP, tax rates, and free schemes in under 10 seconds.",
    tag: "Top Time Saver",
  },
  {
    icon: "🎁",
    title: "Dynamic Schemes & Bonus Engine",
    desc: "Automatic calculation of pharma schemes like 10+1, 20+2, half schemes, cash discounts (CD), and trade discounts (TD) without manual errors.",
    tag: "Scheme Automation",
  },
  {
    icon: "💳",
    title: "Chemist Ledger & Credit Limit Control",
    desc: "Track every chemist's outstanding balance, set credit days & limits, and send automated WhatsApp payment reminders with payment UPI links.",
    tag: "Receivables Control",
  },
  {
    icon: "🚚",
    title: "Delivery Challans & Dispatch Slips",
    desc: "Generate route-wise delivery challans and packing slips for dispatch boys to ensure accurate deliveries to medical stores.",
    tag: "Dispatch Management",
  },
  {
    icon: "📊",
    title: "GST Billing & Supplier Ledgers",
    desc: "Complete CGST/SGST automated calculation, GSTR-1 sales reports, supplier purchase ledgers, and cashflow tracking in one clean dashboard.",
    tag: "GST & Accounts",
  },
];

const SCANNER_MOCK_DATA = [
  { item: "Augmentin 625 Duo Tab", batch: "AG2489", exp: "11/27", qty: "100 + 10 Free", ptr: "₹142.50", mrp: "₹204.00", gst: "12%" },
  { item: "Pan-D Capsule (Alkem)", batch: "PD9912", exp: "08/26", qty: "50", ptr: "₹118.20", mrp: "₹169.00", gst: "12%" },
  { item: "Telma 40mg Tablet", batch: "TM4401", exp: "03/27", qty: "80 + 8 Free", ptr: "₹92.00", mrp: "₹135.00", gst: "12%" },
  { item: "Azithral 500mg Tablet", batch: "AZ7731", exp: "05/26", qty: "30", ptr: "₹88.50", mrp: "₹129.50", gst: "12%" },
];

const TOUR_TABS = [
  {
    id: "wholesale-dashboard",
    title: "Wholesale Live Dashboard",
    subtitle: "Real-time Store & Ledger Command",
    image: "/wholesale_dashboard.png",
    metric: "₹4.82 Lakhs",
    metricLabel: "Daily Revenue Tracked",
    desc: "A crystal-clear command center showing live daily sales, 148 active retailers, outstanding credit dues (₹1.24L), and automated predictive demand forecasting for fast-moving molecules.",
    points: [
      "Real-time revenue, active retailer counts, and stock health (3,420 SKUs).",
      "AI Smart Business Forecasts predicting next month sales and collection from dues.",
      "Proactive alerts for batches expiring in the next 45 days."
    ]
  },
  {
    id: "wholesale-purchase",
    title: "AI Photo Bill Purchase Entry",
    subtitle: "Under 10s Automatic Ingestion",
    image: "/wholesale_purchase.png",
    metric: "10 Secs",
    metricLabel: "Full Bill Extraction",
    desc: "Take a photo of any manufacturer or distributor invoice. EasyPharma instantly extracts every batch code, expiry, PTR, MRP, tax rate, and free bonus scheme (like 10+1) without manual typing.",
    points: [
      "Auto-reads Abbott, Sun Pharma, Cipla, and Alkem distributor invoices.",
      "Automatically matches medicine names with your master catalog.",
      "Instant updates to supplier accounts payable ledger and stock counts."
    ]
  },
  {
    id: "wholesale-sales",
    title: "Chemist Sales Billing & Schemes",
    subtitle: "High-Speed Wholesale Invoicing",
    image: "/wholesale_sales.png",
    metric: "10+1 Free",
    metricLabel: "Automated Scheme Engine",
    desc: "Fast wholesale billing for retail chemists. Instant F2 keyboard shortcuts, automatic calculation of 10+1 / 20+2 deals, chemist credit limit validation, and one-click dispatch printing.",
    points: [
      "Auto-applies 10+1 free schemes & trade discounts (TD) seamlessly.",
      "Enforces credit limits and payment day terms per chemist.",
      "Generates route-wise delivery challans for field dispatch boys."
    ]
  },
  {
    id: "analysis",
    title: "Purchase & GST Cashflow",
    subtitle: "Financial Clarity",
    image: "/purchase_analysis.png",
    metric: "100%",
    metricLabel: "GST & Audit Accuracy",
    desc: "Complete financial breakdown of purchase expenditures, supplier ledger histories, and GST tax distributions for stress-free monthly CA filing.",
    points: [
      "Monthly purchase spend trends and gross margin tracking.",
      "Payment mode breakdown (Cash vs Supplier Credit).",
      "One-click GSTR-1 and purchase tax summary journals."
    ]
  }
];

const TESTIMONIALS = [
  {
    quote: "Earlier, typing distributor bills took 30 to 45 minutes every evening. With EasyPharma's photo upload purchase ingestion, I just upload the bill photo and it takes less than 10 seconds! This feature alone changed our daily routine.",
    author: "Adil Khan",
    role: "Owner, Prince Medical Store",
    location: "Pusad, Maharashtra",
    type: "Retail Chemist",
  },
  {
    quote: "We distribute medicines to over 80 retail chemists. Managing 10+1 schemes, credit limits, and fast billing was a headache with old desktop software. MMR SOFTWARE SOLUTIONS's EasyPharma Wholesale solved it completely.",
    author: "Mushaheed",
    role: "Owner, Tawakkal Medical & General Store",
    location: "Pusad, Maharashtra",
    type: "Wholesale & Retail",
  },
  {
    quote: "The offline hybrid sync is unbeatable. Even when the internet fluctuates in our area, our billing counters never stop for a second. Highly recommended for every chemist!",
    author: "Aditya",
    role: "Owner, Adishakti Medical",
    location: "Pusad, Maharashtra",
    type: "Retail Pharmacy",
  }
];

const FAQS = [
  {
    q: "How does the Photo Upload Purchase Bill Auto-Entry work?",
    a: "Instead of manually typing every medicine name, batch number, expiry date, PTR, MRP, and GST rate from distributor bills, you simply take a photo or upload the image of your supplier invoice into EasyPharma. The AI/OCR scanner automatically reads every line item, matches products with your catalog, auto-calculates free bonus schemes (like 10+1, 20+2), and completes your purchase entry in just 10 seconds!"
  },
  {
    q: "What products are offered by MMR SOFTWARE SOLUTIONS?",
    a: "MMR SOFTWARE SOLUTIONS provides two specialized editions: (1) EasyPharma Retail POS — built for retail medical stores and chemist shops requiring 3-second barcode billing, photo bill purchase entry, WhatsApp bills, patient refill reminders, and FEFO expiry management; and (2) EasyPharma Wholesale ERP — built for pharma distributors and stockists requiring high-speed wholesale invoicing, photo bill ingestion, dynamic 10+1 / 20+2 schemes, chemist credit ledger locks, and dispatch challans."
  },
  {
    q: "Where is the Corporate Head Office of MMR SOFTWARE SOLUTIONS?",
    a: "Our Corporate Head Office is located in Marine Lines (East), Mumbai, Maharashtra - 400002. We also maintain our regional operations and support hub in Pusad, Maharashtra to provide rapid hands-on setup, data migration, and local training."
  },
  {
    q: "Will billing stop if the internet goes down?",
    a: "No! EasyPharma is built on an Offline-First Hybrid Architecture. You can continue creating GST retail invoices and wholesale bills with zero delay even without internet. When your connection returns, all data automatically syncs to your secure cloud database."
  },
  {
    q: "Can I migrate data from our old software (Marg, Redbook, etc.)?",
    a: "Yes! The MMR SOFTWARE SOLUTIONS technical team provides 100% free assisted data migration. We transfer your complete medicine database, current stock quantities, batch details, customer balances, and supplier ledgers in under 24 hours with zero downtime."
  }
];

export default function Home() {
  const [productTab, setProductTab] = useState("retail");
  const [activeTourTab, setActiveTourTab] = useState("wholesale-dashboard");
  const [openFaq, setOpenFaq] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [demoType, setDemoType] = useState("Retail POS");
  const [formDone, setFormDone] = useState(false);

  // Scanner interactive animation
  const triggerSimulation = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  useEffect(() => {
    // Auto simulate once on load after 1.2s
    const timer = setTimeout(() => {
      triggerSimulation();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setFormDone(true);
    setTimeout(() => setFormDone(false), 5000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      
      {/* ── TOP HEAD OFFICE BANNER ── */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-900/40 text-xs py-2.5 px-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded text-[11px] border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              MMR SOFTWARE SOLUTIONS
            </span>
            <span className="text-slate-300 text-[12px]">
              Corporate Head Office: <strong className="text-white">Marine Lines (East), Mumbai - 400002</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[12px]">
            <a href="tel:+919657847644" className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 transition-colors">
              <span>📞 +91 96578 47644</span>
            </a>
            <span className="text-slate-600">|</span>
            <a href="#contact" className="text-indigo-300 hover:text-white font-semibold transition-colors">
              Book Live Demo →
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVIGATION ── */}
      <nav className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl sticky top-9 z-40">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg className="w-5 h-5 text-slate-950 font-extrabold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v16m-8-8h16"/>
              </svg>
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                Easy<span className="text-emerald-400">Pharma</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">
                  BY MMR SOFTWARE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">MMR SOFTWARE SOLUTIONS</p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-slate-300 hover:text-emerald-400 uppercase tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919657847644?text=Hello%20MMR%20SOFTWARE%20SOLUTIONS,%20I%20want%20to%20see%20a%20demo%20of%20EasyPharma%20(Retail/Wholesale)"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-600/40 hover:bg-emerald-900/50 transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              WhatsApp Us
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/20"
            >
              Book Free Demo
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION: PROBLEM-FOCUSED & HIGH IMPACT ── */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full"></div>
        <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Problem Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-300 mb-6 shadow-inner">
            <span className="text-rose-400 font-bold">❌ Stop Wasting 45 Mins Typing Bills</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-semibold">📸 Photo Upload Purchase Entry in 10 Seconds</span>
          </div>

          {/* Punchy Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
            Upload Bill Photo ➔ <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Automatic Purchase Entry in 10s</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Engineered by <strong>MMR SOFTWARE SOLUTIONS</strong> for Retail Chemists &amp; Wholesale Stockists. Simply take a photo of your distributor bill to populate purchases instantly, eliminate expiry losses with FEFO, and bill customers 100% offline.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#scanner"
              className="px-8 py-4 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-xl shadow-emerald-500/25 flex items-center gap-2.5"
            >
              <span>📸 See Bill Photo Scanner Demo</span>
              <span>↓</span>
            </a>
            <a
              href="#contact"
              className="px-7 py-4 rounded-xl text-sm font-bold text-white bg-slate-800/90 hover:bg-slate-750 border border-slate-700 transition-all shadow-md"
            >
              Schedule Head Office Walkthrough
            </a>
          </div>

          {/* Key Pain Points vs EasyPharma Highlights */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            {[
              { num: "10 Secs", title: "Photo Bill Ingestion", desc: "No more typing 50-item bills", color: "text-emerald-400" },
              { num: "0% Waste", title: "FEFO Expiry Defense", desc: "Near-expiry alerts 30d early", color: "text-teal-400" },
              { num: "100%", title: "Offline Uptime", desc: "Never stop billing if net drops", color: "text-cyan-400" },
              { num: "1-Click", title: "WhatsApp Invoices", desc: "Direct bills & Rx refills", color: "text-indigo-400" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
                <div className={`text-2xl sm:text-3xl font-black ${stat.color}`}>{stat.num}</div>
                <div className="text-xs font-bold text-white mt-1">{stat.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KILLER FEATURE SHOWCASE: INTERACTIVE PHOTO PURCHASE SCANNER SIMULATION ── */}
      <section id="scanner" className="py-20 px-6 bg-slate-900 border-y border-slate-800 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              ★ Core Breakthrough Feature
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Snap Bill Photo ➔ <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Instant Purchase Entry in 10 Seconds</span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              See how EasyPharma reads any distributor purchase bill photo and instantly auto-populates batch numbers, expiries, rates, free schemes (10+1, 20+2), and GST without typing a single word.
            </p>
          </div>

          {/* Interactive Simulation Frame (Live Tool Mockup) */}
          <div className="rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl overflow-hidden p-4 sm:p-6">
            
            {/* Player Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs font-mono text-slate-400 font-semibold">
                  EasyPharma AI Bill Photo Scanner v3.4
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Status: <strong className={isScanning ? "text-amber-400 animate-pulse" : "text-emerald-400"}>{isScanning ? "Scanning Bill Image..." : "Extracted Successfully (0.8s)"}</strong>
                </span>
                <button
                  onClick={triggerSimulation}
                  disabled={isScanning}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center gap-1.5 shadow-md"
                >
                  <svg className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67"/>
                  </svg>
                  <span>{isScanning ? "Scanning..." : "Re-Scan Bill Photo"}</span>
                </button>
              </div>
            </div>

            {/* Scanner Visual Simulation Split View */}
            <div className="mt-6 grid lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Simulated Photo Document with Laser Beam */}
              <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 p-5 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-3">
                  <span className="flex items-center gap-1.5">
                    <span className="text-base">📸</span> Distributor Bill Photo
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Image Uploaded</span>
                </div>

                {/* Bill photo preview card with simulated laser scan line */}
                <div className="relative rounded-xl bg-white p-3 text-slate-800 font-mono text-[10px] space-y-1.5 shadow-inner overflow-hidden select-none border-2 border-slate-300">
                  {/* Laser Scanning Animation Beam */}
                  {isScanning && (
                    <div
                      className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_15px_#10b981] z-20 animate-bounce"
                      style={{ top: `${scanProgress}%`, transition: "top 0.4s linear" }}
                    ></div>
                  )}

                  <div className="border-b border-slate-200 pb-1 flex justify-between font-bold text-slate-900">
                    <span>APOLLO PHARMA DISTRIBUTORS</span>
                    <span>INV #99218</span>
                  </div>
                  <div className="text-[9px] text-slate-500">Date: 23-Sep-2026 | GSTIN: 27AABCP1122Z1Z</div>
                  
                  <div className="pt-2 space-y-1 text-[9px] text-slate-700">
                    <div className="flex justify-between border-b border-slate-100 pb-0.5 font-semibold">
                      <span>1. Augmentin 625 Duo</span>
                      <span>100+10F | ₹142.50</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-0.5 font-semibold">
                      <span>2. Pan-D Capsule</span>
                      <span>50 Qty | ₹118.20</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-0.5 font-semibold">
                      <span>3. Telma 40mg Tab</span>
                      <span>80+8F | ₹92.00</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-0.5 font-semibold">
                      <span>4. Azithral 500mg</span>
                      <span>30 Qty | ₹88.50</span>
                    </div>
                  </div>

                  <div className="pt-2 text-[9px] flex justify-between font-bold text-slate-900 border-t border-slate-300">
                    <span>Total Taxable: ₹32,450.00</span>
                    <span className="text-emerald-700">GST: ₹3,894.00</span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="text-xs text-slate-300 font-semibold">
                    {isScanning ? (
                      <span className="text-amber-400 flex items-center justify-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                        AI Reading Bill Photo Batches ({scanProgress}%)...
                      </span>
                    ) : (
                      <span className="text-emerald-400 flex items-center justify-center gap-1.5">
                        ✓ 4 Medicines, 2 Bonus Schemes Extracted!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Instant Auto-Populated Purchase Entry Table */}
              <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-5 overflow-x-auto">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Auto-Populated Purchase Entry
                    </h3>
                    <p className="text-[11px] text-slate-400">Values matched directly with item master &amp; supplier ledger</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                    ⚡ 0 Manual Typing
                  </span>
                </div>

                <div className="min-w-[520px]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-semibold">
                        <th className="py-2 px-2">Medicine / Item</th>
                        <th className="py-2 px-2">Batch</th>
                        <th className="py-2 px-2">Expiry</th>
                        <th className="py-2 px-2">Qty + Scheme</th>
                        <th className="py-2 px-2">PTR</th>
                        <th className="py-2 px-2">MRP</th>
                        <th className="py-2 px-2">GST</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {SCANNER_MOCK_DATA.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                          <td className="py-2.5 px-2 font-sans font-semibold text-white flex items-center gap-1.5">
                            <span className="text-emerald-400">●</span>
                            {row.item}
                          </td>
                          <td className="py-2.5 px-2 text-indigo-300">{row.batch}</td>
                          <td className="py-2.5 px-2 text-amber-300">{row.exp}</td>
                          <td className="py-2.5 px-2 text-emerald-300 font-bold">{row.qty}</td>
                          <td className="py-2.5 px-2 text-slate-300">{row.ptr}</td>
                          <td className="py-2.5 px-2 text-slate-400">{row.mrp}</td>
                          <td className="py-2.5 px-2 text-teal-300">{row.gst}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer summary of auto-entry */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-slate-400 text-[11px]">
                    Ledger: <span className="text-white font-bold">Apollo Pharma</span> | Stock Added to: <span className="text-emerald-400 font-bold">Main Store</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all">
                      Save &amp; Update Stock →
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── DUAL PRODUCTS SECTION: RETAIL POS VS WHOLESALE ERP ── */}
      <section id="products" className="py-24 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Two Dedicated Software Editions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Tailored for <span className="text-emerald-400">Retail Chemists</span> &amp; <span className="text-indigo-400">Wholesale Stockists</span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-normal">
              Select your business model below to explore the exact features built for your daily workflows.
            </p>

            {/* Product Switcher Tabs */}
            <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl gap-2">
              <button
                onClick={() => setProductTab("retail")}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  productTab === "retail"
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>💊 EasyPharma Retail POS</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/30 font-semibold">Medical Stores</span>
              </button>

              <button
                onClick={() => setProductTab("wholesale")}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  productTab === "wholesale"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🏢 EasyPharma Wholesale ERP</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/30 font-semibold">Distributors</span>
              </button>
            </div>
          </div>

          {/* RETAIL SECTION */}
          {productTab === "retail" && (
            <div id="retail" className="space-y-12">
              <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border border-emerald-500/30 shadow-2xl">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      ⚡ For Retail Chemists &amp; Medical Stores
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                      EasyPharma <span className="text-emerald-400">Retail POS Edition</span>
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                      Built to handle intense counter rush hours. Perform barcode search in milliseconds, automatically dispense the earliest-expiry batch (FEFO), snap photos of supplier bills for instant auto-entry, send WhatsApp bills directly to patients, and never stop billing even during internet failures.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      {[
                        "Instant 3-Sec Barcode POS Billing",
                        "Photo Upload Purchase Ingestion in 10s",
                        "30-60 Day Expiry Wastage Alerts (FEFO)",
                        "WhatsApp Digital Bills & Monthly Rx Refills",
                        "100% Offline Hybrid Billing Engine",
                        "Schedule H/H1 & CDSCO Drug Registers",
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap gap-3">
                      <a
                        href="#contact"
                        onClick={() => setDemoType("Retail POS")}
                        className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md"
                      >
                        Book Retail POS Demo
                      </a>
                      <a
                        href="#scanner"
                        className="px-6 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all"
                      >
                        Try Photo Bill Scanner →
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-2xl border border-slate-700 bg-slate-950 p-2.5 shadow-2xl">
                      <img src="/dashboard.png" alt="EasyPharma Retail POS" className="rounded-xl w-full h-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Retail Features Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {RETAIL_FEATURES.map((f, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-sm">
                    <div className="text-3xl mb-3">{f.icon}</div>
                    <h4 className="text-base font-bold text-white mb-2">{f.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal mb-4">{f.desc}</p>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {f.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WHOLESALE SECTION (Accurate features: Photo upload) */}
          {productTab === "wholesale" && (
            <div id="wholesale" className="space-y-12">
              <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/30 shadow-2xl">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
                      🏢 For Pharma Distributors, Stockists &amp; C&amp;F
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                      EasyPharma <span className="text-indigo-400">Wholesale ERP Edition</span>
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                      Engineered for high-volume pharmaceutical distributors and stockists. Snap photos of manufacturer invoices to auto-ingest purchases in 10 seconds, configure dynamic schemes (10+1, 20+2 deals), lock chemist credit limits, and print route dispatch challans effortlessly.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      {[
                        "Bill Photo Upload Purchase Auto-Entry in 10s",
                        "Dynamic Pharma Schemes (10+1, 20+2 Bonus)",
                        "Chemist Ledger & Outstanding Credit Locks",
                        "Route Delivery Challans & Packing Slips",
                        "High-Speed Wholesale Multi-Item Invoicing",
                        "GST Sales Reports & Supplier Ledger Balance",
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                          <span className="text-indigo-400 font-bold">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap gap-3">
                      <a
                        href="#contact"
                        onClick={() => setDemoType("Wholesale ERP")}
                        className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md"
                      >
                        Book Wholesale ERP Demo
                      </a>
                      <a
                        href="#scanner"
                        className="px-6 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all"
                      >
                        View Photo Bill Scanner Demo →
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-2xl border border-slate-700 bg-slate-950 p-2.5 shadow-2xl">
                      <img src="/wholesale_purchase.png" alt="EasyPharma Wholesale Purchase Ingestion" className="rounded-xl w-full h-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Wholesale Features Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {WHOLESALE_FEATURES.map((f, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition-all shadow-sm">
                    <div className="text-3xl mb-3">{f.icon}</div>
                    <h4 className="text-base font-bold text-white mb-2">{f.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal mb-4">{f.desc}</p>
                    <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {f.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── REAL PROBLEMS SOLVED SECTION ── */}
      <section id="solutions" className="py-20 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Why Pharmacists Switch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real Pain Points We Solve Every Day
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-slate-950 border border-rose-500/20 relative">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">Pain Point 01</div>
              <h3 className="text-lg font-bold text-white mb-2">Manual Purchase Typing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Typing 50+ item distributor bills daily takes 45 minutes of boring clerical work with frequent spelling and tax rate errors.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span>✅ Solved:</span> Snap/Upload Bill Photo ➔ Auto-entry in 10s.
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-slate-950 border border-amber-500/20 relative">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Pain Point 02</div>
              <h3 className="text-lg font-bold text-white mb-2">Medicine Expiry Losses</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pharmacies lose ₹15,000–₹50,000 every year because expired medicines sit hidden on back shelves without warning.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span>✅ Solved:</span> FEFO auto-selection &amp; 30-day alerts.
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-slate-950 border border-cyan-500/20 relative">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Pain Point 03</div>
              <h3 className="text-lg font-bold text-white mb-2">Internet Downtime Halts Billing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cloud-only software stops billing the second Wi-Fi drops, causing long angry customer counter queues.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span>✅ Solved:</span> 100% Offline Hybrid sync engine.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE TOUR / REAL SYSTEM MODULES ── */}
      <section id="tour" className="py-24 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">Software Walkthrough</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore EasyPharma in Action
            </h2>
          </div>

          {/* Tour Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 pb-4 border-b border-slate-800">
            {TOUR_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTourTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTourTab === tab.id
                    ? "bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20"
                    : "text-slate-400 bg-slate-900 hover:text-white"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Active Tab Screen */}
          {TOUR_TABS.map((tab) => {
            if (tab.id !== activeTourTab) return null;
            return (
              <div key={tab.id} className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{tab.subtitle}</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{tab.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{tab.desc}</p>
                  
                  <div className="py-2">
                    <div className="text-3xl font-black text-emerald-400">{tab.metric}</div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">{tab.metricLabel}</div>
                  </div>

                  <ul className="space-y-2 pt-2">
                    {tab.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-7">
                  <div className="rounded-2xl border border-slate-700 bg-slate-900 p-2.5 shadow-2xl">
                    <img src={tab.image} alt={tab.title} className="rounded-xl w-full h-auto" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">Customer Feedback</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Trusted by Pharmacists Across Maharashtra</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-7 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-emerald-400 text-sm mb-3">★★★★★</div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="border-t border-slate-800 pt-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.author}</h4>
                    <p className="text-[11px] text-slate-400">{t.role} • {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT & HEAD OFFICE DETAILS ── */}
      <section id="contact" className="py-24 px-6 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">Get in Touch</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Connect with <span className="text-emerald-400">MMR SOFTWARE SOLUTIONS</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
              Visit our Mumbai Head Office, call our experts, or request a tailored live demo for Retail POS or Wholesale ERP.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Office Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Corporate Head Office Card */}
              <div className="p-7 rounded-3xl bg-slate-900 border-2 border-emerald-500/40 relative shadow-xl">
                <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                  Corporate Head Office
                </div>
                
                <div className="flex items-start gap-3 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl shrink-0">
                    🏢
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-emerald-400 tracking-wider block">MMR SOFTWARE SOLUTIONS</span>
                    <h3 className="text-lg font-bold text-white">Head Office — Mumbai</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Marine Lines (East), Mumbai,<br />
                      Maharashtra, India - 400002
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">📞 Phone:</span>
                    <a href="tel:+919657847644" className="text-white hover:text-emerald-300 font-semibold">
                      +91 96578 47644
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">📧 Email:</span>
                    <a href="mailto:farooqaziz1993@gmail.com" className="text-white hover:text-emerald-300 font-semibold">
                      farooqaziz1993@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-emerald-400 font-bold">⏱️ Hours:</span>
                    <span>Mon – Sat: 9:30 AM to 7:30 PM</span>
                  </div>
                </div>

                <div className="mt-5">
                  <a
                    href="https://wa.me/919657847644?text=Hello%20MMR%20SOFTWARE%20SOLUTIONS%20Head%20Office,%20I%20want%20to%20learn%20more%20about%20EasyPharma."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>💬 WhatsApp Mumbai Head Office</span>
                  </a>
                </div>
              </div>

              {/* Regional Support Card */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center text-lg shrink-0">
                    📍
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">Regional Operations</span>
                    <h4 className="text-sm font-bold text-white">Support &amp; Migration Hub</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Pusad, Yavatmal District, Maharashtra, India - 445204
                    </p>
                    <p className="text-[11px] text-emerald-400 mt-2 font-medium">
                      ✓ Free On-site Assisted Data Migration from Old Software
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Demo Booking Form */}
            <div className="lg:col-span-7 bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-2xl font-extrabold text-white">Request a Live 1-on-1 Demo &amp; Walkthrough</h3>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                Tell us about your pharmacy or wholesale business to get a personalized demo.
              </p>

              {formDone ? (
                <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-2">
                  <div className="text-3xl">🎉</div>
                  <h4 className="text-base font-bold text-white">Thank You! Request Received</h4>
                  <p className="text-xs text-emerald-300">
                    Our technical expert from MMR SOFTWARE SOLUTIONS (Marine Lines, Mumbai) will contact you within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Select Edition:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Retail POS", "Wholesale ERP", "Both (Retail + Wholesale)"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setDemoType(opt)}
                          className={`py-2 px-2 text-center rounded-xl text-xs font-bold border transition-all ${
                            demoType === opt
                              ? "bg-emerald-400 text-slate-950 border-emerald-400"
                              : "bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-850"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Adil Khan / Suresh"
                        className="w-full text-xs px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full text-xs px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Store / Business Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Prince Medical / Tawakkal Pharma"
                        className="w-full text-xs px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">City / Location</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mumbai, Pusad, Pune, Nagpur"
                        className="w-full text-xs px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-xl shadow-emerald-500/20"
                  >
                    Schedule Live Demo &amp; Walkthrough →
                  </button>
                  <p className="text-[11px] text-center text-slate-500">
                    🔒 Free 1-on-1 personalized demo. Zero setup cost. Assisted migration in 24 hours.
                  </p>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section id="faq" className="py-20 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-800 rounded-2xl bg-slate-950 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left py-4 px-6 flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-emerald-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-emerald-400 font-mono text-base">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800 py-12 px-6 bg-slate-950 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="font-extrabold text-base text-white flex items-center gap-1.5 mb-2">
                Easy<span className="text-emerald-400">Pharma</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Next-generation Pharmaceutical Retail POS &amp; Wholesale ERP software created by <strong>MMR SOFTWARE SOLUTIONS</strong>.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Products</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li><a href="#retail" onClick={() => setProductTab("retail")} className="hover:text-emerald-400">EasyPharma Retail</a></li>
                <li><a href="#wholesale" onClick={() => setProductTab("wholesale")} className="hover:text-indigo-400">EasyPharma Wholesale ERP</a></li>
                
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Corporate Head Office</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>MMR SOFTWARE SOLUTIONS</strong><br />
                Marine Lines (East), Mumbai,<br />
                Maharashtra, India - 400002<br />
                Phone: +91 96578 47644
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Regional Support Hub</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pusad, Yavatmal District,<br />
                Maharashtra, India - 445204<br />
                Email: farooqaziz1993@gmail.com
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>© {new Date().getFullYear()} MMR SOFTWARE SOLUTIONS. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#products" className="hover:text-slate-300">Retail &amp; Wholesale</a>
              <a href="#contact" className="hover:text-slate-300">Head Office Mumbai</a>
              <a href="#faq" className="hover:text-slate-300">FAQ</a>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}