<template>
  <article>
    <!-- article name -->
    <component :is="dynamicComponent" :to="'/blog/' + articleContent.slug">
      {{ articleContent.title }}
    </component>
    <!-- should contain a short description -->
    <p>{{ articleContent.description }}</p>
    <img class="imagePreview" :alt="articleContent.img_alt" :src="articleContent.img">
    <!-- time, will be displayed relative in case there's no noscript on client -->
    <time>{{ time }}</time>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import PostPreview from '~/types/PostPreview'

export default Vue.extend({
  name: 'BlogPostPreview',
  props: {
    articleContent: {
      type: Object as PropType<PostPreview>,
      required: true,
      default: () => {
        return {
          description: 'Short description',
          createdAt: '2022-01-16T11:59:20.452Z',
          extension: '.md',
          img: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Rss_Shiny_Icon.svg',
          long: true,
          path: '/articles/example',
          slug: 'example',
          title: 'title'
        }
      }
    }
  },
  data () {
    return {
      time: this.articleContent.createdAt as string | Date
    }
  },
  computed: {
    dynamicComponent (): 'nuxt-link' | 'h1' {
      return this.articleContent.long ? 'nuxt-link' : 'h1'
    }
  },
  mounted () {
    this.localizeTime()
  },
  methods: {
    localizeTime () {
      this.time = new Date(this.articleContent.createdAt)
    }
  }
})
</script>

<style scoped>
a {
  font-size: 1.5rem;
}
.imagePreview{
  height: min(35vh, 25rem);
  max-width: 90%;
}
time {
  display: block;
}
article {
  padding-bottom: 5vmin;
}
</style>
