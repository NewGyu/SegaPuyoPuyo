<template>
  <div>
    <Puyo :puyo="puyopuyo.centerPuyo" />
    <Puyo :puyo="puyopuyo.movablePuyo" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { FallingPuyoPuyo } from '../models/Puyo'
export default Vue.extend({
  props: {
    puyopuyo: {
      type: Object as PropType<FallingPuyoPuyo>,
      required: true,
    },
  },
})
</script>
