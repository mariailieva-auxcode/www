import Vue from 'vue'
import Router from 'vue-router'
import Table from '@components/builder/Table'
import MainPage from "@components/MainPage.vue"
import Assets from "@components/Assets.vue"
import ResizingBoxes from "@components/builder/ResizingBoxes.vue"
import NewsPage from '@components/news/NewsPage.vue'
import PrivacyPolicy from '@components/PrivacyPolicy.vue'
import SiteOwner from '@components/SiteOwner.vue'
import ProjectDeveloper from '@components/ProjectDeveloper.vue'
import Specialists from '@components/Specialists'
import PDquestionnaire from '@components/layout/project-developer/PDquestionnaire'
import SpecialistsQuestionnaire from '@components/layout/specialists/SpecialistsQuestionnaire'
import SOquestionnaire from '@components/layout/site-owner/SOquestionnaire'
import Profile from '@components/new-components/Profile'
import ProfileLogin from '@components/new-components/ProfileLogin'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
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
        path: "/:lang/questionnaire",
        component: SOquestionnaire
    },
    {
        path: "/:lang/project-developer",
        name: "ProjectDeveloper",
        component: ProjectDeveloper
    },
    {
        path: "/:lang/project-developer/questionnaire",
        component: PDquestionnaire
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
        component: NewsPage
    },
    {
        path: "/:lang/specialists",
        component: Specialists
    },
    {
        path: "/:lang/specialists/questionnaire",
        component: SpecialistsQuestionnaire
    },
    {
        path: "/:lang/assets",
        component: Assets
    },
    {
        path: "/:lang/profilelogin",
        component: ProfileLogin
    },
    {
        path: "/:lang/profile",
        component: Profile,
        beforeEnter: (to, from, next) => {
            if (!localStorage.token) next("");
            else next();
        }
    },
    ]
})