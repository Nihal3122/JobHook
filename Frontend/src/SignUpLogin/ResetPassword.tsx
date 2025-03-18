import {
  Button,
  Modal,
  PasswordInput,
  PinInput,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePassword, sendOtp, verifyOtp } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

const ResetPassword = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verified, setverified] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const [passError, setPassError] = useState("");
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if (seconds == 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else {
      setSeconds((s) => s - 1);
    }
  }, 1000);

  const handleSendOtp = async () => {
    if (!email) {
      errorNotification("Invalid Email", "Please enter a valid email.");
      return;
    }
    try {
      setOtpSending(true);
      await sendOtp(email);
      setOtpSent(true);
      successNotification(
        "OTP Sent Successfully",
        "Enter OTP to reset password"
      );
      setResendLoader(true);
      interval.start();
    } catch (error: any) {
      errorNotification(
        "OTP Sending Failed",
        error.response?.data?.errorMessage || "Something went wrong."
      );
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      await verifyOtp(email, otp);
      setverified(true);
      successNotification("OTP Verified Successfully", "Enter new password");
    } catch (error: any) {
      console.log(error);
      errorNotification(
        "OTP Verification Failed",
        error.response.data.errorMessage
      );
    }
  };
  const ResendOtp = async () => {
    if (resendLoader) return; // Prevent multiple clicks

    try {
      setResendLoader(true);
      await sendOtp(email);
      setSeconds(60); // Reset the timer
      interval.start(); // Restart the timer
    } catch (error: any) {
      errorNotification(
        "Resend OTP Failed",
        error.response?.data?.errorMessage || "Something went wrong."
      );
    }
  };

  const changeEmail = () => {
    setEmail("");
    setOtpSent(false);
    setverified(false);
  };

  const handleResetPassword = async () => {
    if (!password) {
      errorNotification("Password Error", "Password cannot be empty.");
      return;
    }

    try {
      await changePassword(email, password);
      successNotification("Password Changed", "Login with your new password.");
      props.close();
    } catch (error: any) {
      errorNotification(
        "Password Reset Failed",
        error.response?.data?.errorMessage || "Something went wrong."
      );
    }
  };

  return (
    <Modal opened={props.opened} onClose={props.close} title="Reset Password">
      <div className="flex flex-col gap-6 p-1">
        <TextInput
          leftSection={<IconAt size={16} />}
          withAsterisk
          label="Email"
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rightSection={
            <Button
              disabled={email === "" || otpSent}
              onClick={handleSendOtp}
              className={` size-sm autoContrast variant-filled 
                ${
                  email === "" || otpSent
                    ? "!bg-gray-700 !text-gray-400 cursor-not-allowed"
                    : ""
                }`}
              loading={otpSending && !otpSent}
            >
              Send OTP
            </Button>
          }
          rightSectionWidth="xl"
        />
        {otpSent && (
          <PinInput
            length={6}
            mx={"auto"}
            size="md"
            gap="lg"
            onComplete={handleVerifyOtp}
          />
        )}
        {otpSent && !verified && (
          <div className="flex gap-2">
            <Button
              onClick={ResendOtp}
              autoContrast
              variant="light"
              color="brightSun.4"
              fullWidth
              loading={otpSending}
            >
              {resendLoader ? seconds : "Resend"}
            </Button>{" "}
            <Button
              onClick={changeEmail}
              autoContrast
              fullWidth
              variant="filled"
            >
              Change Email
            </Button>
          </div>
        )}
        {verified && (
          <PasswordInput
            withAsterisk
            leftSection={<IconLock size={18} stroke={1.5} />}
            label="Password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
              setPassError(signupValidation("password", e.target.value));
            }}
            value={password}
            error={passError}
            name="password"
          />
        )}
        {verified && (
          <Button onClick={handleResetPassword} variant="filled" autoContrast>
            Change Password
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
