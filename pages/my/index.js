// pages/my/index.js
import {ClassicModel} from '../../models/classic.js'
import {BookModel} from '../../models/book.js'
import {
  promisic
} from '../../util/common.js'
const calssicModel = new ClassicModel()
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,   // 控制显示button授权按钮 or 用户头像
    userInfo: null,
    bookCount: 0,          // 喜欢的书的数量
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },
  getMyBookCount(){
    bookModel.getMyBookCount()
      .then(res=>{
        this.setData({
          bookCount: res.count
        })
      })
  },
  getMyFavor(){                   // 获取我喜欢的期刊
    calssicModel.getMyFavor(res=>{
      this.setData({
        classics: res
      })
    })
  },
  userAuthorized(){
    wx.getSetting({
      success:res=>{
        if (res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: (res)=>{
              this.setData({
                authorized: true,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  userAuthorized1() {
    promisic(wx.getSetting)()
      .then(data => {
        if (data.authSetting['scope.userInfo']) {
          return promisic(wx.getUserInfo)()
        }
        return false
      })
      .then(data => {
        if (!data) return
        this.setData({
          authorized: true,
          userInfo: data.userInfo
        })
      })
  },
  async userAuthorized2() {
    const data = await promisic(wx.getSetting)()
    if (data.authSetting['scope.userInfo']) {
      const res = await promisic(wx.getUserInfo)()
      const userInfo = res.userInfo
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },
  onGetUserInfo(event){ 
    const userInfo = event.detail.userInfo
    if(userInfo){
      this.setData({
        userInfo: userInfo,
        authorized: true
      })
    }
  },
  onJumpToAbout(){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onStudy(){
    wx.navigateTo({
      url: '/pages/course/course',
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
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
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