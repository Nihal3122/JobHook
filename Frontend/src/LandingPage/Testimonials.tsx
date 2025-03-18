import { Avatar, Rating } from "@mantine/core";
import avatar1 from "../assets/avatar.png";
import { testimonials } from "../Data/Data";

const Testimonials = () => {
  return (
    <div className="mt-20 pb-10">
      <div className="text-4xl mb-3 text-[#e7e7e7] font-semibold text-center">
        What our <span className="text-[#ffbd20]">User</span> says about us?
      </div>
      <div className="flex justify-evenly">
        {testimonials.map((testimonial, index) => (
          <div
            className="flex flex-col gap-3 w-[23%] border border-[#ffbd20] p-3 rounded-xl mt-10"
            key={index}
          >
            <div className="flex gap-2 items-center">
              <Avatar className="!h-14 !w-14" src={avatar1} alt="it's me" />
              <div>
                <div className="text-lg text-[#e7e7e7] font-semibold">
                  {testimonial.name}
                </div>
                <Rating value={testimonial.rating} fractions={2} readOnly />
              </div>
            </div>
            <div className="text-xs text-[#b0b0b0] ">
              {testimonial.testimonial}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
