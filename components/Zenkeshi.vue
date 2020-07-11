<template>
  <img class="zenkeshi" src="/img/zenkeshi.png" />
</template>

<style scoped>
.zenkeshi {
  position: absolute;
}

.zenkeshi.hidden {
  display: none;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data(): any {
    return {}
  },
})
</script>
