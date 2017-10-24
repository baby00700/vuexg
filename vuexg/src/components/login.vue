<template>
  <div class="login">
    <transition name="fade">
    <teacherloginview class="teacherview" @teacherloginsuccess="teacherloginsuccess" v-if="isteacherloginviewshow" v-on:hideteacherselfview="hideteacherview"></teacherloginview>
    </transition>
     <transition name="fade">
      <changepwdview v-if="ischangepwdviewshow" class="changepwdview" @changepedhide="hidechangepwd"></changepwdview>
    </transition>
    <div class="header">
        <div class="logo"></div>
        <div class="sysname">学工智能服务平台</div>
    </div>
    <div class="contenter">
      <div class="kshinput">
        <div class="kshicon"></div>
        <div class="inputwrap">
          <input type="text" class="ksh" placeholder="请输入考生号" @change="validateksh()" v-model="ksh" :disabled="isdisable" auto-complete="off" />
        </div>

      </div>
      <div class="pwdinput">
        <div class="pwdicon"></div>
        <div class="inputwrap">
          <input type="password" class="pwd" placeholder="请输入密码"   :change="isshowbut()" v-model="pwd" maxlength="20" :disabled="isdisable" auto-complete="off" />
        </div>
      </div>
      <div class="changetoteacher" @click="showteacherview">--教师登录--</div>
    </div>
    <div class="loginbut"  v-if="isbutture" @click="loginin()" :class="{ buthide: buthide }">登录</div>
    <div class="loginbut1"  v-if="isbutfalse">登录</div>
    <div class="loginbut2 "  v-if="isbut2show"> <i class="el-icon-loading"></i></div>
    <div class="changepwd" v-if="ischangepwdshow" @click="showchangepwd"><p>修改密码？</p></div>

  </div>
</template>

<script>
import vue from 'vue'
import resource from 'vue-resource'
import changepwd from '@/components/changepwd'
import teacherlogin from '@/components/teacherlogin'

vue.use(resource)

export default {
  name: 'login',
  data () {
    return {
      ksh: '',
      pwd: '',
      isbutture: false,
      isbutfalse: true,
      isbut2show: false,
      buthide: false,
      isdisable: false,
      ischangepwdshow: false,
      ischangepwdviewshow: false,
      isteacherloginviewshow: false
    }
  },
  methods: {
    validateksh: function () {
      console.log(this.ksh)
      if (!isNaN(this.ksh) === false) {
        alert('请输入正确的考生号')
        this.ksh = ''
      }
    },
    isshowbut: function () {
      if (this.pwd.length >= 6 && this.ksh.length >= 1) {
        this.isbutture = true
        this.isbutfalse = false
      } else {
        this.isbutture = false
        this.isbutfalse = true
        this.buthide = false
        this.isbut2show = false
      }
    },
    loginin: function () {
      var reg = /^[0-9a-zA-Z]+$/
      if (!reg.test(this.pwd)) {
        alert('密码格式不正确')
        this.pwd = ''
      } else {
        console.log('login....')
        this.buthide = true
        this.isbut2show = true
        this.isdisable = true
        this.isbutture = false
        console.log(this.isbutture)
        // 登录方法 https://easy-mock.com/mock/59a92b9fe0dc66334198ddf9/example/login
        // 登录方法 https://easy-mock.com/mock/59a92b9fe0dc66334198ddf9/example/login
        var url = 'https://easy-mock.com/mock/59a92b9fe0dc66334198ddf9/example/login'
        this.$http.post(url, {emulateJSoN: true})
          .then(function (data) {
            // console.log(data)
            // console.log(data.body.data.success)
            if (data.body.data.success === 'true') {
              // 初始化页面
              console.log(data.body.data.success)
              this.isbutture = false
              this.isbutfalse = true
              this.isbut2show = false
              this.buthide = false
              this.isdisable = false
              this.ischangepwdshow = true
              window.localStorage.setItem('loginsuccess', 'true')
              this.$emit('loginsuccess', 'student')
            } else {
              // window.location.reload(true)
            }
          }, function (data) {
            alert(data)
          }).catch(function (res) {
            alert(res)
          })
      }
    },
    showchangepwd: function () {
      this.ischangepwdviewshow = true
    },
    hidechangepwd: function () {
      this.ischangepwdviewshow = false
    },
    teacherloginsuccess: function () {
      this.$emit('loginsuccess', 'teacher')
    },
    showteacherview: function () {
      this.isteacherloginviewshow = true
    },
    hideteacherview: function () {
      this.isteacherloginviewshow = false
    }
  },
  components: {
    changepwdview: changepwd,
    teacherloginview: teacherlogin
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  height:100%;
  width:100%;
  background-color:#fff;
  z-index:222;
  color:#2c3e50;
}
  .header{
    height:30%;
    background-color:rgb(40,123,226);
    position:relative;
  }
  .logo{
    width:90px;
    height:90px;
    /*border:1px solid red;*/
    position:absolute;
    top:calc(50% - 59px);
    left:calc(50% - 45px);
    background-image:url('../../static/img/logo.png');
    background-size:100% 100%;
  }

  .sysname{
    width:100%;
    text-align:center;
    font-weight:900;
    font-size:16px;
    color:#fff;
    position:absolute;
    top:calc(50% + 39px);
  }

  .contenter{
    width:84%;
    height:100px;
    position:relative;
    /*background-color: red;*/
    top:6%;
    left:8%;
    border-radius:8px;
    border:1px solid #ccc;
    overflow: hidden;
  }
  .kshinput{
    width:100%;
    height:50%;
    border-bottom:1px solid #ccc;
    position:relative;
    /*background-color:mistyrose;*/
  }
  .pwdinput{
    width:100%;
    height:50%;
    position:relative;
    /*background-color:greenyellow;*/
  }

  .loginbut{
    width:84%;
    height:40px;
    position:relative;
    left:8%;
    top:60px;
    background-color:rgb(40,123,226);
    color:#fff;
    font-weight: 900;
    line-height: 40px;
    border-radius:20px;
  }
.buthide{
  display:none;
}
.loginbut1{
  width:84%;
  height:40px;
  position:relative;
  left:8%;
  top:60px;
  background-color:#eee;
  color:#fff;
  font-weight: 900;
  line-height: 40px;
  border-radius:20px;
}

.loginbut2{
  width:84%;
  height:40px;
  position:relative;
  left:8%;
  top:60px;
  background-color:rgb(40,123,226);;
  color:#fff;
  font-weight: 900;
  line-height: 40px;
  border-radius:20px;
}

.changepwdview{
  width:100%;
  height:100%;
  z-index:333;
  background-color:#fff;
  position:fixed;
  top:0px;
  left:0px;
}
  .kshicon,
  .pwdicon{
    height:100%;
    width:50px;
    float:left;

  }

  .kshicon{
    background-image:url('../../static/img/ksh.png');
    background-size:45% 45%;
    background-repeat: no-repeat;
    background-position:center;
  }
  .pwdicon{
    background-image:url('../../static/img/pwd.png');
    background-size:45% 45%;
    background-repeat: no-repeat;
    background-position:center;
  }
  .ksh,.pwd{
    border:0;
    height:100%;
    width:100%;
    font-size:14px;
  }
 .inputwrap{
   width:calc(100% - 50px);
   height:100%;
   /*background-color:red;*/
   float:left;
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

  .changetoteacher{
    position: fixed;
    bottom:20px;
    left:0px;
    color:rgb(40,123,226);
    width:100%;
    text-align: center;
    z-index:0;
  }
  .teacherview{
    width:100%;
    height:100%;
    position:fixed;
    top:0px;
    left:0px;
    z-index:999;
  }
</style>
