<template>

  <div class="qingjia" style="background-color:#ecedf1">
    <div class="qingjiatype" @click="showpop()">
      请假类型{{qjtype}}
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom" style="width:100%">
      <mt-picker :slots="slots" @change="onValuesChange"   style="width:100%"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Popup, Picker} from 'mint-ui'
  Vue.component(Popup.name, Popup)
  Vue.component(Picker.name, Picker)
  export default {
    name: 'biyelixiao',
    data () {
      return {
        popupVisible: false,
        qjtype: '',
        slots: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      }
    },
    created: function () {
    },
    mounted: function () {
    },
    methods: {
      showpop: function () {
        this.popupVisible = true
      },
      onValuesChange (picker, values) {
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0])
        }
        console.log(values[0])
        this.qjtype = values[0]
      }
    },
    watch: {
    },
    components: {
    }
  }
</script>


<style scoped>
  .qingjia{
    width:100%;
    height:100%;
    z-index:10000;
  }
</style>
