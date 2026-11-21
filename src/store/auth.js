import axios from "axios";
import Cookies from "js-cookie";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore ()
const router = useRouter ()

const login = async () => {
    await store.dispatch ("auth/getLoginData", loginData);
    router.push("/")
}

export default {
  namespaced: true,
  state() {
    return {
      token: null,
      tokenExpiratonDate: null,
      userLogin: {},
      isLogin: false,
    };
  },
  mutations: {
    setToken(state, { idToken, expiresIn }) {
      state.token = idToken;
      state.tokenExpirationDate = expiresIn;
      Cookies.set("tokenExpirationDate", expiresIn);
      Cookies.set("jwt", idToken);
    },
    SetUserLogin(state, { userData, loginStatus }) {
      state.userLogin = userData;
      state.isLogin = loginStatus;
    },
  },

  actions: {
    async getRegisterData({ commit, dispatch }, payload) {
      const APIkey = "AIzaSyAZw4XY-USmeiN9j1cLmxJ8W8mu_l2a19U";
      const authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
      try {
        const { data } = await axios.post(authUrl + APIkey, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });

        commit("setToken", {
          idToken: data.idToken,
          expiresIn:
            new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });

        const newUserData = {
          userId: data.localId,
          firstname: payload.firstname,
          lastname: payload.lastname,
          username: payload.username,
          email: payload.email,
          imageLink: payload.imageLink,
        };

        Cookies.set("UID", newUserData.userId);
        await dispatch("addNewUser", newUserData);
      } catch (err) {
        console.log(err);
      }
    },

    async getLoginData({ commit, dispatch }, payload) {
      const APIkey = "MASUKKAN_WEB_API_KEY";
      const authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

      try {
        const { data } = await axios.post(authUrl + APIkey, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });

        commit("setToken", {
          idToken: data.idToken,
          expiresIn:
            new Date().getTime() + Number.parseInt(data.expires_in) * 1000,
        });

        await dispatch("getUser", data.localId);
      } catch (err) {
        console.log(err);
      }
    },

    async addNewUser({ commit, state }, payload) {
      try {
        const { data } = await axios.post(
          `https://recipe-vue-batch2-default-rtdb.firebaseio.com/user.json?auth=${state.token}`,
          payload,
        );
        commit("setUserLogin", { userData: payload, loginStatus: true });
      } catch (err) {
        console.log(err);
      }
    },

    async getUser({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `https://recipe-vue-batcan2-default-rtdb.firebaseio.com/user.json`,
        );

        for (let key in data) {
          if (data[key].userId === payload) {
            Cookies.set("UID", data[key].userId);

            commit("setUserLogin", {
              userData: data[key],
              loginStatus: true,
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
