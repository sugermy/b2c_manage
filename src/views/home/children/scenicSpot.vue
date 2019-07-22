<template>
  <div class="content">
    <div class="middle">
      <div class="carousel-div">
        <el-carousel height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="scenic-spot-content">
        <div class="scenic-spot-left">
          <div class="list-title-div">
            <span class="list-title">水上世界成人票</span>
          </div>

          <div class="list-div" v-for="item in 4" :key="item">
            <img src="../../../assets/homeImage/test.png" class="list-img" />
            <div class="list-right">
              <div class="list-name">长隆欢乐游泳池</div>
              <div class="list-discount-type">
                <div class="list-type-div">过期自动退</div>
              </div>
              <div
                class="list-explain"
              >逍遥搏击任飞翔，彩虹绘出真体验，让国人不出国门就可享受到超大型的游乐设施，现在就让我们一起尽情去体验过山车典范的巅峰感受吧...</div>
              <div class="list-price-div">
                <div class="price-discount">$300</div>
                <div class="price-original">$400</div>
              </div>
              <div class="list-button">
                <button class="subscribe">立即预订</button>
                <button class="details">查看详情</button>
              </div>
            </div>
          </div>
        </div>
        <div class="scenic-spot-right">
            <img src="../../../assets/homeImage/" class="scenic-information-img">
            <div class="scenic-name">广州长隆
</div>
<div class="scenic-introduction"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "scenicSpot",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  overflow: auto;
  background: url(../../../assets/home_bg.png) no-repeat center;
}
.carousel-div {
  width: 1200px;
  display: inline-block;
  background: blueviolet;
  margin-top: 50px;
}
.middle {
  text-align: center;
}
.scenic-spot-content {
  width: 1200px;
  display: inline-block;

  margin-top: 16px;
}
.scenic-spot-left {
  width: 880px;
  display: inline-block;
  margin-right: 16px;
  background: white;
  text-align: left;
  padding: 25px 40px;
  box-sizing: border-box;
}

.list-title-div {
  border-bottom: 1px solid rgb(197, 197, 197);
  box-sizing: border-box;
}
.list-title {
  font-size: 26px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(54, 128, 255, 1);
  border-bottom: 3px solid rgb(255, 128, 57);
  display: inline-block;
  padding: 8px;
}
.list-div {
  padding: 25px 0;
  border-bottom: 1px dashed rgb(197, 197, 197);
  position:relative;
}
.list-img {
  height: 170px;
  width: 300px;
  display: inline-block;
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
  margin-top: 16px;
  margin-bottom: 2px;
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
}
.list-button button {
  background: rgba(234, 242, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(128, 175, 255, 1);
  font-size: 14px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(54, 128, 255, 1);
  padding: 8px 15px;
  margin: 0 8px;
}
.list-button button:hover {
  background: rgba(54, 128, 255, 1);
  color: white;
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
.scenic-spot-right {
  width: 300px;
  display: inline-block;
  background: white;
}
</style>
