<template>
  <div class="wode">
    <loadingview v-show="isloadingshow" class="loading"></loadingview>
    <div class="selfinfo">
      <div class="touxiang"></div>
      <div class="infolist">
        <ul>
          <li v-for="item in infoitems">
            <div class="infoline">
              <span class="key">{{ item.key }}:</span><span class="value">{{ item.value }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <studentinfo v-if="isstudentinfoshow"  :selfinfo="infoitems" class="studentinfo"></studentinfo>
      <teacherinfo v-else></teacherinfo>
      <!--<el-button @click="loginout">注销账号</el-button>-->
    </div>



  </div>
</template>

<script>
import loading from '@/components/loading'
import teacherinfo from '@/components/wode/teacherinfo'
import studentinfo from '@/components/wode/studentinfo'

export default {
  name: 'wode',
  data () {
    return {
      ischangepwdshow: true,
      infoitems: [
        {key: '姓名', value: '张三'},
        {key: '工号', value: '20170101002'}
      ],
      isloadingshow: false,
      isstudentinfoshow: true
    }
  },
  created: function () {
    this.isloadingshow = true
    var url = 'http://www.easy-mock.com/mock/59a92b9fe0dc66334198ddf9/example/getselfinfo'
    // http://www.easy-mock.com/mock/59a92b9fe0dc66334198ddf9/example/getselfinfo
    this.$http.post(url, {emulateJSoN: true}).then(function (data) {
      console.log(data.body.data)
      var selinfo = data.body.data.selfinfos
      this.infoitems = selinfo
      this.isloadingshow = false
      console.log(selinfo)
    }, function (data) {
      alert(data)
    }).catch(function (data) {
      alert(data)
    })
  },
  mounted: function () {
    console.log('zy')
    this.$emit('mountedcomplete')
  },
  methods: {
    loginout: function () {
      window.localStorage.setItem('loginsuccess', 'false')
      location.reload(true)
    },
    showchangepwd: function () {
      this.ischangepwdviewshow = true
    },
    hidechangepwd: function () {
      this.ischangepwdviewshow = false
    }
  },
  components: {
    loadingview: loading,
    studentinfo: studentinfo,
    teacherinfo: teacherinfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  .selfinfo{
    width:100%;
    height:90px;
    background-color:#38adff;
    position:absolute;
    top:0px;
    z-index:1;
  }
  .touxiang{
    width:64px;
    height:64px;
    position: absolute;
    top:10px;
    left:20px;
    background-color:#fff;
    z-index:3;
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
  /*.content{*/
    /*width:100%;*/
    /*background-color:red;*/
  /*}*/
  .content{
    z-index:999;
  }
  .studentinfo{
    width:100%;
    height:100%;
    position:fixed;
    z-index:999;
  }
</style>
