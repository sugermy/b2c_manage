<template>
  <el-row class="content">
    <el-col :span="20" class="personal">
      <el-col :span="3" class="personal-bus personal-l">
        <div class="personal-head">
          <img src="../../assets/personal/baseImg.png">
          <p class="personal-name">{{loginName}}</p>
          <!-- <el-dropdown placement="bottom-start" @command="menuCommand">
            <p class="personal-name">{{loginName}}&nbsp;&nbsp;<i class="el-icon-arrow-down"></i></p>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </div>
        <router-link class="link-menu" tag="div" :to="{path:'PersonalCenter'}"><i class="link-per"></i>个人中心
        </router-link>
        <router-link class="link-menu" tag="div" :to="{path:'PersonalOrder'}"><i class="link-order"></i>订单管理
        </router-link>
      </el-col>
      <el-col :span="21" class="personal-bus personal-r">
        <router-view></router-view>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
	name: 'personalCenter',
	data() {
		return {
			// loginName: ''
		}
	},
	computed: {
		loginName() {
			return this.$store.state.loginInfo.NickName
		}
	},
	created() {
		// this.loginName = this.$store.state.loginInfo.NickName
	},
	methods: {
		menuCommand(command) {
			if (command == 'exit') {
				let nologin = { loginStatus: false }
				this.$store.dispatch('setLonginInfo', nologin)
				this.$message({ type: 'success', message: '退出成功', center: true, duration: 2000 })
				this.$router.push({
					path: '/Home'
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.content {
	margin: 50px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	.personal {
		background: #fff;
		// .personal-bus {
		// 	height: 100%;
		// }
		.personal-l {
			.personal-head {
				height: 100px;
				background: rgba(255, 128, 57, 1);
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				.personal-name {
					font-size: 14px;
					// cursor: pointer;
					font-family: SourceHanSansCN-Medium;
					font-weight: 600;
					color: rgba(255, 255, 255, 1);
				}
			}
			.link-menu {
				height: 60px;
				line-height: 60px;
				text-align: center;
				// border-bottom: 1px solid #ccc;
				font-size: 16px;
				font-family: SourceHanSansCN-Medium;
				color: rgba(153, 153, 153, 1);
				display: flex;
				align-items: center;
				cursor: pointer;
				.link-per {
					width: 14px;
					height: 14px;
					margin: 0 10px 0 15%;
					background: url('../../assets/personal/link-per_normal.png') no-repeat;
				}
				.link-order {
					width: 14px;
					height: 14px;
					margin: 0 10px 0 15%;
					background: url('../../assets/personal/link-order_normal.png') no-repeat;
				}
			}
			.link-menu.router-link-active {
				color: rgba(255, 128, 57, 1);
				background: rgba(255, 240, 232, 1);
				.link-per {
					background: url('../../assets/personal/link-per_active.png') no-repeat;
				}
				.link-order {
					background: url('../../assets/personal/link-order_active.png') no-repeat;
				}
			}
		}
		.personal-r {
			background: rgba(247, 247, 247, 1);
			padding: 16px;
		}
	}
}
</style>



