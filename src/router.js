import Vue from 'vue'
import Router from 'vue-router'
import Table from './components/builder/Table'
import MainPage from "./components/MainPage.vue"
import ResizingBoxes from "./components/builder/ResizingBoxes.vue"
import News from './components/news/News.vue'
import PrivacyPolicy from './components/PrivacyPolicy.vue'
import SiteOwner from './components/SiteOwner.vue'
import ProjectDeveloper from './components/ProjectDeveloper.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/:lang",
            name: "MainPage",
            component: MainPage
        },
        {
            path: "/:lang/site-owner",
            name: "SiteOwner",
            component: SiteOwner
        },
        {
            path: "/:lang/project-developer",
            name: "ProjectDeveloper",
            component: ProjectDeveloper
        },
        {
            path: "/:lang/table",
            component: Table
        },
        {
            path: "/:lang/privacy-policy",
            component: PrivacyPolicy
        },
        {
            path: "/:lang/resize",
            component: ResizingBoxes
        },
        {
            path: "/:lang/news",
            component: News
        }]
})
