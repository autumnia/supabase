import { createRouter, createWebHashHistory } from 'vue-router'
// import { createRouter, createWebHistory } from 'vue-router'

import Login            from '../view/Login.vue'
import SignUp           from '../view/SignUp.vue'
import UserProfile      from '../view/UserProfile.vue'
import JobList          from '../view/JobList.vue'
import JobDetail        from '../view/JobDetail.vue'
import JobPost          from '../view/JobPost.vue'
import JobPostUpdate    from '../view/JobPostUpdate.vue'
import About            from '../view/About.vue'


const routes = [
    {
        path: '/'
        , component: Login
    },
    {
        path: '/signup'
        , component: SignUp
    },
    {
        path: '/user-profile'
        ,component: UserProfile
    },
    {
        path: '/job-list'
        , component: JobList
    },
    {
        path: '/job-detail/:id'
        , component: JobDetail
    },
    {
        path: '/job-post'
        , component: JobPost
    },
    {
        path: '/job-post-update/:id'
        , component: JobPostUpdate
    },
    {
        path: '/about'
        , component: About
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes,
})

export default router