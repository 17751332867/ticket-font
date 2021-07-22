<template>
    <div>
      <el-menu
        :collapse-transition="false"
        unique-opened
        class="el-menu-vertical-demo"
        background-color="##ffffff"
        text-color="#777777"
        :router="true"
        active-text-color="#409eff">
        <el-submenu index="1">
          <template slot="title">首页</template>
            <el-menu-item>
              <router-link :to="{ path: '/main/index'}">首页</router-link>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">订单</template>
             <el-menu-item>
               <router-link :to="{ path: '/main/orders'}">订单</router-link>
             </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">消息</template>
          <el-menu-item>
            <router-link :to="{ path: '/main/notice'}">消息</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
</template>

<script>
    export default {
        name: "MainSide"
    }
</script>

<style scoped>
  .router-link-active {
    text-decoration: none;
  }
</style>
