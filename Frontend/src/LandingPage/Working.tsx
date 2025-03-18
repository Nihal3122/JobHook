import girlPhoto from "../assets/Girl.png";
import buildYourResume from "../assets/Build your resume.png";
import applyForJob from "../assets/Apply for job.png";
import GetHired from "../assets/Get hired.png";
import avatar1 from "../assets/avatar1.png";
import { Avatar } from "@mantine/core";

const Working = () => {
  return (
    <div className="mt-20 pb-10">
      <div className="text-4xl mb-3 text-[#e7e7e7] font-semibold text-center">
        How it <span className="text-[#ffbd20]">Works</span>
      </div>
      <div className="text-lg mb-10 text-[#b0b0b0] text-center w-1/2 mx-auto">
        Effortlessly navigate through the process and land your dream job.
      </div>
      <div className="flex px-32 justify-between items-center">
        <div className="relative">
          <img className="w-[35rem]" src={girlPhoto} alt="girlPhoto" />
          <div className="absolute w-36 top-[18%] right-3 flex flex-col items-center gap-1 border border-[#ffbd20] rounded-xl py-3 px-1 backdrop-blur-md">
            <Avatar className="!h-16 !w-16" src={avatar1} alt="it's me" />
            <div className="text-sm font-semibold text-[#d1d1d1] text-center">
              Complete your profile
            </div>
            <div className="text-xs text-center text-[#b0b0b0]">70% Completed</div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-[#ffd149] rounded-full">
              <img className="h-12 w-12" src={buildYourResume} alt="" />
            </div>
            <div>
              <div className="text-[#d1d1d1] text-xl font-semibold">
                Build your resume
              </div>
              <div className="text-[#b0b0b0]">
                Build your professional resume and apply for your dream job
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-[#ffd149] rounded-full">
              <img className="h-12 w-12" src={applyForJob} alt="" />
            </div>
            <div>
              <div className="text-[#d1d1d1] text-xl font-semibold">
                Apply for Job
              </div>
              <div className="text-[#b0b0b0]">
                Find and apply for jobs that match your skills.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-[#ffd149] rounded-full">
              <img className="h-12 w-12" src={GetHired} alt="" />
            </div>
            <div>
              <div className="text-[#d1d1d1] text-xl font-semibold">
                Get Hired
              </div>
              <div className="text-[#b0b0b0]">
                Connect with employers and start your new job.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;
