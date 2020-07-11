<template>
  <div class="stage" :style="styleObject">
    <Zenkeshi />
    <Batankyu />
    <Puyo puyo-type="3" />
  </div>
</template>

<style scoped>
.stage {
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  background: url(/img/puyo_1bg.png);
}
</style>

<script lang="ts">
import Vue from 'vue'
import { AppSettings } from '~/settings/settings'
export default Vue.extend({
  data(): any {
    return {
      styleObject: {
        width: AppSettings.puyoImgWidth * AppSettings.stageCols + 'px',
        height: AppSettings.puyoImgHeight * AppSettings.stageRows + 'px',
        backgroundColor: AppSettings.stageBackgroundColor,
      },
    }
  },
})
</script>
