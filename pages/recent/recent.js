//recent.js

var Api = require('../../utils/api.js');
var x2j = require('../../utils/xmlToJSON.js');

//获取应用实例
var app = getApp();

//

var lowerTimeStamp = 0;

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    entry: [],
    pageIndex: 1,
    systemInfo: {},
    hidden: false
  },
  lower: function (e) {
    console.error('lower');
    console.error(e);
    var ts = e.timeStamp;
    console.error(ts);
    console.error((ts - lowerTimeStamp) > 2000);
    if (ts - lowerTimeStamp > 2000) {
      this.fetchData();
      lowerTimeStamp = e.timeStamp;
    }
  },
  redictDetail: function (e) {
    console.log(e);
    var id = e.currentTarget.dataset.newsId;
    var url = '../article/article?id=' + id ;
    wx.navigateTo({
      url: url
    })
  },
  //事件处理函数
  bindViewTap: function () {
    var that = this;
    wx.navigateTo({
      url: '../logs/logs'
    })
    this.fetchData();
  },
  fetchData: function () {
    var that = this;
    that.setData({
      hidden: false
    })
    wx.request({
      url: Api.getRecentNews(that.data.pageIndex),
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        var news = x2j.parseString(res.data);
        console.log('request success');
        var newData = that.data.entry.concat(news.feed.entry);
        // console.log(newData);
        that.setData({
          entry: newData,
          pageIndex: that.data.pageIndex + 1,
          hidden: true
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        console.log('complete')
        console.log(that.data.entry);
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    //获取系统参数
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res
        })
      }
    })
    this.fetchData();
  }
})
