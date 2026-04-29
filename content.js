let currentInput = null;
let suggestionText = "";
let timer;
let lastAccepted = "";

const ghost = document.createElement("div");
ghost.className = "ai-ghost-suggestion";
ghost.style.display = "none";
document.body.appendChild(ghost);

// detect valid text fields
function isTextField(el) {
  return (
    el.tagName === "TEXTAREA" ||
    (el.tagName === "INPUT" &&
      ["text", "search", "email", "url"].includes(el.type))
  );
}

// call local AI server
async function getSuggestion(text) {
  try {
    const res = await fetch("http://localhost:3000/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    return data.suggestion || "";
  } catch {
    return "";
  }
}

// get caret (cursor) position
function getCaretCoordinates(el) {
  const style = window.getComputedStyle(el);
  const rect = el.getBoundingClientRect();

  const mirror = document.createElement("div");
  document.body.appendChild(mirror);

  mirror.style.position = "absolute";
  mirror.style.visibility = "hidden";
  mirror.style.whiteSpace = "pre-wrap";
  mirror.style.wordWrap = "break-word";

  mirror.style.font = style.font;
  mirror.style.padding = style.padding;
  mirror.style.border = style.border;
  mirror.style.width = `${el.clientWidth}px`;

  mirror.textContent = el.value.substring(0, el.selectionStart);

  const span = document.createElement("span");
  span.textContent = "|";
  mirror.appendChild(span);

  const spanRect = span.getBoundingClientRect();
  const mirrorRect = mirror.getBoundingClientRect();

  const coordinates = {
    left:
      rect.left +
      window.scrollX +
      (spanRect.left - mirrorRect.left) -
      el.scrollLeft,
    top:
      rect.top +
      window.scrollY +
      (spanRect.top - mirrorRect.top) -
      el.scrollTop,
  };

  document.body.removeChild(mirror);
  return coordinates;
}

// show suggestion inline
function showSuggestion(el, suggestion) {
  if (!suggestion) {
    hideSuggestion();
    return;
  }

  const style = window.getComputedStyle(el);
  const caret = getCaretCoordinates(el);

  ghost.textContent = suggestion;
  ghost.style.display = "block";

  ghost.style.left = `${caret.left}px`;
  ghost.style.top = `${caret.top}px`;

  ghost.style.fontSize = style.fontSize;
  ghost.style.fontFamily = style.fontFamily;
  ghost.style.lineHeight = style.lineHeight;
}

// hide suggestion
function hideSuggestion() {
  ghost.style.display = "none";
  suggestionText = "";
}

// debounce input (performance optimization)
document.addEventListener("input", (e) => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    handleInput(e);
  }, 300);
});

// main logic
async function handleInput(e) {
  const el = e.target;

  if (!isTextField(el)) return;

  currentInput = el;

  const text = el.value;

  if (!text.trim()) {
    hideSuggestion();
    return;
  }

  // prevent repeating same suggestion
  if (lastAccepted && text.endsWith(lastAccepted)) {
    hideSuggestion();
    return;
  }

  const suggestion = await getSuggestion(text);

  if (!suggestion || text.endsWith(suggestion.trim())) {
    hideSuggestion();
    return;
  }

  suggestionText = suggestion;
  showSuggestion(el, suggestion);
}

// TAB to accept suggestion
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && currentInput && suggestionText) {
    e.preventDefault();

    const start = currentInput.selectionStart;
    const end = currentInput.selectionEnd;

    currentInput.value =
      currentInput.value.slice(0, start) +
      suggestionText +
      currentInput.value.slice(end);

    lastAccepted = suggestionText.trim();

    const newCursor = start + suggestionText.length;

    currentInput.selectionStart = newCursor;
    currentInput.selectionEnd = newCursor;

    currentInput.dispatchEvent(new Event("input", { bubbles: true }));

    hideSuggestion();
  }
});

// edge cases
window.addEventListener("scroll", hideSuggestion);
window.addEventListener("resize", hideSuggestion);

document.addEventListener("selectionchange", () => {
  if (
    currentInput &&
    currentInput.selectionStart !== currentInput.selectionEnd
  ) {
    hideSuggestion();
  }
});

document.addEventListener("blur", hideSuggestion, true);