<script>
  import UserNav from "../../../../lib/top/user-chat/index.svelte";
  import image from "../../../../lib/images/man2.png";
  import { appendChat } from "../../../../core/utils/index";
  import "./style.css";
  /** @type {import('./$types').PageData} */
  export let data;

  let textArea;
  let text_input = "";
  let chatBody;

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
    if (input.key === "Shift") {
      shift = true;
      return;
    }
    if (input.key !== "Enter") {
      shift = false;
    }
    if (shift && input.key === "Enter") {
      shift = false;
      console.log("shift + enter");
      return;
    }

    if (input.key === "Enter") {
      input.preventDefault();
      input.target.style.height = "3.5rem";

      if (chatBody.scrollHeight > chatBody.clientHeight) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
      appendChat(chatBody, text_input, "you");
      text_input = "";
    }
  }
</script>

<section class="">
  <div>
    <UserNav {image} name="Mark Spencer" is_active={true} />
  </div>

  <div
    bind:this={chatBody}
    class="chat-body overflow-y-auto my-4 mb-10 relative flex flex-col gap-2 py-16"
  >
    <p class="you">Hello</p>
    <p class="recipient">Hi</p>
    <p class="you">How u doing?</p>
  </div>

  <div
    class=" absolute bg-gray-500 h-32 px-5 flex items-center gap-5 bottom-0 rounded-md left-0 right-0"
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
            appendChat(chatBody, text_input, "you");
            textArea.style.height = "3.5rem";
            text_input = "";
          }}
          on:click={() => {
            appendChat(chatBody, text_input, "you");
            text_input = "";
            textArea.style.height = "3.5rem";
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
