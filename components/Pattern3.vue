<template>
  <div class="main-container">
    <canvas id="pattern3Canvas" :width=screenWidth :height=screenHeight></canvas>
  </div>
</template>

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
      gravityPattern: {},
      screenWidth: 0,
      screenHeight: 0
    }
  },
  beforeDestroy () {
    // NOTE: Stop rendering
    this.gravityPattern.stopAnimation()
  },
  mounted () {    
    if (process.browser) {
      // ここに window とか document を使った処理

    } 

  },
  methods: {
    initialize (data) {
      const canvas = document.getElementById('pattern3Canvas')
      this.screenWidth = this.canvasSize.width * 2 - 20
      this.screenHeight = 1800
      canvas.width = this.screenWidth
      canvas.height = this.screenHeight
      this.gravityPattern = new MultiGravityPattern(canvas)
      this.gravityPattern.setDelegate(this.callbackOnClick)
      this.gravityPattern.initialize(data)
    },
    callbackOnClick (info) {
      info.type = 3
      this.$emit('callbackOnWordClick', info)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  background: red;
}
</style>
