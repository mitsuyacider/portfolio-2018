<template>
  <!-- ナビゲーション -->
  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
    <!-- サブコンテナ -->
    <div class="container">
      <!-- ブランド名 -->
      <router-link class="navbar-brand" to="/">Mitsuya WATANABE<span class="sr-only">(current)</span></router-link>

      <div>
        <b-dropdown id="ddown1" text="Menu" class="d-block d-md-none">
          <b-dropdown-item>Works</b-dropdown-item>
          <b-dropdown-item>About</b-dropdown-item>
          <b-dropdown-item>Contact</b-dropdown-item>
        </b-dropdown>
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
            <router-link to="/contact">Contact</router-link>
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
