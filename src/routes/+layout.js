/** @type {import('./$types').LayoutLoad} */
import axios from "axios";

export async function load() {
  try {
    const base_url = import.meta.env.VITE_SERVER_BASE_URL;
    const response = await axios.get(base_url);

    const data = response.data;

    if (response.status !== 200) {
      return {
        status: response.status,
        message: data.message,
      };
    }
    return {
      status: 200,
      message: "Connected",
    };
  } catch (error) {
    if (error.response) {
      return {
        status: 500,
        message: error?.response?.data?.message,
      };
    } else if (error.request) {
      return {
        status: 500,
        message: "Cannot connect to server. Are you connected to the internet?",
      };
    }
    return {
      status: 500,
      message: error.message,
    };
  }
}
