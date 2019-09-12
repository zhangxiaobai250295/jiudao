// pages/book-detail/book-detail.js
import {BookModel} from '../../models/book.js'
import {LikeModel} from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    bookDetail: null,
    likeStatus: false,
    likeCount: 0,         // 评论数
    posting: false  // 设定短评的输入界面不显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    const bid = options.bid
    // 得到三个promise对象
    const detail = bookModel.getDetail(bid)           // 详情信息
    const comments = bookModel.getComments(bid)       // 短评信息
    const likeStatus = bookModel.getLikeStatus(bid)   // 点赞信息
   
    Promise.all([detail, comments, likeStatus])
    .then(res => {
      this.setData({
        bookDetail: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading()
    })
    // 赋值
    // detail.then(res => {
    //   this.setData({
    //     bookDetail: res
    //   })
    // })
    // comments.then(res => {
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
    // likeStatus.then(res => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
  },
  onLike: function(event){
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.bookDetail.id, 400)
  },
  onFakePost: function(){    // 点击短评输入框  显示短评的界面
    this.setData({
      posting: true
    })
  },
  onCancel: function () {    // 点击取消  隐藏短评的界面
    this.setData({
      posting: false
    })
  },
  onPost(event){
    const comment = event.detail.text || event.detail.value
    if(!comment){
      return
    }
    if(comment.length > 12){
      wx.showToast({
        title: '短评最多12个字',
      })
      return
    }
    bookModel.postComment(this.data.bookDetail.id, comment)
    .then(res => {
      wx.showToast({
        title: '+ 1',
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({   // 更新数据
        comments: this.data.comments,
        posting: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})