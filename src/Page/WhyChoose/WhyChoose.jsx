import car from "../../assets/icons/car.png";
import money from "../../assets/icons/money.png";
import booking from "../../assets/icons/calendar.png";
import phone from "../../assets/icons/telephone.png";
import UserContext from "../../ContextApi/UserContext/UserContext";
import BookingCar from "../BookingCar/BookingCar";
const WhyChoose = () => {
  return (
    <div className="relative my-10">
      <div className="w-11/12 mx-auto py-10 px-4  ">
       <div className="w-11/12 mx-auto bg-white  rounded-md shadow z-10 absolute -top-40 left-[50%] translate-x-[-50%] h-auto p-5">
        <BookingCar/>
      </div>
        <div className="mt-40">
        

          <h2 className="text-4xl font-bold text-center mb-10">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  mx-auto">
            {/* Point 1 */}
            <div className="text-center p-6 bg-white  rounded-lg shadow hover:shadow-lg hover:bg-accent/10 transition-all duration-300 ">
              <div className="text-5xl mb-4">
                <img src={car} alt="" className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Wide Variety of Cars
              </h3>
              <p className="">
                From budget to luxury — pick the perfect car for your trip.
              </p>
            </div>

            {/* Point 2 */}
            <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-lg hover:bg-accent/10 transition-all duration-300">
              <div className="text-5xl mb-4">
                <img src={money} alt="" className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
              <p className="text-gray-600">
                Best daily rates with no hidden costs.
              </p>
            </div>

            {/* Point 3 */}
            <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-lg hover:bg-accent/10  transition-all duration-300">
              <div className="text-5xl mb-4">
                <img src={booking} alt="" className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book your car in minutes, hassle-free.
              </p>
            </div>

            {/* Point 4 */}
            <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-lg hover:bg-accent/10 transition-all duration-300">
              <div className="text-5xl mb-4">
                <img src={phone} alt="" className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                We’re always here for your questions and issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
