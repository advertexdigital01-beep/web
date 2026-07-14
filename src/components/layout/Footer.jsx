import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-primary py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold tracking-tight mb-6">ADVERTEX</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Designed with precision by Advertex. Transforming brands into market leaders.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-6">Address</h3>
          <address className="text-gray-400 not-italic text-sm leading-relaxed">
            1/199, KAM Complex,<br />
            North Street,<br />
            Kottaipalayam,<br />
            Coimbatore – 641110
          </address>
        </div>

        <div>
          <h3 className="font-semibold mb-6">Contact</h3>
          <p className="text-gray-400 text-sm mb-2">93604 57579</p>
          <p className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">advertexdigital01@gmail.com</p>
        </div>

        <div>
          <h3 className="font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">Services</li>
            <li className="hover:text-white cursor-pointer transition-colors">Work</li>
            <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Advertex. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
          <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
          <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
        </div>
      </div>
    </footer>
  );
}
