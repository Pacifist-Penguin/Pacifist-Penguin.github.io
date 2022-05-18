<template>
  <div>
    <div>
      <nuxt-content :document="about[0]" />
    </div>
    <div>
      <img src="~assets/images/Derek.jpeg" />
    </div>
  </div>
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
