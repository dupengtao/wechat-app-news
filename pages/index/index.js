//index.js

var Api = require('../../utils/api.js');
var x2j = require('../../utils/xmlToJSON.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    entry:[],
    pageIndex:1
  },
  //事件处理函数
  bindViewTap: function() {
    var that = this;
    wx.navigateTo({
      url: '../recent/recent'
    })
    this.fetchData();
  },
  fetchData: function(){
    var that = this;
    wx.request({
      url: Api.getRecentNews(that.data.pageIndex),
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        // success
        var news = x2j.parseString(res.data);
        console.log('request success');
        console.log(news);
        that.setData({
          entry:news.feed.entry
        });
        var index = that.data.pageIndex++;
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });

    this.fetchData();
  }
})
