/** @type {import('./$types').PageServerLoad} */
import axios from "axios";
import jwt from "jsonwebtoken";
export async function load({ cookies, params }) {
  try {
    const base_url = import.meta.env.VITE_SERVER_BASE_URL;
    const token = cookies.get("token");
    const userId = params.userId;
    const secret = import.meta.env.VITE_JWT_SECRET;
    const parsed = jwt.decode(token, secret);
    const own_id = parsed.id;

    const response = await axios.get(`${base_url}/v1/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const _data = response.data;

    if (response.status !== 200) {
      return {
        error: _data?.message,
        params: { own_id, recipientId: params.userId },
      };
    }

    //TODO Messages endpoint
    const _response = await axios.get(
      `${base_url}/v1/messages/${own_id}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const __data = _response.data;
    

    return {
      user: _data.data,
      messages: __data.data,
      params: { own_id, recipientId: params.userId },
    };
  } catch (error) {
    return {
      error: String(error),
      params: { own_id, recipientId: params.userId },
    };
  }
}
