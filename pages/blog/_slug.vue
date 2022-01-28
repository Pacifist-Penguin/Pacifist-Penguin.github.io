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
  },
  head () {
    return {
      // FIXME: Fix types
      title: (this as any).article.title,
      meta: [
        {
          hid: (this as any).article.title,
          name: (this as any).article.title,
          content: (this as any).article.description
        }
      ]
    }
  }
})
</script>
