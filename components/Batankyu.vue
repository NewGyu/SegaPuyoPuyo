<template>
  <img class="batan" :class="classObject" src="/img/batankyu.png" :width="imageWidth" />
</template>

<style scoped>
.batan {
  position: absolute;
}
.hidden {
  display: none;
}
.shown {
  display: block;
}
</style>

<script lang="ts">
import Vue from 'vue'
import { AppSettings } from '~/settings/settings'
export default Vue.extend({
  data(): any {
    return {
      imageWidth: AppSettings.puyoImgWidth * 6,
    }
  },
  props: {
    shown: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classObject(): any {
      return {
        hidden: !this.shown,
        shown: this.shown,
      }
    },
  },
})
</script>
