import { motion } from "framer-motion";
import { useContext, useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";

import UserContext from "../../ContextApi/UserContext/UserContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import axios from "axios";
const Registration = () => {
  const { createUser, user, googleLogin } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleReg = (e) => {
    e.preventDefault();
    const from = e.target;
    const fromData = new FormData(from);
    const data = Object.fromEntries(fromData.entries());
    const { email, password, name, photo } = data;
    console.log(email, password);
    // createUser firebase email and password

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            Swal.fire({
              title: "Registration Successful",
              icon: "success",
            });
            navigate("/login");
            from.reset();
          })
          .catch((err) => {
            Swal.fire({
              title: "Registration Failed!",
              icon: `error ${err}`,
              draggable: true,
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGoogle = async () => {
    if (!user) {
      try {
        const userCredential = await googleLogin();
        const currentUser = userCredential.user;

        await axios.post(
          `https://car-rental-system-server-beta.vercel.app/

jwt?email=${currentUser.email}`,
          {},
          {
            withCredentials: true,
          }
        );

        Swal.fire({
          title: "Login successful!",
          icon: "success",
        });

        navigate(state?.pathname || "/");
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Login Failed!",
          icon: "error",
        });
      }
    }
  };
  return (
    <div className="overflow-hidden relative ">
      <div className="min-h-screen flex items-center justify-center px-4 py-10 ">
      

        <div className="rounded-md shadow-lg z-50 ">
          <Link
            to={"/"}
            className="rounded-full shadow p-1 cursor-pointer absolute top-0 m-4"
          >
            <IoIosArrowRoundBack size={30} />
          </Link>
          <div className="grid md:grid-cols-2 gap-8 items-center p-5 font-rubik">
             {/* Image section */}
          <div className="hidden md:block">
            <img
              src="https://img.freepik.com/free-photo/people-looking-road-map-near-red-car_23-2148039040.jpg?t=st=1754206905~exp=1754210505~hmac=ce7ec95a9bf9832e0d43127d810904d7768115a5d6da6e6ff5bb9a028dcff80f&w=1380"
              alt="login visual"
              className="rounded-lg w-full h-auto"
            />
          </div>
          
          <div>
          <h2 className="text-3xl font-bold text-center mb-6">
            Registration Now
          </h2>

          <form className="space-y-5" onSubmit={handleReg}>
            <div>
              <label className="block mb-1 font-medium ">Name</label>
              <input
                type="name"
                name="name"
                required
                className="input w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">PhotoUrl</label>
              <input
                type="text"
                name="photo"
                required
                className="w-full input"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full input"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full input"
              />
              <span className="absolute right-3 top-12 transform -translate-y-1/2">
                {showPassword ? (
                  <FaRegEye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-primary cursor-pointer hover:bg-primary/80 text-white py-2 rounded-md font-semibold"
            >
              Registration
            </button>
          </form>

          <div className="text-center my-4">OR</div>

          <button onClick={handleGoogle} className="w-full flex justify-center items-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition-all duration-300 cursor-pointer">
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <p className="mt-5 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium">
              Login Now
            </Link>
          </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
