<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="2">
        <el-card with="100%" style="background-color: green;height: 80px" >
          <el-row>
            <el-col :span="4" style="color:#fff;">
              <div>请选择航班</div>
              <div>{{dcity}}到{{acity}}航班</div>
            </el-col>
          </el-row>
        </el-card>

        <el-card v-for="item in tickets">
          <el-row>
            <el-col :span="3" :offset="1" >
              <div>
                {{item.airline}}
              </div>
              <div>
                {{item.flightNumber}}
              </div>
            </el-col>
            <el-col :span="3" :offset="2" style="font-size: 25px">
              {{item.departureDate}}
            </el-col>
            <el-col :span="2" style="font-size: 25px">
              <i class="el-icon-right"></i>
            </el-col>
            <el-col :span="3" style="font-size: 25px">
              {{item.arrivalDate}}
            </el-col>
            <el-col :span="3" :offset="5">
              <el-button v-show="!item.opened" @click="item.opened=!item.opened">点开</el-button>
              <el-button v-show="item.opened" @click="item.opened=!item.opened">折叠</el-button>
            </el-col>
          </el-row>
          <el-row v-show="item.opened" style="text-align: left">
            <el-col :span="8" v-for="i in item.ticketList">
              <el-card>
                <div slot="header">
                  {{i.type}}
                </div>
                <div v-if="i.type=='经济舱'" style="height: 150px">
                  <div>
                    <li class="el-icon-check" style="color: #42b983"></li>7KG手提行李,限1件,尺寸20*30*40(CM)内,箱包轮子不计在内
                  </div>
                  <div>
                    <li class="el-icon-check" style="color: #42b983"></li>无免费托运行李额
                  </div>
                  <div>
                    <li class="el-icon-check" style="color: #42b983"></li>最高可返580积分
                  </div>
                </div>
                <div v-if="i.type=='商务舱'" style="height: 150px">
                  <div>
                    <li class="el-icon-check" style="color: #42b983"></li>7KG手提行李,限1件,尺寸20*40*55(CM)内,箱包轮子不计在内
                  </div>
                  <div>
                    <li class="el-icon-check" style="color: #42b983"></li>30KG托运行李额
                  </div>
                  <div>
                    <li class="el-icon-check" style="color: #42b983"></li>最高可返760积分
                  </div>
                  <div>
                    <li class="el-icon-check" style="color: #42b983"></li>前舱宽敞座位
                  </div>
                </div>
                <div v-if="i.type=='头等舱'" style="height: 150px">
                  <div>
                    <li class="el-icon-check" style="color: #42b983"></li>7KG手提行李,限1件,尺寸20*30*40(CM)内,箱包轮子不计在内
                  </div>
                  <div>
                    <li class="el-icon-check" style="color: #42b983"></li>无免费托运行李额
                  </div>
                  <div>
                    <li class="el-icon-check" style="color: #42b983"></li>最高可返580积分
                  </div>
                </div>
                <div>
                  <el-row>
                    <el-col :span="2">￥</el-col>
                    <el-col :span="4" style="color: darkorange;font-size: 20px">{{i.price}}</el-col>
                    <el-col :span="8">会员折率{{i.punctualityRate}}</el-col>
                    <el-col :offset="6" :span="4"><el-button type="mini" @click="toPay(i)">购买</el-button></el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {getFlightByJudge} from '../../api/index.js'
export default {
  name: 'index',
  data () {
    return {
      dcity: '',
      acity: '',
      ddate: '',
      tickets: []
    }
  },
  methods:{
    toPay(ticket){
      console.log(this.$getCookie("userId"))
      if(this.$getCookie("userId")==null||this.$getCookie("userId")==undefined||this.$getCookie("userId")==""){
         this.$message.error("请先登录")
          return
      }
     this.$router.push({name:'pay',params:{ticketId:ticket.id,flightId:ticket.flightId}})
    }
  },
  mounted () {
    this.dcity = this.$route.query.dcity
    this.acity = this.$route.query.acity
    this.ddate = this.$route.query.ddate
    console.log(this.dcity + ' ' + this.acity + ' ' + this.ddate)
    let param = new URLSearchParams()
    param.append('dicty', this.dcity)
    param.append('acity', this.acity)
    param.append('date', this.ddate)
    getFlightByJudge(param).then(res => {
      console.log(res)
      setTimeout(()=>{
        this.tickets=res
      },500)
    }, err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
