import axios from "axios";

const base_url = "http://localhost:8080/notification";

export const getNotifications = async (id: string) => {
  try {
    const res = await axios.get(`${base_url}/get/${id}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const readNotification = async (id: any) => {
  return await axios
    .put(`${base_url}/read/${id}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
