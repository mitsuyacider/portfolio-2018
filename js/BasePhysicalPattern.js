import MathUtils from '@/js/MathUtils'
import Matter from 'matter-js'

export default class BasePhysicalPattern {
  constructor (canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.canvas.style.width = String(canvas.width / 2) + 'px'
    this.canvas.style.height = String(canvas.height / 2) + 'px'

    // module aliases
    const Engine = Matter.Engine
    this.engine = Engine.create()

    const Events = Matter.Events
    Events.on(this.engine, 'beforeUpdate', this.matterBeforeUpdate.bind(this))
    Engine.run(this.engine)
    this.mouse = Matter.Mouse.create(canvas)

    // touchstartに対応してたらtouchstart、してなければclick
    const mytap = window.ontouchstart === null ? 'touchstart' : 'click'
    canvas.addEventListener(mytap, this.callbackOnClick.bind(this))

    // NOTE: Local setting
    this.animationId = 0
    this.topBodyList = []
    this.bottomBodyList = []
    this.wordDataList = []
    this.screenWidth = this.isDebug ? window.innerWidth * 2 : window.screen.width * 2
    this.screenHeight = this.isDebug ? window.innerHeight * 2 : window.screen.height * 2
    this.delegate = undefined
  }

  setDelegate (callback) {
    this.delegate = callback
  }

  initialize (data, needBottomBody) {
    this.wordDataList = data
    // NOTE: Delete from world if exist
    const bodies = Matter.Composite.allBodies(this.engine.world)
    for (let i = 0; i < bodies.length; i += 1) {
      const part = bodies[i]
      Matter.Composite.remove(this.engine.world, part)
    }
    this.topBodyList = []
    this.bottomBodyList = []

    const maxSize = Math.max(...data.map(m => m[1]))
    const minSize = Math.min(...data.map(m => m[1]))

    // NOTE: Create word bodies
    const World = Matter.World
    for (let i = 0; i < data.length; i++) {
      const isTopBody = needBottomBody ? Math.floor(Math.random() * 2) === 0 : true
      setTimeout(() => {
        const size = parseInt(data[i][1], 10)
        const val = MathUtils.map(size, minSize, maxSize, this.minFontSize, this.maxFontSize)

        let colorVal = Math.floor(MathUtils.map(size, minSize, maxSize, this.minColor, 255))
        const color = 'rgb(' + colorVal + ',' + colorVal + ',' + colorVal + ')'

        const wordData = {}
        wordData.word = data[i][0]
        wordData.size = val
        wordData.color = color

        const wordBody = this.createWordBody(wordData, isTopBody)
        World.add(this.engine.world, wordBody)
        if (isTopBody) {
          this.topBodyList.push(wordBody)
        } else {
          this.bottomBodyList.push(wordBody)
        }
      }, this.createDuration * i)
    }
  }

  stopAnimation () {
    // NOTE: Stop rendering
    window.cancelAnimationFrame(this.animationId)
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
          Array.prototype.forEach.call(content, function (char, index) {
            // NOTE: 縦棒の場合は強制的に回転させる（苦肉の策)
            if (char === '-' || char === 'ー') {
              self.context.save()
              self.context.translate(-fontsize / 2 + index * fontsize - 5, y + fontsize * index - Math.sin(radian) * fontsize)
              const rad90 = 90 * (Math.PI / 180)
              self.context.rotate(rad90)
              self.context.translate(0, (content.length - 1) * fontsize - fontsize / 2 * content.length)
              self.context.fillText(char, 0, y + fontsize * index - Math.sin(radian) * fontsize)
              self.context.restore()
            } else {
              self.context.fillText(char, 0, y + fontsize * index - Math.sin(radian) * fontsize)
            }
          })
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

    let width = wordData.size * wordData.word.length
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
            color: wordData.color
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
    this.context.fillStyle = body.isStatic ? '#ff000000' : '#000000'
    this.context.moveTo(vertices[0].x, vertices[0].y)
    for (var j = 1; j < vertices.length; j += 1) {
      this.context.lineTo(vertices[j].x, vertices[j].y)
    }
    this.context.lineTo(vertices[0].x, vertices[0].y)
    this.context.closePath()

    this.context.lineWidth = 1.5
    if (body.isStatic) {
      this.context.strokeStyle = this.isDebug ? '#0000ff' : '#0000ff00'
    } else {
      this.context.strokeStyle = this.isDebug ? '#00ff00' : '#0000ff00'
    }
    this.context.stroke()
    this.context.fill()
  }
}
