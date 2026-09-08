const API_BASE_URL = (process.env.REACT_APP_API_URL || 'https://readerapi.onrender.com').replace(/\/+$/, '');

const AUTH_TOKEN_KEY = 'authToken';
const USER_ID_KEY = 'userId';
const USERNAME_KEY = 'username';

export function getStoredAuth() {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const id = localStorage.getItem(USER_ID_KEY);
    const username = localStorage.getItem(USERNAME_KEY);
    if (!token || !id || !username) return null;
    return { token, id, username };
  } catch {
    return null;
  }
}

export function storeAuth({ token, id, username }) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_ID_KEY, id);
  localStorage.setItem(USERNAME_KEY, username);
}

export function clearAuth() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

/**
 * Thin fetch wrapper: builds the full URL, attaches the auth token when present,
 * parses JSON, and turns non-2xx responses into a normalized ApiError instead of
 * letting raw backend errors/HTML leak into the UI.
 */
export async function apiRequest(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const stored = getStoredAuth();

  if (auth && stored) {
    headers['Authorization'] = `Token ${stored.token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (networkError) {
    throw new ApiError('Unable to reach the server. Check your connection and try again.', 0, null);
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // Some responses (e.g. 204) have no body.
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearAuth();
    }
    const message =
      (data && (data.detail || firstFieldError(data))) ||
      'Something went wrong. Please try again.';
    throw new ApiError(message, response.status, data);
  }

  return data;
}

function firstFieldError(data) {
  if (typeof data !== 'object' || data === null) return null;
  const firstKey = Object.keys(data)[0];
  if (!firstKey) return null;
  const value = data[firstKey];
  return Array.isArray(value) ? value[0] : String(value);
}

export const api = {
  get: (path, opts) => apiRequest(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => apiRequest(path, { ...opts, method: 'POST', body }),
};
