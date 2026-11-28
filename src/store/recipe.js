import axios from "axios";
import { databaseUrl } from "../firebase";

const recipesUrl = `${
  databaseUrl || "https://recipe-vue-batch2-default-rtdb.firebaseio.com"
}/recipes`;

function authParams(token) {
  return { params: { auth: token } };
}

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
    setNewRecipe(state, payload) {
      state.recipes.push(payload);
    },
  },
  actions: {
    async getRecipeData({ commit }) {
      try {
        const { data } = await axios.get(`${recipesUrl}.json`);

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
        const { data } = await axios.get(`${recipesUrl}/${payload}.json`);

        commit("setRecipeDetail", data ?? {});
      } catch (err) {
        console.error("Unable to load recipe detail:", err);
      }
    },

    async addNewRecipe({ commit, rootState }, payload) {
      const newData = {
        ...payload,
        username:
          rootState.auth.userLogin.username ||
          rootState.auth.userLogin.email ||
          "",
        createdAt: Date.now(),
        likes: [],
        userId:
          rootState.auth.userId || rootState.auth.userLogin.userId,
      };

      try {
        const { data } = await axios.post(
          `${recipesUrl}.json`,
          newData,
          authParams(rootState.auth.token),
        );

        commit("setNewRecipe", { id: data.name, ...newData });
        return data.name;
      } catch (err) {
        console.error("Unable to save recipe:", err);
        throw new Error("Unable to save the recipe. Please try again.");
      }
    },

    async updateRecipe({ dispatch, rootState }, { id, newRecipe }) {
      const updatedRecipe = {
        ...newRecipe,
        username:
          newRecipe.username ||
          rootState.auth.userLogin.username ||
          rootState.auth.userLogin.email ||
          "",
        userId:
          newRecipe.userId ||
          rootState.auth.userId ||
          rootState.auth.userLogin.userId,
        createdAt: newRecipe.createdAt || Date.now(),
        likes: newRecipe.likes || [],
      };

      try {
        await axios.put(
          `${recipesUrl}/${id}.json`,
          updatedRecipe,
          authParams(rootState.auth.token),
        );

        await dispatch("getRecipeData");
        return updatedRecipe;
      } catch (err) {
        console.error("Unable to update recipe:", err);
        throw new Error("Unable to update the recipe. Please try again.");
      }
    },

    async deleteRecipe({ dispatch, rootState }, id) {
      try {
        await axios.delete(
          `${recipesUrl}/${id}.json`,
          authParams(rootState.auth.token),
        );

        await dispatch("getRecipeData");
      } catch (err) {
        console.error("Unable to delete recipe:", err);
        throw new Error("Unable to delete the recipe. Please try again.");
      }
    },
  },
};
