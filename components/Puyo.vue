<template>
  <img clas="puyo" :src="puyoImage" :width="imgWidth" :height="imgHeight">
</template>

<style scoped>
  .puyo {
    position: absolute;
  }
</style>

<script lang="ts">
import Vue from 'vue'
import {AppSettings} from '~/settings/settings';

export type PuyoSizeType = {
  height: number
  width: number
}

export default Vue.extend({
  data(): any {
    return {
      imgWidth: AppSettings.puyoImgWidth,
      imgHeight: AppSettings.puyoImgHeight
    }
  },
  props: {
    puyoType: {
      type: Number,
      default: 1
    }
  },
  computed: {
    puyoImage(): String {
      return `/img/puyo_${this.puyoType}.png`;
    },
  }
})
</script>
