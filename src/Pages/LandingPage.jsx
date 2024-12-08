import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import companies from "../data/companies.json";
import faq from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { useUser } from "@clerk/clerk-react";

const LandingPage = () => {
  const [showFAQ, setShowFAQ] = useState(false);

  const toggleFAQ = () => {
    setShowFAQ(!showFAQ);
  };
  const{user,isLoaded}=useUser();
  const navigate = useNavigate();
  const GetStarted = () => {
    console.log(user?.unsafeMetadata?.role)
    if(user.unsafeMetadata.role){
      navigate(user?.unsafeMetadata?.role=="recruiter"?"/PostJobs":"/JobListing");
    }
   };

  return (
    <main className="flex flex-col gap-16 sm:gap-24 py-10 sm:py-20 px-5 sm:px-10 bg-gradient-to-r from-blue-50 via-green-50 to-purple-50">
      {/* Title and Description */}
      <section className="flex md:text-left px-6">
        <h1 className="flex flex-col items-center md:text-start md:w-1/2 justify-center text-4xl md:text-5xl lg:text-7xl font-extrabold">
          One step into{" "}
          <span className="flex items-center text-3xl sm:text-5xl lg:text-6xl gap-4 md:gap-6 pt-1 py-2 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
            Brighter future
          </span>
          <p className="gap-3 text-sm sm:text-base lg:text-lg text-justify pt-7 pb-3 px-9 lg:px-16 font-normal">
            Take the first step towards a brighter career. Explore thousands of job
            opportunities with all the information you need. It's your future. Come find it.
          </p>
          <div className="flex justify-center md:justify-normal w-3/4">
            <Button variant="blue" size="own1" onClick={GetStarted}>
              Get Started
            </Button>
          </div>
        </h1>
        <div className="hidden md:block md:w-1/2 bg-slate-200 rounded-full">
          <img src=".\online-job-portal-banner.png " alt="job portal banner" />
        </div>
      </section>

          {/* <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
            job with us
          </span> */}
      {/* Find Jobs and Post Jobs Buttons */}
      

      {/* Carousel */}
      <div>
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-fit py-16"
        >
          <CarouselContent className="flex gap-6 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => {
              return (
                <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                  <img
                    src={path}
                    alt={name}
                    className="h-9 sm:h-14 object-contain"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Resources Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 px-6">
        <Card className="shadow-lg hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Data Structure and Algorithm /Competetive programming Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Prepare for your next interview with these expert tips and guides.
            </p>
            <Link
              to="https://asksenior.in/"
              target="_blank"
              className="text-blue-600 hover:underline mt-4 block"
            >
              Learn More
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Resume Building
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Build a compelling resume with these tools and templates.
            </p>
            <Link
              to="https://www.example.com/resume-tools"
              target="_blank"
              className="text-blue-600 hover:underline mt-4 block"
            >
              Explore Tools
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Job Search Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Maximize your job search with proven strategies and insights.
            </p>
            <Link
              to="https://www.example.com/job-search-strategies"
              target="_blank"
              className="text-blue-600 hover:underline mt-4 block"
            >
              Get Started
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section Toggle */}
      <div className="text-center mt-10">
        <Button
          onClick={toggleFAQ}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-md transition-all duration-300"
        >
          {showFAQ ? "Hide FAQ" : "Show FAQ"}
        </Button>
      </div>

      {/* Accordion for FAQs */}
      {showFAQ && (
        <section className="mt-10">
          <Accordion type="single" collapsible>
            {faq.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-lg sm:text-xl font-medium hover:bg-purple-200 transition-all duration-300 p-4 rounded-md">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-4 text-gray-700 bg-gray-50 rounded-b-md">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
    </main>
  );
};

export default LandingPage;
