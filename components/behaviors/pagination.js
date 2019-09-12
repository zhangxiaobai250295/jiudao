// 书籍搜索模块的公共js

const paginationBev = Behavior({
  data:{
    searchData: [],
    total: null,         // 数据的总个数
    noneResoult: false,  // 搜索是否有值
    loading: false
  },
  methods: {
    setMoreData(dataArray) {   //dataArray  获取到的数据
      const tempArray = this.data.searchData.concat(dataArray)
      this.setData({
        searchData: tempArray
      })
    },
    getCurrentStart(){          // 获取请求搜索的起始记录数
      return this.data.searchData.length
    },
    hasMore(){                  // 服务器是否还有数据
      if(this.data.searchData.length >= this.data.total){
        return false
      } else{
        return true
      }
    },
    setTotal(total){
      this.setData({
        total: total
      })
      if(total == 0){
        this.setData({
          noneResoult: true
        })
      }
    },
    initialize(){    // 初始化
      this.setData({
        searchData: [],
        total: null,
        noneResoult: false,
        loading: false
      })
    },
    isLcked() {                       // 是否上了锁   loading控制着锁的打开和释放 同时 控制着底部加载动画的显隐
      return this.data.loading ? true : false
    },
    locked() {                        // 加锁     发送数据请求
      this.setData({
        loading: true                 // 显示底部的加载动画
      })
    },
    unLocked() {                      // 释放锁   数据请求回来了
      this.setData({
        loading: false                // 隐藏底部的加载动画
      })
    }
  }
})

export { paginationBev}