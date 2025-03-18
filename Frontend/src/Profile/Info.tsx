import { ActionIcon, NumberInput } from "@mantine/core";
import fields from "../Data/Profile";
import {
  IconBriefcase,
  IconCheck,
  IconMapPin,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const Info = () => {
  const select = fields;
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      jobTitle: "",
      company: "",
      location: "",
      totalExp: 1,
    },
  });

  const handleEditToggle = () => {
    setEdit((prev: any) => !prev);
    if (!edit) {
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
        totalExp: profile.totalExp,
      });
    }
  };

  const handleSave = () => {
    setEdit(false);
    const updatedProfile = { ...profile, ...form.getValues() };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile Updated Successfully");
  };

  return (
    <div className="space-y-4">
      <div className="text-3xl font-semibold flex justify-between items-center">
        <span>{user?.name}</span>
        <div className="flex gap-2">
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
        <div className="space-y-4">
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="location" {...select[2]} />
            <NumberInput
              hideControls
              min={1}
              max={50}
              clampBehavior="strict"
              withAsterisk
              label="Total Experience"
              {...form.getInputProps("totalExp")}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-xl flex gap-1 items-center">
            <IconBriefcase stroke={1.5} className="w-5 h-5" />
            {profile?.jobTitle} &bull; {profile?.company}
          </div>
          <div className="flex gap-2 text-lg  items-center">
            <IconMapPin stroke={1.5} className="w-5 h-5" /> {profile?.location}
          </div>
          <div className="flex gap-2 text-lg  items-center">
            <IconBriefcase stroke={1.5} className="w-5 h-5" />
            Experience : {profile?.totalExp} Years
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
