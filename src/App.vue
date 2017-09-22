<script>
import Quarter from './components/Quarter'
import Center from './components/Center'
import { doThingsInSequence, clearTimeouts, getRandomStep } from './helpers.js'

window.pendingTimeouts = []

const sounds = {
  green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
}

function makeErrorSound () {
  doThingsInSequence([
    { func: () => { sounds.red.play() }, delay: 0 },
    { func: () => { sounds.yellow.play() }, delay: 200 }
  ])
}

export default {
  name: 'app',
  components: {
    Quarter,
    Center
  },
  data () {
    return {
      isPowerOn: false,
      isGameStarted: false,
      isStrictMode: false,
      sequence: [ getRandomStep() ],
      isPlayersTurn: false,
      stepPlayerIsOn: 0,
      displayIsOverridden: false,
      displayOverrideString: '',
      quartersActiveState: {
        green: false,
        red: false,
        yellow: false,
        blue: false
      }
    }
  },
  methods: {
    getFlashingDisplayThings (display) {
      return [
        { func: () => { this.displayIsOverridden = true }, delay: 0 },
        { func: () => { this.displayOverrideString = '' }, delay: 200 },
        { func: () => { this.displayOverrideString = display }, delay: 200 },
        { func: () => { this.displayOverrideString = '' }, delay: 200 },
        { func: () => { this.displayOverrideString = display }, delay: 200 },
        { func: () => { this.displayOverrideString = '' }, delay: 200 },
        { func: () => { this.displayOverrideString = display }, delay: 200 },
        { func: () => { this.displayIsOverridden = false }, delay: 400 },
        { func: () => { this.displayOverrideString = '' }, delay: 400 }
      ]
    },
    resetGame () {
      clearTimeouts()
      this.isGameStarted = false
      this.sequence = [ getRandomStep() ]
      this.isPlayersTurn = false
      this.stepPlayerIsOn = 0
      this.displayIsOverridden = false
      this.displayOverrideString = ''
      this.quartersActiveState = {
        green: false,
        red: false,
        yellow: false,
        blue: false
      }
    },
    makeQuarterActive (color, shouldPlaySound = true) {
      if (this.isGameStarted) {
        if (shouldPlaySound) {
          sounds[color].play()
        }
        this.quartersActiveState[color] = true
        doThingsInSequence([
          { func: () => { this.quartersActiveState[color] = false }, delay: 400 }
        ])
      }
    },
    showTheSequence () {
      const stepsToDo = this.sequence.map(color => {
        return { func: () => { this.makeQuarterActive(color) }, delay: 700 }
      })

      const endPlayersTurn = { func: () => { this.isPlayersTurn = false }, delay: 0 }
      const beginPlayersTurn = { func: () => { this.isPlayersTurn = true }, delay: 1000 }

      doThingsInSequence([
        endPlayersTurn,
        ...stepsToDo,
        beginPlayersTurn
      ])
    },
    startGame () {
      if (this.isPowerOn) {
        const resetTheGame = { func: this.resetGame, delay: 0 }
        const startTheGame = { func: () => { this.isGameStarted = true }, delay: 0 }
        const showTheSequence = { func: this.showTheSequence, delay: 0 }
        doThingsInSequence([
          resetTheGame,
          ...this.getFlashingDisplayThings('--'),
          startTheGame,
          showTheSequence
        ])
      }
    },
    handleQuarterClick (color) {
      if (this.isPlayersTurn) {
        const stepIsCorrect = this.sequence[this.stepPlayerIsOn] === color
        const stepIsTheLastOne = this.stepPlayerIsOn === this.sequence.length - 1
        if (stepIsCorrect) {
          this.makeQuarterActive(color)
          if (stepIsTheLastOne) {
            this.sequence = [...this.sequence, getRandomStep()]
            this.stepPlayerIsOn = 0
            doThingsInSequence([
              { func: () => { this.showTheSequence() }, delay: 1000 }
            ])
          } else {
            this.stepPlayerIsOn += 1
          }
        } else {
          this.makeQuarterActive(color, false)
          makeErrorSound()
          this.stepPlayerIsOn = 0
          this.isPlayersTurn = false
          const showTheSequenceAgain = { func: () => { this.showTheSequence() }, delay: 0 }
          const restartTheGame = { func: () => { this.startGame() }, delay: 0 }
          const thingToDoAfterFlash = this.isStrictMode
          ? restartTheGame : showTheSequenceAgain
          doThingsInSequence([
            ...this.getFlashingDisplayThings('!!!'),
            thingToDoAfterFlash
          ])
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
    somethingIsActive () {
      return Object.values(this.quartersActiveState)
            .some(isActive => isActive)
    },
    level () {
      const level = String(this.sequence.length)
      return level.padStart(2, '0')
    },
    displayString () {
      if (this.isPowerOn) {
        if (this.displayIsOverridden) {
          return this.displayOverrideString
        }
        if (this.isGameStarted) {
          if (this.isPlayersTurn) {
            return this.level + ':'
          }
          return this.level
        }
        return '--'
      }
      return ''
    }
  }
}
</script>

<template>
  <div class="container">
    <div id="app" class="clearfix layout-layer-container">
      <quarter color="green"
      :isActive="quartersActiveState.green"
      @handleQuarterClick="handleQuarterClick">
      </quarter>

      <quarter color="red"
      :isActive="quartersActiveState.red"
      @handleQuarterClick="handleQuarterClick">
      </quarter>

      <quarter color="yellow"
      :isActive="quartersActiveState.yellow"
      @handleQuarterClick="handleQuarterClick">
      </quarter>

      <quarter color="blue"
      :isActive="quartersActiveState.blue"
      @handleQuarterClick="handleQuarterClick">
      </quarter>

      <center @startGame="startGame"
      @toggleStrictMode="toggleStrictMode"
      @togglePower="togglePower"
      :isGameStarted="isGameStarted"
      :displayString="displayString"
      :somethingIsActive="somethingIsActive"
      :isPowerOn="isPowerOn"
      :isStrictMode="isStrictMode">
      </center>
    </div><!-- end app -->

    <div class="about">

      <img class="logo"
      src="./assets/github.svg">
      
      <a href="https://github.com/RadDog25/simon2"
      class="link">
        https://github.com/RadDog25/simon2
      </a>

    </div><!-- end about -->
  </div><!-- end container -->
</template>

<style src="./style.scss" lang="scss"></style>