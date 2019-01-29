<template>
<div class="main-container">
  <nav-container />
    
  <div class="d-md-flex">
    <div class="left-container col-md-6 d-flex d-flex justify-content-center align-items-center">
      <div class="canvas-container" id="p5Canvas"></div>
    </div>
    <div class="container right-container col-md-6 p-5">
      <h2>Mitsuya WATANABE</h2>
      <p class="right-container__passage text-justify mt-5">
         I am IMitusya Watanabe from Japan. 
         I am working as a Web & Mobile Application Developer 
         at <a href="https://gocco.co.jp/">GOCCO.</a>
      </p>
      <p class="right-container__passage text-justify">
        I have engaged in system development centered on iOS 
        and developed applications combined with cutting-edge technologies 
        such as Bluetooth/iBeacon, voice recognition, ARKit and machine learning. 
        I have, therefore, deep knowledge and experiences with the innovative use of 
        technology. Furthermore, in recent years, development on the web applications 
        has also been entrusted.
      </p>
      <p class="right-container__passage text-justify">
        Since I have precise insights about the advantage and disadvantage 
        between web applications and mobile applications, I could present optimal 
        solutions considering system construction and usability at fast-paced development 
        to your team.
      </p>
      <p class="right-container__passage text-justify">
        If you are interested in my skills, feel free to send a message 
        to <a href="mailto:mitsuya.watanabe85@gmail.com">mitsuya.watanabe85@gmail.com</a>.
      </p>

      <p class="right-container__passage text-justify mt-3">
        See you then!!!
      </p>
      <div class="social-icon-container d-md-flex mt-5">
        <a href="https://github.com/mitsuyacider" target="_blank"><img src="~/assets/img/github.svg"></a>
        <a href="https://www.linkedin.com/in/mitsuya-watanabe" target="_blank"><img src="~/assets/img/linkedin.svg"></a>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.right-container {

  &__passage {
    font-size: 1.3em;
    // color:white;
    // background-color: black;
  }
}

.canvas-container {
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
</style>

<script>
import NavContainer from '@/components/NavContainer'

export default {
  components: {
    NavContainer
  },
  mounted () {
    if (process.browser) {
      var radar = require('@/js/Radar.js')
      const P5 = require('p5')
      new P5(radar.main)
    }

    // const P5 = require('p5')
    // new P5(radar.main)

    // // NOTE: p5.jsからのコールバックを受け取る
    // radar.setDelegate(this.callbackOnP5);
  }
}
</script>

