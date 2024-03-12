<script>
  import Preview from "../../../lib/chat-preview/index.svelte";
  import NavBar from "../../../lib/top/index.svelte";
  import profileImg from "../../../lib/images/man2.png";
  import profileImg2 from "../../../lib/images/girl.png";
  /** @type {import('./$types').PageData} */
  export let data;

  let search = "";

  const testData = [
    {
      image: profileImg,
      name: "Mike Daniels",
      preview: "We need to meet today",
      read: true,
    },
    {
      image: profileImg2,
      name: "Sophia",
      preview: "You'd assume that won't you 😏. Why don't you work on the",
      read: false,
    },
  ];

  $: filtered = testData.filter((t) =>
    search
      ? t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.preview.toLowerCase().includes(search.toLowerCase())
      : testData
  );
</script>

<main
  class="p-10 flex flex-col gap-14"
>
  <NavBar full_name="Caleb Nwaizu" />

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
      {#each filtered as { image, name, preview, read }}
        <Preview {image} {name} {preview} {read} />
      {/each}
    </div>
  </div>
</main>
