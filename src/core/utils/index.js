export function appendChat(parent, text_input, className) {
  if (!parent) return;
  const bubble = document.createElement("p");
  bubble.className = className;
  const parse = text_input.replace(/\n/g, "<br>");
  bubble.innerHTML = parse;
  bubble.textContent && parent.appendChild(bubble);
}

export function userData() {
  const data = "";

  if (!data) {
    return null;
  }
  return JSON.parse(data);
}
