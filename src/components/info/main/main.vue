<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-container>
        <el-aside width="200px">
          <MainSide></MainSide>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    import MainSide from "../mainside/MainSide";
    export default {
        name: "mian",
      components: {MainSide}
    }
</script>

<style scoped>

</style>
