import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Testimonial = () => {
  const testimonials = [
    {
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Ayesha Siddiqua",
      location: "Dhaka, Bangladesh",
      message:
        "I recently rented a car for a family trip, and the whole experience was outstanding. The booking process was simple, and the car was in excellent condition. Highly recommended for anyone looking for reliable service.",
    },
    {
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Mehedi Hasan",
      location: "Chattogram, Bangladesh",
      message:
        "I was impressed by their prompt customer support and variety of cars available. Even when I had to extend my booking at the last moment, it was handled smoothly. Will definitely use their service again.",
    },
    {
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      name: "Sadia Rahman",
      location: "Sylhet, Bangladesh",
      message:
        "As a first-time user, I was a bit skeptical, but the website made it so easy to book and the car was delivered exactly on time. The rates are affordable and no hidden charges. Loved the experience!",
    },
    {
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      name: "Shahriar Kabir",
      location: "Khulna, Bangladesh",
      message:
        "One of the best car rental services I've used so far. The car was clean, well-maintained, and the pickup process was quick. I even received a courtesy call from their support team during the trip.",
    },
    {
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      name: "Mim Akter",
      location: "Rajshahi, Bangladesh",
      message:
        "Great service, excellent cars and very professional behavior. I had an issue with my booking dates and their team helped me adjust it without any hassle. Truly impressive customer care.",
    },
    {
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      name: "Tariq Hossain",
      location: "Barisal, Bangladesh",
      message:
        "Smooth booking, competitive pricing and no surprise fees. I’ll recommend them to my friends and family. The car was spotless, and the fuel policy was clear. Loved how everything was handled professionally.",
    },
  ];

  return (
    <div className="py-10">
      <div className="w-11/12 mx-auto ">
        {/* heading */}
        <h2 className="text-3xl font-bold text-center mb-10 text-text font-rubik">
          Customers Say
        </h2>

        {/* swiperSlider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className=""
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="p-4  bg-white rounded-xl shadow-md mb-10  flex flex-col items-center text-center h-[270px] hover:shadow-lg transition-all duration-300 font-rubik">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-primary"
                />
                <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                <span className="text-sm text-gray-600">
                  {testimonial.location}
                </span>
                <p className="text-sm mt-3 text-gray-600">
                  " {testimonial.message} "
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
