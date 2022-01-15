<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <credit-el v-for="credit in credits" :key="credit.descripton" :credit-info="credit" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreditProp from '~/types/CredtInfo'

export default Vue.extend({
  data () {
    return {
      credits: [
        {
          name: 'Ahmad Awais',
          descripton: 'For shades of purple colorscheme',
          sources: [
            {
              name: 'Personal site',
              href: 'https://ahmadawais.com/'
            },
            {
              name: 'Shades of Purple',
              href: 'https://github.com/ahmadawais/shades-of-purple-vscode'
            },
            {
              name: 'Github',
              href: 'https://github.com/ahmadawais'
            },
            {
              name: 'Twitter',
              href: 'https://twitter.com/MrAhmadAwais'
            }
          ]
        },
        {
          name: 'Chris Wellons',
          descripton: "For an amazing implementation of Conway's Game of Life with WebGL",
          sources: [
            {
              name: 'Personal site',
              href: 'https://nullprogram.com/'
            },
            {
              name: 'Game of Life',
              href: 'https://github.com/skeeto/webgl-game-of-life'
            },
            {
              name: 'Github',
              href: 'https://github.com/skeeto'
            }
          ]
        }
      ] as CreditProp[]
    }
  }
})
</script>
