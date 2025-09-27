import { motion } from "framer-motion";
import { FaCarAlt, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../../Components/Button/Button";

const SpecialOffer = () => {
  return (
    <section className="">
      <div
        style={{ backgroundImage: `url("https://img.freepik.com/free-photo/woman-standing-by-her-new-red-car_1303-31810.jpg?t=st=1758948466~exp=1758952066~hmac=15b4c5672fb57c87cd43d86e0b38326f6c41a9af578664e6cd0143d8b1dc71f7&w=1480")` }}
        className="custom-container bg-cover bg-no-repeat h-[500px] rounded-box flex flex-col-reverse md:flex-row items-center gap-12 px-6 md:px-0  relative">
        {/* Left Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="md:w-[70%] space-y-6 max-sm:text-center ml-4 text-white z-[100]"
        >
          <h3 className=" font-semibold text-md uppercase tracking-wider">
            Would you like to
          </h3>
          <h2 className="text-4xl font-bold font-rubik  leading-tight">
            Drive Luxury at an Affordable Price?
          </h2>
          <p className="text-gray-200 text-sm leading-relaxed max-w-md">
            Experience the thrill of premium cars without breaking the bank. Choose your dream ride and enjoy unmatched comfort, safety, and style — starting today.
          </p>

          <Link to="/available-cars" className="max-sm:flex justify-center">
            <button className="px-4 py-2 border rounded-box hover:bg-primary transform-all duration-300 cursor-pointer">Book Now</button>
          </Link>
        </motion.div>

        {/* overlay*/}
        <div className="absolute inset-0 bg-black/50 z-[2]"></div>


      </div>
    </section>
  );
};

export default SpecialOffer;
