<template>
  <div class="content">
    <div class="middle">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <div class="details">
            <el-row class="details-top">
              <el-col :span="10">
                <div class="admission-ticket-img-div">
                  <img class="ticket-img-big" :src="productInfo.PicImgBig" />
                  <div class="ticket-img-small-div">
                    <img class="ticket-img-small" :src="productInfo.PicImgSmallOne" />
                    <img class="ticket-img-small" :src="productInfo.PicImgSmallTwo" />
                    <img class="ticket-img-small" :src="productInfo.PicImgSmallThree" />
                  </div>
                </div>
              </el-col>
              <el-col :span="14">
                <div class="ticket-information-div">
                  <div class="ticket-name">{{productInfo.ProductName}}</div>
                  <div class="ticket-discount-type">
                    <div class="type-i type-g">{{productInfo.IsRundAnyTime?'随时退':'规则退'}}</div>
                    <div class="type-i type-r" v-if="productInfo.IsDateLine">延时入园</div>
                    <div class="type-i type-b" v-if="productInfo.IsCheckPerson">身份证入园</div>
                  </div>
                  <div class="ticket-explain">{{productInfo.ProductIntroduce}}</div>
                  <div class="ticket-price">
                    <span class="ticket-price-name">门票价格：</span>
                    <span class="ticket-price-num">￥{{productInfo.ProductSellPrice}}</span>
                  </div>
                  <div class="purchase-date">
                    <span class="purchase-date-name">选择日期：</span>
                    <el-date-picker v-model="dateValue" type="date" placeholder="选择日期" :clearable="false" value-format="yyyy-MM-dd" @change="changeData"></el-date-picker>
                  </div>
                  <div class="purchase-num">
                    <span class="purchase-num-name">购买数量：</span>
                    <img class="operational" src="../../../assets/homeImage/reduce.png" @click="changeNum('-')" />
                    <span class="purchase-num-value">{{sailNum}}</span>
                    <img class="operational" src="../../../assets/homeImage/plus.png" @click="changeNum('+')" />
                  </div>
                  <div class="ticket-exchange">
                    <span class="ticket-exchange-name">兑换方式：</span>
                    <img class="ticket-exchange-img" src="../../../assets/homeImage/message_img.png" style="padding:0;border:0;" />
                    <span class="ticket-exchange-value">短信</span>
                    <img class="ticket-exchange-img" src="../../../assets/homeImage/id_img.png" />
                    <span class="ticket-exchange-value">身份证</span>
                    <img class="ticket-exchange-img" src="../../../assets/homeImage/qr_code_img.png" />
                    <span class="ticket-exchange-value">二维码</span>
                  </div>
                  <div class="ticket-total">
                    <div class="ticket-total-price">
                      <div class="total-price-div">
                        <span class="total-price-name">总计:</span>
                        <span class="total-price-num">￥{{totalMoney}}</span>
                      </div>
                      <div class="price-tips">
                        <img class="warning-img" src="../../../assets/homeImage/warning_img.png" />
                        <span class="price-tips-text">温馨提示：购买前请仔细阅读</span>
                        <span class="price-tips-red" @click="lookExplain">购买须知</span>
                      </div>
                    </div>
                    <div class="immediately-purchase-div">
                      <el-button type="primary" plain @click="readyPay">立即订购</el-button>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>

            <!-- 弹窗条款start -->
            <el-dialog title="购买须知" center :visible.sync="readyPayVisible" width="30%" custom-class="ready-explain" :show-close="false">
              <div class="sail-explain" v-for="(item,index) in sailTxt" :key="index">
                <span>{{index+1}}</span>
                <p>{{item.name}}</p>
              </div>
              <el-checkbox v-if="checkVisible" class="article-check" v-model="articleChecked">我已阅读并同意上述条款</el-checkbox>
              <span slot="footer" v-if="checkVisible" class="dialog-footer">
                <el-button @click="readyPayVisible = false">取 消</el-button>
                <el-button type="primary" :class="articleChecked?'':'disabled'" @click="goPay">确 定
                </el-button>
              </span>
            </el-dialog>
            <!-- 弹窗条款end -->

            <div class="bread_crumb_navigation">
              <div class="navigation-to" :class="navigationActive==1?'navigation-to-active':''" @click="toScorll('play',1)">
                游玩攻略</div>
              <div class="navigation-to" :class="navigationActive==2?'navigation-to-active':''" @click="toScorll('position',2)">地理位置</div>
              <div class="navigation-to" :class="navigationActive==3?'navigation-to-active':''" @click="toScorll('explain',3)">购买须知</div>

            </div>
            <div class="navigation-content">
              <!-- 游玩攻略-->
              <div class="play-introduction">
                <div class="navigation-content-title play">
                  <span>游玩攻略</span>
                </div>
                <div class="details-title">广州长隆度假区 —— 中国一站式综合性旅游度假区</div>
                <div class="details-text">
                  广州长隆度假区是长隆集团旗下首个综合性主题旅游度假区，拥有长隆欢乐世界、长隆国际大马戏、长隆水上乐园、长隆野生动物世界、长隆飞鸟乐园和长隆酒店等多家主题公园及酒店，是中国拥有主题公园数量众多和超大规模的综合性主题旅游度假区，先后被评为“文化产业示范基地
                  ”、“ 科普教育基地 ”、中国首批国家AAAAA 级景区，年接待游客连续多年超过千万人次，位居世界主题景区前列，成为中国在世界旅游业的标杆。</div>
              </div>
              <!-- 游玩攻略-->
              <div class="play-introduction">
                <div class="navigation-content-title position">
                  <span>地理位置</span>
                </div>
                <div class="details-title">广州长隆度假区 —— 中国一站式综合性旅游度假区</div>
                <div class="details-text">长隆欢乐世界是目前国内设备先进、科技含量高、游乐设备众多的超级游乐园，集世界精彩游乐和大型演艺表演为一体，被誉为“中国新一代游乐园的经典之作”。
                  其拥有顶端落差达80米的垂直过山车；由著名游乐设备提供商INTAMIN提供的十环过山车，全世界仅英国和长隆欢乐世界两台；摩托过山车，0-80公里弹射式加速仅需2.8秒；U型滑板，曾作为挑战项目参与《奔跑吧，兄弟》录制；超级大摆锤是新奇酷炫的大型机动游乐设备，最高时速110公里/小时，最大摆幅240度；国际特技剧场，大型水陆空特效剧场结合爆破、枪战、烟火、声光、机动设备、滑水、高空特技等多种超高难度特效；星际决战，原创360度不规则环形荧幕，模拟实景立体观影效果，是超大型5D探险游乐项目。
                  ”、“ 科普教育基地 ”、中国首批国家AAAAA 级景区，年接待游客连续多年超过千万人次，位居世界主题景区前列，成为中国在世界旅游业的标杆。</div>
              </div>
              <!-- 购买须知-->
              <div class="play-introduction">
                <div class="navigation-content-title explain">
                  <span>购买须知</span>
                </div>
                <div class="details-text">
                  广州长隆度假区是长隆集团旗下首个综合性主题旅游度假区，拥有长隆欢乐世界、长隆国际大马戏、长隆水上乐园、长隆野生动物世界、长隆飞鸟乐园和长隆酒店等多家主题公园及酒店，是中国拥有主题公园数量众多和超大规模的综合性主题旅游度假区，先后被评为“文化产业示范基地
                  ”、“ 科普教育基地 ”、中国首批国家AAAAA 级景区，年接待游客连续多年超过千万人次，位居世界主题景区前列，成为中国在世界旅游业的标杆。</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productID: '', //当前详情的产品id
      productInfo: {}, //当前产品信息
      dateValue: '', //选择的日期
      sailNum: 1, //当前数量
      readyPayVisible: false, //立即购买弹窗
      checkVisible: true, //弹窗提交相关
      navigationActive: 1, //锚点链接
      articleChecked: true, //同意条款
      sailTxt: [
        {
          name:
            '主题乐园门票一经预定成功后购票订单一经确认即时成交，有关退改规定，请详见门票《预订须知》对应的退票和改期规则。请务必确认信息无误再进行购买',
          id: 1
        },
        {
          name:
            '主题乐园的所有门票均为指定日票，游客购买门票需指定入园日期，日期选择以购票页面可选日期为准。',
          id: 2
        },
        {
          name:
            '同一订单下的所有游客需同时入园，购票时登记的有效证件持有人本人必须在场，同行游客无需出示证件。',
          id: 3
        },
        {
          name:
            '购买成功的门票仅限选择的入园日期当日有效，仅限使用一次，出园后再次入园需重新购买。',
          id: 4
        },
        {
          name:
            '购票后如遇园区推出优惠促销活动，恕不另行通知，也不能享受该优惠。',
          id: 5
        },
        {
          name:
            '购票信息请注意保密，因游客个人原因泄露该信息而造成的损失由游客自行承担。',
          id: 6
        },
        {
          name:
            '购买儿小童或长老人票的游客，如儿童身高超过标准或老人游客入园时未能出示有效的身份证明文件，游客须按门市价自行重新购票。',
          id: 7
        }
      ]
    }
  },
  created() {
    let today = new Date()
    let ydate = today.getFullYear()
    let mdate =
      today.getMonth() + 1 > 10
        ? today.getMonth() + 1
        : '0' + (today.getMonth() + 1)
    let ddate =
      today.getDate() + 1 > 10
        ? today.getDate() + 1
        : '0' + (today.getDate() + 1)
    let nextDate = ydate + '-' + mdate + '-' + ddate
    this.dateValue = nextDate
    this.productID = this.$route.query.id || ''
    this.getProInfo(this.productID)
  },
  computed: {
    //总计
    totalMoney: function() {
      return this.sailNum * this.productInfo.ProductSellPrice
    }
  },
  methods: {
    //获取产品详情
    getProInfo(pid) {
      this.$ajax.get('Product/ProductDetail', { ProductID: pid }).then(res => {
        console.log(res)
        this.productInfo = res.Data[0] || {}
      })
    },
    //日期切换获取当日价格
    changeData(v) {
      console.log(v)
    },
    //数量加减
    changeNum(v) {
      if (v == '+') {
        this.sailNum++
      } else {
        if (this.sailNum > 1) {
          this.sailNum--
        }
      }
    },
    //锚点链接
    toScorll(v, n) {
      const returnEle = document.querySelector('.' + v)
      this.navigationActive = n
      if (returnEle || false) {
        returnEle.scrollIntoView(true)
      }
    },
    //点击购买须知弹窗
    lookExplain() {
      this.checkVisible = false
      this.readyPayVisible = true
    },
    //立即订购调用弹窗
    readyPay() {
      this.checkVisible = true
      this.readyPayVisible = true
    },
    //确定购买
    goPay() {
      this.$router.push({
        path: 'OrderForm',
        query: {
          id: 1,
          ticketNum: this.sailNum,
          sailPrice: this.sailPrice,
          palyData: this.dateValue
        }
      })
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
}
.details {
  background: white;
  padding: 40px;
  box-sizing: border-box;
  margin: 50px 0;
  text-align: left;
}
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
.details-top {
  width: 100%;
  height: 100%;
}
.ticket-img-big {
  height: 340px;
  width: 100%;
  margin-bottom: 4px;
}
.ticket-img-small-div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.ticket-img-small {
  height: 110px;
  width: calc(100% / 3 - 5px);
}
.ticket-information-div {
  vertical-align: top;
  padding-left: 45px;
  box-sizing: border-box;
}
.ticket-name {
  font-size: 26px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(255, 128, 57, 1);
}
.ticket-discount-type {
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  margin: 14px 0;
}
.type-i {
  background: rgba(245, 255, 238, 1);
  font-size: 12px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  padding: 2px;
  display: inline-block;
  margin-right: 5px;
}
.type-g {
  color: #5dc775;
  border: 1px solid #5dc775;
}
.type-r {
  color: #ff6666;
  border: 1px solid #ff6666;
}
.type-b {
  color: #5e99ff;
  border: 1px solid #5e99ff;
}
.ticket-explain {
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 34px;
  padding-bottom: 15px;
  border-bottom: 1px dashed rgb(197, 197, 197);
}
.ticket-price {
  margin: 16px 0;
}
.ticket-price-name {
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(103, 119, 142, 1);
}
.ticket-price-num {
  font-size: 18px;
  font-family: DINAlternate-Bold;
  font-weight: bold;
  color: rgba(255, 82, 82, 1);
}
.purchase-date {
  margin: 20px 0;
}
.purchase-date-name {
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(103, 119, 142, 1);
}
.purchase-num {
  margin: 18px 0;
}
.purchase-num-name {
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(103, 119, 142, 1);
}
.operational {
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  cursor: pointer;
}
.purchase-num-value {
  font-size: 18px;
  font-family: DINAlternate-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  margin: 0 10px;
  vertical-align: middle;
}
.ticket-exchange {
  margin-top: 28px;
  margin-bottom: 5px;
  padding-bottom: 25px;
  border-bottom: 1px dashed rgb(197, 197, 197);
}
.ticket-exchange-name {
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(103, 119, 142, 1);
}
.ticket-exchange-img {
  height: 14px;
  width: 14px;
  vertical-align: middle;
  padding-left: 12px;
  border-left: 1px solid rgb(216, 216, 216);
}
.ticket-exchange-value {
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin: 0 12px 0 6px;
}
.ticket-total {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.ticket-total-price {
  margin-right: 20px;
}
.total-price-div {
  margin-bottom: 10px;
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
}
.total-price-name {
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(103, 119, 142, 1);
}
.total-price-num {
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 82, 82, 1);
  margin-left: 3px;
}
.warning-img {
  width: 14px;
  height: 14px;
  margin-right: 7px;
  vertical-align: middle;
}
.price-tips-text {
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  vertical-align: middle;
}
.price-tips-red {
  font-size: 14px;
  font-weight: 400;
  color: #ff5151;
  cursor: pointer;
  vertical-align: middle;
}
.immediately-purchase-div {
  display: flex;
  align-items: center;
}
.purchase-button {
  background: rgba(255, 236, 226, 1);
  border-radius: 2px;
  border: 1px solid rgba(255, 128, 57, 1);
  font-size: 18px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(255, 128, 57, 1);
  height: 45px;
  width: 130px;
  margin-top: 10px;
}
.bread_crumb_navigation {
  width: 100%;
  height: 50px;
  border: 1px solid rgba(202, 202, 202, 1);
  margin: 32px 0;
  box-sizing: border-box;
}
.navigation-to {
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  margin: 14.5px 0;
  padding: 0 32px;
  display: inline-block;
  border-right: 1px dotted #959595;
  cursor: pointer;
}
.navigation-to:last-child {
  border-right: none;
}
.navigation-to-active {
  color: rgba(255, 128, 57, 1);
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
}
.navigation-content-title {
  width: 100%;
  height: 34px;
  background: rgba(238, 238, 238, 1);
  line-height: 34px;
}
.navigation-content-title span {
  font-size: 14px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(255, 128, 57, 1);
  padding-left: 9px;
  border-left: 4px solid rgba(255, 128, 57, 1);
  margin-left: 8px;
  height: 14px;
}
.details-title {
  font-size: 20px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin: 16px 0;
}
.details-text {
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin: 16px 0;
}
</style>
