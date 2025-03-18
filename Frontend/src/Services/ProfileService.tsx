import axios from "axios";

const base_url = "http://localhost:8080/profile";

export const getProfile = async (id: any) => {
  return await axios
    .get(`${base_url}/get/${id}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const updateProfile = async (profile: any) => {
  return await axios
    .put(`${base_url}/update`, profile, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const getAllProfiles = async () => {
  return await axios
    .get(`${base_url}/getAll`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

