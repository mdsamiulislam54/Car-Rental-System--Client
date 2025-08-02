import { motion } from "framer-motion";
import React from "react";
import { FaUsers, FaRegHandshake, FaAward, FaGlobe } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../../Components/Button/Button";


const AboutUs = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="w-11/12  mx-auto px-4 font-rubik">
        {/* About Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4 font-rubik">
            About Us
          </h2>
          <p className="text-sm font-rubik text-gray-600 max-w-3xl mx-auto">
            We are a team of passionate professionals who are dedicated to providing
            the best customer experience with our luxury car rentals. Explore the city
            in style with our well-maintained fleet.
          </p>
        </motion.div>

        {/* Company Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white p-6 rounded-lg shadow-md"
          >
            <FaUsers className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Team</h3>
            <p className="text-gray-600 text-sm">Meet the talented professionals behind our services.</p>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white p-6 rounded-lg shadow-md"
          >
            <FaRegHandshake className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Commitment</h3>
            <p className="text-gray-600 text-sm">We provide unmatched service with full dedication.</p>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white p-6 rounded-lg shadow-md"
          >
            <FaAward className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Award Winning</h3>
            <p className="text-gray-600 text-sm">Recognized for excellence in customer satisfaction.</p>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white p-6 rounded-lg shadow-md"
          >
            <FaGlobe className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Reach</h3>
            <p className="text-gray-600 text-sm">Providing services in multiple cities worldwide.</p>
          </motion.div>
        </div>

        {/* Meet The Team */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-6">
            Meet The Team
          </h2>
          <p className="text-sm  text-gray-600 max-w-3xl mx-auto mb-8">
            Our team of dedicated experts is here to ensure you have an unforgettable experience.
          </p>
          <div className="flex justify-center gap-8">
            {/* Team Member 1 */}
            <div className="text-center w-1/3">
              <img
                src={'https://img.freepik.com/free-photo/experienced-businessman-standing-office-room-indian-content-office-employee-eyeglasses-smiling-posing-with-folded-hands-business-management-corporation-concept_74855-11681.jpg?t=st=1754156061~exp=1754159661~hmac=e29c5b53632cff62cd58356b95ae8b762ff14e98a0ad2ee316978c61c3de8909&w=1380'}
                alt="Team Member"
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">Dr Fahim Chowdhury</h4>
              <p className="text-gray-600">CEO & Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center w-1/3">
              <img
                src={'https://img.freepik.com/free-photo/well-done-young-corporate-woman-entrepreneur-suit-glasses-shows-thumbs-up-smiles-pleased-white_176420-41080.jpg?t=st=1754156148~exp=1754159748~hmac=5f50980ff5082077e85ff77629df1b75b2c13e221634d71a15a45aee6cca55c4&w=1380'}
                alt="Team Member"
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-bold text-gray-800">Jane Smith</h4>
              <p className="text-gray-600">Operations Manager</p>
            </div>
          </div>
        </motion.div>

        {/* Call To Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center flex justify-center"
        >
          <Link
            to="/contact-us"
            className=""
          >
            <Button text={"Get In Touch"}/>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
