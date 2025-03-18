import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommandTalent from "../TalentProfile/RecommandTalent";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/ProfileService";

const TalentProfilePage = () => {
  const navigate = useNavigate();
  const [talents, setTalents] = useState<any>([]);
  useEffect(() => {
    const getAllProfile = async () => {
      try {
        const response = await getAllProfiles();
        setTalents(response);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProfile();
  }, []);
  return (
    <div className="min-h-[100vh] bg-[#2d2d2d] font-['poppins'] overflow-auto [&::-webkit-scrollbar]:hidden px-4">
      <Divider size="sm" mx={"xs"} className="px-4" />
      <Button
        className="mx-2 my-4"
        onClick={() => navigate(-1)}
        leftSection={<IconArrowLeft size={20} />}
        color="brightSun.4"
        variant="light"
      >
        Back
      </Button>
      {/* <Divider size="sm" /> */}
      <div className="flex gap-10">
        <Profile {...profile} />
        <RecommandTalent talents={talents} />
      </div>
    </div>
  );
};

export default TalentProfilePage;
