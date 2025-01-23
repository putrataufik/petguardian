export const getUsageToken = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/getusagetoken/${userId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch token");
    return data.usageToken;
  };
  
  export const updateUsageToken = async (userId, newTokenValue) => {
    const response = await fetch(`${API_BASE_URL}/users/updatedatatoken/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usageToken: newTokenValue }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update token");
  };
  
  export const identifyBreed = async (selectedFile) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
  
    const response = await fetch(`${API_BASE_URL}/gemini/detect-animal-breed`, {
      method: "POST",
      body: formData,
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to identify the pet breed.");
    return data.response;
  };
  