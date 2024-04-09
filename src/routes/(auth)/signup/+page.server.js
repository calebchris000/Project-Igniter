/** @type {import('./$types').PageServerLoad} */
import axios from "axios";
export async function load() {
  return {};
}

export const actions = {
  default: async ({ request }) => {
    try {
      const form = await request.formData();
      const base_url = import.meta.env.VITE_SERVER_BASE_URL;

      const email = form.get("email");
      const username = form.get("username");
      const fullName = form.get("fullName");
      const password = form.get("password");

      const response = await axios.post(`${base_url}/v1/signup`, {
        email,
        password,
        username,
        fullName,
      });

      const data = response.data;
      return { ...data, status: response.status };
    } catch (error) {
      if (error.response) {
        return {
          status: error?.response?.data?.message,
          message: error?.response?.data?.message,
          data: {},
        };
      } else if (error.request) {
        return {
          status: 503,
          message:
            "Cannot connect to server. Are you connected to the internet?",
          data: {},
        };
      }
      return {
        status: 500,
        message: error.message,
        data: {},
      };
    }
  },
};
