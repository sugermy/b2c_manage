<template>
  <div class="header-nav">
    <div class="logo" @click="goHome">
      <img :src="imgSrc" class="logo-img" />
    </div>
    <div class="header-right">
      <ul class="menu">
        <router-link tag="li" v-for="(item,index) in menuList" :key="index" class="menu-item" :to="{ path: item.path }">
          {{item.name}}</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'HeaderBar',
	data() {
		return {
			menuList: [
				//首页菜单路由
				{
					name: '首页',
					path: '/Home'
				},
				{
					name: '个人中心',
					path: '/Personal'
				},
				{
					name: '购票须知',
					path: '/TouristRules'
				},
				{
					name: '联系我们',
					path: '/Contactus'
				}
			],
			imgSrc: ''
		}
	},
	computed: {
		...mapState({
			//结构store仓库数据
			merchantInfo: state => state.merchantInfo
		})
	},
	mounted() {
		//页面回调完成之后派发设置城市ID事件
		this.$nextTick(() => {
			this.imgSrc = this.merchantInfo.LogoImg
		})
	},
	methods: {
		//点击logo---回到首页
		goHome() {
			this.$router.push({ path: '/Home' })
		}
	}
}
</script>

<style scoped lang="less">
.header-nav {
	width: 100%;
	height: 90px;
	background: white;
	display: flex;
	justify-content: space-between;
}
.logo {
	display: flex;
	align-items: center;
	cursor: pointer;
}
.logo-img {
	height: 44px;
	width: 167px;
}
.header-right {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.menu {
	display: flex;
	align-items: center;
}
.menu-item {
	font-size: 18px;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
	line-height: 30px;
	height: 40px;
	line-height: 40px;
	width: 140px;
	text-align: center;
	cursor: pointer;
	margin: 0 10px;
}
.menu-item:hover,
.menu-item.router-link-active {
	color: white;
	background: rgba(255, 128, 57, 1);
	border-radius: 4px;
}
</style>
