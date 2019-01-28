<template>
  <!-- ナビゲーション -->
  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
    <!-- サブコンテナ -->
    <div class="container">
      <!-- ブランド名 -->
      <router-link class="navbar-brand" to="/">Mitsuya WATANABE<span class="sr-only">(current)</span></router-link>

      <div class="d-md-none d-flex">
        <b-btn class="ml-2" v-b-toggle.collapse1 variant="primary">Works</b-btn>
        <b-btn class="ml-2" v-b-toggle variant="primary">About</b-btn>
        <b-btn class="ml-2" v-b-toggle variant="primary"><a href="mailto:mitsuya.watanabe85@gmail.com">Contact</a></b-btn>
        <b-collapse id="collapse1" class="mt-2">
          <b-card>
            <p class="card-text">Collapse contents Here</p>
            <b-btn v-b-toggle.collapse1_inner >Toggle Inner Collapse</b-btn>
            <b-collapse id=collapse1_inner class="mt-2">
              <b-card>Hello!</b-card>
            </b-collapse>
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

<style lang="scss" scoped>
.nav-item a {
  color: white;
  margin-left: 10px;  
}

.navbar-nav {
  width: 100%;
}

</style>
