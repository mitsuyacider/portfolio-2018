<template>
<div class="main-container">
  <nav-container class="nav-container" />
    
  <div class="d-md-flex about-container">
    <div class="left-container col-md-6 d-flex justify-content-center align-items-center">
      <div class="canvas-container" id="p5Canvas"></div>
    </div>
    <div class="container right-container col-md-6 p-4">
      <div class="header">
        <h3>Mitsuya WATANABE</h3>
        <div class="social-icon-container d-flex align-items-center">
          <a href="https://github.com/mitsuyacider" target="_blank"><img src="~/assets/img/github.svg"></a>
          <a href="https://www.linkedin.com/in/mitsuya-watanabe" target="_blank"><img src="~/assets/img/linkedin.svg"></a>
          <a href="https://www.npmjs.com/~mitsuyacider" target="_blank"><img src="~/assets/img/npm.png"></a>
          <a href="https://www.instagram.com/shinonome.cinnamon/" target="_blank"><img src="~/assets/img/instagram.svg"></a>
          <a href="https://medium.com/@mitsuyawatanabe" target="_blank"><img src="~/assets/img/medium.svg"></a>
  
        </div>        
      </div>
      <p class="right-container__passage">
        Thanks for taking time to learn about me.
        I am  a reliable senior Frontend expert with 8 years of proven experience.
        I am quite proficient in Web and Mobile Frontend development.

        Web development
      </p>

      <p class="right-container__passage">
        - HTML/CSS/Javascript/jQuery <br>
        - React js/Redux, Vue js/Veux/Vuetify<br>
        - Github/Gitlab/Bitbucket<br>
        - Mobile app development<br>
        - React Native/Ionic/Xamarin/Flutter
      </p>

      <p class="right-container__passage">
        All these are waiting for you and these will certainly help you get success in your business.
        I only focus on the success and your satisfaction.
        As a relentless learner and challenge enjoyer , I always keep can-do attitude and there is nothing impossible to me.
        All you need to do is just to tell me your dreams.
        If you want to have a great success in your project and business, it would be a nice choice to work with an honest, dedicated and skilful full stack developer like me.
        And that's why I am here with you.
        Best Regards.
      </p>
      <p class="right-container__passage">
        Since I have precise insights about the advantage and disadvantage 
        between web applications and mobile applications, I could present optimal 
        solutions considering system construction and usability at fast-paced development 
        to your team.
      </p>
      <p class="right-container__passage">
        If you are interested in my skills, feel free to send a message 
        to <a href="mailto:mitsuya.watanabe85@gmail.com">mitsuya.watanabe85@gmail.com</a>.
      </p>

      <p class="right-container__passage mt-3">
        See you then!!!
      </p>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.right-container {  

  .header {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  &__passage {
    font-size: 0.9em;
    // color:white;
    // background-color: black;
  }
}

.left-container {
  background: #DCDCDC;
}
</style>

<script>
import NavContainer from '@/components/NavContainer'

export default {
  components: {
    NavContainer
  },
  data () {
    return {
      radar: undefined
    }
  },
  beforeDestroy () {
    if (this.radar !== undefined) {
      this.radar.killAnimation()
    }
  },
  mounted () {
    if (process.browser) {
      this.radar = require('@/js/Radar.js')      
      const P5 = require('p5')
      new P5(this.radar.main)      
    }
  }
}
</script>

<style lang="scss">
.nav-container {
  height: 56px;
}

.about-container {
  height: calc(100vh - 56px);
}

.social-icon-container {
  a {
    margin-right: 4px;
  }
  img {
    max-width: 20px;
  }
}
</style>
