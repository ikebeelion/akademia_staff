import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Auth/Login.vue'
import MyClassroom from './components/Classroom.vue'
import MyClass from './components/MyClass.vue'
import Attendance from './components/Attendance.vue'
import Assignment from './components/Assignment.vue'
import Curricula from './components/Curricula.vue'
import Result from './components/Result.vue'



const router = createRouter({
    history: createWebHistory(),    
    routes: [
        {path:'/', name:'login', component:Login},
        {path:'/dashboard', name:'dashboard', component:Dashboard},
        {path:'/attendance', name:'attendance', component:Attendance},
        {path:'/assignment', name:'assignment', component:Assignment},
        {path:'/curricula', name:'curricula', component:Curricula},
        {path:'/classroom', name:'classroom', component:MyClassroom},
        {path:'/result', name:'result', component:Result},        
        {path:'/class-managed', name:'classmanaged', component:MyClass},        
    ]
})

export default router

