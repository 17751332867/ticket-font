<template>
    <div>
      <div class="background">
        <img :src="imgSrc" width="100%" height="800px" alt="" />
      </div>
      <div class="font">
        <el-row :style="imgStyle">
          <el-col :span="4" :offset="6" style="border-bottom: #42b983 solid 2px">
            <el-header style="font-size: 30px;color: #42b983;text-align: center">登录</el-header>
          </el-col>
        </el-row>
        <div>
          <el-row>
            <el-col :span="8" :offset="12">
              <div>
                <el-card shadow="always" style='background-color: lightpink'>
                  <el-form ref="User" :model="formData" :rules="rules" size="medium" label-width="100px">-->
                    <el-row :gutter="26">
                      <el-form-item label="电话" prop="phone">
                        <el-input v-model="formData.phone" placeholder="请输入电话" clearable :style="{width: '100%'}">
                        </el-input>
                      </el-form-item>
                    </el-row>
                    <el-row :gutter="26">
                      <el-form-item label="密码" prop="password">
                        <el-input v-model="formData.password" placeholder="请输入密码" clearable show-password
                                  :style="{width: '100%'}"></el-input>
                      </el-form-item>
                    </el-row>
                    <el-form-item size="large">
                      <el-button type="primary" @click="submitForm">提交</el-button>
                      <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
<!--      <el-row>-->
<!--        <el-col :span="8" :offset="8">-->
<!--          <div>-->
<!--            <el-form ref="User" :model="formData" :rules="rules" size="medium" label-width="100px">-->
<!--              <el-row :gutter="26">-->
<!--                <el-form-item label="电话" prop="phone">-->
<!--                  <el-input v-model="formData.phone" placeholder="请输入电话" clearable :style="{width: '100%'}">-->
<!--                  </el-input>-->
<!--                </el-form-item>-->
<!--              </el-row>-->
<!--              <el-row :gutter="26">-->
<!--                <el-form-item label="密码" prop="password">-->
<!--                  <el-input v-model="formData.password" placeholder="请输入密码" clearable show-password-->
<!--                            :style="{width: '100%'}"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-row>-->
<!--              <el-form-item size="large">-->
<!--                <el-button type="primary" @click="submitForm">提交</el-button>-->
<!--                <el-button @click="resetForm">重置</el-button>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </div>
</template>

<script>
  import {getUserByPhone, handlelogin} from '../../api'
export default {
  components: {},
  props: [],
  data () {
    return {
      imgSrc:require('../../assets/register.jpg'),
      formData: {
        phone: undefined,
        password: undefined
      },
      rules: {
        phone: [{
          required: true,
          message: '请输入电话',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    submitForm () {
      console.log("aaa")
      this.$refs['User'].validate(valid => {
        if (!valid) return
        let params = new URLSearchParams()
        params.append("phone",this.formData.phone)
        params.append("password",this.formData.password)
        handlelogin(params).then(res => {
          this.$message.info(res)
          if(res=="登录成功"){

            this.$setCookie("phone",this.formData.phone,5)
            this.$setCookie("username",this.formData.username,5)
            getUserByPhone(this.formData.phone).then(res=>{
              this.$setCookie("userId",res.id)
              window.location.href="http://localhost:8080/"
            })

          }
        })
      })
    },
    resetForm () {
      this.$refs['User'].resetFields()
    }
  }
}

</script>
*{

}
<style scoped>
  .background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
  }

  .front{
    z-index:1;
    position: absolute;
  }
</style>
