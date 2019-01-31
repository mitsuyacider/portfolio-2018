<template>
  <!-- ナビゲーション -->
  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
    <!-- サブコンテナ -->
    <div class="container ml-0">
      <!-- ブランド名 -->
      <router-link class="navbar-brand" to="/">Mitsuya WATANABE<span class="sr-only">(current)</span></router-link>

      <div class="d-md-none container pl-0 pr-0">
        <b-btn v-b-toggle.collapse1 variant="primary">Works</b-btn>
        <nuxt-link to="/about"><b-btn class="ml-2" v-b-toggle variant="primary">About</b-btn></nuxt-link>
        <!-- <a href="mailto:mitsuya.watanabe85@gmail.com"><b-btn class="ml-2" v-b-toggle variant="primary">Contact</b-btn></a> -->
        <b-collapse v-model="showCollapse" id="collapse1" class="w-100 mt-2">
          <b-card>
            <ul class="list-unstyled">
                <li class="border" v-for="(work) in works['web']" :key=work.name>
                    <button class="text-left" @click="tappedWork(work)"> {{ work.name }}</button>
                </li>
                <li class="border" v-for="(work) in works['mobile']" :key=work.name>
                    <button class="text-left" @click="tappedWork(work)"> {{ work.name }}</button>
                </li>
                <li class="border" v-for="(work) in works['r_d']" :key=work.name>
                    <button class="text-left" @click="tappedWork(work)"> {{ work.name }}</button>
                </li>
            </ul>
          </b-card>
        </b-collapse>
      </div>

      <!-- ナビゲーション -->
      <div class="collapse navbar-collapse" id="navbar-content">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <nuxt-link to="/">Works</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/about">About</nuxt-link>
          </li>
        </ul>
      </div> <!-- /ナビゲーション -->

    </div><!-- /サブコンテナ -->
  </nav>
</template>

<script>
import data from '@/assets/data/data.json'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  props: {
    isDebug: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {      
      works: data,
      showCollapse: false
    }
  },
  methods: {
    tappedWork (work) {
      this.showCollapse = false
      this.setSelectedWork(work)
      this.$emit('tappedWork', work)
    },
    ...mapActions([
      'setSelectedWork'
    ])
  }
}
</script>

<style lang="scss" scoped>
.nav-item a {
  color: white;
  margin-left: 10px;  
}

.navbar-nav {
  width: 100%;
}

</style>
