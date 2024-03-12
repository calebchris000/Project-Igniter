export function appendChat(parent, text_input, className) {
  const bubble = document.createElement("p");
  bubble.className = className;
  const parse = text_input.replace(/\n/g, "<br>");
  bubble.innerHTML = parse;
  bubble.textContent && parent.appendChild(bubble);
}
