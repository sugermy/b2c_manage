<template>
  <el-row class="content">
    <el-col :span="20" class="minddle">
      <el-row type="flex" justify="space-between" class="step-list">
        <el-col :span="8" class="step first-step" :class="(activeTab==1||activeTab==2||activeTab==3?'step-active':'')">
          1、填写订单<span :class="(activeTab==1||activeTab==2||activeTab==3?'sx-arrow-right arrow-active':'sx-arrow-right arrow-normal')"></span>
        </el-col>
        <el-col :span="8" class="step second-step" :class="(activeTab==2||activeTab==3?'step-active':'')">2、在线支付<span class="sx-arrow-left"></span><span
            :class="(activeTab==2||activeTab==3?'sx-arrow-right arrow-active':'sx-arrow-right arrow-normal')"></span>
        </el-col>
        <el-col :span="8" class="step three-step" :class="(activeTab==3?'step-active':'')">3、支付完成<span class="sx-arrow-left"></span></el-col>
      </el-row>

      <el-row class="main-form" v-if="activeTab==1">
        <h3 class="form-title">订购信息</h3>
        <el-row>
          <el-col :span="12">
            <el-form ref="TicketForm" class="TicketForm" :model="TicketForm" label-width="90px" label-position="left">
              <el-form-item label="门票名称：">
                <span>{{TicketInit.ProductName}}</span>
              </el-form-item>
              <el-form-item label="门票单价：">
                <span>￥{{SellPriceBase}}/张</span>
              </el-form-item>
              <el-form-item label="门票数量：">
                <el-input-number style="width:120px" class="form-control" v-model="TicketForm.ticketNum" :value="TicketInit.ticketNum" controls-position="right"
                  @change="handleChange" :min="1" :max="999">
                </el-input-number>
              </el-form-item>
              <el-form-item label="选择日期：">
                <el-date-picker type="date" placeholder="选择日期" :picker-options="datePicker" :clearable="false" v-model="TicketForm.palyData" :value="TicketInit.palyData"
                  class="form-control">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="订单总额：">
                <span class="total-money">￥{{totalMoney}}</span>
              </el-form-item>
              <el-form-item label="付款方式：" class="pay-list">
                <div @click="changePay(1)" class="pay-item" :class="payType==1?'choose-pay':''"><i class="pay-icon pay-zfb"></i>支付宝</div>
                <div @click="changePay(2)" class="pay-item" :class="payType==2?'choose-pay':''"><i class="pay-icon pay-we"></i>微信</div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <h3 class="form-title">联系人信息</h3>
        <el-row>
          <el-col :span="12">
            <el-form ref="UserForm" class="UserForm" :model="UserForm" :rules="rules" label-width="100px" label-position="left">
              <el-form-item label="游客姓名：" prop="touristName">
                <el-input v-model="UserForm.touristName" class="form-user"></el-input>
              </el-form-item>
              <el-form-item label="身份证号：" prop="touristIdCard">
                <el-input v-model="UserForm.touristIdCard" class="form-user"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="touristPhone">
                <el-input v-model="UserForm.touristPhone" class="form-user"></el-input>
              </el-form-item>
              <el-form-item class="form-foot">
                <el-button type="primary" plain @click="resetForm('UserForm')">取消</el-button>
                <el-button type="primary" @click="submitForm('UserForm')">提交订单</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="main-form" v-if="activeTab==2" type="flex" justify="center" align="middle">
        <el-col :span="6" class="main-pay">
          <h3 class="pay-name">商品名称：{{TicketInit.ProductName}}</h3>
          <p class="pay-num">￥{{totalMoney}}</p>
          <div class="pay-img" id="paycode" ref="qrcode">
            <img src="../../../assets/homeImage/pay_fail.png" class="pay-status" v-show="!loadPay">
            <div class="pay-list">
              <div class="pay-item" v-show="payType==1"><i class="pay-icon pay-zfb"></i>支付宝</div>
              <div class="pay-item" v-show="payType==2"><i class="pay-icon pay-we"></i>微信</div>
            </div>
          </div>
        </el-col>
        <div class="main-btn">
          <el-button type="primary" v-show="!$route.query.paramsCR" plain @click="cancelPay">取消</el-button>
          <el-button type="primary" v-show="loadPay" :loading="loadPay">等待支付</el-button>
          <el-button type="primary" v-show="!loadPay" @click="replayPay">重新支付</el-button>
        </div>
      </el-row>
      <el-row class="main-form" v-if="activeTab==3" type="flex" justify="center" align="middle">
        <el-col :span="6" class="main-pay">
          <h3 class="pay-name">商品名称：{{TicketInit.ProductName}}</h3>
          <p class="pay-num">￥{{Amount}}</p>
          <div class="pay-img">
            <img src="../../../assets/homeImage/pay_suc.png" class="pay-status">
          </div>
        </el-col>
        <div class="main-btn">
          <el-button type="primary" @click="successPay">完成</el-button>
        </div>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import QRCode from 'qrcodejs2'
import { setInterval, clearInterval } from 'timers'
import { mapState } from 'vuex'
import CryptoJS from 'crypto-js'

export default {
	data() {
		return {
			payType: 1,
			Amount: 0,
			activeTab: 1, //当前step
			productID: '', //产品ID
			TicketInit: {}, //当前产品信息
			SellPriceBase: 0, //产品当日单价
			OrderNo: '', //创建订单生成订单号
			resultURL: '', //生成的支付连接
			timer: null, //设置定时器
			loadPay: true, //等待支付按钮
			paySearchNum: 1, //订单轮询次数
			TicketForm: {
				ticketNum: '',
				palyData: '',
				sailPrice: 0
			}, //订单提交表单数据
			UserForm: {
				touristName: '',
				touristIdCard: '',
				touristPhone: ''
			}, //联系人提交表单数据
			rules: {
				//验证规则
				touristName: [{ required: true, message: '请输入游客姓名', trigger: 'blur' }, { min: 2, max: 6, message: '游客姓名格式不正确', trigger: 'blur' }],
				touristIdCard: [
					{
						required: true,
						message: '请输入身份证号',
						trigger: 'blur'
					},
					{
						pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
						message: '身份证号格式不正确',
						trigger: 'blur'
					}
				],
				touristPhone: [
					{ required: true, message: '请输入联系电话', trigger: 'blur' },
					{
						pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
						message: '联系电话格式不正确',
						trigger: 'blur'
					}
				]
			},
			datePicker: {
				disabledDate(time) {
					let today = new Date(new Date() - 24 * 60 * 60 * 1000)
					return time.getTime() < today.getTime()
				}
			}
		}
	},
	created() {
		if (this.$route.query) {
			this.productID = this.$route.query.id
			this.TicketForm.ticketNum = this.$route.query.ticketNum
			this.TicketForm.palyData = this.$route.query.palyData
			this.getDetail(this.productID, this.TicketForm.palyData)
			this.UserForm.touristName = this.loginInfo.UserName
			this.UserForm.touristIdCard = this.loginInfo.UserIdCard
			this.UserForm.touristPhone = this.loginInfo.UserPhone
			if (this.$route.query.paramsCR) {
				let bytes = CryptoJS.AES.decrypt(this.$route.query.paramsCR, 'paramsCR')
				let originalText = bytes.toString(CryptoJS.enc.Utf8)
				let paramsCR = JSON.parse(originalText)
				this.activeTab = 2
				this.resultURL = paramsCR.resultURL
				this.payType = paramsCR.PayType
				this.Amount = paramsCR.Amount
				this.OrderNo = paramsCR.OrderNo
				this.TicketInit.ProductName = paramsCR.ProductName
			}
		}
	},
	computed: {
		//当前总价
		totalMoney() {
			let totalN = this.TicketForm.ticketNum * this.SellPriceBase
			return totalN
		},
		...mapState({
			//结构store仓库数据
			loginInfo: state => state.loginInfo
		})
	},
	methods: {
		getDetail(pid, date) {
			this.$ajax.get('Product/ProductDetail', { ProductID: pid }).then(res => {
				this.TicketInit = res.Data[0] || {}
				this.rules.touristIdCard[0].required = res.Data[0].IsCheckPerson //身份证校验根据当前产品确定
				this.getInitPrice(pid, date)
				// 有效周期开始
				let BaseStartDate = res.Data[0].StartTime
				let BaseStartTime = new Date(BaseStartDate)
				let BaseEndDate = res.Data[0].EndTime
				let BaseEndTime = new Date(BaseEndDate)
				// 有效周期结束

				// 预售开始
				let SellStartDate = res.Data[0].PreSellStartDate
				let SellStartTime = new Date(SellStartDate)
				let SellEndDate = res.Data[0].PreSellEndDate
				let SellEndTime = new Date(SellEndDate)
				// 预售结束
				this.datePicker = {
					disabledDate(time) {
						let today = new Date(new Date() - 24 * 60 * 60 * 1000)
						return time.getTime() < today.getTime() || time.getTime() > BaseEndTime.getTime()
					}
				}
				if (!res.Data[0].IsSellToday) {
					this.datePicker = {
						disabledDate(time) {
							let today = new Date()
							return time.getTime() < today.getTime() || time.getTime() > BaseEndTime.getTime()
						}
					}
					this.dateValue = this.dateNext()
				}
				if (res.Data[0].IsPreSell) {
					this.datePicker = {
						disabledDate(time) {
							let today = new Date()
							return time.getTime() < SellStartTime.getTime() || time.getTime() > SellEndTime.getTime()
						}
					}
					this.dateValue = res.Data[0].PreSellStartDate
				}
			})
		},
		//初始化请求日期价
		getInitPrice(pid, v) {
			this.$ajax.get('Product/ProductDetail/' + v, { ProductID: pid, BuyDate: v }).then(res => {
				this.SellPriceBase = res.Data.SellPrice
				this.TicketInit.SellPrice = res.Data.SellPrice
				this.TicketInit.TicketPrice = res.Data.TicketPrice
			})
		},

		//切换支付方式
		changePay(v) {
			this.payType = v
		},
		//门票数量切换
		handleChange() {},
		//提交订单信息
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					//验证成功
					let ReqParam = {
						ProductId: this.productID, //产品ID
						ProductName: this.TicketInit.ProductName, //产品名称
						ProductCount: this.TicketForm.ticketNum, //购买数量
						PlayDate: this.TicketForm.palyData, //游玩日期
						OrderAmount: this.totalMoney, //订单总额
						TicketPrice: this.TicketInit.TicketPrice, //票面价格
						SellPrice: this.TicketInit.SellPrice, //售卖价格
						PayClient: this.payType,
						LinkName: this.loginInfo.UserName,
						LinkPhone: this.loginInfo.UserPhone,
						PayAccount: this.loginInfo.Account,
						LinkIDCareNo: this.loginInfo.UserIdCard
					}
					let PassengerJson = [
						{
							UserName: this.UserForm.touristName,
							UserPhone: this.UserForm.touristPhone,
							UserIdCard: this.UserForm.touristIdCard
						}
					]
					this.$ajax.post('Order/Create', { ReqParam: JSON.stringify(ReqParam), PassengerJson: JSON.stringify(PassengerJson) }).then(res => {
						if (res.Code == 200) {
							this.$message({ type: 'success', message: '提交成功', center: true, duration: 2000 })
							this.OrderNo = res.Data.OrderNo
							this.resultURL = res.Data.resultURL
							this.Amount = this.totalMoney
							this.activeTab = 2
						} else {
							this.$message({ type: 'error', message: res.Content, center: true, duration: 2000 })
						}
					})
				} else {
					//非空验证失败
					return false
				}
			})
		},
		//生成二维码
		qrcode(url) {
			let qrcode = new QRCode('paycode', {
				width: 232,
				height: 232,
				text: url, // 二维码地址
				colorDark: '#000',
				colorLight: '#fff'
			})
		},
		//取消订单支付
		cancelPay() {
			this.activeTab = 1
			clearInterval(this.timer)
		},
		//支付完成---跳转到个人订单页面
		successPay() {
			this.$router.push({ path: '/Personal/PersonalOrder' })
		},
		//订单支付状态轮询
		payStatus() {
			this.$ajax.get('Order/GetStatus', { resultURL: this.resultURL, OrderNo: this.OrderNo }).then(res => {
				if (res.Code == 200) {
					this.activeTab = 3
					clearInterval(this.timer) //清除定时器
				} else {
					this.paySearchNum++
					if (this.paySearchNum >= 13) {
						this.$message({ type: 'error', message: '订单未支付', center: true, duration: 2000 })
						this.loadPay = false
						clearInterval(this.timer)
						this.paySearchNum = 1
					}
				}
			})
		},
		//重新支付
		replayPay() {
			//需要重新生成订单支付连接
			this.$ajax.post('Order/RePay', { OrderNo: this.OrderNo, Account: this.loginInfo.Account }).then(res => {
				if (res.Code == 200) {
					this.resultURL = res.Data
					let qrcodeChild = this.$refs.qrcode.getElementsByTagName('img')[1]
					this.$refs.qrcode.removeChild(qrcodeChild)
					this.qrcode(this.resultURL)
					this.loadPay = true
					let _this = this
					this.timer = setInterval(function() {
						_this.payStatus()
					}, 5000)
				} else {
					this.$message({ type: 'error', message: res.Content, center: true, duration: 2000 })
				}
			})
		},
		//取消
		resetForm(formName) {
			this.$refs[formName].resetFields()
			this.$router.go(-1)
		}
	},
	//组件销毁前清除定时器
	beforeDestroy() {
		clearInterval(this.timer)
	},
	watch: {
		activeTab: function(val) {
			if (val == 2) {
				//支付中---轮询支付状态
				this.$nextTick(() => {
					this.qrcode(this.resultURL)
					let _this = this
					this.timer = setInterval(function() {
						_this.payStatus()
					}, 5000)
				})
			}
		}
	}
}
</script>
<style lang="less" scoped>
.content {
	width: 100%;
	min-height: 100%;
	margin: 50px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	.minddle {
		background: #fff;
		padding: 40px;
	}
}
.step-list {
	height: 40px;
	line-height: 40px;
	.step {
		background: #d4d4d4;
		text-align: center;
		color: #fff;
		margin: 0 5px;
	}
	.first-step {
		z-index: 99;
	}
	.second-step {
		z-index: 88;
	}
	.step-active {
		background: #ff8039;
	}
	.sx-arrow-right {
		float: right;
		border-style: dashed solid dashed dashed;
		border-color: transparent transparent transparent #ff8039;
		border-width: 20px;
		width: 0;
		height: 0;
		margin-right: -40px;
	}
	.arrow-active {
		border-color: transparent transparent transparent #ff8039;
	}
	.arrow-normal {
		border-color: transparent transparent transparent #d4d4d4;
	}
	.sx-arrow-left {
		float: left;
		border-style: dashed solid dashed dashed;
		border-color: transparent transparent transparent #fff;
		border-width: 20px;
		width: 0;
		height: 0;
		left: 0%;
	}
}

.main-form {
	margin-top: 32px;
	flex-direction: column;
	.pay-list {
		display: flex;
		align-items: center;
		/deep/ .el-form-item__content {
			margin-left: 0 !important;
		}
		.pay-item {
			width: 80px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			border: 1px solid #d4d4d4;
			border-radius: 4px;
			margin: 0 5px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			.pay-icon {
				display: inline-block;
				width: 16px;
				height: 16px;
				margin-right: 5px;
			}
			.pay-zfb {
				background: url('../../../assets/zfb.png') no-repeat;
				background-size: 100% 100%;
			}
			.pay-we {
				background: url('../../../assets/wechat.png') no-repeat;
				background-size: 100% 100%;
			}
		}
		.choose-pay {
			animation: borderColor 1s infinite;
			-moz-animation: borderColor 1s infinite; /* Firefox */
			-webkit-animation: borderColor 1s infinite; /* Safari 和 Chrome */
		}
	}
	.pay-status {
		position: absolute;
		z-index: 99;
	}
	#paycode {
		position: relative;
		.pay-list {
			justify-content: center;
			.pay-item {
				border: none;
			}
		}

		display: flex;
		flex-direction: column-reverse;
		justify-content: space-around;
	}
	.form-title {
		margin: 0;
		font-size: 18px;
		font-family: SourceHanSansCN-Medium;
		font-weight: 500;
		color: rgba(54, 128, 255, 1);
		padding-bottom: 8px;
		border-bottom: 1px dashed rgba(197, 197, 197, 1);
		margin-bottom: 18px;
	}
	.TicketForm {
		.el-form-item {
			margin-bottom: 10px;
		}
	}
	.total-money {
		font-size: 20px;
		font-weight: 500;
		color: rgba(255, 82, 82, 1);
	}
	.form-control {
		width: 180px;
	}
	.form-user {
		width: 220px;
	}
	.form-foot {
		width: 200%;
		margin-bottom: 0;
		text-align: center;
		.el-form-item__content {
			margin-left: 0;
		}
	}
	.el-button {
		margin: 0 10px;
		width: 120px;
	}
	.main-pay {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.pay-name {
			font-size: 16px;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			margin: 0;
		}
		.pay-num {
			font-size: 30px;
			font-weight: 600;
			color: rgba(255, 102, 0, 1);
			margin: 20px 0;
		}
		.pay-img {
			width: 232px;
			height: 288px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.26);
			margin-bottom: 60px;
			padding: 16px;
		}
	}
}
@keyframes borderColor {
	0% {
		border-color: #409eff;
		color: #409eff;
	}
	50% {
		border-color: #ff8039;
		color: #ff8039;
	}
	100% {
		border-color: #409eff;
		color: #409eff;
	}
}

@-moz-keyframes borderColor /* Firefox */ {
	0% {
		border-color: #409eff;
		color: #409eff;
	}
	50% {
		border-color: #ff8039;
		color: #ff8039;
	}
	100% {
		border-color: #409eff;
		color: #409eff;
	}
}

@-webkit-keyframes borderColor /* Safari 和 Chrome */ {
	0% {
		border-color: #409eff;
		color: #409eff;
	}
	50% {
		border-color: #ff8039;
		color: #ff8039;
	}
	100% {
		border-color: #409eff;
		color: #409eff;
	}
}
</style>

