import { Link } from "react-router";
import { FaPlay, FaPause } from "react-icons/fa";

import { Typewriter } from "react-simple-typewriter";
import carBanner from "../../assets/car-banner.jpg";

const Banner = () => {
  return (
    <div className="h-[95vh] w-11/12 mx-auto  flex justify-between relative overflow-hidden rounded-2xl">
      <img src={carBanner} alt="" className="w-full object-cover object-center"/>

      {/* Overlay Content */}
      <div className="absolute top-20 left-0 w-full h-full  flex flex-col items-center z-10 text-white text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold ">
          Drive Your{" "}
          <span className="text-accent">
            <Typewriter
              words={[
                "Dreams Today!",
                "Adventure Now!",
                "Passion Forward!",
                "Story with Us!",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={100}
            />
          </span>
        </h1>

        <Link
          to="/available-cars"
          className="md:px-6 px-2 md:py-3 py-2 mt-4 hover:bg-primary btn btn-outline rounded-md border-primary hover:text-white md:text-lg font-semibold transition-all duration-300 text-sm"
        >
          View Available Cars
        </Link>
      </div>
    </div>
  );
};

export default Banner;
