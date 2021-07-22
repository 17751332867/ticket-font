<template>
  <div>
    <div style="background-color: #42b983;color: #F7F7F7;">
      <el-row style="height: 60px">
        <el-col :span="5" style="font-size: 30px;line-height: 60px">
          航班:{{flight.airline}}<span style="font-size: 15px">{{flight.flightNumber}}</span>
        </el-col>
        <el-col :span="5" style="font-size: 30px;line-height: 60px">
          日期:{{flight.date}}
        </el-col>
        <el-col :span="3" style="font-size: 20px;line-height: 60px">
          出发时间:{{flight.departureDate}}
        </el-col>
        <el-col :span="1">
          <i class="iconfont icon-chufadaodaxiao" style="font-size: 30px;line-height: 60px"></i>
        </el-col>
        <el-col :span="3" style="font-size: 20px;line-height: 60px">
          到达时间:{{flight.arrivalDate}}
        </el-col>
      </el-row>
    </div>
    <div style="background-color: #42b983;color: #F7F7F7;">
      <el-row style="height: 60px">
        <el-col :span="4" style="font-size: 30px">价格:{{ticket.price}}</el-col>
        <el-col :span="4" style="font-size: 30px">燃油费:￥50
          <el-tooltip class="item" effect="dark" content="由于飞机运行需要消耗燃料需要50元燃料费" placement="top-start">
            <i class="iconfont icon-xinxiinformation38"></i>
          </el-tooltip>
        </el-col>
        <el-col :span="4" style="font-size: 30px">保险费:￥40
          <el-tooltip class="item" effect="dark" content="40保险费" placement="top-start">
            <i class="iconfont icon-xinxiinformation38"></i>
          </el-tooltip>
        </el-col>
      </el-row>
    </div>
    <div style="background-color: #42b983;color: #F7F7F7;width: 100%">
      <el-row style="height: 60px">
        <el-col :offset="5" :span="3" style="font-size: 30px;line-height: 60px">出发地:{{flight.dicty}}</el-col>
        <el-col :span="1"><i class="iconfont icon-feiji" style="font-size: 30px;line-height: 60px"></i></el-col>
        <el-col :span="3" style="font-size: 30px;line-height: 60px">到达地:{{flight.acity}}</el-col>
        <el-col :span="8" style="font-size: 30px;line-height: 60px;">
          类型:<span style="font-size: 25px">
          {{ticket.type}}
        </span>
        </el-col>
      </el-row>
    </div>
    <div style="width: 100%">
      <el-row>
        <el-col :offset="4" :span="4" style="font-size: 30px">
          添加乘客
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="4" :span="4">
          <el-button @click="addVisible=true">添加</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-dialog :visible="addVisible" width="30%" :before-close="handleClose">
        <el-form ref="User" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入手机号" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="cardId">
            <el-input v-model="formData.cardId" placeholder="请输入身份证" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col v-for="item in passenger" :span="4">

          <el-card>
            <div style="float: right;" @click="deletePassenger(item.id)"><i class="iconfont icon-chahao" ></i></div>
            <div>姓名:{{item.name}}</div>
            <div>手机:{{item.phone}}</div>
            <div>身份证:{{item.cardId}}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 100px;font-size: 30px;color: orange">
      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="10" v-if="passenger.length>0">
          联系电话:{{passenger[0].phone}}
        </el-col>
      </el-row>
    </div>
    <div style="position: fixed;bottom: 0px;width: 100%;">
      <el-card style="font-size: 30px;color: red">
        <el-row>
          <el-col :span="4" :offset="4">共:{{passenger.length}}人</el-col>
          <el-col :offset="5" :span="4">
            <span style="">
              总计:{{totalPrice}}元
            </span>
          </el-col>
          <el-col :offset="3" :span="2">
            <el-button type="dander" @click="submitPay">提交</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
  import {addOrdersToUser, getFlightById, getTicketById, insertOrder, insertPassenger, updateNumber} from "../../api";

  export default {
    data(){
      return{
        ordersId:'',
        addVisible:false,
        formData: {
          phone: undefined,
          cardId: undefined,
          name: undefined,
        },
        rules: {
          phone: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }],
          cardId: [{
            required: true,
            message: '请输入身份证',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
        },
        ticketId:-1,
        flightId:-1,
        ticket:undefined,
        flight:undefined,
        passenger:[]
      }
    },methods:{
      deletePassenger(id){
        var temp=[]
        for(var i=0;i<this.passenger.length;i++){
          if(this.passenger[i].id!=id){
            temp.push(this.passenger[i])
          }
        }
        this.passenger=temp
      },
      submitPay(){
        if(this.passenger.length==0){
          this.$message.info("请选择用户")
        }
        let param = new URLSearchParams()
        param.append("number",this.passenger.length)
        param.append("id",this.ticketId)
        updateNumber(param).then(res=>{
          if(res ==='库存不足'){
            this.$message.info('库存不足')
            return
          }else{

          }
        })
        let params = new URLSearchParams()
        params.append("passenger",this.passenger[0].phone)
        params.append("flightId",this.flightId)
        params.append("ticketId",this.ticketId)
        params.append("price",this.totalPrice)
        params.append("state","未支付")


        insertOrder(params).then(res=>{
            this.ordersId=res
            console.log(res)
            let p = new URLSearchParams()
            p.append("userId",this.$getCookie("userId"))
            p.append("ordersId",this.ordersId)
            addOrdersToUser(p).then(res=>{

            })
            for(var i=0;i<this.passenger.length;i++){
              let p = new URLSearchParams()
              p.append("name",this.passenger[i].name)
              p.append("cardId",this.passenger[i].cardId)
              p.append("phone",this.passenger[i].phone)
              p.append("passengerId",res)
              p.append("type","未支付")
              insertPassenger(p).then(r=>{
                console.log('http://localhost:8888/pay?ordersId='+this.ordersId+"&totalPrice="+this.totalPrice+"&ticketId="+this.ticketId+"&description=")


                window.location.href='http://localhost:8888/pay?ordersId='+this.ordersId+"&totalPrice="+this.totalPrice+"&ticketId="+this.ticketId+"&description="
              })
            }
        })

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.addVisible=false;
            this.resetForm()
          })
          .catch(_ => {});
      },
      submitForm() {
        this.$refs['User'].validate(valid => {
          if (!valid) return
          if(this.passenger.length>=4){
            this.$message.info("用户数量不能大于4")
            return
          }
          this.passenger.push({phone:this.formData.phone,name:this.formData.name,cardId:this.formData.cardId})
          console.log(this.passenger)
          this.addVisible=false
        })
      },
      resetForm() {
        this.$refs['User'].resetFields()
      },
    },mounted() {
        this.ticketId=this.$route.params.ticketId
        this.flightId=this.$route.params.flightId
        getTicketById(this.ticketId).then(res=>{
          this.ticket=res
          console.log(this.ticket)
        })
        getFlightById(this.flightId).then(res=>{
          this.flight=res
          this.flight.date=this.flight.date.substr(0,10)
        })

    },
    computed:{
      totalPrice(){
        return this.passenger.length*(90+this.ticket.price)
      }
    }
  }

</script>
<style>

</style>
