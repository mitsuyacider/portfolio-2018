<template>
  <!-- ナビゲーション -->
  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
    <!-- サブコンテナ -->
    <div class="container ml-0">
      <!-- ブランド名 -->
      <router-link class="navbar-brand" to="/">Mitsuya WATANABE<span class="sr-only">(current)</span></router-link>

      <div class="d-md-none container pl-0 pr-0">
        <b-btn v-b-toggle.collapse1 variant="primary">Works</b-btn>
        <b-btn class="ml-2" v-b-toggle variant="primary">About</b-btn>
        <a href="mailto:mitsuya.watanabe85@gmail.com"><b-btn class="ml-2" v-b-toggle variant="primary">Contact</b-btn></a>
        <b-collapse v-model="showCollapse" id="collapse1" class="w-100 mt-2">
          <b-card>
            <ul>
                <li v-for="(work, index) in works" :key=work.name>
                    <button @click="tappedWork(work)"> {{ work.name }} + {{index}}</button>
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
          <li class="nav-item">
            <a href="mailto:mitsuya.watanabe85@gmail.com">Contact</a>
          </li>
        </ul>
      </div> <!-- /ナビゲーション -->

    </div><!-- /サブコンテナ -->
  </nav>
</template>

<script>
import data from '@/assets/data/data.json'

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
      this.$emit('tappedWork', work)
    }
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
