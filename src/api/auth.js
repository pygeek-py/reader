import { api, storeAuth, clearAuth } from './client';

export async function signup({ username, email, password }) {
  const data = await api.post('/signup/', { username, email, password });
  storeAuth({ token: data.token, id: data.id, username: data.username, isAdmin: data.is_admin });
  return data;
}

export async function signin({ username, password }) {
  const data = await api.post('/signin/', { username, password });
  storeAuth({ token: data.token, id: data.id, username: data.username, isAdmin: data.is_admin });
  return data;
}

export async function logout() {
  // Best-effort: the local session is cleared either way, so a failed or
  // already-invalid token shouldn't stop the caller from navigating away.
  try {
    await api.post('/logout/', undefined, { auth: true });
  } catch {
    // ignore
  } finally {
    clearAuth();
  }
}

export async function requestPasswordReset(email) {
  return api.post('/password-reset/', { email });
}

export async function confirmPasswordReset({ uid, token, password }) {
  return api.post('/password-reset-confirm/', { uid, token, password });
}
