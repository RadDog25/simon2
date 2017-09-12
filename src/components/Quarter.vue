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
  <div class="quarter layout-layer-container"
  @click="setAsActive">
    <div  v-bind:class="{ 'dark-layer': isActive }" class="layout-layer clear-layer"></div>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>
