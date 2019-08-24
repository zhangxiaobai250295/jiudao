// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: {
      type: String
    },
    title: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  attached: function(event){
    console.log(111)
    this._recoverStatus()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function() {
      // 切换播放 or 暂停的图片  需要一个变量playing来控制
      if(!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus: function(){
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return
      }
      if(mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function() {
      console.log(222)
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      }) 
      mMgr.onStop(() => {
        this._recoverStatus()
      }) 
      mMgr.onEnded(() => {
        this._recoverStatus()
      })  
    }
  }
})
