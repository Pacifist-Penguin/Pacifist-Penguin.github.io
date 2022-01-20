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

.nuxt-content h1 {
  font-size: 2rem
}

.nuxt-content blockquote {
  margin-left: 0;
  margin-right: 0;
  padding-left: 1rem;
  background-color: var(--background-dark);
  border-radius: 0.5rem;
}
</style>
