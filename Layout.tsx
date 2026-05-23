/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Armchair } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-amber-600 p-1.5 rounded-lg">
              <Armchair className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight text-gray-900">
              LuxeHome <span className="font-sans text-xs font-medium text-amber-600 uppercase tracking-widest ml-1">Tools</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-amber-600 transition-colors">Calculators</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Style Guides</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Shop All</a>
          </div>
          <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-sm">
            Save Room
          </button>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
              <div className="bg-amber-600 p-1 rounded-md">
                <Armchair className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-lg font-semibold text-gray-900">LuxeHome</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Premium space planning tools and bespoke furniture for the modern luxury home. Crafted with precision and style.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Tools</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-amber-600 transition-colors">Dining Table Calculator</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">Rug Size Guide</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">Lighting Placement</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-amber-600 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">Design Services</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-amber-600 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">Furniture Care</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© 2024 LuxeHome Furniture. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
