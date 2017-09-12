<script>
import Shell from './components/Shell'

export default {
  name: 'app',
  components: {
    Shell
  },
  data () {
    return {
      quartersActiveState: {
        green: false,
        red: false,
        yellow: false,
        blue: false
      }
    }
  },
  methods: {
    setAsActive (color) {
      this.quartersActiveState[color] = true
      setTimeout(() => {
        this.quartersActiveState[color] = false
      }, 400)
    }
  }
}
</script>

<template>
  <div id="app">
    <shell @setAsActive="setAsActive"
    :quartersActiveState="quartersActiveState" >
    </shell>
  </div>
</template>

<style src="./style.scss" lang="scss"></style>

<style>
#app {

}
</style>
