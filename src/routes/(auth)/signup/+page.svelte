<script>
  import Profile from "./../../../components/icons/Profile.svelte";
  import { goto } from "$app/navigation";
  import Index from "../../../lib/top/index.svelte";
  import { enhance } from "$app/forms";
  import { store } from "../../../lib";
  import Text from "../../../components/input/Text.svelte";
  import Button from "../../../components/input/Button.svelte";
  import Back from "../../../components/icons/Back.svelte";
  import User from "../../../components/icons/User.svelte";
  import Alias from "../../../components/icons/Alias.svelte";
  import Email from "../../../components/icons/Email.svelte";
  import Padlock from "../../../components/icons/Padlock.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  export let form;

  $: if (form && form.status === 201) {
    store.update((c) => {
      c.notification.show = true;
      c.notification.status = "success";
      c.notification.title = "Signup Successful";
      c.notification.message = "Account created";
      return c;
    });
    goto("/login");
  } else if (form?.status && form.status !== 201) {
    store.update((c) => {
      c.notification.show = true;
      c.notification.status = "error";
      c.notification.title = "Signup Failed";
      c.notification.message = form?.message;
      return c;
    });
  }

  $: password = "";
  $: confirm_password = "";
  $: password_error = "";

  $: if (password.length && confirm_password.length) {
    if (password !== confirm_password) {
      password_error = "Password doesn't match.";
    } else {
      password_error = "";
    }
  }
</script>

<section class="flex flex-col gap-10">
  <div class="flex flex-col gap-3 text-[#36453b]">
    <Back className="mb-5 cursor-pointer" click={() => {
      goto("/")
    }} />
    <p class="text-4xl font-bold">SIGN UP</p>
  </div>
  <form class="flex flex-col gap-3" method="post" use:enhance>
    <Text
      Icon={Alias}
      label="username"
      icon_position="left"
      placeholder="Username"
      getText={(val) => {
        // user = val;
      }}
      className="w-full"
    />
    <Text
      Icon={Alias}
      label="fullName"
      placeholder="Full Name"
      className="w-full"
      getText={(val) => {
        // user = val;
      }}
    />
    <Text
      Icon={Email}
      label="email"
      placeholder="Email"
      className="w-full"
      getText={(val) => {
        // user = val;
      }}
    />

    <Text
      Icon={Padlock}
      label="password"
      placeholder="Password"
      className="w-full"
      maxlength={6}
      type="password"
      getText={(val) => {
        // user = val;
        password = val;
      }}
    />
    <Text
      Icon={Padlock}
      label="confirm_password"
      placeholder="Confirm Password"
      maxlength={6}
      className="w-full"
      type="password"
      getText={(val) => {
        // user = val;
        confirm_password = val;
      }}
    />
    <div class="flex justify-between w-full">
      <p
        class="text-red-500 font-semibold transition-all"
        style="opacity: {password_error.length ? '1' : '0'}"
      >
        {password_error}
      </p>

      <p class="my-3">
        Already have an account? <a class="underline" href="/login"
          >Login here</a
        >
      </p>
    </div>

    <Button className="block w-full rounded-xl font-semibold col-span-2 transition-all">Create Account</Button>
  </form>
</section>

<svelte:head>
  <title>Signup</title>
</svelte:head>
