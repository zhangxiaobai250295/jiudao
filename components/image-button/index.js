// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true     // 开启插槽功能
  },
  properties: {
    openType:{
      type: String,
      observer: function(newValue,oldValue){
        // console.log(newValue)
        // console.log(oldValue)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event){
      // console.log(event.detail)
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})