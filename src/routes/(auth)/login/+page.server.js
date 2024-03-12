/** @type {import('./$types').PageServerLoad} */
import axios from "axios";
export async function load() {
  return {};
}

export const actions = {
  default: async ({ request, cookies }) => {
    // Default action implementation
    const form = await request.formData();
    const user = form.get("user");
    const password = form.get("password");

    const data = { user, password };
    const base_url = import.meta.env.VITE_SERVER_BASE_URL;

    const response = await axios.post(`${base_url}/v1/login`, data);

    const _data = response.data;
    const url = new URL(base_url);

    cookies.set("token", _data.data.token, {
      path: "/",
      httpOnly: true,
      secure: url.protocol === "https",
      maxAge: 86400000,
    });

    const { token, ...others } = _data.data;


    return {
      status: response.status,
      message: _data.message,
      data: _data.data,
    };
  },
};
