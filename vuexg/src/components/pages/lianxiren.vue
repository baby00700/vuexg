<template>
  <div class="lianxiren">
    <div class="lxrwrap">
    <div class="lxrcardwrap" v-for="item in lxrlist">
      <div class="cardtop">
        <div class="cardleft">
          <div class="cardtxl"></div>
          <div class="xm"><nobr>{{item.xm}}</nobr></div>
        </div>
        <div class="cardright">
          <div class="cardtxr"></div>
          <div class="xb">{{item.xb}}</div>
        </div>
      </div>
      <div class="cardbottom">
        <div class="phoneicon"></div>
        <div class="phone"><a :href='item.lxdh'></a><nobr>{{item.lxdh}}</nobr></div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import bus from '@/components/bus.js'   // 事件总线
  export default {
    name: 'lianxiren',
    data () {
      return {
        lxrlist: [
          {xm: '...', xb: '...', lxdh: '...'},
          {xm: '...', xb: '...', lxdh: '...'},
          {xm: '...', xb: '...', lxdh: '...'},
          {xm: '...', xb: '...', lxdh: '...'},
          {xm: '...', xb: '...', lxdh: '...'}
        ],
        loading2: true
      }
    },
    created: function () {
      window.localStorage.setItem('step', 'self')
      var islogin = window.localStorage.getItem('isloginsuccess')
      var that = this
      bus.$on('loginsuccessfromroot', function () {  // 从app触发 从login触发
        that.getlxrlist()
      })
      if (islogin === 'true') {
        that.getlxrlist()
      }
    },
    beforeDestroy: function () {
      let that = this
      bus.$off('loginsuccessfromroot', function () {
        that.newslist.splice(0, that.newslist.length)
        that.getnewslistdata()
      })
    },
    mounted: function () {
    },
    methods: {
      getlxrlist: function () {
        console.log('ll')
        var that = this
        var url = '/sms-wx/smsUserController.do?getContacts'
        axios.post(url).then(function (data) {
          console.log(data)
          if (data.data.obj !== 'needlogin') {
            var lxrlist = JSON.parse(data.data.msg)
            console.log(lxrlist)
            for (var i = 0; i < lxrlist.length; i++) {
              var xb = lxrlist[i].xb
              if (xb === '1') {
                xb = '男'
              } else if (xb === '2') {
                xb = '女'
              }
              var phoneisopen = lxrlist[i].phoneisopen
              if (phoneisopen === '0') {
                lxrlist[i].lxdh = '未公开'
              }
              lxrlist[i].xb = xb
            }
            that.lxrlist = lxrlist
            that.loading2 = false
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

  .lianxiren{
    width: 100%;
    padding-bottom:60px;
    overflow: scroll;
  }
  .lxrwrap{
    height:100%;
    margin-bottom:100px;
    background-color:red;
  }
.lxrcardwrap{
  height:80px;
  width:44%;
  background-color:#fff;
  margin-top:10px;
  margin-bottom:10px;
  margin-left:4%;
  float: left;
  border-top:5px solid #38adff;
  border-radius: 4px;
}
  .cardtop{
    width:90%;
    height:40px;
    border-bottom:1px solid #eee;
    margin-left:5%;
    line-height: 20px;
    text-align: left;
  }
  .cardbottom{
    width:90%;
    height:40px;
    border-bottom:1px solid #eee;
    margin-left:5%;
    line-height: 40px;
    text-align: left;
    /*background-color: #1c8de0;*/
  }
  .cardleft{
    width:65%;
    height:40px;
    /*background-color:red;*/
    float: left;
  }
  .cardtxl{
    width:16px;
    height:16px;
    /*background-color: gray;*/
    float: left;
    margin-top:11px;
    left:5px;
    background-image: url(../../../static/img/tx.png);
    background-size: 100% 100%;
  }
  .xm{
    width:calc(100% - 30px);
    height:20px;
    float: left;
    margin-left:5px;
    margin-top:10px;
    color:#38adff;
    font-size:16px;
    overflow:hidden;text-overflow:ellipsis;
  }
  .cardright{
    width:30%;
    height:40px;
    /*background-color:blue;*/
    float: left;
    margin-left:5px;
  }
  .cardtxr{
    width:16px;
    height:16px;
    /*background-color: gray;*/
    float: left;
    margin-top:11px;
    left:10px;
    background-image: url(../../../static/img/xb.png);
    background-size: 100% 100%;
  }
  .xb{
    width:calc(100% - 40px);
    height:20px;
    float: left;
    margin-left:5px;
    color:#999;
    margin-top:10px;
  }
  .phoneicon{
    width:16px;
    height:16px;
    /*background-color: gray;*/
    float: left;
    margin-top:11px;
    left:5px;
    background-image: url(../../../static/img/phone.png);
    background-size: 100% 100%;
  }
  .phone{
    color:#999;
    font-size: 14px;
    overflow:hidden;text-overflow:ellipsis;
  }
</style>
