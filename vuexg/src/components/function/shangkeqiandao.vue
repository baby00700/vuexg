<template>
  <div class="shangkeqiandao">
    <div class="topinfo">
      <div class="classinfo">
        <div class="bjname"><div class="bj">班级:</div> <div class="bjmc">
          <nobr v-if="isstudentshowbjmc">{{stuclassname}}</nobr>
          <input type="text" v-if="isteachershowbjmc" class="selbjnput" v-model="classname" @click="bjshowpop()" placeholder="请点击选择班级" readonly="readonly" >
        </div></div>
        <div class="count"><div class="zrs">总人数</div> <div class="bhzrs"><span style="color:#4db3ff">{{bjcount}}</span>人</div></div>
      </div>
      <div class="lessoninfo">
        <div class="seltime">
          <div class="seltimelabel"><nobr>请选择日期:</nobr></div>
          <input type="text" class="seltimeinput" v-model="classtime" icon="el-icon-search" @click="openPicker" readonly="readonly">
        </div>
        <div class="selkeshi">
          <div class="selkeshilabel"><nobr>请选择课时:</nobr></div>
          <input type="text" class="selkeshinput" v-model="keshi" @click="showpop()" placeholder="请选择课时" readonly="readonly">
        </div>
        <div class="lessonname" >
          <div class="skcmclabel"><nobr>课程名称:</nobr></div>
          <input type="text" class="kcmcinput" v-model="kcmc" placeholder="请填写课程名称" maxlength="30"></div>
      </div>
    </div>
    <div class="studentslist">
      <div class="studentcard" v-for="(item, $index) in instudentslist" @click="showcard($index)" v-bind:class="{ cardchecked: item.ischecked}">
        <div class="cardtop">
          <div class="xh">学号:{{item.xh}}</div>
          <div class="xm">姓名:{{item.xm}}</div>
          <div class="sel" @click="tozero($index)" ><el-checkbox v-model="item.ischecked" style="float: right" v-bind:class="{ checked: item.ischecked}" ><span style="float: left;" >{{item.ischecked ? '已签到' : '未签到'}}&nbsp;</span></el-checkbox></div>
        </div>
        <div class="cardmid">
          <div class="fztip">分值</div>
          <div class="fzctrl">
            <div class="fzinput">
              <div class="fz">
                <input type="text" class="fzinputin" readonly="readonly" v-model="item.fz">
              </div>
              <!--<div class="low" @click="fzminus($index)">-</div>-->
              <!--<div class="high" @click="fzplus($index)">+</div>-->
            </div>
          </div>
        </div>
        <div class="cardbot" v-show="item.iscardbotshow">
          <input type="text" v-model="item.reason" class="reasontext" @click="stopevent($index)" placeholder="请输入原因（限50字以内）" maxlength="50">
        </div>
      </div>
    </div>
    <div class="teachertips" v-if="isteachershowtips">{{teachertips}}</div>
    <div class="buttons" v-if="isbuttonokshow">
      <div class="goback" @click="goback()">返回</div>
      <div class="submit" @click="submit()">提交</div>
    </div>
    <div class="datapicker">
      <mt-datetime-picker
        ref="picker0"
        type="date"
        v-model="pickerdate"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日">
      </mt-datetime-picker>
    </div>
    <div class="keshipicker">
      <mt-popup  v-model="popupVisible"  position="bottom" style="width:100%">
        <mt-picker :slots="slots" @change="onValuesChange"><slot></slot></mt-picker>
      </mt-popup>
    </div>
    <div class="bjpicker">
      <mt-popup  v-model="bjpopupVisible"  position="bottom" style="width:100%">
        <mt-picker :slots="bjslots" @change="bjonValuesChange"><slot></slot></mt-picker>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { DatetimePicker, Popup, Picker } from 'mint-ui'
  import axios from 'axios'
  import bus from '@/components/bus.js'   // 事件总线
  import { Loading } from 'element-ui'
  const qs = require('qs')
  Vue.component(Popup.name, Popup)
  Vue.component(Picker.name, Picker)
  Vue.component(DatetimePicker.name, DatetimePicker)

  export default {
    name: 'shangkeqiandao',
    data () {
      return {
        classname: '',
        stuclassname: '',
        classtime: '',
        jcinfo: '请选择课时',
        kcmc: '',
        actualnum: '', // 实际人数
        pickerdate: new Date(),
        popupVisible: false,
        slots: [
          {
            flex: 1,
            values: ['1-2', '3-4', '5-6', '7-8'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        bjslots: [
          {
            flex: 1,
            values: ['222', '3222-4', '5111-6', '7-2228'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        pickerkeshi: '',
        instudentslist: [
          {xm: '...', xh: '...', ischecked: false, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0, reason: ''}
        ],
        stauts: '',
        score: '',
        remark: '',
        classatend: [],
        classatendDetail: [],
        isstudentshowbjmc: true,
        bjpopupVisible: false,
        isteachershowbjmc: false,
        isteachershowtips: false,
        teachertips: '请选择需要打分的班级',
        isbuttonokshow: true,
        bjlist: [],
        studentbjdm: '',
        bjcount: 0,
        teacherbjdm: '',
        attendancenum: 0,
        outstudentlist: []
      }
    },
    created: function () {
      this.keshi = '请选择课时'
      let that = this
      var iszhuyeok = window.localStorage.getItem('iszhuyeok')
      if (iszhuyeok === 'ok') {
        that.getuserinfo()
      } else {
        bus.$off('zhuyeisok', function () {
          console.log('zhuyeisok---事件已接收')
          that.getuserinfo()
        })
      }
    },
    mounted: function () {
    },
    beforeDestroy: function () {
      bus.$off('zhuyeisok', function () {
        console.log('deszhuyeisok---事件已接收')
      })
    },
    methods: {
      onValuesChange (picker, values) {
        this.pickerkeshi = values[0]
      },
      bjonValuesChange: function (picker, values) {
        this.classname = values[0]
        if (this.bjlist.length > 0) {
          for (var i = 0; i < this.bjlist.length; i++) {
            if (this.bjlist[i].bjmc === this.classname) {
              this.teacherbjdm = this.bjlist[i].bjdm
              this.getstudentlist(this.teacherbjdm)
            }
          }
        }
      },
      openPicker () {
        this.$refs.picker0.open()
      },
      showpop: function () {
        this.popupVisible = true
      },
      bjshowpop: function () {
        this.bjpopupVisible = true
      },
      showcard: function (index) {
        console.log(index)
        this.instudentslist[index].iscardbotshow = !this.instudentslist[index].iscardbotshow
      },
      fzminus: function (index) {
        event.cancelBubble = true
        this.instudentslist[index].fz = this.instudentslist[index].fz - 0.5
        if (this.instudentslist[index].fz <= -5) {
          this.instudentslist[index].fz = -5
        }
      },
      fzplus: function (index) {
        event.cancelBubble = true
        if (this.instudentslist[index].ischecked === false) {
          this.instudentslist[index].fz = 0
        } else {
          this.instudentslist[index].fz = this.instudentslist[index].fz + 0.5
          if (this.instudentslist[index].fz >= 5) {
            this.instudentslist[index].fz = 5
          }
        }
      },
      stopevent: function () {
        event.cancelBubble = true
      },
      tozero: function (index) {
        console.log(this.instudentslist[index].ischecked)
        if (this.instudentslist[index].ischecked === true) {
          this.instudentslist[index].fz = 0
        } else {
          this.instudentslist[index].fz = 0.5
        }
      },
      goback: function () {
        window.history.back()
      },
      getstudentlist: function (value) {
        let loadingInstance1 = Loading.service({fullscreen: true, customClass: 'loading'})
        var that = this
        var url = '/sms-wx/assessController.do?classattendList'
        axios.post(url, qs.stringify({classCode: value})).then(function (data) {
          console.log(data)
          that.instudentslist = []
          if (typeof data.data === 'object') {
            if (data.data.obj !== 'needlogin') {
              if (data.data.success === true) {
                var studentlist = data.data.msg
                studentlist = JSON.parse(studentlist)
                for (var i = 0; i < studentlist.length; i++) {
                  console.log(i)
                  // {xm: '...', xh: '...', ischecked: false, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0, reason: ''}
                  var xm = studentlist[i].xm
                  var xh = studentlist[i].xh
                  var score = studentlist[i].score
                  var templist = {xm: xm, xh: xh, ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: score, reason: ''}
                  that.instudentslist.push(templist)
                }
                console.log(that.instudentslist)
                that.bjcount = that.instudentslist.length
                that.isteachershowtips = false
                loadingInstance1.close()
               // that.classname = window.localStorage.getItem('selfinfo')
              }
            } else {
              window.localStorage.clear()
              window.location.reload(true)
            }
          }
        })
      },
      getteacherbjlist: function () {
        let that = this
        var url = '/sms-wx/assessController.do?getTeachteacher'
        axios.post(url).then(function (data) {
          console.log(data)
          if (typeof data.data === 'object') {
            if (data.data.obj === 'needlogin') {
              window.localStorage.clear()
              window.location.reload(true)
            } else {
              if (data.data.success === true) {
                if (data.data.msg.length > 0) {
                  console.log(data.data.msg)
                  var datamsg = JSON.parse(data.data.msg)
                  console.info(datamsg)
                  that.bjslots[0].values = []
                  for (var i = 0; i < datamsg.length; i++) {
                    var bjlist = {bjmc: datamsg[i].bjmc, bjdm: datamsg[i].bjdm, teachername: datamsg[i].teachername}
                    that.bjlist.push(bjlist)
                    that.bjslots[0].values.push(datamsg[i].bjmc)
                  }
                }
              }
            }
          }
        })
      },
      pushstudentlist: function () {
        console.log('...')
        var usertype = window.localStorage.getItem('usertype')
        // 获取已签到人数
        var nochecked = []
        for (var i = 0; i < this.instudentslist.length; i++) {
          console.log(i)
          if (this.instudentslist[i].ischecked === false) {
            console.log(this.instudentslist[i].xm)
            nochecked.push(this.instudentslist[i].xm)
          }
        }
        console.log(nochecked)
        this.attendancenum = nochecked.length
       // alert(typeof usertype)
        if (usertype === '0') {
          var kcmc = this.kcmc
          var classtime = this.classtime
          var actualnum = this.bjcount
          var attendancenum = this.attendancenum
          var jcinfo = this.keshi
          var bjmc = this.stuclassname
          var bjdm = this.studentbjdm
          var classatend = [{
            kcmc: kcmc,
            classtime: classtime,
            actualnum: actualnum,
            attendancenum: attendancenum,
            jcinfo: jcinfo,
            bjmc: bjmc,
            bjdm: bjdm
          }]
          var sli = this.instudentslist
          for (var n = 0; n < sli.length; n++) {
            var xh = sli[n].xh
            var xm = sli[n].xm
            var status = sli[n].ischecked
            if (status === false) {
              status = 'N'
            } else if (status === true) {
              status = 'Y'
            }
            var score = sli[n].fz
            var remark = sli[n].reason
            var studentlist = {xh: xh, xm: xm, status: status, score: score, remark: remark}
            this.outstudentlist.push(studentlist)
          }
          var classatendDetail = this.outstudentlist
          //  classatendDetail: classatendDetail
          console.log(classatendDetail)
          classatendDetail = JSON.stringify(classatendDetail)
          classatend = JSON.stringify(classatend)
          var dataall = {classatend: classatend, classatendDetail: classatendDetail}
          console.log(dataall)
          var dataout = qs.stringify(dataall)
          console.log(dataout)
          this.ajaxdata(dataout)
        } else {
          alert('teacher')
        }
        this.classatend = []
      },
      submit: function () {
        this.pushstudentlist()
      },
      getuserinfo: function () {
        console.log('emitedfromok')
        var usertype = window.localStorage.getItem('usertype')
        var selinfo = window.localStorage.getItem('selfinfo')
        selinfo = JSON.parse(selinfo)
        console.clear()
        console.log(selinfo)
        console.log(usertype)
        if (usertype === '0') {
          console.log(selinfo.bjmc)
          this.stuclassname = selinfo.bjmc
          this.studentbjdm = selinfo.bjdm
          this.isstudentshowbjmc = true
          this.isteachershowbjmc = false
          this.getstudentlist()
        } else {
          console.log('teacher')
          this.isstudentshowbjmc = false
          this.isteachershowbjmc = true
          this.instudentslist = []
          this.getteacherbjlist()
        }
      },
      ajaxdata: function (dataall) {
        var url = '/sms-wx/assessController.do?addclassattend'
        axios.post(url, dataall).then(function (data) {
          console.log(data)
        })
      }
    },
    watch: {
      pickerdate: function (newval) {
        console.log(newval)
        var month = newval.getMonth() + 1
        this.classtime = newval.getFullYear() + '年-' + month + '月-' + newval.getDate() + '日'
      },
      pickerkeshi: function (newval) {
        this.keshi = newval
      }
    },
    components: {
    }
  }
</script>
<style>
  .picker-item{
    color:#e9e9e9 !important;
  }
   .picker-selected{
    color:#000 !important;
     font-weight:500 !important;
  }
</style>

<style scoped>
  .shangkeqiandao{
    width:100%;
    z-index:100;
    background-color:#ecedf1;
    overflow: scroll;
  }
  .classinfo{
    width:100%;
    height:45px;
    background-color:#fff;
    position:relative;
    font-size:14px;
    line-height: 45px;
  }
  .bjname{
    height:45px;
    width:calc(100% - 100px);
    /*background-color:#1c8de0;*/
    float:left;
  }
  .count{
    height:45px;
    width:calc(100px);
    /*background-color:#00ff00;*/
    float:right;
    text-align: right;
  }
  .bj{
    width:40px;
    height:45px;
    float: left;
    text-align: left;
    padding-left: 15px;
    overflow:hidden;text-overflow:ellipsis;
  }
  .bjmc{
    width:calc(100% - 60px);
    height:45px;
    float: left;
    text-align: left;
    overflow:hidden;text-overflow:ellipsis;
  }
  .zrs{
    width:45px;
    height:45px;
    float: left;
    text-align: left;
    overflow:hidden;text-overflow:ellipsis;
  }
  .bhzrs{
    width:calc(100% - 45px);
    height:45px;
    float: left;
    text-align: left;
    overflow:hidden;text-overflow:ellipsis;
  }
  .lessoninfo{
    width:calc(100% - 2px);
    height:135px;
    background-color:#fff;
    border:1px solid #eee;
    overflow: hidden;
  }
  .seltime{
    width:100%;
    height:45px;
    border-bottom:1px solid #eee;
    position:relative;
  }
  .lessonname{
    width:100%;
    height:45px;
    border-bottom:1px solid #eee;
    position:relative;
  }
  .selkeshi{
    width:100%;
    height:45px;
    border-bottom:1px solid #eee;
    position:relative;
  }
  .seltimelabel{
    width:30%;
    height:45px;
    line-height: 45px;
    font-size: 15px;
    text-align: left;
    position:absolute;
    left:10px;
    overflow:hidden;text-overflow:ellipsis;
  }
 .selkeshilabel{
   width:30%;
   height:45px;
   line-height: 45px;
   font-size: 15px;
   text-align: left;
   position:absolute;
   left:10px;
   overflow:hidden;text-overflow:ellipsis;
 }
  .skcmclabel{
    width:30%;
    height:45px;
    line-height: 45px;
    font-size: 15px;
    text-align: left;
    position:absolute;
    left:10px;
    overflow:hidden;text-overflow:ellipsis;
  }
  .seltimeinput, .selkeshinput, .kcmcinput{
    border: 0;
    width:calc(70% - 10px);
    text-align: right;
    height:42px;
    position:absolute;
    left:calc(30% - 8px );
    background-color:#FFF;
    font-size: 15px;
  }
  .seltimeinput{

  }
  .selkeshinput{

  }
  .kcmcinput{

  }
  .studentcard{
    width:90%;
    margin-top:10px;
    background-color:#fff;
    border:1px solid #d9dade;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    margin-left:5%;
    /*-webkit-box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.1);*/
    margin-bottom:20px;
    font-weight:600;
  }
  .cardchecked{
    border:1px solid #38adff;
  }
  .cardtop,.cardmid{
    width:98%;
    height:40px;
    border-bottom:1px solid #eee;
    /*background-color:green;*/
    border-radius: 0px;
    margin-left:1%;
    position:relative;
  }
  .cardbot{
    width:98%;
    height:50px;
    border-bottom:1px solid #eee;
    /*background-color:green;*/
    border-radius: 0px;
    margin-left:1%;
    position:relative;
  }
  .xh{
    width:calc(40% + 15px);
    height:40px;
    line-height:40px;
    font-size:14px;
    text-align: left;
    padding-left: 5px;
    float: left;
  }
  .xm{
    width:calc(30% - 15px);
    height:40px;
    line-height: 40px;
    font-size:14px;
    text-align: left;
    float: left;
  }
  .sel{
    width:calc(30% - 5px);
    height:40px;
    line-height: 40px;
    font-size:14px;
    text-align: left;
    float: left;
  }
  .checked{
    color:#38adff
  }
  .fztip{
    width:calc(50%);
    height:40px;
    line-height: 40px;
    font-size:14px;
    text-align: left;
    float: left;
    padding-left: 5px;
    /*background-color:green;*/
  }
  .fzctrl{
    width:calc(50% - 15px);
    height:40px;
    line-height: 40px;
    font-size:14px;
    text-align: left;
    float: left;
    padding-left: 5px;
    /*background-color:blue;*/
    position:relative;
  }

  .fzinput{
    height:26px;
    width:28px;
    position:absolute;
    right:0px;
    top:7px;
    /*border:1px solid #38adff;*/
    border-radius:6px;
    overflow: hidden;
  }
  .fz{
    width:26px;
    height:26px;
    position: absolute;
    top:0px;


  }
  .fzinputin{
    width:26px;
    height:26px;
    position:absolute;
    top:0px;
    left:0px;
    border:0;
    text-align: center;
  }
  .low{
    width:26px;
    height:26px;
    /*background-color:red;*/
    position:absolute;
    left:47px;
    line-height: 26px;
    text-align: center;
    border-left:1px solid #ccc;
    font-size: 18px;
  }
  .low:active{
    width:26px;
    height:26px;
    background-color:#e9e9e9;
    position:absolute;
    left:47px;
    line-height: 26px;
    text-align: center;
    border-left:1px solid #ccc;
    font-size: 18px;
  }
  .high{
    width:26px;
    height:26px;
    /*background-color:red;*/
    position:absolute;
    left:74px;
    line-height: 26px;
    text-align: center;
    border-left:1px solid #ccc;
    font-size: 18px;
  }
  .high:active{
    width:26px;
    height:26px;
    /*background-color:red;*/
    background-color:#e9e9e9;
    position:absolute;
    left:74px;
    line-height: 26px;
    text-align: center;
    border-left:1px solid #ccc;
    font-size: 18px;
  }
  .reasontext{
    width:100%;
    height:50px;
    border:0;
    /*background-color:red;*/
  }
  .buttons{
    width:100%;
    height:50px;
    position: relative;
    margin-bottom: 10px;
    text-align: center;
    line-height:40px;
    font-size:16px;
  }
  .goback{
    width:calc(40% );
    height:40px;
    background-color:#ccc;
    float: left;
    color:#000;
    position: absolute;
    left:5%;
    border-radius:5px;
  }
  .submit{
    width:calc(40%);
    height:40px;
    background-color:#39adff;
    float: left;
    color:#fff;
    position: absolute;
    left:55%;
    border-radius:5px;
  }
  .goback:active{
    width:calc(40% );
    height:40px;
    background-color:#bbb;
    float: left;
    color:#000;
    position: absolute;
    left:5%;
    border-radius:5px;
  }
  .submit:active{
    width:calc(40%);
    height:40px;
    background-color:#0082d1;
    float: left;
    color:#fff;
    position: absolute;
    left:55%;
    border-radius:5px;
  }
  .teachertips{
    width:100%;
    height:100px;
    line-height:100px;
    color:#999;
  }
  .selbjnput{
    border:0px;
    font-size:14px;
    line-height:45px;
  }
</style>

