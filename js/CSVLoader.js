import axios from 'axios'

class CSVLoader {
  loadData (path) {
    let csvData = []
    let promise = new Promise(function (resolve, reject) {
      // NOTE: awaitは非同期処理が終わるまで待機する
      //       async関数内でしか使用できない
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
      axios.get(path, {headers: headers}).then((response) => {
        const arr = response.data.trim().replace(/"/g, '').split('\n')
        csvData = arr.map(v => v.split(','))
        resolve(csvData)
      }).catch((e) => {
        reject(e)
      })
    })

    return promise
  }
}

const csvLoader = new CSVLoader()
export default csvLoader
