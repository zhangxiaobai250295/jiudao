// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: true,
    first: false,
    // 这两个变量用来存放点赞的数据 本来的数据是存放在classicData里面
    // 现在为了解决缓存问题带来的点赞不更新问题  把classicData点赞的信息独立出来  方便修改
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {  // 获取最新期刊的数据
      console.log(res)
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },
  // 点击点赞或者取消点赞
  onLike:function(event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },
  // 下一页
  onNext:function(event){
    this._updateClassic('next')
  },
  // 上一页
  onPrevious:function(event){
    this._updateClassic('previous')
  },
  // 左右切换时重新请求数据
  _updateClassic: function (nextOrPrevious) {
    let index = this.data.classicData.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      // console.log(res)
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  _getLikeStatus: function(artID, category){
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
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