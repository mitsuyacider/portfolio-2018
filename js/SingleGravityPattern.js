import Matter from 'matter-js'
import BasePhysicalPattern from './BasePhysicalPattern'
import config from '@/static/config/pattern1.json'

export default class SingleGravityPattern extends BasePhysicalPattern {
  constructor (canvas) {
    super(canvas)
    this.shouldDown = false
    this.groundBody = {}

    // NOTE: Set animation settings
    this.recreateInterval = config.recreateInterval
    this.createDuration = config.createDuration
    this.restitution = config.restitution
    this.friction = config.friction
    this.density = config.density
    this.frictionAir = config.frictionAir
    this.isDebug = config.isDebug
    this.resetInterval = config.resetInterval
    this.maxFontSize = config.maxFontSize
    this.minFontSize = config.minFontSize
    this.minColor = config.minColor
  }

  initialize (data) {
    const needBottomBody = false
    super.initialize(data, needBottomBody)

    // NOTE: Create walls
    const World = Matter.World
    const Bodies = Matter.Bodies
    this.groundBody = Bodies.rectangle(this.screenWidth / 2, this.screenHeight, this.screenWidth, 2, { isStatic: true })
    const leftWall = Bodies.rectangle(0, 0, 2, this.screenHeight * 2, { isStatic: true })
    const rightWall = Bodies.rectangle(this.screenWidth, 0, 2, this.screenHeight * 2, { isStatic: true })
    World.add(this.engine.world, [this.groundBody, leftWall, rightWall])

    this.render()

    // NOTE: resetInterval後に円を肥大化させる。
    window.setTimeout(() => {
      this.shouldDown = true
    }, this.resetInterval)
  }

  matterBeforeUpdate (event) {
    // NOTE: 座標が更新される前に各ボディを回転させないように設定させる
    // http://brm.io/matter-js/docs/classes/Body.html#method_setAngularVelocity
    const Body = Matter.Body
    for (let i = 0; i < this.topBodyList.length; i++) {
      const wordBody = this.topBodyList[i]
      Body.setAngularVelocity(wordBody, 0)
    }

    if (this.shouldDown) {
      Matter.Composite.remove(this.engine.world, this.groundBody)
      this.shouldDown = false

      window.setTimeout(() => {
        this.stopAnimation()
        this.initialize(this.wordDataList)
      }, this.recreateInterval)
    }
  }
}
