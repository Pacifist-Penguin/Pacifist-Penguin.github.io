<template>
  <div>
    <canvas ref="canvas" class="canvas" width="1024" height="512" />
    <div class="main_content">
      <nav-header />
      <main>
        <section>
          <Nuxt />
        </section>
      </main>
      <footer>
        <hr>
        This site is under
        <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">GNU Affero General Public License</a>.
        So here is the <a href="https://github.com/NewPirateOfUASeas/portfolio/tree/master">source code</a>.
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import gol from '@/includes/gol.js'

export default Vue.extend({
  name: 'DefaultLayout',
  mounted () {
    gol(this.$refs.canvas as HTMLCanvasElement)
  }
})
</script>

<style>

:root {
  --background: #2D2B55AA;
  --background-dark: #1E1E3F;
  --foreground: #bdb2fc;
  --anchors: #4D21FC;
  --visited-anchor: #B362FF;
  --contrast: #FAD000;
  --contrast-lite: #FFEE80;
  --contrast-lite-2: #FAEFA5;
  --definitions: #FB94FF;
  --inversion-for-dark-icons: invert(73%) sepia(27%) saturate(6659%) hue-rotate(359deg) brightness(106%) contrast(105%);
}
h1, h2, h3 {
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
  background-color: var(--background) !important;
  /* have to use !important since i put inline style in the /app.html */
}

html {
  font-size: 16px
}

.canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 0;
}

.main_content {
  width: 100vw;
  min-height: 100vh;
  background-color: var(--background);
  position: absolute;
  z-index: 1;
  top: 0
}

section, footer {
  padding-left: 20vmin;
  padding-right: 20vmin;
}

@media (prefers-reduced-motion: reduce ), ( prefers-contrast: more ) {
  .canvas{
    display: none
  }
}

@media (prefers-contrast: more) {
  :root {
    --background: #2D2B55
  }
}

@media screen and (max-width: 768px) {
  section, footer {
    padding-left: 0px;
    padding-right: 0px;
  }
  section, footer {
    font-size: 1.3rem;
  }
}

</style>
