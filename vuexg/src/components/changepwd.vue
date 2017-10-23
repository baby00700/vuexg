<template>
  <div class="changepwd">
    <loadingview v-show="isshowloading"></loadingview>
    <div class="pwd">
      <label for="oldpwdinput" class="pwdlabel">旧密码</label>
      <input type="password" id="oldpwdinput" class="pwdinput" placeholder="请输入原密码" v-model="oldpwd" @change="validatepwd" >
    </div>
    <div class="pwd">
      <label for="newpwdinput" class="pwdlabel">新密码</label>
      <input type="text" id="newpwdinput" class="pwdinput" placeholder="请输入新密码" v-model="newpwd" @change="validatenewpwd">
    </div>
    <div class="pwd">
      <label for="confnewpwdinput" class="pwdlabel">确认密码</label>
      <input type="text" id="confnewpwdinput" class="pwdinput" placeholder="请再次输入新密码" v-model="confnewpwd" @change="validateconfnewpwd">
    </div>
    <div class="tip">密码由6-20位英文或数字组成</div>
    <el-button type="primary" class="but" @click="changepwd()" v-if="isbut0show">确认</el-button>
    <el-button type="primary" class="but1" @click="offchangepwd()" v-if="isbut0show">返回</el-button>
    <el-button type="primary" :disabled="true" class="but0"  v-if="isbut1show">提交中...</el-button>
  </div>
</template>

<script>
  import vue from 'vue'
  import resource from 'vue-resource'
  import loading from '@/components/loading'
  vue.use(resource)

  export default {
    name: 'changepwd',
    data () {
      return {
        isshowloading: true,
        oldpwd: '',
        newpwd: '',
        confnewpwd: '',
        isoldpwdok: false,
        isnewpwdok: false,
        isconfpwdok: false,
        iseqpwd: false,
        isbut0show: true,
        isbut1show: false
      }
    },
    mounted: function () {
      this.isshowloading = false
    },
    components: {
      loadingview: loading
    },
    methods: {
      changepwd: function () {
        console.log(this.$data)
        if (this.isoldpwdok === true && this.isnewpwdok === true && this.isconfpwdok === true && this.iseqpwd === true) {
          this.isshowloading = true
          this.isbut0show = false
          this.isbut1show = true
          // 要判断是否为空 http://www.easy-mock.com/mock/59a92b9fe0dc66334198ddf9/example/changepwd
          var url = 'http://www.easy-mock.com/mock/59a92b9fe0dc66334198ddf9/example/changepwd'
          this.$http.post(url, {emulateJSoN: true})
            .then(function (data) {
              console.log(data)
              if (data.body.data.success === 'true') {
                this.$emit('changepedhide')
                // this.isloadingshow = false
                setTimeout(function () {
                  this.isshowloading = false
                }, 2000)
                window.localStorage.setItem('loginsuccess', 'false')
                location.reload(true)
              }
            })
        }
      },
      validatepwd: function () {
        console.log(this.oldpwd)
        var reg = /^[0-9a-zA-Z]+$/
        if (!reg.test(this.oldpwd) || this.oldpwd.length < 6) {
          alert('密码格式不正确')
          this.oldpwd = ''
        } else {
          this.isoldpwdok = true
        }
      },
      validatenewpwd: function () {
        console.log(this.newpwd)
        var reg = /^[0-9a-zA-Z]+$/
        if (!reg.test(this.newpwd) || this.newpwd.length < 6) {
          alert('密码格式不正确')
          this.newpwd = ''
        } else {
          this.isnewpwdok = true
        }
      },
      validateconfnewpwd: function () {
        console.log(this.confnewpwd)
        var reg = /^[0-9a-zA-Z]+$/
        if (!reg.test(this.confnewpwd) || this.confnewpwd.length < 6) {
          alert('密码格式不正确')
          this.confnewpwd = ''
        } else {
          this.isconfpwdok = true
          if (this.newpwd === this.confnewpwd) {
            this.iseqpwd = true
          } else {
            alert('两次输入的密码不一致')
            this.confnewpwd = ''
            this.iseqpwd = false
          }
        }
      },
      offchangepwd: function () {
        this.$emit('changepedhide')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .changepwd{
    width:100%;
    height:100%;
    background-color:#ecedf1;
    position:fixed;
    top:0px;
    left:0px;
  }
  .pwd{
    /*border:1px solid red;*/
    width:100%;
    height:50px;
    background-color:#fff;
    border-bottom: 1px solid #ecedf1;
    position:relative;
  }
  .pwdlabel{
    line-height:50px;
    color:#555555;
    font-size:16px;
    float: left;
    position:absolute;
    left:15px;
    font-weight:600;
  }
  .pwdinput{
    height:48px;
    width:calc(100% - 120px);
    position:absolute;
    left:100px;
    font-size:16px;
    border:0;
  }
  .pwdinpu::-webkit-input-placeholder{
    color: #eee;
  }
  .tip{
    height:30px;
    width:100%;
    color:#999999;
    font-size:14px;
    position:relative;
    top:10px;
    left: 15px;
    text-align: left;
  }
  .but{
    width:40%;
    height:40px;
    position:absolute;
    top:200px;
    right:6%;
    font-size:16px;
  }
  .but0{
    width:92%;
    height:40px;
    position:absolute;
    top:200px;
    left:4%;
    font-size:16px;
    z-index:-100;
  }
  .but1{
    width:40%;
    height:40px;
    position:absolute;
    top:200px;
    left:3%;
    font-size:16px;
  }
</style>
