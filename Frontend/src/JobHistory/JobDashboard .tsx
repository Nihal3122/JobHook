import { Tabs } from "@mantine/core";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { useSelector } from "react-redux";

const JobDashboard = () => {
  const [activeTab, setActiveTab] = useState<any>("APPLIED");
  const [jobList, setjobList] = useState<any>([]);
  const [showList, setShowList] = useState<any>([]);
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  console.log(jobList);

  useEffect(() => {
    getAllJobs()
      .then((res: any) => {
        setjobList(res.data);
        setShowList(
          res.data?.filter((job: any) => {
            let found = false;
            job?.applicants?.forEach((applicant: any) => {
              if (
                applicant.applicantId == user.id &&
                applicant.applicationStatus == "APPLIED"
              ) {
                found = true;
              }
            });
            return found;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTabChange = (value: string | null) => {
    setActiveTab(value);
    if (value === "SAVED") {
      setShowList(
        jobList.filter((job: any) => profile?.saveJobs?.includes(job?.id))
      );
    } else {
      setShowList(
        jobList?.filter((job: any) => {
          let found = false;
          job?.applicants?.forEach((applicant: any) => {
            if (
              applicant?.applicantId == user?.id &&
              applicant?.applicationStatus == value
            ) {
              found = true;
            }
          });
          return found;
        })
      );
    }
  };
  return (
    <div>
      <div className="text-[27px] font-semibold mb-5 pb-4">Job Dashboard</div>
      <div>
        <Tabs
          variant="outline"
          radius={"lg"}
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tabs.List className="[&_button]:!text-[18px] mb-5 font-semibold [&_button[data-active='true']]:!text-[#ffbd20] ">
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            <div className="mt-10  flex flex-wrap gap-5 pl-4">
              {showList?.map((job: any, index: any) => (
                <Card
                  key={index}
                  {...job}
                  {...{ [activeTab.toLowerCase()]: true }}
                />
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default JobDashboard;
