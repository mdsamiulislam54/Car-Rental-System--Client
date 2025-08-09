import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import AppInstalls from "../../assets/App installation-bro.png";

const AppInstall = () => {
  return (
    <section className="bg-gray-50 font-rubik">
      <div className="grid grid-cols-1 md:grid-cols-2 w-11/12 xxl:w-8/12 mx-auto items-center gap-12">
        
        {/* Left Image */}
        <div className="">
          <img
            src={AppInstalls}
            alt="App Installation"
            className="max-w-[600px]"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-snug">
            Rent a car on the go – <span className="text-primary">download our app!</span>
          </h2>

          {/* Features */}
          <div className="space-y-5 mb-8 grid grid-cols-2 gap-2">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Quick & Easy Booking
              </h4>
              <p className="text-gray-600 text-sm">
                Find available cars, check prices, and make reservations in minutes.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Exclusive Discounts
              </h4>
              <p className="text-gray-600 text-sm">
                Get app-only deals and discounts on your next rental.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                24/7 Access
              </h4>
              <p className="text-gray-600 text-sm">
                Rent anytime, anywhere, with all your booking info in one place.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Seamless Navigation
              </h4>
              <p className="text-gray-600 text-sm">
                Use in-app directions to pick up and drop off locations with ease.
              </p>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-lg hover:bg-primary transition"
            >
              <FaGooglePlay size={28} />
              <span className="text-left leading-tight">
                <p className="text-xs">GET IT ON</p>
                <p className="text-sm font-bold">Google Play</p>
              </span>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 bg-primary text-white px-5 py-3 rounded-lg hover:bg-primary/80 transition"
            >
              <FaApple size={28} />
              <span className="text-left leading-tight">
                <p className="text-xs">Download on the</p>
                <p className="text-sm font-bold">App Store</p>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppInstall;
