import React from "react";

const Faq = () => {
  const faq = [
    {
      question: "How do I book a car from your website?",
      answer:
        "Simply browse our available cars, select your preferred vehicle, choose the rental dates, and click the 'Book Now' button. You’ll need to log in or create an account to confirm the booking.",
    },
    {
      question: "What documents are required to rent a car?",
      answer:
        "You’ll need a valid national ID or driving license and a contact number. International users must provide a valid passport and international driving permit.",
    },
    {
      question: "Can I cancel or modify my booking after confirmation?",
      answer:
        "Yes, you can cancel or modify your booking from your 'My Bookings' page. Cancellation policies may apply depending on the rental terms.",
    },
    {
      question: "Is there any mileage limit for rented cars?",
      answer:
        "Most of our cars come with unlimited mileage within city limits. For out-of-town trips, please check individual car details or contact our support team.",
    },
    {
      question: "Do the rental charges include fuel costs?",
      answer:
        "No, the rental charges cover only the car rental itself. Fuel expenses are to be borne by the customer during the rental period.",
    },
    {
      question: "What should I do if the car breaks down during the trip?",
      answer:
        "In case of a breakdown, contact our 24/7 helpline immediately. We’ll provide roadside assistance or a replacement vehicle based on your location.",
    },
  ];

  return (
    <div className="my-10">
      <div className="w-11/12 mx-auto py-10">
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold  mb-3 text-text font-rubik">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to the most common questions our customers ask before
              booking a car. If you still need help, feel free to contact our
              support team anytime.
            </p>
          </div>
        </div>
        <div>
          {faq.map((faq,index) => (
            <div key={index} className="collapse collapse-plus bg-base-100 border border-base-300 font-rubik">
              <input type="radio" name="my-accordion-3 " className="" defaultChecked />
              <div className="collapse-title font-semibold">{faq.question}</div>
              <div className="collapse-content text-sm">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
