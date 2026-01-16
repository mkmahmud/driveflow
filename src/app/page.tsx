"use client";

import FeaturedCars from '@/components/sections/home/featured';
import Hero from '@/components/sections/home/hero';
import ReadyToHit from '@/components/sections/home/readyToHit';
import WhyChooseUs from '@/components/sections/home/whyChooseUs';


export default function Home() {


  return (
    <div className="">
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <ReadyToHit/>
    </div>
  );
}