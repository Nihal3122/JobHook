import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Skills = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [skills, setSkills] = useState<string[]>(profile?.skills || []);
  const dispatch = useDispatch();

  const handleEditToggle = () => {
    setEdit((prev) => !prev);
    if (!edit) {
      setSkills(profile?.skills || []); 
    }
  };
  
  const handleSave = () => {
    setEdit(false);
    const updatedProfile = { ...profile, skills };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Skills Updated Successfully");
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Skills
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
        <TagsInput
          value={skills}
          onChange={setSkills}
          placeholder="Add skills"
          splitChars={[",", " ", "|"]}
        />
      ) : (
        <div className="flex flex-wrap gap-y-3 gap-x-2 pt-1">
          {profile?.skills?.map((skill: string, index: number) => (
            <div
              key={index}
              className="text-[#d7b75e] font-semibold bg-[#4d3d30] rounded-full px-2 py-1 flex items-center justify-center"
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;
