import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">Hire-n-Higher</h2>
          <p className="mt-4 text-sm text-zinc-400">
            Helping students & professionals find the right opportunities and
            mentors to grow their careers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white cursor-pointer">
                Home
              </a>
            </li>
            <li>
              <a href="/jobs" className="hover:text-white cursor-pointer">
                Jobs
              </a>
            </li>
            <li>
              <a href="/mentors" className="hover:text-white cursor-pointer">
                Mentors
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white cursor-pointer">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="/blogs" className="hover:text-white cursor-pointer">
                Blogs
              </a>
            </li>
            <li>
              <a href="/faqs" className="hover:text-white cursor-pointer">
                FAQs
              </a>
            </li>
            <li>
              <a href="/support" className="hover:text-white cursor-pointer">
                Support
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white cursor-pointer">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 cursor-pointer"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 cursor-pointer"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 cursor-pointer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 cursor-pointer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-zinc-700 mt-10 pt-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} InternPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
