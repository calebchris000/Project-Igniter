import { writable } from "svelte/store";

const state = {
  notification: {
    show: false,
    status: "info",
    title: "",
    message: "This is a test message from store.",
    timeout: 3000,
    reason: null,
  },
};

export const store = writable(state);