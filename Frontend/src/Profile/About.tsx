import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const About = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState(profile.about);
  const dispatch = useDispatch();

  const handleEditToggle = () => {
    setEdit((prev: any) => !prev);
    if (!edit) {
      setAbout(profile.about);
    }
  };

  const handleSave = () => {
    setEdit(false);
    const updatedProfile = { ...profile, about };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "About Updated Successfully");
  };
  return (
    <>
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          About
          <div>
            {edit && (
              <ActionIcon
                onClick={handleSave}
                variant="subtle"
                size="xl"
                radius="lg"
                color="green.8"
              >
                <IconCheck className="h-4/5 w-4/5 p-1" />
              </ActionIcon>
            )}
            <ActionIcon
              onClick={handleEditToggle}
              variant="subtle"
              size="xl"
              radius="lg"
              color={edit ? "red.8" : "brightSun.4"}
            >
              {edit ? (
                <IconX className="h-4/5 w-4/5 p-1" />
              ) : (
                <IconPencil className="h-4/5 w-4/5 p-1" />
              )}
            </ActionIcon>
          </div>
        </div>
        {edit ? (
          <Textarea
            value={about}
            onChange={(event) => setAbout(event.currentTarget.value)}
            autosize={true}
            minRows={3}
            placeholder="Enter about your self"
          />
        ) : (
          <div className="text-[16px] text-[#b0b0b0] text-justify">
            {profile?.about}
          </div>
        )}
      </div>
    </>
  );
};

export default About;
