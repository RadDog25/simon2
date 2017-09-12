<script>
import Quarter from './Quarter'
import Center from './Center'

export default {
  name: 'shell',
  components: {
    Quarter,
    Center
  }
}
</script>

<template>
  <div class="shell clearfix layout-layer-container">
      <quarter></quarter>
      <quarter></quarter>
      <quarter></quarter>
      <quarter></quarter>
      <center></center>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.shell {
  max-width: 600px;
  margin: 0 auto;
}

</style>
