<script>
  import { goto } from "$app/navigation";
  import Index from "../../../lib/top/index.svelte";
  import { enhance } from "$app/forms";
  /** @type {import('./$types').PageData} */
  export let data;
  export let form;

  $: if (form?.status === 200) {
    const { token, ...others } = form.data;
    localStorage.setItem("user", JSON.stringify(others));

    goto("/home");
  } else if (form?.status) {
    alert(form.message);
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
