import React from "react";
import { MdOutgoingMail } from "react-icons/md";
import logo from "../../assets/icons/logo.png";
import { Link } from "react-router";
import {
  FaSquareFacebook,
  FaSquareGithub,
  FaSquareInstagram,
  FaSquareYoutube,

} from "react-icons/fa6";
import { BsFillSendCheckFill } from "react-icons/bs";
import Button from "../Button/Button";


const Footer = () => {
  return (
    <div className=" shadow  border-t border-gray-200 font-rubik">
      <div className="w-11/12 mx-auto">
        <footer className="footer lg:footer-horizontal text-base-content py-14">
          <aside>
           <Link className="text-xl font-bold flex items-center gap-1">
                      <img src="https://cdn-icons-png.flaticon.com/512/445/445005.png" alt="" className="w-6 h-6" />
                      <span className="font-rubik font-bold leading-4 tracking-wide text-2xl">RentRide</span>
                    </Link>
            <div>
              <h2 className="text-lg font-semibold mb-4">Contact Info</h2>
              <div className="text-sm space-y-2">
                <p>+880-123456789</p>
                <p>carrentalinfo@gmail.com</p>
                <p>Gaibandha, Rangpur, BD</p>
              </div>
               <div className="flex items-center gap-4 text-2xl mt-5">
              <Link to="https://www.facebook.com/mdsamiulislam2004/" target="blank">
                <FaSquareFacebook className="text-blue-500" />
              </Link>
              <Link to="https://github.com/mdsamiulislam54" target="blank">
                <FaSquareGithub className="text-black" />
              </Link>
              <Link to="*">
                <FaSquareInstagram className="text-red-400" />
              </Link>
              <Link to="*">
                <FaSquareYoutube className="text-red-400" />
              </Link>
            </div>
            </div>
          </aside>
          <nav>
            <h6 className="footer-title">Services</h6>
            <Link to={'/'} className="link link-hover">Home</Link>
            <Link to={'/my-cars'} className="link link-hover">My Cars</Link>
            <Link to={'/my-booking'} className="link link-hover">Booking Car</Link>
            <Link to={'*'} className="link link-hover">Advertisement</Link>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <Link to={'*'} className="link link-hover">About us</Link>
            <Link to={'*'} className="link link-hover">Contact</Link>
            <Link to={'*'} className="link link-hover">Jobs</Link>
            <Link to={'/available-cars'} className="link link-hover">Available Cars</Link>
          </nav>
          <div>
            <div className="flex-1 max-lg:mb-8">
              <h4 className="text-xl font-bold tracking-wide ">
                Subscribe to our NewsLetter to Get
              </h4>
              <h4 className="text-xl font-bold tracking-wide text-primary">
                Updates to our Latest Collection
              </h4>
              <p className="text-sm my-2 ">
                Get 20% off your first order just by subscribing to our
                newsLetter
              </p>
            </div>
            <form className="space-y-2">
              <span className="relative ">
                <input
                  type="text"
                  placeholder="Enter Email Address"
                  className="w-full p-3 pl-10 border border-gray-300 mb-2"
                />
                <span className="absolute -top-1 text-primary left-2">
                  <MdOutgoingMail size={30} />
                </span>
              </span>
          
        
                
          
              <Button icon={BsFillSendCheckFill} text={'Subscribe'}/>
            </form>
          </div>
        </footer>
        <div className="text-center py-5 border-t border-gray-300">
          <p className="mb-4 md:mb-0">© 2025 Furnior, All rights reserved.</p>
         
        </div>
      </div>
    </div>
  );
};

export default Footer;
