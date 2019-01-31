import MathUtils from '@/js/MathUtils'
import Matter from 'matter-js'

export default class BasePhysicalPattern {
  constructor (canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.canvas.style.width = String(canvas.width / 2) + 'px'
    this.canvas.style.height = String(canvas.height / 2) + 'px'

    this.isMobile = false

    // touchstartに対応してたらtouchstart、してなければclick
    const mytap = window.ontouchstart === null ? 'touchstart' : 'click'
    // canvas.addEventListener(mytap, this.callbackOnClick.bind(this))

    // NOTE: Local setting
    this.animationId = 0
    this.creationTimerId = 0
    this.topBodyList = []
    this.bottomBodyList = []
    this.wordDataList = []
    this.screenWidth = canvas.width
    this.screenHeight = canvas.height
    this.delegate = undefined

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
    const color = 'rgb(' + colorVal + ',' + colorVal + ',' + colorVal + ')'

    // NOTE: Create word bodies
    const World = Matter.World
    const wordData = {}
    wordData.word = data[index][0]
    wordData.size = val
    wordData.color = color

    const isTopBody = needBottomBody ? Math.floor(Math.random() * 2) === 0 : true
    const wordBody = this.createWordBody(wordData, isTopBody)
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
    // NOTE: Stop rendering
    window.cancelAnimationFrame(this.animationId)
    window.clearTimeout(this.creationTimerId)
    // Events.on(this.engine, 'beforeUpdate', this.matterBeforeUpdate.bind(this))
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
        let fontfamily = part.render.text.family || 'serif'
        let color = part.render.text.color || '#FFFFFF'

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

        this.context.fillStyle = 'black'
        this.context.save()
        this.context.translate(part.position.x, part.position.y)

        let x = bodies[i].vertices[1].x - bodies[i].vertices[0].x
        let y = bodies[i].vertices[1].y - bodies[i].vertices[0].y
        const radian = Math.atan2(y, x)
        this.context.rotate(radian)
        this.context.textBaseline = 'middle'
        this.context.textAlign = 'center'
        this.context.fillStyle = color
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
    const isVertical = Math.floor(Math.random() * 2) === 0
    const Bodies = Matter.Bodies
    const x = Math.random() * this.screenWidth
    const offsetY = -10
    const y = isTopBody ? 0 : this.screenHeight + offsetY

    // NOTE: Calculate text width from font family
    const index = Math.floor(Math.random() * this.fontList.length)
    const fontName = this.fontList[index]
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
            family: fontName
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

      if (part.render.text) {
        const info = {
          word: part.render.text.content
        }

        if (this.delegate !== undefined) {
          this.delegate(info)
        }
      }
    }
  }

  drawRectangle (body) {
    // NOTE: Draw rectangle
    this.context.beginPath()
    var vertices = body.vertices
    this.context.fillStyle = body.isStatic ? '#ff000000' : '#231815'

    this.context.moveTo(vertices[0].x, vertices[0].y)
    for (var j = 1; j < vertices.length; j += 1) {
      this.context.lineTo(vertices[j].x, vertices[j].y)
    }
    this.context.lineTo(vertices[0].x, vertices[0].y)
    this.context.closePath()

    this.context.lineWidth = 1.5
    if (body.isStatic) {
      this.context.strokeStyle = this.isDebug ? '#0000ff' : '#00ff0000'
    } else {
      this.context.strokeStyle = this.isDebug ? '#00ff00' : '#0000ff00'
    }
    this.context.stroke()
    this.context.fill()
  }
}
