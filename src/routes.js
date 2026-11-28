import HomePage from './components/pages/HomePage.vue';
import LoginPage from './components/pages/LoginPage.vue';
import SignupPage from "./components/pages/SignupPage.vue";
import DetailPage from "./components/pages/DetailPage.vue";
import NewRecipePage from "./components/pages/NewRecipePage.vue";
import EditRecipePage from "./components/pages/EditRecipePage.vue";
import UserPage from './components/pages/UserPage.vue';
import { store } from './store';

const requireAuth = () => (store.state.auth.token ? true : { name: 'login' });

export const routes = [
    {path: "/", name: "homePage", component: HomePage},
    {path: "/signup", name: "signup", component: SignupPage},
    {path: "/login", name: "login", component: LoginPage},
    {path: "/recipe/edit/:id", name: "editRecipePage", component: EditRecipePage,
      beforeEnter: requireAuth},
    {path: "/recipe/:id", name: "detailPage", component: DetailPage},
    {path: "/new-recipe", name: "newRecipePage", component: NewRecipePage,
      beforeEnter: requireAuth},
    {path: '/user', redirect: '/user/personal-info'},
    {path: '/user/:component', name: 'userPage', component: UserPage,
      beforeEnter: requireAuth}
];
