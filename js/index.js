
(function(){	
	var Util,
		xhr,
		chapter_id;


	//设置set，get方法
	Util = (function() {
        var StorageGetter = function(key) {
            return localStorage.getItem(key);
        };
        var StorageSetter = function(key, value) {
            return localStorage.setItem(key,value);
        };
        return {		
			StorageGetter : StorageGetter,
			StorageSetter : StorageSetter
		}
    })();

	//获取章节信息
	$.get('./data/1/chapter.json', function(data) {
	    var url,
	        totalChapter = data.chapters.length;
	    //初始加载页面
	    getData();
	    setList()
	    //设置目录信息、
	    function setList() {
	        //todo 渲染目录结构
	        var list = $('.list_li'),
	            html = '';
	        for (var i = 0; i < totalChapter; i++) {
	            html += '<li><a href="#' + i + '">' + data.chapters[i].title + '</a></li>';
	            // console.log(html)
	        }
	        list.html(html);
	    }

	    function getData(id) {
	        //todo 实现与阅读器相关的数据交互方法
	        //如果成功则获取数据
	        if (data.result == 0) {
	            //设置默认id为0（第一章节内容）
	            chapter_id = Util.StorageGetter('chapter_id');
	            chapter_id = parseInt(chapter_id, 10);
	            chapter_id = chapter_id || 0;
	            url = './data/1/data' + chapter_id + '.json';
	            //获取相应的章节信息
	            //获取相应的章节信息				
	            $.get(url, function(data) {
	                // console.log(data);
	                if (data.result == 0) {
	                    var url;
	                    url = data.jsonp;
	                    $.jsonp({
	                        url: url,
	                        cache: true,
	                        callback: "mingyang_fiction_chapter",
	                        success: function(result) {
	                            var data = $.base64.decode(result),
	                                json = decodeURIComponent(escape(data)),
	                                jsonObj = JSON.parse(json),
	                                html;
	                            // console.log(json);
	                            html = '<h4>' + jsonObj.t + '</h4>';
	                            for (var i = 0; i < jsonObj.p.length; i++) {
	                                html += '<p>' + jsonObj.p[i] + '</p>';
	                            }
	                            $('#fiction_container').html(html);
	                        }
	                    });
	                } else {
	                    //显示加载弹窗
	                    $('.wait-loading-shadow').show();
	                    console.log('获取相应的章节的url失败！！')
	                }
	            }, 'json');
	        } else {
	            console.log('获取章节信息失败！！');
	        }
	    }
	    //下一页功能
	    $('#next_button').click(function() {
	        chapter_id = parseInt(chapter_id, 10);
	        if (chapter_id >= totalChapter) {
	            return;
	        }
	        chapter_id += 1;
	        Util.StorageSetter('chapter_id', chapter_id)
	        getData()
	        $('.bookBody').css({
	            scrollTop: 0
	        });
	    })
	    //上一页功能
	    $('#prev_button').click(function() {
	        chapter_id = parseInt(chapter_id, 10);
	        if (chapter_id <= 0) {
	            // chapter_id=0;
	            return;
	        }
	        chapter_id -= 1;
	        Util.StorageSetter('chapter_id', chapter_id);
	        getData()
	        $('.bookBody').css({
	            scrollTop: 0
	        }, 500);
	    })

	    $('.return').click(function() {
	        window.location.href = "./book.html";
	    });
	    $('.list_li li').each(function() {
	        $(this).click(function() {
	            var id;
	            id = $(this).find('a').attr('href').split('#')[1];
	            id = parseInt(id);
	            chapter_id = id;
	            Util.StorageSetter('chapter_id', chapter_id);
	            window.location.href = "./book.html"
	        })
	    })
	    $('#menu_button').click(function() {
	        var listBg = Util.StorageGetter('background_color');
	        window.location.href = "./booklist.html"
	        $()
	    });
	}, 'json');    

	
})();
