import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home';
//主页
const HomeView = () => import('./views/home/children/view');
const ScenicSpot = () => import('./views/home/children/scenicSpot');
const IimmediatePurchase = () =>
  import('./views/home/children/immediatePurchase');

//订单信息
const OrderInformation = () => import('./views/orderInformation');

//个人中心
const PersonalCenter = () => import('./views/personalCenter');
//联系我们
const Contactus = () => import('./views/contactus');
Vue.use(Router);

export default new Router({
  routes: [
    //无路由默认跳转
    {
      path: '/',
      name: '',
      redirect: '/home/HomeView'
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
          component: HomeView
        },
        {
          path: '/home/ScenicSpot',
          name: 'ScenicSpot',
          component: ScenicSpot
        },
        {
          path: '/home/ScenicSpot/IimmediatePurchase',
          name: 'IimmediatePurchase',
          component: IimmediatePurchase
        }
      ]
    },

    //订单信息
    {
      path: '/OrderInformation',
      name: 'OrderInformation',
      component: OrderInformation
    },
    //个人中心
    {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    },
    //联系我们
    {
      path: '/Contactus',
      name: 'Contactus',
      component: Contactus
    }
  ]
});
