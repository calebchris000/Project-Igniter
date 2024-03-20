/** @type {import('./$types').PageServerLoad} */
import axios from "axios";
import jwt from "jsonwebtoken";
import { setCookie } from "../../../core/utils/index.js";

export async function load({ cookies, depends, params }) {
  try {
    depends("api:users");
    const base_url = import.meta.env.VITE_SERVER_BASE_URL;
    const token = cookies.get("token");
    const secret = import.meta.env.VITE_JWT_SECRET;

    const user = jwt.verify(token, secret);

    const response = await axios.get(`${base_url}/v1/users/recent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    const all_users = await fetchAllUsers({ token, base_url });

    const returnData = {
      status: response.status,
      message: data.message,
      data: data?.data,
      params: { userId: user.id, all_users, connected: true },
    };

    return returnData;
  } catch (error) {
    console.error(error.message);
    if (error.message && error.message === "jwt expired") {
      return {
        status: 401,
        message: error.message,
        params: { userId: "", all_users: { data: [] }, connected: false },
      };
    }
    return {
      data: [],
      params: { userId: "", all_users: { data: [] }, connected: false },
    };
  }
}

async function fetchAllUsers(data) {
  try {
    const { token, base_url } = data;
    const response = await axios.get(`${base_url}/v1/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const _data = response.data;

    return _data;
  } catch (error) {
    console.error(error);
  }
}
