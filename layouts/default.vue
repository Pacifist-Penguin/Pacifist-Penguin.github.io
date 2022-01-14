<template>
  <div>
    <canvas ref="canvas" class="canvas" width="1024" height="512" />
    <div class="main_content">
      <nav-header />
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

:root {
  --background: #2D2B55;
  --background-dark: #1E1E3F;
  --foreground: #bdb2fc;
  --anchors: #4D21FC;
  --visited-anchor: #B362FF;
  --contrast: #FAD000;
  --contrast-lite: #FFEE80;
  --contrast-liite-2: #FAEFA5;
  --definitions: #FB94FF;
}
h1, h2 {
  color: var(--definitions);
}

a {
  color: var(--anchors);
}

* {
  color: var(--foreground);
  font-family: sans-serif;
}

a:visited {
  color: var(--visited-anchor);
}

body {
  margin: 0 0 0 0;
  background-color: var(--background);
}

html {
  font-size: 16px
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
  background-color: var(--background);
  position: fixed;
  z-index: 1;
  top: 0
}

@media (prefers-reduced-motion: reduce ), ( prefers-contrast: more ) {
  .canvas{
    display: none
  }
}
</style>
