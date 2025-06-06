// import { createRouter, createWebHistory } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../view/Login.vue'
import SignUp from '../view/SignUp.vue'
import JobPost from '../view/JobPost.vue'
import JobList from '../view/JobList.vue'
import JobDetail from '../view/JobDetail.vue'
import UserProfile from '../view/UserProfile.vue'
import JobPostUpdate from '../view/JobPostUpdate.vue'
import About from '../view/About.vue'

const routes = [
  { 
    path: '/', 
    component: Login 
  },
  { 
    path: '/signup', 
    component: SignUp 
  },
  { 
    path: '/job-post', 
    component: JobPost
  },
  { 
    path: '/job-list', 
    component: JobList
  },  
  { 
    path: '/job-detail/:id', 
    component: JobDetail
  },
  { 
    path: '/user-profile', 
    component: UserProfile
  },
  { 
    path: '/job-post-update/:id', 
    component: JobPostUpdate
  },
  { 
    path: '/about', 
    component: About
  },
]

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(), // Hash 모드 설정
  routes,
})

export default router