import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 导入组件
import login from '../components/login.vue'

import index from '../components/index.vue'

import user from '../components/user.vue'

// 规则
let routes = [
    {
        path:'/login',
        component:login
    },
    {
        path:'/',
        component:index,
        children:[
            {
                path:'user',
                component:user
            }
        ]
    }
]

// 路由对象
let router = new VueRouter({
    routes
})

// 注册添加导航守卫  前置守卫
router.beforeEach((to, from, next) => {
    // to 去哪个页面
    // from 从哪里过来的
    if(to.path == '/login'){
        next()
    }else{
        // 如果不是登录页
        if(window.sessionStorage.getItem('token')){
            next()//登陆了就放过去
        }else{
            //提示不是vue的实例  无法访问$message 
            // this.$message..warning('先登陆才能进去哦')
            Vue.prototype.$message.warning('先登陆才能进去哦')//所以用vue的原型
            // 返回到登陆页
            next('/login')
        }
    }
  })

// 暴露
export default router;