<template>
  <div class="credit-container">
    <h2>
      {{ creditInfo.name }}
    </h2>
    <p>{{ creditInfo.descripton }}</p>
    <ul>
      <li v-for="contact in creditInfo.sources" :key="contact" class="vertical-list">
        <a :href="contact.href">
          {{ contact.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import СreditInfo from '@/types/CredtInfo'

export default Vue.extend({
  name: 'CreditEl',
  props: {
    creditInfo: {
      type: Object as PropType<СreditInfo>,
      required: true
    }
  }
})
</script>

<style scoped>
.vertical-list {
  display: block
}

.credit-container {
  padding-left: 2rem;
  padding-right: 2rem;
}

ul {
  padding-left: 2rem;
  padding-right: 2rem;

}

@media (max-width: 600px) {
  div {
    margin: 0 auto;
    width: 480px
  }
}

@media (orientation: portrait) {
  div {
    margin: 0 auto;
    width: 100%;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
}
</style>
