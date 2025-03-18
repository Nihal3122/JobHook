import { Avatar, Divider, Tabs } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import Banner from "../assets/banner.jpg";
import avatar from "../assets/avatar.png";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import AboutComp from "./AboutComp";
import JobComp from "./JobComp";
import EmployeesComp from "./EmployeesComp";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";

const Company = () => {
  const [jobList, setJobList] = useState<any>([]);
  const { name } = useParams();

  useEffect(() => {
    const getAllJob = async () => {
      const response = await getAllJobs();
      setJobList(response.data.filter((job: any) => job.company == name));
    };
    getAllJob();
  }, []);
  return (
    <div className="w-3/4">
      <div className="relative">
        <img className="rounded-t-2xl" src={Banner} alt="BannerImg" />
        <img
          className="rounded-3xl bg-[#2d2d2d] p-2 w-40 h-40 absolute -bottom-1/4 left-5 border-8 border-[#2d2d2d]"
          src={`/Icons/${name}.png`}
          alt="BannerImg"
        />
      </div>
      <div className="px-3 mt-16">
        <div className="text-3xl font-semibold flex justify-between">
          {name}
          <Avatar.Group>
            <Avatar src={avatar} />
            <Avatar src={avatar1} />
            <Avatar src={avatar2} />
            <Avatar>+10k</Avatar>
          </Avatar.Group>
        </div>
        <div className="flex gap-2 text-lg text-[#888888] items-center">
          <IconMapPin stroke={1.5} className="w-5 h-5" />
          {jobList.length > 0 ? (
            <span>{jobList[0].location}</span>
          ) : (
            <span>Location not available</span>
          )}
        </div>
      </div>
      <Divider my={"xl"} color="mineShaft.7" />
      <div>
        <Tabs variant="outline" radius={"lg"} defaultValue={"About"}>
          <Tabs.List className="[&_button]:!text-[18px] mb-5 font-semibold [&_button[data-active='true']]:!text-[#ffbd20] ">
            <Tabs.Tab value="About">About</Tabs.Tab>
            <Tabs.Tab value="Jobs">Jobs</Tabs.Tab>
            {/* <Tabs.Tab value="Employees">Employees</Tabs.Tab> */}
          </Tabs.List>

          <Tabs.Panel value="About">
            <AboutComp />
          </Tabs.Panel>
          <Tabs.Panel value="Jobs">
            <JobComp jobList={jobList} />
          </Tabs.Panel>
          <Tabs.Panel value="Employees">
            <EmployeesComp />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default Company;
