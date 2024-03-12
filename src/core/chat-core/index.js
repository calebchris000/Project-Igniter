import { io } from "socket.io-client";

const url = import.meta.env.VITE_SERVER_BASE_URL;

export const socket = io(url);

export const initializeConnection = () => {
  socket.on("connect", () => {
    console.log("client connected");
    socket.emit("register", {
      name: "Caleb Nwaizu" + Math.floor(Math.random() * 100),
    });

    if (!import.meta.env.SSR) {
      localStorage.setItem("client-id", socket.id);
    }
  });

  socket.on("new_user", (d) => {
    console.log(d, "id");

    if (!import.meta.env.SSR) {
      const exist = localStorage.getItem("clients");

      if (!exist) {
        localStorage.setItem("clients", JSON.stringify([d]));
      } else {
        const clients = JSON.parse(exist);
        const client_exist = clients.find((c) => c.name === d.name);

        if (!client_exist) {
          clients.push(d);
          localStorage.setItem("clients", JSON.stringify(clients));
        }
      }
    }
  });
};
