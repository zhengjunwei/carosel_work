    //todo 需要引入throttle 避免点击过快 避免滑过carosel区域太快 暂未考虑
    //todo 未考虑兼容mouseenter vs mouseover,mouseout vs mouseleave
    if(isFunction(ready)){
        ready(function() {
            main();
        });
    }
    

    //真正的业务逻辑代码
    function main() {
        var num = 0;//计数器
        var now_index = 0;//当前 .carosel>.item索引
        var o_item = getByClassName("J_item");
        var len = o_item.length;
        var every_width = getAttribute(o_item[0],"width");
        var o_slider_ctrl = getByClassName("J_slider_ctrl");
        addEvent(getByClassName("J_right_ctl")[0],"click",function(){
            for(var i=0;i<len;i++){
                if(hasClass(o_item[i],"active"))continue;
                o_item[i].style['left'] = every_width;
            }
            num++;
            now_index = num%len;
            prev_index = (now_index == 0)?(len - 1):(now_index - 1);
            addClass(o_item[now_index],"active");
            animate(o_item[prev_index],200,600,{left:"-"+every_width},function(){
                o_item[prev_index].style.left = every_width;
                removeClass(o_item[prev_index],"active");
            });
            animate(o_item[now_index],200,600,{left:"0px"},function(){
                for(var i = 0;i<o_slider_ctrl.length;i++){
                    removeClass(o_slider_ctrl[i],"slider_ctrl_current");
                }
                addClass(o_slider_ctrl[now_index],"slider_ctrl_current");
            });
        });

        addEvent(getByClassName("J_left_ctl")[0],"click",function(){
            for(var i=0;i<len;i++){
                if(hasClass(o_item[i],"active"))continue;
                o_item[i].style['left'] = '-'+every_width;
            }
            num--;
            num = (num>0)?num:(len+num);
            now_index = num%len;
            next_index = (now_index+1>=len)?0:(now_index+1);
            //prev_index = (now_index == 0)?(len - 1):(now_index - 1);
            addClass(o_item[now_index],"active");
            animate(o_item[next_index],200,600,{left:every_width},function(){
                o_item[next_index].style.left ='-'+every_width;
                removeClass(o_item[next_index],"active");
            });
            animate(o_item[now_index],200,600,{left:"0px"},function(){
                for(var i = 0;i<o_slider_ctrl.length;i++){
                    removeClass(o_slider_ctrl[i],"slider_ctrl_current");
                }
                addClass(o_slider_ctrl[now_index],"slider_ctrl_current");
            });
        });

        //下面的箭头点击切换到对应的item
        for(var i=0;i<o_slider_ctrl.length;i++){
            o_slider_ctrl[i].index = i;
        }
        for(var i=0;i<o_slider_ctrl.length;i++){
            addEvent(o_slider_ctrl[i],"click",function(){
                var temp_index = now_index;
                var index = this.index;
                now_index = index;
                if(now_index > temp_index){
                    for(var i=0;i<len;i++){
                        if(hasClass(o_item[i],"active"))continue;
                        o_item[i].style['left'] = every_width;
                    }
                    addClass(o_item[now_index],"active");
                    animate(o_item[temp_index],200,600,{left:"-"+every_width},function(){
                        o_item[prev_index].style.left = every_width;
                        removeClass(o_item[prev_index],"active");
                    });
                    animate(o_item[now_index],200,600,{left:"0px"},function(){
                        for(var i = 0;i<o_slider_ctrl.length;i++){
                            removeClass(o_slider_ctrl[i],"slider_ctrl_current");
                        }
                        addClass(o_slider_ctrl[now_index],"slider_ctrl_current");
                    });
                }else if(now_index < temp_index){
                    for(var i=0;i<len;i++){
                        if(hasClass(o_item[i],"active"))continue;
                        o_item[i].style['left'] = '-'+every_width;
                    }
                    addClass(o_item[now_index],"active");
                    animate(o_item[temp_index],200,600,{left:every_width},function(){
                        o_item[prev_index].style.left = "-"+every_width;
                        removeClass(o_item[prev_index],"active");
                    });
                    animate(o_item[now_index],200,600,{left:"0px"},function(){
                        for(var i = 0;i<o_slider_ctrl.length;i++){
                            removeClass(o_slider_ctrl[i],"slider_ctrl_current");
                        }
                        addClass(o_slider_ctrl[now_index],"slider_ctrl_current");
                    });
                }else{
                    return false;//now_index == index;
                }
            })
        }

        //定时 当鼠标hover上去的时候，立刻停止计时，移开的时候，开始计时
        var my_timer;
        var my_fn = function(){
            my_timer = setTimeout(function(){
                for(var i=0;i<len;i++){
                    if(hasClass(o_item[i],"active"))continue;
                    o_item[i].style['left'] = every_width;
                }
                num++;
                now_index = num%len;
                prev_index = (now_index == 0)?(len - 1):(now_index - 1);
                addClass(o_item[now_index],"active");
                animate(o_item[prev_index],200,600,{left:"-"+every_width},function(){
                    o_item[prev_index].style.left = every_width;
                    addClass(o_item[prev_index],"active");
                });
                animate(o_item[now_index],200,600,{left:"0px"},function(){
                    for(var i = 0;i<o_slider_ctrl.length;i++){
                        removeClass(o_slider_ctrl[i],"slider_ctrl_current");
                    }
                    addClass(o_slider_ctrl[now_index],"slider_ctrl_current");
                    my_fn();
                });
            },10000);
        };
        my_fn();
        addEvent(document.getElementById("J_carosel"),"mouseenter",function(){
            clearTimeout(my_timer);
            removeClass(o_slider_ctrl[now_index],"slider_ctrl_current");
        });
        addEvent(document.getElementById("J_carosel"),"mouseleave",function(){
            clearTimeout(my_timer);
            addClass(o_slider_ctrl[now_index],"slider_ctrl_current");
            my_fn();
        });


    }