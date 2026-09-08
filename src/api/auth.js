import { api, storeAuth, clearAuth } from './client';

export async function signup({ username, email, password }) {
  return api.post('/signup/', { username, email, password });
}

export async function signin({ username, password }) {
  const data = await api.post('/signin/', { username, password });
  storeAuth({ token: data.token, id: data.id, username: data.username });
  return data;
}

export async function logout() {
  try {
    await api.post('/logout/', undefined, { auth: true });
  } finally {
    clearAuth();
  }
}
