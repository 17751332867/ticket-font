<template>
    <div style="height: 50px">
      <el-header >
        <el-menu mode="horizontal" class="el-menu-demo">
          <el-row>
              <img src="@/assets/timg.jpg" width="100px" style="border-radius: 10px">
            <el-col :span="20">
              <el-menu mode="horizontal" background-color="#f7f7f7">
                <el-row>
                  <el-col :span="4">
                    <el-submenu index="1">
                      <template slot="title"><div style="color: #444444;">机票</div></template>
                      <el-menu-item index="1-1">机票</el-menu-item>
                    </el-submenu>
                  </el-col>
                  <el-col :span="4">
                    <el-submenu index="1">
                      <template slot="title"><div style="color: #444444;">机票</div></template>
                      <el-menu-item index="1-1">机票</el-menu-item>
                    </el-submenu>
                  </el-col>
                  <el-col :span="4">
                    <el-submenu index="1">
                      <template slot="title"><div style="color: #444444;">机票</div></template>
                      <el-menu-item index="1-1">机票</el-menu-item>
                    </el-submenu>
                  </el-col>
                  <el-col :span="4">
                    <div v-show="!logined">
                      <router-link to="login">登录</router-link>
                      <router-link to="Register">注册</router-link>
                    </div>
                    <el-button v-show="logined" @click="tomain()">
                      <li class="el-icon-user">{{user.username}}</li>
                    </el-button>
                    <el-button v-show="logined" @click="loginout()">登出</el-button>
                  </el-col>
                </el-row>
              </el-menu>
            </el-col>
          </el-row>
        </el-menu>
      </el-header>
    </div>
</template>

<script>
import {getUserByPhone} from "../../api";

export default {
  name: 'menuHeader',
  data(){
    return{
      logined:undefined,
      user:{
        username:'',
        password:'',
        phone:'',
        qq:'',
        address:''
      }
    }
  },
  methods:{
    tomain(){
      this.$router.push({path:'/main/index'})
    },loginout(){
      this.$removeCookie("user")
      this.$removeCookie("userId")
      this.$removeCookie("username")
      this.$removeCookie("phone")
      window.location.href="http://localhost:8080/"
    }
  },
  created() {
    let phone = this.$getCookie("phone");
    if(phone==''||phone==null){
      this.logined=false
    }else{
      this.logined=true
      getUserByPhone(phone).then(res=>{
        this.user.username=res.username
        this.user.password=res.password
        this.user.phone=res.phone
        this.user.qq=res.qq
        this.user.address=res.address
        console.log(this.user)
        this.$setCookie("user",this.user)
        this.$setCookie("username",this.user.username)
        this.$setCookie("password",this.user.password)
        this.$setCookie("phone",this.user.phone)
        this.$setCookie("qq",this.user.qq)
        this.$setCookie("address",this.user.address)
      })
    }
  }
}
</script>

<style scoped="scoped">
  *{
    background-color: palevioletred;
    margin: 0px;
    padding: 0px;
  }
  .router-link-active {
  text-decoration: none;
  }

  a {
    text-decoration: none;
  }
</style>
