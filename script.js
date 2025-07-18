const scriptBox = document.getElementById('scriptText');
const wordCount = document.getElementById('wordCount');
const charList = document.getElementById('characterList');

// Load saved script
window.addEventListener('load', () => {
  const saved = localStorage.getItem('script');
  if (saved) scriptBox.value = saved;
  updateWordCount();
});

// Auto-save on input
scriptBox.addEventListener('input', () => {
  localStorage.setItem('script', scriptBox.value);
  updateWordCount();
});

// Update word count
function updateWordCount() {
  const text = scriptBox.value.trim();
  const words = text.length ? text.split(/\s+/).length : 0;
  wordCount.textContent = `Words: ${words}`;
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

// Clear script
function clearScript() {
  if (confirm('Clear the script?')) {
    scriptBox.value = '';
    localStorage.removeItem('script');
    updateWordCount();
  }
}

// Download script
function downloadScript() {
  const blob = new Blob([scriptBox.value], { type: 'text/plain' });
  const link = document.createElement('a');
  link.download = 'script.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
}

// Load templates
function loadTemplate(type) {
  const templates = {
    film: "INT. ROOM – DAY\n\nCHARACTER 1:\nHello!\n\nCHARACTER 2:\nHi there!",
    youtube: "Hey everyone! Welcome back to the channel.\n\nToday, we’re talking about...",
    podcast: "Host: Welcome to another episode of ScriptTalk.\n\nGuest: Thank you for having me!"
  };
  scriptBox.value = templates[type] || "";
  updateWordCount();
}

// Add character
function addCharacter() {
  const name = document.getElementById('charName').value.trim();
  const role = document.getElementById('charRole').value.trim();
  if (name) {
    const entry = document.createElement('div');
    entry.textContent = `${name} - ${role}`;
    entry.onclick = () => insertCharacter(name);
    charList.appendChild(entry);
    document.getElementById('charName').value = '';
    document.getElementById('charRole').value = '';
  }
}

function insertCharacter(name) {
  const pos = scriptBox.selectionStart;
  const before = scriptBox.value.substring(0, pos);
  const after = scriptBox.value.substring(pos);
  scriptBox.value = `${before}${name.toUpperCase()}: \n${after}`;
  scriptBox.focus();
  updateWordCount();
}

// Mock AI Suggestion
function aiSuggest() {
  const ideas = [
    "Add a plot twist where the hero is actually the villain.",
    "Introduce a flashback that changes the viewer’s understanding.",
    "Have a dramatic confrontation scene."
  ];
  const rand = ideas[Math.floor(Math.random() * ideas.length)];
  alert(`AI Suggestion:\n${rand}`);
}

