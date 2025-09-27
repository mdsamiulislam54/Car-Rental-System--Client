import car from "../../assets/icons/car.png";
import money from "../../assets/icons/money.png";
import booking from "../../assets/icons/calendar.png";
import phone from "../../assets/icons/telephone.png";

const features = [
  {
    icon: car,
    title: "Wide Variety of Cars",
    description: "From budget to luxury — pick the perfect car for your trip.",
  },
  {
    icon: money,
    title: "Affordable Prices",
    description: "Best daily rates with no hidden costs.",
  },
  {
    icon: booking,
    title: "Easy Booking",
    description: "Book your car in minutes, hassle-free.",
  },
  {
    icon: phone,
    title: "24/7 Support",
    description: "We’re always here for your questions and issues.",
  },
];

const WhyChoose = () => {
  return (
    <div className="relative my-10">
      <div className="custom-container py-2">
        {/* Booking Form */}

        {/* Why Choose Section */}
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-rubik">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-2 bg-white rounded-lg shadow hover:shadow-lg hover:bg-accent/10 transition-all duration-300"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-12 h-12 mx-auto mb-4"
                />
                <h3 className="text-md font-semibold mb-2 text-text font-rubik tracking-tight">{feature.title}</h3>
                <p className="text-gray-600 tracking-wide font-rubik text-[12px]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
