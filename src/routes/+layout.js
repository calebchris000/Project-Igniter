/** @type {import('./$types').LayoutLoad} */
import axios from "axios";

export async function load({params, cookies}) {
    try {
        const base_url = import.meta.env.VITE_SERVER_BASE_URL;
        const response = await axios.get(base_url, {
            headers: {
                "Content-Type": "application/json"
            }
        });


        let data = response.data;
        if (response.status !== 200) {
            return {
                status: response.status,
                message: data.message,
                data: {},
                params,
            };
        }

        return {
            status: 200,
            message: "Connected",
            data: {},
            params,
        };
    } catch (error) {
        if (error.response) {
            return {
                status: 500,
                message: error?.response?.data?.message,
                data: {},
                params,
            };
        } else if (error.request) {
            return {
                status: 500,
                message: "Cannot connect to server. Are you connected to the internet?",
                data: {},
                params,
            };
        }
        return {
            status: 500,
            message: error.message,
            data: {},
            params,
        };
    }
}
