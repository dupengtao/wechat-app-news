//logs.js
var Api = require('../../utils/api.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    // content: '',
    // title: ''
  },
  onLoad: function (e) {
    // console.log(e);
    this.fetchNewsData(e.id);
  },
  fetchNewsData: function (id) {
    var that = this;
    wx.request({
      url: Api.getItemNews(id),
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/json' }, // 设置请求的 header
      success: function (res) {
        // success
        // console.log(res);
        var d = res.data.Content;
        var regex = /(<([^>]+)>)/ig;
        var result = d.replace(regex, "");
      
        // that.setData({
        //   content: result,
        //   title: res.data.Title
        // })

        WxParse.wxParse('article', 'html', d, that,5);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        console.log(that.data);
      }
    })
  }
})
