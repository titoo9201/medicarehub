import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: "📄",
    title: "Digital Prescriptions",
    desc: "Create and manage prescriptions digitally with ease.",
  },
  {
    icon: "📊",
    title: "Prescription History",
    desc: "View complete prescription history anytime, anywhere.",
  },
  {
    icon: "🔍",
    title: "Smart Search",
    desc: "Quickly find prescriptions using search and filters.",
  },
];

const services = [
  {
    icon: "✍️",
    title: "Digital Prescription Creation",
    desc: "Doctors can create detailed digital prescriptions with medicines, dosage, and diagnosis.",
  },
  {
    icon: "👥",
    title: "Patient Record Management",
    desc: "Maintain organized patient records with complete medical history.",
  },
  {
    icon: "📋",
    title: "Prescription History",
    desc: "Patients can access their complete prescription history securely.",
  },
  
  {
    icon: "⬇️",
    title: "Prescription PDF Download",
    desc: "Download prescriptions as PDF for offline access and printing.",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
            Healthcare Platform
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Digital Prescription Management Platform
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Manage prescriptions digitally with secure and easy access for
            doctors and patients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-base"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-base"
            >
              Login
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: "Digital Prescriptions", value: "100%" },
              { label: "Secure Access", value: "24/7" },
              { label: "Easy to Use", value: "✓" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Platform Features
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Everything you need to manage prescriptions efficiently and
              securely.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-base font-semibold text-slate-800 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Comprehensive healthcare management services for modern clinics
              and patients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                  {s.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-800 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                About MediCare Hub
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                MediCare Hub is a modern digital prescription management
                platform designed to bridge the gap between doctors and
                patients. We eliminate the hassle of paper prescriptions and
                provide a secure, accessible platform for all your medical
                needs.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our platform ensures that doctors can efficiently create and
                manage prescriptions while patients have secure, instant access
                to their medical records from anywhere.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "For Doctors", desc: "Create and manage digital prescriptions easily.", icon: "👨‍⚕️" },
                { label: "For Patients", desc: "Access your prescriptions anytime, anywhere.", icon: "🧑‍⚕️" },
                
                { label: "Easy Access", desc: "Simple interface for all users.", icon: "💻" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-blue-50 rounded-xl p-4 border border-blue-100"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">
                    {item.label}
                  </h4>
                  <p className="text-xs text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-blue-100 mb-10">
            Have questions about MediCare Hub? We are here to help.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { label: "Email", value: "support@medicarehub.com", icon: "✉️" },
              { label: "Phone", value: "+91 9876543210", icon: "📞" },
              { label: "Address", value: "123 Medical Avenue, Ghaziabad", icon: "📍" },
            ].map((c) => (
              <div key={c.label} className="bg-blue-700 rounded-xl p-4">
                <div className="text-2xl mb-2">{c.icon}</div>
                <div className="text-xs text-blue-200 mb-1">{c.label}</div>
                <div className="text-sm text-white font-medium">{c.value}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
