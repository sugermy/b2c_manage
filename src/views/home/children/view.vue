<template>
  <div class="content">
    <div class="popup-div">
      <div class="popup-text">快速预定{{merchantInfo.B2CName}}门票</div>
      <div class="break-row"></div>
      <div class="popup-form-div">
        <button class="submitted" @click="sub">快速预订</button>
      </div>
      <div class="tips-div">
        <span class="tips-red">温馨提示：</span>
        <span>如果您在预定过程中遇到问题，请及时查看，或电话咨询{{merchantInfo.B2CName}}客服！</span>
      </div>
    </div>
    <div class="footer">深圳市道控技术有限公司提供技术支持</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
	data() {
		return {}
	},
	computed: {
		...mapState({
			//解构store仓库数据
			merchantInfo: state => state.merchantInfo
		})
	},
	methods: {
		sub() {
			this.$router.push({
				path: './Product'
			})
		}
	}
}
</script>
<style lang="less" scoped>
.content {
	height: 100%;
	overflow: hidden;
}

.popup-div {
	height: 457px;
	width: 808px;
	background: url(../../../assets/home_popup.png) no-repeat;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
}
.popup-text {
	font-size: 30px;
	font-family: PingFangSC-Medium;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
	margin-top: 75px;
}
.break-row {
	display: inline-block;
	width: 535px;
	height: 3px;
	background: url(../../../assets/break_row.png) no-repeat;
	margin: 22px 0;
}
.city-div {
	width: 330px;
	height: 60px;
	border-radius: 6px;
	line-height: 60px;
}
.el-input__inner {
	width: 330px;
	height: 60px !important;
}
/deep/ .el-input--suffix .el-input__inner {
	height: 60px !important;
}
.submitted {
	width: 201px;
	height: 60px;
	background: rgba(255, 128, 57, 1);
	border-radius: 6px;
	font-size: 20px;
	font-family: PingFangSC-Medium;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	cursor: pointer;
	border: 0;
	margin: 24px;
	outline: none;
}
.tips-div {
	font-size: 14px;
	font-family: PingFangSC-Medium;
	font-weight: 500;
	color: #666666;
	margin-top: 90px;
}
.tips-red {
	color: rgba(255, 90, 90, 1);
}
.footer {
	position: absolute;
	bottom: 5%;
	left: 50%;
	transform: translateX(-50%);
	font-size: 12px;
	font-family: PingFangSC-Medium;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
}
</style>

