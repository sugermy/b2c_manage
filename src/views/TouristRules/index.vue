<template>
  <el-row class="sail-con">
    <el-col :span="20" class="middle">
      <div class="sail-header">购票须知</div>
      <div class="sail-main">
        <div class="sail-explain" v-for="(item,index) in sailTxt" :key="index">
          <span>{{index+1}}</span>
          <p>{{item.name}}</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "orderInformation",
  data () {
    return {
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
  }
}
</script>

<style lang="less" scoped>
.sail-con {
  height: 100%;
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .middle {
    height: 100%;
    background: #fff;
  }
  .sail-header {
    height: 50px;
    line-height: 50px;
    background: #ff8039;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    padding: 0 16px;
  }
  .sail-main {
    padding: 0 16px;
    .sail-explain {
      display: flex;
      margin: 10px 0;
      line-height: 24px;
      span {
        margin: 0 10px;
      }
      p {
        margin: 0;
      }
    }
  }
}
</style>

