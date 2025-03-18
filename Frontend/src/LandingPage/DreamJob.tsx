import { Avatar, TextInput } from "@mantine/core";
import Boy from "../assets/Boy.png";
import { IconSearch } from "@tabler/icons-react";
import avatar from "../assets/avatar.png";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import google from "../assets/Google2.png";

const DreamJob = () => {
  return (
    <div className="flex items-center justify-center px-20">
      <div className="flex flex-col gap-3">
        <div className="text-6xl leading-tight text-[#e7e7e7] font-bold [&>span]:text-[#ffbd20]">
          Find Your <span>Dream</span> <span>Job</span> here
        </div>
        <div className="text-[#d1d1d1] text-xl">
          Good life begins with a good company , Start explore thousand of jobs
          in one place
        </div>
        <div className="flex gap-3 mt-3">
          <TextInput
            className="bg-[#3d3d3d] rounded-lg p-1 px-2 text-[#f6f6f6] [&_input]:!text-[#f6f6f6]"
            variant="unstyled"
            label="Job Title"
            placeholder="Software Engineer"
          />{" "}
          <TextInput
            className="bg-[#3d3d3d] rounded-lg p-1 px-2 text-[#f6f6f6] [&_input]:!text-[#f6f6f6]"
            variant="unstyled"
            label="Job Type"
            placeholder="Full Time"
          />
          <div className="flex justify-center items-center h-full w-20 bg-[#ffbd20] text-[#e7e7e7] rounded-lg p-2 cursor-pointer hover:bg-[#f99b07]">
            <IconSearch className="h-[85%] w-[85%]" />
          </div>
        </div>
      </div>
      <div className="w-[55%] flex items-center justify-center">
        <div className="w-[37rem] relative">
          <img src={Boy} alt="home_image" />
          <div className="absolute -right-5 w-fit top-[53%] border-[#ffbd20] border rounded-lg p-2 backdrop-blur-md">
            <div className="text-center text-[#f6f6f6] mb-1 text-sm">
              5k+ got jobs
            </div>
            <Avatar.Group>
              <Avatar src={avatar} />
              <Avatar src={avatar1} />
              <Avatar src={avatar2} />
              <Avatar>+5</Avatar>
            </Avatar.Group>
          </div>
          <div className="absolute -left-5 w-fit top-[30%] border-[#ffbd20] border rounded-lg p-2 backdrop-blur-md flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <div className="w-12 h-12 p-1 bg-[#3d3d3d] rounded-lg">
                <img src={google} alt="" />
              </div>
              <div className="text-sm text-[#e7e7e7]">
                <div>Software Engineer</div>
                <div className="text-[#d1d1d1] text-sm">Ahmedabad</div>
              </div>
            </div>
            <div className="flex gap-2 justify-around text-[#d1d1d1] text-sm">
              <span>1 day ago</span>
              <span>120 applicants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamJob;
