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
