<template>
    <div>
      <div>您的购物车</div>
      <el-container style="height: 800px">
        <div style="width: 100%">
          <el-card style="margin-left: 50px;width: 90%;height: 200px" v-for="item in orders">
            <el-row>
              <el-col :span="2" style="color: orange;line-height: 200px">
                <div><i class="iconfont icon-gouwuchekong" style="font-size: 12px"></i>价格:{{item.price}}</div>
              </el-col>
              <el-col :span="6">
                <el-card style="margin: 20px;background-color: lightskyblue"><i  style="color: red" class="iconfont icon-hangban"></i><span style="font-size: 20px">{{item.flight.airline}}</span><span>{{item.flight.flightNumber}}</span></el-card>
                <el-card style="margin: 20px;background-color: lightskyblue"><i style="color: green" class="iconfont icon-riqi"></i>{{item.flight.date.substr(0,10)}}</el-card>
              </el-col>
              <el-col :span="6">
                <el-card style="margin: 20px;background-color: lightskyblue"><i style="color: #0086b3"  class="iconfont icon-time"></i>{{item.flight.departureDate}}-{{item.flight.arrivalDate}}</el-card>
                <el-card style="margin: 20px;background-color: lightskyblue"><i style="color: #cccccc" class="iconfont icon-type"></i>{{item.ticket.type}}</el-card>
              </el-col>
              <el-col :span="5">
                <el-card style="height: 160px;margin-top: 10px">
                  <div slot="header" class="clearfix">
                    乘坐的人
                  </div>
                  <div>
                    <el-tag v-for="i in item.passengerList">
                      {{i.name}}
                    </el-tag>
                  </div>
                </el-card>
              </el-col>
              <el-col :offset="1" :span="3">
                  <div style="margin-top: 80px">
                    <div><i class="iconfont icon-"></i>状态:{{item.state}}<el-button v-if="item.state==='未支付'" @click="toPay(item)">去支付</el-button></div>
                  </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-container>
    </div>
</template>

<script>
    import {getOrdersByUserId} from "../../../api";

    export default {
      name: "orders",
      data(){
        return{
          orders:[]
        }
      },methods:{
        getData(){
          let id=this.$getCookie("userId")
          getOrdersByUserId(id).then(res=>{
            console.log(res)
            this.orders = res
          })
          console.log(this.orders)
        },toPay(item){
          console.log(item.ticketId)
          console.log('http://localhost:8888/pay?ordersId='+item.id+"&totalPrice="+item.price+"&ticketId="+item.ticketId+"&description=")
          window.location.href='http://localhost:8888/pay?ordersId='+item.id+"&totalPrice="+item.price+"&ticketId="+item.ticketId+"&description="
        }
      },created() {
        this.getData()
      }
    }
</script>

<style scoped>

</style>
