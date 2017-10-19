<template>
  <div id="app">
    <router-view/>
    <el-checkbox v-model="modo">备选项</el-checkbox>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {modo: false}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
