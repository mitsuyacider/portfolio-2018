<template>
<div class="main-container d-md-flex">
  <div class="nav-main col-md-2 pl-4  d-none d-md-block">
    <works-menu v-on:tappedWork="onClickWork" />
  </div>
  <div ref="project" class="project-container col-md-10 col-xs-12">
    <pattern-1 ref="pattern" v-if="animationPattern === 1" v-on:callbackOnWordClick=onWordClick />
    <pattern-2 ref="pattern" v-else-if="animationPattern === 2" v-on:callbackOnWordClick=onWordClick />
    <pattern-3 :canvasSize=canvasSize ref="pattern" v-else-if="animationPattern === 3" v-on:callbackOnWordClick=onWordClick />
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
import WorksMenu from '@/components/WorksMenu'

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
      wordDataList: [],
      canvasSize: {
        width: 0,
        height:0
      }
    }
  },
  components: {
    Pattern1,
    Pattern2,
    Pattern3,
    LaneContainer,
    WorksMenu
  },
  mounted () {    
    this.canvasSize.width = this.$refs.project.clientWidth
  },
  methods: {
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
    onClickWork (work) {
      this.loadData(work.file)
    },
    loadData (preFileName) {
      const self = this
      const wordsPath = '/words/' + preFileName + '-words.csv'
      csvLoader.loadData(wordsPath).then((data) => {
      console.log(data)
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

<style lang="scss" scoped>
.menu-nav {  
  height: 100vh;
}

.mb-container {
  width: 100vw;
}
</style>
