import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserByUID = async (uid) => {
  const response = await axios.get(
    `${API_BASE_URL}/users/getuserbyuid/${uid}`,
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
  console.log("response GetUserByID", response);
  return response.data.user;
};

export const updateUserByUID = async (uid, formData) => {
  const response = await axios.post(`${API_BASE_URL}/users/updatedata/${uid}`, 
    formData,
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
  return response.data;
};

export const getSubscriptionStatusByUID = async (uid) => {
  try {
    console.log("anjay" + uid);
    const response = await axios.get(
      `${API_BASE_URL}/users/subscriptionsstatus/${uid}`,
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    console.log("response GetSubscriptionStatusByUID", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    throw new Error("Gagal mendapatkan status langganan.");
  }
};


export const getUsageToken = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/getusagetoken/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch usage token");
  }
  
  const data = await response.json();
  return data.usageToken;
};


export const updateUsageToken = async (userId, newTokenValue) => {
  const response = await fetch(`${API_BASE_URL}/users/updatedatatoken/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
    body: JSON.stringify({ usageToken: newTokenValue }),
  });

  if (!response.ok) {
    throw new Error("Failed to update usage token");
  }

  return response.json();
};

