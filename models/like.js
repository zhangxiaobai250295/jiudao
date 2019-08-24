import {HTTP} from '../util/http.js'

class LikeModel extends HTTP {
  // 更新服务器 点赞或者取消点赞的信息
  like(behavior, artID, category) {
    let url = behavior == 'like' ? 'like' : '/like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }
  // 获取点赞信息
  getClassicLikeStatus(artID, category, Callback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: Callback
    })
  }
}

export { LikeModel }