import { HTTP } from '../util/http-promise.js'

class BookModel extends HTTP{
  getHostList() {         // 获取热门书籍
    return this.request({
      url: 'book/hot_list'
    })
  }
  getMyBookCount() {      // 获取喜欢书籍数量
    return this.request({
      url: 'book/favor/count'
    })
  }

  getDetail(bid) {          // 获取喜欢书籍的详情
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  getLikeStatus(bid){  // 获取点赞状态
    return this.request({
      url: `/book/${bid}/favor`
    })
  }

  getComments(bid){   // 获取短评信息
    return this.request({
      url: `/book/${bid}/short_comment`
    })
  }
  postComment(bid, comment){  // 提交短评信息
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }
  search(start, q){         // 获取搜索结果
    return this.request({
      url: 'book/search?summary=1',
      data:{
        q:q,                // 搜索内容,比如你想搜索python相关书籍,则输入python
        start: start        // 开始记录数，默认为0
      }
    })
  }
}

export { BookModel}