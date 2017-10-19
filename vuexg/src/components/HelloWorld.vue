<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="block">
      <!--<span class="demonstration">{{value1}}</span>-->
      <!--<el-slider v-model="value1"  :step="10"  show-stops></el-slider>-->


    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      msg: 'root1',
      value1: 0
    }
  },
  methods: {
    formatTooltip (val) {
      return val / 100
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
