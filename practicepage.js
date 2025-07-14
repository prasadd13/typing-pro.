const sentenceDisplay = document.getElementById("sentence");
const input = document.getElementById("input");
const keyboard = document.getElementById("keyboard");

const allSentences = {
  easy: [
    "Hello there!", "Typing is fun.", "Practice daily.", "Easy sentence.",
    "I can type fast.", "I love reading books.", "He drinks coffee daily.",
    "My dog barks loudly."
  ],
  medium: [
    "JavaScript improves web interactivity.", "Practice improves accuracy and speed.",
    "Medium level challenge ahead!", "Keep an eye on your typos.",
    "Typing gets better with effort.","Practice typing to improve speed.", "The quick brown fox jumps over the lazy dog.",
    "Never stop learning new skills.", "Typing faster takes daily practice.",
   
  ],
  hard: [
    "Symbols like @#$%^&* are important!", "Accuracy > speed: remember that!",
    "Shift + 2 gives @. Try it!", "Hard sentences are full of punctuation!",
    "Mistakes happen, learn and type again!", "Professional typists often reach speeds over 100 words per minute with high accuracy.",
    "To type efficiently, proper posture and finger positioning are essential techniques.",
    "Daily deliberate practice can drastically increase typing fluency over a few weeks.",
  
  ]
};

let sentences = [];
let index = 0;
let typed = "";
let currentSentence = "";
let timer;
let timeRemaining = 0;
let wpm = 0, mistakes = 0, correctChars = 0;
let isRunning = false;

const layout = [
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

function startSession() {
  clearInterval(timer);
  const level = document.getElementById("level").value;
  const timeLimit = parseInt(document.getElementById("time").value);
  sentences = [...allSentences[level]];

  index = 0;
  typed = "";
  currentSentence = sentences[index];
  input.value = "";
  isRunning = true;
  correctChars = 0;
  mistakes = 0;
  wpm = 0;

  timeRemaining = timeLimit;
  document.getElementById("timeLeft").innerText = timeRemaining;
  renderSentence();
  input.disabled = false;
  input.focus();

  timer = setInterval(() => {
    timeRemaining--;
    document.getElementById("timeLeft").innerText = timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(timer);
      isRunning = false;
      input.disabled = true;
    }
  }, 1000);
}

function loadNextSentence() {
  index = (index + 1) % sentences.length;
  currentSentence = sentences[index];
  typed = "";
  input.value = "";
  renderSentence();
}

function renderSentence() {
  sentenceDisplay.innerHTML = "";
  for (let i = 0; i < currentSentence.length; i++) {
    const span = document.createElement("span");
    span.innerText = currentSentence[i];
    if (i < typed.length) {
      span.style.color = currentSentence[i] === typed[i] ? "#0f0" : "#f00";
    }
    sentenceDisplay.appendChild(span);
  }
  showNextHint();
}

function updateMetrics() {
  const wordsTyped = correctChars / 5;
  const timeSpent = Math.max(1, (parseInt(document.getElementById("time").value) - timeRemaining) / 60);
  wpm = Math.round(wordsTyped / timeSpent);
  const accuracy = Math.max(0, Math.round((correctChars / (correctChars + mistakes)) * 100));

  document.getElementById("wpm").innerText = isFinite(wpm) ? wpm : 0;
  document.getElementById("accuracy").innerText = isFinite(accuracy) ? accuracy : 100;
  document.getElementById("mistakes").innerText = mistakes;
}

input.addEventListener("input", (e) => {
  if (!isRunning) return;

  const value = e.target.value;
  const currentChar = currentSentence[typed.length];
  const typedChar = value[typed.length];

  if (typedChar && typedChar !== currentChar) {
    mistakes++;
  } else if (typedChar === currentChar) {
    correctChars++;
  }

  typed = value;
  renderSentence();
  updateMetrics();

  if (typed === currentSentence) {
    setTimeout(loadNextSentence, 500);
  }
});

function createKeyboard() {
  keyboard.innerHTML = "";
  let shiftCount = 0;
  layout.forEach(row => {
    row.forEach(k => {
      const div = document.createElement("div");
      div.className = "key";
      let label = k.key;
      if (k.shift) label += "\n" + k.shift;

      if (["Backspace", "CapsLock", "Enter", "Shift", "Tab"].includes(k.key)) {
        div.classList.add("wide");
      } else if (k.key === "Space") {
        div.classList.add("extra-wide");
      }

      if (k.key === "Shift") {
        div.id = shiftCount === 0 ? "key_shift_left" : "key_shift_right";
        shiftCount++;
      } else {
        div.id = `key_${k.key.toLowerCase()}`;
      }

      div.innerText = label;
      keyboard.appendChild(div);
    });
  });
}

function clearHighlights() {
  document.querySelectorAll(".key").forEach(k => k.classList.remove("next", "active", "shiftHint"));
  document.querySelectorAll(".finger").forEach(f => f.classList.remove("nextFinger", "shiftFinger", "activeFinger"));
}

function highlightKey(k) {
  const keyId = k === " " ? "space" : k.toLowerCase();
  const el = document.getElementById(`key_${keyId}`);
  if (el) el.classList.add("next");
}

function highlightFinger(k) {
  const fingerNum = fingerMap[k.toLowerCase()];
  if (!fingerNum) return;
  const f = document.querySelector(`.fin-${fingerNum}_`);
  if (f) f.classList.add("nextFinger");
}

function getUnshiftedChar(ch) {
  const map = {
    "~": "`", "!": "1", "@": "2", "#": "3", "$": "4", "%": "5",
    "^": "6", "&": "7", "*": "8", "(": "9", ")": "0",
    "_": "-", "+": "=", "{": "[", "}": "]", "|": "\\",
    ":": ";", "\"": "'", "<": ",", ">": ".", "?": "/"
  };
  return map[ch] || ch.toLowerCase();
}

function showNextHint() {
  clearHighlights();

  const nextChar = currentSentence[typed.length];
  if (!nextChar) return;

  const shiftRequired = nextChar.match(/[A-Z~!@#$%^&*()_+{}|:"<>?]/);
  const baseKey = shiftRequired ? getUnshiftedChar(nextChar) : nextChar;

  highlightKey(baseKey);
  highlightFinger(nextChar);

  if (shiftRequired) {
    const fingerNum = fingerMap[nextChar.toLowerCase()];
    const useRightShift = fingerNum >= 1 && fingerNum <= 5;
    const shiftKey = document.querySelector(useRightShift ? "#key_shift_right" : "#key_shift_left");
    if (shiftKey) shiftKey.classList.add("shiftHint");

    const shiftFinger = useRightShift ? "fin-10_" : "fin-1_";
    const shiftFingerDiv = document.querySelector(`.${shiftFinger}`);
    if (shiftFingerDiv) shiftFingerDiv.classList.add("shiftFinger");
  }
}

document.addEventListener("keydown", (e) => {
  highlightKey(e.key);
  highlightFinger(e.key);
});

createKeyboard();

input.addEventListener("input", (e) => {
  if (!isRunning) return;

  const value = e.target.value;
  typed = value;

  // Mistake tracking: check only the new character
  if (typed.length <= currentSentence.length) {
    const inputChar = typed[typed.length - 1];
    const expectedChar = currentSentence[typed.length - 1];
    if (inputChar && inputChar !== expectedChar) {
      mistakes++;
    } else if (inputChar === expectedChar) {
      correctChars++;
    }
  }

  renderSentence();
  updateMetrics();

  // Proceed to next sentence regardless of mistakes
  if (typed.length >= currentSentence.length) {
    setTimeout(loadNextSentence, 500);
  }
});

function renderSentence() {
  sentenceDisplay.innerHTML = "";
  for (let i = 0; i < currentSentence.length; i++) {
    const span = document.createElement("span");
    span.innerText = currentSentence[i];
    if (i < typed.length) {
      span.style.color = currentSentence[i] === typed[i] ? "#0f0" : "#f00";
    }
    sentenceDisplay.appendChild(span);
  }
  showNextHint();
}

function resetSession() {
  clearInterval(timer);
  input.value = "";
  typed = "";
  correctChars = 0;
  mistakes = 0;
  wpm = 0;
  isRunning = false;
  timeRemaining = parseInt(document.getElementById("time").value);
  document.getElementById("timeLeft").innerText = timeRemaining;
  document.getElementById("wpm").innerText = 0;
  document.getElementById("accuracy").innerText = 0;
  document.getElementById("mistakes").innerText = 0;
  input.disabled = false;
  if (sentences.length > 0) {
    index = 0;
    currentSentence = sentences[index];
    renderSentence();
  } else {
    sentenceDisplay.innerHTML = "";
  }
  input.focus();
}



