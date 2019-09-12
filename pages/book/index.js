// pages/book/index.js
import { BookModel } from '../../models/book.js'
import {random} from '../../util/common.js'

const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,         // 规定了是否呈现搜索页面还是book的首页
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: async function (options) {
  //   const books = await bookModel.getHostList()
  //     // .then((res) => {    从promise改写成 async 和await的形式
  //     //   this.setData({    或者使用es6的简写 不要写function
  //     //     books: res
  //     //   })
  //     // })
  // },
   /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options){
    const books = await bookModel.getHostList()
    this.setData({
      books
    })
  },
  onSearching: function(event){
    this.setData({
      searching: true
    })
  },
  onCancel:function(event){
    this.setData({
      searching: false
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
    this.setData({
      more: random(16)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})