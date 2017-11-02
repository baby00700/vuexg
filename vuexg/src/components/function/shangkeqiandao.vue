<template>
  <div class="shangkeqiandao">
    <div class="topinfo">
      <div class="classinfo">
        <div class="bjname"><div class="bj">班级:</div> <div class="bjmc"><nobr>16高职英语（20）班</nobr></div></div>
        <div class="count"><div class="zrs">总人数</div> <div class="bhzrs"><span style="color:#4db3ff">55</span>人</div></div>
      </div>
      <div class="lessoninfo">
        <div class="seltime">
          <div class="seltimelabel"><nobr>请选择日期:</nobr></div>
          <input type="button" class="seltimeinput" v-model="classtime" icon="el-icon-search" @click="openPicker">
          <i class=" el-icon-arrow-down"></i>
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
              <div class="low" @click="fzminus($index)">-</div>
              <div class="high" @click="fzplus($index)">+</div>
            </div>
          </div>
        </div>
        <div class="cardbot" v-show="item.iscardbotshow">
          <input type="text" v-model="item.reason" class="reasontext" @click="stopevent($index)" placeholder="请输入扣分或加分原因（限50字以内）" maxlength="50">
        </div>
      </div>
    </div>
    <div class="buttons">
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
  </div>
</template>

<script>
  import Vue from 'vue'
  import { DatetimePicker, Popup, Picker } from 'mint-ui'
  Vue.component(Popup.name, Popup)
  Vue.component(Picker.name, Picker)
  Vue.component(DatetimePicker.name, DatetimePicker)

  export default {
    name: 'shangkeqiandao',
    data () {
      return {
        classtime: '',
        jcinfo: '请选择课时',
        kcmc: '',
        actualnum: '', // 实际人数
        attendancenum: '',
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
        pickerkeshi: '',
        instudentslist: [
          {xm: '张三', xh: '111111111223', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张四', xh: '20177776', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张六', xh: '20188886', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张三', xh: '111111111223', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张四', xh: '20177776', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张三', xh: '111111111223', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张四', xh: '20177776', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张三', xh: '111111111223', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张四', xh: '20177776', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张三', xh: '111111111223', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张四', xh: '20177776', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张三', xh: '111111111223', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张四', xh: '20177776', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张三', xh: '111111111223', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张四', xh: '20177776', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张三', xh: '111111111223', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张四', xh: '20177776', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张三', xh: '111111111223', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张四', xh: '20177776', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张三', xh: '111111111223', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''},
          {xm: '张四', xh: '20177776', ischecked: true, color0: 'color:#38adff', color1: 'color:#999', iscardbotshow: false, fz: 0.5, reason: ''}

        ],
        stauts: '',
        score: '',
        remark: '',
        outstudentslist: [],
        classatend: [],
        classatendDetail: []
      }
    },
    created: function () {
      this.keshi = '请选择课时'
    },
    mounted: function () {
    },
    methods: {
      onValuesChange (picker, values) {
        this.pickerkeshi = values[0]
      },
      openPicker () {
        this.$refs.picker0.open()
      },
      showpop: function () {
        this.popupVisible = true
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
        }
      },
      goback: function () {
        window.history.back()
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
    float:left;
  }
  .bj{
    width:40px;
    height:45px;
    float: left;
    text-align: left;
    padding-left: 20px;
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
    width:101px;
    position:absolute;
    right:0px;
    top:7px;
    border:1px solid #38adff;
    border-radius:6px;
    overflow: hidden;
  }
  .fz{
    width:46px;
    height:26px;
    position: absolute;
    top:0px;

  }
  .fzinputin{
    width:46px;
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
    z-index:99999;
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
    z-index:99999;
    position: absolute;
    left:55%;
    border-radius:5px;
  }
</style>

