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
    isLcked() {                       // 是否上了锁
      return this.data.loading ? true : false
    },
    locked() {                        // 加锁
      this.setData({
        loading: true
      })
    },
    unLocked() {                      // 释放锁
      this.setData({
        loading: false
      })
    }
  }
})

export { paginationBev}