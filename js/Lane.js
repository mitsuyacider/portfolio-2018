export default class Lane {
  constructor () {
    this.position = {}
    this.position.x = 0
    this.position.y = 0
    this.speed = 0
    this.text = ''
    this.fontSize = 10
    this.fillStyle = 'rgb(255, 255, 255)'
    this.isDone = false
  }

  isOverlay (target) {
    const targetCenterX = target.position.x + target.fontSize / 2
    const targetCenterY = target.position.y + (target.fontSize * target.text.length) / 2
    const centerX = this.position.x + this.fontSize / 2
    const centerY = this.position.y + (this.fontSize * this.text.length) / 2

    const srcHeight = target.fontSize * target.text.length
    const dstHeight = this.fontSize * this.text.length
    const distanceX = Math.abs(targetCenterX - centerX)
    const distanceY = Math.abs(targetCenterY - centerY)
    const isOverlay = (distanceX < target.fontSize / 2 + this.fontSize / 2 &&
                        distanceY < srcHeight / 2 + dstHeight / 2)

    return isOverlay
  }

  updatePosition () {
    this.position.y -= this.speed

    if (this.position.y + this.fontSize * this.text.length < 0) {
      // this.position.y = window.screen.height
      this.isDone = true
    }
  }
}
