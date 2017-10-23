<template>
  <div class="login">
    <el-button @click="loginout">注销账号</el-button>
    <transition name="fade">
      <changepwdview v-if="ischangepwdviewshow" class="changepwdview" @changepedhide="hidechangepwd"></changepwdview>
    </transition>
    <div class="changepwd" v-if="ischangepwdshow" @click="showchangepwd"><p>修改密码？</p></div>
  </div>
</template>

<script>
import changepwd from '@/components/changepwd'
export default {
  name: 'wode',
  data () {
    return {
      ischangepwdshow: true,
      ischangepwdviewshow: false
    }
  },
  mounted: function () {
    console.log('zy')
    this.$emit('mountedcomplete')
  },
  methods: {
    loginout: function () {
      window.localStorage.setItem('loginsuccess', 'false')
      location.reload(true)
    },
    showchangepwd: function () {
      this.ischangepwdviewshow = true
    },
    hidechangepwd: function () {
      this.ischangepwdviewshow = false
    }
  },
  components: {
    changepwdview: changepwd
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .changepwdview{
    width:100%;
    height:100%;
    z-index:333;
    background-color:#fff;
    position:fixed;
    top:0px;
    left:0px;
  }

  .changepwd{
    width:100%;
    height:25px;
    font-size:12px;
    color:rgb(40,123,226);
    font-weight: 400;
    position:relative;
    top:65px;
    left:0px;
    /*border:1px solid red;*/
    line-height:25px;
  }

  .changepwd p{
    position:absolute;
    right:9%;
  }
</style>
