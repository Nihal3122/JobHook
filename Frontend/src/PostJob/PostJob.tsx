import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getSingleJobs, postJob } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJob = () => {
  const { id } = useParams();
  const [editorData, setEditorData] = useState(content);
  const select = fields;
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id !== "0") {
      getSingleJobs(id)
        .then((res: any) => {
          form.setValues(res.data);
          setEditorData(res.data.description);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      form.reset();
      setEditorData(content);
    }
  }, [id]);
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      about: "",
      jobType: "",
      location: "",
      packageOffered: "",
      skillsRequired: [],
      description: content,
    },
    validate: {
      jobTitle: isNotEmpty("JobTitle is required"),
      company: isNotEmpty("comapany is required"),
      experience: isNotEmpty("experience is required"),
      about: isNotEmpty("about is required"),
      jobType: isNotEmpty("jobType is required"),
      location: isNotEmpty("location is required"),
      packageOffered: isNotEmpty("packageOffered is required"),
      skillsRequired: isNotEmpty("skillsRequired is required"),
      description: isNotEmpty("description is required"),
    },
  });

  const handleJob = async () => {
    form.validate();
    if (!form.isValid()) {
      return;
    }
    try {
      console.log("Form validate Successfully");
      const response: any = await postJob({
        ...form.getValues(),
        postedBy: user?.id,
        id,
        jobStatus: "ACTIVE",
      });
      successNotification("Success", "Job Posted Successfully");
      navigate(`/posted-job/${response?.data?.id}`);
    } catch (error) {
      console.log(error);
      errorNotification("Error", "Error Occured While Post Job");
    }
  };

  const handleDraft = async () => {
    try {
      const response: any = await postJob({
        ...form.getValues(),
        postedBy: user?.id,
        id,
        jobStatus: "DRAFT",
      });
      console.log(response);
      successNotification("Success", "Job Drafted Successfully");
      navigate(`/posted-job/${response?.data?.id}`);
    } catch (error) {
      console.log(error);
      errorNotification("Error", "Error Occured While Post Job");
    }
  };

  return (
    <div className="w-4/5 mx-auto pt-10 pb-3">
      <div className="text-[27px] font-semibold mb-5 text-center pb-4">
        {id == "0" ? "Post" : "Edit"} a Job
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="jobTitle" {...select[0]} />
          <SelectInput form={form} name="company" {...select[1]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="experience" {...select[2]} />
          <SelectInput form={form} name="jobType" {...select[3]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="location" {...select[4]} />
          <NumberInput
            label="Salary"
            {...form.getInputProps("packageOffered")}
            placeholder="Enter salary"
            hideControls
            withAsterisk
            min={1}
            max={300}
            clampBehavior="strict"
            styles={{
              input: {
                height: "50px",
                fontSize: "18px",
                padding: "12px",
                borderRadius: "5px",
                marginTop: "10px",
              },
              label: {
                fontSize: "16px",
                fontWeight: "bold",
              },
            }}
          />
        </div>
        <TagsInput
          label="Skills"
          placeholder="Enter skill"
          clearable
          acceptValueOnBlur
          splitChars={[",", " ", "|"]}
          {...form.getInputProps("skillsRequired")}
          withAsterisk
          styles={{
            input: {
              height: "50px", // Increases height
              fontSize: "18px", // Larger text
              padding: "12px",
              borderRadius: "5px",
              marginTop: "10px",
            },
            label: {
              fontSize: "16px", // Larger label
              fontWeight: "bold",
            },
            root: {
              width: "100%", // Adjust width to fit container
            },
          }}
        />
        <Textarea
          label="About job"
          {...form.getInputProps("about")}
          autosize
          withAsterisk
          minRows={3}
          placeholder="Enter about job"
        />

        <div className="[&_button[data-active='true']]:!text-[#ffbd20] [&_button[data-active='true']]:!bg-[#ffbd20]/20 ">
          <div className="text-[16px] font-bold">
            Job Description <span className="text-red-800 text-lg">*</span>
          </div>
          <TextEditor form={form} data={editorData} />
        </div>
        <div className="flex gap-4">
          <Button
            onClick={handleDraft}
            color="brightSun.4"
            size="md"
            variant="outline"
          >
            Save as Draft
          </Button>
          <Button
            onClick={handleJob}
            color="brightSun.4"
            size="md"
            variant="light"
          >
            Post Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
