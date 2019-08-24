import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP {
  getLatest(Callback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        Callback(res)
        this._setLatestIndex(res.index)

        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  getClassic(index, nextOrPrevious,Callback){
    // 请求数据前 在缓存中查找 or 服务器，再写入缓存
    // 确定key
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)  // 缓存中查看是否有该数据
    if (!classic) {                       // 没有则向服务器发送请求
      this.request({
        // url: 'classic/' + index + '/' + nextOrPrevious,
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res) // 把获得的数据写到缓存中
          Callback(res)
        }
      })
    } else {
      Callback(classic)
    }
  }
  isFirst(index) {
    return index ==1 ? true : false
  }
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }
  _getKey(index){
    // 获取key值 key由我们自己定义  key可以区分不同的期刊
    let key = 'classic-' + index
    return key
  }
}

export { ClassicModel}