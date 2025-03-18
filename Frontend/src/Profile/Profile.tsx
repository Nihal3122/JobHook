import Banner from "../assets/banner.jpg";
import avatar from "../assets/avatar.png";
import { Divider, FileInput, Overlay } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { successNotification } from "../Services/NotificationService";
import { getBase64 } from "../Services/Utilities";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);

  const { hovered, ref } = useHover();

  const handleFileChange = async (image: File | null) => {
    if (!image) {
      console.error("No file selected!");
      return;
    }

    try {
      const base64 = await getBase64(image);
      if (!base64) {
        console.error("Base64 conversion failed!");
        return;
      }

      const updateProfile = {
        ...profile,
        picture: base64.split(",")[1],
        name: user.name,
      };
      dispatch(changeProfile(updateProfile));
      successNotification("Success", "Profile Updated Successfully");
    } catch (error) {
      console.error("Error converting to Base64:", error);
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl w-full" src={Banner} alt="Banner Image" />

        <div
          ref={ref}
          className="absolute flex items-center justify-center -bottom-1/3 left-3"
        >
          {hovered && (
            <Overlay
              color="#000"
              backgroundOpacity={0.75}
              className="absolute inset-0 !rounded-full"
            />
          )}
          {hovered && <IconEdit className="absolute z-[300] !w-14 !h-14" />}

          <img
            className="rounded-full w-48 h-48 border-8 border-[#2d2d2d] relative object-cover"
            src={
              profile?.picture
                ? `data:image/jpeg;base64,${profile.picture}`
                : avatar
            }
            alt="Profile"
          />

          {hovered && (
            <FileInput
              onChange={handleFileChange}
              className="absolute w-full z-[301]  [&_*]:!rounded-full [&_*]:!h-full !h-full"
              variant="transparent"
              size="lg"
              radius={"xl"}
              accept="image/png,image/jpeg"
            />
          )}
        </div>
      </div>

      <div className="px-3 mt-20">
        <Info />
      </div>

      <Divider my={"xl"} color="mineShaft.7" />
      <About />
      <Divider my={"xl"} color="mineShaft.7" />
      <Skills />
      <Divider my={"xl"} color="mineShaft.7" />
      <Experience />
      <Divider my={"xl"} color="mineShaft.7" />
      <Certificate />
    </div>
  );
};

export default Profile;
