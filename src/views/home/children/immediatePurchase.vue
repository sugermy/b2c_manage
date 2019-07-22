<template>
  <div class="content">
    <div class="middle">
      <div class="details">
        <div class="details-top">
          <div class="admission-ticket-img-div">
            <img class="ticket-img-big" src="../../../assets/homeImage/test.png" />
            <div class="ticket-img-small-div">
              <img class="ticket-img-small" src="../../../assets/homeImage/test.png" />
              <img class="ticket-img-small" src="../../../assets/homeImage/test.png" />
              <img class="ticket-img-small" src="../../../assets/homeImage/test.png" />
            </div>
          </div>
          <div clas="ticket-information-div">
            <div class="ticket-name">长隆欢乐游泳池</div>
            <div class="ticket-discount-type">
              <div>随时退</div>
            </div>
            <div
              class="ticket-explain"
            >逍遥搏击任飞翔，彩虹绘出真体验，让国人不出国门就可享受到超大型的游乐设施，现在就让我们一起尽情去体验过山车典范的巅峰感受吧</div>
            <div class="ticket-name">
              <span>门票价格：</span>
              <span>￥299</span>
            </div>
            <div class="ticket-name">
              <span>选择日期：</span>
            </div>
            <div class="ticket-name">购买数量：</div>
            <div class="ticket-name">兑换方式：</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
.middle {
  text-align: center;
}
.details {
  width: 1200px;
  display: inline-block;
  background: white;
  padding: 40px;
  box-sizing: border-box;
  margin-top: 50px;
  text-align: left;
}
.details-top {
  display: inline-block;
}
.admission-ticket-img-div {
  width: 600px;
}
.ticket-img-big {
  height: 340px;
  width: 600px;
  margin-bottom: 4px;
}
.ticket-img-small-div {
  display: flex;
  justify-content: space-between;
}
.ticket-img-small {
  height: 110px;
  width: 32.5%;
}
.ticket-information-div {
  width: 520px;
}
</style>
