<template>
  <el-row class="content">
    <el-col :span="20" class="contactus-us">
      <el-col :span="6" class="contactus-bus contactus-l">
        <div class="contactus-i" v-for="(item,index) in contactusList" :key="index">
          <img :src="item.imgUrl" class="contactus-img">
          <div class="contactus-txt">
            <h3 class="contactus-title">{{item.name}}</h3>
            <p class="contactus-main" :class="index==0?'hote-line':''">{{item.main}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="18" class="contactus-bus contactus-r">
        <img class="contactus-map" :src="mapImg" />
      </el-col>
    </el-col>
  </el-row>

</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'Contactus',
	data() {
		return {
			contactusList: [], //关于实体信息
			mapImg: '' //地图
		}
	},
	computed: {
		...mapState({
			//解构store仓库数据
			merchantInfo: state => state.merchantInfo
		})
	},
	created() {
		this.contactusList = [
			{
				imgUrl: require('../../assets/contactus/hoteline.png'),
				name: '全国服务热线',
				main: this.merchantInfo.CustomerPhone
			},
			{
				imgUrl: require('../../assets/contactus/adress.png'),
				name: '地址',
				main: this.merchantInfo.ContactAddress
			},
			{
				imgUrl: require('../../assets/contactus/phone.png'),
				name: '电话',
				main: this.merchantInfo.ContactPhone
			},
			{
				imgUrl: require('../../assets/contactus/realmsg.png'),
				name: '传真',
				main: this.merchantInfo.ContactFax
			},
			{
				imgUrl: require('../../assets/contactus/msg.png'),
				name: '邮编',
				main: this.merchantInfo.ContactZipCode
			}
		]
		this.mapImg = this.merchantInfo.ContactMap || ''
	}
}
</script>
<style lang="less" scoped>
.content {
	height: 100%;
	margin-top: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	.contactus-us {
		height: 100%;
		background: #fff;
		padding: 40px 36px;
		box-sizing: border-box;
		.contactus-bus {
			height: 100%;
			.contactus-i {
				display: flex;
				align-items: center;
				min-height: 15%;
				box-sizing: border-box;
				border-bottom: 1px dashed #ccc;
				padding: 0 12px;
				background: rgba(248, 248, 248, 1);
				.contactus-img {
					width: 20px;
					height: 20px;
					margin-right: 12px;
				}
				.contactus-txt {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
				}
				.contactus-title {
					margin: 0;
					font-size: 14px;
					font-family: SourceHanSansCN-Regular;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
				}
				.contactus-main {
					margin: 0;
					font-size: 14px;
					font-family: SourceHanSansCN-Regular;
					font-weight: 400;
					color: #333333;
					margin-top: 10px;
				}
				.hote-line {
					font-size: 24px;
					font-family: DINAlternate-Bold;
					font-weight: bold;
					color: rgba(255, 128, 57, 1);
					letter-spacing: 4px;
				}
				@media screen and (max-width: 1680px) and (min-width: 1381px) {
					.hote-line {
						font-size: 20px;
						letter-spacing: 2px;
					}
				}
				@media screen and (max-width: 1380px) {
					.hote-line {
						font-size: 18px;
						letter-spacing: 1px;
					}
				}
			}
		}
		.contactus-r {
			height: 100%;
			padding-left: 12px;
			display: flex;
			justify-content: center;
			align-items: center;
			.contactus-map {
				max-width: 100%;
				max-height: 100%;
			}
		}
	}
}
</style>

