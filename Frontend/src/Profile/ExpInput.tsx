import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { useEffect } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const ExpInput = ({ add, setEdit, index, ...props }: any) => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: props.title || "",
      company: props.company || "",
      location: props.location || "",
      description: props.description || "",
      startDate: props.startDate ? new Date(props.startDate) : new Date(),
      endDate: props.endDate ? new Date(props.endDate) : new Date(),
      working: props.working || false,
    },
    validate: {
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is required"),
      description: isNotEmpty("Description is required"),
    },
  });

  useEffect(() => {
    if (!add && props.title && form.values.title === "") {
      form.setValues({
        title: props.title,
        description: props.description,
        company: props.company,
        location: props.location,
        startDate: new Date(props.startDate),
        endDate: new Date(props.endDate),
        working: props.working,
      });
    }
  }, [add, props.title]);

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;

    const updatedExperiences = [...profile.experiences];
    if (add) {
      updatedExperiences.push(form.values);
    } else {
      updatedExperiences[index] = form.values;
    }

    dispatch(changeProfile({ ...profile, experiences: updatedExperiences }));
    successNotification(
      "Success",
      `Experience ${add ? "Added" : "Updated"} Successfully`
    );
    setEdit(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">
        {add ? "Add" : "Edit"} Experience
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...fields[0]} />
        <SelectInput form={form} name="company" {...fields[1]} />
      </div>
      <SelectInput form={form} name="location" {...fields[2]} />
      <Textarea
        label="Summary"
        {...form.getInputProps("description")}
        autosize
        withAsterisk
        minRows={3}
        placeholder="Enter summary"
      />
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          label="Start Date"
          placeholder="Pick Date"
          {...form.getInputProps("startDate")}
          maxDate={form.values.endDate || undefined}
          withAsterisk
        />
        <MonthPickerInput
          label="End Date"
          withAsterisk
          placeholder="End Date"
          minDate={form.values.startDate || undefined}
          {...form.getInputProps("endDate")}
          maxDate={new Date()}
          disabled={form.values.working}
        />
      </div>
      <Checkbox
        checked={form.values.working}
        onChange={(e) => form.setFieldValue("working", e.currentTarget.checked)}
        label="Currently working here"
      />
      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.4" variant="light">
          Save
        </Button>
        <Button onClick={() => setEdit(false)} color="red.8" variant="light">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ExpInput;
