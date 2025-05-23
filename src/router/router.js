import { createRouter, createWebHistory } from 'vue-router'

import Login        from '../view/Login.vue'
import SignUp       from '../view/SignUp.vue'
import UserProfile  from '../view/UserProfile.vue'
import JobList      from '../view/JobList.vue'
import JobDetail    from '../view/JobDetail.vue'
import JobPost      from '../view/JobPost.vue'
import About        from '../view/About.vue'


const routes = [
    {
        path: '/'
        , name: 'Login'
        , component: Login
    },
    {
        path: '/signup'
        , name: 'SignUp'
        , component: SignUp
    },
    {
        path: '/user'
        , name: 'UserProfile'
        ,component: UserProfile
    },
    {
        path: '/job-list'
        , name: 'JobList'
        , component: JobList
    },
    {
        path: '/job/:id'
        , name: 'JobDetail'
        , component: JobDetail
    },
    {
        path: '/job-post'
        , name: 'JobPost'
        , component: JobPost
    },
    {
        path: '/job-post-update'
        , name: 'JobPost'
        , component: JobPost
    },
    {
        path: '/about'
        , name: 'About'
        , component: About
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router