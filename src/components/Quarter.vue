<script>
export default {
  name: 'quarter',
  props: [
    'color',
    'isActive'
  ],
  methods: {
    setAsActive () {
      this.$emit('setAsActive', this.color)
    }
  }
}
</script>

<template>
  <div :class="{ 'active': isActive }" class="quarter layout-layer-container"
  @click="setAsActive">
    <div class="radius"></div>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>
