<template>
  <el-row class="sail-con">
    <el-col :span="20" class="middle">
      <div class="sail-header">购票须知</div>
      <div class="sail-main">
        <div class="sail-explain" v-for="(item,index) in sailTxt" :key="index">
          <h3 class="sail-title"><span>{{index+1}}. </span>{{item.Title}}</h3>
          <pre class="sail-txt">{{item.Info}}</pre>
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
	margin: 50px 0;
	display: flex;
	justify-content: center;
	align-items: center;

	.sail-header {
		height: 50px;
		text-align: center;
		line-height: 50px;
		background: linear-gradient(134deg, rgba(255, 128, 57, 1) 0%, rgba(255, 193, 65, 1) 100%);
		border-radius: 14px 14px 0px 0px;
		font-size: 18px;
		font-weight: 600;
		padding: 0 16px;
		color: rgba(255, 255, 255, 1);
	}
	.sail-main {
		padding: 0 16px;
		background: #fff;
		.sail-explain {
			padding: 10px 0;
			line-height: 24px;
			.sail-title {
				font-size: 18px;
				font-family: SourceHanSansCN-Medium;
				font-weight: 500;
				color: rgba(255, 128, 57, 1);
			}
			.sail-txt {
				margin: 0;
				padding: 0 10px;
				font-size: 16px;
				font-family: SourceHanSansCN-Regular;
				white-space: pre-wrap;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 36px;
			}
		}
	}
}
</style>

