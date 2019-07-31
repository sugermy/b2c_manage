<template>
  <el-row class="content">
    <el-col :span="20" class="minddle">
      <el-row type="flex" justify="space-between" class="step-list">
        <el-col :span="8" class="step first-step" :class="(activeTab==1||activeTab==2||activeTab==3?'step-active':'')">
          1、填写订单<span :class="(activeTab==1||activeTab==2||activeTab==3?'sx-arrow-right arrow-active':'sx-arrow-right arrow-normal')"></span>
        </el-col>
        <el-col :span="8" class="step second-step" :class="(activeTab==2||activeTab==3?'step-active':'')">2、在线支付<span class="sx-arrow-left"></span><span
            :class="(activeTab==2||activeTab==3?'sx-arrow-right arrow-active':'sx-arrow-right arrow-normal')"></span>
        </el-col>
        <el-col :span="8" class="step three-step" :class="(activeTab==3?'step-active':'')">3、支付完成<span class="sx-arrow-left"></span></el-col>
      </el-row>

      <el-row class="main-form" v-if="activeTab==1">
        <h3 class="form-title">订购信息</h3>
        <el-row>
          <el-col :span="12">
            <el-form ref="TicketForm" class="TicketForm" :model="TicketForm" label-width="90px" label-position="left">
              <el-form-item label="门票名称：">
                <span>长隆水上乐园</span>
              </el-form-item>
              <el-form-item label="门票单价：">
                <span>￥{{TicketInit.sailPrice}}/张</span>
              </el-form-item>
              <el-form-item label="门票数量：">
                <el-input-number class="form-control" v-model="TicketForm.ticketNum" :value="TicketInit.ticketNum" controls-position="right" @change="handleChange" :min="1"
                  :max="999">
                </el-input-number>
              </el-form-item>
              <el-form-item label="选择日期：">
                <el-date-picker type="date" placeholder="选择日期" :clearable="false" v-model="TicketForm.palyData" :value="TicketInit.palyData" class="form-control">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="订单总额：">
                <span class="total-money">{{totalMoney}}</span>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <h3 class="form-title">联系人信息</h3>
        <el-row>
          <el-col :span="12">
            <el-form ref="UserForm" class="UserForm" :model="UserForm" :rules="rules" label-width="100px" label-position="left">
              <el-form-item label="游客姓名：" prop="touristName">
                <el-input v-model="UserForm.touristName" class="form-user"></el-input>
              </el-form-item>
              <el-form-item label="身份证号：" prop="touristIdCard">
                <el-input v-model="UserForm.touristIdCard" class="form-user"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="touristPhone">
                <el-input v-model="UserForm.touristPhone" class="form-user"></el-input>
              </el-form-item>
              <el-form-item class="form-foot">
                <el-button type="primary" plain @click="resetForm('UserForm')">取消</el-button>
                <el-button type="primary" @click="submitForm('UserForm')">提交订单</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="main-form" v-if="activeTab==2" type="flex" justify="center" align="middle">
        <el-col :span="6" class="main-pay">
          <h3 class="pay-name">商品名称：长隆水上乐园</h3>
          <p class="pay-num">￥10086</p>
          <div class="pay-img"></div>
          <div>
            <el-button type="primary" plain>取消</el-button>
            <el-button type="primary" :loading="true">等待支付</el-button>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      activeTab: 1, //当前step
      TicketInit: {},
      TicketForm: {
        ticketNum: '',
        palyData: '',
        sailPrice: 0
      }, //订单提交表单数据
      UserForm: {
        touristName: '',
        touristIdCard: '',
        touristPhone: ''
      }, //联系人提交表单数据
      rules: {
        //验证规则
        touristName: [
          { required: true, message: '请输入游客姓名', trigger: 'blur' },
          { min: 2, max: 6, message: '游客姓名格式不正确', trigger: 'blur' }
        ],
        touristIdCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: '身份证号格式不正确',
            trigger: 'blur'
          }
        ],
        touristPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          {
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: '联系电话格式不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    if (this.$route.query) {
      this.TicketInit = { ...this.$route.query }
      this.TicketForm.ticketNum = this.TicketInit.ticketNum
    }
  },
  computed: {
    //当前总价
    totalMoney () {
      var totalN = this.TicketForm.ticketNum * this.TicketInit.sailPrice
      return '￥' + totalN
    }
  },
  methods: {
    //门票数量切换
    handleChange () { },
    //提交订单信息
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证成功
          this.activeTab = 2
        } else {
          //非空验证失败
          return false
        }
      })
    },
    //取消
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  watch: {
    activeTab: function (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  min-height: 100%;
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .minddle {
    background: #fff;
    padding: 40px;
  }
}
.step-list {
  height: 40px;
  line-height: 40px;
  .step {
    background: #d4d4d4;
    text-align: center;
    color: #fff;
    margin: 0 5px;
  }
  .first-step {
    z-index: 99;
  }
  .second-step {
    z-index: 88;
  }
  .step-active {
    background: #ff8039;
  }
  .sx-arrow-right {
    float: right;
    border-style: dashed solid dashed dashed;
    border-color: transparent transparent transparent #ff8039;
    border-width: 20px;
    width: 0;
    height: 0;
    margin-right: -40px;
  }
  .arrow-active {
    border-color: transparent transparent transparent #ff8039;
  }
  .arrow-normal {
    border-color: transparent transparent transparent #d4d4d4;
  }
  .sx-arrow-left {
    float: left;
    border-style: dashed solid dashed dashed;
    border-color: transparent transparent transparent #fff;
    border-width: 20px;
    width: 0;
    height: 0;
    left: 0%;
  }
}
.main-form {
  margin-top: 32px;
  .form-title {
    margin: 0;
    font-size: 18px;
    font-family: SourceHanSansCN-Medium;
    font-weight: 500;
    color: rgba(54, 128, 255, 1);
    padding-bottom: 8px;
    border-bottom: 1px dashed rgba(197, 197, 197, 1);
    margin-bottom: 18px;
  }
  .TicketForm {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
  .total-money {
    font-size: 20px;
    font-weight: 500;
    color: rgba(255, 82, 82, 1);
  }
  .form-control {
    width: 180px;
  }
  .form-user {
    width: 220px;
  }
  .form-foot {
    width: 200%;
    margin-bottom: 0;
    text-align: center;
    .el-form-item__content {
      margin-left: 0;
    }
  }
  .el-button {
    margin: 0 10px;
    width: 120px;
  }
  .main-pay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .pay-name {
      font-size: 16px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin: 0;
    }
    .pay-num {
      font-size: 30px;
      font-weight: 600;
      color: rgba(255, 102, 0, 1);
      margin: 20px 0;
    }
    .pay-img {
      width: 232px;
      height: 288px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.26);
      margin-bottom: 60px;
      padding: 16px;
    }
  }
}
</style>

