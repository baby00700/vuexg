<template>
  <div id="app">
    <transition name="fade">
     <loadingview class="loadingview" v-show="isloadingshow" @mountedcomplete="loadinghide"></loadingview>
     <loginview class="loginview" v-if="isloginshow" @loginsuccess="logintosucess"></loginview>
    </transition>
      <transition :name="transitionName">
      <router-view class="child-view"/>
    </transition>
    <barview></barview>
  </div>
</template>

<script>
import bar from '@/components/bar'
import login from '@/components/login'
import loading from '@/components/loading'
export default {
  name: 'app',
  data () {
    return {
      DangQianPath: '',
      transitionName: 'slide-left',
      barcons: ['xiaoxi', 'daiban', 'zhuye', 'lianxiren', 'wode'],
      isloginshow: true,
      isloadingshow: false
    }
  },
  created: function () {
    this.getPath()
   // console.log(window.localStorage)
    if ('loginsuccess' in window.localStorage) {
      var loginsuccess
      loginsuccess = window.localStorage.getItem('loginsuccess')
      if (loginsuccess === 'true') {
        // console.log(loginsuccess)
        this.isloginshow = false
      }
    }
  },
  components: {
    barview: bar,
    loginview: login,
    loadingview: loading
  },
  mounted () {
  },
  methods: {
    getPath: function () {
      this.DangQianPath = this.$route.path
     // console.log(this.DangQianPath)
    },
    logintosucess: function () {
      this.isloginshow = false
    },
    loadinghide: function () {
      this.isloadingshow = false
    }
  },
  watch: {
    '$route' (to, from) {                    // 控制动画方向
     // console.log(to.path + from.path)
      var newval = to.path
      var oldval = from.path
      newval = newval.split('/')
      newval = newval[2]
      oldval = oldval.split('/')
      oldval = oldval[2]
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
  /* 视图动画*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
    opacity: 0
  }
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


.loginview{
  position:fixed;
  width:100%;
  height:300%;
  top:0px;
}

.loadingview{
  position:fixed;
  width:100%;
  height:300%;
  top:0px;
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

  /*页面加载动画*/
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


  .spinner {
    width: 60px;
    height: 60px;

    position: relative;
    margin: 100px auto;
  }

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #67CF22;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: bounce 2.0s infinite ease-in-out;
    animation: bounce 2.0s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }

  @keyframes bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
  }
</style>
