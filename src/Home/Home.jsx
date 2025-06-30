import React from "react";
import Banner from "../Page/Banner/Banner";

import WhyChoose from "../Page/WhyChoose/WhyChoose";
import RecentListingCar from "../Page/RecentListingCar/RecentListingCar";
import SpecialOffer from "../Page/SpecialOffers/SpecialOffer";
import Faq from "../Page/Faq/Faq";
import Testimonial from "../Page/Teastimonial/Testimonial";


const Home = () => {
  return (
    <div>
      <section>
        <Banner />
      </section>
     
      <section>
        <WhyChoose/>
      </section>
     <section>
       <RecentListingCar/>
     </section>
    <section>
      <SpecialOffer/>
    </section>
    <section>
      <Faq/>
    </section>
    <section>
     <Testimonial/>
    </section>
   
    </div>
  );
};

export default Home;
