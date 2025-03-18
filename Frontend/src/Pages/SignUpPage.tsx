import { IconArrowLeft, IconBriefcase } from "@tabler/icons-react";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] bg-[#2d2d2d] font-['poppins']  overflow-hidden relative">
      <Button
        onClick={() => navigate("/")}
        leftSection={<IconArrowLeft size={20} />}
        color="brightSun.4"
        variant="light"
        my={"md"}
        className="!absolute left-5 top-5 !cursor-pointer z-10"
      >
        Home
      </Button>
      <div
        className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${
          location.pathname == "/sign-up" ? "-translate-x-1/2" : "translate-x-0"
        }`}
      >
        <Login />
        <div
          className={`${
            location.pathname == "/sign-up"
              ? "rounded-r-[200px]"
              : "rounded-l-[200px]"
          } w-1/2 h-full bg-[#3d3d3d] transition-all ease-in-out duration-1000  flex items-center justify-center flex-col gap-5`}
        >
          <div className="flex gap-3 items-center text-[#ffbd20]">
            <IconBriefcase className="h-16 w-16" stroke={2} />
            <div className="text-6xl font-medium">JobHook</div>
          </div>
          <div className="text-2xl text-[#d1d1d1] font-semibold">
            Find the made for you
          </div>
        </div>
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
