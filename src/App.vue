<template>
  <div id="app" @click="recordLogin">
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <header-bar ref="headerBar" :msg="toChilde" @toLogin="toLogin"></header-bar>
      </el-col>
    </el-row>
    <el-row class="bg" :style="{backgroundImage:`url(${merchantInfo.BackgroundImg})`}">
      <el-scrollbar style="height:calc(100vh - 90px);">
        <el-col :span="20" class="main-con">
          <router-view></router-view>
        </el-col>
      </el-scrollbar>
    </el-row>
    <el-dialog title="" v-loading="loading" element-loading-text="正在发送" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
      :close-on-click-modal="false" class="dialog-longin" :visible.sync="showLogin" width="400px" show-close @close="loginClose" center>
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
            <el-input type="password" placeholder="请输入密码" @keyup.enter.native="reday('ruleForm')" prefix-icon="el-icon-unlock" v-model="loginForm.Pwd" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop="MsgCode" v-show="activeTab==2">
            <el-input type="password" placeholder="请输入验证码" @keyup.enter.native="reday('ruleForm')" prefix-icon="el-icon-unlock" v-model="loginForm.MsgCode" autocomplete="off">
            </el-input>
            <el-button type="primary" :loading="canNextTime" class="load-msg" @click="onMsg">获取验证码 {{canNextTime?nextTime:''}}</el-button>
          </el-form-item>
          <el-form-item class="ormemery-pass" v-show="activeTab==1">
            <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item class="dialog-footer">
            <el-button type="primary" @click="reday('ruleForm')">登 录</el-button>
          </el-form-item>
          <el-row class="sigin-ready"><span class="welogin" @click="weLogin"></span><span @click="signIn">立即注册</span></el-row>
        </el-form>
      </el-row>
    </el-dialog>
    <!-- 注册页 -->
    <el-dialog title="" v-loading="loading" element-loading-text="正在发送" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
      :close-on-click-modal="false" class="dialog-longin" :visible.sync="signShow" width="400px" show-close @close="signClose('signRuleForm')" center>
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
          <el-form-item prop="MsgCode" label="验证码">
            <el-input type="text" placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="signForm.MsgCode" autocomplete="off"></el-input>
            <el-button type="primary" :loading="canSignNextTime" class="load-msg" @click="onSign">获取验证码 {{canSignNextTime?nextSignTime:''}}</el-button>
          </el-form-item>
          <el-form-item prop="UserIdCard" label="身份证号">
            <el-input type="text" placeholder="请输入身份证号" :readonly="autoComplete" @focus="autoComplete=false" prefix-icon="el-icon-postcard" v-model="signForm.UserIdCard"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="Password" label="密码">
            <el-input type="password" placeholder="请输入密码" :readonly="autoComplete" @focus="autoComplete=false" prefix-icon="el-icon-unlock" show-password
              v-model="signForm.Password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="enPassword" label="确认密码">
            <el-input type="password" placeholder="确认密码" @keyup.enter.native="signAction('signRuleForm')" prefix-icon="el-icon-unlock" show-password v-model="signForm.enPassword"
              autocomplete="off"></el-input>
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
import { setInterval, clearInterval } from 'timers'
import { mapState } from 'vuex'

export default {
	name: 'app',
	data() {
		var checkEnPassword = (rule, value, callback) => {
			if (!this.signForm.Password) {
				this.$refs.signRuleForm.validateField('Password')
				callback()
			} else if (value == '') {
				callback(new Error('请再次输入密码'))
			} else if (value != this.signForm.Password) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}
		var checkMsgCode = (rule, value, callback) => {
			if (!this.signForm.UserPhone) {
				this.$refs.signRuleForm.validateField('UserPhone')
				callback()
			} else if (!value) {
				callback(new Error('请输入验证码'))
			} else {
				callback()
			}
		}
		return {
			recordTime: 1, //记录当前时间---作为30分钟无操作记录
			activeTab: 1, //默认登录方式---账号登录
			loginForm: { Mobile: '', Pwd: '', checked: true, MsgCode: '' }, //登录信息
			signForm: { Gender: '男' }, //注册信息
			nextTime: 60, //计时
			canNextTime: false, //可以点击下一次
			timer: null, //计时器
			timer2: null,
			nextSignTime: 60,
			canSignNextTime: false,
			autoComplete: true,
			loading: false,
			loginRules: {
				Mobile: [
					{ required: true, message: '请输入登录账号', trigger: 'blur' },
					{
						pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
						message: '手机格式不正确',
						trigger: 'blur'
					}
				],
				Pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
				MsgCode: [{ required: false, message: '请输入验证码', trigger: 'blur' }]
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
				enPassword: [{ required: true, validator: checkEnPassword, trigger: 'blur' }],
				MsgCode: [{ required: true, validator: checkMsgCode, trigger: 'blur' }]
			},
			signShow: false, //注册页显示控制
			storeState: '', //vuex状态转存
			toChilde: true
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
	computed: {
		showLogin: {
			//根据登录状态改变弹出层是否显示
			get() {
				return this.$store.state.showLogin
			},
			set(v) {
				this.$store.dispatch('changeAppStatus', v)
			}
		},
		...mapState({
			//结构store仓库数据
			merchantInfo: state => state.merchantInfo
		})
	},
	methods: {
		submit() {
			console.log(1)
		},
		//定时器记录当前是否点击dom  点击重置
		setTimer() {
			setInterval(() => {
				this.recordTime++
			}, 1000)
		},
		//手机号输入完成点击发送短信
		onSign() {
			this.$refs.signRuleForm.validateField('UserPhone', valiemsg => {
				//先校验手机号成功 出现确认发送提示
				if (valiemsg != '') {
					return false
				}
				this.$ajax.post('User/RegCheck', { Mobile: this.signForm.UserPhone, MerchantName: this.merchantInfo.B2CName }).then(res => {
					this.$message({ type: res.Type.toLowerCase(), message: res.Content, center: true, duration: 2000 })
					if (res.Type.toLowerCase() == 'success') {
						this.canSignNextTime = true
						let _this = this
						this.timer2 = setInterval(function() {
							if (_this.nextSignTime > 1) {
								_this.nextSignTime--
							} else {
								_this.canSignNextTime = false
								_this.nextSignTime = 60
								clearInterval(_this.timer2)
							}
						}, 1000)
					}
				})
			})
		},
		//记录点击事件  超时半小时退出登录
		recordLogin() {
			this.recordTime = 1
		},
		//切换登录方式
		changeTab(v) {
			this.activeTab = v
			if (v == 1) {
				this.loginRules.Pwd[0].required = true
				this.loginRules.MsgCode[0].required = false
			} else {
				this.loginRules.Pwd[0].required = false
				this.loginRules.MsgCode[0].required = true
			}
		},
		//微信登录
		weLogin() {
			// let baseUrl = JSON.parse(JSON.stringify(location.href))
			let baseUrl = escape(window.SYSTEM_CONFIG.wechatUrl)
			location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${window.SYSTEM_CONFIG.AppId}&redirect_uri=${baseUrl}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`
		},
		//发送验证码
		onMsg() {
			this.loginRules.MsgCode[0].required = false
			this.$refs.ruleForm.validate(valid => {
				if (valid) {
					this.canNextTime = true
					let _this = this
					this.timer = setInterval(function() {
						if (_this.nextTime > 1) {
							_this.nextTime--
						} else {
							_this.canNextTime = false
							_this.nextTime = 60
							clearInterval(_this.timer)
						}
					}, 1000)
					this.loading = true
					this.$ajax.post('User/GetMsgCode', { Mobile: this.loginForm.Mobile, MerchantName: this.merchantInfo.B2CName }).then(res => {
						this.loading = false
						this.$message({ type: res.Type.toLowerCase(), message: res.Content, center: true, duration: 2000 })
					})
				}
			})
		},
		//headerbar响应事件
		toLogin() {
			this.$store.dispatch('changeAppStatus', true)
		},
		//登录存登录信息
		reday(formName) {
			if (this.activeTab == 2) {
				this.loginRules.MsgCode[0].required = true
			}
			this.$refs[formName].validate(valid => {
				if (valid) {
					//保存实体
					this.$ajax.post('User/Login/' + this.activeTab, this.loginForm).then(res => {
						if (res.Code == 200) {
							this.$message({ type: 'success', message: res.Content, center: true, duration: 2000 })
							let accountForm = res.Data
							accountForm.loginStatus = true
							this.$store.dispatch('setLonginInfo', accountForm)
							this.$store.dispatch('changeAppStatus', false) //隐藏登录窗口
							let enterPath = JSON.parse(this.$store.state.toRouter)
							this.$router.push({
								path: enterPath.path,
								query: enterPath.query
							})
							this.toChilde = false
						} else {
							this.$message({ type: 'error', message: res.Content, center: true, duration: 2000 })
						}
					})
				} else {
					return false
				}
			})
		},
		//关闭弹窗回调
		loginClose() {
			this.canNextTime = false
			this.nextTime = 60
			clearInterval(this.timer)
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
			this.canSignNextTime = false
			this.nextSignTime = 60
			clearInterval(this.timer2)
		},
		//注册提交
		signAction(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$ajax.post('User/Register', { ReqParam: JSON.stringify(this.signForm), MsgCode: this.signForm.MsgCode }).then(res => {
						if (res.Code == 200) {
							this.$message({ type: 'success', message: '注册成功', center: true, duration: 2000 })
							this.signShow = false
							this.canSignNextTime = false
							this.nextSignTime = 60
							clearInterval(this.timer2)
						} else {
							this.$message({ type: 'warning', message: res.Content, center: true, duration: 2000 })
							this.canSignNextTime = false
							this.nextSignTime = 60
							clearInterval(this.timer2)
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
				this.$router.push({ path: '/Home' })
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
.load-msg {
	.el-icon-loading {
		display: none;
	}
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
		height: 24px;
		line-height: 24px;
		cursor: pointer;
		// 微信登录
		.welogin {
			float: left;
			height: 24px;
			width: 118px;
			background: url('./assets/welogin.png') no-repeat;
		}
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
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	.el-scrollbar__view {
		display: flex;
		justify-content: center;
	}
}
</style>
