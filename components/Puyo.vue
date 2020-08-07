<template>
  <img class="puyo" :src="puyoImage" :width="imgWidth" :height="imgHeight" :style="styleObject" />
</template>

<style scoped>
.puyo {
  position: absolute;
}
</style>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { AppSettings } from '~/settings/settings'
import { Puyo } from '~/models/Puyo/index'

interface DataType {
  imgWidth: number
  imgHeight: number
}

interface PropsType {
  puyo: Puyo
}

export default Vue.extend({
  data(): DataType {
    return {
      imgWidth: AppSettings.puyoImgWidth,
      imgHeight: AppSettings.puyoImgHeight,
    }
  },
  props: {
    puyo: {
      type: Object as PropType<Puyo>,
      required: true,
    },
  },
  computed: {
    puyoImage(): String {
      const puyo = this.puyo as Puyo
      return `/img/puyo_${puyo.color}.png`
    },
    styleObject() {
      const puyo = this.puyo as Puyo
      return {
        top: puyo.top + 'px',
        left: puyo.left + 'px',
      }
    },
  },
})
</script>
