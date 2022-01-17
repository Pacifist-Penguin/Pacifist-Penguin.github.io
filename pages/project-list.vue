<template>
  <nuxt-content :document="projectList[0]" />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData ({ $content }) {
    const projectList = await $content('project-list').fetch()

    return { projectList }
  }
})
</script>
