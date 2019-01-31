<template>
  <div class="main-container">
    <nav-container class="nav-container" v-on:tappedWork="onTapWork" />
    <works class="works-container" />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import NavContainer from '@/components/NavContainer'
import Works from '@/pages/Works'

export default {
  components: {
    NavContainer,
    Works
  },
  methods: {
    onTapWork (work) {
    }
  }
}
</script>

<style lang="scss">
.nav-container {
  height: 59;
}

.works-container {
  height: calc(100vh - 59px);
}
</style>
