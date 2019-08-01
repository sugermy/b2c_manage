<template>
  <el-row class="info-content">
    <el-table :data="tableData" style="width: 100%" header-row-class-name="table-header" height="100%" v-show="changeOrder==1">
      <el-table-column type="index" width="50" label="序号" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="card" label="订单号" min-width="180" header-align="center" align="center"></el-table-column>
      <el-table-column prop="name" label="产品名称" min-width="120" header-align="center" align="center"></el-table-column>
      <el-table-column prop="date" label="购买日期" min-width="120" header-align="center" align="center"></el-table-column>
      <el-table-column prop="num" label="数量" min-width="70" header-align="center" align="center"></el-table-column>
      <el-table-column prop="date" label="游玩日期" min-width="120" header-align="center" align="center"></el-table-column>
      <el-table-column prop="num" label="订单数量" min-width="80" header-align="center" align="center"> </el-table-column>
      <el-table-column prop="type" label="支付方式" min-width="80" header-align="center" align="center"> </el-table-column>
      <el-table-column label="状态" min-width="100" header-align="center" align="center">
        <template slot-scope="scope">
          <p>{{(scope.row.num==1?'已支付':'未支付')}}</p>
          <p class="to-detail" @click="lookDetail(scope.$index, scope.row)">查看详情</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">去支付</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">重发短信</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row v-show="changeOrder==2" class="info-main">
      <el-row class="info-i">
        <h3><i class="info-icon"></i>产品信息</h3>
        <table>
          <tbody>
            <tr>
              <td colspan="2">
                <div class="tr-head"><span>序号：1</span><span>订单号：174728728782</span><span>产品编码：174728728782</span></div>
              </td>
            </tr>
            <tr>
              <td>产品名称：长隆水上乐园</td>
              <td>下单时间：2019-07-22 12：00：00</td>
            </tr>
            <tr>
              <td>订单数量：2</td>
              <td>支付方式：支付宝支付</td>
            </tr>
            <tr>
              <td>总金额： 200</td>
              <td>使用数量：1</td>
            </tr>
            <tr>
              <td>入园时间：2019-08-08</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </el-row>
      <el-row class="info-i">
        <h3><i class="info-icon"></i>订单状态</h3>
        <div class="info-status">
          <div class="info-s-i" :class="index==2?'active-i':''" v-for="(item,index) in infoStatus" :key="index">{{item}}</div>
        </div>
      </el-row>
      <el-row class="info-i">
        <h3><i class="info-icon"></i>游客信息</h3>
        <div class="info-toturs">
          <div class="info-s-i">姓名：{{loginInfo.name}}</div>
          <div class="info-s-i">身份证号：278827823728</div>
          <div class="info-s-i">手机号：1872847282</div>
        </div>
      </el-row>
      <el-row style="text-align:center">
        <el-button type="primary" @click="goBack">返回上一步</el-button>
      </el-row>
    </el-row>
  </el-row>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      changeOrder: 1,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          card: '6217589635896',
          num: 1,
          type: '支付宝',
          id: 1,
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          num: 2,
          type: '支付宝',
          card: '6217589635896',
          id: 2,
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          type: '支付宝',
          id: 3,
          num: 3,
          card: '6217589635896',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          type: '微信',
          num: 4,
          id: 4,
          name: '王小虎',
          card: '6217589635896',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      infoStatus: ['未付款', '已付款', '已使用', '已过期'],
    }
  },
  computed: {
    ...mapState({//结构store仓库数据
      loginInfo: state => state.loginInfo
    })
  },
  methods: {
    //单条查看详情
    lookDetail (i, r) {
      console.log(this.loginInfo)
      this.changeOrder = 2
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    goBack () {
      this.changeOrder = 1
    }
  }
}
</script>
<style lang="less" scoped>
.to-detail {
  font-size: 14px;
  color: rgba(0, 160, 233, 1);
  cursor: pointer;
}
.info-content {
  height: 100%;
  background: #fff;
  padding: 16px;
}
.info-main {
  .info-i {
    margin-bottom: 40px;
    h3 {
      font-size: 16px;
      font-family: SourceHanSansCN-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .info-icon {
        display: inline-block;
        width: 3px;
        height: 16px;
        background: rgba(255, 128, 57, 1);
        margin-right: 6px;
      }
    }
    table {
      width: 100%;
      border-collapse: collapse;
      .tr-head {
        span:nth-of-type(n + 2) {
          margin-left: 14%;
        }
      }
      td {
        height: 54px;
        border: 1px solid rgba(229, 229, 229, 1);
        text-indent: 32px;
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
    .info-status {
      display: flex;
      justify-content: space-between;
      .info-s-i {
        width: 24.5%;
        height: 54px;
        line-height: 54px;
        color: rgba(255, 255, 255, 1);
        background: rgba(216, 216, 216, 1);
        text-align: center;
      }
      .active-i {
        background: rgba(54, 128, 255, 1);
      }
    }
    .info-toturs {
      display: flex;
      justify-content: space-between;
      .info-s-i {
        width: 33%;
        height: 54px;
        line-height: 54px;
        color: #333333;
        background: rgba(242, 249, 255, 1);
        text-align: center;
      }
    }
  }
}
</style>

