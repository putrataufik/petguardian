import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserByUID = async (uid) => {
  const response = await axios.get(`${API_BASE_URL}/users/getuserbyuid/${uid}`);
  console.log("response GetUserByID", response);
  return response.data.user;
};

export const updateUserByUID = async (uid, formData) => {
  const response = await axios.post(`${API_BASE_URL}/users/updatedata/${uid}`, formData);
  return response.data;
};
