/** @type {import('./$types').PageServerLoad} */
import axios from "axios";
export async function load({ cookies }) {
  const base_url = import.meta.env.VITE_SERVER_BASE_URL;
  const token = cookies.get("token");
  const response = await axios.get(`${base_url}/v1/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data;
  return {
    status: response.status,
    message: data.message,
    data: data?.data,
  };
}
