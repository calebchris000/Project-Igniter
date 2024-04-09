/** @type {import('./$types').PageServerLoad} */
import axios from "axios";

export async function load({ params, cookies }) {
  try {
    const base_url = import.meta.env.VITE_SERVER_BASE_URL;
    const token = cookies.get("token");
    const response = await axios.get(
      `${base_url}/v1/user/${params.userId}/info`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: response.status,
      message: response.data.message,
      data: response.data.data,
      params: { userId: params.userId },
    };
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        params: { userId: params.userId },
      };
    }
    return {
      status: String(error),
      message: "Server error",
      params: { userId: params.userId },
    };
  }
}

