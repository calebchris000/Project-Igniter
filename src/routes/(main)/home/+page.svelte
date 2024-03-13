<script>
  import { invalidate, invalidateAll, goto } from "$app/navigation";
  import Preview from "../../../lib/chat-preview/index.svelte";
  import NavBar from "../../../lib/top/index.svelte";
  import { initializeConnection, socket } from "../../../core/chat-core/index";
  /** @type {import('./$types').PageData} */
  export let data;
  $: lastMessages = data?.lastMessages;

  let search = "";


  const _data = JSON.parse(localStorage.getItem("user"));
  $: users = data.data
    ?.map((u) => {
      const last_message = lastMessages.find((l) => l.userId === u._id);
      return {
        name: u.fullName,
        _id: u._id,
        preview: last_message.lastMessage.content,
        read: last_message.lastMessage.read,
        unread: Number(last_message.unread),
      };
    })
    .filter((u) => u._id !== _data._id);
  const full_name = _data.fullName;


  socket.on("new_message", () => {
    invalidate("api:users");
  });
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
      {#if users.length}
        {#each users as { image, unread, _id: id, name, preview, read }}
          <Preview {image} {unread} {name} {id} {preview} {read} />
        {/each}
      {:else}
        <p>No users online yet!</p>
      {/if}
    </div>
  </div>
</main>
