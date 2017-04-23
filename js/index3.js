
(function(){	
	var Util,
		xhr,
		chapter_id_3;


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

		 $.get('./data/3/chapter.json',function(data){
			var url,
				totalChapter=data.chapters.length;
				
			//初始加载页面
			getData();
			setList()
			//设置目录信息、
			function setList(){
			//todo 渲染目录结构
				var list=$('.list_li'),
					html='';
				for(var i=0;i<totalChapter;i++){
					html+='<li><a href="#'+i+'">'+data.chapters[i].title+'</a></li>';
					// console.log(html)
				}
				list.html(html);
			}

			function getData(){
			//todo 实现与阅读器相关的数据交互方法
			
				//如果成功则获取数据
				if(data.result==0){
					//设置默认id为0（第一章节内容）
					chapter_id_3=Util.StorageGetter('chapter_id_3');
					chapter_id_3=parseInt(chapter_id_3,10);
					chapter_id_3=chapter_id_3||0;
					url='./data/3/data'+chapter_id_3+'.json';
					
					//获取相应的章节信息
				
					$.get(url,function(data){
						// console.log(data);
						if(data.result==0){
							var url;
							url=data.jsonp;
							$.jsonp({
				        		url:url,
				        		cache:true,
				        		callback:"mingyang_fiction_chapter",

				        		success:function(result){
				        			        			
				        			var data=$.base64.decode(result),
				        				json =decodeURIComponent(escape(data)),
				        				jsonObj=JSON.parse(json),
				        				html;
				        			// console.log(json);
				        			html='<h4>'+jsonObj.t+'</h4>';

				        			for(var i=0;i<jsonObj.p.length;i++){
				        				html+='<p>'+jsonObj.p[i]+'</p>';
				        			}
				        			$('#fiction_container').html(html);
				        			// var listBg=Util.StorageGetter('background_color');
            			// 			$('.list').css('background',listBg);
				        		}
				        	});
						}else{
							console.log('获取相应的章节的url失败！！')
						}
						

					},'json');
				
				}else{
					console.log('获取章节信息失败！！')	
				}
			};
		//下一页功能
		$('#next_button').click(function(){
			chapter_id_3=parseInt(chapter_id_3,10);
			if(chapter_id_3>=totalChapter){			
				return ;
			}
			chapter_id_3+=1;
			
			Util.StorageSetter('chapter_id_3',chapter_id_3)
			getData()
			$('.bookBody').css({scrollTop:0});
			
		})
		//上一页功能
		$('#prev_button').click(function(){
			chapter_id_3=parseInt(chapter_id_3,10);
			
			if(chapter_id_3<=0){
				// chapter_id_3=0;
				return ;
			}
			chapter_id_3-=1;
			
			Util.StorageSetter('chapter_id_3',chapter_id_3);
			getData()
			$('.bookBody').css({scrollTop:0},500);
			
			
		})
		//左滑右滑切换上一章和下一章
		
		$('#action_mid').on('swipeLeft',function(){
			chapter_id_3=parseInt(chapter_id_3,10);
			
			if(chapter_id_3<=0){
				
				return ;
			}
			chapter_id_3-=1;
			
			Util.StorageSetter('chapter_id_3',chapter_id_3);
			getData();
			$('.bookBody').css({scrollTop:0},500);
			
		});
		$('#action_mid').on('swipeRight',function(){
			chapter_id_3=parseInt(chapter_id_3,10);
			if(chapter_id_3>=totalChapter){			
				return ;
			}
			chapter_id_3+=1;
			
			Util.StorageSetter('chapter_id_3',chapter_id_3)
			getData()
			$('.bookBody').css({scrollTop:0},500);
		});
		
		 $('.return').click(function(){
        	window.location.href="./book3.html";
    	});
		$('.list_li li').each(function(){
			$(this).click(function(){
				var id;
				id=$(this).find('a').attr('href').split('#')[1];
				id=parseInt(id);

				chapter_id_3=id;
				
				Util.StorageSetter('chapter_id_3',chapter_id_3);
				window.location.href="./book3.html"

			})
		})
		$('#menu_button').click(function(){
            var listBg=Util.StorageGetter('background_color');
         
            window.location.href="./booklist3.html"
           
        });
			
		},'json');

	
})();
