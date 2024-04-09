<script>
  import { goto } from "$app/navigation";
  import { store } from "$lib/index";
  import { parseCookie } from "../../../../../core/utils/index";
  import { UpdateActions } from "./api";

  import { onMount } from "svelte";
  import Card from "../../../../../components/card/Card.svelte";
  import Toggle from "../../../../../components/common/Toggle.svelte";
  import Phone from "../../../../../components/icons/Phone.svelte";
  import Bio from "../../../../../components/icons/Bio.svelte";
  import Chat from "../../../../../components/icons/Chat.svelte";
  import Ghost from "../../../../../components/icons/Ghost.svelte";
  import Blank from "../../../../../components/icons/Blank.svelte";
  import Profile from "../../../../../components/icons/Profile.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  $: userId = data?.params?.userId;
  $: _data = data?.data;

  async function updateActions(actions) {
    const token = parseCookie("token");
    const data = await UpdateActions({ token, actions });

    if (data?.status !== 200) {
      store.update((c) => {
        c.notification.show = true;
        c.notification.status = "error";
        c.notification.title = `Update Error`;
        c.notification.message =
          data?.message ??
          "Could not update action. Are you connected to the internet";
        return c;
      });
    }
    store.update((c) => {
      c.notification.show = true;
      c.notification.status = "success";
      c.notification.title = `Update Success`;
      c.notification.message = data?.message;
      return c;
    });
  }

  onMount(() => {
    if (data && data?.status === 401) {
      goto("/login");
    }
  });

  $: top_profile = {
    name: _data?.profile?.name ?? "User",
    username: _data?.profile?.username ?? "username",
    image: _data?.profile?.image,
  };

  const Icons = {
    mobile: Phone,
    "Ghost Mode": Ghost,
    bio: Bio,
  };

  $: info = Object.entries(_data?.info ?? {}).map(([name, value]) => {
    return {
      Icon: Icons[name] ?? Blank,
      name,
      value,
    };
  });

  $: actions = Object.entries(_data?.actions ?? {}).map(([name, value]) => {
    return {
      Icon: Icons[name] ?? Blank,
      name,
      value,
    };
  });

  $: image_load = false;

  onMount(() => {
    const img = new Image();
    img.src = top_profile?.image;

    img.onload = () => {
      image_load = true;
    };
  });
</script>

<section class="flex flex-col gap-4">
  <Card _class="bg-gray-300 flex flex-col items-center rounded-md gap-2">
    <div
      class="h-32 w-32 overflow-hidden rounded-full flex items-center justify-center"
    >
      {#if image_load}
        <img class="w-full scale-105" src={top_profile.image} alt="ale" />
      {:else}
        <Profile _class="text-7xl scale-[2]" />
      {/if}
    </div>
    <div class="flex flex-col items-center">
      <p class="m-0 p-0">{top_profile.name}</p>
      <p class="m-0 p-0">@{top_profile.username}</p>
    </div>
    <div>
      <button
        type="button"
        class="bg-blue-950 flex items-center gap-2 text-white p-5 py-3 rounded-md"
        ><Chat /> Message</button
      >
    </div>
  </Card>
  <Card _class="bg-gray-300 flex flex-col items-center rounded-md gap-2">
    <p class="self-start text-xl text-black">Info</p>

    {#each info as { name, value, Icon }, idx}
      <div
        class="self-start {info.length - 1 !== idx
          ? 'border-b-2 border-white'
          : ''} w-full flex flex-col gap-1 py-3"
      >
        <p class="font-medium text-gray-700">{name}</p>
        <p class="font-medium text-black text-lg flex items-center gap-2">
          <Icon />{value}
        </p>
      </div>
    {/each}
  </Card>

  <Card _class="bg-gray-300 flex flex-col items-start rounded-md gap-4">
    <p class="self-start text-xl">Actions</p>
    {#each actions as { name, value, Icon }}
      <div class="w-full">
        <div class="flex items-center justify-between w-full gap-2">
          <p class="flex items-center gap-2"><Icon /> {name}</p>
          <Toggle
            status={value ? 1 : 0}
            get_status={(s) => {
              const actions = [
                {
                  ghost_mode: { user: userId, enabled: s === 0 ? false : true },
                },
              ];
              updateActions(actions);
            }}
          />
        </div>
      </div>
    {/each}
  </Card>

  <Card _class="bg-red-600 flex flex-col items-center rounded-md gap-4">
    <div class="self-start flex flex-col gap-2">
      <button
        class="block hover:underline text-white self-start w-fit"
        type="button"
        >Block {top_profile.name.split(/ (.+)/)[0] ?? "User"}</button
      >
      <button
        class="block hover:underline text-white self-start w-fit"
        type="button"
        >Report {top_profile.name.split(/ (.+)/)[0] ?? "User"}</button
      >
    </div>
  </Card>
</section>
