import Vue from 'vue'
import Router from 'vue-router'
import Table from './components/Table'
import MainPage from "./components/MainPage.vue"
import Footer from "./components/Footer.vue"
import ResizingBoxes from "./components/ResizingBoxes.vue"
import News from './components/News.vue'

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
        component: Footer
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
