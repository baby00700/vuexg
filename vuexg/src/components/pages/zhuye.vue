<template>
  <div class="zhuye">
    <div class="lunbo">
      <mt-swipe :auto="4000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import lunbo from '@/components/lunbo'
import { Swipe, SwipeItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  name: 'zhuye',
  mounted: function () {
    console.log('zy')
    this.$emit('mountedcomplete')
  },
  methods: {
  },
  components: {
    lunboview: lunbo
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
</style>
