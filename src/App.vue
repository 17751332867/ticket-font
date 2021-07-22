<template>
  <div id="app">
    <menu-header></menu-header>
    <div style="position: relative;top:100px;left: 0px">
      <router-view/>
    </div>
  </div>
</template>

<script>
import menuHeader from "./components/header/menuHeader";
export default {
  name: 'App',
  components:{menuHeader}
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
