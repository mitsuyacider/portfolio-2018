<template>
    <div class="main-container">
      <canvas id="pattern2Canvas" :width=screenSize.width :height=screenSize.height></canvas>
    </div>
</template>

<script>
import LaneService from '@/js/LaneService'

export default {
  props: {
    speed: {
      type: Number,
      default: 0.8
    },
    isDebug: {
      type: Boolean,
      default: false
    },
    addInterval: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      column: 12,
      animationId: 0,
      laneService: '',
      checkingCount: 0
    }
  },
  computed: {
    screenSize: function () {
      return window.screen
    },
    screenWidth () {
      return this.isDebug ? window.innerWidth * 2 : window.screen.width
    },
    screenHeight () {
      return this.isDebug ? window.innerHeight * 2 : window.screen.height
    },
    context: function () {
      const canvas = document.getElementById('pattern2Canvas')
      const context = canvas.getContext('2d')
      return context
    }
  },
  mounted () {
    const canvas = document.getElementById('pattern2Canvas')
    canvas.addEventListener('touchstart', this.onClickOnCanvas, false)

    this.laneService = new LaneService(this.speed)
  },
  beforeDestroy () {
    // NOTE: Stop rendering
    window.cancelAnimationFrame(this.animationId)
  },
  methods: {
    initialize (data) {
      this.laneService.layoutInitialWords(data)
      this.loopAnimation()
    },
    onClickOnCanvas: function (e) {
      // NOTE: Check if the clicked position is inside bounding box of word.
      const touches = e.changedTouches
      const x = touches[0].pageX
      const y = touches[0].pageY
      const clickedWord = this.laneService.laneList.find(word => word.position.x < x && word.position.x + word.fontSize > x && word.position.y < y && word.position.y + word.fontSize * word.text.length > y)

      if (clickedWord !== undefined) {
        // NOTE: Notify the object to native
        const info = {
          type: 2,
          word: clickedWord.text
        }
        this.$emit('callbackOnWordClick', info)
      }
    },
    loopAnimation: function () {
      this.clearCanvas()
      this.laneService.updateLayout()

      // NOTE: ワードデータを描画する
      const lanes = this.laneService.laneList
      for (let i = 0; i < lanes.length; i++) {
        const lane = lanes[i]
        this.drawLane(lane)
      }

      // NOTE: 定期的に差分チェックを行い、データ漏れをなくす。
      if (this.checkingCount >= this.addInterval) {
        this.laneService.addLaneIfNeed()
        this.checkingCount = 0
      }

      this.animationId = requestAnimationFrame(this.loopAnimation)

      this.checkingCount++
    },
    clearCanvas: function () {
      const width = this.screenSize.width
      const height = this.screenSize.height
      this.context.clearRect(0, 0, width, height)
    },
    drawLane: function (lane) {
      const fontSize = lane.fontSize
      this.context.font = `${fontSize}px serif`
      this.context.fillStyle = '#ffffff'
      const text = lane.text

      this.context.save()
      this.context.translate(lane.position.x, lane.position.y)

      // NOTE: Draw background
      this.context.lineWidth = 1.5
      this.context.fillStyle = '#000000'
      this.context.strokeStyle = this.isDebug ? '#00ff00' : '#00ff0000'

      this.context.strokeRect(0, 0, fontSize, fontSize * text.length)
      this.context.fillRect(0, 0, fontSize, fontSize * text.length)

      // NOTE: Set anchor point
      this.context.textBaseline = 'top'

      // NOTE: Draw word(sentence)
      this.context.fillStyle = lane.fillStyle
      const self = this
      Array.prototype.forEach.call(text, function (char, index) {
        // NOTE: 縦棒の場合は強制的に回転させる（苦肉の策)
        if (char === '-' || char === 'ー') {
          self.context.save()
          self.context.translate(0, fontSize * index)
          const rad90 = 90 * (Math.PI / 180)
          self.context.rotate(rad90)
          self.context.translate(0, -fontSize)
          self.context.fillText(char, 0, 0)
          self.context.restore()
        } else {
          self.context.fillText(char, 0, fontSize * index)
        }
      })
      this.context.restore()
    }
  }
}
</script>
