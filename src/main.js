import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";
import App from "./App.vue";
import "bootstrap/dist/js/bootstrap.js";
// import { useStore } from "vuex";
// import axios from "axios";
import {store} from './store/index'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavious() {
    return { top: 0 };
  },
});

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

// export default {
//   Setup() {
//     const store = useStore();
//   },
// };

// export const store = new Vuex.Store({
//   state: {
//     color: ["red", "blue", "green"],
//     price: 100000,
//   },
//   getters: {
//     getterName(state) {
//       // code here
//       return data;
//     },
//   },

//   mutations: {
//     mutationName(state, payload) {
//       state.stateName = newValue;
//     },
//   },

//   actions: {
//     actionName(context) {
//       context.commit("mutationName");
//     },
//   },
// });
// store.state.namaProperty;
// store.getters.getterName;
// store.commit("mutatuinName", data);
// store.dispatch("actionName", data);

// async function name(parameter1, parameter2) {
//   let result = await Promise;
// }

// let promise = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     resolve("Promise resolved");
//   }, 4000);
// });

// async function asyncFunc() {
//   let result = await promise;

//   console.log(result);
//   console.log("hello");
// }
// asyncFunc();

// async function asyncFunc(){
//   try {
//     let result = await promise;
//     console.log(result);
//   }
//   catch(error){
//     console.log(error);
//   }
// }