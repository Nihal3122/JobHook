import Banner from "../assets/banner.jpg";
import avatar from "../assets/avatar.png";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import { Button, Divider } from "@mantine/core";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/ProfileService";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>({});
  console.log(profile);
  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile(id)
      .then((res) => {
        setProfile(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <div className="w-2/3">
      <div className="relative">
        <img className="rounded-t-2xl" src={Banner} alt="BannerImg" />
        <img
          className="rounded-full w-48 h-48 absolute -bottom-1/3 left-3 border-8 border-[#2d2d2d]"
          src={
            profile?.picture
              ? `data:image/jpeg;base64,${profile.picture}`
              : avatar
          }
          alt="BannerImg"
        />
      </div>
      <div className="px-3 mt-20">
        <div className="text-3xl font-semibold flex justify-between">
          {profile.name}
          <Button color="brightSun.4" variant="light">
            Message
          </Button>
        </div>
        <div className="text-xl flex gap-1 items-center">
          <IconBriefcase stroke={1.5} className="w-5 h-5" /> {profile.jobTitle}
          &bull; {profile.company}
        </div>
        <div className="flex gap-2 text-lg text-[#888888] items-center">
          <IconMapPin stroke={1.5} className="w-5 h-5" /> {profile.location}
        </div>
        <div className="flex gap-2 text-lg text-[#888888] items-center">
          <IconBriefcase stroke={1.5} className="w-5 h-5" /> Experience : 
          {profile.totalExp ? profile.totalExp : "1"} Years
        </div>
      </div>
      <Divider my={"xl"} color="mineShaft.7" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">About</div>
        <div className="text-[16px] text-[#b0b0b0] text-justify">
          {profile.about}
        </div>
      </div>
      <Divider my={"xl"} color="mineShaft.7" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">Skills</div>
        <div className="flex flex-wrap gap-y-3 gap-x-2 pt-1">
          {profile?.skills?.map((skill: any, index: any) => (
            <div
              key={index}
              className="text-[#d7b75e] font-semibold bg-[#4d3d30] rounded-full px-2 py-1 items-center flex justify-center"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      <Divider my={"xl"} color="mineShaft.7" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">Experience</div>
        <div className="flex flex-col gap-8">
          {profile.experiences?.map((exp: any, index: any) => (
            <ExpCard {...exp} key={index} />
          ))}
        </div>
      </div>
      <Divider my={"xl"} color="mineShaft.7" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">Certifications</div>
        <div className="flex flex-col gap-8">
          {profile.certifications?.map((certi: any, index: any) => (
            <CertiCard {...certi} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
