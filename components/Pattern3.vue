<template>
  <div ref="main" class="main-container">
    <canvas class="position-fixed" id="pattern3Canvas" :width=screenWidth :height=screenHeight></canvas>
      
    <!-- PC Display -->
    <div class="info-container m-0 d-none d-md-flex" :style="{ height: this.canvasSize.height + 'px' }">
      <div class="info-container__left col-md-6 d-flex justify-content-center align-items-center">
        <img 
          ref="circle" 
          class="info-container__left__bg rounded-circle " 
          :src="require('@/assets/img/' + selectedWork.file + '.png')"
          alt="coffee"
          :style="{ width: this.canvasSize.width / 4 + 'px' }">
      </div>

      <div class="info-container__right col-md-6 d-flex p-0 align-items-center">
        <div class="container row">
          <div class="info-container__right__caption__title col-md-12 p-0">
            <h3 class="mb-0 font-weight-bold">{{ selectedWork.name }}</h3>
            <small>{{ selectedWork.year }}</small>            
          </div>
          <div class="info-container__right__caption" :style="{ width: this.canvasSize.width / 2 + 'px' }">          
            <div class="info-container__right__caption__detail mt-3">
              <div class="row d-flex">
                <div class="static-caption col-md-2">
                  <p class="m-0">Role: </p>
                </div>
                <div class="information col-md-10">
                  <p class="ml-1 mb-0">{{ selectedWork.role }}</p>
                </div>
                <div class="static-caption col-md-2">
                  <p class="m-0">Client: </p>
                </div>
                <div class="information col-md-10">
                  <p class="ml-1 mb-0">{{ selectedWork.client }}</p>
                </div>
                <div class="static-caption col-md-2">
                  <p class="m-0">Tech: </p>
                </div>
                <div class="information col-md-10">
                  <p class="ml-1 mb-0">{{ selectedWork.tech }}</p>
                </div>
              </div>

              <a class="detail-target" :href=selectedWork.link target="blank"> more </a> 
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile  -->
    <div class="info-container m-0 d-block d-md-none">
      <div class="info-container__left d-flex justify-content-center align-items-center">
        <img 
        ref="circle" 
        class="info-container__left__bg rounded-circle " 
          :src="require('@/assets/img/' + selectedWork.file + '.png')"
        alt="coffee">
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
            <a class="detail-target" :href=selectedWork.link> more </a> 
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

.info-container {
  pointer-events: none;
}

.detail-target {
  pointer-events: auto;
}

.info-container__right {
  &__caption {
    
    z-index: 10;
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

    &__title {
      @include min-screen($breakpoint-tablet) {
        >h3 {
          width: 400px;
        }
      }
      color: #f7f3e9;      
    }

    &__detail {
      color: #f7f3e9;
      width: 300px;

      >a {
        color: #a98667;
        text-decoration: underline solid #a98667;
      }
      >a:hover {
        color: #01cf9c;
        text-decoration: underline solid #01cf9c;        
      }
    }
  }

  @include max-screen($breakpoint-mobile) {
      // min-width: 300px;
  }
}

.info-container__left {
  @include min-screen($breakpoint-tablet) {
    height: 100%;
    width: 150px; 
  }

  &__bg {
    @include min-screen($breakpoint-tablet) {
      min-width: 350px;
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
    getCircleSize () {
      let circleSize
      const circle = document.getElementsByClassName('info-container__left__bg')      
      if (window.innerWidth <= 768) {
        this.screenHeight = (screen.height - 54) * 2
        circleSize = this.$refs.circle.clientWidth
      } else {
        circleSize = circle[0].clientWidth
      }        

      return circleSize
    },
    handleResize () {
      let newWidth = this.$refs.main.clientWidth

      this.canvasSize.width = newWidth
      if (this.gravityPattern !== undefined) {    
        const circleSize = this.getCircleSize()
        this.gravityPattern.updateCanvasSize(newWidth, circleSize)
      }
    },
    initialize (data) {
      const canvas = document.getElementById('pattern3Canvas')
      this.screenWidth = this.canvasSize.width * 2
      this.screenHeight = this.canvasSize.height * 2

      const circleSize = this.getCircleSize()
      canvas.width = this.screenWidth
      canvas.height = this.screenHeight

      if (window.innerWidth <= 768) {
        // NOTE: Do not use following code.
        // this.screenHeight = (screen.height - 56) * 2

        // NOTE: Use this code instead of above.
        //       Mobile device has tool bar.
        this.screenHeight = (window.innerHeight - 56) * 2
        canvas.height = this.screenHeight
      }   

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
    },
    destroy () {
      this.gravityPattern.stopAnimation()
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

