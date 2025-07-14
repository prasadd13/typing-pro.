// 2.js

let sentences = [];
let index = 0;
let currentSentence = "";
let typed = "";
let timerId = null;
let startTime = 0;
let initialSeconds = 0;
let correctChars = 0;
let mistakes = 0;
let isRunning = false;

const sentenceDisplay = document.getElementById("sentence");
const input = document.getElementById("input");
const title = document.getElementById("lesson-title");
const keyboard = document.getElementById("keyboard");
const levelSel = document.getElementById("level");
const timeSel = document.getElementById("time");
const startBtn = document.getElementById("startButton");
const resetBtn = document.getElementById("resetBtn");

const layout = [
  // full keyboard layout rows...
  
[
    { key: "`", shift: "~" }, { key: "1", shift: "!" }, { key: "2", shift: "@" },
    { key: "3", shift: "#" }, { key: "4", shift: "$" }, { key: "5", shift: "%" },
    { key: "6", shift: "^" }, { key: "7", shift: "&" }, { key: "8", shift: "*" },
    { key: "9", shift: "(" }, { key: "0", shift: ")" }, { key: "-", shift: "_" },
    { key: "=", shift: "+" }, { key: "Backspace" }
  ],
  [
    { key: "Tab" }, { key: "Q" }, { key: "W" }, { key: "E" }, { key: "R" }, { key: "T" },
    { key: "Y" }, { key: "U" }, { key: "I" }, { key: "O" }, { key: "P" },
    { key: "[", shift: "{" }, { key: "]", shift: "}" }, { key: "\\", shift: "|" }
  ],
  [
    { key: "CapsLock" }, { key: "A" }, { key: "S" }, { key: "D" }, { key: "F" },
    { key: "G" }, { key: "H" }, { key: "J" }, { key: "K" }, { key: "L" },
    { key: ";", shift: ":" }, { key: "'", shift: "\"" }, { key: "Enter" }
  ],
  [
    { key: "Shift" }, { key: "Z" }, { key: "X" }, { key: "C" }, { key: "V" },
    { key: "B" }, { key: "N" }, { key: "M" },
    { key: ",", shift: "<" }, { key: ".", shift: ">" }, { key: "/", shift: "?" },
    { key: "Shift" }
  ],
    [{ key: "Space" }]


];
const fingerMap = {
  // same key-to-finger mapping...
    '`': 1, '~': 1, '1': 1, '!': 1, '2': 2, '@': 2, '3': 3, '#': 3, '4': 4, '$': 4,
  '5': 5, '%': 5, '6': 6, '^': 6, '7': 6, '&': 6, '8': 7, '*': 7,
  '9': 8, '(': 8, '0': 9, ')': 9, '-': 10, '_': 10, '=': 10, '+': 10,
  'q': 1, 'a': 1, 'z': 1, 'w': 2, 's': 2, 'x': 2, 'e': 3, 'd': 3, 'c': 3,
  'r': 4, 'f': 4, 'v': 4, 't': 4, 'g': 4, 'b': 4,
  'y': 6, 'h': 6, 'n': 6, 'u': 6, 'j': 6, 'm': 6,
  'i': 7, 'k': 7, ',': 7, '<': 7, 'o': 8, 'l': 8, '.': 8, '>': 8,
  'p': 9, ';': 9, ':': 9, '/': 9, '?': 9,
  '[': 10, '{': 10, ']': 10, '}': 10, '\\': 10, '|': 10, "'": 10, '"': 10,
  ' ': 5
};

// Setup on load
document.addEventListener("DOMContentLoaded", () => {
  const lessonKey = new URLSearchParams(location.search).get("lesson");
  if (!lessonKey || !lessons[lessonKey]) {
    alert("Invalid lesson.");
    return;
  }

  levelSel.addEventListener("change", loadLevel);
  startBtn.addEventListener("click", startSession);
  resetBtn.addEventListener("click", resetSession);

  loadLevel();  // initial load
  createKeyboard();
});

// Load sentences for the selected lesson and level
function loadLevel() {
  const lessonKey = new URLSearchParams(location.search).get("lesson");
  sentences = lessons[lessonKey][levelSel.value].slice();
  resetSession();
}



// Start the typing session
function startSession() {
  if (!sentences.length) return alert("No sentences.");

  clearInterval(timerId);
  index = correctChars = mistakes = 0;
  isRunning = true;
  initialSeconds = parseInt(timeSel.value, 10);
  startTime = Date.now();

  input.disabled = false;
  input.value = typed = "";
  input.focus();

  loadNextSentence();
  timerId = setInterval(updateTime, 200);
}

// Update the countdown timer
function updateTime() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const left = Math.max(0, initialSeconds - elapsed);
  document.getElementById("timeLeft").innerText = left;

  if (left <= 0) endSession();
}

// End session when time is up
function endSession() {
  clearInterval(timerId);
  isRunning = false;
  input.disabled = true;
}

// Reset the typing session
function resetSession() {
  clearInterval(timerId);
  isRunning = false;
  correctChars = mistakes = 0;
  updateStats(0, 100, 0);
  document.getElementById("timeLeft").innerText = timeSel.value;

  input.disabled = true;
  input.value = typed = "";
  index = 0;
  if (sentences.length) {
    currentSentence = sentences[0];
    renderSentence();
  } else sentenceDisplay.innerHTML = "";
}

// Load the next sentence
function loadNextSentence() {
  currentSentence = sentences[index % sentences.length];
  index++;
  typed = "";
  input.value = "";
  renderSentence();
}

// Display the sentence chars with coloring
function renderSentence() {
  sentenceDisplay.innerHTML = "";
  [...currentSentence].forEach((ch, i) => {
    const span = document.createElement("span");
    span.textContent = ch;
    if (i < typed.length) {
      span.style.color = typed[i] === ch ? "#0f0" : "#f00";
    }
    sentenceDisplay.appendChild(span);
  });
  highlightNextKey();
}

// Track user input
input.addEventListener("input", () => {
  if (!isRunning) return;
  const val = input.value;
  const pos = val.length - 1;
  if (pos >= 0) {
    if (val[pos] === currentSentence[pos]) correctChars++;
    else mistakes++;
  }
  typed = val;
  renderSentence();
  updateMetrics();

  if (typed.length >= currentSentence.length) {
    setTimeout(loadNextSentence, 300);
  }
});

// Update WPM, accuracy, mistakes
function updateMetrics() {
  const words = correctChars / 5;
  const elapsedMin = ((initialSeconds - parseInt(document.getElementById("timeLeft").innerText)) / 60) || 1;
  const wpm = Math.round(words / elapsedMin);
  const accuracy = Math.round((correctChars / Math.max(1, correctChars + mistakes)) * 100);

  updateStats(wpm, accuracy, mistakes);
}

// Helper to update metrics display
function updateStats(wpm, accuracy, mistakes) {
  document.getElementById("wpm").innerText = isFinite(wpm) ? wpm : 0;
  document.getElementById("accuracy").innerText = accuracy;
  document.getElementById("mistakes").innerText = mistakes;
}

// Build keyboard layout
function createKeyboard() {
  keyboard.innerHTML = "";
  let shiftCount = 0;
  layout.forEach(row => row.forEach(k => {
    const div = document.createElement("div");
    div.className = "key";
    div.innerText = k.key + (k.shift ? "\n" + k.shift : "");
    if (["Backspace","CapsLock","Enter","Shift","Tab"].includes(k.key)) div.classList.add("wide");
    else if (k.key === "Space") div.classList.add("extra-wide");

    if (k.key === "Shift") {
      div.id = `key_shift_${shiftCount++ ? "right" : "left"}`;
    } else {
      div.id = `key_${k.key.toLowerCase()}`;
    }

    keyboard.appendChild(div);
  }));
}


function highlightNextKey() {
  clearHighlights();
  const next = currentSentence[typed.length];
  if (!next) return;

  const base = getBaseChar(next);
  const keyEl = document.getElementById(`key_${base}`);
  if (keyEl) {
    keyEl.classList.add("next");
    if (base === "space") keyEl.classList.add("blink"); // ADD THIS LINE
  }

  highlightFinger(next, "nextFinger");

  if (needsShift(next)) {
    const useRight = fingerMap[next.toLowerCase()] >= 6;
    document.getElementById(`key_shift_${useRight ? "right" : "left"}`)?.classList.add("shiftHint");
    highlightFinger(next, "shiftFinger");
  }
}

document.addEventListener("keydown", e => {
  const base = getBaseChar(e.key);
  const keyEl = document.getElementById(`key_${base}`);
  if (keyEl) {
    keyEl.classList.add("active");
    if (base === "space") keyEl.classList.remove("blink"); // ADD THIS LINE
  }
  highlightFinger(e.key, "activeFinger");
});

  
// Live key/finger highlight on typing
document.addEventListener("keydown", e => {
  const base = getBaseChar(e.key);
  document.getElementById(`key_${base}`)?.classList.add("active");
  highlightFinger(e.key, "activeFinger");
});

// Clear keyboard & finger highlights
function clearHighlights() {
  document.querySelectorAll(".key").forEach(el => el.classList.remove("next","active","shiftHint"));
  document.querySelectorAll(".finger").forEach(el => el.classList.remove("nextFinger","shiftFinger","activeFinger"));
}



// Utility: map shifted chars to base
function getBaseChar(ch) {
  const map = {"~":"`","!":"1","@":"2","#":"3","$":"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0","_":"-","+":"=","{":"[","}":"]","|":"\\",":":";","\"":"'","<":",",">":".","?":"/"};
  
    if (ch === " ") return "space"; 
  
  
  return map[ch] || ch.toLowerCase();
}

// Check if char needs shift
function needsShift(ch) {
  return /[A-Z~!@#$%^&*()_+{}|:"<>?]/.test(ch);
}

// Highlight the finger in the hand diagram
function highlightFinger(ch, cls) {
  const num = fingerMap[ch.toLowerCase()];
  if (num) document.querySelector(`.fin-${num}_`)?.classList.add(cls);
}


document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const lessonKey = params.get("lesson");
  if (!lessonKey || !lessons[lessonKey]) {
    alert("Invalid lesson.");
    return;
  }

  // Capitalize/display friendly lesson name
  const titleEl = document.getElementById("lessonTitle");
  const nicely = lessonKey
    .replace(/^lesson/, "Lesson ")
    .replace(/([a-z])(\d+)/i, (_, p1, p2) => p1 + p2);
  titleEl.textContent = `TypingPro – ${nicely}`;

  // Existing listeners (level change, buttons...)
  levelSel.addEventListener("change", loadLevel);
  startBtn.addEventListener("click", startSession);
  resetBtn.addEventListener("click", resetSession);

  loadLevel();
  createKeyboard();
});

document.getElementById("backBtn").addEventListener("click", () => {
  history.back();
});

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", handleSubmit);

function handleSubmit() {
  if (!isRunning) return;
  // Immediately end the session
  endSession();

  // Show final metrics (forces update in case it's mid-typing)
  updateMetrics();

  // Disable input to stop typing
  input.disabled = true;

  // Disable Start/Submit buttons to prevent misuse
  startBtn.disabled = false;  // you can re-enable start 
  submitBtn.disabled = true;
}
