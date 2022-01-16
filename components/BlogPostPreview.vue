<template>
  <article>
    <!-- article name -->
    <nuxt-link :to="'/blog/' + articleContent.slug">
      {{ articleContent.title }}
    </nuxt-link>
    <!-- should contain a short description -->
    <p>{{ articleContent.description }}</p>
    <img class="imagePreview" :src="articleContent.img">
    <!-- time, will be displayed relative in case there's no noscript on client -->
    <time datetime="2022-01-14 19:00">{{ time }}</time>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import PostPreview from '~/types/PostPreview'

export default Vue.extend({
  name: 'BlogPostPreview',
  props: {
    articleContent: {
      type: Object as PropType<PostPreview>
    }
  },
  data () {
    return {
      time: '6/29/2011 4:52:48 PM UTC' as string | Date,
      onServer: true
    }
  },
  mounted () {
    this.localizeTime()
    this.onServer = false
  },
  methods: {
    localizeTime () {
      this.time = new Date(this.time)
    }
  }
})
</script>

<style scoped>
a {
  font-size: 1.5rem;
}
.imagePreview{
  max-height: 45vh
}
time {
  display: block;
}
article {
  padding-bottom: 5vmin;
}
</style>
