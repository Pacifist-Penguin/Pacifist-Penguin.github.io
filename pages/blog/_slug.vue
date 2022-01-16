<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData ({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  }
})
</script>

<style>
.nuxt-content img{
  display: block;
  max-width: 65vmin;
  margin: auto
}
</style>
