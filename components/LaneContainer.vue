<template>
  <div class="lane-container" ref="container" :style="{ color: fontColor}" />
</template>

<script>
import VerticalLane from '@/components/VerticalLane'
import Vue from 'vue'
import anime from 'animejs'
import config from '@/static/config/backgroundLanes.json'

export default {
  props: {
    column: {
      type: Number,
      default: config.column
    },
    lineSpace: {
      type: Number,
      default: config.lineSpace
    },
    maxSpeed: {
      type: Number,
      default: config.maxSpeed
    },
    minSpeed: {
      type: Number,
      default: config.minSpeed
    },
    isDebug: {
      type: Boolean,
      default: config.isDebug
    },
    fontColor: {
      type: String,
      default: config.fontColor
    }
  },
  data () {
    return {
      fontSize: 14,
      injectedCnt: 0,
      laneSpeedStore: [],
      sentenceList: []
    }
  },
  computed: {
    screenWidth () {
      return this.isDebug ? window.innerWidth : window.screen.width
    },
    screenHeight () {
      return this.isDebug ? window.innerHeight : window.screen.height
    }
  },
  methods: {
    initialize (data) {
      this.sentenceList = data
      this.killAllAnimation()
      this.deleteChildren()
      this.laneSpeedStore = []
      this.injectedCnt = 0
      this.fontSize = this.screenWidth / this.column - this.lineSpace

      for (let i = 0; i < this.column; i++) {
        // NOTE: Math.random() * (最大値 - 最小値) + 最小値
        const speed = Math.floor(Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed)
        this.laneSpeedStore.push(speed)
        const isFirstLane = true
        this.createLaneComponent(i, isFirstLane)
        this.updateInjectedCnt()
      }
    },
    killAllAnimation () {
      const animations = anime.running
      for (let i = 0; i < animations.length; i++) {
        const data = animations[i]
        const element = data.animatables[0].target
        anime.remove(element)
      }
    },
    deleteChildren () {
      const element = this.$refs.container

      // 子要素を全て削除
      while (element.firstChild) {
        element.removeChild(element.firstChild)
      }
    },
    updateInjectedCnt () {
      this.injectedCnt++
      if (this.injectedCnt > this.sentenceList.length - 1) {
        this.injectedCnt = 0
      }
    },
    onUpdateLaneAnimation (laneData, val, node) {
      const isFirstLane = false
      this.createLaneComponent(laneData.laneId, isFirstLane)
      this.updateInjectedCnt()
    },
    onCompleteLaneAnimation (laneData, node) {
      const isExist = document.body.contains(node)
      if (isExist) {
        this.$refs.container.removeChild(node)
      }
    },
    createLaneComponent (laneId, isFirstLane) {
      const data = this.createLaneData(laneId)
      const ComponentClass = Vue.extend(VerticalLane)
      const instance = new ComponentClass({
        propsData: {
          update: this.onUpdateLaneAnimation,
          complete: this.onCompleteLaneAnimation,
          laneData: data,
          isFirstLane: isFirstLane,
          isDebug: this.isDebug
        }
      })

      instance.$mount()
      this.$refs.container.appendChild(instance.$el)

      // NOTE: mountした段階だとまだpropsDataがundefinedなため、
      //       appendChildした後で別途で初期化処理を行う
      instance.initialize()
    },
    createLaneData (laneId) {
      const offsetX = (this.screenWidth - ((this.fontSize + this.lineSpace) * this.column)) / 2 + this.lineSpace / 2
      const x = (this.fontSize + this.lineSpace) * laneId + offsetX
      const primaryKey = new Date().getTime().toString(16) + Math.floor(10000 * Math.random()).toString(16)
      const data = {
        sentence: this.sentenceList[this.injectedCnt][0],
        className: 'lane' + primaryKey,
        laneId: laneId,
        x: x,
        speed: this.laneSpeedStore[laneId],
        fontSize: this.fontSize
      }

      return data
    }
  }
}
</script>

<style scoped>
.lane-container {
  overflow: hidden;
  height: 100vh;
  position:relative;
}
</style>
