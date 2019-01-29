<template>
  <div class="main-container">
    <canvas id="pattern1Canvas" :width=screenWidth :height=screenHeight></canvas>
  </div>
</template>

<script>
import SingleGravityPattern from '@/js/SingleGravityPattern'
import config from '@/static/config/pattern1.json'

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
    frictionAir: {
      type: Number,
      default: config.frictionAir
    },
    density: {
      type: Number,
      default: config.density
    },
    isDebug: {
      type: Boolean,
      deault: config.isDebug
    },
    resetInterval: {
      type: Number,
      default: config.resetInterval
    },
    recreateInterval: {
      type: Number,
      default: config.recreateInterval
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
    }
  },
  data () {
    return {
      gravityPattern: {}
    }
  },
  computed: {
    screenWidth () {
      return this.isDebug ? window.innerWidth * 2 : window.screen.width * 2
    },
    screenHeight () {
      return this.isDebug ? window.innerHeight * 2 : window.screen.height * 2
    }
  },
  beforeDestroy () {
    // NOTE: Stop rendering
    this.gravityPattern.stopAnimation()
  },
  mounted () {
    const canvas = document.getElementById('pattern1Canvas')
    this.gravityPattern = new SingleGravityPattern(canvas)
    this.gravityPattern.setDelegate(this.callbackOnClick.bind(this))
  },
  methods: {
    initialize (data) {
      this.gravityPattern.initialize(data)
    },
    callbackOnClick (info) {
      info.type = 1
      this.$emit('callbackOnWordClick', info)
    }
  }
}
</script>
