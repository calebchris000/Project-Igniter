<script>
  import { goto } from "$app/navigation";
  import "../app.css";
  import moment from "moment";
  import { socket } from "../core/chat-core";

  /** @type {import('./$types').LayoutData} */
  export let data;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
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
