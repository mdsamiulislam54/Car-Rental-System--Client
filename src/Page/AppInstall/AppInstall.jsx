import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import AppInstalls from "../../assets/App installation-bro.png";
import { Link } from "react-router";

const AppInstall = () => {
  return (
    <section className=" bg-gray-100 dark:bg-black font-rubik py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 custom-container xxl:w-8/12 mx-auto items-center gap-12">
        
        {/* Left Image */}
        <div className="">
          <img
            src={AppInstalls}
            alt="App Installation"
            className="xl:max-w-[600px] lg:max-w-[500px]"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-sm md:text-md lg:text-lg xl:text-3xl font-bold text-center lg:text-start text-gray-900 dark:text-gray-100 mb-6 leading-snug">
            Rent a car on the go <span className="text-accent">download our app!</span>
          </h2>

          {/* Features */}
          <div className="space-y-5 mb-8 grid grid-cols-2 gap-2 text-sm">
            <div>
              <h4 className="text-sm md:text-md font-semibold text-gray-800">
                Quick & Easy Booking
              </h4>
              <p className="text-gray-600  text-xs md:text-sm">
                Find available cars, check prices, and make reservations in minutes.
              </p>
            </div>
            <div>
              <h4 className="text-sm md:text-md font-semibold text-gray-800">
                Exclusive Discounts
              </h4>
              <p className="text-gray-600 ext-xs md:text-sm">
                Get app-only deals and discounts on your next rental.
              </p>
            </div>
            <div>
              <h4 className="text-sm md:text-md font-semibold text-gray-800">
                24/7 Access
              </h4>
              <p className="text-gray-600 ext-xs md:text-sm">
                Rent anytime, anywhere, with all your booking info in one place.
              </p>
            </div>
            <div>
              <h4 className="text-sm md:text-md font-semibold text-gray-800">
                Seamless Navigation
              </h4>
              <p className="text-gray-600 ext-xs md:text-sm">
                Use in-app directions to pick up and drop off locations with ease.
              </p>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="grid lg:grid-cols-2 gap-4">
            <Link
              to={'/'}
              className="flex items-center justify-center gap-3 bg-accent text-white px-5 py-2  rounded-lg hover:bg-accent/90 transition"
            >
              <FaGooglePlay size={28} />
              <span className="text-left leading-tight">
                <p className="text-xs">GET IT ON</p>
                <p className="text-sm font-bold">Google Play</p>
              </span>
            </Link>

            <Link
              to={'/'}
              className="flex items-center justify-center gap-3 bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/80 transition"
            >
              <FaApple size={28} />
              <span className="text-left leading-tight">
                <p className="text-xs">Download on the</p>
                <p className="text-sm font-bold">App Store</p>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppInstall;
