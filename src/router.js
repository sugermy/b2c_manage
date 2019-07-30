import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
//主页
const HomeView = () => import('./views/Home/children/view');
const Product = () => import('./views/Home/children/ProductList'); //产品列表
const ProductDetail = () => import('./views/Home/children/ProductDetail');
const OrderForm = () => import('./views/Home/children/OrderForm.vue'); //提交订单

//个人中心
const Personal = () => import('./views/Personal');
const PersonalCenter = () =>
  import('./views/Personal/children/PersonalCenter.vue');
const PersonalOrder = () =>
  import('./views/Personal/children/PersonalOrder.vue');

//游客须知
const TouristRules = () => import('./views/TouristRules');

//联系我们
const Contactus = () => import('./views/Contactus');
Vue.use(Router);

export default new Router({
  routes: [
    //无路由默认跳转
    {
      path: '/',
      name: '',
      redirect: '/Home/HomeView'
    },
    //首页
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect: '/Home/HomeView',
      children: [
        {
          path: 'HomeView',
          name: 'HomeView',
          component: HomeView,
          meta: {
            title: '首页'
          }
        },
        {
          path: 'Product',
          name: 'Product',
          component: Product,
          meta: {
            title: '产品列表'
          }
        },
        {
          path: 'Product/Detail',
          name: 'ProductDetail',
          component: ProductDetail,
          meta: {
            title: '产品详情'
          }
        },
        {
          path: 'Product/OrderForm',
          name: 'OrderForm',
          component: OrderForm,
          meta: {
            title: '提交订单'
          }
        }
      ]
    },

    //个人中心
    {
      path: '/Personal',
      name: 'Personal',
      component: Personal,
      redirect: '/Personal/PersonalCenter',
      children: [
        {
          path: 'PersonalCenter',
          name: 'PersonalCenter',
          component: PersonalCenter
        },
        {
          path: 'PersonalOrder',
          name: 'PersonalOrder',
          component: PersonalOrder
        }
      ]
    },
    //游客须知
    {
      path: '/TouristRules',
      name: 'TouristRules',
      component: TouristRules
    },
    //联系我们
    {
      path: '/Contactus',
      name: 'Contactus',
      component: Contactus
    }
  ]
});
