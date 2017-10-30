<template>
  <div class="lianxiren">
    <div class="lxrwrap">
    <div class="lxrcardwrap" v-for="item in lxrlist">
      <div class="cardtop">
        <div class="cardleft">
          <div class="cardtxl"></div>
          <div class="xm">{{item.name}}</div>
        </div>
        <div class="cardright">
          <div class="cardtxr"></div>
          <div class="xb">{{item.xb}}</div>
        </div>
      </div>
      <div class="cardbottom">
        <div class="phoneicon"></div>
        <div class="phone"><a :href='item.lxdh'></a>{{item.lxdh}}</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'lianxiren',
    data () {
      return {
        lxrlist: [
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '女', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '女', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '女', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'},
          {name: '张晓晨', xb: '女', lxdh: '18170834788'},
          {name: '张晓晨', xb: '男', lxdh: '18170834788'}
        ]
      }
    },
    mounted: function () {
      this.$emit('mountedcomplete')
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
    line-height: 40px;
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
    width:calc(100% - 40px);
    height:20px;
    float: left;
    margin-left:5px;
    color:#38adff;
  }
  .cardright{
    width:35%;
    height:40px;
    /*background-color:blue;*/
    float: left;
  }
  .cardtxr{
    width:16px;
    height:16px;
    /*background-color: gray;*/
    float: left;
    margin-top:11px;
    left:5px;
    background-image: url(../../../static/img/xb.png);
    background-size: 100% 100%;
  }
  .xb{
    width:calc(100% - 40px);
    height:20px;
    float: left;
    margin-left:5px;
    color:#999;
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
  }
</style>
