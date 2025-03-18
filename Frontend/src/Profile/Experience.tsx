import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";
import { useState } from "react";
import { useSelector } from "react-redux";

const Experience = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [addExp, setAddExp] = useState(false);
  
  const handleEditToggle = () => {
    setEdit((prev: any) => !prev);
  };

  return (
    <>
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Experience
          <div className="flex gap-2">
            <ActionIcon
              onClick={() => setAddExp(true)}
              variant="subtle"
              size="xl"
              radius="lg"
              color="brightSun.4"
            >
              <IconPlus className="h-4/5 w-4/5 p-1" />
            </ActionIcon>
            <ActionIcon
              onClick={() => handleEditToggle()}
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
        <div className="flex flex-col gap-8">
          {profile?.experiences?.map((exp: any, index: any) => (
            <ExpCard {...exp} key={index} index={index} edit={edit} />
          ))}
          {addExp && <ExpInput add setEdit={setAddExp} />}
        </div>
      </div>
    </>
  );
};

export default Experience;
