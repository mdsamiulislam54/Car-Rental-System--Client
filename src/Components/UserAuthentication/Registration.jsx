import { motion } from "framer-motion";
import { useContext, useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import UserContext from "../../ContextApi/UserContext/UserContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from "axios";
import LoginAvatar from '../../assets/login-avater.png'

const Registration = () => {
  const { createUser, user, googleLogin } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleReg = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const { email, password, name, photo } = data;
  
    try {
      const result = await createUser(email, password);
      const createdUser = result.user;

      await updateProfile(createdUser, {
        displayName: name,
        photoURL: photo,
      }).then(async () => {
          console.log(createdUser.email)
        // ✅ Backend user insert
        const userData = {
          userName: createdUser.displayName,
          userEmail: createdUser.email
        }
       
          await axios.post(` http://localhost:5000/user-create`,userData );
        Swal.fire({
          title: "Registration Successful",
          icon: "success",
        });
        navigate("/login");
      


        form.reset();
      })



    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Registration Failed!",
        text: err.message,
        icon: "error",
      });
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await googleLogin();
      const currentUser = result.user;

      // optional: JWT token set with credentials
      await axios.post(
        ` http://localhost:5000/jwt?email=${currentUser.email}`,
        {},
        { withCredentials: true }
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
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="overflow-hidden relative min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-md shadow-lg p-6 w-8/12 relative"
      >
        <Link
          to={"/"}
          className="rounded-full shadow p-1 cursor-pointer absolute top-0 m-4"
        >
          <IoIosArrowRoundBack size={30} />
        </Link>

        <div className="grid md:grid-cols-2 gap-8 items-center font-rubik">
          {/* Image section */}
          <div className="hidden md:block">
            <img
              src={LoginAvatar}
              alt="login visual"
              className="rounded-lg w-full h-auto"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-center mb-6">
              Register Now
            </h2>

            <form className="space-y-5" onSubmit={handleReg}>
              <div>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name..."
                  required
                  className="input w-full"
                />
              </div>
              <div>

                <input
                  type="text"
                  name="photo"
                  required
                  placeholder="Enter Your Photo Url..."
                  className="w-full input"
                />
              </div>
              <div>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter Your Email..."
                  className="w-full input"
                />
              </div>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter Your Password..."
                  className="w-full input"
                />
                <span className="absolute right-3 top-5 transform -translate-y-1/2">
                  {showPassword ? (
                    <FaRegEye
                      className="cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaRegEyeSlash
                      className="cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 text-white py-2 rounded-md font-semibold"
              >
                Register
              </button>
            </form>

            <div className="text-center my-4">OR</div>

            <button
              onClick={handleGoogle}
              className="w-full flex justify-center items-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition-all duration-300 cursor-pointer"
            >
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
      </motion.div>
    </div>
  );
};

export default Registration;
