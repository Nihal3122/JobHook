import {
  Button,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/UserService";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";

const form = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(form);
  const icon = <IconAt size={16} />;
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const password = <IconLock size={18} stroke={1.5} />;
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormError({ ...formError, [e.target.name]: "" });
    setData({ ...data, [e.target.name]: e.target.value });
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
      if (valid) {
        const response = await loginUser(data);
        setData(form);
        console.log(response);
        dispatch(setUser(response));
        notifications.show({
          title: "Login Successfully",
          message: "Redirecting to home page...",
          withCloseButton: true,
          icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
          color: "teal",
          withBorder: true,
          className: "!border-green-500",
        });

        navigate("/");
        setTimeout(() => setLoading(false), 500);
      }
      setFormError(newFormError);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      notifications.show({
        title: "login failed",
        message: error.response.data.errorMessage,
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
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-3xl font-semibold">Login</div>
        <TextInput
          leftSection={icon}
          withAsterisk
          label="Email"
          placeholder="Enter your email"
          name="email"
          error={formError.email}
          value={data.email}
          onChange={handleChange}
        />
        <PasswordInput
          withAsterisk
          leftSection={password}
          label="Password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={data.password}
          error={formError.password}
          name="password"
        />

        <Button onClick={handleSubmit} autoContrast variant="filled">
          Login
        </Button>
        <div className="mx-auto">
          don't have an account ?
          <span
            onClick={() => {
              navigate("/sign-up");
              setData(form);
              setFormError(form);
            }}
            className="text-[#ffbd20] hover:underline ml-1 cursor-pointer"
          >
            Signup
          </span>
        </div>
        <div
          onClick={open}
          className="text-[#ffbd20] hover:underline cursor-pointer text-center"
        >
          Forget Password ?{" "}
        </div>
      </div>
      <ResetPassword opened={opened} close={close} />
    </>
  );
};

export default Login;
