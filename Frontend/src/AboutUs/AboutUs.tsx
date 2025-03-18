import { Button } from "@mantine/core";
import aboutUs from "../../public/AboutUs/AboutUs.png";
import { IconFileSearch, IconLock, IconTablePlus } from "@tabler/icons-react";

const AboutUs = () => {
  return (
    <div className=" min-h-screen py-14 px-6 overflow-x-hidden">
      {/* First Section: Text, Button */}
      <section className="flex flex-col ml-16 md:flex-row items-center md:justify-between mb-16">
        <div className="flex-1 md:pr-8">
          <h1 className="text-6xl font-bold  mb-4">
            Welcome to Our Job Portal
          </h1>
          <p className=" mb-6 text-xl leading-relaxed">
            We are dedicated to connecting job seekers with their dream jobs and
            employers with the perfect candidates. Explore our platform to
            discover job opportunities that match your skills and interests.
          </p>
          <Button autoContrast>Explore Now</Button>
        </div>
        <div className="flex-1">
          <img
            src={aboutUs}
            alt="About Us"
            className="w-[580px] h-[580px] rounded-lg  object-cover"
          />
        </div>
      </section>

      {/* Second Section: How It Works */}
      <section id="explore" className=" py-12 rounded-lg mb-16 cursor-pointer">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 px-6">
          {/* Step 1: Sign Up */}
          <div className="border border-gray-500 text-white bg-transparent p-6 md:p-8 rounded-lg shadow-md flex-1 md:w-1/3 transition-transform transform hover:scale-105 hover:shadow-lg h-[320px] flex flex-col items-center justify-center">
            <IconLock className="w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Step 1: Sign Up
            </h3>
            <p className="text-gray-300 text-center text-base mb-2">
              Create an account to start your journey.
            </p>
            <p className="text-gray-300 text-center text-base">
              Fill in your details and complete your profile.
            </p>
          </div>

          {/* Step 2: Search Jobs */}
          <div className="border border-gray-500 text-white bg-transparent p-6 md:p-8 rounded-lg shadow-md flex-1 md:w-1/3 transition-transform transform hover:scale-105 hover:shadow-lg h-[320px] flex flex-col items-center justify-center">
            <IconFileSearch className="w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Step 2: Search Jobs
            </h3>
            <p className="text-gray-300 text-center text-base mb-2">
              Browse through a wide range of job listings.
            </p>
            <p className="text-gray-300 text-center text-base">
              Find jobs tailored to your skills and interests.
            </p>
          </div>

          {/* Step 3: Apply */}
          <div className="border border-gray-500 text-white bg-transparent p-6 md:p-8 rounded-lg shadow-md flex-1 md:w-1/3 transition-transform transform hover:scale-105 hover:shadow-lg h-[320px] flex flex-col items-center justify-center">
            <IconTablePlus className="w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Step 3: Apply
            </h3>
            <p className="text-gray-300 text-center text-base mb-2">
              Apply for your desired positions.
            </p>
            <p className="text-gray-300 text-center text-base">
              Start your journey towards your next career opportunity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
