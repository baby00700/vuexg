<template>
  <div class="zhuye">
    <div class="lunbo">
      <mt-swipe :auto="4000">
        <mt-swipe-item>1
          <ul>
            <li @click="alert">1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </mt-swipe-item>
        <mt-swipe-item v-if="ispageshow">2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
    </div>


  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  name: 'zhuye',
  data () {
    return {
      ispageshow: false
    }
  },
  mounted: function () {
    console.log('zy')
    this.$emit('mountedcomplete')
  },
  methods: {
    alert: function () {
      alert('ajsadfvujf')
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .lunbo{
    width:100%;
    height:180px;
    background-color:red;
  }
 li{
   display: inline-block;
   background-color: darkgreen;
   width:50px;
   height:50px;
 }
</style>
