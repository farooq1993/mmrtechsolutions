'use client';

import Head from 'next/head';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from './components/ui/button';

export default function Home() {
  const testimonials = [
  {
    quote: "Reduced our medicine wastage by 60% with smart expiry alerts - a true lifesaver for our pharmacy!",
    author: "Dr. Sharma, MedLife Pharmacy"
  },
  {
    quote: "Image-to-bill feature cut our billing time in half - customers love the speed and accuracy!",
    author: "Rajesh Kumar, City Medicos"
  },
  {
    quote: "GST compliance became effortless with automated reports - saved us countless hours during tax season.",
    author: "Priya Nair, HealthPlus Pharmacy"
  },
  {
    quote: "The inventory insights helped us optimize stock levels and increase profit margins by 22%.",
    author: "Amit Patel, Care Pharmacy"
  }
];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Easy Pharma | AI-Powered Pharmacy Management Software</title>
        <meta name="description" content="Transform your pharmacy with AI-driven billing, intelligent inventory control, expiry management, and powerful analytics - all in one cloud platform." />
      </Head>

      {/* Fixed Nav */}
      <nav className="fixed w-full top-0 z-50 bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold text-indigo-600 flex items-center">
            <span className="mr-2">💊</span> EasyPharma
          </div>
          <div className="space-x-6 hidden md:flex">
            <a href="#features" className="text-gray-700 hover:text-indigo-600 font-medium">Features</a>
            <a href="#why" className="text-gray-700 hover:text-indigo-600 font-medium">Why Us</a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600 font-medium">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-emerald-600 to-emerald-400 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            The Future of Pharmacy Management is Here
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Harness the power of AI to streamline operations, prevent revenue loss, and deliver exceptional customer experiences - all while saving hours every day.
          </p>

          {/* Slider */}
          <div className="max-w-2xl mx-auto mb-10 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <Slider {...settings}>
              {testimonials.map((testimonial, i) => (
                <div key={i} className="px-4">
                  <p className="text-lg italic mb-2">💬 {testimonial.quote}</p>
                  <p className="font-medium">— {testimonial.author}</p>
                </div>
              ))}
            </Slider>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-emerald-700 hover:bg-emerald-100 text-lg px-8 py-4 font-semibold shadow-md transform hover:scale-105 transition-transform">
              🚀 Book a Free Demo
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-4 font-semibold shadow-md transform hover:scale-105 transition-transform">
              📞 Talk to an Expert
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features Designed for Modern Pharmacies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every feature is crafted to solve real challenges faced by pharmacy owners daily
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Image-Based Billing */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">AI-Powered Image Billing</h3>
              <p className="text-gray-600 mb-4">
                Simply upload prescription images and let our AI instantly generate accurate bills - no manual typing needed. Reduces errors and speeds up checkout by 70%.
              </p>
              <ul className="text-gray-600 space-y-2 pl-5 list-disc text-left">
                <li>Extracts medicine names, dosages automatically</li>
                <li>Learns from your inventory for better recognition</li>
                <li>Handwritten or printed prescriptions</li>
              </ul>
            </div>

            {/* Purchase Management */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Smart Purchase Entry</h3>
              <p className="text-gray-600 mb-4">
                Snap a picture of supplier invoices to automatically record purchases - complete with batch numbers, expiry dates, and GST details.
              </p>
              <ul className="text-gray-600 space-y-2 pl-5 list-disc text-left">
                <li>Eliminates manual data entry errors</li>
                <li>Auto-calculates taxes and totals</li>
                <li>Links directly to inventory updates</li>
              </ul>
            </div>

            {/* Expiry Management */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">⏳</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Customizable Expiry Alerts</h3>
              <p className="text-gray-600 mb-4">
                Never lose money to expired stock again. Set personalized alert thresholds (days/weeks/months) for near-expiry medicines.
              </p>
              <ul className="text-gray-600 space-y-2 pl-5 list-disc text-left">
                <li>Color-coded priority indicators</li>
                <li>Automatic "use first" suggestions at billing</li>
                <li>Expiry forecasting reports</li>
                <li>Batch-wise tracking</li>
              </ul>
            </div>

            {/* Analytics */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Advanced Analytics Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Real-time visual reports that help you understand your business better and make data-driven decisions.
              </p>
              <ul className="text-gray-600 space-y-2 pl-5 list-disc text-left">
                <li>Daily/weekly/monthly sales trends</li>
                <li>Profit margin analysis by product</li>
                <li>Customer purchase patterns</li>
                <li>Supplier performance metrics</li>
              </ul>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Intelligent Inventory Control</h3>
              <p className="text-gray-600 mb-4">
                Automated stock management that saves time and prevents shortages or overstocking.
              </p>
              <ul className="text-gray-600 space-y-2 pl-5 list-disc text-left">
                <li>Low stock alerts with reorder suggestions</li>
                <li>Fast-moving/slow-moving analysis</li>
                <li>Batch-wise stock tracking</li>
                <li>Theft/loss detection</li>
              </ul>
            </div>

            {/* GST */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🧾</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">GST Compliance Made Simple</h3>
              <p className="text-gray-600 mb-4">
                Generate perfect GST invoices and reports with zero effort - designed specifically for Indian pharmacies.
              </p>
              <ul className="text-gray-600 space-y-2 pl-5 list-disc text-left">
                <li>Auto-populated GST details</li>
                <li>Monthly/quarterly tax reports</li>
                <li>HSN code integration</li>
                <li>E-way bill generation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section id="why" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Thousands of Pharmacies Trust Easy Pharma</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the unique challenges of running a pharmacy in India
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-indigo-100">
              <h4 className="font-semibold text-xl mb-4 text-indigo-700">💰 Profit-Boosting Features</h4>
              <p className="text-gray-600">
                Our expiry management and inventory optimization tools help pharmacies increase profits by 15-25% on average by reducing waste and improving turnover.
              </p>
            </div>
            
            <div className="bg-emerald-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-emerald-100">
              <h4 className="font-semibold text-xl mb-4 text-emerald-700">⏳ Time-Saving Automation</h4>
              <p className="text-gray-600">
                Save 2-3 hours daily with automated billing, purchase entry, and reporting - giving you more time for customers and business growth.
              </p>
            </div>
            
            <div className="bg-amber-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-amber-100">
              <h4 className="font-semibold text-xl mb-4 text-amber-700">🔒 Future-Proof Technology</h4>
              <p className="text-gray-600">
                Cloud-based platform with regular updates ensures you always have the latest features without expensive upgrades.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">See the Difference in Just 7 Days</h3>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              Join our risk-free trial and experience how Easy Pharma can transform your pharmacy operations. No credit card required.
            </p>
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold shadow-lg">
              Start Your Free Trial Today
            </Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Ready to Transform Your Pharmacy?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team is ready to help you get started or answer any questions
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-indigo-700">Contact Information</h4>
                <p className="mb-6 text-gray-600">
                  <span className="font-medium">📍 Address:</span> MMR Tech Solutions Pvt Ltd, Nagpur, India
                </p>
                <p className="mb-6 text-gray-600">
                  <span className="font-medium">📞 Phone:</span> +91-9657847644
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">✉️ Email:</span> support@mmrtech.in
                </p>
                <Button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3">
                    Request Callback
                  </Button>
              </div>
              <div>
                {/* <h4 className="text-xl font-semibold mb-4 text-indigo-700">Business Hours</h4>
                <p className="mb-2 text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="mb-2 text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p> */}
                
                <div className="mt-6">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-white flex items-center">
                <span className="mr-2">💊</span> EasyPharma
              </div>
              <p className="mt-2 text-gray-400">Smart Pharmacy Management Software</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h5 className="font-semibold mb-3">Product</h5>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#features" className="hover:text-white">Features</a></li>
                  <li><a href="#why" className="hover:text-white">Why Choose Us</a></li>
                  <li><a href="#contact" className="hover:text-white">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-3">Company</h5>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-3">Legal</h5>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                  <li><a href="#" className="hover:text-white">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} MMR Tech Solutions Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}