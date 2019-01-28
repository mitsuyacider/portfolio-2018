export default class MathUtils {
  static map (value, fromMin, fromMax, toMin, toMax) {
    let result = 0

    result = (value <= fromMin)
      ? toMin : (value >= fromMax)
        ? toMax : (() => {
          let ratio = (toMax - toMin) / (fromMax - fromMin)
          return (value - fromMin) * ratio + toMin
        })()

    return result
  }
}
