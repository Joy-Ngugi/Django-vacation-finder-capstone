import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-3">About Us</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              We are a team passionate about providing users with the best
              experience in exploring and booking vacation destinations in Kenya.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3">Follow Us</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>
                <a href="https://facebook.com" className="hover:text-white hover:underline transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="hover:text-white hover:underline transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="hover:text-white hover:underline transition">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3">Contact</h4>
            <p className="text-sm text-gray-300">Email: safiricentralkenya@gmail.com</p>
            <p className="text-sm text-gray-300">Phone: +254 790 760 481</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Safiri Central Kenya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;