<template>
  <div ref="main" class="main-container">
    <canvas id="pattern3Canvas" :width=screenWidth :height=screenHeight></canvas>
    <div class="d-flex justify-content-center align-items-center">
      <div class="info-container container d-flex justify-content-center align-items-center rounded-circle ">
        <img class="rounded-circle" :style="{ height: this.canvasSize.width / 3 + 'px' }" src="@/assets/img/coffee.png" alt="coffee">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
canvas {
  position: fixed;
}

.info-container {
  height: 900px;
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
      this.gravityPattern.deleteAllBodyData()
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
      this.screenWidth = this.canvasSize.width * 3
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
