<script>
import Shell from './components/Shell'

const sounds = {
  green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
}

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
      sounds[color].play()
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
    :quartersActiveState="quartersActiveState">
    </shell>
  </div>
</template>

<style src="./style.scss" lang="scss"></style>

<style>
#app {

}
</style>
