<script>

export default {
  name: 'center',
  props: [
    'isPowerOn',
    'somethingIsActive',
    'isStrictMode',
    'displayString'
  ],
  methods: {
    toggleStrictMode () {
      this.$emit('toggleStrictMode')
    },
    togglePower () {
      this.$emit('togglePower')
    },
    startGame () {
      this.$emit('startGame')
    }
  }
}
</script>

<template>
  <div :class="{ 'active': somethingIsActive }"
  class="center layout-layer absolute-center">
    <div class="interface layout-layer-container">

      <h1 class="top">
        SIMON
      </h1>

      <div class="middle absolute-center">

        <div class="display">{{ displayString }}</div>

        <div class="start-button-container">
          <div class="button-container">
              <div @click="startGame"
              class="button-base">
                <div class="button"></div>
              </div>
            </div>
            <div class="label">START</div>
        </div>

        <div class="strict-button-container">
            <div :class="{ 'active': isStrictMode }" class="light">
            </div>
            <div class="button-container">
              <div @click="toggleStrictMode"
              class="button-base">
                <div class="button"></div>
              </div>
            </div>
            <div class="label">STRICT</div>
        </div>

      </div><!-- end middle -->


      <div class="bottom">

        <div class="label">OFF</div>

        <div @click="togglePower"
        class="power-container">
          <div :class="{ 'active': isPowerOn }"
          class="power"></div>
        </div>

        <div class="label">ON</div>

      </div><!-- end bottom -->

    </div><!-- close interface -->
  </div><!-- close center -->
</template>
