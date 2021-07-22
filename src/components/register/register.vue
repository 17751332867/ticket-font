<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="800px" alt="" />
    </div>
    <div class="font">
      <el-row :style="imgStyle">
        <el-col :span="4" :offset="6" style="border-bottom: #42b983 solid 2px">
          <el-header style="font-size: 30px;color: #42b983;text-align: center">注册</el-header>
        </el-col>
      </el-row>
      <div>
        <el-row>
          <el-col :span="8" :offset="12">
            <div>
              <el-card shadow="always" style='background-color: lightpink'>
                <el-form ref="User" :model="formData" :rules="rules" size="medium" label-width="100px">
                  <el-row :gutter="26">
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="formData.username" placeholder="请输入用户名" clearable :style="{width: '100%'}">
                      </el-input>
                    </el-form-item>
                  </el-row>
                  <el-row :gutter="26" style="margin-left: -26px">
                    <el-col :span="18">
                      <el-form-item label="手机号" prop="phone">
                        <el-input v-model="formData.phone" placeholder="请输入手机" clearable :style="{width: '100%'}">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-button type="primary" size="mini" style="width: 120%;font-size: 10px" @click="getValidate()" :loading="loading" >获取验证码<div v-show="loading">
                        {{this.seconds}}
                      </div></el-button>
                    </el-col>
                  </el-row>
                  <el-row :gutter="26">
                    <el-form-item label="验证码" prop="username">
                      <el-input v-model="inputValidate" placeholder="请输入验证码" clearable :style="{width: '100%'}" >
                      </el-input>
                    </el-form-item>
                  </el-row>
                  <el-row :gutter="26">
                    <el-form-item label="密码" prop="password">
                      <el-input v-model="formData.password" placeholder="请输入密码" clearable :style="{width: '100%'}" type="password">
                      </el-input>
                    </el-form-item>
                  </el-row>
                  <el-row :gutter="26" justify="space-between">
                    <el-form-item label="确认密码" prop="confirmPassword" >
                      <el-input v-model="formData.confirmPassword" placeholder="请输入确认密码" clearable
                                :style="{width: '100%'}" type="password"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row :gutter="26">
                    <el-form-item label="qq账号" prop="qq">
                      <el-input v-model="formData.qq" placeholder="请输入qq账号" clearable :style="{width: '100%'}"></el-input>
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
  </div>
</template>

<script>
import {getCode, insertUser} from '../../api'
export default {
  name: 'register',
  data () {

    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!this.isCellPhone(value)) { // 引入methods中封装的检查手机格式的方法
        callback(new Error('请输入正确的手机号!'))
      } else {
        callback()
      }
    }
    return {
      imgSrc:require('../../assets/register.jpg'),
      seconds: 60,
      loading: false,
      formData: {
        username: undefined,
        phone: undefined,
        password: undefined,
        confirmPassword: undefined,
        qq: undefined
      },
      location: '',
      validateCode: '',
      inputValidate: '',
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          validator: checkphone,
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        confirmPassword: [{
          required: true,
          message: '请输入确认密码',
          trigger: 'blur'
        }],
        qq: [{
          required: true,
          message: '请输入qq账号',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    initGetP () {
      let _this = this
      // eslint-disable-next-line no-undef
      var mapObj = new AMap.Map('iCenter')
      mapObj.plugin('AMap.Geolocation', function () {
        // eslint-disable-next-line no-undef
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
          // eslint-disable-next-line no-undef
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        })
        mapObj.addControl(geolocation)
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)// 返回定位信息
        AMap.event.addListener(geolocation, 'error', onError) // 返回定位出错信息
        function onComplete (data) {
          // data是具体的定位信息
          console.log(data.addressComponent)
          var info = data.addressComponent
          _this.location = info.province + info.city + info.district + info.street + info.streetNumber
        }

        function onError (data) {
          // 定位出错
          console.log(data)
        }
      })
    },
    getValidate () {
      if (this.isCellPhone(this.formData.phone)) {
        getCode(this.formData.phone).then((res) => {
          console.log(res.code[0])
          this.validateCode = res.code
          this.loading = true
          setTimeout(() => {
            this.loading = false
          }, 60 * 1000)
          this.seconds = 60
          setInterval(() => {
            this.seconds = this.seconds - 1
          }, 1000)
        })
      } else {
        this.$message.success('请输入有效手机号')
      }
    },
    isCellPhone (val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false
      } else {
        return true
      }
    },
    submitForm () {
      if (this.inputValidate == null || this.inputValidate === '' || this.inputValidate === undefined) {
        this.$message.error('请输入验证码,亲')
        return
      }
      console.log(this.validateCode + ' ' + this.inputValidate)
      // eslint-disable-next-line eqeqeq
      if (this.validateCode != this.inputValidate) {
        this.$message.error('验证码不正确')
        return
      }
      // eslint-disable-next-line eqeqeq
      if (this.formData.password != this.formData.confirmPassword) {
        this.$message.error('两次密码不一致')
        return
      }
      this.$refs['User'].validate(valid => {
        if (!valid) return
        let params = new URLSearchParams()
        params.append('username', this.formData.username)
        params.append('password', this.formData.password)
        params.append('qq', this.formData.qq)
        params.append('phone', this.formData.phone)
        params.append('address', this.location)
        insertUser(params).then(res => {
          // eslint-disable-next-line eqeqeq
          if (res == 0) {
            this.$message.error('手机已存在')
          } else {
            this.$message.success('注册成功')
            this.$router.go(-1)
          }
        })
      })
    },
    resetForm () {
      this.$refs['User'].resetFields()
    }
  },
  mounted () {
    this.initGetP()
  }
}
</script>

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
