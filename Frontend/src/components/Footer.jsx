import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="font-bold text-white text-xl">MediCare Hub</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Digital Prescription Management Platform for doctors and patients.
              Simplifying healthcare through technology.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>support@medicarehub.com</li>
              <li>+91 9876543210</li>
              <li>123 Healthcare Avenue, Ghaziabad</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} MediCare Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;