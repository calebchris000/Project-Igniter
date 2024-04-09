/** @type {import('./$types').PageServerLoad} */
import axios from "axios";
import jwt from "jsonwebtoken";
export async function load({ cookies, params, depends }) {
  try {
    const base_url = import.meta.env.VITE_SERVER_BASE_URL;
    const token = cookies.get("token");
    const userId = params.userId;
    const secret = import.meta.env.VITE_JWT_SECRET;
    const parsed = jwt.decode(token, secret);
    const own_id = parsed.id;

    depends("api:userId");

    const response = await axios.get(`${base_url}/v1/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const _data = response.data;

    if (response.status !== 200) {
      return {
        status: response.status,
        message: _data?.message,
        data: {},
        params: { own_id, recipientId: params.userId },
      };
    }

    const _response = await axios.get(
      `${base_url}/v1/messages/${own_id}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const __data = _response.data;

    const responseData = {
      status: response.status,
      messages: __data.data,
      data: _data.data,
      params: {
        own_id,
        recipientId: params.userId,
        connected: true,
      },
    };

    return responseData;
  } catch (error) {
    return {
      status: 500,
      message: String(error),
      data: {},
      params: {
        own_id: "",
        recipientId: params.userId,
        connected: false,
      },
    };
  }
}
