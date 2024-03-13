/** @type {import('./$types').PageServerLoad} */
import axios from "axios";
export async function load({ cookies, depends }) {
  try {
    const base_url = import.meta.env.VITE_SERVER_BASE_URL;
    const token = cookies.get("token");

    depends("api:users");
    const response = await axios.get(
      `${base_url}/v1/users?status=active&showLast=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    return {
      status: response.status,
      message: data.message,
      data: data?.data,
      lastMessages: data?.lastMessages,
    };

  } catch (error) {
    console.error(error);
  }
}
