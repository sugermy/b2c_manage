<template>
  <el-row class="sail-con">
    <el-col :span="20" class="middle">
      <div class="sail-header">购票须知</div>
      <div class="sail-main">
        <div class="sail-explain" v-for="(item,index) in sailTxt" :key="index">
          <h3><span>{{index+1}}. </span>{{item.Title}}</h3>
          <p>{{item.Info}}</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
	data() {
		return {
			sailTxt: []
		}
	},
	created() {
		this.getBueInfo()
	},
	methods: {
		getBueInfo() {
			this.$ajax.get('Park/BuyInfo', {}).then(res => {
				console.log(res)
				this.sailTxt = res.Data
			})
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
			margin: 10px 0;
			line-height: 24px;
			p {
				margin: 0;
				padding: 0 10px;
				text-indent: 10px;
			}
		}
	}
}
</style>

