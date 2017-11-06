(function() {

	var chapter_id,
		Util;
	//封装localStorage的获取和设置方法
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


    //dom节点的缓存
    //  bottom_tool_bar:上下页部分
	
	//  top_nav: 顶部功能菜单
	//  bottom_nav: 底部功能菜单
	   
	var Dom = {
	    bottom_tool_bar: $('#bottom_tool_bar'),
	    nav_title: $('#nav_title'),
	    bk_container: $('#bk-container'),
	    night_button: $('#night-button'),
	    next_button: $('#next_button'),
	    prev_button: $('#prev_button'),
	    back_button: $('#back_button'),
	    top_nav: $('#top-nav'),
	    bottom_nav: $('.bottom_nav')
	}
    var Win = $(window),
		Doc = $(document),
  		body=$('body'),
 		night_bg,
  		day_bg,
  		InitFontSize,
        InitBgColor,
  		RootContainer=$('#fiction_container');//信息内容展示容器
  		
    function main() {
        //todo 设置入口函数
       EvenHanlder();
       
    }

    function EvenHanlder() {
        //todo 交互事件的绑定
        //
        //初始化的字体大小和背景颜色
        initBgAndFont();
        	
		//设置屏幕交互的相关静态效果
		setScreenEffect();

      	//设置字体
        setFont();

        //设置底部效果
       	setBottomEffect();
		//实现上下翻页功能		
    }

    //设置初始变量
    //初始化的字体大小和背景颜色
    function initBgAndFont() {
       
        InitFontSize = Util.StorageGetter('font_size');
        InitFontSize = parseInt(InitFontSize, 10);
        if (!InitFontSize) {
            InitFontSize = 14;
        }
        RootContainer.css('font-size', InitFontSize);
        //初始化背景色
        InitBgColor = Util.StorageGetter('background_color');
        if (!InitBgColor) {
            InitBgColor = '#e9dfc7';
        }
        body.css('background-color', InitBgColor);        
    }

    //设置屏幕交互的相关静态效果
    function setScreenEffect() {
    	
    	var font_container = $('.font-container'),
            font_button = $('#font-button'),
            menu_container = $('#menu_container'),
            bk_container = $('.bk-container'),
            bk_container_current = $('.bk-container-current');
            

        //点击屏幕中间显示上下功能导航栏
        $('#action_mid').click(function(){
            if (Dom.top_nav.css('display') == 'none') {
                //顶部菜单显示
                Dom.top_nav.show();
                Dom.bottom_tool_bar.show();
                //底部菜单显示
                Dom.bottom_nav.show();
                font_button.removeClass('current');
            } else {
                Dom.top_nav.hide();
                Dom.bottom_nav.hide();
                //字体小菜单隐藏
                font_container.hide();
            }
        });
        // 屏幕滚动隐藏上下导航栏
        Win.scroll(function() {
            Dom.top_nav.hide();
            Dom.bottom_tool_bar.show();
            Dom.bottom_nav.hide();
            //字体小菜单隐藏
            font_container.hide();
            font_button.removeClass('current');
        })
    }

    //设置字体
    function setFont() {
    	var font_container = $('.font-container'),
            font_button = $('#font-button'),
            menu_container = $('#menu_container'),
            bk_container = $('.bk-container'),
            bk_container_current = $('.bk-container-current');

        //字体放大
        $('#large-font').click(function() {
            //如果字体大于20则不再加大
            if (InitFontSize > 20) {
                return;
            }
            InitFontSize += 1;
            RootContainer.css('font-size', InitFontSize);
            Util.StorageSetter('font_size', InitFontSize);
        });
        //字体缩小
        $('#small-font').click(function() {
            //如果字体小于12则不再减小
            if (InitFontSize < 12) {
                return;
            }
            //每次字体大小减一
            InitFontSize -= 1;
            //设置字体大小
            RootContainer.css('font-size', InitFontSize);
            //将字体大小存入session，方便下次调用
            Util.StorageSetter('font_size', InitFontSize);
        });
    }

    //设置底部效果    
    function setBottomEffect() {
        //点击字体图标显示子菜单
        var font_container = $('.font-container'),
            font_button = $('#font-button'),
            menu_container = $('#menu_container'),
            bk_container = $('.bk-container'),
            bk_container_current = $('.bk-container-current'),
            index,
            bk_container_bg,
            bk_container_length;
        //字体菜单的显示与隐藏
        font_button.click(function() {
            if (font_container.css('display') == 'none') {
                font_container.show();
                font_button.addClass('current');
            } else {
                font_container.hide();
                font_button.removeClass('current');
            }
        });
        //背景的转化和夜间白天的切换
        bk_container.each(function() {
            $(this).click(function(i) {
                index = parseInt($(this).attr('data-index'), 10);
                //获取背景值：
                bk_container_bg = $(this).css('backgroundColor');
                //设置相应的效果
                bk_container_length = bk_container_current.length;
                for (var i = 0; i < bk_container_length; i++) {
                    var body_bg = $(this).css('backgroundColor'),
                        body_color = body_bg;
                    // night_bg=
                    if (i == index) {
                        //如果按钮的属性是黑夜，
                        if (i == 5) {
                            $('#day_icon').hide();
                            $('#night_icon').show();
                            night_bg = body_bg;
                            InitBgColor = body_bg;
                            Util.StorageSetter('background_color', InitBgColor);
                        }
                        $(bk_container_current[i]).show();
                        body.css({
                            background: body_bg,
                            color: body_color
                        });
                        InitBgColor = body_bg;
                        Util.StorageSetter('background_color', InitBgColor);
                    }
                    //其他的隐藏
                    else {
                        $(bk_container_current[i]).hide();
                        //处理夜间和白天的按钮
                        $('#day_icon').show();
                        $('#night_icon').hide();
                        Util.StorageSetter('background_color', InitBgColor);
                    }
                }
            });
        });
        //白天和夜晚按钮的相关操作
        //白天和夜晚的背景色
        night_bg = $(bk_container[5]).css('backgroundColor');
        day_bg = $(bk_container[1]).css('backgroundColor');
        $('#day_icon').click(function() {
            $('#day_icon').hide();
            $('#night_icon').show();
            body.css({
                background: night_bg,
                color: night_bg
            });
            
            InitBgColor = night_bg;
            Util.StorageSetter('background_color', InitBgColor);
        });
        $('#night_icon').click(function() {
            //设置按钮的显隐
            $('#day_icon').show();
            $('#night_icon').hide();
            //设置页面的背景以及字体颜色
            body.css({
                background: day_bg,
                color: day_bg
            });
           
            InitBgColor = day_bg;
            Util.StorageSetter('background_color', InitBgColor);
        });
    } 

    function setListBg() {
        $('.return').click(function() {
            window.location.href = "./book.html";
        });
        $('.home').click(function() {
            window.location.href = "./bookframe.html";
        });
        var height = document.body.scrollHeight;
        $('.list').css('min-height', height);
    }

    //设置返回书架功能
    $('.icon-back').click(function(){
        window.location.href="./bookframe.html"
    });

    main();
    setListBg();



})(); 

