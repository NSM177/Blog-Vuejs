import { createWebHistory, createRouter } from "vue-router";
import Home from './components/Home.vue';
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import AddPost from "./components/AddPost.vue";
import DetailPost from "./components/DetailPost.vue";
import UpdateData from "./components/UpdateData.vue";
const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/Signup'
    },
    {
        name: 'Login',
        component: Login,
        path: '/Login'
    },
    {
        name: 'AddPost',
        component: AddPost,
        path: '/add-post/'
    },
   
    {
        name: 'DetailPost',
        component: DetailPost,
        path: '/detail-post/'
    },
    {
        name: 'UpdateData',
        component: UpdateData,
        path: '/update-data/id'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;