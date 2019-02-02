import MathUtils from '@/js/MathUtils'
import Matter from 'matter-js'
import { timingSafeEqual } from 'crypto';

export default class BasePhysicalPattern {
  constructor (canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.canvas.style.width = String(canvas.width / 2) + 'px'
    this.canvas.style.height = String(canvas.height / 2) + 'px'

    this.isMobile = false
    this.shouldExpand = false

    // NOTE: Local setting
    this.animationId = 0
    this.creationTimerId = 0
    this.topBodyList = []
    this.bottomBodyList = []
    this.wordDataList = []
    this.screenWidth = canvas.width
    this.screenHeight = canvas.height
    this.delegate = undefined    

    this.mouse = Matter.Mouse.create(this.canvas)
    // touchstartに対応してたらtouchstart、してなければclick
    const mytap = window.ontouchstart === null ? 'touchstart' : 'mousedown'    
    this.canvas.addEventListener(mytap, this.callbackOnClick.bind(this), false)

    this.fontList = [
      'sans-serif',
      'arial',
      'arial black',
      'Century Gothic',
      'Impact',
      'Tahoma',
      'Georgia',
      'Times New Roman'
    ]

    this.japaneseFontList = [
      'serif',
      'Hiragino Kaku Gothic Std',
      'Hiragino Maru Gothic Pro',
      'YuMincho +36p Kana',
      'YuKyokasho',
      'Tsukushi B Round Gothic',
      'Toppan Bunkyu Gothic',
      'Toppan Bunkyu Midashi Gothic'
    ]
  }

  setDelegate (callback) {
    this.delegate = callback
  }

  deleteAllBodyData () {
    // NOTE: Delete from world if exist
    const bodies = Matter.Composite.allBodies(this.engine.world)
    for (let i = 0; i < bodies.length; i += 1) {
      const part = bodies[i]
      Matter.Composite.remove(this.engine.world, part)
    }
    this.topBodyList = []
    this.bottomBodyList = []    
  }

  initialize (data, needBottomBody) {
    this.wordDataList = data
    this.shouldExpand = false
    // NOTE: Delete from world if exist
    this.deleteAllBodyData()

    // module aliases
    const Engine = Matter.Engine
    this.engine = Engine.create()

    const Events = Matter.Events
    Events.on(this.engine, 'beforeUpdate', this.matterBeforeUpdate.bind(this))
    Engine.run(this.engine)

    this.prepareData(data, needBottomBody)
  }

  /*
    NOTE: Recursive call to create body data.
          This will be stopped when this animation finish.
  */
  prepareData (data, needBottomBody) {
    const topCount = this.topBodyList.length
    const bottomCount = this.bottomBodyList.length
    const index = topCount + bottomCount

    if (index > data.length - 1) return 

    const maxSize = Math.max(...data.map(m => m[1]))
    const minSize = Math.min(...data.map(m => m[1]))
    const size = parseInt(data[index][1], 10)
    const val = MathUtils.map(size, minSize, maxSize, this.minFontSize, this.maxFontSize)

    let colorVal = Math.floor(MathUtils.map(size, minSize, maxSize, this.minColor, 255))

    // rgb(169, 134, 103)
    // rgb(184, 190, 150)
    // const color = 'rgb(' + colorVal + ',' + colorVal + ',' + colorVal + ')'
    const color = 'rgba(' + 184 + ',' + 190 + ',' + 150 + ',' + colorVal / 255 + ')'
    // const color = 'rgba(' + 169 + ',' + 134 + ',' + 103 + ',' + colorVal / 255 + ')'
    // NOTE: Create word bodies
    const World = Matter.World
    const wordData = {}
    wordData.word = data[index][0]
    wordData.size = val
    wordData.link = data[index][2]
    wordData.color = color


    const propotion = this.isMobile ? 5 : 2
    const isTopBody = needBottomBody ? Math.floor(Math.random() * propotion) === 0 : true
    const wordBody = this.createWordBody(wordData, isTopBody)
    const angle = Math.floor(Math.random() * 20) - 10
    const radian = angle * ( Math.PI / 180 )
    Matter.Body.rotate(wordBody, radian)
    World.add(this.engine.world, wordBody)

    if (isTopBody) {
      this.topBodyList.push(wordBody)
    } else {
      this.bottomBodyList.push(wordBody)
    }
    
    this.creationTimerId = setTimeout(() => {
      this.prepareData(data, needBottomBody)
    }, this.createDuration)    
  }

  stopAnimation () {
    // touchstartに対応してたらtouchstart、してなければclick
    const mytap = window.ontouchstart === null ? 'touchstart' : 'click'
    this.canvas.removeEventListener(mytap, this.callbackOnClick, false)

    // NOTE: Stop rendering
    window.cancelAnimationFrame(this.animationId)
    window.clearTimeout(this.creationTimerId)

    Matter.Mouse.clearSourceEvents(this.mouse)
  }

  matterBeforeUpdate (event) {}

  render () {
    const bodies = Matter.Composite.allBodies(this.engine.world)
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.globalAlpha = 1

    for (let i = 0; i < bodies.length; i += 1) {
      const part = bodies[i]

      this.drawRectangle(part)

      if (part.render.text) {
        let fontsize = 30
        let fontfamily = part.render.text.family
        let color = part.render.text.color

        if (part.render.text.size) {
          fontsize = part.render.text.size
        } else if (part.circleRadius) {
          fontsize = part.circleRadius / 2
        }

        let content = ''
        if (typeof part.render.text === 'string') {
          content = part.render.text
        } else if (part.render.text.content) {
          content = part.render.text.content
        }

        this.context.save()
        this.context.translate(part.position.x, part.position.y)

        let x = bodies[i].vertices[1].x - bodies[i].vertices[0].x
        let y = bodies[i].vertices[1].y - bodies[i].vertices[0].y
        const radian = Math.atan2(y, x)
        this.context.rotate(radian)
        this.context.textBaseline = 'middle'
        this.context.textAlign = 'center'

        if (part.render.text && part.render.text.link.length > 1) {
          // #b8be96
          // #a98667      
          let isInBody = this.isCursorInBody(part)
          if (isInBody) {
            this.context.fillStyle = '#231815'
            // fbdbd4 // 白
            // 6a3906 // 茶色
            // 915673 // 紫
            // 231815

          //   if (isInBody) {
          //     this.context.lineWidth = 2.5
          //     this.context.fillStyle = '#01cf9c'
          //     this.context.strokeStyle = '#01cf9c'
          //   } else {
          //     this.context.lineWidth = 10.5
          //     this.context.fillStyle = body.isStatic ? '#ff000000' : '#fbdbd4'
          //     this.context.strokeStyle = '#915673'
          //   }
          // } else {
          //   this.context.fillStyle = body.isStatic ? '#ff000000' : '#231815'
          //   this.context.strokeStyle = '#00ff0000'
          // }




          } else {
            this.context.fillStyle = '#6a3906'
          }
        } else {
          this.context.fillStyle = color
        }
  
        // this.context.fillStyle = color
        this.context.font = fontsize + 'px ' + fontfamily

        if (part.render.text.isVertical) {
          // NOTE: Draw vertical text
          const self = this
          const contentHeight = content.length * fontsize

          // NOTE: Initial y is set in the middle of height.
          //       Calculate y position so as to layout first word to top
          y -= contentHeight / 2 - fontsize / 2

          const strArr = content.split("")
          for (let i = 0; i < strArr.length; i++) {
            const char = strArr[i]
            // NOTE: 縦棒の場合は強制的に回転させる（苦肉の策)
            if (char === '-' || char === 'ー') {
              self.context.save()
              self.context.translate(-fontsize / 2 + i * fontsize - 5, y + fontsize * i - Math.sin(radian) * fontsize)
              const rad90 = 90 * (Math.PI / 180)
              self.context.rotate(rad90)
              self.context.translate(0, (content.length - 1) * fontsize - fontsize / 2 * content.length)
              self.context.fillText(char, 0, y + fontsize * i - Math.sin(radian) * fontsize)
              self.context.restore()
            } else {
              self.context.fillText(char, 0, y + fontsize * i - Math.sin(radian) * fontsize)
            }
          }
        } else {
          this.context.fillText(content, 0, 0)
        }

        this.context.restore()
      }
    }

    this.animationId = window.requestAnimationFrame(this.render.bind(this))
  }

  createWordBody (wordData, isTopBody) {
    // NOTE: Detect multi byte
    //       https://qiita.com/graminume/items/2ac8dd9c32277fa9da64
    const isMultiByte = wordData.word.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/)

    const isVertical = isMultiByte ? Math.floor(Math.random() * 2) === 0 : 0  
    const Bodies = Matter.Bodies
    const x = Math.random() * this.screenWidth
    const offsetY = -10
    const y = isTopBody ? 0 : this.screenHeight + offsetY

    // NOTE: Calculate text width from font family
    let index = Math.floor(Math.random() * this.fontList.length)
    
    let fontName = this.fontList[index]
    if (isMultiByte) {
      index = Math.floor(Math.random() * this.japaneseFontList.length)
      fontName = this.japaneseFontList[index]
    }
    this.context.font = this.context.font = wordData.size + 'px ' + fontName

    let width = this.context.measureText(wordData.word).width
    let height = wordData.size

    if (isVertical) {
      width = wordData.size
      height = wordData.size * wordData.word.length
    }

    const wordBody = Bodies.rectangle(
      x,
      y,
      width,
      height,
      { restitution: this.restitution,
        friction: this.friction,
        density: this.density,
        frictionAir: this.frictionAir,
        render: {
          fillStyle: '#FFFFFF',
          text: {
            fillStyle: '#000000',
            content: wordData.word,
            size: wordData.size,
            isVertical: isVertical,
            color: wordData.color,
            family: fontName,
            link: wordData.link
          }
        }
      })

    return wordBody
  }

  callbackOnClick () {
    const Query = Matter.Query
    const query = Query.point(Matter.Composite.allBodies(this.engine.world), this.mouse.position)

    // NOTE: Bodyがクリックされえていれば、Body情報がqueryに入っている
    if (query.length > 0) {
      const part = query[0]

      if (part.render.text && part.render.text.link.length > 1) {
        const info = {
          word: part.render.text.content,
          link: part.render.text.link
        }

        if (this.delegate !== undefined) {
          this.delegate(info)
        }
      }
    }
  }

  isCursorInBody (body) {

    const query = Matter.Query.point(Matter.Composite.allBodies(this.engine.world), this.mouse.position)

    // NOTE: Bodyがクリックされえていれば、Body情報がqueryに入っている
    return query[0] === body

    // var vertices = body.vertices
    // return this.mouse.position.x >= vertices[0].x && 
    //        this.mouse.position.x <= vertices[1].x &&
    //        this.mouse.position.y >= vertices[0].y &&
    //        this.mouse.position.y <= vertices[2].y
  }

  drawRectangle (body) {
    // NOTE: Draw rectangle
    this.context.beginPath()
    var vertices = body.vertices

     

    let isInBody = false

    if (body.render.text && body.render.text.link.length > 1) {
        // #b8be96
        // #a98667      
      isInBody = this.isCursorInBody(body)
      if (isInBody) {
        this.context.lineWidth = 2.5
        this.context.fillStyle = '#01cf9c'
        this.context.strokeStyle = '#01cf9c'
      } else {
        this.context.lineWidth = 10.5
        this.context.fillStyle = body.isStatic ? '#ff000000' : '#fbdbd4'
        this.context.strokeStyle = '#915673'
      }
    } else {
      this.context.fillStyle = body.isStatic ? '#ff000000' : '#231815'
      this.context.strokeStyle = '#00ff0000'
    }

    this.context.moveTo(vertices[0].x, vertices[0].y)
    for (var j = 1; j < vertices.length; j += 1) {
      this.context.lineTo(vertices[j].x, vertices[j].y)
    }
    this.context.lineTo(vertices[0].x, vertices[0].y)
    this.context.closePath()

    
    if (body.isStatic && body.render.name === 'circle' && this.shouldExpand) {
      this.context.lineWidth = 2.5
      this.context.strokeStyle = this.isDebug ? '#0000ff' : '#b8be96'
    }

    this.context.stroke()
    this.context.fill()
  }
}
