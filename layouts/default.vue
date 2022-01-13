<template>
  <div>
    <canvas ref="canvas" class="canvas" width="1024" height="512" />
    <div class="main_content">
      <header>
        <nuxt-link to="/about">
          About Me
        </nuxt-link>
      </header>
      <main>
        <secton>
          <Nuxt />
        </secton>
      </main>
      <footer>
        Footer
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import gol from '@/includes/gol/gol.js'

export default Vue.extend({
  name: 'DefaultLayout',
  mounted () {
    gol(this.$refs.canvas as HTMLCanvasElement)
  }
})
</script>

<style>
body {
  margin: 0 0 0 0;
  background-color: black;
}

li {
  display: inline;
}

.canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 0;
}

.main_content {
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.4);
  position: fixed;
  z-index: 1;
  top: 0
}
</style>
