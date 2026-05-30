import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              M
            </div>
            <span className="font-bold text-slate-800 text-xl">MediCare Hub</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          <button
            className="md:hidden text-slate-600 text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
          <button
            onClick={() => scrollToSection("features")}
            className="block text-slate-600 hover:text-blue-600 text-sm font-medium"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="block text-slate-600 hover:text-blue-600 text-sm font-medium"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="block text-slate-600 hover:text-blue-600 text-sm font-medium"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="block text-slate-600 hover:text-blue-600 text-sm font-medium"
          >
            Contact
          </button>
          <div className="flex gap-3 pt-2">
            <Link
              to="/login"
              className="flex-1 text-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
