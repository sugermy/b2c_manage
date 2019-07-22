import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
const HomeView = () => import('./views/home/children/view')
const HomeOther = () => import('./views/home/children/other')
const ScenicSpot = () => import('./views/home/children/scenicSpot')


const Product = () => import('./views/product')
const ProductView = () => import('./views/product/children')
const ProductModelAView = () => import('./views/product/children/modelA/view')
const ProductModelBView = () => import('./views/product/children/modelB/other')
//订单信息
const OrderInformation=()=>import('./views/orderInformation')

//个人中心
const PersonalCenter = () => import('./views/personalCenter')
//联系我们
const Contactus=()=>import('./views/contactus')
Vue.use(Router)

export default new Router({
  routes: [

    //无路由默认跳转
    {
      path: '/',
      name: '',
      redirect: '/home/HomeView',
    },
    //首页
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/HomeView',
      children: [
        {
          path: '/home/HomeView',
          name: 'HomeView',
          component: HomeView,
        },
        {
          path: '/home/HomeOther',
          name: 'HomeOther',
          component: HomeOther,
        },{
          path: '/home/ScenicSpot',
          name: 'ScenicSpot',
          component: ScenicSpot,
        }

      ]
    },
    //门票
    {
      path: '/Product',
      name: 'Product',
      component: Product,
      redirect: '/Product/ProductView',
      children: [
        {
          path: 'ProductView',
          name: 'ProductView',
          component: ProductView,
          redirect: '/Product/ProductView/ProductModelAView',
          children: [
            {
              path: 'ProductModelAView',
              name: 'ProductModelAView',
              component: ProductModelAView,
            },
            {
              path: 'ProductModelBView',
              name: 'ProductModelBView',
              component: ProductModelBView,
            },
          ]
        },

      ]
    },
    //订单信息
    {
      path: '/OrderInformation',
      name: 'OrderInformation',
      component: OrderInformation,
    },
    //个人中心
    {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter,
    },
    //联系我们
    {
      path: '/Contactus',
      name: 'Contactus',
      component: Contactus,
    }

  ]
})
