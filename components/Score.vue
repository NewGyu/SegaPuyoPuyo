<template>
  <div class="score">
    <ul>
      <li v-for="n in scoreArray" :key="n">
        <ScoreNum :n="n" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.score {
  margin: 0 auto;
  overflow: hidden;
  text-align: right;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
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
