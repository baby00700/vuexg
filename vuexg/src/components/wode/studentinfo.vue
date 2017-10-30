<template>
  <div class="studentinfo">
    <div class="selfinfo">
      <div class="touxiang"></div>
      <div class="infolist">
        <ul>
          <li>
            <div class="infoline">
              <span class="key">姓名:</span><span class="value">{{xm}}</span>
            </div>
          </li>
          <li>
            <div class="infoline">
              <span class="key">学号:</span><span class="value">{{xh}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <transition  name="custom-classes-transition"
                 enter-active-class="animated bounceInLeft"
                 leave-active-class="animated bounceOutRight">
      <changepwdview v-show="ischangepwdviewshow" class="changepwdview" @changepwdhide="hidechangepwd"></changepwdview>
    </transition>
    <div class="baseinfo">
      <div class="baseline">
        <div class="tubiao sftb">
        </div>
        <div class="title">
          身份
        </div>
        <div class="con">学生</div>
      </div>
      <div class="baseline">
        <div class="tubiao xbtb">
        </div>
        <div class="title ">
         性别
        </div>
        <div class="con">{{xb}}</div>
      </div>
    </div>
    <div class="moreinfo">
      <div class="baseline">
        <div class="tubiao yxtb">
        </div>
        <div class="title">
         院系
        </div>
        <div class="con">{{yx}}</div>
      </div>
      <div class="baseline">
        <div class="tubiao zytb">
        </div>
        <div class="title">
          专业
        </div>
        <div class="con">{{zy}}</div>
      </div>
      <div class="baseline">
        <div class="tubiao bjtb">
        </div>
        <div class="title">
          班级
        </div>
        <div class="con">{{bj}}</div>
      </div>
      <div class="baseline">
        <div class="tubiao sjtb">
        </div>
        <div class="title">
          手机
        </div>
        <div class="con sjh"><span>{{sj}}</span><el-switch
          v-model="phoneisopen"
          on-color="#13ce66"
          off-color="#ff4949"
          on-text="公开"
          off-text="隐藏"
          on-value="1"
          off-value="0"
        class="swich" @change="setPhoneOpenOrClose">
        </el-switch></div>
      </div>
    </div>
    <div class="changepwd" @click="showchangepwd">
      <div class="baseline">
        <div class="tubiao xgmmtb">
        </div>
        <div class="title">
          修改密码
        </div>
        <div class="con"><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
    <div class="loginout" @click="loginout">退出登录</div>

  </div>
</template>

<script>
import changepwd from '@/components/changepwd'
import { Loading } from 'element-ui'
import { MessageBox } from 'mint-ui'
import axios from 'axios'

export default {
  name: 'studentinfo',
  data () {
    return {
      ischangepwdviewshow: false,
      dialogVisible: false,
      phoneisopen: '',
      xm: '',
      xh: '',
      xb: '',
      yx: '',
      zy: '',
      bj: '',
      sj: '',
      sf: '学生'
    }
  },
  created: function () {
    var selfinfo = window.localStorage.getItem('selfinfo')
    selfinfo = JSON.parse(selfinfo)
    this.xm = selfinfo.userName
    this.xh = selfinfo.userCode
    this.xb = selfinfo.xb
    if (this.xb === '1') {
      this.xb = '男'
    } else {
      this.xb = '女'
    }
    this.yx = selfinfo.departname
    this.zy = selfinfo.zymc
    this.bj = selfinfo.bjmc
    this.sj = selfinfo.lxdh
    var phoneisopen = window.localStorage.getItem('phoneisopen')
    this.phoneisopen = phoneisopen
  },
  mounted: function () {
  },
  props: ['selfinfo'],
  methods: {
    loginout: function () {
      MessageBox.confirm('确定退出登陆?', {
        title: '提示',
        confirmButtonClass: 'confirmbutclass',
        cancelButtonClass: 'cancelbutclass'
      }).then(action => {
        let loadingInstance1 = Loading.service({fullscreen: true, customClass: 'loading'})
        setTimeout(function () {
          var url = '/sms-wx/smsUserController.do?cancelLogin'
          axios.post(url).then(function (data) {
            console.log(data)
            loadingInstance1.close()
            window.localStorage.clear()
            window.location.reload(true)
            window.localStorage.setItem('isloginsuccess', 'false')
            window.location.href = 'http://192.168.1.167:8081/dist'
          })
        }, 1000)
      })
    },
    showchangepwd: function () {
      this.ischangepwdviewshow = true
    },
    hidechangepwd: function () {
      this.ischangepwdviewshow = false
    },
    setPhoneOpenOrClose: function () {
      let loadingInstance0 = Loading.service({ fullscreen: true })
      var url = '/sms-wx/smsUserController.do?setPhoneOpenOrClose'
      var that = this
      setTimeout(function () {
        axios.post(url).then(function (data) {
//          console.log(data.data.obj)
//          console.log(typeof data.data.obj)
//          console.log(that.phoneisopen)
          that.phoneisopen = data.data.obj
          window.localStorage.setItem('phoneisopen', data.data.obj)
          loadingInstance0.close()
        })
      }, 500)
    }
  },
  watch: {
    ischangepwdviewshow: function () {
     // let loadingInstance0 = Loading.service({ fullscreen: true })
      setTimeout(function () {
      //  loadingInstance0.close()
      }, 1000)
    }
  },
  components: {
    changepwdview: changepwd
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .confirmbutclass{
    width: 1em !important;
    height: 3em !important;
    font-size: 16px !important;
    line-height:1em !important;
    margin-top:-4px !important;
  }
  .cancelbutclass{
    width: 1em !important;
    height: 3em !important;
    line-height:1em !important;
    font-size: 16px !important;
    margin-top:-4px !important;
    border-right:1px solid #fff !important;
  }
</style>
<style scoped>

  .studentinfo{
  width:100%;
  height:100%;
  /*border:1px solid red;*/
  background-color:#ecedf1;
  position:fixed;
  top:0px;
  bottom: 50px;
  overflow:scroll;
}
.selfinfo{
  width:100%;
  height:90px;
  background-color:#38adff;
  position:fixed;
  top:0px;
  z-index:888;

}
.touxiang{
  width:64px;
  height:64px;
  position: absolute;
  top:10px;
  left:20px;
  border-radius:40px;
  border:2px solid #fff;
  overflow: hidden;
  background-image:url("/static/img/head.png");
  background-size:100% 100%;
}
.infolist{
  width:calc(100% - 120px);
  height:60px;
  position:absolute;
  top:15px;
  left:100px;
  /*background-color:green;*/
}
.infoline{
  width:100%;
  height:30px;
  /*background-color:#00ff00;*/
  position: relative;
  font-size:17px;
  font-weight:500;
}
.key{
  width: 50px;
  height:30px;
  /*background-color:yellow;*/
  line-height:30px;
  display: block;
  color:#fff;
}
.value{
  width:calc(100% - 50px);
  height:30px;
  /*background-color:red;*/
  display:block;
  line-height:30px;
  position:absolute;
  left:50px;
  top:0px;
  text-align: left;
  color:#fff;
}
li{
  list-style: none;
}
 .baseinfo{
   width:100%;
   height:88px;
   position:absolute;
   top:100px;
 }
.baseline{
  width:100%;
  height:44px;
  background-color:#fff;
  border-bottom:1px solid #ecedf1;
  position:relative;
}
  .tubiao{
    width:34px;
    height:34px;
    position:absolute;
    top:5px;
    left:10px;
    border-radius:17px;
    background-size:70% 70%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .title{
    width:calc(50% - 55px);
    height:44px;
    /*border:1px solid red;*/
    position:absolute;
    top:0px;
    left:55px;
    text-align: left;
    line-height:44px;
  }
  .con{
    width:calc(50% - 15px);
    height:44px;
    /*border:1px solid green;*/
    position:absolute;
    right:10px;
    text-align: right;
    line-height:44px;
  }
  .moreinfo{
    width:100%;
    height:176px;
    position:absolute;
    top:198px;
  }
  .changepwd{
    width:100%;
    height:44px;
    position:absolute;
    top:388px;
  }
  .loginout{
    width:100%;
    height:44px;
    position:absolute;
    top:443px;
    background-color:#fff;
    text-align: center;
    line-height:44px;
  }
  .changepwdview{
    width:100%;
    height:100%;
    position:fixed;
    top:0px;
    left:0px;
    z-index:999;
  }
  .loading{
    background-color:#fff;
  }
  .sftb{
    background-image:url('../../../static/img/shenfen.png');
    background-color:#9ed55e;
  }
.xbtb{
  background-image:url('../../../static/img/xingbie.png');
  background-color:#4279ef;
  -webkit-background-size: 50% 50%;
  background-size: 50% 50%;
}
  .yxtb{
    background-image:url('../../../static/img/yuanxi.png');
    background-color: #2eabff;
  }
.zytb{
  background-image:url('../../../static/img/zhuanye.png');
  background-color: #3bc2b5;
}
.bjtb{
  background-image:url('../../../static/img/banji.png');
  background-color: #fa6466;
  -webkit-background-size: 60% 60%;
}

.sjtb{
  background-image:url('../../../static/img/shouji.png');
  background-color: #3bc2b5;
  -webkit-background-size: 60% 60%;
}
.xgmmtb{
  background-image:url('../../../static/img/gaimi.png');
  background-color: #ef9342;
  -webkit-background-size: 60% 60%;
}
.sjh{
  width:160px;
  position:relative;
  left:calc(100% - 180px);
  text-align: left;

}
  .swich{
    float:right;
    position:absolute;
    top:10px;
    left:110px;
    right:10px;
  }
</style>
