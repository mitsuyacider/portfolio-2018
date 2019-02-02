<template>
<div class="main-container d-md-flex">
  <div class="nav-main col-md-2 pl-4  d-none d-md-block">
    <works-menu v-on:tappedWork="onClickWork" />
  </div>
  <div ref="project" class="project-container col-md-10 col-xs-12 p-0">
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
    this.canvasSize.height = this.$refs.project.clientHeight
    this.loadData('mediaart')
  },
  methods: {

    onWordClick (info) {
      console.log("works.vue : onclick: " + info.link)
      // NOTE: Navigate to site with info.link
      var ua = navigator.userAgent;
      if (ua.indexOf('iPhone') > 0 || 
          ua.indexOf('Android') > 0 && 
          ua.indexOf('Mobile') > 0) {
        // スマートフォン用コード

        // this.$refs.pattern.initialize(data)
        this.$refs.pattern.destroy()
        const a = document.createElement('a')
        a.setAttribute('href', info.link)
        a.setAttribute('target', '_blank')
        const dispatch = document.createEvent("HTMLEvents");
        dispatch.initEvent("click", true, true);
        a.dispatchEvent(dispatch);
      } else if (ua.indexOf('iPad') > 0 || 
                 ua.indexOf('Android') > 0) {
          // タブレット用コード
          window.open(info.link);
      } else {
          // PC用コード
          window.open(info.link);
      }
    },
    onClickWork (work) {
      this.loadData(work.file)
    },
    loadData (preFileName) {
      const self = this
      const wordsPath = '/words/' + preFileName + '-words.csv'
      csvLoader.loadData(wordsPath).then((data) => {        
        self.$refs.pattern.initialize(data)
      }).catch((e) => {
        console.log(e)
      })
    }
  },
  watch: {
    '$store.state.selectedWork' : function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadData(newVal.file)     
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-nav {  
  height: 100%;
}

.nav-main {
  background: #f7f3e9;
}

.mb-container {
  width: 100vw;
}

.project-container {
  background: #4a485d;
  height: 100%;
}

</style>
