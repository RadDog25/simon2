<script>
import Quarter from './Quarter'

export default {
  name: 'shell',
  components: {
    Quarter
  }
}
</script>

<template>
  <div class="shell">
      <quarter></quarter>
      <quarter></quarter>
      <quarter></quarter>
      <quarter></quarter>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.shell {
  width: 100px;
  height: 100px;
  background: pink;
}

</style>
