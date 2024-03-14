<script>
  import "../app.css";
  import { socket } from "../core/chat-core";
  import { onMount } from "svelte";

  /** @type {import('./$types').LayoutData} */
  export let data;

  onMount(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      if(window.location.pathname === "/login") return
      window.location.replace("/login")
    }
    socket.emit("update_status", {
      id: user._id,
      status: "active",
      lastActive: "now",
    });
  });
</script>

<main class="h-screen main bg-gray-100 relative p-6 max-w-[40rem] mx-auto">
  <slot />
</main>
