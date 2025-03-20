const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Sækir alla flokka frá vefþjónustu.
 * @returns {Promise<Array>} Fylki af flokkum.
 */
export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Villa við að sækja flokka');
  const json = await res.json();
  return json.data || [];
}

/**
 * Sækir einn flokk eftir slug.
 * @param {string} slug - Slug á flokki.
 * @returns {Promise<Object>} Flokkurinn sem sóttur var.
 */
export async function fetchCategory(slug) {
  const res = await fetch(`${API_BASE}/categories/${slug}`);
  if (!res.ok) {
    throw new Error(`Villa við að sækja flokk: ${res.status}`);
  }
  return await res.json();
}

/**
 * Býr til nýjan flokk.
 * @param {Object} data - Gögn fyrir nýjan flokk.
 * @returns {Promise<Object>} Nýji flokkurinn.
 */
export async function createCategory(data) {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return await res.json();
}

/**
 * Uppfærir flokk eftir slug.
 * @param {string} slug - Slug á flokki.
 * @param {Object} data - Gögn fyrir uppfærslu.
 * @returns {Promise<Object>} Uppfærður flokkur.
 */
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

/**
 * Eyðir flokki eftir slug.
 * @param {string} slug - Slug á flokki.
 * @returns {Promise<Object>} Svar frá eyðingu.
 * @throws {Error} Ef eyðing mistekst.
 */
export async function deleteCategory(slug) {
  const res = await fetch(`${API_BASE}/categories/${slug}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    let errorMessage = "Failed to delete category";
    try {
      const errorData = await res.json();
      errorMessage = errorData.message;
    } catch (err) {}
    throw new Error(errorMessage);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

/**
 * Býr til nýja spurningu.
 * @param {Object} data - Gögn spurningar.
 * @returns {Promise<Object>} Nýja spurningin.
 */
export async function createQuestion(data) {
  const res = await fetch(`${API_BASE}/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return await res.json();
}

/**
 * Sækir allar spurningar eftir flokkaslugi.
 * @param {string} slug - Slug á flokki.
 * @returns {Promise<Object>} Gögn spurninga.
 */
export async function fetchQuestionsByCategory(slug) {
  const res = await fetch(`${API_BASE}/questions?category=${slug}`);
  if (!res.ok) throw new Error(`Villa við að sækja spurningar: ${res.status}`);
  return await res.json();
}

/**
 * Deletes a question by id.
 * @param {number|string} id - The id of the question to delete.
 * @returns {Promise<Object>} The deletion response.
 */
export async function deleteQuestion(id) {
  const res = await fetch(`${API_BASE}/questions/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    let errorMessage = "Failed to delete question";
    try {
      const errorData = await res.json();
      errorMessage = errorData.message;
    } catch (err) {}
    throw new Error(errorMessage);
  }
  try {
    return await res.json();
  } catch (err) {
    return {};
  }
}

/**
 * Sækir spurningu eftir id.
 * @param {number|string} id - Id spurningarinnar.
 * @returns {Promise<Object>} Spurningin sem sótt var.
 */
export async function fetchQuestionById(id) {
  const res = await fetch(`${API_BASE}/questions/${id}`);
  if (!res.ok) throw new Error(`Villa við að sækja spurningu: ${res.status}`);
  return await res.json();
}

/**
 * Uppfærir spurningu eftir id.
 * @param {number|string} id - Id spurningarinnar.
 * @param {Object} data - Uppfærslugögn fyrir spurningu.
 * @returns {Promise<Object>} Uppfærða spurningin.
 */
export async function updateQuestion(id, data) {
  const res = await fetch(`${API_BASE}/questions/${id}`, {
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
