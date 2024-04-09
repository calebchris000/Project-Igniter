import { io } from "socket.io-client";

const url = import.meta.env.VITE_SERVER_BASE_URL;

export const socket = io(url);

export const initializeConnection = () => {
  socket.on("connect", () => {
    console.log("client connected");
  });
};