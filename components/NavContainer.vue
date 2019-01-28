<template>
  <!-- ナビゲーション -->
  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
    <!-- サブコンテナ -->
    <div class="container">
      <!-- ブランド名 -->
      <router-link class="navbar-brand" to="/">Mitsuya WATANABE<span class="sr-only">(current)</span></router-link>

      <!-- 切り替えボタン -->
      <button type="button" class="navbar-toggler" data-toggle="collapse" data-target=
      "#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label=
      "Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- ナビゲーション -->
      <div class="collapse navbar-collapse" id="navbar-content">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <nuxt-link to="/">Works</nuxt-link>
          </li>
          <li class="nav-item">
            <!-- <a href="/about" class="nav-link">About</a> -->
            <nuxt-link to="/about">About</nuxt-link>
          </li>
        </ul>

        <!-- 右側メニュー : Contactページへのリンク -->
        <ul class="navbar-nav">
          <li class="nav-item nav-link btn btn-info">
            <router-link to="/contact">Contact</router-link>
          </li>
        </ul>
      </div><!-- /ナビゲーション -->

    </div><!-- /サブコンテナ -->
  </nav>
</template>

<style lang="scss" scoped>
.nav-item a {
  color: white;
  margin-left: 10px;  
}

</style>
