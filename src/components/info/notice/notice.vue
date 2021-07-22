<template>
  <div>
    <div>我的消息</div>
    <div><el-button type="danger" @click="deleteNotice">删除</el-button></div>
    <el-table :data="notices" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column  label="标题">
       <template slot-scope="scope">
         <el-row :gutter="10">
          <el-col :span="6">{{scope.row.title}}</el-col>
          <el-col :offset="10" :span="3">
            <el-button type="text" @click="scope.row.visible=!scope.row.visible">详情</el-button>
          </el-col>
         </el-row>
         <el-card v-if="scope.row.visible">
           <div>
             {{scope.row.message}}
           </div>
           <div>
             <el-row>
               <el-col :span="5">
                 <i class="iconfont icon-feiji"></i>{{scope.row.flight.airline}}{{scope.row.flight.flightNumber}}
               </el-col>
               <el-col :span="5">
                 <i class="iconfont icon-riqi"></i>{{scope.row.flight.date.substr(0,10)}}
               </el-col>
               <el-col :span="5">
                 <i class="iconfont icon-chengshi">{{scope.row.flight.dicty}}-{{scope.row.flight.acity}}</i>
               </el-col>
               <el-col :span="5">
                 <i class="iconfont icon-time">{{scope.row.flight.departureDate}}-{{scope.row.flight.arrivalDate}}</i>
               </el-col>
             </el-row>
           </div>
         </el-card>
       </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import {getAllNotice, handleDeleteNotice} from "../../../api";

    export default {
        name: "notice",
        data(){
          return{
            notices:[],
            ids:[]
          }
        },methods:{
          handleSelectionChange(val){
            this.ids=[]
            console.log(val)
            for(var i=0;i<val.length;i++){
              this.ids.push(val[i].id)
            }
            console.log(this.ids)
          },deleteNotice(){
            this.ids.forEach((id)=>{
              handleDeleteNotice(id).then(res=>{
                this.$message.success("删除成功")
              })
              this.getData()
            })
        },
        getData(){
          getAllNotice(this.$getCookie("userId")).then(res=>{
            this.notices = res
            console.log(res)
          })

        }
        },created() {
          this.getData()
        }
    }
</script>

<style scoped>

</style>
