import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa"; // Import React Icons

import LOGO from "../IMG/A&V_logo.png";

const ContactPage = () => {
  return (
    <div className="bg-black md:bg-white py-12 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Contact Info Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white md:text-gray-800">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-white md:text-gray-600">
            Have questions? We are here to help. Reach out to us anytime.
          </p>
        </div>

        {/* Grid layout for contact info and contact form */}
        <div className="grid sm:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6 sm:p-8 pr-0">
            {/* Company Logo */}
            <div className="mb-4">
              <img src={LOGO} className="h-20 mt-3" alt="H&M Logo" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white md:text-gray-800">
                Our Office
              </h2>
              <p className="mt-2 text-white md:text-gray-600">
                123 E-commerce Street, Shop City, 12345
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white md:text-gray-800">
                Phone
              </h2>
              <p className="mt-2 text-white md:text-gray-600">
                +1 800 123 4567
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white md:text-gray-800">
                Email
              </h2>
              <p className="mt-2 text-white md:text-gray-600">
                support@ecommerce.com
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white md:text-gray-800">
                Follow Us
              </h2>
              <div className="flex space-x-6 mt-2">
                {/* React Icons for Social Media */}
                <a
                  href="#"
                  className="text-white md:text-gray-600 hover:text-blue-500"
                >
                  <FaFacebookF size={24} />
                </a>
                <a
                  href="#"
                  className="text-white md:text-gray-600 hover:text-blue-500"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="#"
                  className="text-white md:text-gray-600 hover:text-blue-500"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="#"
                  className="text-white md:text-gray-600 hover:text-blue-500"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="shadow-lg rounded-lg mt-12 sm:mt-0 sm:p-8 pr-0 space-y-6">
            <h2 className="text-2xl font-semibold text-white md:text-gray-800">
              Send a Message
            </h2>
            <form>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg text-white md:text-gray-800"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 mt-2 bg-none md:bg-white border border-black text-white md:text-gray-800 rounded-lg focus:ring-1 focus:ring-white outline-0"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg text-white md:text-gray-800"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 mt-2 bg-none md:bg-white border border-black text-white md:text-gray-800 rounded-lg focus:ring-1 focus:ring-white outline-0"
                    placeholder="Your email address"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-lg text-white md:text-gray-800"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full p-3 mt-2 bg-none md:bg-white border border-black text-white md:text-gray-800 rounded-lg focus:ring-1 focus:ring-white outline-0"
                    placeholder="Write your message here..."
                    rows="5"
                    required
                  ></textarea>
                </div>
                <div>
                  <button className="bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-3 px-6 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
