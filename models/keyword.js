// search页面历史记录、热门搜索的models
import { HTTP } from '../util/http-promise.js'
class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10
  getHistory(){
    const words = wx.getStorageSync(this.key)
    if(!words){
      return []
    }
    return words
  }

  getHot(){
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  addToHistory(keyword){         // 把搜索的信息添加到缓存中  其实这种实现的方法是一种队列
    let words = this.getHistory()
    const has = words.includes(keyword)

    if(!has){
      // 判断添加的内容是否超过规定的数组长度  超过 把原先数组的末尾元素删除 再把刚刚搜索的元素添加到数组的第一位
      const length = words.length
      if(length >= this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export { KeywordModel}