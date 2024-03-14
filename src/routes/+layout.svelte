<script>
  import { goto } from "$app/navigation";
  import "../app.css";
  import { socket } from "../core/chat-core";
  import { onMount } from "svelte";
  import { parseCookie } from "../core/utils";

  /** @type {import('./$types').LayoutData} */
  export let data;

  const user = typeof window !== "undefined" ? parseCookie("user") : "";

  if (!user) {
    if (typeof window !== "undefined" && window.location.pathname !== "/login")
      // window.location.replace("/login");
      goto("/login");
  }

  socket.emit("update_status", {
    id: user._id,
    status: "active",
    lastActive: "now",
  });
</script>

<main class="h-screen main bg-gray-100 relative p-6 max-w-[40rem] mx-auto">
  <slot />
</main>
