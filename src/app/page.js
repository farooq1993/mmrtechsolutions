// app/page.jsx
"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const features = [
  {
    title: "Fast Billing & Prescriptions",
    desc: "Lightning-fast point-of-sale, e-prescription auto-fill, return handling, and instant invoice generation.",
    icon: "💳",
  },
  {
    title: "Inventory Intelligence",
    desc: "AI-based inventory forecasts, expiry alerts, restock automation for better margins and zero shortages.",
    icon: "📦",
  },
  {
    title: "Compliance & Security",
    desc: "End-to-end encryption, audit trails, GST & regulatory compliance, and secure digital records.",
    icon: "🔒",
  },
  {
    title: "Multi-Channel Selling",
    desc: "Retail counter, home delivery, bulk B2B sales—seamlessly linked into a unified platform.",
    icon: "🌐",
  },
];

const stats = [
  { value: 800, label: "Active Pharmacies", color: "text-teal-400", suffix: "K+" },
  { value: 250, label: "Cities Served", color: "text-blue-400", suffix: "+" },
  { value: 50, label: "Transactions Processed ($B)", color: "text-purple-400", prefix: "$", suffix: "B+" },
];

const screenshots = [
  {
    title: "Smart Dashboard",
    img: "https://www.sitsolutions.co/images/pharma1.png",
    url: "https://pharmacy-demo.mmrtech.com/dashboard",
  },
  {
    title: "Billing System",
    img: "https://sdmntpraustraliaeast.oaiusercontent.com/files/00000000-b16c-61fa-ab4c-f013d4bafd88/raw?se=2025-09-27T09%3A04%3A43Z&sp=r&sv=2024-08-04&sr=b&scid=1a6c980b-b098-5490-8482-c44b6aa34682&skoid=b7fc319f-b93c-4fac-ba5f-14fdc3f9209f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-26T17%3A46%3A53Z&ske=2025-09-27T17%3A46%3A53Z&sks=b&skv=2024-08-04&sig=gIPo4uBU%2BZWrcImO3Zq5RFEA4jMEgJzRaSnkO65WZYk%3D",
    url: "https://pharmacy-demo.mmrtech.com/billing",
  },
  {
    title: "Inventory Management",
    // img: "https://www.freepik.com/free-photo/pharmacist-holding-tablet-by-shelf-full-medicine_11583245.htm",
    url: "https://pharmacy-demo.mmrtech.com/inventory",
  },
  {
    title: "Customer Records",
    img: "https://www.shutterstock.com/image-photo/doctor-working-on-mobile-smart-phone-2153349189",
    url: "https://pharmacy-demo.mmrtech.com/customers",
  },
  {
    title: "Analytics & Reports",
    img: "https://www.shutterstock.com/image-photo/close-factory-data-analyst-viewing-production-1099945574",
    url: "#",
  },
  {
    title: "Supplier Orders",
    img: "https://www.freepik.com/free-photo/pharmacist-holding-tablet-by-shelf-full-medicine_11583245.htm",
    url: "https://pharmacy-demo.mmrtech.com/orders",
  },
];


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-32 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Modern Pharmacy Software, Reinvented
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 text-lg md:text-2xl text-gray-200 max-w-3xl"
        >
          MMR Tech Solution is powering the digital pharmacy revolution.<br />
          Led by <span className="text-teal-400 font-semibold">CEO Mohammad Farooq</span>.<br />
          Scale with the fastest, most robust pharmacy management suite—trusted by 800K+ users, enabling $50B+ in healthcare commerce.
        </motion.p>
        {/* Product video mockup demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-10 shadow-2xl rounded-xl overflow-hidden border-2 border-gray-800 max-w-2xl mx-auto"
        >
          <img src="/demo/hero-product-screenshot.png" alt="Pharmacy Demo Video" className="w-full object-cover" />
        </motion.div>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.07 }}
          className="mt-10 inline-block px-8 py-4 bg-teal-500 text-white font-bold rounded-lg shadow-lg text-xl transition-transform"
        >
          Request Investor Package
        </motion.a>
      </section>

      {/* Social Proof / Results Stats */}
      <section className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto py-16 px-6 text-center">
        {stats.map(({ value, label, color, prefix, suffix }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="bg-gradient-to-br from-gray-800 to-gray-700 p-10 rounded-2xl shadow-xl"
          >
            <h3 className={`text-5xl font-extrabold ${color}`}>
              {prefix || ""}
              <CountUp end={value} duration={2.5} />
              {suffix || ""}
            </h3>
            <p className="mt-3 text-gray-400 text-xl">{label}</p>
          </motion.div>
        ))}
      </section>

      {/* Feature Highlights */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-center text-white"
        >
          Why Pharmacies Choose MMR Tech Solution
        </motion.h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 mt-14">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              className="bg-gray-800 rounded-2xl p-7 text-center shadow-lg"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-xl text-white">{f.title}</h3>
              <p className="mt-2 text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Demo Screens with URLs */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-center text-white"
        >
          Explore Our Live Demo
        </motion.h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((demo, i) => (
            <motion.a
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.06 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 block"
            >
              <img src={demo.img} alt={demo.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-teal-400">{demo.title}</h3>
                <p className="text-sm text-gray-400">Click to view demo</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact for Investors */}
      <section id="contact" className="bg-gray-800 py-20 px-6 text-center rounded-t-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-white"
        >
          Ready To Invest or Partner?
        </motion.h2>
        <div className="mt-8 space-y-4 text-lg text-gray-300">
          <p>
            📧 Email:
            <a href="mailto:farooqaziz1993@gmail.com" className="text-teal-400 ml-2">
              farooqaziz1993@gmail.com
            </a>
          </p>
          <p>
            📞 Phone:
            <a href="tel:+919657847644" className="text-teal-400 ml-2">
              +91 96578 47644
            </a>
          </p>
          <p>🏢 Office: Nagpur, India</p>
        </div>
        <motion.a
          href="mailto:farooqaziz1993@gmail.com?subject=Investor%20Inquiry%20-%20Pharmacy%20Software"
          whileHover={{ scale: 1.06 }}
          className="mt-10 inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg text-xl transition-all"
        >
          Book a Call or Demo
        </motion.a>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 border-t border-gray-700 mt-6">
        © {new Date().getFullYear()} MMR Tech Solution. All rights reserved.
      </footer>
    </main>
  );
}
