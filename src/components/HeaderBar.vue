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
      <div class="login-area">
        <el-button type="primary" size="small" @click="login" v-show="!$store.state.loginInfo.loginStatus">登录</el-button>
        <el-dropdown v-show="$store.state.loginInfo.loginStatus" @command="menuCommand">
          <span class="el-dropdown-link">
            {{loginInfo.NickName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="center">个人中心</el-dropdown-item>
            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'HeaderBar',
	props: {
		msg: Boolean
	},
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
			merchantInfo: state => state.merchantInfo,
			loginInfo: state => state.loginInfo
		})
	},
	mounted() {
		//页面回调完成之后派发
		this.$nextTick(() => {
			this.imgSrc = this.merchantInfo.LogoImg
		})
	},
	methods: {
		//点击logo---回到首页
		goHome() {
			this.$router.push({ path: '/Home' })
		},
		login() {
			this.$emit('toLogin')
		},
		menuCommand(command) {
			switch (command) {
				case 'center':
					this.$router.push({
						path: '/Personal'
					})
					break
				case 'exit':
					let nologin = { loginStatus: false }
					this.$store.dispatch('setLonginInfo', nologin)
					this.$message({ type: 'success', message: '退出成功', center: true })
					this.$router.push({
						path: '/Home'
					})
					break
				default:
					break
			}
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
	margin-right: 30px;
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
.login-area {
	height: 40px;
	display: flex;
	align-items: center;
}
</style>
