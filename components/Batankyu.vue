<template>
  <img class="batan" src="/img/batankyu.png" :width="imageWidth"/>
</template>

<style scoped>
  .batan {
    position: absolute;
  }
</style>

<script lang="ts">
import Vue from 'vue'
import {AppSettings} from '~/settings/settings'
export default Vue.extend({
  data(): any {
    return {
      imageWidth: AppSettings.puyoImgWidth * 6
    }
  }
})
</script>
