export function appendChat(parent, text_input, className) {
  if (!parent) return;
  const bubble = document.createElement("p");
  bubble.className = className;
  const parse = text_input.replace(/\n/g, "<br>");
  bubble.innerHTML = parse;
  if (bubble.textContent.length > 500) {
    bubble.textContent = `${bubble.textContent.slice(0, 500)}...`;
    const read_more = document.createElement("button");
    read_more.className = "read_more";
    read_more.textContent = "Read more";
    read_more.onclick = () => {
      bubble.textContent = parse;
    };
    bubble.appendChild(read_more)
  }
  bubble.textContent && parent.appendChild(bubble);
}

export function userData() {
  const data = "";

  if (!data) {
    return null;
  }
  return JSON.parse(data);
}

export const nonAlphaNumeric = [
  "Control",
  "Enter",
  "Alt",
  "Escape",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  "F13",
  "AudioVolumeUp",
  "AudioVolumeDown",
];

export function parseCookie(name) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];

    const [key, value] = cookie.split("=");

    if (key.trim() === name) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    }
  }
  return "";
}

export function clearCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
