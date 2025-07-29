import { Link } from "react-router";
import { FaPlay, FaPause } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden rounded-2xl">
      {/* Background Image - behind everything */}
      <div className="absolute right-0 z-0">
        <img
          src="https://demo.xpeedstudio.com/carrental/home-v4/wp-content/uploads/sites/5/2020/06/banner_image.png"
          alt="banner bg"
          className="h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-between w-11/12 mx-auto min-h-screen my-14">
        {/* Left Content */}
        <div className="w-1/2 space-y-4">
          <h4 className="text-xl font-semibold font-rubik">Plan your trip today</h4>
          <h1 className="text-3xl md:text-6xl font-extrabold leading-tight tracking-wider text-[#010103]  ">
            Enjoy great savings on car rentals
          </h1>
          <p className="text-base font-rubik text-gray-600 max-w-md">
            Join us in driving positive change and reaching our sustainability goals—
            together, we can make a difference.
          </p>

          <Link
            to="/available-cars"
            className="md:px-6 px-4  py-2 inline-block hover:bg-primary btn btn-outline rounded-md border-primary hover:text-white md:text-lg font-semibold transition-all duration-300 text-sm"
          >
            View Available Cars
          </Link>
        </div>

        {/* Right Car Image */}
        <div className="w-1/2 flex justify-center items-center relative">
          <img
            src="https://demo.xpeedstudio.com/carrental/home-v4/wp-content/uploads/sites/5/2020/06/banner_car.png"
            alt="banner car"
            loading="lazy"
            className=" h-auto max-w-[700px] object-contain absolute -left-30 mt-10 "
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
