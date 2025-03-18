import { Badge, Tabs } from "@mantine/core";
import JobDetails from "../JobDetails/JobDetails";
import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";

const PostedJobDesc = (props: any) => {
  const [tab, setTabs] = useState("overview");
  const [arr, setArr] = useState<any>([]);
  const handleTabChange = (value: any) => {
    setTabs(value);
    if (value === "applicants") {
      setArr(
        props.applicants?.filter(
          (applicant: any) => applicant.applicationStatus == "APPLIED"
        )
      );
    } else if (value === "invited") {
      setArr(
        props.applicants?.filter(
          (applicant: any) => applicant.applicationStatus == "INVITED"
        )
      );
    } else if (value === "offered") {
      setArr(
        props.applicants?.filter(
          (applicant: any) => applicant.applicationStatus == "OFFERED"
        )
      );
    } else if (value === "rejected") {
      setArr(
        props.applicants?.filter(
          (applicant: any) => applicant.applicationStatus == "REJECTED"
        )
      );
    }
  };

  useEffect(() => {
    handleTabChange("overview");
  }, [props]);

  return (
    <div className="mt-5 w-3/4 px-28">
      {props.jobTitle ? (
        <>
          <div className="text-2xl font-semibold flex items-center">
            {props.jobTitle}
            <Badge variant="light" ml={"sm"} size="md" color="brightSun.4">
              {props.jobStatus}
            </Badge>
          </div>
          <div className="font-medium text-[#b0b0b0] mb-5">
            {props.location ? props.location : ""}
          </div>
          <div>
            <Tabs
              variant="outline"
              radius={"lg"}
              value={tab}
              onChange={handleTabChange}
            >
              <Tabs.List className="[&_button]:!text-[18px] mb-5 font-semibold [&_button[data-active='true']]:!text-[#ffbd20] ">
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                <Tabs.Tab value="invited">Invited</Tabs.Tab>
                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview" className="[&>div]:!w-full">
                {props.jobStatus == "CLOSE" ? (
                  <JobDetails edit {...props} closed />
                ) : (
                  <JobDetails edit {...props} />
                )}
              </Tabs.Panel>
              <Tabs.Panel value="applicants">
                <div className="mt-10 flex flex-wrap gap-y-10 gap-5 justify-around">
                  {arr?.length ? (
                    arr.map((applicant: any, index: any) => (
                      <TalentCard key={index} {...applicant} posted />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold">No Applicants</div>
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="invited">
                <div className="mt-10 flex flex-wrap gap-y-10 gap-5 justify-around">
                  {props?.applicants?.filter(
                    (applicant: any) =>
                      applicant.applicationStatus == "INTERVIEWING"
                  ).length ? (
                    props?.applicants
                      ?.filter(
                        (applicant: any) =>
                          applicant.applicationStatus == "INTERVIEWING"
                      )
                      .map((talent: any, index: any) => (
                        <TalentCard key={index} {...talent} invited />
                      ))
                  ) : (
                    <div className="text-2xl font-semibold">
                      No Invited Applicants
                    </div>
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="offered">
                <div className="mt-10 flex flex-wrap gap-y-10 gap-5 justify-around">
                  {props?.applicants?.filter(
                    (applicant: any) => applicant.applicationStatus == "OFFERED"
                  ).length ? (
                    props?.applicants
                      ?.filter(
                        (applicant: any) =>
                          applicant.applicationStatus == "OFFERED"
                      )
                      .map((talent: any, index: any) => (
                        <TalentCard key={index} {...talent} offered />
                      ))
                  ) : (
                    <div className="text-2xl font-semibold">
                      No Offered Applicants
                    </div>
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="rejected">
                <div className="mt-10 flex flex-wrap gap-y-10 gap-5 justify-around">
                  {props?.applicants?.filter(
                    (applicant: any) =>
                      applicant.applicationStatus == "REJECTED"
                  ).length ? (
                    props?.applicants
                      ?.filter(
                        (applicant: any) =>
                          applicant.applicationStatus == "REJECTED"
                      )
                      .map((talent: any, index: any) => (
                        <TalentCard key={index} {...talent} rejected />
                      ))
                  ) : (
                    <div className="text-2xl font-semibold">
                      No Rejected Applicants
                    </div>
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
      ) : (
        <div className="text-2xl font-semibold min-h-[70vh] flex items-center justify-center">
          No Job Found
        </div>
      )}
    </div>
  );
};

export default PostedJobDesc;
