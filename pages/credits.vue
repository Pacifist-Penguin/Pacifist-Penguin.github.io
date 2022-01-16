<template>
  <nuxt-content :document="credits[0]" />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData ({ $content, params }) {
    const credits = await $content('credits', params.slug).fetch()

    return { credits }
  }
})
</script>
