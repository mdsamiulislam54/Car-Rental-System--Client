import { Link } from "react-router";
import { FaPlay, FaPause, FaCheckCircle } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import Button from "../../Components/Button/Button";
import BookingCar from "../BookingCar/BookingCar";
import { motion, scale } from "framer-motion";


const Banner = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden rounded-2xl">
      {/* Background Image - behind everything */}
      <div className="absolute right-0 z-2">
        <img
          src="https://demo.xpeedstudio.com/carrental/home-v4/wp-content/uploads/sites/5/2020/06/banner_image.png"
          alt="banner bg"
          className="h-full object-cover"
          loading="lazy"
        />
      </div>

   
      <div className="relative z-10 flex items-center justify-between w-11/12 mx-auto min-h-screen my-14">
        {/* Left Content */}
        <motion.div
        initial={{opacity:0, x:-120}}
        animate={{opacity:1, x:0}}
        transition={{duration:0.5, }}

        
        className="lg:w-1/2 space-y-4 max-lg:absolute  max-lg:top-[50%] left-[50%]  max-lg:translate-x-[-50%]  max-lg:translate-y-[-50%]  max-lg:z-90 w-full  max-lg:text-center ">
          <h4 className="text-xl font-semibold font-rubik text-text">Plan your trip today</h4>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-wider font-rubik text-text  ">
            Enjoy <span className="text-primary">great</span> savings <br></br> on car rentals
          </h1>
          <p className="text-base font-rubik text-gray-600 lg:max-w-md">
            Join us in driving positive change and reaching our sustainability goals—
            together, we can make a difference.
          </p>

          <Link
            to="/available-cars"
            className="w-full max-lg:flex justify-center"
           
          >
           <Button text="Book Ride Car" icon={FaCheckCircle}/>
          </Link>
        </motion.div>

        {/* Right Car Image */}
        <div className="w-1/2 flex justify-center items-center relative">
          <img
            src="https://demo.xpeedstudio.com/carrental/home-v4/wp-content/uploads/sites/5/2020/06/banner_car.png"
            alt="banner car"
            loading="lazy"
            className=" h-auto md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] max-lg:hidden object-contain absolute md:-left-30 mt-10  "
          />
        </div>
      </div>

     
    </div>
  );
};

export default Banner;
