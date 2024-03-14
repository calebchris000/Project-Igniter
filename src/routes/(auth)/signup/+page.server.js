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
      return String(error);
    }
  },
};
