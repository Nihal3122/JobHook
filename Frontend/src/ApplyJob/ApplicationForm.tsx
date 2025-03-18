import {
  Button,
  FileInput,
  LoadingOverlay,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { applyJob } from "../Services/JobService";
import { getBase64 } from "../Services/Utilities";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    form.reset();
  }, []);

  const handlePreview = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    form.validate();
    if (!form.isValid()) {
      return;
    }
    setPreview(!preview);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const file = form.getValues().resume;
      if (file) {
        let resume: any = await getBase64(file);
        let applicants = {
          ...form.getValues(),
          applicantId: user.id,
          resume: resume.split(",")[1],
        };
        await applyJob(id, applicants);

        setLoading(false);
        navigate("/find-jobs");
        successNotification("Success", "Application Submitted Successfully");
      } else {
        setLoading(false);
        throw new Error("Resume file is missing.");
      }
    } catch (error: any) {
      console.log(error.response.data.errorMessage, "Error Occurred ");
      setLoading(false);
      errorNotification("Error", error.response.data.errorMessage);
    }
  };
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      website: user?.website || "",
      resume: undefined,
      coverLetter: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      email: isNotEmpty("Email is required"),
      phone: isNotEmpty("Phone is required"),
      website: isNotEmpty("Website is required"),
      resume: isNotEmpty("Resume is required"),
    },
  });
  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        className="!fixed"
      />
      <div className="text-xl font-semibold mb-5 my-10">
        Submit your application
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <TextInput
            {...form.getInputProps("name")}
            label="Full Name"
            withAsterisk
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-[#b0b0b0] font-semibold" : ""}`}
            placeholder="Enter your name"
            styles={{
              input: {
                height: "45px",
                marginTop: "5px",
              },
              label: {
                fontSize: "16px",
                fontWeight: "bold",
              },
            }}
          />

          <TextInput
            label="Email"
            withAsterisk
            placeholder="Enter your email"
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            {...form.getInputProps("email")}
            className={`${preview ? "text-[#b0b0b0] font-semibold" : ""}`}
            styles={{
              input: {
                height: "45px",
                marginTop: "5px",
              },
              label: {
                fontSize: "16px",
                fontWeight: "bold",
              },
            }}
          />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <NumberInput
            label="PhoneNumber"
            withAsterisk
            {...form.getInputProps("phone")}
            placeholder="Enter your phone number"
            hideControls
            min={0}
            max={9999999999}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-[#b0b0b0] font-semibold" : ""}`}
            clampBehavior="strict"
            styles={{
              input: {
                height: "45px",
                marginTop: "5px",
              },
              label: {
                fontSize: "16px",
                fontWeight: "bold",
              },
            }}
          />
          <TextInput
            label="Person Website"
            withAsterisk
            readOnly={preview}
            {...form.getInputProps("website")}
            placeholder="Enter URL"
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-[#b0b0b0] font-semibold" : ""}`}
            styles={{
              input: {
                height: "45px",
                marginTop: "5px",
              },
              label: {
                fontSize: "16px",
                fontWeight: "bold",
              },
            }}
          />
        </div>
        <FileInput
          leftSection={<IconPaperclip stroke={1.5} />}
          label="Attach your CV"
          placeholder="Your CV"
          leftSectionPointerEvents="none"
          accept="application/pdf"
          readOnly={preview}
          {...form.getInputProps("resume")}
          variant={preview ? "unstyled" : "default"}
          className={`${preview ? "text-[#b0b0b0] font-semibold" : ""}`}
          withAsterisk
          styles={{
            input: {
              height: "45px",
              marginTop: "5px",
            },
            label: {
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
        />
        <Textarea
          placeholder="Enter something about your self"
          label="Cover Letter"
          autosize
          minRows={4}
          {...form.getInputProps("coverLetter")}
          withAsterisk
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={`${preview ? "text-[#b0b0b0] font-semibold" : ""}`}
          styles={{
            input: {
              height: "45px",
              marginTop: "5px",
            },
            label: {
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
        />
        {!preview ? (
          <Button
            onClick={handlePreview}
            color="brightSun.4"
            size="md"
            variant="light"
          >
            Preview
          </Button>
        ) : (
          <div className="flex gap-10 [&>*]w-1/2">
            <Button
              onClick={handlePreview}
              color="brightSun.4"
              size="md"
              variant="outline"
              fullWidth
            >
              Edit
            </Button>
            <Button
              onClick={handleSubmit}
              color="brightSun.4"
              size="md"
              fullWidth
              variant="light"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationForm;
