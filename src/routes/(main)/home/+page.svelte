<script>
  import { invalidate, goto } from "$app/navigation";
  import Preview from "../../../lib/chat-preview/index.svelte";
  import NavBar from "../../../lib/top/index.svelte";
  import { parseCookie } from "../../../core/utils/index";
  import { initializeConnection, socket } from "../../../core/chat-core/index";
  import moment from "moment";
  import { onDestroy, onMount } from "svelte";
  import { store } from "$lib/store";
  /** @type {import('./$types').PageData} */
  export let data;

  $: if (data?.status === 401) {
    typeof window !== undefined && window.location.replace("/login")
  }

  onMount(() => {
    invalidate("api:users");
  });

  const params = data.params;
  const all_users = params.all_users.data.filter(
    (u) => u._id !== params.userId
  );

  let search = "";
  const _data = typeof window !== "undefined" ? parseCookie("user") : "";

  $: users = data.data
    ?.map((u) => {
      return {
        name: u.fullName,
        _id: u._id,
        sender_id: u.lastMessage.sender,
        own_id: params.userId,
        typing: false,
        image: u.profileImg ?? "",
        preview: u.lastMessage.content ?? "",
        receipt: u.lastMessage.receipt,
        message_time: moment(u.lastMessage.createdAt).format("HH:mm A"),
        unread: Number(u.unread),
        status: u.status,
      };
    })
    .filter((u) => u._id !== _data._id);

  $: filtered = users?.filter((u) => {
    if (!search) return users;
    return (
      u.name.toLowerCase().trim().includes(search.toLowerCase()) ||
      u.preview.toLowerCase().includes(search)
    );
  });
  const full_name = _data.fullName;

  $: image_load = false;

  socket.emit("update_status", {
    id: params.userId,
    status: "active",
    lastActive: "now",
  });

  socket.on("user_disconnected", () => {
    typeof window !== "undefined" && invalidate("api:users");
  });
  socket.on("new_user", () => {
    typeof window !== "undefined" && invalidate("api:users");
  });
  socket.on("new_message", (data) => {
    if (data?.receipt === "sent") {
      socket.emit("receipt", { temp_id: data?.temp_id, receipt: "delivered" });
    }
    typeof window !== "undefined" && invalidate("api:users");
  });

  socket.on("user_typing", ({ sender, recipient }) => {
    users = users.map((u) => {
      if (sender === u._id) {
        return {
          ...u,
          typing: true,
        };
      }
      return u;
    });
  });

  onDestroy(() => {
    socket.off("new_user");
    socket.off("new_message");
    socket.off("user_disconnected");
  });

  let open_modal = false;

  let show_context_menu = false;
</script>

<main class="p-10 flex flex-col gap-14">
  <NavBar {full_name} />
  <div class="body flex flex-col gap-10">
    <div>
      <input
        bind:value={search}
        placeholder="Search"
        class="bg-transparent placeholder:text-black placeholder:text-3xl focus:placeholder:text-lg placeholder:transition-all h-14 placeholder:opacity-70 transition-all focus:border-opacity-100 border-opacity-30 border-b border-black outline-none w-full"
        type="text"
      />
    </div>

    <div class="flex flex-col gap-4">
      {#if users && users.length}
        {#each filtered as { image, typing, own_id, sender_id, unread, _id: id, name, status, preview, receipt, message_time }}
          <Preview
            {image}
            {unread}
            {sender_id}
            {own_id}
            {typing}
            {name}
            {status}
            {id}
            {preview}
            {receipt}
            {message_time}
          />
        {/each}
      {:else}
        <p>No recent chats. Start by clicking on the "+" button.</p>
      {/if}
    </div>
  </div>

  {#if open_modal}
    <div
      class="absolute flex flex-col gap-16 inset-0 p-16 w-full h-full bg-gray-200 z-50"
    >
      <NavBar
        full_name="Start Chat"
        show_cancel="false"
        on_close={(b) => (open_modal = !b)}
      />

      <section class="all_users flex flex-col gap-2">
        {#each all_users as each_user}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-interactive-supports-focus -->
          <div
            class="py-2 flex items-center gap-4 border"
            role="button"
            on:click={() => goto(`/home/${each_user._id}`)}
          >
            <div class="w-16 relative rounded-full overflow-hidden h-16">
              <img
                class="z-50 absolute w-full h-auto"
                src={each_user.profileImg}
                alt=""
              />
              <svg
                class="text-[4.3rem] absolute text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 48 48"
              >
                <g fill="currentColor">
                  <path d="M32 20a8 8 0 1 1-16 0a8 8 0 0 1 16 0" />
                  <path
                    fill-rule="evenodd"
                    d="M23.184 43.984C12.517 43.556 4 34.772 4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20a21.253 21.253 0 0 1-.274 0c-.181 0-.362-.006-.542-.016M11.166 36.62a3.028 3.028 0 0 1 2.523-4.005c7.796-.863 12.874-.785 20.632.018a2.99 2.99 0 0 1 2.498 4.002A17.942 17.942 0 0 0 42 24c0-9.941-8.059-18-18-18S6 14.059 6 24c0 4.916 1.971 9.373 5.166 12.621"
                    clip-rule="evenodd"
                  />
                </g>
              </svg>
            </div>
            <div>
              <p class="text-lg font-medium text-gray-800">
                {each_user.fullName}
              </p>
              <p class="">G'day folks!</p>
            </div>
          </div>
        {/each}
      </section>
    </div>
  {/if}
  <button
    style={open_modal ? "transform: rotate(45deg)" : ""}
    on:click={() => {
      open_modal = !open_modal;
    }}
    class="bg-gray-500 transition-all ease-in z-50 text-white h-16 w-16 rounded-2xl flex items-center justify-center text-4xl absolute bottom-14 right-14"
  >
    +
  </button>
</main>
