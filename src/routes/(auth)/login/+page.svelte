<script>
  import { goto } from "$app/navigation";
  import Index from "../../../lib/top/index.svelte";
  import { enhance } from "$app/forms";
  import { socket } from "../../../core/chat-core";
  import { clearCookie, parseCookie } from "../../../core/utils";
  import { store } from "$lib/store";
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
</script>

<section class="flex flex-col gap-10">
  <Index full_name="Login" />
  <form class="flex flex-col gap-3" method="post" use:enhance>
    <input
      class="h-16 outline-none px-2 placeholder:text-gray-500 font-normal placeholder:text-2xl focus:placeholder:text-lg placeholder:transition-all bg-transparent border-b border-gray-600"
      type="text"
      id="user"
      name="user"
      placeholder="Username or Email"
      required
    />
    <input
      class="h-16 outline-none px-2 placeholder:text-gray-500 font-normal placeholder:text-2xl focus:placeholder:text-lg placeholder:transition-all bg-transparent border-b border-gray-600"
      type="password"
      placeholder="Password"
      id="password"
      name="password"
      required
    />

    <p class="ms-auto">
      Don't have an account? <a class=" underline" href="/signup"
        >Register here</a
      >
    </p>

    <button
      class="text-xl font-semibold bg-black text-white w-fit block mx-auto px-24 py-5 rounded-lg mt-5"
      type="submit">Submit</button
    >
  </form>
</section>

<svelte:head>
  <title>Login</title>
</svelte:head>
