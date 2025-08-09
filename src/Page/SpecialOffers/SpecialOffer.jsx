import { motion } from "framer-motion";
import { FaCarAlt, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../../Components/Button/Button";

const SpecialOffer = () => {
  return (
    <section className="bg-gray-100 ">
      <div className="w-11/12 mx-auto flex flex-col-reverse md:flex-row items-center gap-12 px-6 md:px-0">
        {/* Left Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="md:w-1/2 space-y-6"
        >
          <h3 className="text-primary font-semibold text-lg uppercase tracking-wider">
            Special Offer
          </h3>
          <h2 className="text-4xl font-bold font-rubik text-gray-900 leading-tight">
           Unlock <span className="text-text">Premium Luxury</span> for Just{" "}
            <span className="text-primary">৳2000/day</span>
          </h2>
          
          
          <Link to="/available-cars">
            <Button text="Book Now" />
          </Link>
        </motion.div>

        {/* Right Image & Avatar */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="md:w-1/2 relative"
        >
          {/* Car Image */}
          <img
            src="https://acko-cms.ackoassets.com/Safest_Luxury_Cars_In_India_34ce7d2db0.png"
            alt="Luxury Car"
            className=" object-contain w-full h-[420px]"
          />

       
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffer;
