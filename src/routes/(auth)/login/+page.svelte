<script>
  import { goto } from "$app/navigation";
  import Index from "../../../lib/top/index.svelte";
  import { enhance } from "$app/forms";
  import { socket } from "../../../core/chat-core";
  import { clearCookie, parseCookie } from "../../../core/utils";
  import { store } from "$lib/store";
  import Text from "../../../components/input/Text.svelte";
  import Button from "../../../components/input/Button.svelte";
  import Alias from "../../../components/icons/Alias.svelte";
  import Padlock from "../../../components/icons/Padlock.svelte";
  import Back from "../../../components/icons/Back.svelte";
  /** @type {import('./$types').PageData} */
  export let data;
  export let form;

  let navigate = false;

  $: if (form?.status === 200) {
    const { token, ...others } = form.data;
    document.cookie = `user=${JSON.stringify(others)}; path: /; maxAge: 86400000; httpOnly: true; secure: false;`;
    store.update((c) => {
      c.notification.reason = "logged_in";
      c.notification.show = true;
      c.notification.status = "success";
      c.notification.title = `Login Successful`;
      c.notification.message = "You are successfully logged in!";
      return c;
    });
    navigate = true;
    socket.connect();
  } else if (form?.status) {
    store.update((c) => {
      c.notification.show = true;
      c.notification.status = form?.status !== 200 ? "error" : "info";
      c.notification.title = form?.status !== 200 ? "Login Failed" : "Info";
      c.notification.message = form?.message;
      return c;
    });
  }

  $: if (navigate) {
    setTimeout(() => {
      goto("/home");
    }, 200);
    navigate = false;
  }

  $: if (parseCookie("user")) {
    clearCookie("user");
    clearCookie("token");
    store.update((c) => {
      c.notification.reason = "logout";
      return c;
    });
    socket.disconnect();
  }

  let user = "";
</script>

<section class="main flex flex-col gap-10 pt-32">
  <Back className="mb-5 cursor-pointer" click={() => {
    goto("/")
  }} />
  <div class="flex flex-col gap-3 text-[#36453b]">
    <p class="text-4xl font-bold">LOG IN</p>
  </div>
  <form class="flex flex-col gap-3" method="post" use:enhance>
    <Text
      Icon={Alias}
      className="w-full"
      label="user"
      placeholder="Username or Email"
      getText={(val) => {
        user = val;
      }}
    />
    <Text
      Icon={Padlock}
      label="password"
      type="password"
      className="w-full"
      placeholder="Password"
    />

    <p class="ms-auto text-[#515751] my-3">
      Don't have an account? <a class=" underline" href="/signup"
        >Register here</a
      >
    </p>

    <Button className="block w-full rounded-xl font-semibold transition-all"
      >Log in</Button
    >
  </form>
</section>

<svelte:head>
  <title>Login</title>
</svelte:head>
