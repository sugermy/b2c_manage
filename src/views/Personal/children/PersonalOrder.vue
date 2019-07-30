<template>
  <el-row>
    <el-table :data="tableData" style="width: 100%" header-row-class-name="table-header" height="100%">
      <el-table-column type="index" width="50" label="序号" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="card" label="订单号" width="180" header-align="center" align="center"></el-table-column>
      <el-table-column prop="name" label="产品名称" width="120" header-align="center" align="center"></el-table-column>
      <el-table-column prop="date" label="购买日期" width="120" header-align="center" align="center"></el-table-column>
      <el-table-column prop="num" label="数量" width="80" header-align="center" align="center"></el-table-column>
      <el-table-column prop="date" label="游玩日期" width="120" header-align="center" align="center"></el-table-column>
      <el-table-column prop="num" label="订单数量" width="80" header-align="center" align="center"> </el-table-column>
      <el-table-column prop="type" label="支付方式" width="100" header-align="center" align="center"> </el-table-column>
      <el-table-column label="状态" width="100" header-align="center" align="center">
        <template slot-scope="scope">
          <p>{{(scope.row.num==1?'已支付':'未支付')}}</p>
          <p class="to-detail" @click="lookDetail(scope.$index, scope.row)">查看详情</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">去支付</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">重发短信</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          card: '6217589635896',
          num: 1,
          type: '支付宝',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          num: 2,
          type: '支付宝',
          card: '6217589635896',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          type: '支付宝',
          num: 3,
          card: '6217589635896',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          type: '微信',
          num: 4,
          name: '王小虎',
          card: '6217589635896',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    //单条查看详情
    lookDetail (i, r) {
      console.log(i, r)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
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
</style>

