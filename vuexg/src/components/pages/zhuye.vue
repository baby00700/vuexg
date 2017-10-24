<template>
  <div class="login">
    <div class="header">
      <lunboview></lunboview>
    </div>
  </div>
</template>

<script>
import lunbo from '@/components/lunbo'
export default {
  name: 'zhuye',
  mounted: function () {
    console.log('zy')
    this.$emit('mountedcomplete')
  },
  methods: {
  },
  components: {
    lunboview: lunbo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
