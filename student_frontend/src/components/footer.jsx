import React from 'react'

function Footer() {
  return (
    
    <footer className="bg-gray-800 text-white py-6 mt-10 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <div className="w-1/4">
            <h4 className="font-bold text-lg">About Us</h4>
            <p className="text-sm">
              We are a team passionate about providing users with the best experience in exploring and booking vacation destinations in Kenya.
            </p>
          </div>

         

          <div className="w-1/4">
            <h4 className="font-bold text-lg">Follow Us</h4>
            <ul className="text-sm">
              <li><a href="https://facebook.com" className="hover:underline">Facebook</a></li>
              <li><a href="https://twitter.com" className="hover:underline">Twitter</a></li>
              <li><a href="https://instagram.com" className="hover:underline">Instagram</a></li>
            </ul>
          </div>

          <div className="w-1/4">
            <h4 className="font-bold text-lg">Contact</h4>
            <p className="text-sm">Email: safiricentralkenya@gmail.com</p>
            <p className="text-sm">Phone: +254 790760481</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Safiri Cental Kenya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer