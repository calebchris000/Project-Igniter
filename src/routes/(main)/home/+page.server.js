/** @type {import('./$types').PageServerLoad} */
import axios from "axios";
import jwt from "jsonwebtoken";

export async function load({ cookies, depends }) {
  try {
    const base_url = import.meta.env.VITE_SERVER_BASE_URL;
    const token = cookies.get("token");
    const secret = import.meta.env.VITE_JWT_SECRET;

    const user = jwt.verify(token, secret);
    depends("api:users");
    const response = await axios.get(`${base_url}/v1/users/recent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    const all_users = await fetchAllUsers({ token, base_url });

    return {
      status: response.status,
      message: data.message,
      data: data?.data,
      params: { userId: user.id, all_users },
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      params: { userId: "", all_users: {data: []} },
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
