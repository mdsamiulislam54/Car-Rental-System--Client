import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { FaPlay, FaPause } from "react-icons/fa";

import video2 from "../../assets/icons/car-red.mp4";
import { CgPlayTrackNextO } from "react-icons/cg";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3;
    }
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen  flex justify-between relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        ref={videoRef}
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={video2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full  flex flex-col justify-center items-center z-10 text-white text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-shadow ">
          Drive Your{" "}
          <span className="text-secondary">
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
          className="px-6 py-3 mt-4 bg-primary hover:bg-primary/90 rounded-full text-lg font-semibold transition"
        >
          View Available Cars
        </Link>
      </div>

      {/* Play / Pause Button */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-26 lg:left-16 left-4 lg:w-14 w-10 lg:h-14 h-10 bg-se/50 text-black rounded-full flex items-center justify-center shadow-lg animate-pulse hover:animate-none transition z-50"
      >
        {isPlaying ? (
          <FaPause size={22} color="white" />
        ) : (
          <FaPlay size={22} color="white" />
        )}
      </button>
    </div>
  );
};

export default Banner;
