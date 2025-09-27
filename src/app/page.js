"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const services = [
  {
    title: "Custom Software Development",
    desc: "Build scalable web, mobile, and enterprise applications tailored to your business. Enhance efficiency, automate processes, and drive growth.",
    icon: "💻",
  },
  {
    title: "Cloud & DevOps Solutions",
    desc: "Deploy secure and scalable cloud infrastructure with automated DevOps pipelines, monitoring, and 24/7 support.",
    icon: "☁️",
  },
  {
    title: "AI & Data Analytics",
    desc: "Leverage AI-driven insights and predictive analytics to make informed business decisions and optimize operations.",
    icon: "🤖",
  },
  {
    title: "Business Consulting & Strategy",
    desc: "Transform your business with expert consulting, digital strategy, process optimization, and technology planning.",
    icon: "📈",
  },
];

const products = [
  {
    title: "Pharmacy Management Suite",
    img: "https://www.sitsolutions.co/images/pharma1.png",
    url: "https://pharmacy-demo.mmrtech.com/dashboard",
  },
  {
    title: "Inventory & Billing Software",
    img: "https://sdmntpraustraliaeast.oaiusercontent.com/files/00000000-b16c-61fa-ab4c-f013d4bafd88/raw?se=2025-09-27T09%3A04%3A43Z",
    url: "https://pharmacy-demo.mmrtech.com/billing",
  },
  {
    title: "Customer Relationship Tool",
    img: "https://www.shutterstock.com/image-photo/doctor-working-on-mobile-smart-phone-2153349189",
    url: "#",
  },
  {
    title: "Analytics Dashboard",
    img: "https://www.shutterstock.com/image-photo/close-factory-data-analyst-viewing-production-1099945574",
    url: "#",
  },
];

const stats = [
  { value: 1200, label: "Clients Served Globally", color: "text-teal-400", suffix: "+" },
  { value: 350, label: "Cities Covered", color: "text-blue-400", suffix: "+" },
  { value: 25, label: "Products Developed", color: "text-purple-400" },
  { value: 15, label: "Years of Experience", color: "text-orange-400" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-32 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Innovative Software Products & IT Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 text-lg md:text-2xl text-gray-200 max-w-3xl"
        >
          MMR Tech Solution delivers world-class software products and IT services for businesses of all sizes.<br />
          Led by <span className="text-teal-400 font-semibold">CEO Mohammad Farooq</span>, we empower businesses to scale with secure, efficient, and innovative technology solutions.<br />
          Trusted by over 1,200 clients worldwide, helping businesses achieve operational excellence and digital transformation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-10 shadow-2xl rounded-xl overflow-hidden border-2 border-gray-800 max-w-2xl mx-auto"
        >
          <img src="/demo/hero-product-screenshot.png" alt="Digital transformation software solutions" className="w-full object-cover" />
        </motion.div>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.07 }}
          className="mt-10 inline-block px-8 py-4 bg-teal-500 text-white font-bold rounded-lg shadow-lg text-xl transition-transform"
        >
          Request Investor Package
        </motion.a>
      </section>

      {/* Stats Section */}
      <section className="grid md:grid-cols-4 gap-10 max-w-5xl mx-auto py-16 px-6 text-center">
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
              {prefix || ""}<CountUp end={value} duration={2.5} />{suffix || ""}
            </h3>
            <p className="mt-3 text-gray-400 text-xl">{label}</p>
          </motion.div>
        ))}
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-center text-white"
        >
          Our Services
        </motion.h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 mt-14">
          {services.map((f, idx) => (
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

      {/* Products Section */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-center text-white"
        >
          Our Products
        </motion.h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((demo, i) => (
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
                <p className="text-sm text-gray-400">Click to explore</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Section */}
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
          href="mailto:farooqaziz1993@gmail.com?subject=Investor%20Inquiry%20-%20Products%20&%20Services"
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
