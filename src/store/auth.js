import axios from 'axios';
import Cookies from 'js-cookie';
import { apiKey, databaseUrl } from '../firebase';

const cookieNames = ['jwt', 'tokenExpirationDate', 'UID'];
const cookieOptions = { sameSite: 'Lax', secure: location.protocol === 'https:' };
let logoutTimer;

function scheduleLogout(commit, expirationDate) {
  clearTimeout(logoutTimer);
  logoutTimer = setTimeout(() => commit('logout'), expirationDate - Date.now());
}

function clearCookies() {
  cookieNames.forEach((name) => Cookies.remove(name));
}

function initialSession() {
  const token = Cookies.get('jwt');
  const tokenExpirationDate = Number(Cookies.get('tokenExpirationDate'));

  if (token && tokenExpirationDate > Date.now()) {
    return { token, tokenExpirationDate, userId: Cookies.get('UID') || null };
  }

  clearCookies();
  return { token: null, tokenExpirationDate: null, userId: null };
}

function requireFirebaseConfig() {
  if (!apiKey || !import.meta.env.VITE_FIREBASE_DATABASE_URL) {
    throw new Error('Add VITE_FIREBASE_API_KEY and VITE_FIREBASE_DATABASE_URL to .env.');
  }
}

function authError(error) {
  const code = error.response?.data?.error?.message;
  const messages = {
    EMAIL_EXISTS: 'This email is already registered.',
    INVALID_EMAIL: 'Enter a valid email address.',
    WEAK_PASSWORD: 'Use a password with at least 8 characters.',
    INVALID_LOGIN_CREDENTIALS: 'Email or password is incorrect.',
    EMAIL_NOT_FOUND: 'Email or password is incorrect.',
    INVALID_PASSWORD: 'Email or password is incorrect.',
  };
  return new Error(messages[code] || 'Authentication failed. Please try again.');
}

export default {
  namespaced: true,
  state: () => ({ ...initialSession(), userLogin: {} }),
  mutations: {
    setUserLogin(state, userData) {
      state.userLogin = userData;
    },
    setSession(state, { idToken, expiresIn, userId, userData }) {
      const expirationDate = Date.now() + Number(expiresIn) * 1000;
      const options = { ...cookieOptions, expires: new Date(expirationDate) };

      state.token = idToken;
      state.tokenExpirationDate = expirationDate;
      state.userId = userId;
      state.userLogin = userData;
      Cookies.set('jwt', idToken, options);
      Cookies.set('tokenExpirationDate', String(expirationDate), options);
      Cookies.set('UID', userId, options);
    },
    logout(state) {
      clearTimeout(logoutTimer);
      state.token = null;
      state.tokenExpirationDate = null;
      state.userId = null;
      state.userLogin = {};
      clearCookies();
    },
  },
  actions: {
    async restore({ commit, state }) {
      const token = state.token;
      if (!token) return;
      scheduleLogout(commit, state.tokenExpirationDate);
      if (!state.userId || !databaseUrl) return;

      try {
        const { data } = await axios.get(`${databaseUrl}/user/${state.userId}.json`, {
          params: { auth: token },
        });
        if (state.token === token) commit('setUserLogin', data || {});
      } catch {
        // The signed-in menu only needs the token.
      }
    },
    async register({ commit }, payload) {
      requireFirebaseConfig();

      let data;
      try {
        ({ data } = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
          { email: payload.email, password: payload.password, returnSecureToken: true },
        ));
      } catch (error) {
        throw authError(error);
      }

      const userData = {
        userId: data.localId,
        firstname: payload.firstname,
        lastname: payload.lastname,
        username: payload.username,
        email: payload.email,
        imageLink: payload.imageLink,
      };

      try {
        await axios.put(`${databaseUrl}/user/${data.localId}.json`, userData, {
          params: { auth: data.idToken },
        });
      } catch {
        throw new Error('Account created, but your profile could not be saved. Please sign in.');
      }

      commit('setSession', { ...data, userId: data.localId, userData });
      scheduleLogout(commit, Date.now() + Number(data.expiresIn) * 1000);
    },
  },
};
