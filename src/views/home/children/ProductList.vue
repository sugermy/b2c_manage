<template>
  <div class="content">
    <div class="middle">
      <el-row type="flex" justify="center" v-if="merchantInfo.IsStartBannel">
        <el-col :span="20" class="carousel-d" ref="carouseldom">
          <div style="width:100%" @click="targetLink">
            <vue-seamless-scroll :data="bannelList" :class-option="optionLeft" class="seamless-warp">
              <ul class="scroll-list" :style="`width:${seamWidth}px`">
                <li v-for="(item,index) in bannelList" :key="index">
                  <img :src="item.ImgUrl" :data-url="item.LinkUrl" :data-product="item.LinkProduct">
                  <span class="bannel-title">{{item.BannelName}}</span>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom:50px">
        <div class="scenic-spot-content">
          <el-col :span="16">
            <div class="scenic-spot-l">
              <el-radio-group v-model="activeTypeName">
                <el-radio-button :label="item.TitleCode" v-for="(item,index) in typeList" :key="index">{{item.TitleName}}</el-radio-button>
              </el-radio-group>
              <div class="pro-list" v-for="(item,index) in productList" :key="index">
                <div class="list-img">
                  <img :src="item.ImgUrl">
                </div>
                <div class="list-right">
                  <div class="list-name">{{item.ProductName}}</div>
                  <div class="list-discount-type">
                    <div class="list-type list-type-g">{{item.IsRundAnyTime?'随时退':'规则退'}}</div>
                    <div class="list-type list-type-r">{{item.WaitHour==0?'随时用':('延时'+item.WaitHour+'小时使用')}}</div>
                    <div class="list-type list-type-b" v-if="item.IsCheckPerson">身份证入园</div>
                  </div>
                  <div class="list-explain">{{item.ProductIntroduce!=''?item.ProductIntroduce:'暂无详情'}}</div>
                  <div class="list-price">
                    <div class="price-discount">￥{{item.ProductSellPrice}}</div>
                    <div class="price-original">￥{{item.TicketPrice}}</div>
                  </div>
                  <div class="list-button">
                    <el-button type="primary" plain @click="subscribe(item.ProductID)">立即预订</el-button>
                  </div>
                </div>
              </div>
              <section class="pagination-wrapper">
                <el-pagination background layout="total, prev, pager, next, jumper" hide-on-single-page :total="count" :current-page="pageNum" @current-change="changePage">
                </el-pagination>
              </section>
            </div>

          </el-col>
          <el-col :span="4">
            <div class="scenic-spot-r">
              <div class="scenic-top">
                <img :src="merchantInfo.PersonalCancerlImg" class="scenic-information-img" />
                <div class="scenic-name">{{merchantInfo.B2CName}}</div>
                <div class="scenic-introduction">
                  {{merchantInfo.Remark}}
                </div>
                <div class="scenic-telephone-d">
                  <div class="scenic-telephone-img-d">
                    <img class="scenic-telephone-img" src="../../../assets/homeImage/customer_service.png" />
                  </div>

                  <div class="scenic-telephone-value">
                    <div class="scenic-telephone-name">全国服务热线</div>
                    <div class="scenic-telephone-num">{{merchantInfo.CustomerPhone}}</div>
                  </div>
                </div>
              </div>
              <div class="scenic-bottom">
                <div class="qr-code">
                  <img class="qr-code-img" :src="merchantInfo.PublicImg" />
                  <div class="qr-code-name">订阅号：{{merchantInfo.WxName}}</div>
                </div>
              </div>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			activeTypeName: 1, //当前激活的类型
			typeList: [], //产品类型
			listImgError: require('../../../assets/homeImage/test.png'), //产品图---无用  v-for对接可删掉
			productList: [], //产品列表
			count: 1, //产品总数
			pageNum: 1, //当前页码
			bannelList: [
				{
					title: require('../../../assets/homeImage/test.png')
				},
				{
					title: require('../../../assets/homeImage/scenic_spot_description_bg.png')
				}
			], //轮播图循环
			seamWidth: 0 //根据生成的外层dom元素宽度赋值
		}
	},
	computed: {
		...mapState({
			//解构store仓库数据
			merchantInfo: state => state.merchantInfo
		}),
		//无缝轮播插件配置
		optionLeft() {
			return {
				direction: 2,
				limitMoveNum: 1
			}
		}
	},
	mounted() {
		this.getType()
		this.seamWidth = this.$refs.carouseldom.$el.clientWidth
		this.bannelList = this.merchantInfo.BannelList
	},
	methods: {
		//获取类型
		getType() {
			this.$ajax.get('Product/TypeList', {}).then(res => {
				this.typeList = res.Data || []
				this.activeTypeName = this.typeList[0].TitleCode //存在监听事件---因此不必在此调用获取产品
			})
		},
		//获取当前类型下的产品
		getProduct(TitleCode, pageNum) {
			this.$ajax
				.get('Product/ProductList', {
					ProdutType: TitleCode,
					Page: pageNum,
					Rows: 10
				})
				.then(res => {
					this.count = res.RowsCount
					this.productList = res.Data.Result_Data || []
				})
		},
		//立即购买
		subscribe(proId) {
			this.$router.push({ path: '/Home/Product/Detail', query: { id: proId } })
		},
		//切换页码
		changePage(pageNum) {
			this.pageNum = pageNum
			this.getProduct(this.activeTypeName, this.pageNum)
		},
		//点击轮播跳转---获取点击对象实现监听
		targetLink(e) {
			if (e.target.localName == 'img') {
				let productId = e.target.dataset.product
				let url = e.target.dataset.url
				if (url != '') {
					window.open(url, '_blank')
				}
			}
		}
	},
	watch: {
		//监听类型切换
		activeTypeName(v) {
			this.getProduct(v, this.pageNum)
		}
	}
}
</script>

<style lang="less" scoped>
.seamless-warp {
	overflow: hidden;
	height: 200px;
	width: 100%;
	> div {
		width: 100% !important;
	}
	ul.scroll-list {
		display: flex;
		width: 100% !important;
		li {
			width: 300px;
			height: 200px;
			margin-right: 10px;
			position: relative;
			cursor: pointer;
			img {
				width: 100%;
				height: 200px;
			}
			.bannel-title {
				position: absolute;
				bottom: 0;
				left: 0;
				height: 30px;
				line-height: 30px;
				text-align: center;
				width: 100%;
				color: #fff;
				font-weight: bold;
				letter-spacing: 2px;
				background: #ff8039;
			}
		}
		li:first-child {
			margin-left: 10px;
		}
	}
}
.content {
	height: 100%;
}
.carousel-d {
	display: flex;
	margin-top: 50px;
}
.scenic-spot-content {
	margin: 16px 0;
	display: flex;
	justify-content: center;
}
.scenic-spot-l {
	background: white;
	padding: 25px 40px;
	.el-radio-group {
		width: 100%;
		background: #ebf4f7;
	}
}
.qr-code {
	text-align: center;
	margin: 0 5px;
}
.pro-list {
	padding: 25px 0;
	border-bottom: 1px dashed rgb(197, 197, 197);
	position: relative;
}
.list-img {
	height: 170px;
	width: 300px;
	display: inline-block;
	transition: all 300ms;
	overflow: hidden;
	img {
		display: block;
		width: 100%;
		height: 100%;
		transition: all 0.3s;
	}
	img:hover {
		transform: scale(1.4); //放大 倍数随意
	}
}
.list-right {
	display: inline-block;
	width: calc(100% - 300px);
	vertical-align: top;
	padding: 0 16px;
	box-sizing: border-box;
}
.list-name {
	font-size: 26px;
	font-family: SourceHanSansCN-Medium;
	font-weight: 500;
	color: rgba(255, 128, 57, 1);
}
.list-discount-type {
	width: 100%;
	margin: 8px 0;
}
.list-type {
	background: rgba(245, 255, 238, 1);
	font-size: 12px;
	font-family: SourceHanSansCN-Medium;
	font-weight: 500;
	display: inline-block;
	padding: 1px 3px;
	margin-right: 8px;
}
.list-type-g {
	color: #5dc775;
	border: 1px solid #5dc775;
	background: rgba(245, 255, 238, 1);
}
.list-type-r {
	color: #ff6666;
	border: 1px solid #ff6666;
	background: rgba(255, 242, 242, 1);
}
.list-type-b {
	color: #5e99ff;
	border: 1px solid #5e99ff;
	background: rgba(244, 248, 255, 1);
}
.list-explain {
	font-size: 14px;
	height: 40px;
	font-family: SourceHanSansCN-Medium;
	font-weight: 500;
	color: rgba(153, 153, 153, 1);
	// display: -webkit-box;
	// -webkit-box-orient: vertical;
	// -webkit-line-clamp: 2;
	overflow: hidden;
}
.list-button {
	text-align: right;
	margin: 10px 0;
	.el-button--primary.is-plain {
		background-color: #fff;
		color: #5b94f8;
		border-color: #5b94f8;
	}
	.el-button--primary.is-plain:hover {
		background-color: #5b94f8;
		color: #fff;
		border-color: #5b94f8;
	}
	.el-button--primary.is-plain:active {
		background-color: #1364ef;
		border-color: #1364ef;
	}
	.el-button--primary {
		background-color: #3680ff;
		border-color: #3680ff;
		color: #fff;
	}
	.el-button--primary.to-detail:hover {
		background-color: #5b94f8;
		border-color: #5b94f8;
		color: #fff;
	}
	.el-button--primary.to-detail:active {
		background-color: #1364ef;
		border-color: #1364ef;
	}
}
.pagination-wrapper {
	text-align: center;
	padding: 15px 0 0 0;
}
.list-price {
	position: absolute;
	padding-top: 10px;
}
.price-discount {
	font-size: 28px;
	font-family: Roboto-Medium;
	font-weight: 500;
	color: rgba(255, 82, 82, 1);
	display: inline-block;
	margin-right: 10px;
}
.price-original {
	font-size: 16px;
	font-family: PingFangSC-Medium;
	font-weight: 500;
	color: rgba(204, 204, 204, 1);
	display: inline-block;
	text-decoration: line-through;
}
.scenic-spot-r {
	width: 100%;
	height: 100%;
}
.scenic-top {
	background: rgb(255, 128, 57);
	display: inline-block;
	width: 100%;
}
.scenic-information-img {
	width: 100%;
	height: auto;
}
.scenic-name {
	font-size: 24px;
	font-family: SourceHanSansCN-Medium;
	font-weight: 500;
	text-align: center;
	color: rgba(255, 255, 255, 1);
}

.scenic-introduction {
	margin: 0 20px;
	font-size: 14px;
	min-height: 80px;
	font-family: SourceHanSansCN-Regular;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 29px;
	text-align: left;
	text-indent: 28px;
}
.scenic-telephone-d {
	// margin: 22px;
	background: white;
	display: flex;
	padding: 15px;
}
.scenic-telephone-img-d {
	align-items: center;
	display: flex;
}
.scenic-telephone-img {
	height: 36px;
	width: 36px;
}
.scenic-telephone-value {
	margin-left: 5px;
	text-align: left;
}
.scenic-telephone-name {
	font-size: 12px;
	font-family: SourceHanSansCN-Medium;
	font-weight: 500;
	color: rgba(153, 153, 153, 1);
	text-align: left;
	margin-bottom: 6px;
}
.scenic-telephone-num {
	font-size: 18px;
	font-family: DINAlternate-Bold;
	font-weight: bold;
	color: rgba(63, 134, 255, 1);
	letter-spacing: 3px;
	text-align: left;
}
.scenic-bottom {
	width: 100%;
	background: rgb(255, 128, 57);
	display: inline-block;
	display: flex;
	height: 160px;
	margin-top: 13px;
	justify-content: space-around;
	align-items: center;
	position: relative;
}
.scenic-bottom:before {
	content: '';
	position: absolute;
	width: 7px;
	height: 31px;
	border-radius: 4px;
	top: -22px;
	right: 60px;
	background: white;
}
.scenic-bottom:after {
	content: '';
	position: absolute;
	width: 7px;
	height: 31px;
	border-radius: 4px;
	top: -22px;
	left: 60px;
	background: white;
}
.qr-code {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.qr-code-img {
	max-width: 70%;
	max-height: 70%;
	margin-bottom: 1px;
}
.qr-code-name {
	font-size: 14px;
	font-family: SourceHanSansCN-Medium;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
}
@media screen and (max-width: 1680px) and (min-width: 1381px) {
	.scenic-name {
		font-size: 20px;
	}
	.scenic-telephone-num {
		font-size: 14px;
		letter-spacing: 1px;
	}
}
@media screen and (max-width: 1380px) {
	.scenic-name {
		font-size: 18px;
	}
	.scenic-telephone-num {
		font-size: 12px;
		letter-spacing: 0px;
	}
}
</style>
