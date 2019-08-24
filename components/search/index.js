// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'

import { paginationBev} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],             // 公共的行为
  properties: {
    more:{
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWord: [],
    // searchData: [],                  // 公共的行为已经定义了  会覆盖掉这个
    searching: false,
    q: '',
    // loading:  false,                 // 公共的行为已经定义了  会覆盖掉这个 是否在加载更多的数据
    loadingCenter: false
  },
  attached(){
    const historyWord = keywordModel.getHistory()
    const hotWord = keywordModel.getHot()
    this.setData({
      historyWord: historyWord
    })

    hotWord.then(res => {
      this.setData({
        hotWord: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
      
      // 问题1：用户操作过快  没等数据返回  又有一次触底事件  这样会返回重复的数据
      // 解决1：可以等上一次的请求结束后再去执行下一个请求  可以采用一个“锁”的概念

      // 问题2：当服务器已经加载完所有的数据后  在有触底事件  还是会继续像服务器发送请求  会造成服务器资源浪费
      // 解决1：当请求服务器拿到的数据会有一个tatol数据，里面保存了该搜索条件在服务器中有多少条数据  通过判断searchData的长度来决定是否还要继续向服务器发送请求
      // 解决2：当请求服务器返回的数据是一个null或者是个空数组时，下一次则不再像服务器发请求（问题：可能某次因为网络的原因而引起的返回数据是空，与我们的需求不符合）
      

      if (!this.data.q) {                   // 当我们有搜索条件的时候才执行下面的代码
        return
      }
      if(this.isLcked()){                  // 是否上了锁  
        return                              // 如果在执行请求 则不执行下面的代码
      }
      this.locked()                        // 执行来到这里,则表示之前没有在执行搜索  加锁
                                            // this.data.loading = true 如果这样设置值  wxml不会更新该值  而如果wxml并没有绑定（用到）该值，也是可以这么设置的
      if(this.hasMore()){
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.unLocked()                  // 释放锁
        },() =>{
          this.unLocked()                  // 释放锁，避免死锁的情况（例：如果请求时断网了，但是上了锁，而释放锁的操作是在请求成功的回调函数中，所以锁不会被释放，而在                                                此联网之后，后续的请求操作就不会在运行）
        })
      }
    },
    onDelete(event){
      this.initialize()               // 调用公共行为的初始化方法
      this._closeResult()
    },
    onCancel(event){
      this.initialize()               // 调用公共行为的初始化方法
      this.triggerEvent('cancel')
    },
    onConfirm(event){
      const q = event.detail.value || event.detail.text           // 取到用户要搜索的信息
      this.setData({                // input的value绑定了q(数据的双向绑定) 所以在这给q赋值
        q: q
      })
      this._showLoadingCenter()
      this._showResult()              // 显示搜索结果页面
     
      bookModel.search(0, q).then(res => {                  
        this.setMoreData(res.books)   // 调用公共行为的方法
        this.setTotal(res.total)

        keywordModel.addToHistory(q) // 把q添加到历史搜索记录的数组中去
        this._hideLoadingCenter()
      })
    },
    _showResult(){                   // 显示搜索结果的页面
      this.setData({
        searching: true
      })
    },
    _closeResult() {                 // 隐藏搜索结果的页面
      this.setData({
        searching: false,
        q: ''                        // 重置搜索输入框的文本
      })
    },
    _showLoadingCenter(){               //显示加载动画
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {               //关闭加载动画
      this.setData({
        loadingCenter: false
      })
    }
  }
})
