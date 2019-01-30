<template>
  <div ref="main" class="main-container">
    <canvas class="position-fixed" id="pattern3Canvas" :width=screenWidth :height=screenHeight></canvas>
      <div class="info-container m-0 d-flex">
        <div class="info-container__left col-md-6 d-flex justify-content-center align-items-center">
          <img class="info-container__bg rounded-circle " src="@/assets/img/coffee.png" alt="coffee">
        </div>
        <div class="info-container__left col-md-6 d-flex p-0 align-items-center">
          <div class="info-container__caption col-md-6" :style="{ width: this.canvasSize.width / 2 + 'px' }">          
            <div class="info-container__caption__title">
              <h3 class="mb-0 font-weight-bold">Stealth</h3>
              <small>2018</small>            
            </div>
            <div class="info-container__caption__detail">
              <p class="mt-3 mb-0">Role: Development</p>
              <p class="m-0">Client: Gifu Museum</p>
              <p class="mb-2">Tech: Unity, JavaScript</p>
              <p class="d-md-block">detail</p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>


.info-container {
  height: 900px;

  &__bg {
    min-width: 350px;
    // width: calc(100% / );
    height: auto;
  }

  &__caption {
    min-width: 350px;
    z-index: 10;
    font-size: 1.2em;

    &__title {
      color: #C69C6D;
    }

    &__detail {
      color: #999999;
    }
  }
}
</style>


<script>
import MultiGravityPattern from '@/js/MultiGravityPattern'
import config from '@/static/config/pattern3.json'
export default {
  props: {
    createDuration: {
      type: Number,
      default: config.createDuration
    },
    restitution: {
      type: Number,
      default: config.restitution
    },
    friction: {
      type: Number,
      default: config.friction
    },
    density: {
      type: Number,
      defalut: config.density
    },
    frictionAir: {
      type: Number,
      default: config.frictionAir
    },
    isDebug: {
      type: Boolean,
      deault: config.isDebug
    },
    resetInterval: {
      type: Number,
      default: config.resetInterval
    },
    expandRate: {
      type: Number,
      default: config.expandRate
    },
    maxFontSize: {
      type: Number,
      default: config.maxFontSize
    },
    minFontSize: {
      type: Number,
      default: config.minFontSize
    },
    minColor: {
      type: Number,
      default: config.minColor
    },
    canvasSize: {
      type:Object
    }
  },
  data () {
    return {
      gravityPattern: undefined,
      screenWidth: 0,
      screenHeight: 0
    }
  },
  beforeDestroy () {
    // NOTE: Stop rendering
    if (this.gravityPattern !== undefined) {
      this.gravityPattern.stopAnimation()
      // this.gravityPattern.killWorld()
    }

    window.removeEventListener('resize', this.handleResize)
  },
  mounted () {    
    if (process.browser) {
      // ここに window とか document を使った処理

    } 
        
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      console.log(this.$refs.main)
      const newWidth = this.$refs.main.clientWidth * 3

      this.canvasSize.width = newWidth / 3
      if (this.gravityPattern !== undefined) {
        this.gravityPattern.updateCanvasSize(newWidth)
      }
    },
    initialize (data) {
      const canvas = document.getElementById('pattern3Canvas')
      this.screenWidth = this.canvasSize.width * 2
      this.screenHeight = 1800
      canvas.width = this.screenWidth
      canvas.height = this.screenHeight
      if (this.gravityPattern !== undefined) {
        this.gravityPattern.stopAnimation()
        this.gravityPattern.deleteAllBodyData()
        this.gravityPattern = undefined;
      }

      this.gravityPattern = new MultiGravityPattern(canvas)
      this.gravityPattern.setDelegate(this.callbackOnClick)
      this.gravityPattern.initialize(data)
    },
    callbackOnClick (info) {
      info.type = 3
      this.$emit('callbackOnWordClick', info)
    }
  },
  watch: {
    canvasSize: function (newVal, oldVal) {
      console.log(newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  // background: red;
}
</style>
