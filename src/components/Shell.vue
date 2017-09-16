<script>
import Quarter from './Quarter'
import Center from './Center'

export default {
  name: 'shell',
  props: [
    'quartersActiveState'
  ],
  computed: {
    somethingIsActive () {
      return Object.values(this.quartersActiveState)
            .some(isActive => isActive)
    }
  },
  methods: {
    setAsActive (color) {
      this.$emit('setAsActive', color)
    }
  },
  components: {
    Quarter,
    Center
  }
}
</script>

<template>
  <div class="shell clearfix layout-layer-container">

      <quarter color="green"
      :isActive="quartersActiveState.green"
      @setAsActive="setAsActive">
      </quarter>

      <quarter color="red"
      :isActive="quartersActiveState.red"
      @setAsActive="setAsActive">
      </quarter>

      <quarter color="yellow"
      :isActive="quartersActiveState.yellow"
      @setAsActive="setAsActive">
      </quarter>

      <quarter color="blue"
      :isActive="quartersActiveState.blue"
      @setAsActive="setAsActive">
      </quarter>


      <center :somethingIsActive="somethingIsActive"></center>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
