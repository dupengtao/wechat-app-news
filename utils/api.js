var HOST_URI= 'http://wcf.open.cnblogs.com/news/';

var RECENT_NEWS = 'recent/paged/';

var ITEM_NEWS = 'item/';

function _getRecentNews(index){
    var url = HOST_URI+RECENT_NEWS+index+'/30'
    console.log(url);
	return url;
}

function _getItemNews(id){
    var url = HOST_URI+ITEM_NEWS+id;
    console.log(url);
	return url;
}

module.exports = {
	getRecentNews: _getRecentNews,
	getItemNews: _getItemNews
};