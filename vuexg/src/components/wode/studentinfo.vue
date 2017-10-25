<template>
  <div class="studentinfo">
    <transition  name="custom-classes-transition"
                 enter-active-class="animated bounceInRight"
                 leave-active-class="animated bounceOutRight">
      <changepwdview v-show="ischangepwdviewshow" class="changepwdview" @changepwdhide="hidechangepwd"></changepwdview>
    </transition>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="small"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
     </span>
    </el-dialog>

    <div class="baseinfo">
      <div class="baseline">
        <div class="tubiao">
        </div>
        <div class="title">
          身份
        </div>
        <div class="con">学生</div>
      </div>
      <div class="baseline">
        <div class="tubiao">
        </div>
        <div class="title">
          身份
        </div>
        <div class="con">学生</div>
      </div>
    </div>
    <div class="moreinfo">
      <div class="baseline">
        <div class="tubiao">
        </div>
        <div class="title">
          身份
        </div>
        <div class="con">学生</div>
      </div>
      <div class="baseline">
        <div class="tubiao">
        </div>
        <div class="title">
          身份
        </div>
        <div class="con">学生</div>
      </div>
      <div class="baseline">
        <div class="tubiao">
        </div>
        <div class="title">
          身份
        </div>
        <div class="con">学生</div>
      </div>
      <div class="baseline">
        <div class="tubiao">
        </div>
        <div class="title">
          身份
        </div>
        <div class="con">学生</div>
      </div>
    </div>
    <div class="changepwd" @click="showchangepwd">
      <div class="baseline">
        <div class="tubiao">
        </div>
        <div class="title">
          修改密码
        </div>
        <div class="con">学生</div>
      </div>
    </div>
    <div class="loginout" @click="loginout">退出登录</div>

  </div>
</template>

<script>
import changepwd from '@/components/changepwd'
// import { Loading } from 'element-ui'

export default {
  name: 'studentinfo',
  data () {
    return {
      ischangepwdviewshow: false,
      dialogVisible: false
    }
  },
  mounted: function () {
    console.log(this.selfinfo)
  },
  props: ['selfinfo'],
  methods: {
    loginout: function () {
      this.dialogVisible = true
     // setTimeout(function () {
       // let loadingInstance1 = Loading.service({fullscreen: true, customClass: 'loading'})
       // loadingInstance1.close()
       // window.localStorage.clear()
        // location.reload(true)
    //  }, 3000)
    },
    showchangepwd: function () {
      this.ischangepwdviewshow = true
    },
    hidechangepwd: function () {
      this.ischangepwdviewshow = false
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  watch: {
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
  height:calc(100% - 90px);
  background-color:#ecedf1;
  position:fixed;
  top:90px;
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
    width:32px;
    height:32px;
    background-color:red;
    position:absolute;
    top:6px;
    left:10px;
    border-radius:18px;
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
</style>
