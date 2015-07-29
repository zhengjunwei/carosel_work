function getByClassName(className){
        if(document.getElementByClassName){
            return document.getElementByClassName(className); //FF下因为有此方法，所以可以直接获取到；
        }
        var nodes=document.getElementsByTagName("*");//获取页面里所有元素，因为他会匹配全页面元素，所以性能上有缺陷，但是可以约束他的搜索范围；
        var arr=[];//用来保存符合的className；
        for(var i=0;i<nodes.length;i++){
            if(hasClass(nodes[i],className)) arr.push(nodes[i]);
        }
        return arr;
}
function hasClass(node,className){
        var cNames=node.className.split(/\s+/);//根据空格来分割node里的元素；
        for(var i=0;i<cNames.length;i++){
            if(cNames[i]==className) return true;
        }
        return false;
}

function addEvent(ele,eventType,handler){
        if(ele.addEventListener){
            ele.addEventListener(eventType,handler,false);
        }else if(ele.attachEvent){
            return ele.attachEvent('on'+eventTYpe,handler)
        }else{
            ele['on'+eventType] = handler;
        }
}
function getAttribute(ele,str){
        var val;
        if(ele.currentStyle){
            val = ele.currentStyle[str];
        }else if(window.getComputedStyle){
            val = window.getComputedStyle(ele,null)[str];
        }
        return val;
}
    //只考虑width,height,left,right的改变
    //参考jquery，默认time是400ms
//    function animate(ele,time,totalTime,EndAttrObj,callback){
//        var startAttrObj = {};//记录初始化的时候元素的一些属性
//        var intervalAttrObj = {};//记录每个属性每部要改变的值
//        var my_interval = parseInt(totalTime/time);
//        for(var i in EndAttrObj){
//            console.log(i,'75行')
//            try{
//                startAttrObj[i] = getAttribute(ele,i);
//            }catch(e){
//                console.log(ele);
//                console.log(i,"sefwegfw");
//                console.log("error")
//            }
//
//           // console.log(startAttrObj[i],'75');
//            if(isNaN(parseFloat(startAttrObj[i]))){
//                startAttrObj[i] = '0px';
//                ele.style[i] = '0px';
//            }
//            intervalAttrObj[i] = (parseFloat(EndAttrObj[i]) - parseFloat(startAttrObj[i]))/my_interval;
//            console.log(intervalAttrObj[i],'76行');
//        }
////        console.log(startAttrObj);
//
//        var num = 0;
//        var handler = function(){
////            alert(1)
//            for(var i in EndAttrObj){
////                console.log(i);
//                console.log(parseFloat(getAttribute(ele,i)) + intervalAttrObj[i] + 'px');
//                ele.style[i] = parseFloat(getAttribute(ele,i)) + intervalAttrObj[i] + 'px';
////                console.log(111)
//            }
//        };
//        var fn = function(){
//            num++;
//            if(num>my_interval){
//                callback();
//                return;
//            }
//            var my_timer = setTimeout(function(){
//                handler();
//                fn();
//            },time);
//        };
//        fn();
//    }
    //由于使用上面的animate性能太差，使用下面阉割版animate
function animate(ele,time,totalTime,EndAttrObj,callback){
            var startAttrObj = {};//记录初始化的时候元素的一些属性
            var intervalAttrObj = {};//记录每个属性每部要改变的值
            var my_interval = parseInt(totalTime/time);
//            for(var i in EndAttrObj){
//                //console.log(i,'75行');
//                    startAttrObj[i] = getAttribute(ele,i);
//               // console.log(startAttrObj[i],'75');
//                intervalAttrObj[i] = (parseFloat(EndAttrObj[i]) - parseFloat(startAttrObj[i]))/my_interval;
//                //console.log(intervalAttrObj[i],'76行');
//            }
            startAttrObj['left'] = getAttribute(ele,'left');
            intervalAttrObj['left'] = (parseFloat(EndAttrObj['left']) - parseFloat(startAttrObj['left']))/my_interval;
    //        console.log(startAttrObj);

            var num = 0;
            var handler = function(){
    //            alert(1)
//                for(var i in EndAttrObj){
//    //                console.log(i);
//                    //console.log(parseFloat(getAttribute(ele,i)) + intervalAttrObj[i] + 'px');
//                    ele.style[i] = parseFloat(getAttribute(ele,i)) + intervalAttrObj[i] + 'px';
//    //                console.log(111)
//                }
                ele.style['left'] = parseFloat(getAttribute(ele,'left')) + intervalAttrObj['left'] + 'px';
            };
            var fn = function(){
                num++;
                if(num>my_interval){
                    callback();
                    return;
                }
                var my_timer = setTimeout(function(){
                    handler();
                    fn();
                },time);
            };
            fn();
}
function addClass(ele,newClassName){
        var tempClassName = ele.className;
        ele.className = tempClassName + ' '+newClassName;
        return;
}

function removeClass(ele,newClassName){
        var tempClassName = ele.className;
        var arr = tempClassName.split(/\s+/);
        var tempClassNameArr = [];
        for(var i=0;i<arr.length;i++){
            if(arr[i]==newClassName)continue;
            tempClassNameArr.push(arr[i]);
        }
        ele.className = tempClassNameArr.join(" ");
}

var readyREGEXP = /complete|loaded|interactive/;
var ready = window.ready = function(callback) {
        if (readyREGEXP.test(document.readyState) && document.body) callback()
        else document.addEventListener('DOMContentLoaded', function() {
            callback()
        }, false)
};
function isFunction(a){
    return Object.prototype.toString.call(a) === '[object Function]';
};