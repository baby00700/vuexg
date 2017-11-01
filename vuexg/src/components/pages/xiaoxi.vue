<template>
  <div class="xiaoxi"  oncontextmenu='return false'>
    <transition  name="custom-classes-transition"
                 enter-active-class="animated bounceInLeft"
                 leave-active-class="animated bounceOutRight">
    </transition>
      <ul>
        <li class="loadli" :class="{ loadlianimate: isActive }">
          <div class="loadlicon">{{tips}}</div>
        </li>
        <li v-for="item in uselist">
          <div class="linewrap">
            <div class="icons" :class="listiconcolorclass[item.ww]">请</div>
            <div class="infos">
              <div class="titleinfo">
                <div class="title"><nobr>请点击上课签到</nobr></div>
                <div class="cont"><nobr>请点击上课签到</nobr></div>
              </div>
              <div class="timeinfo">9月10日</div>
              <div class="refdot" >未读</div>
            </div>
          </div>
        </li>
      </ul>
    <div class="eventzhezhao" v-if="isxxshow">
      <div class="xpoint">startpageY:{{startpageY}}</div>
      <div class="xpoint">endpageY:{{endpageY}}</div>
      <div class="xpoint">moveY:{{moveY}}</div>
      <div class="xpoint">touchstate:{{touchstate}}</div>
      <div class="xpoint">alert:{{alert}}</div>
      <div class="xpoint">getdata:{{getdata}}</div>
    </div>
    <!--<div class="xx" v-if="isxxshow"></div>-->
  </div>
</template>

<script>
  // Math.floor(Math.random()*10)
  import { Toast } from 'mint-ui'
  import axios from 'axios'
  const qs = require('qs')
  export default {
    name: 'xiaoxi',
    data () {
      return {
        list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        listiconcolorclass: ['color0', 'color1', 'color2', 'color3'],
        colorindex: -1,
        uselist: [],
        touchscrolltop: 0,
        startpageY: 0,
        endpageY: 0,
        moveY: 0,
        alert: 0,
        touchstate: '',
        isxxshow: true,
        isActive: false,
        getdata: false,
        tips: '下拉刷新'
      }
    },
    mounted: function () {
      // alert(navigator.platform)
//      document.querySelector('body').addEventListener('touchstart', function (ev) {
//        ev.preventDefault()
//      })
      console.log('zy')
      // var that = this
      this.$emit('mountedcomplete')
      this.setbgcolorrandom()
      var element = this.$el.children[0]
      console.clear()
      console.log(element)
      element.addEventListener('touchstart', this.touchstart, false)
      element.addEventListener('touchmove', this.touchmove, false)
      element.addEventListener('touchend', this.touchend, false)
      element.addEventListener('touchcancel', this.touchcancel, false)
    },
    methods: {
      setbgcolorrandom: function () {
        var ran = Math.floor(Math.random() * 3)
        this.colorindex = ran
        for (var i = 0; i < this.list.length; i++) {
          console.log(this.list[i])
          var qq = this.list[i]
          this.colorindex = this.colorindex + 1
          var ww = this.colorindex
          if (this.colorindex >= 3) {
            this.colorindex = -1
          }
          var xx = {qq, ww}
          this.uselist.push(xx)
        }
        console.log(this.uselist)
      },
      touchstart: function (event) {
       // console.log(event)
        this.getdata = false
        this.startpageY = event.touches[0].pageY
        this.touchstate = 'touchstart'
        this.tips = '下拉刷新'
        // event.preventDefault()
      },
      touchmove: function (event) {
        this.touchstate = 'touchmove'
        this.moveY = event.touches[0].pageY - this.startpageY
        this.endpageY = event.touches[0].pageY
        this.pagey = event.touches[0].pageY
        this.isActive = false
        var loadwrap = this.$el.children[0].children[0]
        if (this.moveY > 0 && event.touches[0].pageY - event.touches[0].clientY === 0) {
          loadwrap.style.height = this.moveY + 'px'
          event.preventDefault()
          if (this.moveY >= 100) {
            this.alert = 'ok'
            this.tips = '松手即可刷新'
          } else {
            this.tips = '下拉刷新'
          }
        }
      },
      touchend: function () {
       // console.log(event)
        if (this.moveY >= 100) {
          this.alert = 'ok'
          console.log('okonce')
          this.tips = '正在刷新...'
          this.getnewslistdata()
        } else {
          this.touchstate = 'touchend'
          var loadwrap = this.$el.children[0].children[0]
          this.isActive = true
          this.alert = 'no'
          loadwrap.style.height = 0 + 'px'
        }
      },
      touchcancel: function (event) {
        event.preventDefault()
        console.log(event)
        this.touchstate = 'touchcancel'
        if (this.moveY >= 100) {
          this.alert = 'ok'
          console.log('okonce')
          this.tips = '正在刷新...'
          this.getnewslistdata()
        } else {
          var loadwrap = this.$el.children[0].children[0]
          this.isActive = true
          this.alert = 'no'
          loadwrap.style.height = 0 + 'px'
        }
      },
      getnewslistdata: function () {
        var that = this
        var url = '/sms-wx/smsUserController.do?getNotice'
        axios.post(url, qs.stringify({pageindex: '1', pagesize: '4', ptype: '2'})).then(function (data) {
          if (typeof data.data === 'object') {
            if (data.data.msg !== '' && data.data.msg !== null && data.data.msg !== 'null' && data.data.msg !== undefined && data.data.msg !== 'undefined') {
              console.log(data.data.msg)
              that.touchstate = 'touchend'
              var loadwrap = that.$el.children[0].children[0]
              that.isActive = true
              that.alert = 'no'
              loadwrap.style.height = 0 + 'px'
              that.getdata = 'ok'
              that.tips = '已刷新！'
              Toast({
                message: '操作成功'
              })
            }
          }
        })
      }
    },
    watch: {
      colorindex: function (newval, oldval) {
        if (newval > 3) {
          this.colorindex = 0
         // alert(newval)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .xiaoxi{
   width:100%;
   padding-bottom:60px;
    overflow: scroll;
   /*background-color: #1c8de0;*/

 }
 li{
   width:100%;
   height:81px;
   position: relative;
 }
 .loadmore{
   width:100%;
   height:100%;
   position: relative;
   /*background-color: red;*/
 }
  .linewrap{
    height:80px;
    width:100%;
    background-color:#fff;
    border-bottom: 1px solid #eee;
    position:absolute;
    top:0px;
  }
 .linewrap:active{
   height:80px;
   width:100%;
   background-color:#fff;
   border-bottom: 1px solid #eee;
   position:absolute;
   top:0px;
   -webkit-box-shadow: 0px 0px 18px 1px rgba(0,0,0,0.3) inset;
 }
  .icons{
    height:60px;
    width:60px;
    background-color:red;
    position: absolute;
    top:10px;
    left:10px;
    border-radius:30px;
    line-height:60px;
    font-size:24px;
    color:#fff;
    font-weight: 300;
  }
  .color0{
    background-color:#37ACFE;
  }
 .color1{
   background-color:#82CB2A;
 }
 .color2{
   background-color:#1AC4BA;
 }
 .color3{
   background-color:#488AFB;
 }
  .infos{
    width:calc(100% - 80px);
    height:60px;
    /*background-color:#00ffff;*/
    position:absolute;
    top:10px;
    left:80px;
  }
  .titleinfo{
    height:60px;
    width:calc(100% - 70px);
    /*background-color:#00ff00;*/
    position:relative;
  }
  .title{
    width:100%;
    height:30px;
    /*background-color:#1c8de0;*/
    position:absolute;
    text-align: left;
    line-height: 30px;
    font-size:18px;
    overflow:hidden;text-overflow:ellipsis;
  }
  .cont{
    width:100%;
    height:30px;
    /*background-color:#0000ff;*/
    position:absolute;
    top:30px;
    text-align: left;
    line-height: 30px;
    font-size:14px;
    color:#999;
    overflow:hidden;text-overflow:ellipsis;
  }
 .timeinfo{
   width:70px;
   height:30px;
   /*background-color:#00ff00;*/
   position:absolute;
   top:0px;
   right:0px;
   line-height: 30px;
   font-size:14px;
   color:#999;
 }
  .refdot{
    width:70px;
    height:30px;
    position: absolute;
    top:30px;
    right:0px;
    border-radius:7px;
    color:#37ACFE;
    font-size:13px;
    line-height:30px;
    font-weight: 500;
  }
  .eventzhezhao{
    width:250px;
    padding:10px 0px 15px 0px;
    background-color: rgba(0,0,0,0.7);
    position:fixed;
    top:250px;
    left:30px;
    border-radius: 5px;
    -webkit-box-shadow: 2px 2px 10px 1px rgba(0,0,0,0.5);
  }
  .xpoint{
    height:10px;
    width:100%;
    color:#fff;
    text-align: left;
    margin-top:5px;
    margin-bottom:5px;
    margin-left:10px;
    font-size:13px;
    font-weight:900;
  }
  .xx{
    height:30px;
    width:100%;
    border-radius: 0px;
    background-color:#fff;
    /*-webkit-box-shadow: 1px 1px 4px 1px rgba(0,0,0,0.3);*/
    line-height:30px;
    z-index:999;
    border-bottom:1px solid #ccc;
    color:#000;
    font-size:13px;
  }
 .loadli{
   width:100%;
   height:0px;
   background-color: #fff;
   -webkit-box-shadow: 0px 1px 10px 1px rgba(0,0,0,0.3) inset;
   position: relative;
 }

  .loadlianimate{
    transition:all .5s ease;
  }
  .loadlicon{
    height:40px;
    width:100%;

    border-radius: 20px;
    position: absolute;
    top:calc(50% - 10px);
    text-align: center;
    /*text-shadow:  3px 3px 1px rgba(0,0,0,0.3);*/
  }

</style>
