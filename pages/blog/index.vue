<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <a href="http://localhost:3000/rss"><img class="iconSize" src="@/static/rss-icon.svg" alt="rss icon"></a>
    <blog-post-preview v-for="article in articles" :key="article.slog" :article-content="article" />
  </div>
</template>

<script lang="ts">
export default {
  async asyncData ({ $content }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'long'])
      .sortBy('createdAt', 'desc')
      .fetch()
    return {
      articles
    }
  }
}
</script>

<style scoped>
.iconSize {
  max-height: 2rem;
  color: orange
}
</style>
