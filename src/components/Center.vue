<script>
export default {
  name: 'center',
  props: [
    'somethingIsActive'
  ],
  data () {
    return {}
  }
}
</script>

<template>
  <div :class="{ 'active': somethingIsActive }"
  class="center layout-layer absolute-center">
    <div class="interface layout-layer-container">

      <h1 class="top"></h1>

      <div class="middle"></div>

      <div class="bottom"></div>

    </div>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>
