<script>
  import { invalidate, goto } from "$app/navigation";
  import { onDestroy } from "svelte";
  import { socket } from "./../../../../core/chat-core/index.js";
  import UserNav from "../../../../lib/top/user-chat/index.svelte";
  import { appendChat, nonAlphaNumeric } from "../../../../core/utils/index";
  import "./style.css";
  /** @type {import('./$types').PageData} */
  export let data;

  const { own_id, recipientId } = data.params;
  let textArea;
  let text_input = "";
  let chatBody;
  $: no_chat = true;
  const { socketId } = data.user;
  $: fullName = data.user.fullName;
  $: status = data.user.status;
  $: profileImg = data.user.profileImg;
  $: is_typing = false;

  $: timeout = null;

  const messages = data.messages;

  $: if (messages.length) {
    no_chat = false;
  }

  $: formatStatus = status
    ? `${status[0].toUpperCase()}${status.slice(1)}`
    : "";

  $: if (is_typing) {
    timeout = setTimeout(() => {
      is_typing = false;
    }, 3000);
  }
  function handleOverflow() {
    if (chatBody && chatBody.scrollHeight > chatBody.clientHeight) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  for (let i = 0; i < messages.length; i++) {
    const element = messages[i];

    if (element?.receiver === data.params.own_id && !element.read) {
      socket.emit("message_read", { id: element?._id });
    }
  }

  function resizeInput(e) {
    const input = e.target;
    if (!input.value) {
      input.style.height = "3.5rem";
      return;
    }

    input.style.height = `${input.scrollHeight}px`;
  }

  let shift = false;

  function handleInput(input) {
    if (!nonAlphaNumeric.includes(input.key)) {
      socket.emit("typing", { sender: own_id, recipient: recipientId });
      console.log(input.key);
    }
    if (input.key === "Shift") {
      shift = true;
      return;
    }
    if (input.key !== "Enter") {
      shift = false;
    }
    if (shift && input.key === "Enter") {
      shift = false;
      return;
    }

    if (input.key === "Enter") {
      input.preventDefault();
      if (!text_input) return;
      input.target.style.height = "3.5rem";

      if (chatBody.scrollHeight > chatBody.clientHeight) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
      socket.emit("chat", {
        sender: own_id,
        recipient: recipientId,
        content: text_input,
        type: "text",
      });
      appendChat(chatBody, text_input, "you");
      no_chat && (no_chat = false);
      text_input = "";
      handleOverflow();
    }
  }

  function handleSubmit() {
    appendChat(chatBody, text_input, "you");
    no_chat && (no_chat = false);
    handleOverflow();
    socket.emit("chat", {
      sender: own_id,
      recipient: recipientId,
      content: text_input,
      type: "text",
    });
    text_input = "";
    textArea.style.height = "3.5rem";
  }

  socket.on("new_message", (d) => {
    const { content, createdAt, _id, recipient } = d;
    if (own_id === recipient) {
      appendChat(chatBody, content, "recipient");
      no_chat && (no_chat = false);

      handleOverflow();
      socket.emit("message_read", { id: _id });
    }
  });

  socket.on("user_disconnected", () => {
    typeof window !== "undefined" && invalidate("api:userId");
  });

  socket.on("new_user", () => {
    typeof window !== "undefined" && invalidate("api:userId");
  });

  socket.on("user_typing", ({ sender, recipient }) => {
    if (sender === recipientId) {
      is_typing = true;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        is_typing = false;
      }, 3000);
    }
  });

  onDestroy(() => {
    socket.off("new_message");
    socket.off("user_disconnected");
  });
</script>

<section class="">
  <div>
    <UserNav
      image={profileImg}
      name={fullName}
      typing={is_typing}
      status={formatStatus}
    />
  </div>

  <div
    bind:this={chatBody}
    class="chat-body overflow-y-auto my-4 mb-10 relative flex flex-col gap-2 py-16"
  >
    {#if messages.length}
      {#each messages as message}
        {#if message.sender === own_id}
          <p class="you">{message.content}</p>
        {:else}
          <p class="recipient">{message.content}</p>
        {/if}
      {/each}
    {:else if no_chat}
      <p class="absolute bottom-0 text-center left-0 right-0 font-medium">
        No messages yet. Message to start chatting.
      </p>
    {/if}
  </div>

  <div
    class=" absolute bg-gray-500 h-32 px-5 flex items-center gap-5 bottom-0 rounded-md rounded-ee-none rounded-bl-none left-0 right-0"
  >
    <textarea
      bind:value={text_input}
      bind:this={textArea}
      on:input={(e) => resizeInput(e)}
      on:keydown={(e) => handleInput(e)}
      placeholder="Message"
      class=" bg-gray-300 max-h-28 overflow-y-hidden overflow-auto placeholder:text-gray-600 resize-none w-full h-14 rounded-xl py-4 outline-none px-3"
      type="text"
      name=""
      id=""
    />
    <div>
      {#if text_input.trim().length}
        <svg
          role="button"
          on:keydown={() => {
            handleSubmit();
          }}
          on:click={() => {
            handleSubmit();
          }}
          tabindex={2}
          class="cursor-pointer text-5xl text-black border border-white rounded-full bg-white p-2"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m5 12l-.604-5.437C4.223 5.007 5.825 3.864 7.24 4.535l11.944 5.658c1.525.722 1.525 2.892 0 3.614L7.24 19.466c-1.415.67-3.017-.472-2.844-2.028zm0 0h7"
          /></svg
        >
      {:else}
        <svg
          class="cursor-pointer text-5xl text-black border border-white rounded-full bg-white p-2"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor">
            <path d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6" />
            <path
              fill-rule="evenodd"
              d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-2 0a8 8 0 1 1-16 0a8 8 0 0 1 16 0"
              clip-rule="evenodd"
            />
          </g>
        </svg>
      {/if}
    </div>
  </div>
</section>
