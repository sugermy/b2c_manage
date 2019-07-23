<template>
  <div class="content">
    <div class="middle">
      <div class="details">
        <el-row class="details-top">
          <el-col :span="10">
            <div class="admission-ticket-img-div">
              <img class="ticket-img-big" src="../../../assets/homeImage/test.png" />
              <div class="ticket-img-small-div">
                <img class="ticket-img-small" src="../../../assets/homeImage/test.png" />
                <img class="ticket-img-small" src="../../../assets/homeImage/test.png" />
                <img class="ticket-img-small" src="../../../assets/homeImage/test.png" />
              </div>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="ticket-information-div">
              <div class="ticket-name">长隆欢乐游泳池</div>
              <div class="ticket-discount-type">
                <div class="type-div">随时退</div>
              </div>
              <div class="ticket-explain">逍遥搏击任飞翔，彩虹绘出真体验，让国人不出国门就可享受到超大型的游乐设施，现在就让我们一起尽情去体验过山车典范的巅峰感受吧</div>
              <div class="ticket-price">
                <span class="ticket-price-name">门票价格：</span>
                <span class="ticket-price-num">￥299</span>
              </div>
              <div class="purchase-date">
                <span class="purchase-date-name">选择日期：</span>
                <el-date-picker v-model="dateValue" type="date" placeholder="选择日期"></el-date-picker>
              </div>
              <div class="purchase-num">
                <span class="purchase-num-name">购买数量：</span>
                <img class="operational" src="../../../assets/homeImage/reduce.png" />
                <span class="purchase-num-value">1</span>
                <img class="operational" src="../../../assets/homeImage/plus.png" />
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
                    <span class="total-price-num">￥1000</span>
                  </div>
                  <div class="price-tips">
                    <img class="warning-img" src="../../../assets/homeImage/warning_img.png" />
                    <span class="price-tips-text">温馨提示：购买前请仔细阅读</span>
                    <span class="price-tips-red">购买须知</span>
                  </div>
                </div>
                <div class="immediately-purchase-div">
                  <button class="purchase-button">立即订购</button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="bread_crumb_navigation">
          <div class="navigation-to navigation-to-active" @click="toScorll('play')">游玩攻略</div>
          <div class="navigation-to" @click="toScorll('position')">地理位置</div>
          <div class="navigation-to" @click="toScorll('explain')">购买须知</div>

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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateValue: '' //选择的日期
    }
  },
  created() {
    var today = new Date()
    this.dateValue = new Date(today.getTime() + 24 * 60 * 60 * 1000)
  },
  computed: {
    fullName: function() {
      return ''
    }
  },
  methods: {
    toScorll(value) {
      const returnEle = document.querySelector('.' + value)
      if (!!returnEle) {
        returnEle.scrollIntoView(true)
      }
    }
  }
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
  margin-top: 50px;
  text-align: left;
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
.type-div {
  background: rgba(245, 255, 238, 1);
  border: 1px solid rgba(141, 216, 158, 1);
  font-size: 12px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(93, 199, 117, 1);
  padding: 2px;
  display: inline-block;
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
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: #ff5151;
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
