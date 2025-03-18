import {
  Anchor,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  Radio,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../Services/UserService";
import { loginValidation, signupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT",
};

const SignUp = () => {
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const icon = <IconAt size={16} />;
  const password = <IconLock size={18} stroke={1.5} />;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    if (typeof e == "string") {
      setData({ ...data, accountType: e });
      return;
    }
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
    setFormError({ ...formError, [name]: signupValidation(name, value) });
    if (name == "password" && data.confirmPassword !== "") {
      if (data.confirmPassword !== value) {
        setFormError({
          ...formError,
          confirmPassword: "Password do not match",
        });
      } else {
        setFormError({ ...formError, confirmPassword: "" });
      }
    }
    if (name === "confirmPassword") {
      if (data.password !== value)
        setFormError({ ...formError, [name]: "Password do not match" });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let valid = true;
      let newFormError: { [key: string]: string } = {};

      for (let key in data) {
        newFormError[key] = loginValidation(
          key,
          data[key as keyof typeof data]
        );
        if (newFormError[key]) valid = false;
      }

      setFormError(newFormError);

      if (!valid) return;

      await registerUser(data);
      setData(form);
      notifications.show({
        title: "Registered Successful",
        message: "Redirecting to login page...",
        withCloseButton: true,
        icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
        color: "teal",
        withBorder: true,
        className: "!border-green-500",
      });
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      notifications.show({
        title: "Login failed",
        message: error.response?.data?.errorMessage || "Something went wrong",
        withCloseButton: true,
        icon: <IconX style={{ width: "90%", height: "90%" }} />,
        color: "red",
        withBorder: true,
        className: "!border-red-500",
      });
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        className="translate-x-1/2"
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-3xl font-semibold">Create Account</div>
        <TextInput
          onChange={handleChange}
          value={data.name}
          error={formError.name}
          name="name"
          withAsterisk
          label="Full Name"
          placeholder="Enter your name"
        />
        <TextInput
          leftSection={icon}
          withAsterisk
          error={formError.email}
          label="Email"
          placeholder="Enter your email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <PasswordInput
          withAsterisk
          leftSection={password}
          error={formError.password}
          onChange={handleChange}
          value={data.password}
          name="password"
          label="Password"
          placeholder="Enter your password"
        />
        <PasswordInput
          withAsterisk
          leftSection={password}
          value={data.confirmPassword}
          name="confirmPassword"
          error={formError.confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          placeholder="Enter Confirm password"
        />
        <Radio.Group
          value={data.accountType}
          onChange={handleChange}
          label="You Are ? "
          withAsterisk
        >
          <Group mt="xs">
            <Radio
              className="py-4 px-6 border border-[#454545] rounded-lg has-[:checked]:border-[#ffbd20] hover:bg-[#3d3d3d] has-[:checked]:bg-[#ffbd20]/5"
              autoContrast
              value="APPLICANT"
              label="Applicant"
            />
            <Radio
              className="py-4 px-6 border border-[#454545] rounded-lg has-[:checked]:bg-[#ffbd20]/5 has-[:checked]:border-[#ffbd20] hover:bg-[#3d3d3d]"
              autoContrast
              value="EMPLOYER"
              label="Employer"
            />
          </Group>
        </Radio.Group>
        <Checkbox
          autoContrast
          defaultChecked
          label={
            <>
              I accept <Anchor>terms & conditions</Anchor>
            </>
          }
        />
        <Button onClick={handleSubmit} autoContrast variant="filled">
          Sign up
        </Button>
        <div className="mx-auto">
          Have an account ?
          <span
            onClick={() => {
              navigate("/login");
              setData(form);
              setFormError(form);
            }}
            className="text-[#ffbd20] hover:underline ml-1 cursor-pointer"
          >
            Login
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
