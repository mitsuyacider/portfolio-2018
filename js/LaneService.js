
import Lane from '@/js/Lane'
import MathUtils from '@/js/MathUtils'
import config from '@/static/config/pattern2.json'

export default class LaneService {
  constructor (speed) {
    this.laneList = []
    this.allWordData = []
    this.currentIndex = 0
    this.speed = speed
    this.maxSize = 0
    this.minSize = 0

    // NOTE: 設定用パラメータ
    this.minFontSize = config.minFontSize
    this.maxFontSize = config.maxFontSize
    this.minColor = config.minColor
  }

  isOverlay (target) {
    for (let i = 0; i < this.laneList.length; i++) {
      const lane = this.laneList[i]
      const isOverlay = lane.isOverlay(target)

      if (isOverlay) {
        return true
      }
    }

    return false
  }

  updateLayout () {
    for (let i = 0; i < this.laneList.length; i++) {
      const lane = this.laneList[i]
      lane.updatePosition()

      // NOTE: laneアニメーションが終了したら、laneListから削除して
      //       新規ワードを注入する
      if (lane.isDone) {
        this.laneList.splice(i, 1)
        this.addLaneIfNeed()
      }
    }
  }

  updateIndex () {
    this.currentIndex++
    if (this.currentIndex > this.allWordData.length - 1) {
      this.currentIndex = 0
    }
  }

  // 全データと現在のリストデータに差分があれば、追加していく
  addLaneIfNeed () {
    // NOTE: 新しいワードを注入する
    const wordData = this.createWordData(this.allWordData[this.currentIndex])
    const isInitial = false
    const lane = this.createLane(wordData, isInitial)

    if (lane !== null) {
      this.laneList.push(lane)
      this.updateIndex()
    }
  }

  createWordData (data) {
    const size = parseInt(data[1], 10)
    const val = MathUtils.map(size, this.minSize, this.maxSize, this.minFontSize, this.maxFontSize)

    let colorVal = Math.floor(MathUtils.map(size, this.minSize, this.maxSize, this.minColor, 255))
    const color = 'rgb(' + colorVal + ',' + colorVal + ',' + colorVal + ')'

    const wordData = {}
    wordData.word = data[0]
    wordData.size = val
    wordData.color = color

    return wordData
  }

  createLane (wordData, isInitial) {
    const screenSize = window.screen

    let x = Math.random() * screenSize.width
    let y = isInitial ? Math.random() * screenSize.height : screenSize.height

    // NOTE: 文字が見切れてしまう場合は、画面の左端に表示されるようにする。
    if (x + wordData.size > screenSize.width) {
      x = screenSize.width - wordData.size
    }
    if (y + wordData.size * wordData.word.length > screenSize.height && isInitial) {
      y = screenSize.height - wordData.size * wordData.word.length
    }

    const lane = new Lane()

    lane.position.x = x
    lane.position.y = y
    lane.fontSize = wordData.size
    lane.speed = this.speed
    lane.text = wordData.word
    lane.fillStyle = wordData.color

    // NOTE: 文字が重なっていなければ、描画対象として追加する
    const isOverlay = this.isOverlay(lane)
    if (isOverlay) {
      return null
    } else {
      return lane
    }
  }

  layoutInitialWords (data) {
    this.posY = 0
    this.allWordData = data

    // NOTE: 最大値、最小値を算出
    // @refs: https://numb86-tech.hatenablog.com/entry/2017/08/05/093326
    this.maxSize = Math.max(...data.map(m => m[1]))
    this.minSize = Math.min(...data.map(m => m[1]))

    // NOTE: 選択可能なワード情報を作成する
    for (let i = 0; i < data.length; i++) {
      const wordData = this.createWordData(data[i])
      const isInitial = true
      const lane = this.createLane(wordData, isInitial)

      if (lane !== null) {
        this.laneList.push(lane)
      }
    }

    this.currentIndex = this.laneList.length - 1
    this.updateIndex()
  }
}
