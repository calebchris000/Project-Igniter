<script>
  import { goto } from "$app/navigation";
  import Index from "../../../lib/top/index.svelte";
  import { enhance } from "$app/forms";
  import { store } from "../../../lib";

  /** @type {import('./$types').PageData} */
  export let data;
  export let form;

  $: if (form && form.status === 201) {
    store.update((c) => {
      c.notification.show = true;
      c.notification.status = "success";
      c.notification.title = "Signup Successful"
      c.notification.message = "Account created"
      return c;
    });
    goto("/login");
  }
  else if(form?.status && form.status !== 201) {
    store.update((c) => {
      c.notification.show = true;
      c.notification.status = "error";
      c.notification.title = "Signup Failed"
      c.notification.message = form?.message
      return c;
    });
  }
</script>

<section class="flex flex-col gap-10">
  <Index full_name="Sign Up" />
  <form class="flex flex-col gap-3" method="post" use:enhance>
    <input
      class="h-16 outline-none px-2 placeholder:text-gray-500 font-normal placeholder:text-2xl focus:placeholder:text-lg placeholder:transition-all bg-transparent border-b border-gray-600"
      type="text"
      id="username"
      name="username"
      placeholder="Username"
      required
    />
    <input
      class="h-16 outline-none px-2 placeholder:text-gray-500 font-normal placeholder:text-2xl focus:placeholder:text-lg placeholder:transition-all bg-transparent border-b border-gray-600"
      type="text"
      id="email"
      name="email"
      placeholder="Email"
      required
    />
    <input
      class="h-16 outline-none px-2 placeholder:text-gray-500 font-normal placeholder:text-2xl focus:placeholder:text-lg placeholder:transition-all bg-transparent border-b border-gray-600"
      type="text"
      id="fullName"
      name="fullName"
      placeholder="Full Name"
      required
    />
    <input
      class="h-16 outline-none px-2 placeholder:text-gray-500 font-normal placeholder:text-2xl focus:placeholder:text-lg placeholder:transition-all bg-transparent border-b border-gray-600"
      type="password"
      placeholder="Password"
      id="password"
      name="password"
      required
      minlength="6"
    />

    <p class="ms-auto">
      Already have an account? <a class="underline" href="/login">Login here</a>
    </p>

    <button
      class="text-xl font-semibold bg-black text-white w-fit block mx-auto px-24 py-5 rounded-lg mt-5"
      type="submit">Submit</button
    >
  </form>
</section>

<svelte:head>
  <title>Signup</title>
</svelte:head>
