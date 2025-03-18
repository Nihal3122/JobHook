import axios from "axios";

const base_url = "http://localhost:8080/job";

export const postJob = async (job: any) => {
  try {
    const response = axios.post(`${base_url}/post`, job, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const response = axios.get(`${base_url}/getAll`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSingleJobs = async (jobId: any) => {
  try {
    const response = axios.get(`${base_url}/get/${jobId}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const applyJob = async (id: any, application: any) => {
  try {
    const response = await axios.post(`${base_url}/apply/${id}`, application, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getJobPostedBy = async (id: any) => {
  try {
    const response = axios.get(`${base_url}/postedBy/${id}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const changeAppStatus = async (application: any) => {
  try {
    const response = await axios.post(
      `${base_url}/changeAppStatus`,
      application,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
