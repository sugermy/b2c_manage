import Vue from "vue";
import Router from "vue-router";
//主页
const Home = () => import("./views/home");
const HomeView = () => import("./views/home/children/view");
const Product = () => import("./views/home/children/ProductList"); //产品列表
const ProductDetail = () => import("./views/home/children/ProductDetail");
const OrderForm = () => import("./views/home/children/OrderForm"); //提交订单

//个人中心
const Personal = () => import("./views/personal");
const PersonalCenter = () => import("./views/personal/children/PersonalCenter");
const PersonalOrder = () => import("./views/personal/children/PersonalOrder");

//游客须知
const TouristRules = () => import("./views/touristRules/index");

//联系我们
const Contactus = () => import("./views/contactus/index");
Vue.use(Router);

export default new Router({
  routes: [
    //无路由默认跳转
    {
      path: "/",
      name: "",
      redirect: "/Home/HomeView"
    },
    //首页
    {
      path: "/Home",
      name: "Home",
      component: Home,
      redirect: "/Home/HomeView",
      children: [
        {
          path: "HomeView",
          name: "HomeView",
          component: HomeView,
          meta: {
            title: "首页"
          },
        },
        {
          path: "Product",
          name: "Product",
          component: Product,
          meta: {
            title: "产品列表"
          }
        },
        {
          path: "Product/Detail",
          name: "ProductDetail",
          component: ProductDetail,
          meta: {
            title: "产品详情"
          }
        },
        {
          path: "Product/OrderForm",
          name: "OrderForm",
          component: OrderForm,
          meta: {
            title: "提交订单"
          }
        }
      ]
    },

    //个人中心
    {
      path: "/Personal",
      name: "Personal",
      component: Personal,
      redirect: "/Personal/PersonalCenter",
      children: [
        {
          path: "PersonalCenter",
          name: "PersonalCenter",
          component: PersonalCenter,
          meta: {
            title: "个人中心"
          }
        },
        {
          path: "PersonalOrder",
          name: "PersonalOrder",
          component: PersonalOrder
        }
      ]
    },
    //购票须知
    {
      path: "/TouristRules",
      name: "TouristRules",
      component: TouristRules,
      meta: {
        title: "购票须知"
      }
    },
    //联系我们
    {
      path: "/Contactus",
      name: "Contactus",
      component: Contactus,
      meta: {
        title: "联系我们"
      }
    }
  ]
});
