/** @type {import('./$types').PageServerLoad} */
import axios from "axios";
import { store } from "$lib/store.js";
export async function load() {
  return {};
}

export const actions = {
  default: async ({ request, cookies }) => {
    try {
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
        httpOnly: false,
        secure: url.protocol === "https",
        maxAge: 86400000,
      });

      store.update((c) => {
        c.notification.show = true;
        c.notification.status = "success";
        c.notification.title = "Success";
        c.notification.message = "Login Successful";

        return c;
      });

      const { token, ...others } = _data.data;
      return {
        status: response.status,
        message: _data.message,
        data: _data.data,
      };
    } catch (error) {
      if (error.response) {
        return {
          status: error?.response?.status,
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
