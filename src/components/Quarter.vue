<script>
export default {
  name: 'quarter',
  data () {
    return {
      isDark: false
    }
  },
  methods: {
    darken () {
      if (!this.isDark) {
        this.isDark = true
        setTimeout(() => {
          this.isDark = false
        }, 400)
      }
    }
  }
}
</script>

<template>
  <div class="quarter layout-layer-container"
  @click="darken">
    <div  v-bind:class="{ 'dark-layer': isDark }" class="layout-layer clear-layer"></div>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>
