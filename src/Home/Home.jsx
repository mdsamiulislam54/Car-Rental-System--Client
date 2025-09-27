import React from "react";
import Banner from "../Page/Banner/Banner";

import WhyChoose from "../Page/WhyChoose/WhyChoose";
import RecentListingCar from "../Page/RecentListingCar/RecentListingCar";
import SpecialOffer from "../Page/SpecialOffers/SpecialOffer";
import Faq from "../Page/Faq/Faq";
import Testimonial from "../Page/Teastimonial/Testimonial";
import HowToWork from '../Page/HowToWork/HowToWork'
import AboutUs from "../Page/AboutUs/AboutUs";
import AppInstall from "../Page/AppInstall/AppInstall";




const Home = () => {
  return (
    <div>
      <section>
        <Banner />
      </section>
      <section>
        <WhyChoose />
      </section>

      <section>
        <RecentListingCar />
      </section>
      <section>
        <HowToWork />
      </section>
      <section>
        <AboutUs />
      </section>
      <section>
        <SpecialOffer />
      </section>
      <section>
        <AppInstall />
      </section>
      <section>
        <Faq />
      </section>
      <section>
        <Testimonial />
      </section>



    </div>
  );
};

export default Home;
