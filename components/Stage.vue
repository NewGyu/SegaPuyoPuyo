<template>
  <div class="stage" :style="styleObject">
    <Zenkeshi />
    <Batankyu />
    <Puyo :puyo="puyo" />
  </div>
</template>

<style scoped>
.stage {
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  background-image: url(/img/puyo_1.png);
  background-color: rgb(255, 255, 255, 0.5);
  background-blend-mode: lighten;
}
</style>

<script lang="ts">
import Vue from 'vue'
import { AppSettings } from '~/settings/settings'
import { STAGE } from '@/models/Stage'
import { FallingPuyo, PuyoColor } from '../models/Puyo'
import { Puyobserver } from '../models/PuyoEvent'
export default Vue.extend({
  data(): any {
    return {
      styleObject: {
        width: AppSettings.puyoImgWidth * AppSettings.stageCols + 'px',
        height: AppSettings.puyoImgHeight * AppSettings.stageRows + 'px',
      },
      puyo: new FallingPuyo(
        PuyoColor.Red,
        { x: 2, y: 0 },
        new Puyobserver().emit
      ),
    }
  },
  mounted() {
    STAGE.putNewPuyo()
  },
})
</script>
