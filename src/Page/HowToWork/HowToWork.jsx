import { div } from "framer-motion/client";
import { FaCar, FaClipboardList, FaCreditCard, FaSmile, FaUndo, FaCommentDots } from "react-icons/fa";

const steps = [
  {
    icon: <FaClipboardList size={22} />,
    title: "Choose Your Car",
    description: "Browse and select the car that suits your needs.",
  },
  {
    icon: <FaCreditCard size={22} />,
    title: "Book Online",
    description: "Reserve your car easily through our website.",
  },
  {
    icon: <FaCar size={22} />,
    title: "Pick Up",
    description: "Pick up the car from your chosen location.",
  },
  {
    icon: <FaSmile size={22} />,
    title: "Enjoy the Ride",
    description: "Drive with confidence and enjoy your journey.",
  },
  {
    icon: <FaUndo size={22} />,
    title: "Return Car",
    description: "Return the vehicle at the agreed drop-off point.",
  },
  {
    icon: <FaCommentDots size={22} />,
    title: "Share Experience",
    description: "Leave a review and share your experience with others.",
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 py-4">
    <div className="w-11/12  mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-text font-rubik">How It Works</h2>
      <div className="relative border-l-2 border-dashed border-primary ml-4 sm:ml-0 sm:border-l-0 sm:before:absolute sm:before:left-1/2 sm:before:top-0 sm:before:bottom-0 sm:before:border-l-2 sm:before:border-dashed sm:before:border-primary">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`mb-2 sm:flex sm:items-center sm:justify-between sm:relative  ${
              index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
          >
            <div className="hidden sm:block w-5/12"></div>

            {/* Dot in the middle (or left on mobile) */}
            <div className="absolute left-[-15px] sm:left-1/2 sm:-translate-x-1/2 w-6 h-6 bg-primary rounded-full z-10 border-4 border-white shadow"></div>

            {/* Content Box */}
            <div className="bg-white border border-gray-200 shadow-md rounded-xl p-5 w-full sm:w-5/12 mt-2 sm:mt-0">
              <div className="flex items-center gap-3 mb-2 text-primary">
                {step.icon}
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
