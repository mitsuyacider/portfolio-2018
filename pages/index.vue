<template>
  <div class="main-container">
    <nav-container />
    <works />
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
  }
}
</script>

<style>
</style>
