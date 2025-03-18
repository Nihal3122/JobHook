import { Divider } from "@mantine/core";
import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../Services/Utilities";

const ApplyJobComp = (props: any) => {
  return (
    <>
      <div className="w-2/3 mx-auto mb-10">
        <div className="flex justify-between items-center pb-8">
          <div className="flex gap-3 items-center">
            <div className="p-2 bg-[#454545] rounded-lg">
              <img
                className="h-20"
                src={`/Icons/${props.company}.png`}
                alt="Company Logo"
              />
            </div>
            <div>
              <div className="font-semibold text-2xl text-white">
                {props.jobTitle}
              </div>
              <div className="text-xl text-[#b0b0b0]">
                {props.company} • {timeAgo(props.postTime)} •{" "}
                {props.applicants ? props.applicants.length : 0} Applicants
              </div>
            </div>
          </div>
        </div>
        <Divider size="sm" my={"md"} className="px-4" />
        <ApplicationForm />
      </div>
    </>
  );
};

export default ApplyJobComp;
