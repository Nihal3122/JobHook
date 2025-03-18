import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBriefcase,
} from "@tabler/icons-react";
import { footerLinks } from "../Data/Data";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    location.pathname != "/sign-up" &&
    location.pathname != "/login" && (
      <div className="pb-10 bg-[#2d2d2d] font-['poppins']">
        <div className="pt-20 flex gap-5 justify-around">
          <div className="w-1/4 flex flex-col gap-4">
            <div className="flex gap-3 items-center text-[#ffbd20]">
              <IconBriefcase className="h-7 w-7" stroke={2} />
              <div className="text-2xl font-medium">JobHook</div>
            </div>
            <div className="text-sm text-[#b0b0b0] ">
              A job portal with user profiles, skill updates, certifications,
              work experience, and admin job postings.
            </div>
            <div className="flex gap-3 text-[#ffbd20] [&>div]:bg-[#3d3d3d] [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer ">
              <div className="hover:bg-[#454545]">
                <IconBrandFacebook />{" "}
              </div>
              <div className="hover:bg-[#454545]">
                <IconBrandInstagram />
              </div>
              <div className="hover:bg-[#454545]">
                <IconBrandX />
              </div>
            </div>
          </div>
          {footerLinks.map((link, index) => (
            <div key={index}>
              <div className="text-lg font-semibold mb-4 text-[#ffbd20]">
                {link.title}
              </div>
              {link.links.map((link, index) => (
                <div
                  key={index}
                  className="text-[#e7e7e7] text-sm hover:text-[#ffbd20] cursor-pointer mb-1 hover:translate-x-1 transition duration-300 ease-in-out"
                >
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-[#b0b0b0] mt-8 border-t border-[#3d3d3d] pt-4">
          © {new Date().getFullYear()} JobHook. All rights reserved.
        </div>
      </div>
    )
  );
};

export default Footer;
