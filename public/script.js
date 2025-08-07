document.getElementById('resume-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    contact: document.getElementById('contact').value,
    experience: document.getElementById('experience').value,
    skills: document.getElementById('skills').value,
    education: document.getElementById('education').value
  };

  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  const preview = document.getElementById('preview');
  preview.textContent = json.text;
  document.getElementById('download').disabled = false;
});

document.getElementById('template').addEventListener('change', (e) => {
  const preview = document.getElementById('preview');
  preview.className = e.target.value;
});

document.getElementById('color').addEventListener('input', (e) => {
  document.documentElement.style.setProperty('--accent', e.target.value);
});

document.getElementById('download').addEventListener('click', () => {
  window.print();
});

// Chat functionality
const chatHistory = [];

function appendMessage(role, text) {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.textContent = text;
  document.getElementById('chat-history').appendChild(div);
}

document.getElementById('chat-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;
  appendMessage('user', message);
  chatHistory.push({ role: 'user', content: message });
  input.value = '';

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: chatHistory })
  });
  const data = await res.json();
  const reply = data.reply || '';
  appendMessage('assistant', reply);
  chatHistory.push({ role: 'assistant', content: reply });

  if (data.color) {
    document.documentElement.style.setProperty('--accent', data.color);
  }
  if (data.preview) {
    document.getElementById('preview').textContent = data.preview;
  }
});
