import { motion } from "framer-motion";
import { toast } from "react-toastify";


const locations = [
  {
    id: 1,
    name: "Head Office",
    address: "123 Main Street, Dhaka, Bangladesh",
    phone: "+880 1234 567890",
    email: "info@carrental.com",
  },
  {
    id: 2,
    name: "Branch Office 1",
    address: "45 Second Avenue, Chittagong, Bangladesh",
    phone: "+880 9876 543210",
    email: "chattogram@carrental.com",
  },
  {
    id: 3,
    name: "Branch Office 2",
    address: "78 Third Road, Sylhet, Bangladesh",
    phone: "+880 1122 334455",
    email: "sylhet@carrental.com",
  },
  {
    id: 4,
    name: "Branch Office 3",
    address: "56 Fourth Lane, Khulna, Bangladesh",
    phone: "+880 6677 889900",
    email: "khulna@carrental.com",
  },
];

const ContactUs = () => {


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    if (!name || !email) {
      return toast.error("Please fill all required fields.")
    }
    toast.success(`Thanks, ${name}. Your email: ${email}`)

    form.reset();
  };

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-6 py-16 font-rubik">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
      >
        Contact Us
      </motion.h1>

      {/* Address Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {locations.map(({ id, name, address, phone, email }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: id * 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-accent mb-3">{name}</h3>
            <p className="text-gray-700 dark:text-gray-100 mb-2">{address}</p>
            <p className="text-gray-700 dark:text-gray-100 mb-1 text-sm">
              Phone: <a href={`tel:${phone}`} className=" hover:underline">{phone}</a>
            </p>
            <p className="text-gray-700 dark:text-gray-100 text-sm">
              Email: <a href={`mailto:${email}`} className=" hover:underline">{email}</a>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-900 dark:text-white p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Send Us a Message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Your Message"
            name="message"
            required
            rows={5}
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-5 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary/90 transition-colors duration-300"
          >
            Send Message
          </button>
        </motion.form>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d283284.24906440463!2d90.22046308233712!3d23.77966638791799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1754827206958!5m2!1sen!2sbd" width="100%" height="500" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </section>
  );
};

export default ContactUs;
