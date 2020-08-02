<template>
  <div class="stage" :style="styleObject">
    <Zenkeshi />
    <Batankyu />
    <FallingPuyoPuyo v-if="falling" :puyopuyo="falling" />

    <!--
    <Puyo v-for="(p, idx) in puyoList" :key="idx" :puyo="p" />
    -->
    <p>{{ message }}</p>
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
import { Game } from '~/observable/Game'

export default Vue.extend({
  data(): any {
    return {
      styleObject: {
        width: AppSettings.puyoImgWidth * AppSettings.stageCols + 'px',
        height: AppSettings.puyoImgHeight * AppSettings.stageRows + 'px',
      },
    }
  },
  mounted() {
    Game.start()
  },
  computed: {
    message: () => (Game.available ? 'スターティン' : 'まだ'),
    puyoList: () => Game.puyoList,
    falling: () => Game.fallingPuyoPuyo,
  },
})
</script>
