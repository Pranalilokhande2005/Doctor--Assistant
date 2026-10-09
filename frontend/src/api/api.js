const BASE_URL = 'http://localhost:8000/api';

export async function createPatient(data) {
  const res = await fetch(`${BASE_URL}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getPatient(id) {
  const res = await fetch(`${BASE_URL}/patients/${id}`);
  return res.json();
}

export async function askGemini(prompt) {
  const res = await fetch(`${BASE_URL}/gemini`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  return res.json();
}

export async function uploadReport(formData) {
  const res = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  });
  return res.json();
}
