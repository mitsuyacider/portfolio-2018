<template>
<div class="main-container">
  <div class="menu-nav col-md-2">      
    <ul>
      <li>works</li>
      <li>works</li>
      <li>works</li>
      <li>works</li>
    </ul>
  </div>
  <div class="menu-nav col-md-10">
    <pattern-1 ref="pattern" v-if="animationPattern === 1" v-on:callbackOnWordClick=onWordClick />
    <pattern-2 ref="pattern" v-else-if="animationPattern === 2" v-on:callbackOnWordClick=onWordClick />
    <pattern-3 ref="pattern" v-else-if="animationPattern === 3" v-on:callbackOnWordClick=onWordClick />
  </div>
</div>
</template>

<script>

import NativeCommunicator from '@/js/NativeCommunicator'
import Pattern1 from '@/components/Pattern1'
import Pattern2 from '@/components/Pattern2'
import Pattern3 from '@/components/Pattern3'
import LaneContainer from '@/components/LaneContainer'
import csvLoader from '@/js/CSVLoader.js'

export default {
  name: 'App',
  props: {
    isDebug: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {      
      animationPattern: 3,
      column: 12,
      sentenceList: [],
      wordDataList: []
    }
  },
  components: {
    Pattern1,
    Pattern2,
    Pattern3,
    LaneContainer
  },
  mounted () {
    if (this.isDebug) {
      // const id = Math.floor(Math.random() * 28) + 1
      const id = 28
      this.loadData(id)
    }
  },
  methods: {
    zeroPadding (num, length) {
      return ('0000000000' + num).slice(-length)
    },
    onButtonClick (tag) {
      this.$refs.laneContainer.killAllAnimation()
      this.$refs.laneContainer.deleteChildren()
      this.animationPattern = tag
      this.$refs.laneContainer.initialize(this.sentenceList)
      this.$refs.pattern.initialize(this.wordDataList)
    },
    onWordClick (info) {
      console.log('Tapped Word: ' + JSON.stringify(info))
      NativeCommunicator.postWordData(info)
    },
    loadData (id) {
      const self = this
      const idPrefix = this.zeroPadding(id, 2)
      // const sentencesPath = '/sentences/' + idPrefix + '-sentences.csv'
      // csvLoader.loadData(sentencesPath).then((data) => {
      //   self.sentenceList = data
      //   self.$refs.laneContainer.initialize(data)
      // }).catch((e) => {
      //   console.log(e)
      // })

      const wordsPath = '/words/' + idPrefix + '-words.csv'
      csvLoader.loadData(wordsPath).then((data) => {
        self.wordDataList = data
        self.$refs.pattern.initialize(data)
      }).catch((e) => {
        console.log(e)
      })
    }
  },
  computed: {
  }
}
</script>
