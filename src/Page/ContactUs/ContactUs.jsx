import { motion } from "framer-motion";

const locations = [
  {
    id: 1,
    name: "Head Office",
    address: "123 Main Street, Dhaka, Bangladesh",
    phone: "+880 1234 567890",
    email: "info@carrental.com",
    lat: 23.8103,
    lng: 90.4125,
  },
  {
    id: 2,
    name: "Branch Office",
    address: "45 Second Avenue, Chittagong, Bangladesh",
    phone: "+880 9876 543210",
    email: "chattogram@carrental.com",
    lat: 22.3569,
    lng: 91.7832,
  },
];

const COntactUs = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-gray-900 mb-12 text-center"
      >
        Contact Us
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Company Info */}
        <div className="lg:w-1/3 space-y-8">
          {locations.map(({ id, name, address, phone, email }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: id * 0.2, duration: 0.5 }}
              className="bg-gray-50 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-primary mb-3">{name}</h3>
              <p className="text-gray-700 mb-1">{address}</p>
              <p className="text-gray-700 mb-1">Phone: <a href={`tel:${phone}`} className="text-primary hover:underline">{phone}</a></p>
              <p className="text-gray-700">
                Email: <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Map */}
        <div className="lg:w-2/3 h-[400px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Company Locations"
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Dhaka,Bangladesh&zoom=6`}
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default COntactUs;
