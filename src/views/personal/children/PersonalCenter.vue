<template>
  <el-row class="form-content">
    <el-col v-show="showTab==1" :span="10" class="form-main">
      <el-form :model="infoForm" label-position="right" :rules="rules" ref="infoForm" label-width="100px" class="infoForm">
        <el-form-item class="label-form" label="昵称：" prop="NickName">
          <el-input class="form-control" :maxlength="6" :readonly="infoStatus.NickName" v-model="infoForm.NickName"></el-input>
          <el-button class="form-btn" v-show="infoStatus.NickName" @click.prevent="modifyItem('NickName')">修改</el-button>
          <el-button class="form-btn" v-show="!infoStatus.NickName" @click.prevent="modifyInfo('NickName',infoForm.NickName)">确定</el-button>
        </el-form-item>
        <el-form-item class="label-form" label="性别：" prop="Gender">
          <div class="form-control" style="width:100%">
            <el-radio :disabled="infoStatus.Gender" v-model="infoForm.Gender" label="男">男</el-radio>
            <el-radio :disabled="infoStatus.Gender" v-model="infoForm.Gender" label="女">女</el-radio>
          </div>
          <el-button class="form-btn" v-show="infoStatus.Gender" @click.prevent="modifyItem('Gender')">修改</el-button>
          <el-button class="form-btn" v-show="!infoStatus.Gender" @click.prevent="modifyInfo('Gender',infoForm.Gender)">确定</el-button>
        </el-form-item>
        <el-form-item class="label-form" label="手机号：" prop="UserPhone">
          <el-input class="form-control" :readonly="infoStatus.UserPhone" v-model="infoForm.UserPhone"></el-input>
          <el-button class="form-btn" v-show="infoStatus.UserPhone" @click.prevent="modifyItem('UserPhone')">修改</el-button>
          <el-button class="form-btn" v-show="!infoStatus.UserPhone" @click.prevent="modifyInfo('UserPhone',infoForm.UserPhone)">确定</el-button>
        </el-form-item>
        <el-form-item class="label-form" label="姓名：" prop="UserName">
          <el-input class="form-control" :readonly="infoStatus.UserName" v-model="infoForm.UserName"></el-input>
          <el-button class="form-btn" v-show="infoStatus.UserName" @click.prevent="modifyItem('UserName')">修改</el-button>
          <el-button class="form-btn" v-show="!infoStatus.UserName" @click.prevent="modifyInfo('UserName',infoForm.UserName)">确定</el-button>
        </el-form-item>
        <el-form-item class="label-form" label="身份证号：" prop="UserIdCard">
          <el-input class="form-control" :readonly="infoStatus.UserIdCard" v-model="infoForm.UserIdCard"></el-input>
          <el-button class="form-btn" v-show="infoStatus.UserIdCard" @click.prevent="modifyItem('UserIdCard')">修改</el-button>
          <el-button class="form-btn" v-show="!infoStatus.UserIdCard" @click.prevent="modifyInfo('UserIdCard',infoForm.UserIdCard)">确定</el-button>
        </el-form-item>
        <el-form-item class="modify-btn">
          <el-button type="primary" @click="modifyPassWord()">修改密码</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col v-show="showTab==2" :span="10" class="form-main">
      <el-form :model="passFrom" label-position="right" :rules="rules" ref="passForm" label-width="100px" class="passForm">
        <el-form-item class="label-form" label="旧密码：" prop="oldPass">
          <el-input class="form-control" type="password" show-password v-model="passFrom.oldPass"></el-input>
        </el-form-item>
        <el-form-item class="label-form" label="新密码：" prop="newPass">
          <el-input class="form-control" type="password" show-password v-model="passFrom.newPass"></el-input>
        </el-form-item>
        <el-form-item class="label-form" label="确认密码：" prop="setNewPass">
          <el-input class="form-control" type="password" show-password v-model="passFrom.setNewPass"></el-input>
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
		var checkEnPassword = (rule, value, callback) => {
			if (value == '') {
				callback(new Error('请再次输入密码'))
			} else if (value != this.passFrom.newPass) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}
		return {
			showTab: 1,
			baseInfo: {}, //保存基本信息
			infoForm: {}, //存在修改信息的info
			infoStatus: {
				NickName: true,
				Gender: true,
				UserIdCard: true,
				UserName: true,
				UserPhone: true
			},
			passFrom: {},
			modifyStatus: false,
			rules: {
				NickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
				UserName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				Gender: [{ required: true, message: '请输入性别', trigger: 'blur' }],
				UserIdCard: [
					{ required: true, message: '请输入身份证号', trigger: 'blur' },
					{
						pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
						message: '身份证号格式不正确',
						trigger: 'blur'
					}
				],
				UserPhone: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
					{
						pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
						message: '手机号码格式不正确',
						trigger: 'blur'
					}
				],
				oldPass: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
				newPass: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
				setNewPass: [{ required: true, validator: checkEnPassword, trigger: 'blur' }]
			}
		}
	},
	created() {
		this.infoForm = JSON.parse(JSON.stringify(this.$store.state.loginInfo))
		this.baseInfo = JSON.parse(JSON.stringify(this.$store.state.loginInfo))
	},
	methods: {
		//提交密码修改
		postPassWord(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let params = {
						OldPwd: this.passFrom.oldPass,
						NewPwd: this.passFrom.newPass
					}
					this.$ajax.post('User/Update/' + this.$store.state.loginInfo.Account, params).then(res => {
						if (res.Code == 200) {
							this.$message({ type: 'success', message: res.Content, center: true, duration: 2000 })
							this.$store.state.loginInfo = { loginStatus: false }
							this.$router.push({ path: '/Home' })
						} else {
							this.$message({ type: res.Type.toLowerCase(), message: res.Content, center: true, duration: 2000 })
						}
					})
				} else {
					return false
				}
			})
		},
		//个人信息修改调用
		modifyInfo(type, val) {
			this.$ajax.post('User/Update', { Utype: type, CharValue: val, Account: this.$store.state.loginInfo.Account }).then(res => {
				if (res.Code == 200) {
					this.$message({ type: 'success', message: res.Content, center: true, duration: 2000 })
					this.$store.state.loginInfo[type] = val
					this.infoStatus[type] = true
				} else {
					this.$message({ type: 'error', message: res.Content, center: true, duration: 2000 })
					this.infoStatus[type] = true
					this.infoForm[type] = this.baseInfo[type]
				}
			})
		},
		//取消密码修改
		cancelPassWord() {
			this.showTab = 1
			this.$refs['passForm'].clearValidate() //重置当前表单验证信息
		},
		//修改密码
		modifyPassWord() {
			this.showTab = 2
			this.$refs['infoForm'].clearValidate() //重置当前表单验证信息
		},
		//修改单条数据
		modifyItem(v) {
			switch (v) {
				case 'NickName':
					this.infoStatus.NickName = false
					break
				case 'Gender':
					this.infoStatus.Gender = false
					break
				case 'UserPhone':
					if (this.infoForm.UserPhone == '') {
						this.infoStatus.UserPhone = false
					} else {
						this.$message({ type: 'warning', message: '当前手机号不允许修改', center: true, duration: 2000 })
					}
					break
				case 'UserIdCard':
					this.infoStatus.UserIdCard = false
					break
				case 'UserName':
					this.infoStatus.UserName = false
					break
			}
		}
	}
}
</script>
<style lang="less" scoped>
.form-content {
	background: #fff;
	// height: 100%;
}
.form-main {
	margin-top: 50px;
	margin-left: 20px;
	min-height: calc(100vh - 270px);
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

