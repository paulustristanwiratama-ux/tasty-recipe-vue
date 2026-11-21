import axios from "axios";

const databaseURL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

export default {
  namespaced: true,
  state() {
    return {
      recipes: [],
      recipeDetail: {},
    };
  },
  mutations: {
    setRecipeData(state, payload) {
      state.recipes = payload;
    },
    setRecipeDetail(state, payload) {
      state.recipeDetail = payload;
    },
  },
  actions: {
    async getRecipeData({ commit }) {
      try {
        const { data } = await axios.get(
          `${databaseURL}/recipes.json`,
        );

        const recipes = [];
        for (const key in (data ?? {})) {
          recipes.push({ ...data[key], id: key });
        }
        commit("setRecipeData", recipes);
      } catch (err) {
        console.error("Unable to load recipes:", err);
      }
    },

    async getRecipeDetail({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `${databaseURL}/recipes/${payload}.json`);

        commit("setRecipeDetail", data ?? {});
      } catch (err) {
        console.error("Unable to load recipe detail:", err);
      }
    },
  },
};
