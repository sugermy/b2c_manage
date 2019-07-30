<template>
  <el-row class="form-content">
    <el-col v-if="showTab==1" :span="10" class="form-main">
      <el-form :model="ruleForm" label-position="right" :rules="rules" ref="ruleForm" label-width="100px"
        class="ruleForm">
        <el-form-item class="label-form" label="昵称：" prop="name">
          <el-input class="form-control" v-model="ruleForm.name"></el-input>
          <el-button class="form-btn" @click.prevent="modifyItem(ruleForm.name)">修改</el-button>
        </el-form-item>
        <el-form-item class="label-form" label="性别：" prop="sex">
          <el-input class="form-control" v-model="ruleForm.sex"></el-input>
          <el-button class="form-btn" @click.prevent="modifyItem(ruleForm.sex)">修改</el-button>
        </el-form-item>
        <el-form-item class="label-form" label="身份证号：" prop="Idcard">
          <el-input class="form-control" v-model="ruleForm.Idcard"></el-input>
          <el-button class="form-btn" @click.prevent="modifyItem(ruleForm.Idcard)">修改</el-button>
        </el-form-item>
        <el-form-item class="label-form" label="手机号：" prop="phone">
          <el-input class="form-control" v-model="ruleForm.phone"></el-input>
          <el-button class="form-btn" @click.prevent="modifyItem(ruleForm.phone)">修改</el-button>
        </el-form-item>
        <el-form-item class="modify-btn">
          <el-button type="primary" @click="modifyPassWord()">修改密码</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col v-if="showTab==2" :span="10" class="form-main">
      <el-form :model="passFrom" label-position="right" :rules="rules" ref="passForm" label-width="100px"
        class="ruleForm">
        <el-form-item class="label-form" label="旧密码：" prop="oldPass">
          <el-input class="form-control" v-model="passFrom.oldPass"></el-input>
        </el-form-item>
        <el-form-item class="label-form" label="新密码：" prop="newPass">
          <el-input class="form-control" v-model="passFrom.newPass"></el-input>
        </el-form-item>
        <el-form-item class="label-form" label="确认密码：" prop="setNewPass">
          <el-input class="form-control" v-model="passFrom.setNewPass"></el-input>
        </el-form-item>
        <el-form-item class="form-foot">
          <el-button @click="cancelPassWord()">取消</el-button>
          <el-button type="primary" @click="postPassWord('passForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      showTab: 1,
      ruleForm: {},
      passFrom: {},
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        Idcard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: '身份证号格式不正确',
            trigger: 'blur'
          }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          {
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: '联系电话格式不正确',
            trigger: 'blur'
          }
        ],
        oldPass: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPass: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        setNewPass: [
          { required: true, message: '请确认新密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    postPassWord(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelPassWord() {
      this.showTab = 1
    },
    //修改密码
    modifyPassWord() {
      this.showTab = 2
    },
    //修改单条数据
    modifyItem(v) {
      console.log(v)
    }
  }
}
</script>
<style lang="less" scoped>
.form-content {
  background: #fff;
  height: 100%;
}
.form-main {
  margin-top: 50px;
  margin-left: 20px;
  .form-btn {
    border: none;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(0, 160, 233, 1);
  }
  .form-btn:hover {
    background: #f7f7f7;
  }
  .form-foot {
    button {
      width: 120px;
    }
  }
}
</style>

