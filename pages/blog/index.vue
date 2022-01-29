<template>
  <div>
    <a href="blog/rss.xml"><img class="iconSize" src="@/static/rss-icon.svg" alt="rss icon"></a>
    <blog-post-preview v-for="article in articles" :key="article.slog" :article-content="article" />
  </div>
</template>

<script lang="ts">
import { contentFunc } from '@nuxt/content/types/content'

export default {
  name: 'IndexBlog',
  // i put it in here only to fix TS compiler errors
  async asyncData ({ $content } : { $content: contentFunc }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'img_alt', 'slug', 'long', 'createdAt'])
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
  max-width: 2rem;
  filter: var(--inversion-for-dark-icons)
}
</style>
