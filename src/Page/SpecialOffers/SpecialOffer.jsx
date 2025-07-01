import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router";

const SpecialOffer = () => {
  return (
    <div className=" my-10 py-14 bg-gray-50">
      <div className="w-11/12 mx-auto gap-2">
       
        <div className="overflow-hidden rounded-2xl ">
          <div
           
            className="w-full h-[500px] bg-cover bg-no-repeat bg-center "
            style={{
              backgroundImage: `url(" https://img.freepik.com/premium-photo/modern-car-automobile-background-street-close-up-side-illustration-3d-render_37416-226.jpg?w=1380")`,
            }}
          >
            <div className="w-full flex justify-center items-center h-full flex-col text-white bg-black/60">
              <div
                
                className="text-5xl px-5 text-center font-bold "
              >
                <h2 className="text-5xl px-10 text-center font-bold leading-18">
                  Luxury cars at <span className="text-accent">$99</span>{" "}/day <br></br>
                  this holiday season!
                </h2>
                <Link to={'available-cars'} className="px-6 py-3 mt-4 border-primary hover:text-white hover:bg-primary rounded-md btn btn-outline text-lg font-semibold transition">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
