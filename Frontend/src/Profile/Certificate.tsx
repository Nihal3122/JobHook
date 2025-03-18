import {
  IconDeviceFloppy,
  IconPencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";
import { ActionIcon } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";

const Certificate = () => {
  const [addCerti, setAddCerti] = useState(false);

  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);

  const handleEditToggle = () => {
    setEdit((prev: any) => !prev);
  };

  return (
    <>
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Certifications
          <div className="flex gap-2">
            <ActionIcon
              onClick={() => setAddCerti(true)}
              variant="subtle"
              size="xl"
              radius="lg"
              color="brightSun.4"
            >
              <IconPlus className="h-4/5 w-4/5 p-1" />
            </ActionIcon>
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
        <div className="flex flex-col gap-8">
          {profile?.certifications?.map((certi: any, index: any) => (
            <CertiCard index={index} {...certi} key={index} edit={edit} />
          ))}
          {addCerti && <CertiInput setEdit={setAddCerti} />}
        </div>
      </div>
    </>
  );
};

export default Certificate;
