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
      title: this.article.title,
      meta: [
        {
          hid: this.article.title,
          name: this.article.title,
          content: this.article.description
        }
      ]
    }
  }
})
</script>
