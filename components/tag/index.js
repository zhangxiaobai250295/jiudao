// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses:['tag-class'],     // 启动外部样式
  options: {            // 启动slot插槽
    multipleSlots: true
  },
  properties: {
    text: {
      type: String
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
    onTap:function(event){
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})
