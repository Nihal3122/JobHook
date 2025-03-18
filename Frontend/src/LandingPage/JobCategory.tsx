import { Carousel } from "@mantine/carousel";
import { jobCategory } from "../Data/Data";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const JobCategory = () => {
  return (
    <div className="mt-20 pb-10">
      <div className="text-4xl mb-3 text-[#e7e7e7] font-semibold text-center">
        Browse<span className="text-[#ffbd20]">Job</span> Category
      </div>
      <div className="text-lg mb-10 text-[#b0b0b0] text-center w-1/2 mx-auto">
        Explore diverse job opportunities tailored to your skills. Start your
        career journey today!!
      </div>
      <Carousel
        nextControlIcon={<IconArrowRight size={16} className="h-8 w-8" />}
        previousControlIcon={<IconArrowLeft size={16} className="h-8 w-8" />}
        slideSize="22%"
        // withControls={false}
        height={220}
        slideGap="md"
        loop
        className="focus-visible:[&_button]:!outline-none [&_button]:!bg-[#ffbd20] [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0"
      >
        {jobCategory.map((category, index) => (
          <Carousel.Slide key={index}>
            <div className="flex flex-col gap-3 items-center w-64 h-full border border-[#ffbd20] p-5 rounded-xl transition duration-300 ease-in-out not-first-of-type:hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] !shadow-[#ffd149]">
              <div className="p-2 bg-[#ffd149] rounded-full">
                <img
                  className="h-8 w-8"
                  src={`/Category/${category.name}.png`}
                  alt=""
                />
              </div>
              <div className="text-[#e7e7e7] text-xl font-semibold">
                {category.name}
              </div>
              <div className="text-sm text-center text-[#b0b0b0]">
                {category.desc}
              </div>
              <div className="text-[#ffd149] text-xl">
                {category.jobs} New Job Posted
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default JobCategory;
