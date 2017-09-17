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
      isPowerOn: false,
      isGameStarted: false,
      isStrictMode: false,
      level: 1,
      quartersActiveState: {
        green: false,
        red: false,
        yellow: false,
        blue: false
      }
    }
  },
  methods: {
    resetGame () {
      this.isGameStarted = false
      this.level = 1
      this.quartersActiveState = {
        green: false,
        red: false,
        yellow: false,
        blue: false
      }
    },
    startGame () {
      this.resetGame()
      this.isGameStarted = true
    },
    setAsActive (color) {
      sounds[color].play()
      this.quartersActiveState[color] = true
      setTimeout(() => {
        this.quartersActiveState[color] = false
      }, 400)
    },
    toggleStrictMode () {
      if (this.isPowerOn) {
        this.isStrictMode = !this.isStrictMode
      }
    },
    togglePower () {
      this.isPowerOn = !this.isPowerOn
      this.resetGame()
      this.isStrictMode = false
    }
  }
}
</script>

<template>
  <div id="app">
    <shell @startGame='startGame'
    @togglePower="togglePower"
    @toggleStrictMode="toggleStrictMode"
    @setAsActive="setAsActive"
    :level="level"
    :isGameStarted="isGameStarted"
    :isPowerOn="isPowerOn"
    :quartersActiveState="quartersActiveState"
    :isStrictMode="isStrictMode">
    </shell>
  </div>
</template>

<style src="./style.scss" lang="scss"></style>

<style>
#app {

}
</style>
