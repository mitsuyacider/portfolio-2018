<template>
  <div class="exp" :class="this.laneData.className">
    <span :style="{ border: border, 'font-family': 'serif'}">{{ this.laneData.sentence }}</span>
  </div>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'VerticalLane',
  props: {
    // NOTE: This property may be called from storybook
    isDebug: {
      type: Boolean,
      default: false
    },
    update: {
      type: Function
    },
    complete: {
      type: Function
    },
    laneData: {
      type: Object
    },
    isFirstLane: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      shouldNotify: true
    }
  },
  computed: {
    border () {
      return this.isDebug ? 'solid 1px #FF0000' : 'none'
    },
    screenWidth () {
      return this.isDebug ? window.innerWidth : window.screen.width / 2
    },
    screenHeight () {
      return this.isDebug ? window.innerHeight : window.screen.height
    },
    rootElement () {
      const elements = document.getElementsByClassName(this.laneData.className)
      return elements[0]
    }
  },
  methods: {
    initialize () {
      this.setPosition()
      this.startAnimation()
    },
    getTestData () {
      return 'test'
    },
    setPosition () {
      const style = this.rootElement.style
      const top = this.isFirstLane ? 0 : this.screenHeight
      style.left = this.laneData.x + 'px'
      style.top = top + 'px'
      style.width = this.laneData.fontSize + 'px'
      // style.height = this.laneData.sentence.length * this.laneData.fontSize * 2 + 'px'
      style.height = '500vh'
      style.fontSize = this.laneData.fontSize + 'px'
      // NOTE: Centering
      style.lineHeight = this.laneData.fontSize + 'px'
    },
    startAnimation () {
      const self = this

      // NOTE: Set speed by pixel per seconds
      const speed = this.laneData.speed
      const contentsHeight = this.rootElement.children[0].getBoundingClientRect().height
      const endY = Math.floor(-1 * (this.screenHeight + contentsHeight) - this.laneData.fontSize)
      const absEndY = Math.abs(endY)
      const duration = absEndY / speed * 1000
      const delay = this.laneData.fontSize / speed * 1000
      anime({
        targets: '.' + this.laneData.className,
        delay: delay,
        translateY: { value: endY },
        duration: duration,
        easing: 'linear',
        update: function (anim) {
          const transformStyle = self.rootElement.style.transform

          // NOTE: transformStyleには「translateY(xxxpx)」という値が文字列で入っているため、
          //       数値部分のみ抜き出す
          const val = transformStyle.replace(/[^\d.]/g, '')
          self.drainNextSentenceIfNeed(contentsHeight, val)

          // NOTE: 画面から全てのテキストがフレームアウトしたら、
          //       アニメーション終了とみなす
          if (val >= absEndY) {
            self.complete(self.laneData, self.rootElement)
          }
        }
      })
    },
    drainNextSentenceIfNeed (contentsHeight, val) {
      // NOTE: 文章の最後の文字がスクリーン上に表示された場合、
      //       次の文章を流し込むように通知する。
      //       初期表示のlaneは画面の上端に位置するため、文章が見切れているかどうかで判別する。
      const initialLeftHeight = contentsHeight - this.screenHeight
      const shouldNotyfyInInitialShortSentence = (this.isFirstLane &&
                                                  contentsHeight <= this.screenHeight &&
                                                  this.shouldNotify)
      const shouldNotyfyInInitialLongSentence = (this.isFirstLane &&
                                                  val >= initialLeftHeight &&
                                                  this.shouldNotify)
      if ((val > contentsHeight && this.shouldNotify) ||
            shouldNotyfyInInitialShortSentence ||
            shouldNotyfyInInitialLongSentence) {
        this.shouldNotify = false

        const isExist = document.body.contains(this.rootElement)
        if (isExist) {
          this.update(this.laneData, val, this.rootElement)
        }
      }
    }
  }
}
</script>
<style scoped>
.exp {
  position: absolute;

  /* NOTE: Vertical line */
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -moz-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  -ms-writing-mode: vertical-rl;
}
</style>
