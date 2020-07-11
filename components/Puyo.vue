<template>
  <img clas="puyo" :src="puyoImage">
</template>

<style scoped>
  .puyo {
    position: absolute;
  }
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    puyoType: {
      type: Number,
      default: 1
    }
  },
  computed: {
    puyoImage(): String {
      return `/img/puyo_${this.puyoType}.png`;
    }
  }
})
</script>
