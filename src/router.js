import Vue from 'vue'
import Router from 'vue-router'
import Table from './components/Table'
import News from "./components/News.vue"

Vue.use(Router);

export default new Router({
    routes: [{
        path: "/",
        name: "news",
        component: News
    },
    {
        path: "/table",
        component: Table
    }]
})
