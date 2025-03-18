import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card } from "../Data/JobDescData";
// @ts-ignore
import DOMPurify from "dompurify";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";

const JobDetails = (props: any) => {
  const dispatch = useDispatch();
  const data = DOMPurify.sanitize(props.description);
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const [apply, setApplied] = useState(false);

  const handleSaveJob = () => {
    const saveJobs = profile?.saveJobs?.includes(props.id)
      ? profile.saveJobs.filter((id: any) => id !== props.id)
      : [...(profile?.saveJobs || []), props.id];

    const updatedProfile = { ...profile, saveJobs };

    dispatch(changeProfile(updatedProfile));
  };

  useEffect(() => {
    if (
      props.applicants?.filter(
        (applicant: any) => applicant?.applicantId == user?.id
      ).length > 0
    ) {
      setApplied(true);
    } else {
      setApplied(false);
    }
  }, [props]);

  const handleClose = () => {
    postJob({ ...props, jobStatus: "CLOSE" })
      .then(() => {
        successNotification("Success", "Job Closed Successfully");
      })
      .catch((error) => {
        console.log(error);
        errorNotification("Error", error.response.data.errorMessage);
      });
  };

  return (
    <div className="w-2/3">
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
              {props.applicants?.length || 0} Applicants
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          {(props.edit || !apply) && (
            <Link
              to={
                props.edit ? `/post-job/${props.id}` : `/apply-job/${props.id}`
              }
            >
              <Button color="brightSun.4" size="md" variant="light">
                {props.closed ? "Reopen" : props.edit ? "Edit" : "Apply"}
              </Button>
            </Link>
          )}
          {!props.edit && apply && (
            <Button color="green.8" size="md" variant="light">
              Applied
            </Button>
          )}
          {props.edit && !props.closed ? (
            <Button
              onClick={handleClose}
              color="brightSun.5"
              size="md"
              variant="outline"
            >
              Close
            </Button>
          ) : profile?.saveJobs?.includes(props.id) ? (
            <IconBookmarkFilled
              onClick={handleSaveJob}
              className="text-[#ffbd20] cursor-pointer w-6 h-6 hover:text-[#ffbd20]"
            />
          ) : (
            <IconBookmark
              onClick={handleSaveJob}
              className="text-[#b0b0b0] cursor-pointer w-6 h-6 hover:text-[#ffbd20]"
            />
          )}
        </div>
      </div>
      <Divider size="sm" className="" />
      <div className="flex pt-5 pb-5 justify-between">
        {card.map((item: any, index: any) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <ActionIcon
              className="!h-12 !w-12"
              color="brightSun.4"
              variant="light"
              size="lg"
              radius="xl"
              aria-label="Settings"
            >
              <item.icon stroke={1.5} className="h-4/5 w-4/5" />
            </ActionIcon>
            <div className="text-[#b0b0b0] text-[16px]">{item.name}</div>
            <div className="text-[#b0b0b0] font-semibold">
              {props ? props[item.id] : "NA"}
              {item.id == "packageOffered" && <> LPA</>}
            </div>
          </div>
        ))}
      </div>
      <Divider size="sm" className="pb-4" />
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2">
          {props?.skillsRequired?.map((skill: any, index: any) => (
            <div key={index} className="flex">
              <ActionIcon
                className="!h-fit !w-fit !text-[16px] font-medium"
                color="brightSun.4"
                variant="light"
                size="lg"
                radius="xl"
                aria-label="Settings"
                p={"md"}
              >
                {skill}
              </ActionIcon>
            </div>
          ))}
        </div>
      </div>
      <Divider size="sm" className="mt-7" />
      <div className="pt-4 flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Description</h1>
        <div
          className="[&_h4]:text-xl [&_*]:text-[#b0b0b0] [&_li]:marker:text-[#ffbd20] [&_h4]:my-4 [&_h4]:font-semibold [&_li]:mb-1 text-[#d1d1d1] [&_p]:text-justify"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </div>
      <Divider size="sm" className="mt-7" />
      <div className="mt-10">
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div className="flex justify-between items-center pb-8 mb-1">
          <div className="flex gap-3 items-center">
            <div className="p-2 bg-[#454545] rounded-lg">
              <img
                className="h-10"
                src={`/Icons/${props.company}.png`}
                alt="Company Logo"
              />
            </div>
            <div>
              <div className="font-semibold text-xl text-white">
                {props.company}
              </div>
              <div className="text-lg text-[#b0b0b0]">10k+ Employee</div>
            </div>
          </div>
          <Link to={`/company/${props.company}`}>
            <Button color="brightSun.4" size="md" variant="light">
              Company Page
            </Button>
          </Link>
        </div>
        <div className="text-[#b0b0b0] text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ea
          dolores ab consectetur a in ullam voluptatem quo libero. Voluptatem
          maxime nemo, voluptas numquam dolor neque aliquam placeat quo non,
          quidem consectetur. Natus omnis repudiandae ipsam accusantium
          recusandae error molestiae.
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
