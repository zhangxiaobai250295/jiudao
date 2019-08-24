import {config} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP{
  request({url, data={}, method='GET'}){
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
      
    })
  }
  //  1： this._request({             2：this._request(url, resolve, reject, data, method)
      //   url: url,                    
      //   resolve: resolve,           // 解构赋值 和 (url, resolve, reject)两种传参方式 那种方便用那种
      //   reject: reject,
      //   data: data,
      //   method: method
      // })
  //  _request(url, resolve, reject, data = {}, method = 'GET')
  _request(url, resolve, reject, data = {}, method = 'GET'){
    // 必填参数必须写在默认参数的前面
    // url data method
    wx.request({
      url: config.api_base_url + url,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      method: method,
      success: (res) => {
        let code = res.statusCode.toString()  // startsWith  以什么开头 endsWith 以什么结尾
        if(code.startsWith('2')){
          resolve(res.data)  // 改变为成功的状态
        } else {
          reject()          // 改变为失败的状态
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()          // 改变为失败的状态
        this._show_error(1)
      }
    })
  }
  _show_error(error_code) {
    if(!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}