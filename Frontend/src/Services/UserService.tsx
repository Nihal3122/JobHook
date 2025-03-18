import axios from "axios";

const base_url = "http://localhost:8080/user";

const registerUser = async (user: any) => {
  return await axios
    .post(`${base_url}/register`, user, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const loginUser = async (login: any) => {
  return await axios
    .post(`${base_url}/login`, login, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const sendOtp = async (email: any) => {
  return await axios.post(
    `${base_url}/sendOtp/${email}`,
    {},
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
};

const verifyOtp = async (email: any, otp: any) => {
  return await axios.get(`${base_url}/verifyOtp/${email}/${otp}`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
};
const changePassword = async (email: any, password: any) => {
  return await axios.post(
    `${base_url}/changePass`,
    { email, password },
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
};

export { registerUser, loginUser, sendOtp, verifyOtp, changePassword };
