import { Button, Divider, Text } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconClock,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";

const JobCard = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const handleSaveJob = () => {
    const saveJobs = profile?.saveJobs?.includes(props.id)
      ? profile.saveJobs.filter((id: any) => id !== props.id)
      : [...(profile?.saveJobs || []), props.id];

    const updatedProfile = { ...profile, saveJobs };

    dispatch(changeProfile(updatedProfile));
  };

  return (
    <div className="bg-[#3d3d3d] p-6 w-[350px] flex flex-col gap-4 rounded-lg hover:shadow-[0_0_5px_1px_yellow] !shadow-[#ffbd20] cursor-pointer  transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="p-3 bg-[#454545] rounded-lg">
            <img
              className="h-9"
              src={`/Icons/${props.company}.png`}
              alt="Company Logo"
            />
          </div>
          <div>
            <div className="font-semibold text-lg text-white">
              {props.jobTitle}
            </div>
            <div className="text-sm text-[#b0b0b0]">
              {props.company} • {props.applicants ? props.applicants.length : 0}{" "}
              Applicants
            </div>
          </div>
        </div>
        {profile?.saveJobs?.includes(props.id) ? (
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

      {/* Job Badges */}
      <div className="flex gap-1">
        <div className="py-1.5 px-2 bg-[#454545] text-[#ffbd20] rounded-lg text-sm">
          {props.experience}
        </div>
        <div className="py-1.5 px-2 bg-[#454545] text-[#ffbd20] rounded-lg text-sm">
          {props.jobType}
        </div>
        <div className="py-1.5 px-2 bg-[#454545] text-[#ffbd20] rounded-lg text-sm">
          {props.location}
        </div>
      </div>

      {/* Job Description */}
      <Text
        className="text-justify text-[#b0b0b0] text-sm leading-relaxed"
        size="sm"
        lineClamp={3}
      >
        {props.about}
      </Text>

      <Divider size="xs" mx={"md"} color="mineShaft.7" />

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="font-semibold text-xl text-[#d1d1d1]">
          &#8377; {props.packageOffered} LPA
        </div>
        <div className="flex gap-2 text-sm text-[#888888] items-center">
          <IconClock stroke={1.5} className="w-5 h-5" /> Posted{" "}
          {timeAgo(props?.postTime)}
        </div>
      </div>
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="brightSun.4" variant="outline">
          View Job
        </Button>
      </Link>
    </div>
  );
};

export default JobCard;
