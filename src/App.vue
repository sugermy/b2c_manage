<template>
  <div id="app" @click="recordLogin">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <header-bar ref="headerBar"></header-bar>
      </el-col>
    </el-row>
    <el-row class="bg">
      <el-scrollbar style="height:calc(100vh - 90px);">
        <el-col :span="20" class="main-con">
          <router-view></router-view>
        </el-col>
      </el-scrollbar>
    </el-row>
    <el-dialog title="" class="dialog-longin" :visible.sync="showLogin" width="400px" :show-close="false" @close="loginClose" center>
      <el-row class="login-head">
        <el-col :span="12" class="login-t">
          <div @click="changeTab(1)"><span :class="activeTab==1?'login-active':''">普通登录</span></div>
        </el-col>
        <el-col :span="12" class="login-t">
          <div @click="changeTab(2)"><span :class="activeTab==2?'login-active':''">短信验证码登录</span></div>
        </el-col>
      </el-row>
      <el-row class="login-form">
        <el-form :model="loginForm" :rules="loginRules" ref="ruleForm">
          <el-form-item prop="Mobile">
            <el-input type="text" placeholder="请输入用户手机账号" prefix-icon="el-icon-user-solid" v-model="loginForm.Mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="Pwd" v-show="activeTab==1">
            <el-input type="password" placeholder="请输入密码" prefix-icon="el-icon-unlock" v-model="loginForm.Pwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="checkPwd" v-show="activeTab==2">
            <el-input type="password" placeholder="请输入验证码" prefix-icon="el-icon-unlock" v-model="loginForm.checkPwd" autocomplete="off"></el-input>
            <el-button type="primary" :loading="canNextTime" @click="onMsg">获取验证码 {{canNextTime?nextTime:''}}</el-button>
          </el-form-item>
          <el-form-item class="ormemery-pass" v-show="activeTab==1">
            <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item class="dialog-footer">
            <el-button type="primary" @click="reday('ruleForm')">登 陆</el-button>
          </el-form-item>
          <el-row class="sigin-ready"><span @click="signIn">立即注册</span></el-row>
        </el-form>
      </el-row>
    </el-dialog>
    <!-- 注册页 -->
    <el-dialog title="" class="dialog-longin" :visible.sync="signShow" width="400px" :show-close="false" @close="signClose('signRuleForm')" center>
      <el-row class="login-head">
        <el-col :span="24" class="login-top">
          <div><span class="login-active">注册</span></div>
        </el-col>
      </el-row>
      <el-row class="login-form">
        <el-form :model="signForm" :rules="signRules" ref="signRuleForm" label-width="80px" label-position="left">
          <el-form-item prop="NickName" label="昵称">
            <el-input type="text" placeholder="请输入用户昵称" prefix-icon="el-icon-user-solid" v-model="signForm.NickName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="UserName" label="用户名">
            <el-input type="text" placeholder="请输入用户姓名" prefix-icon="el-icon-user-solid" v-model="signForm.UserName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="Gender" label="性别" required>
            <div>
              <el-radio v-model="signForm.Gender" label="男">男</el-radio>
              <el-radio v-model="signForm.Gender" label="女">女</el-radio>
            </div>
          </el-form-item>
          <el-form-item prop="UserPhone" label="手机号">
            <el-input type="text" placeholder="请输入手机号用于登录使用" prefix-icon="el-icon-phone" v-model="signForm.UserPhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="UserIdCard" label="身份证号">
            <el-input type="text" placeholder="请输入身份证号" prefix-icon="el-icon-postcard" v-model="signForm.UserIdCard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="Password" label="密码">
            <el-input type="password" placeholder="请输入密码" prefix-icon="el-icon-unlock" show-password v-model="signForm.Password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="enPassword" label="确认密码">
            <el-input type="password" placeholder="确认密码" prefix-icon="el-icon-unlock" show-password v-model="signForm.enPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="passCode" label="验证码">
            <el-input type="text" placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="signForm.passCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="dialog-footer">
            <el-button class="sign-btn" type="primary" @click="signAction('signRuleForm')">提 交</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar'
import CryptoJS from 'crypto-js'
import { setInterval } from 'timers'

export default {
	name: 'app',
	data() {
		var checkPass = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入密码'))
			} else {
				callback()
			}
		}
		var checkEnPassword = (rule, value, callback) => {
			if (value == '') {
				callback(new Error('请再次输入密码'))
			} else if (value != this.signForm.Password) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}
		return {
			recordTime: 1, //记录当前时间---作为30分钟无操作记录
			activeTab: 1, //默认登录方式---账号登录
			loginForm: { Mobile: '', Pwd: '', checked: true },
			signForm: { Gender: '男' },
			nextTime: 60, //计时
			canNextTime: false, //可以点击下一次
			timer: null,
			loginRules: {
				Mobile: [
					{ required: true, message: '请输入登录账号', trigger: 'blur' },
					{
						pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
						message: '手机格式不正确',
						trigger: 'blur'
					}
				],
				Pwd: [{ validator: checkPass, trigger: 'blur' }]
			},
			signRules: {
				//验证规则
				NickName: [{ required: true, message: '请输入用户昵称姓名', trigger: 'blur' }],
				UserName: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }, { min: 2, max: 6, message: '用户姓名格式不正确', trigger: 'blur' }],
				UserPhone: [
					{ required: true, message: '请输入联系电话', trigger: 'blur' },
					{
						pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
						message: '联系电话格式不正确',
						trigger: 'blur'
					}
				],
				UserIdCard: [
					{ required: true, message: '请输入身份证号', trigger: 'blur' },
					{
						pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
						message: '身份证号格式不正确',
						trigger: 'blur'
					}
				],
				Password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
				enPassword: [{ required: true, validator: checkEnPassword, trigger: 'blur' }]
			},
			signShow: false,
			storeState: ''
		}
	},
	components: {
		HeaderBar
	},
	created() {
		//刷新不丢失store状态在页面加载时, 读取sessionStorage里的状态信息
		if (sessionStorage.getItem('userinfo')) {
			this.storeState = sessionStorage.getItem('userinfo')
			let bytes = CryptoJS.AES.decrypt(this.storeState, 'userinfo')
			let originalText = bytes.toString(CryptoJS.enc.Utf8)
			this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(originalText)))
		}
		//在页面刷新时,将vuex里的信息保存到sessionStorage里
		window.addEventListener('beforeunload', () => {
			this.storeState = CryptoJS.AES.encrypt(JSON.stringify(this.$store.state), 'userinfo').toString()
			sessionStorage.setItem('userinfo', this.storeState)
		})
		this.setTimer() //加载定时器
	},
	mounted() {},
	computed: {
		showLogin: {
			//根据登录状态改变弹出层是否显示
			get() {
				return this.$store.state.showLogin
			},
			set(v) {
				this.$store.dispatch('changeAppStatus', v)
			}
		}
	},
	methods: {
		//定时器记录当前是否点击dom  点击重置
		setTimer() {
			setInterval(() => {
				this.recordTime++
			}, 1000)
		},
		//记录点击事件  超时半小时退出登录
		recordLogin() {
			this.recordTime = 1
		},
		//切换登录方式
		changeTab(v) {
			this.activeTab = v
		},
		//发送验证码
		onMsg() {
			this.canNextTime = true
			let _this = this
			this.timer = setInterval(function() {
				if (_this.nextTime > 1) {
					_this.nextTime--
				} else {
					_this.canNextTime = false
				}
			}, 1000)
		},
		//登录存登录信息
		reday(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					//保存实体
					this.$ajax.post('User/Login/1', this.loginForm).then(res => {
						if (res.Code == 200) {
							this.$message({ type: 'success', message: res.Content, center: true })
							let accountForm = res.Data
							accountForm.loginStatus = true
							this.$store.dispatch('setLonginInfo', accountForm)
							this.$store.dispatch('changeAppStatus', false) //隐藏登录窗口
							let enterPath = this.$store.state.toRouter
							this.$router.push({
								path: enterPath
							})
						} else {
							this.$message({ type: 'error', message: res.Content, center: true })
						}
					})
				} else {
					return false
				}
			})
		},
		//关闭弹窗回调
		loginClose() {
			this.$store.dispatch('changeAppStatus', false)
		},
		//注册显示
		signIn() {
			this.showLogin = false
			this.signShow = true
		},
		//注册页关闭---重置已输入的表单内容
		signClose(formName) {
			this.$refs[formName].resetFields()
		},
		//注册提交
		signAction(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$ajax.post('User/Register', { ReqParam: JSON.stringify(this.signForm) }).then(res => {
						if (res.Code == 200) {
							this.$message({ type: 'success', message: '注册成功', center: true })
							this.signShow = false
						} else {
							this.$message({ type: 'warning', message: res.Content, center: true })
							this.signShow = false
						}
					})
				} else {
					return false
				}
			})
		}
	},

	watch: {
		recordTime(v) {
			//监听当前记录时间 超过30分钟未执行js操作退出登录
			if (v == 1800) {
				this.$notify({
					title: '提醒',
					message: '登陆态已超时，请重新登陆',
					showClose: false,
					type: 'warning'
				})
				let nologin = { loginStatus: false }
				this.$store.dispatch('setLonginInfo', nologin)
			}
		}
	}
}
</script>
<style lang="less">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	min-width: 1280px;
}
.el-scrollbar__view {
	width: 100%;
	height: 100%;
}
.main-con {
	width: 100%;
	height: calc(100% - 100px);
}
.dialog-longin {
	.login-head {
		.login-t {
			text-align: center;
			cursor: pointer;
			span {
				display: inline-block;
				height: 30px;
				line-height: 30px;
			}
		}
		.login-t:nth-of-type(1) {
			border-right: 1px solid #dddddd;
		}
		.login-top {
			text-align: center;
			cursor: pointer;
			span {
				display: inline-block;
				height: 30px;
				line-height: 30px;
			}
		}
	}
	.login-form {
		margin-top: 20px;
		.login-f-i {
			margin-bottom: 20px;
		}
		.ormemery-pass {
			height: 20px;
			line-height: 20px;
			margin-bottom: 10px;
			.el-form-item__content {
				line-height: 20px !important;
			}
		}
	}
	.sigin-ready {
		font-size: 14px;
		font-family: SourceHanSansCN-Regular;
		font-weight: 400;
		color: rgba(44, 151, 222, 1);
		text-align: right;
		margin-top: 20px;
		cursor: pointer;
	}
	.login-active {
		color: rgba(255, 128, 57, 1);
		border-bottom: 1px solid #ff8039;
	}
}
.sign-btn {
	margin-left: -40px !important;
}
.bg {
	width: 100%;
	background: url(./assets/home_bg.png) no-repeat center;
	.el-scrollbar__view {
		display: flex;
		justify-content: center;
	}
}
</style>
