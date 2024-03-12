<script>
  import Preview from "../../../lib/chat-preview/index.svelte";
  import NavBar from "../../../lib/top/index.svelte";
  import { initializeConnection, socket } from "../../../core/chat-core/index";
  /** @type {import('./$types').PageData} */
  export let data;
  let search = "";

  //   initializeConnection()
  const _data = JSON.parse(localStorage.getItem("user"));
  const users = data.data
    ?.map((u) => {
      return { name: u.fullName, _id: u._id };
    })
    .filter((u) => u._id !== _data._id);
  const full_name = _data.fullName;
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
