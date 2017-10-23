<template>
  <div class="xiaoxi">
   xiaoxilist
  </div>
</template>

<script>
  export default {
    name: 'xiaoxi',
    mounted: function () {
      console.log('zy')
      this.$emit('mountedcomplete')
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
