import Matter from 'matter-js'
import BasePhysicalPattern from './BasePhysicalPattern'
import config from '@/static/config/pattern3.json'

export default class MultiGravityPattern extends BasePhysicalPattern {
  constructor (canvas) {
    super(canvas)
    this.shouldExpand = false
    this.expandRate = 1.108
    this.staticCircle = {}

    this.createDuration = config.createDuration
    this.restitution = config.restitution
    this.friction = config.friction
    this.density = config.density
    this.frictionAir = config.frictionAir
    this.isDebug = config.isDebug
    this.resetInterval = config.resetInterval
    this.expandRate = config.expandRate
    this.maxFontSize = config.maxFontSize
    this.minFontSize = config.minFontSize
    // this.minColor = config.minColor
    this.minColor = config.minColor
  }

  updateCanvasSize (width) {
    this.screenWidth = width 
    Matter.Body.setPosition(this.staticCircle, {x: this.screenWidth / 3, y: this.screenHeight / 2})
  }

  initialize (data) {
    const needBottomBody = true
    super.initialize(data, needBottomBody)

    // NOTE: Create walls
    const World = Matter.World
    const Bodies = Matter.Bodies
    const circleSize = this.screenWidth / 9
    const ground = Bodies.rectangle(this.screenWidth / 2, this.screenHeight, this.screenWidth, 2, { isStatic: true })
    const leftWall = Bodies.rectangle(0, 0, 2, this.screenHeight * 2, { isStatic: true })
    const rightWall = Bodies.rectangle(this.screenWidth, 0, 2, this.screenHeight * 2, { isStatic: true })
    const upWall = Bodies.rectangle(this.screenWidth, 0, this.screenWidth * 2, 2, { isStatic: true })
    this.staticCircle = Bodies.circle(this.screenWidth / 3, this.screenHeight / 2, circleSize, {isStatic: true})
    World.add(this.engine.world, [upWall, ground, leftWall, rightWall, this.staticCircle])

    const Events = Matter.Events
    Events.on(this.engine, 'beforeUpdate', this.matterBeforeUpdate.bind(this))

    this.render()

    // NOTE: resetInterval後に円を肥大化させる。
    window.setTimeout(() => {
      this.shouldExpand = true
    }, this.resetInterval)
  }

  deleteAllBodyData () {
    if (this.engine === undefined) return 
    
    const bodies = Matter.Composite.allBodies(this.engine.world)
    super.deleteAllBodyData()

    Matter.Events.off(this.engine)
    if (bodies !== undefined || bodies.length > 0) {
      // Matter.World.clear(this.engine, false) 
    }
    Matter.Engine.clear(this.engine)
  }

  matterBeforeUpdate (event) {
    const Body = Matter.Body
    for (let i = 0; i < this.bottomBodyList.length; i++) {
      const wordBody = this.bottomBodyList[i]
      Body.setVelocity(wordBody, {x: 0, y: -3})
    }

    if (this.shouldExpand) {
      // NOTE: 円の拡大開始
      this.staticCircle.circleRadius *= this.expandRate
      Body.scale(this.staticCircle, this.expandRate, this.expandRate)

      const maxRadius = Math.sqrt(Math.pow(this.screenWidth / 2, 2) + Math.pow(this.screenHeight / 2, 2))
      if (this.staticCircle.circleRadius > maxRadius * 4) {
        this.shouldExpand = false

        this.stopAnimation()
        this.initialize(this.wordDataList)
      }
    }
  }
}
