import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook, CiTwitter, CiYoutube } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa";
import Logo from "../IMG/A&V_logo.png";

function Footer() {
  return (
    <>
      <div className="w-full h-full bg-black-background">
        <div className="py-8 sm:py-10 px-6 sm:px-10 lg:px-20 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left flex-1">
            <h4 className="text-secondary-text font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
              Need Help?
            </h4>
            <p className="text-secondary-text font-medium text-lg sm:text-xl lg:text-2xl">
              Call our award-winning support team 24/7 at{" "}
              <br className="hidden sm:block" />
              <span className="font-bold">(480) 50564 789</span>
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link to={"/contact"}>
              <button className="bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-3 px-6 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* Main Footer Container with Grid Layout */}
        <div
          className="text-secondary-text grid grid-cols-1 w-full px-5 pt-4 sm:pt-0 sm:[grid-template-columns:65%_35%]
"
        >
          <div className=" lg:px-10 grid grid-cols-2 gap-4 sm:gap-0 sm:grid-cols-3">
            {/* Shop Section */}
            <div className=" mb-4 sm:mb-0 sm:mx-auto text-left">
              <h3 className=" font-bold text-xl lg:text-2xl mb-2 text-primary-text">
                SHOP
              </h3>
              <ul className="list-none p-0">
                <li className="pt-2">
                  <Link
                    to="/shop"
                    className="text-normal hover:text-primary-text"
                  >
                    Ladies
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    to="/shop"
                    className="text-normal hover:text-primary-text"
                  >
                    Men
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    to="/shop"
                    className="text-normal hover:text-primary-text"
                  >
                    Baby
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    to="/shop"
                    className="text-normal hover:text-primary-text"
                  >
                    Kids
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    to="/shop"
                    className="text-normal hover:text-primary-text"
                  >
                    New Collection
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    to="/shop"
                    className="text-normal hover:text-primary-text"
                  >
                    Best Sellings
                  </Link>
                </li>
              </ul>
            </div>

            {/* Corporate Info Section */}
            <div className="mb-4 sm:mb-0 sm:mx-auto text-cente">
              <h3 className="font-bold text-xl lg:text-2xl mb-2 text-primary-text">
                COMPANY
              </h3>
              <ul className="list-none p-0">
                <li className="pt-2">
                  <Link to="/" className="text-normal hover:text-primary-text">
                    Home
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    to="/shop"
                    className="text-normal hover:text-primary-text"
                  >
                    Shop
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    to="/about"
                    className="text-normal hover:text-primary-text"
                  >
                    About
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    to="/contact"
                    className="text-normal hover:text-primary-text"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help Section */}
            <div className="mb-4 sm:mb-0 sm:mx-auto text-left" id="heading3">
              <h3 className="font-bold text-xl lg:text-2xl mb-2 text-primary-text">
                HELP
              </h3>
              <ul className="list-none p-0">
                <li className="pt-2">
                  <Link
                    // to="/ladies"
                    className="text-normal hover:text-primary-text"
                  >
                    +91 8081923437
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    // to="/men"
                    className="text-normal hover:text-primary-text"
                  >
                    support.anv@gmail.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="sm:pt-8 lg:pt-0">
            <p>
              Sign up now and be the first to know about exclusive offers,
              latest fashion news & style tips!
            </p>
            <a href="#" className="underline hover:text-primary-text">
              Read more →
            </a>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center my-8 space-x-4">
          <FaInstagram className="text-2xl sm:text-3xl hover:text-gray-500" />
          <CiFacebook className="text-2xl sm:text-3xl hover:text-gray-500" />
          <CiTwitter className="text-2xl sm:text-3xl hover:text-gray-500" />
          <FaTiktok className="text-2xl sm:text-3xl hover:text-gray-500" />
          <CiYoutube className="text-2xl sm:text-3xl hover:text-gray-500" />
        </div>

        <p className="text-center text-gray-600 sm:mt-4 px-4 font-mono mb-5">
          The content of this site is copyright-protected and is the property of
          A & V Aditya and Vaibhav AV.
        </p>

        {/* Center the logo section properly */}
        <div className="flex justify-center items-center flex-col mt-7">
          <Link to={"/"}>
            <img
              src={Logo}
              className="w-[180px] sm:w-[280px] mt-3"
              alt="H&M Logo"
            />
          </Link>
          <h3 className="text-center mt-4 mb-10 text-sm sm:text-lg">
            INDIA | Rs.
          </h3>
        </div>
      </div>
    </>
  );
}

export default Footer;
