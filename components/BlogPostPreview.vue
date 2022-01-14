<template>
  <article>
    <h2>The state of the modern web</h2>
    <p> I don't like it</p>
    <time datetime="2022-01-14 19:00">{{ time }}</time>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import moment from 'moment'
import PostPreview from '~/types/ArticleContent'
export default Vue.extend({
  name: 'BlogPostPreview',
  props: {
    articleContent: {
      type: Object as PropType<PostPreview>
    }
  },
  data () {
    return {
      time: 'NuxtGenerated'
    }
  },
  mounted () {
    this.localizeTime()
  },
  methods: {
    localizeTime () {
      this.time = moment().format()
    }
  }
})
</script>
