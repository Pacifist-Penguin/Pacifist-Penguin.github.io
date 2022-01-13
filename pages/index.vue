<template>
  <canvas ref="canvas" width="1024" height="512" />
</template>

<script lang="ts">
import Vue from 'vue'
import gol from '~/includes/gol/gol.js'

export default Vue.extend({
  name: 'IndexPage',
  mounted () {
    gol(this.$refs.canvas as HTMLCanvasElement)
  }
})
</script>
