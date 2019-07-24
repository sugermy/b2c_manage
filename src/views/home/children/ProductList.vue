<template>
  <div class="content">
    <div class="middle">
      <el-row type="flex" justify="center">
        <el-col :span="20" class="carousel-div">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom:50px">
        <div class="scenic-spot-content">
          <el-col :span="16">
            <div class="scenic-spot-left">
              <el-tabs v-model="activeName" @tab-click="changeTab">
                <el-tab-pane label="水上世界成人票" name="first">
                  <div class="list-div" v-for="item in 4" :key="item">
                    <div class="list-img" :style="{background: 'url('+listImgError+')', backgroundSize:'100%', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
                    </div>
                    <div class="list-right">
                      <div class="list-name">长隆欢乐游泳池</div>
                      <div class="list-discount-type">
                        <div class="list-type-div">过期自动退</div>
                      </div>
                      <div class="list-explain">逍遥搏击任飞翔，彩虹绘出真体验，让国人不出国门就可享受到超大型的游乐设施，现在就让我们一起尽情去体验过山车典范的巅峰感受吧...</div>
                      <div class="list-price-div">
                        <div class="price-discount">$300</div>
                        <div class="price-original">$400</div>
                      </div>
                      <div class="list-button">
                        <!-- <button class="subscribe" @click="subscribe()">立即预订</button> -->
                        <el-button type="primary" plain @click="subscribe()">立即预订</el-button>
                        <el-button type="primary" class="to-detail">查看详情</el-button>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="水上世界儿童票" name="second">水上世界儿童票</el-tab-pane>
                <el-tab-pane label="水上世界优惠票" name="third">水上世界优惠票</el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="scenic-spot-right">
              <div class="scenic-top">
                <img src="../../../assets/homeImage/scenic_spot_description_bg.png" class="scenic-information-img" />
                <div class="scenic-name">广州长隆</div>
                <div class="scenic-introduction">
                  广州长隆度假区是长隆集团旗下首个综合性主题旅游度假区，拥有长隆欢乐世界、长隆国际大马戏、长隆水上乐园、长隆野生动物世界、长隆飞鸟乐园和长隆酒店等多家主题公园及酒店，是中国拥有主题公园数量众多和超大规模的综合性。
                </div>
                <div class="scenic-telephone-div">
                  <div class="scenic-telephone-img-div">
                    <img class="scenic-telephone-img" src="../../../assets/homeImage/customer_service.png" />
                  </div>

                  <div class="scenic-telephone-value">
                    <div class="scenic-telephone-name">全国服务热线</div>
                    <div class="scenic-telephone-num">400-666952</div>
                  </div>
                </div>
              </div>
              <div class="scenic-bottom">
                <div class="qr-code-div">
                  <img class="qr-code-img" src="../../../assets/homeImage/subscription_number_qr.png" />
                  <div class="qr-code-name">订阅号</div>
                </div>
                <div class="qr-code-div">
                  <img class="qr-code-img" src="../../../assets/homeImage/official_website_qr.png" />
                  <div class="qr-code-name">官网</div>
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
export default {
  name: 'scenicSpot',
  data() {
    return {
      activeName: 'first',
      imgSize: '100%',
      listImgError: require('../../../assets/homeImage/test.png')
    }
  },
  mounted() {},
  methods: {
    subscribe() {
      this.$router.push({ path: '/Home/Product/Detail' })
    },
    //tab切换
    changeTab(tab, event) {
      console.log(this.activeName)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 100%;
}
.carousel-div {
  display: flex;
  background: blueviolet;
  margin-top: 50px;
}
.scenic-spot-content {
  margin: 16px 0;
  display: flex;
  justify-content: center;
}
.scenic-spot-left {
  background: white;
  padding: 25px 40px;
}

.list-tabs-div {
  box-sizing: border-box;
  background: rgba(235, 244, 247, 1);
}
.qr-code-div {
  text-align: center;
  margin: 0 5px;
}
.list-tab {
  font-size: 20px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(54, 128, 255, 1);
  padding: 14px 30px;
  display: inline-block;
}
.list-tab-active {
  font-size: 20px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  padding: 14px 30px;
  display: inline-block;
  background: rgba(255, 128, 57, 1);
}
.list-div {
  padding: 25px 0;
  border-bottom: 1px dashed rgb(197, 197, 197);
  position: relative;
}
.list-img {
  height: 170px;
  width: 300px;
  display: inline-block;
  transition: background-size 300ms;
}
.list-img:hover {
  background-size: 140% !important;
  transition: 300ms;
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
.list-type-div {
  background: rgba(245, 255, 238, 1);
  border: 1px solid rgba(141, 216, 158, 1);
  font-size: 12px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(54, 181, 83, 1);
  display: inline-block;
  padding: 3px;
  margin-right: 8px;
}
.list-explain {
  font-size: 14px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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

.list-price-div {
  position: absolute;
  padding-top: 10px;
}
.price-discount {
  font-size: 30px;
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
.scenic-top {
  background: rgb(255, 128, 57);
  display: inline-block;
}
.scenic-information-img {
  height: 160px;
  width: 100%;
}
.scenic-name {
  font-size: 24px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  text-align: center;
  color: rgba(255, 255, 255, 1);
}
.scenic-introduction {
  padding: 10px 22px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 29px;
  text-align: left;
  text-indent: 28px;
}
.scenic-telephone-div {
  margin: 22px;
  background: white;
  display: flex;
  padding: 15px;
}
.scenic-telephone-img-div {
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
.qr-code-img {
  height: 100px;
  width: 100px;
  margin-bottom: 1px;
}
.qr-code-name {
  font-size: 14px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
</style>
