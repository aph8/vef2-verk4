// lib/api.js

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// --- CATEGORIES --- //

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Villa við að sækja flokka');
  const json = await res.json();
  return json.data || [];
}

export async function fetchCategory(slug) {
    const res = await fetch(`${API_BASE}/categories/${slug}`);
    if (!res.ok) {
      throw new Error(`Villa við að sækja flokk: ${res.status}`);
    }
    return await res.json();
  }

export async function createCategory(data) {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return await res.json();
}

export async function updateCategory(slug, data) {
  const res = await fetch(`${API_BASE}/categories/${slug}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return await res.json();
}

export async function deleteCategory(slug) {
  const res = await fetch(`${API_BASE}/categories/${slug}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return await res.json();
}

// --- QUESTIONS --- //

export async function createQuestion(data) {
  const res = await fetch(`${API_BASE}/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return await res.json();
}

export async function fetchQuestionsByCategory(slug) {
    const res = await fetch(`${API_BASE}/questions?category=${slug}`);
    if (!res.ok) {
      throw new Error(`Villa við að sækja spurningar: ${res.status}`);
    }
    return await res.json();
  }


