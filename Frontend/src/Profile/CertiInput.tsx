import { Button, TextInput } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const CertiInput = (props: any) => {
  const select = fields;
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: props.name || "",
      issuer: props.issuer || "",
      certificateId: props.certificateId || "",
      issueDate: props.issueDate ? new Date(props.issueDate) : new Date(),
    },
    validate: {
      name: isNotEmpty("Name is required"),
      issuer: isNotEmpty("Issuer is required"),
      certificateId: isNotEmpty("CertificateId is required"),
      issueDate: isNotEmpty("IssueDate is required"),
    },
  });
  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;

    let certi = [...profile.certifications];
    const newCerti = form.getValues();

    newCerti.issueDate = newCerti.issueDate
      ? new Date(newCerti.issueDate)
      : new Date();

    certi.push(newCerti);

    props.setEdit(false);
    dispatch(changeProfile({ ...profile, certifications: certi }));
    successNotification("Success", `Certificate Added Successfully`);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold ">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput
          label="Title"
          placeholder="Enter title"
          withAsterisk
          {...form.getInputProps("name")}
        />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          label="Issue Date"
          placeholder="Pick Date"
          maxDate={new Date()}
          withAsterisk
          {...form.getInputProps("issueDate")}
        />
        <TextInput
          label="Certificate Id"
          placeholder="Enter Certificate Id"
          withAsterisk
          {...form.getInputProps("certificateId")}
        />
      </div>
      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.4" variant="light">
          Save
        </Button>
        <Button
          onClick={() => props.setEdit(false)}
          color="red.8"
          variant="light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CertiInput;
