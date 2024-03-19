import axios from "axios"

export async function UpdateActions({ token, actions }) {
    try {
      const base_url = import.meta.env.VITE_SERVER_BASE_URL;
      const response = await axios.put(
        `${base_url}/v1/user/update/actions`,
        actions,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
  
      return {
        status: response.status,
        message: data?.message,
        data: data?.data
      };
    } catch (error) {
      if (error.response) {
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
      return {
        status: String(error),
        message: "Server error",
      };
    }
  }
  