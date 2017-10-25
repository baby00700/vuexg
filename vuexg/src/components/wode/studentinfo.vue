<template>
  <div class="studentinfo">
    <transition  name="custom-classes-transition"
                 enter-active-class="animated fadeIn"
                 leave-active-class="animated fadeOut">
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
        <div class="con">男</div>
      </div>
    </div>
    <div class="moreinfo">
      <div class="baseline">
        <div class="tubiao yxtb">
        </div>
        <div class="title">
         院系
        </div>
        <div class="con">英语系</div>
      </div>
      <div class="baseline">
        <div class="tubiao zytb">
        </div>
        <div class="title">
          专业
        </div>
        <div class="con">商务英语</div>
      </div>
      <div class="baseline">
        <div class="tubiao bjtb">
        </div>
        <div class="title">
          班级
        </div>
        <div class="con">17英语（1）班</div>
      </div>
      <div class="baseline">
        <div class="tubiao sjtb">
        </div>
        <div class="title">
          手机
        </div>
        <div class="con sjh"><span>13133817015</span><el-switch
          v-model="isopen"
          on-color="#13ce66"
          off-color="#ff4949"
          on-text="公开"
          off-text="私密"
        class="swich">
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

export default {
  name: 'studentinfo',
  data () {
    return {
      ischangepwdviewshow: false,
      dialogVisible: false,
      isopen: false
    }
  },
  mounted: function () {
    console.log(this.selfinfo)
  },
  props: ['selfinfo'],
  methods: {
    loginout: function () {
      MessageBox.confirm('确定退出登陆?').then(action => {
        let loadingInstance1 = Loading.service({fullscreen: true, customClass: 'loading'})
        setTimeout(function () {
          loadingInstance1.close()
          window.localStorage.clear()
          location.reload(true)
        }, 3000)
      })
    },
    showchangepwd: function () {
      this.ischangepwdviewshow = true
    },
    hidechangepwd: function () {
      this.ischangepwdviewshow = false
    }
  },
  watch: {
    isopen: function (newval, oldval) {
      // ajax
      let loadingInstance2 = Loading.service({fullscreen: true, customClass: 'loading'})
      setTimeout(function () {
        loadingInstance2.close()
      }, 3000)
    },
    ischangepwdviewshow: function () {
      let loadingInstance0 = Loading.service({ fullscreen: true })
      setTimeout(function () {
        loadingInstance0.close()
      }, 1000)
    }
  },
  components: {
    changepwdview: changepwd
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.studentinfo{
  width:100%;
  /*height:calc(100% - 180px);*/
  height:400px;
  background-color:#ecedf1;
  position:fixed;
  top:90px;
  bottom: 50px;
  overflow:scroll;
}
 .baseinfo{
   width:100%;
   height:88px;
   position:absolute;
   top:10px;
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
    top:108px;
  }
  .changepwd{
    width:100%;
    height:44px;
    position:absolute;
    top:298px;
  }
  .loginout{
    width:100%;
    height:44px;
    position:absolute;
    top:352px;
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
