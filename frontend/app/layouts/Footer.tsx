import React from 'react';

const Footer = () => {
  return (
      <div className="bg-gray-100 py-10 px-6 font-sans text-sm text-gray-700">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 xl:gap-8">
          {/* Address */}
          <div>
            <p className="font-semibold mb-4">
              2020 Massachusetts Ave<br />
              NW. Washington, DC 20036
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Rooms</a></li>
                <li><a href="#" className="hover:underline">Facilities</a></li>
                <li><a href="#" className="hover:underline">Offers</a></li>
                <li><a href="#" className="hover:underline">Wedding</a></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Location</a></li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">YouTube</a></li>
              <li><a href="#" className="hover:underline">TikTok</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-semibold mb-4">Subscribe Our Newsletter</p>
            <div className="flex items-center">
              <input
                  type="email"
                  placeholder="Email Address"
                  className="border-b border-gray-400 bg-transparent px-0 py-2 flex-1 focus:outline-none"
              />
              <button className="ml-4 md:ml-1 xl:ml-4 text-gray-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs">
          <p>©2025 Eco rental. All rights reserved</p>
          <div className="space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
  );
};

export default Footer;