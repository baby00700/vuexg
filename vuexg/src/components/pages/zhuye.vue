<template>
  <div class="zhuye">
    <transition  name="custom-classes-transition"
                 enter-active-class="animated bounceInUp"
                 leave-active-class="animated bounceOutDown">
    <router-view class="functionview"></router-view>
    </transition>
    <div class="lunbo">
      <mt-swipe :auto="0" :show-indicators="false">
          <mt-swipe-item v-for="item in lunboimglist" class="lunbotu" :key="item.title">
            <div class="titlebox">{{item.title}}</div>
            <div class="imgbox">
              <img src="http://192.168.1.155:8081/sms-wx/upload/files/20140627233502FEzyc38j.jpg" alt="">
            </div>
          </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="funclistwrap">
      <div class="functionlist">
        <li class="functiccon" v-for="(item, $index) in functionlist"  :key="item.columnName"  @click="tofunctions($index)">
            <div class="funcicon"></div>
            <div class="funcname">{{item.columnName}}</div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui'
import axios from 'axios'
import { Loading } from 'element-ui'
import bus from '@/components/bus.js'   // 事件总线

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  name: 'zhuye',
  data () {
    return {
      ispageshow: false,
      functionlist: [
        {columnName: '成绩查询', columnbyName: 'chengjichaxun', columnimage: 'upload/1509087429968_d01373f082025aaf9789fc56fdedab64024f1af7.jpg'}
      ],
      lunboimglist: [
        {image_href: 'upload/files/20140627233502FEzyc38j.jpg', image_name: '19300001024098134717639977056.jpg', title: 'IPHONE7'}
      ]
    }
  },
  created: function () {
    let that = this
    var islogin = window.localStorage.getItem('isloginsuccess')
    if (islogin === 'true') {
      that.getfunctionslist()
      that.getimageurl()
    }
  },
  mounted: function () {
    console.log('zy')
    let that = this
    this.$emit('mountedcomplete')
    bus.$on('loginsuccessfromroot', function () {  // 从app触发 从login触发
      console.log(this)
      that.getfunctionslist()
      that.getimageurl()
    })
  },
  beforeDestroy: function () {
    let that = this
    bus.$off('loginsuccessfromroot', function () {
      console.log(this)
      that.getfunctionslist()
      that.getimageurl()
    })
  },

  methods: {
    alert: function () {
      alert('ajsadfvujf')
    },
    tofunctions: function (index) {
      console.log(index)
      this.$router.push('/dist/zhuye/' + this.functionlist[index].columnbyName)
    },
    getfunctionslist: function () {
      console.log('事件已接收')
      let loadingInstance1 = Loading.service({fullscreen: true})
      var that = this
      var url = '/sms-wx/smsUserController.do?doMUserLogin&columnRoleList'
     // http://192.168.1.110:8081/sms-wx/smsUserController.do?doMUserLogin&columnRoleList
      axios.post(url).then(function (data) {
        that.functionlist = []
        if (data.data !== null && data.data !== 'null') {
          var islogin = window.localStorage.getItem('isloginsuccess')
         // console.log(islogin)
          if (islogin === 'true' && data.data.msg.length >= 1 && data.data.msg !== null && data.data.msg !== 'null' && data.data.msg !== undefined && data.data.msg !== 'undefined') {
            var datamsg = JSON.parse(data.data.msg)
            for (var i = 0; i < datamsg.length; i++) {
              // console.log(i)
              var funcnames = {columnbyName: datamsg[i].columnbyName, columnName: datamsg[i].columnName}
              that.functionlist.push(funcnames)
              loadingInstance1.close()
            }
          }
        }
      })
    },
    getimageurl: function () {
      let that = this
      var url = '/sms-wx/smsUserController.do?adListByImg'
      axios.post(url).then(function (data) {
        that.lunboimglist = []
        if (data.data !== null && data.data !== 'null') {
          if (data.data.obj === 'needlogin') {
            window.localStorage.clear()
            window.location.reload(true)
            window.location.href = 'http://192.168.1.167:8081/dist'
          }
          // console.log(data.data.msg)
          if (data.data.msg !== null && data.data.msg !== 'null' && data.data.msg !== undefined && data.data.msg !== 'undefined') {
            if (data.data.msg.length > 0) {
              var imgdata = JSON.parse(data.data.msg)
              console.log(imgdata)
              for (var i = 0; i < imgdata.length; i++) {
                that.lunboimglist.push(imgdata[i])
              }
              console.log(that.lunboimglist)
            }
          }
        }
      }).catch(function (err) {
        alert(err)
      })
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
    background-color:#fff;
  }
 .imgbox{
   width:100%;
   height:100%;

 }
  .funclistwrap{
    width:100%;
    /*height:140px;*/
    background-color:green;
  overflow: scroll;
  }
  .functionlist{
    width:150%;
    /*//height:140px;*/
    /*background-color:yellow;*/
    padding-top:10px;
    padding-right:-150%;
  }
  .functiccon{
    display: inline-block;
    background-color: darkgreen;
    width:12%;
    height:70px;
    float: left;
    margin-left:4%;
    margin-bottom:10px;
    position: relative;
  }

.funcicon{
  width:50px;
  height:50px;
  border-radius:25px;
  background-color:yellow;
  position:absolute;
  left:calc(50% - 25px);

}
  .funcname{
    width:100%;
    height:20px;
    background-color:blue;
    position:absolute;
    top:50px;
    color:#fff;
  }
  .functionview{
    width:100%;
    height:100%;
    position:fixed;
    background-color:yellow;
  }
  .titlebox{
    width:100%;
    height:18px;
    background-color:rgba(255,255,255,0.5);
    position:absolute;
    bottom:0px;
    line-height:18px;
    font-size:15px;
    font-weight:600;
  }
</style>
