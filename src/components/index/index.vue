<template>
    <div style="background-color: #f7f7f7;">
      <div style="position: absolute;border: #444444 solid 1px;float: bottom;width: 100%">
        <el-carousel height="400px" direction="vertical" :autoplay="true">
          <el-carousel-item >
          <img src="../../assets/lunbo1.jpg">
        </el-carousel-item>
          <el-carousel-item >
            <img src="../../assets/lunbo2.jpg">
          </el-carousel-item>
          <el-carousel-item >
            <img src="../../assets/lunbo3.jpg">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div style="height: 400px;position: relative;top: 0px;z-index: 100;opacity: 0.9;">
        <div style="position: relative;top: 195px;">
          <el-row style="float: bottom">
            <el-col :offset="2" :span="12">
              <el-menu  class="el-menu-demo"  style="height: 60px">
                <el-menu-item class="search-label">机票</el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2" :span="20">
              <el-card>
                <ticket-search></ticket-search>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="height: 500px;position: relative;top: 0px;margin-top: 50px">
        <el-row :gutter="25" style="height: 250px">
          <el-col :offset='2' :span="20">
            <el-card v-for="item in push" style="height: 250px;width: 33%;float: left;">
              <el-row style="font-size: 30px;margin: 10px">
                <el-col :offset='6' :span="4" >{{item.flight.dicty}}</el-col>
                <el-col :span="2" style="color: #42b983"><i class="iconfont icon-daoda"></i></el-col>
                <el-col :span="4">{{item.flight.acity}}</el-col>
              </el-row>
              <el-row style="font-size: 20px;margin: 10px">
                <el-col :offset="8" :span="8">
                  {{item.flight.date}}
                </el-col>
              </el-row>
              <el-row style="font-size: 25px;color: #42b983;margin: 10px">
                <el-col :offset="5" :span="6">
                  {{item.flight.departureDate}}
                </el-col>
                <el-col :span="2">-</el-col>
                <el-col :span="6">
                  {{item.flight.arrivalDate}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="4" :span="14" style="color: orange;font-size: 30px;text-align: center">价格:{{item.price}}元</el-col>
              </el-row>
              <el-row style="text-align: center;">
                类型:{{item.type}}
              </el-row>
              <el-row :offset="4" :span="16">
                <el-button style="width: 100%" @click="toPay(item)">
                  查看
                </el-button>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
import TicketSearch from './TicketSearch'
import {getFlightById, getTicketsByPushId} from "../../api";
export default {
  name: 'index',
  components: {TicketSearch},
  data(){
    return{
      push:[],
      flight:[]
    }
  },methods:{
    getPush(){
      getTicketsByPushId().then(res=>{
        this.push=res
        for(var i=0;i<=this.push.length;i++){
          this.push[i].flight.date=this.push[i].flight.date.substr(0,10)
        }
        console.log(res)
      })
    },toPay(item){
      console.log(this.$getCookie("userId"))
      if(this.$getCookie("userId")==null||this.$getCookie("userId")==undefined||this.$getCookie("userId")==""){
        this.$message.error("请先登录")
        return
      }
      this.$router.push({name:'pay',params:{ticketId:item.id,flightId:item.flightId}})
    }
  },
  mounted() {
    this.getPush()
  }

}
</script>

<style scoped>
 .search-label{
   border-radius: 5px 5px 0px 0px;
   background-color: #42b983;
   width: 25%;
 }
</style>
