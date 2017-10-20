<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"/>
    </transition>

    <barview></barview>
  </div>
</template>

<script>
import bar from '@/components/bar'
export default {
  name: 'app',
  data () {
    return {
      DangQianPath: '',
      transitionName: 'slide-left',
      barcons: ['xiaoxi', 'daiban', 'zhuye', 'lianxiren', 'wode']
    }
  },
  created: function () {
    this.getPath()
  },
  components: {
    barview: bar
  },
  mounted () {
  },
  methods: {
    getPath: function () {
      this.DangQianPath = this.$route.path
      console.log(this.DangQianPath)
    }
  },
  watch: {
    '$route' (to, from) {                    // 控制动画方向
     // console.log(to.path + from.path)
      var newval = to.path
      var oldval = from.path
      newval = newval.split('/')
      newval = newval[1]
      oldval = oldval.split('/')
      oldval = oldval[1]
     // console.log(newval + oldval)
      var toindex
      var fromindex
      for (var i = 0; i < this.barcons.length; i++) {
        if (this.barcons[i] === newval) {
          toindex = i
        }
      }
      for (var n = 0; n < this.barcons.length; n++) {
        if (this.barcons[n] === oldval) {
          fromindex = n
        }
      }
      var fx = toindex - fromindex
     // console.log(fx)
      if (fx < 0) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  }
}
</script>

<style >
  @import '../static/css/animate.css';
</style>

<style>
  *{
    margin:0px;
    padding:0px;
  }
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  .child-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
    background-color:red;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
