<template>
  <img :src="imageFile" :height="imageHeight" />
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from 'vue'
import { AppSettings } from '~/settings/settings'

export default Vue.extend({
  data(): any {
    return {
      imageHeight: AppSettings.fontHeight,
    }
  },
  props: {
    n: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    imageFile(): String {
      return `/img/${this.n}.png`
    },
  },
})
</script>
