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
        <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">GNU Affero General Public License</a>. So here is the
        <a href="https://github.com/NewPirateOfUASeas/portfolio/tree/master">source code</a>.
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
  --background: #2d2b55aa;
  --background-dark: #1e1e3f;
  --foreground: #bdb2fc;
  --anchors: #4d21fc;
  --visited-anchor: #b362ff;
  --contrast: #fad000;
  --contrast-lite: #ffee80;
  --contrast-lite-2: #faefa5;
  --definitions: #fb94ff;
  --inversion-for-dark-icons: invert(73%) sepia(27%) saturate(6659%)
    hue-rotate(359deg) brightness(106%) contrast(105%);
}

@media (prefers-color-scheme: light) {
  :root {
    --background: #fdf6e3;
    --background-dark: #eee8d5;
    --foreground: #657b83;
    --anchors: #268bd2;
    --visited-anchor: #6c71c4;
    --contrast: #586e75;
    --contrast-lite: #073642;
    --contrast-lite-2: #002b36;
    --definitions: #2aa198;
  }
}

h1,
h2,
h3 {
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
  font-size: 16px;
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
  top: 0;
}

section,
footer {
  padding-left: 20vmin;
  padding-right: 20vmin;
}

@media (prefers-reduced-motion: reduce), (prefers-contrast: more) {
  .canvas {
    display: none;
  }
}

@media (prefers-contrast: more) {
  :root {
    --background: #2d2b55;
  }
  .canvas {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  section,
  footer {
    padding-left: 0px;
    padding-right: 0px;
  }
  section,
  footer {
    font-size: 1.3rem;
  }
}
</style>
