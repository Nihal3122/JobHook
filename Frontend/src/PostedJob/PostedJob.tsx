import { Tabs } from "@mantine/core";
import PostedJobCard from "./PostedJobCard";
import { useEffect, useState } from "react";

const PostedJob = (props: any) => {
  const [activeTab, setActiveTab] = useState<string | null>("ACTIVE");

  useEffect(() => {
    setActiveTab(props?.job?.jobStatus || "ACTIVE");
  }, [props.job]);

  return (
    <div className="w-1/6 mt-5">
      <div className="text-[27px] font-semibold mb-5 pb-4">Jobs</div>
      <div>
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          autoContrast
          variant="pills"
          defaultValue="ACTIVE"
        >
          <Tabs.List className="[&>button[aria-selected=false]]:bg-[#3d3d3d] font-medium">
            <Tabs.Tab value="ACTIVE">
              Active [
              {
                props?.jobList?.filter((job: any) => job?.jobStatus == "ACTIVE")
                  .length
              }
              ]
            </Tabs.Tab>
            <Tabs.Tab value="DRAFT">
              Draft [
              {
                props?.jobList?.filter((job: any) => job?.jobStatus == "DRAFT")
                  .length
              }
              ]
            </Tabs.Tab>
            <Tabs.Tab value="CLOSE">
              Close [
              {
                props?.jobList?.filter((job: any) => job?.jobStatus == "CLOSE")
                  .length
              }
              ]
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <div className="flex flex-col gap-4 mt-5">
          {props?.jobList
            ?.filter((job: any) => job?.jobStatus == activeTab)
            .map((job: any, index: any) => (
              <PostedJobCard key={index} {...job} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostedJob;
