/** @type {import('./$types').LayoutLoad} */
import axios from "axios";
import { parseCookie } from "../../../../core/utils/index.js";

export const ssr = false;
export async function load({ cookies }) {
  try {
    const base_url = import.meta.env.VITE_SERVER_BASE_URL;
    const token = parseCookie("token");
    const response = await axios.get(`${base_url}/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    console.log("response",response)

    return {
      status: response.status,
      message: response.data?.message,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        data: {},
      };
    }
    return {
      status: 500,
      message: String(error.response.data.message),
      data: {},
    };
  }
}
