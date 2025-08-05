import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import UserContext from "../../ContextApi/UserContext/UserContext";
import Swal from "sweetalert2";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const { loginWithEmailAndPassword, googleLogin, user } = useContext(UserContext);
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
        Swal.fire({ icon: "success", title: "Login Successful!" });
        navigate(state?.pathname || "/");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Login Failed!" });
    }
  };

 const handleGoogle = async () => {
  if (!user) {
    try {
      const userCredential = await googleLogin();
      const currentUser = userCredential.user;

      if (currentUser) {
        const res = await axios.post("http://localhost:5000/user-create", {
          userName: currentUser.displayName,
          userEmail: currentUser.email,
        });

        // Always show success for both 200 and 201
        if (res.status === 200 || res.status === 201) {
          Swal.fire({ icon: "success", title: "Login Successful!" });
          navigate(state?.pathname || "/");
        }
      }

    } catch (error) {
      console.error(error);
      Swal.fire({ title: "Login Failed!", icon: "error" });
    }
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden relative p-6 md:p-10">
        <Link to="/" className="absolute top-5 left-5 text-gray-700">
          <IoIosArrowRoundBack size={30} />
        </Link>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image section */}
          <div className="hidden md:block">
            <img
              src="https://img.freepik.com/free-photo/joyful-people-taking-selfie-near-red-car_23-2148039034.jpg?t=st=1754205370~exp=1754208970~hmac=b4e9484a01c785eeb2d9b25c391d5c211b4c71ebbc0d6f03622c4fe09c9c30ab"
              alt="login visual"
              className="rounded-lg w-full h-auto"
            />
          </div>

          {/* Form section */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
            <form className="space-y-5 text-text font-rubik" onSubmit={handleLogin}>
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
                <span className="absolute right-3 top-10 cursor-pointer">
                  {showPassword ? (
                    <FaRegEye onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />
                  )}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md font-semibold cursor-pointer hover:bg-primary/80 "
              >
                Login
              </button>

              <div className="text-center my-3 text-gray-500">OR</div>

              <button
                onClick={handleGoogle}
                type="button"
                className="w-full flex justify-center items-center gap-2 border border-gray-300 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition-all duration-300"
              >
                <FcGoogle size={22} />
                Continue with Google
              </button>

              <p className="mt-4 text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary font-semibold">
                  Register Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
