import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import {
  IconCalendarWeekFilled,
  IconHeart,
  IconMapPin,
} from "@tabler/icons-react";
import avatar from "../assets/avatar.png";
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { DateInput, TimeInput } from "@mantine/dates";
import { getProfile } from "../Services/ProfileService";
import { changeAppStatus } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { formatInterviewTime, openResumeInNewTab } from "../Services/Utilities";

const TalentCard = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const { id } = useParams();
  const [date, setDate] = useState<Date | null>(null);

  const [time, setTime] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    if (props.applicantId) {
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setProfile(props);
    }
  }, [props, id]);

  const handleOffer = (status: string) => {
    let interview: any = {
      id,
      applicantId: profile?.id,
      applicationStatus: status,
    };
    if (status == "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours, minutes);
      interview = { ...interview, interviewTime: date };
    }

    changeAppStatus(interview)
      .then(() => {
        if (status === "INTERVIEWING") {
          successNotification(
            "Interview Scheduled",
            "Interview Scheduled Successfully"
          );
        } else if (status === "OFFERED") {
          successNotification(
            "Offered",
            "Candidate has been offered the position."
          );
        } else if (status === "REJECTED") {
          successNotification(
            "Application Rejected",
            "Candidate has been rejected."
          );
        }

        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        errorNotification(
          "Error",
          error.response?.data?.errorMessageF || "Something went wrong"
        );
      });
  };

  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="bg-[#3d3d3d] px-6 py-3 w-[350px] flex flex-col gap-4 rounded-lg hover:shadow-[0_0_5px_1px_yellow] !shadow-[#ffbd20] cursor-pointer  transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="p-3 bg-[#454545] rounded-full">
            <Avatar
              size={"lg"}
              src={
                profile?.picture
                  ? `data:image/jpeg;base64,${profile?.picture}`
                  : avatar
              }
              alt="Company Logo"
            />
          </div>
          <div>
            <div className="font-semibold text-lg text-white">{props.name}</div>
            <div className="text-sm text-[#b0b0b0]">
              {profile?.jobTitle} • {profile?.company}
            </div>
          </div>
        </div>
        <IconHeart className="text-[#b0b0b0] cursor-pointer w-6 h-6 transition-all duration-300 " />
      </div>

      {/* Job Badges */}
      <div className="flex gap-1.5">
        {profile?.skills?.map(
          (skill: any, index: any) =>
            index < 3 && (
              <div
                key={index}
                className="py-1.5 px-3 bg-[#454545] text-[#ffbd20] rounded-lg text-sm"
              >
                {skill}
              </div>
            )
        )}
      </div>

      {/* Job Description */}
      <Text
        className="text-justify text-[#b0b0b0] text-sm leading-relaxed"
        size="sm"
        lineClamp={3}
      >
        {profile.about}
      </Text>
      <Divider size="xs" mx={"md"} color="mineShaft.7" />
      {props.invited ? (
        <div className="flex gap-1 text-[#d1d1d1] text-sm items-center">
          <IconCalendarWeekFilled stroke={1.5} /> Interview :{" "}
          {formatInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="font-semibold text-xl text-[#d1d1d1]">
            Exp: {props.totalExp ? props.totalExp : 1} Years
          </div>
          <div className="flex gap-2 text-sm text-[#888888] items-center">
            <IconMapPin stroke={1.5} className="w-5 h-5" /> {profile.location}
          </div>
        </div>
      )}
      {/* Footer */}

      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${profile.id}`}>
              <Button color="brightSun.4" variant="outline" fullWidth>
                Profile
              </Button>
            </Link>
            <div>
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={<IconCalendarWeekFilled className="w-5 h-5" />}
                  color="brightSun.4"
                  variant="light"
                  fullWidth
                >
                  Schedule
                </Button>
              ) : (
                <Button color="brightSun.4" variant="light" fullWidth>
                  Message
                </Button>
              )}
            </div>
          </>
        )}
        {props.invited && (
          <>
            <div>
              <Button
                onClick={() => handleOffer("OFFERED")}
                color="brightSun.4"
                variant="outline"
                fullWidth
              >
                Accept
              </Button>
            </div>
            <div>
              <Button
                onClick={() => handleOffer("REJECTED")}
                color="brightSun.4"
                variant="light"
                fullWidth
              >
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
      {(props.invited || props.posted) && (
        <Button
          onClick={openApp}
          color="brightSun.4"
          variant="filled"
          fullWidth
          autoContrast
        >
          View Application
        </Button>
      )}
      <Modal
        opened={opened}
        onClose={close}
        title="Schedule Interview"
        centered
      >
        <div className="flex flex-col gap-4">
          <DateInput
            value={date}
            onChange={setDate}
            label="Date"
            minDate={new Date()}
            placeholder="Enter date"
          />
          <TimeInput
            label="Time"
            value={time}
            onChange={(e) => setTime(e.currentTarget.value)}
            ref={ref}
            description="Input description"
            onClick={() => ref.current?.showPicker()}
          />
          <Button
            onClick={() => handleOffer("INTERVIEWING")}
            color="brightSun.4"
            variant="light"
            fullWidth
          >
            Schedule
          </Button>
        </div>
      </Modal>
      <Modal opened={app} onClose={closeApp} title="Application" centered>
        <div className="flex flex-col gap-4">
          <div>
            Email : &emsp;{" "}
            <a
              className="text-[#ffbd20] hover:underline cursor-pointer text-center"
              href={`mailto:${props?.email}`}
            >
              {props?.email}
            </a>
          </div>
          <div>
            Website : &emsp;{" "}
            <a
              target="_blank"
              className="text-[#ffbd20] hover:underline cursor-pointer text-center"
              href={`${props?.website}`}
            >
              {props?.website}
            </a>
          </div>
          <div>
            Resume : &emsp;{" "}
            <span
              onClick={() => openResumeInNewTab(props?.resume)}
              className="text-[#ffbd20] hover:underline cursor-pointer text-center"
            >
              {props.name}
            </span>
          </div>
          <div>
            CoverLetter : &emsp; <div>{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
