<script>
import Shell from './components/Shell'
import { doThingsInSequence, clearTimeouts, getRandomStep } from './helpers.js'

window.pendingTimeouts = []

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
      sequence: [ getRandomStep() ],
      isShowingSequence: false,
      isPlayersTurn: false,
      playersSequence: [],
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
      clearTimeouts()
      this.isGameStarted = false
      this.sequence = [ getRandomStep() ]
      this.isShowingSequence = false
      this.isPlayersTurn = false
      this.playersSequence = []
      this.quartersActiveState = {
        green: false,
        red: false,
        yellow: false,
        blue: false
      }
    },
    makeQuarterActive (color) {
      if (this.isGameStarted) {
        sounds[color].play()
        this.quartersActiveState[color] = true
        doThingsInSequence([{
          func: () => { this.quartersActiveState[color] = false }, delay: 400
        }])
      }
    },
    showTheSequence () {
      const stepsToDoInSequence = this.sequence.map(color => {
        return {
          func: () => { this.makeQuarterActive(color) }, delay: 700
        }
      })

      doThingsInSequence([{
        func: () => { this.isShowingSequence = true }, delay: 0
      }, ...stepsToDoInSequence, {
        func: () => { this.isShowingSequence = false }, delay: 1000
      }, {
        func: () => { this.isPlayersTurn = true }, delay: 0
      }])
    },
    startGame () {
      if (this.isPowerOn) {
        this.resetGame()
        this.isGameStarted = true
        this.showTheSequence()
      }
    },
    handleQuarterClick (color) {
      if (this.isPlayersTurn) {
        this.makeQuarterActive(color)
        this.playersSequence = [...this.playersSequence, color]
        const playersSequenceLength = this.playersSequence.length
        const sequenceIsCorrect = this.sequence.slice(0, playersSequenceLength)
          .every((color, index) => {
            return color === this.playersSequence[index]
          })
        if (sequenceIsCorrect) {
          console.log('correct')
        } else {
          console.log('incorrect')
        }
      }
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
  },
  computed: {
    level: function () {
      const level = String(this.sequence.length)
      return level.padStart(2, '0')
    }
  }
}
</script>

<template>
  <div id="app">
    <shell @startGame='startGame'
    @togglePower="togglePower"
    @toggleStrictMode="toggleStrictMode"
    @handleQuarterClick="handleQuarterClick"
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
