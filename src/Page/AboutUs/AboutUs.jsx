"use client";
import { motion } from "framer-motion";
import React from "react";
import { FaUsers, FaRegHandshake, FaAward, FaGlobe } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../../Components/Button/Button";

const features = [
  {
    icon: <FaUsers className="text-4xl text-accent mb-4" />,
    title: "Our Team",
    desc: "Meet the talented professionals behind our services.",
    animation: { x: -100, opacity: 0 },
  },
  {
    icon: <FaRegHandshake className="text-4xl text-accent mb-4" />,
    title: "Our Commitment",
    desc: "We provide unmatched service with full dedication.",
    animation: { x: 100, opacity: 0 },
  },
  {
    icon: <FaAward className="text-4xl text-accent mb-4" />,
    title: "Award Winning",
    desc: "Recognized for excellence in customer satisfaction.",
    animation: { y: 100, opacity: 0 },
  },
  {
    icon: <FaGlobe className="text-4xl text-accent mb-4" />,
    title: "Global Reach",
    desc: "Providing services in multiple cities worldwide.",
    animation: { y: 100, opacity: 0 },
  },
];

const teamMembers = [
  {
    img: "https://img.freepik.com/free-photo/content-indian-ceo-standing-smiling-portrait-successful-pensive-bearded-businessman-glasses-posing-office-room-business-expression-management-concept_74855-11642.jpg?w=1480",
    name: "Dr Fahim Chowdhury",
    role: "CEO & Founder",
  },
  {
    img: "https://img.freepik.com/free-photo/confident-professional-businesswoman-cross-arms-chest-looking-selfassured-camera-smiling-standing-white-background_176420-48895.jpg?w=1480",
    name: "Jane Smith",
    role: "Operations Manager",
  },
];

const AboutUs = () => {
  return (
    <div className="py-16 bg-gray-50 dark:bg-black relative">
      <div className="custom-container font-rubik relative z-100">
        {/* About Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4 font-rubik">
            About Us
          </h2>
          <p className="text-sm font-rubik text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
            We are a team of passionate professionals who are dedicated to
            providing the best customer experience with our luxury car rentals.
            Explore the city in style with our well-maintained fleet.
          </p>
        </motion.div>

        {/* Company Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={item.animation}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center bg-white dark:bg-gray-900 p-6 rounded-lg shadow"
            >
              {item.icon}
              <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-200 text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Meet The Team */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-6 dark:text-white">
            Meet The Team
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-200 max-w-3xl mx-auto mb-8">
            Our team of dedicated experts is here to ensure you have an
            unforgettable experience.
          </p>
          <div className="flex justify-center gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="text-center w-1/3">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                <h4 className="text-xl font-semibold text-gray-800  dark:text-gray-100">
                  {member.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-200">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call To Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center flex justify-center"
        >
          <Link to="/contact-us">
            <Button text={"Get In Touch"} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
