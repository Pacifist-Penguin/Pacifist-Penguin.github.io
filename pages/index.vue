<template>
  <nuxt-content :document="about[0]" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  async asyncData ({ $content }) {
    const about = await $content('about').fetch()

    return { about }
  }
})
</script>
