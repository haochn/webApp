$(function(){
	var height=window.screen.height;
	$('.index').css('min-height',height);
	setStyle();
	setTimeout(function(){

		window.location.href="./bookframe.html";

	},3000);
});

function setStyle(){
	var data_reader={
		content:[
			['劳于读书，逸于作文。','--  程端礼'],
			['读书之法，在循序而渐进，熟读而精思。','--  朱熹'],
			['读书何所求?将以通事理。','--  张维屏'],
			['外物之味，久则可厌，读书之味，愈久愈深。','--  程颐'],
			['纸上得来终觉浅，绝知此事要躬行','--  陆游'],
			['一日无书，百日荒芜。','--  陈寿']
			]
	}
	var _says=$('.says'),
		_author=$('.author'),
		_length=data_reader.content.length,
		num=Math.floor(Math.random()*_length);
	_says.text(data_reader.content[num][0]);
	_author.text(data_reader.content[num][1]);
}