<template>
  <div ref="main" class="main-container">
    <canvas class="position-fixed" id="pattern3Canvas" :width=screenWidth :height=screenHeight></canvas>
      
      <!-- PC Display -->
      <div class="info-container m-0 d-none d-md-flex">
        <div class="info-container__left col-md-6 d-flex justify-content-center align-items-center">
          <img ref="circle" class="info-container__left__bg rounded-circle " src="@/assets/img/coffee.png" alt="coffee">
        </div>

        <div class="info-container__right col-md-6 d-flex p-0 align-items-center">
          <div class="info-container__right__caption col-md-6" :style="{ width: this.canvasSize.width / 2 + 'px' }">          
            <div class="info-container__right__caption__title">
              <h3 class="mb-0 font-weight-bold">{{ selectedWork.name }}</h3>
              <small>{{ selectedWork.year }}</small>            
            </div>
            <div class="info-container__right__caption__detail">
              <p class="mt-3 mb-0">Role: {{ selectedWork.role }}</p>
              <p class="m-0">Client: {{ selectedWork.client }}</p>
              <p class="mb-2">Tech: {{ selectedWork.tech }}</p>
              <a :href=selectedWork.link target="blank"> detail </a> 
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile  -->
      <div class="info-container m-0 d-block d-md-none">
        <div class="info-container__left d-flex justify-content-center align-items-center">
          <img ref="circle" class="info-container__left__bg rounded-circle " src="@/assets/img/coffee.png" alt="coffee">
        </div>
        <div class="info-container__right p-0 d-flex align-items-center">
          <div class="info-container__right__caption mt-5 text-center">
            <div class="info-container__right__caption__title">
              <h3 class="mb-0 font-weight-bold">{{ selectedWork.name }}</h3>
              <small>{{ selectedWork.year }}</small>            
            </div>
            <div class="info-container__right__caption__detail">
              <p class="mt-3 mb-0">Role: {{ selectedWork.role }}</p>
              <p class="m-0">Client: {{ selectedWork.client }}</p>
              <p class="mb-2">Tech: {{ selectedWork.tech }}</p>
              <a :href=selectedWork.link target="blank"> detail </a> 
            </div>
          </div>
        </div>
      </div>      
  </div>
</template>

<style lang="scss" scoped>

$breakpoint-tablet: 769px;
$breakpoint-mobile: 768px;

@mixin max-screen($break-point) {
  @media screen and (max-width: $break-point) {
    @content;
  }
}

@mixin min-screen($break-point) {
  @media screen and (min-width: $break-point) {
    @content;
  }
}

@mixin screen($break-point-min, $break-point-max) {
  @media screen and (min-width: $break-point-min) and (max-width: $break-point-max) {
    @content;
  }
}

.info-container__right {
  &__caption {
    
    @include min-screen($breakpoint-tablet) {
      width: 350px; 
      font-size: 1.2em;
    }

    @include max-screen($breakpoint-mobile) {
      font-size: 1.0em;
      width: 300px; 
      margin: 0 auto;

      h3 {
        font-size: 20px;
      }
    }

    z-index: 10;

    &__title {
      color: #C69C6D;
    }

    &__detail {
      color: #999999;
    }
  }

  @include max-screen($breakpoint-mobile) {
      // min-width: 300px;
  }
}

.info-container__left {
  @include min-screen($breakpoint-tablet) {
    height: 900px;
    width: 150px; 
  }

  &__bg {
    @include min-screen($breakpoint-tablet) {
      // min-width: 350px;
      // width: 500px; 
    }

    @include max-screen($breakpoint-mobile) {
      margin-top: 50px;      
      width: 150px; 
    }
  }
}
</style>


<script>
import MultiGravityPattern from '@/js/MultiGravityPattern'
import config from '@/static/config/pattern3.json'
import { mapGetters } from 'vuex'

export default {
  props: {
    canvasSize: {
      type:Object
    },
    worksData: {
      type: Object
    }
  },
  data () {
    return {
      gravityPattern: undefined,
      screenWidth: 0,
      screenHeight: 0,
      workData: {}
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
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      let newWidth = this.$refs.main.clientWidth

      this.canvasSize.width = newWidth
      if (this.gravityPattern !== undefined) {    
        const circleSize = this.$refs.circle.clientWidth    
        this.gravityPattern.updateCanvasSize(newWidth, circleSize)
      }
    },
    initialize (data) {
      const canvas = document.getElementById('pattern3Canvas')
      this.screenWidth = this.canvasSize.width * 2
      this.screenHeight = 1800

      let circleSize = this.$refs.circle.width
      if (window.innerWidth <= 768) {
        this.screenHeight = (screen.height - 94) * 2
        circleSize = this.$refs.circle.clientWidth
      } 

      canvas.width = this.screenWidth
      canvas.height = this.screenHeight
      if (this.gravityPattern !== undefined) {
        this.gravityPattern.stopAnimation()
        this.gravityPattern.deleteAllBodyData()
        this.gravityPattern = undefined;
      }

      this.gravityPattern = new MultiGravityPattern(canvas)
      this.gravityPattern.setDelegate(this.callbackOnClick)
      this.gravityPattern.initialize(data, circleSize)
    },
    callbackOnClick (info) {
      info.type = 3
      this.$emit('callbackOnWordClick', info)
    }
  },
  computed: {
    // ゲッターを、スプレッド演算子（object spread operator）を使って computed に組み込む
    ...mapGetters([
      'selectedWork'
    ])
  }  
}
</script>

