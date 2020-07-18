<template>
  <div class="score" :style="styleObject">
    <ScoreNum v-for="n in scoreArray" :key="n" :n="n" />
  </div>
</template>

<style scoped>
.score {
  margin: 0 auto;
  overflow: hidden;
  text-align: right;
  background-color: #24c0bb;
}
</style>

<script lang="ts">
import Vue from 'vue'
import { AppSettings } from '../settings/settings'
export default Vue.extend({
  data(): any {
    return {
      styleObject: {
        top: AppSettings.puyoImgHeight * AppSettings.stageRows + 'px',
        width: AppSettings.puyoImgWidth * AppSettings.stageCols + 'px',
        height: AppSettings.fontHeight + 'px',
      },
    }
  },
  props: {
    score: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    scoreArray(): number[] {
      let score = this.score
      let arr = []
      do {
        arr.unshift(score % 10)
        score = Math.floor(score / 10)
      } while (score > 0)
      return arr
    },
  },
})
</script>
