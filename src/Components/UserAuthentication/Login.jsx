import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import UserContext from "../../ContextApi/UserContext/UserContext";
import Swal from "sweetalert2";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";


const Login = () => {
  const { loginWithEmailAndPassword, googleLogin, user } =
    useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await loginWithEmailAndPassword(email, password);
      const currentUser = userCredential.user;

      if (currentUser) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
        });

        navigate(state?.pathname || "/");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
      });
    }
  };

  const handleGoogle = async () => {
    if (!user) {
      try {
        const userCredential = await googleLogin();
        const currentUser = userCredential.user;

        if (currentUser) {
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
          });

          navigate(state?.pathname || "/");
        }
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
      <div className="w-11/12 min-h-screen  mx-auto flex justify-center items-center ">
        <motion.img
          initial={{ x: -400 }}
          animate={{ x: 1500 }}
          transition={{
            duration: 10,
            delay: 2,
            repeat: Infinity,
            ease: "easeIn",
          }}
          src="https://i.postimg.cc/gJqvs3jC/200-removebg-preview.png"
          alt=""
          className="rotate-360
            absolute top-0 left-0 w-90 h-90
            
            
            "
        />
        <motion.img
          initial={{ x: -400 }}
          animate={{ x: 1500 }}
          transition={{
            duration: 10,
            delay: 5,
            repeat: Infinity,
            ease: "easeIn",
          }}
          src="https://i.postimg.cc/gJqvs3jC/200-removebg-preview.png"
          alt=""
          className="rotate-360
            absolute top-5 left-0 w-90 h-90
            
            
            "
        />
        <motion.img
          initial={{ x: 400 }}
          animate={{ x: -1500 }}
          transition={{
            duration: 10,
            delay: 2,
            repeat: Infinity,
            ease: "easeIn",
          }}
          src="https://i.postimg.cc/X7TmT0Qn/demolition-derby-car-illustration-74218-167-removebg-preview.png"
          alt=""
          className="rotate-3 *:
            absolute top-50 right-0  w-90 h-90 
            
            "
        />
        <motion.img
          initial={{ x: 400 }}
          animate={{ x: -1500 }}
          transition={{
            duration: 10,
            delay: 5,
            repeat: Infinity,
            ease: "easeIn",
          }}
          src="https://i.postimg.cc/X7TmT0Qn/demolition-derby-car-illustration-74218-167-removebg-preview.png"
          alt=""
          className="rotate-3 *:
            absolute top-60 right-0  w-90 h-90 
            
            "
        />

        <div className=" relative lg:w-8/12 w-full mx-auto bg-white/70 p-10 rounded-md shadow-lg z-50">
          <Link
            to={"/"}
            className="rounded-full shadow p-1 cursor-pointer absolute top-0"
          >
            <IoIosArrowRoundBack size={30} />
          </Link>
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-primary"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-primary"
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
              className="w-full bg-primary text-white py-2 rounded-md font-semibold cursor-pointer"
            >
              Login
            </button>
          </form>

          <div className="text-center my-4">OR</div>

          <button
            onClick={handleGoogle}
            className="w-full flex justify-center items-center gap-2 border border-gray-300 py-2 rounded-md cursor-pointer"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <p className="mt-5 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
