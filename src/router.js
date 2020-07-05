import Vue from 'vue'
import Router from 'vue-router'
import Table from './components/builder/Table'
import MainPage from "./components/MainPage.vue"
import ResizingBoxes from "./components/builder/ResizingBoxes.vue"
import News from './components/news/News.vue'
import PrivacyPolicy from './components/PrivacyPolicy.vue'

Vue.use(Router);

export default new Router({
    routes: [{
        path: "/",
        name: "MainPage",
        component: MainPage
    },
    {
        path: "/table",
        component: Table
    },
    {
        path: "/privacy-policy",
        component: PrivacyPolicy
    },
    {
        path: "/resize",
        component: ResizingBoxes
    },
    {
        path: "/news",
        component: News
    }
    ]
})
