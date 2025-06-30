import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router";

const SpecialOffer = () => {
  return (
    <div className=" my-10 py-14 bg-primary/10">
      <div className="w-11/12 mx-auto grid lg:grid-cols-2 gap-2 overflow-hidden">
        <div className="overflow-hidden rounded-2xl">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="w-full h-[400px] bg-cover bg-no-repeat overflow-hidden "
            style={{
              backgroundImage: `url("https://i.postimg.cc/TYKRqC5D/about.1044506a3d3cb06c91b2.png")`,
            }}
          >
            <motion.div className="w-full flex justify-center items-center h-full flex-col text-white bg-black/60">
              <motion.h2
                initial={{ x: 300, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="text-5xl px-10 text-center font-bold "
              >
                Get <span className="text-secondary">15% </span>off for weekend
                rentals!
              </motion.h2>
              <Link className="px-6 py-3 mt-4 bg-primary hover:bg-primary/90 rounded-full text-lg font-semibold transition">
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="overflow-hidden rounded-2xl">
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="w-full h-[400px] bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(" https://i.postimg.cc/g2n0QGjM/kisspng-2018-hyundai-tucson-car-jeep-compass-lowest-price-5b201dfc6d0179.0241154815288314844465-ezgi.png")`,
            }}
          >
            <div className="w-full flex justify-center items-center h-full flex-col text-white bg-black/60">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-5xl px-5 text-center font-bold "
              >
                <h2 className="text-5xl px-10 text-center font-bold leading-14">
                  Luxury cars at <span className="text-secondary">$99/day</span>{" "}
                  this holiday season!
                </h2>
                <Link className="px-6 py-3 mt-4 bg-primary hover:bg-primary/90 rounded-full text-lg font-semibold transition">
                  Book Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
