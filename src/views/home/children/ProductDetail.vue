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
                    <el-date-picker v-model="dateValue" :picker-options="datePicker" type="date" placeholder="选择日期" :clearable="false" value-format="yyyy-MM-dd"
                      @change="changeData"></el-date-picker>
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
                    <div class="immediately-purchase-btn">
                      <el-button type="primary" plain @click="readyPay">立即订购</el-button>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <!-- 弹窗条款start -->
            <el-dialog title="购买须知" center :visible.sync="readyPayVisible" width="30%" custom-class="ready-explain" :show-close="false">
              <pre class="buy-read">{{productInfo.UseIntroduce}}</pre>
              <el-checkbox v-if="checkVisible" class="article-check" v-model="articleChecked">我已阅读并同意上述条款</el-checkbox>
              <span slot="footer" v-if="checkVisible" class="dialog-footer">
                <el-button @click="readyPayVisible = false">取 消</el-button>
                <el-button type="primary" :class="articleChecked?'':'disabled'" @click="goPay">确 定
                </el-button>
              </span>
            </el-dialog>
            <!-- 游玩攻略 -->
            <div class="navigation-content">
              <div class="play-introduction">
                <div class="navigation-content-title play">
                  <span>游玩攻略</span>
                </div>
                <pre class="details-text">{{productInfo.PlayIntroduce}}</pre>
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
      datePicker: {
        disabledDate(time) {
          let today = new Date()
          return time.getTime() < today.getTime()
        }
      },
      sailNum: 1, //当前数量
      readyPayVisible: false, //立即购买弹窗
      checkVisible: true, //弹窗提交相关
      articleChecked: true //同意条款
    }
  },
  created() {
    let today = new Date()
    let ydate = today.getFullYear()
    let mdate =
      today.getMonth() + 1 >= 10
        ? today.getMonth() + 1
        : '0' + (today.getMonth() + 1)
    let ddate =
      today.getDate() + 1 >= 10
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
        this.productInfo = res.Data[0] || {}
        this.getInitPrice(this.productID, this.dateValue)
      })
    },
    //初始化请求日期价
    getInitPrice(pid, v) {
      this.$ajax
        .get('Product/ProductDetail/' + v, { ProductID: pid, BuyDate: v })
        .then(res => {
          this.productInfo.SellPrice = res.Data.SellPrice
          this.productInfo.TicketPrice = res.Data.TicketPrice
        })
    },
    //日期切换获取当日价格
    changeData(v) {
      this.$ajax
        .get('Product/ProductDetail/' + v, {
          ProductID: this.productID,
          BuyDate: v
        })
        .then(res => {
          this.productInfo.SellPrice = res.Data.SellPrice
          this.productInfo.TicketPrice = res.Data.TicketPrice
        })
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
          id: this.productID,
          ticketNum: this.sailNum,
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
.buy-read {
  white-space: pre-wrap;
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 28px;
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
  text-overflow: ellipsis;
  line-height: 34px;
  margin-bottom: 15px;
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
.immediately-purchase-btn {
  display: flex;
  align-items: center;
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
.navigation-content {
  margin-top: 20px;
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
.details-text {
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin: 10px 0;
  padding: 0 10px;
  text-indent: 28px;
}
</style>
