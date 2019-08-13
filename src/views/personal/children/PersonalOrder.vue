<template>
  <el-row class="info-content">
    <el-table :data="tableData" style="width: 100%" header-row-class-name="table-header" height="calc(100% - 60px)" v-show="changeOrder==1">
      <el-table-column type="index" width="50" label="序号" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="OrderNo" label="订单号" min-width="180" header-align="center" align="center"></el-table-column>
      <el-table-column prop="ProductName" label="产品名称" min-width="120" header-align="center" align="center"></el-table-column>
      <el-table-column prop="CreateDate" label="购买日期" min-width="140" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.CreateDate | formatdate}}
        </template>
      </el-table-column>
      <el-table-column prop="PlayDate" label="游玩日期" min-width="120" header-align="center" align="center"></el-table-column>
      <el-table-column prop="BuyCount" label="订单数量" min-width="80" header-align="center" align="center"> </el-table-column>
      <el-table-column prop="PayType" label="支付方式" min-width="80" header-align="center" align="center"> </el-table-column>
      <el-table-column label="状态" min-width="100" header-align="center" align="center">
        <template slot-scope="scope">
          <p>{{scope.row.OrderStatus}}</p>
          <p class="to-detail" @click="lookDetail(scope.$index, scope.row)">查看详情</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button size="mini" :class="scope.row.IsRepay?'':'no-pass'" @click="(scope.row.IsRepay?wentPay(scope.row):'')">去支付</el-button>
          <el-button size="mini" :class="scope.row.IsReMsg?'':'no-pass'" type="danger" @click="(scope.row.IsReMsg?reMsg(scope.row):'')">重发短信</el-button>
        </template>
      </el-table-column>
    </el-table>
    <section class="pagination-wrapper" v-show="changeOrder==1">
      <el-pagination background layout=" total, prev, pager, next, jumper" :total="tableParams.totalNum" :page-size="tableParams.pageSize" :current-page="tableParams.pageNum"
        @current-change="changePage">
      </el-pagination>
    </section>
    <el-row v-show="changeOrder==2" class="info-main">
      <el-row class="info-i">
        <h3><i class="info-icon"></i>产品信息</h3>
        <table>
          <tbody>
            <tr>
              <td colspan="2">
                <div class="tr-head"><span>序号：{{orderDetail.sortNo}}</span><span>订单号：{{orderDetail.OrderNo}}</span><span>产品编码：{{orderDetail.ProductCode}}</span></div>
              </td>
            </tr>
            <tr>
              <td>产品名称：{{orderDetail.ProductName}}</td>
              <td>下单时间：{{orderDetail.CreateTime | formatdate}}</td>
            </tr>
            <tr>
              <td>订单数量：{{orderDetail.ProductCount}}</td>
              <td>支付方式：{{orderDetail.PayType}}</td>
            </tr>
            <tr>
              <td>总金额： {{orderDetail.Amount}}</td>
              <td>使用数量：{{orderDetail.UseCount}}</td>
            </tr>
            <tr>
              <td>入园时间：{{orderDetail.UseTime}}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </el-row>
      <el-row class="info-i">
        <h3><i class="info-icon"></i>订单状态</h3>
        <div class="info-status">
          <div class="info-s-i" :class="item.id==orderDetail.OrderStatus?'active-i':''" v-for="(item,index) in infoStatus" :key="index">{{item.status}}</div>
        </div>
      </el-row>
      <el-row class="info-i">
        <h3><i class="info-icon"></i>游客信息</h3>
        <div class="info-toturs">
          <div class="info-s-i">姓名：{{orderDetail.UserName}}</div>
          <div class="info-s-i">身份证号：{{orderDetail.IDCard}}</div>
          <div class="info-s-i">手机号：{{orderDetail.UserPhone}}</div>
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
	data() {
		return {
			changeOrder: 1,
			tableData: [],
			infoStatus: [{ status: '未付款', id: '1' }, { status: '已付款', id: '2' }, { status: '已使用', id: '3' }, { status: '已过期', id: '4' }, { status: '其他', id: '0' }],
			tableParams: {
				totalNum: 1,
				pageNum: 1,
				pageSize: 8
			},
			orderDetail: {} //订单详情
		}
	},
	computed: {
		...mapState({
			//结构store仓库数据
			loginInfo: state => state.loginInfo
		})
	},
	created() {
		this.getOrder(this.tableParams.pageNum)
	},
	methods: {
		//查看订单详情
		getOrder(pageNum) {
			this.$ajax.get('Order/OrderList', { Mobile: this.loginInfo.UserPhone, page: pageNum, Rows: this.tableParams.pageSize }).then(res => {
				if (res.Data) {
					this.tableParams.totalNum = res.Data.RowsCount || 1
					this.tableData = res.Data.Result_Data || []
				}
			})
		},
		//单条查看详情
		lookDetail(i, r) {
			this.$ajax.get('Order/OrderDetail', { Mobile: this.loginInfo.UserPhone, OrderNo: r.OrderNo }).then(res => {
				if (res.Code == 200) {
					this.orderDetail = res.Data
					this.orderDetail.sortNo = i + 1
					this.changeOrder = 2
				}
			})
		},
		//去支付
		wentPay(row) {
			console.log(row)
			if (row.IsRepay) {
				console.log(1)
			}
		},
		//重发短信
		reMsg(row) {
			console.log(row)
			if (row.IsReMsg) {
				console.log(1)
			}
		},
		//返回上一步
		goBack() {
			this.changeOrder = 1
		},
		//切换分页
		changePage(pageNum) {
			this.getOrder(pageNum)
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
	padding: 16px 16px 0 16px;
	.no-pass {
		background: rgba(229, 229, 229, 1);
		color: #999999;
		border-color: rgba(229, 229, 229, 1);
	}
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
				width: 19.5%;
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
.pagination-wrapper {
	text-align: center;
	padding: 15px 0;
}
</style>

