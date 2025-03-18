import Marquee from "react-fast-marquee";
import { companies } from "../Data/Data";

const Companies = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl mb-10 text-[#e7e7e7] font-semibold text-center">
        Trusted By <span className="text-[#ffbd20]">1000+</span> Companies
      </div>
      <Marquee pauseOnHover={true}>
        {companies.map((company, index) => (
          <div
            className="mx-8 px-2 py-1 hover:bg-[#3d3d3d] rounded-xl cursor-pointer"
            key={index}
          >
            <img
              className="h-14"
              src={`/Company/${company}.png`}
              alt="company"
            />
          </div>
        ))}
        <div></div>
      </Marquee>
    </div>
  );
};

export default Companies;
