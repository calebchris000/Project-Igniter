<script>
  import { invalidate } from "$app/navigation";
  import "../app.css";
  import { goto } from "$app/navigation";
  import { socket } from "../core/chat-core";
  import { onDestroy, onMount } from "svelte";
  import { parseCookie } from "../core/utils";
  import Notification from "$lib/notification/notification.svelte";
  import { store } from "$lib/store";
  import FramePattern from "../components/icons/FramePattern.svelte";

  /** @type {import('./$types').LayoutData} */
  export let data;

  const user = typeof window !== "undefined" && parseCookie("user");
$: console.log("ok", data)
  onMount(() => {
    const { pathname } = window.location;

    if (!user) {
      if (pathname === "/login" || pathname === "/signup") return;
      window.location.replace("/login");
    } else if (pathname === "/" && !!user) {
      window.location.replace("/home");
    }
  });

  socket.on("connect", () => {
    let reason = "";
    store.subscribe((c) => {
      reason = c.notification.reason;
    });

    if (reason === "disconnect") {
      store.update((c) => {
        c.notification.reason = null;
        c.notification.show = true;
        c.notification.status = "success";
        c.notification.title = `Connected Back`;
        c.notification.message = "Connection is back!";
        return c;
      });
    } else if (reason !== "logged_in") {
      store.update((c) => {
        c.notification.show = true;
        c.notification.status = "success";
        c.notification.title = `Connected`;
        c.notification.message = "You are connected";
        return c;
      });
    }
    const current_path =
      typeof window !== "undefined" ? window.location.pathname : "/";

    if (current_path === "/not-connected") {
      const last_route =
        (typeof window !== "undefined" &&
          JSON.parse(localStorage.getItem("last_route"))) ||
        "/home";

      window.location.replace(last_route);
    }
    typeof window !== "undefined" && invalidate("api:users");
    typeof window !== "undefined" && invalidate("api:userId");
  });

  socket.on("disconnect", () => {
    let reason = "";
    store.subscribe((c) => {
      reason = c.notification.reason;
    });
    if (reason === "logout") return;
    store.update((c) => {
      c.notification.reason = "disconnect";
      c.notification.show = true;
      c.notification.status = "info";
      c.notification.title = `Connection Lost`;
      c.notification.message =
        "You are offline. Connect to a network to continue chatting.";
      return c;
    });
  });

  onDestroy(() => {
    socket.off("reconnect_attempt");
    socket.off("disconnect");
  });
</script>

<main class="h-screen main bg-[#F5F9E9] relative p-6 px-8 max-w-[40rem] mx-auto">
  <FramePattern className="fixed top-[-4rem] rotate-90 skew-y-[-16deg] right-[-4rem] w-44 h-fit" />
  <!-- <FramePattern className="fixed bottom-[-4rem] skew-y-[-16deg] right-[-4rem] w-44 h-fit" /> -->
  <Notification />
  <slot />
</main>

<svelte:head>
  <title>Igniter</title>
</svelte:head>
