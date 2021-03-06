window.onload = function () {

    page({

        id: 'div1',  //生成分页需要的id
        nowNum: 5,   //当前页
        allNum: 100, //总页数
        callBack: function (now, all) {   //回调函数
            //now为当前页，all为总页数
            //这里可以根据当前页和总页数，通过ajax请求从后端获取数据

        }

    });


};

function page(opt) {

    if (!opt.id) {
        return false
    }

    var obj = document.getElementById(opt.id);

    var nowNum = opt.nowNum || 1;
    var allNum = opt.allNum || 5;
    var callBack = opt.callBack || function () {
        };

    if (nowNum >= 4 && allNum >= 6) {

        var oA = document.createElement('a');
        oA.href = '#1';
        oA.innerHTML = '首页';
        obj.appendChild(oA);

    }

    if (nowNum >= 2) {
        var oA = document.createElement('a');
        oA.href = '#' + (nowNum - 1);
        oA.innerHTML = '上一页';
        obj.appendChild(oA);
    }

    if (allNum <= 5) {
        for (var i = 1; i <= allNum; i++) {
            var oA = document.createElement('a');
            oA.href = '#' + i;
            if (nowNum == i) {
                oA.innerHTML = i;
            }
            else {
                oA.innerHTML = '[' + i + ']';
            }
            obj.appendChild(oA);
        }
    }
    else {

        for (var i = 1; i <= 5; i++) {
            var oA = document.createElement('a');


            if (nowNum == 1 || nowNum == 2) {

                oA.href = '#' + i;
                if (nowNum == i) {
                    oA.innerHTML = i;
                }
                else {
                    oA.innerHTML = '[' + i + ']';
                }

            }
            else if ((allNum - nowNum) == 0 || (allNum - nowNum) == 1) {

                oA.href = '#' + (allNum - 5 + i);

                if ((allNum - nowNum) == 0 && i == 5) {
                    oA.innerHTML = (allNum - 5 + i);
                }
                else if ((allNum - nowNum) == 1 && i == 4) {
                    oA.innerHTML = (allNum - 5 + i);
                }
                else {
                    oA.innerHTML = '[' + (allNum - 5 + i) + ']';
                }

            }
            else {
                oA.href = '#' + (nowNum - 3 + i);

                if (i == 3) {
                    oA.innerHTML = (nowNum - 3 + i);
                }
                else {
                    oA.innerHTML = '[' + (nowNum - 3 + i) + ']';
                }
            }
            obj.appendChild(oA);

        }

    }

    if ((allNum - nowNum) >= 1) {
        var oA = document.createElement('a');
        oA.href = '#' + (nowNum + 1);
        oA.innerHTML = '下一页';
        obj.appendChild(oA);
    }

    if ((allNum - nowNum) >= 3 && allNum >= 6) {

        var oA = document.createElement('a');
        oA.href = '#' + allNum;
        oA.innerHTML = '尾页';
        obj.appendChild(oA);

    }

    callBack(nowNum, allNum);

    var aA = obj.getElementsByTagName('a');

    for (var i = 0; i < aA.length; i++) {
        aA[i].onclick = function () {

            //this.href弹出的绝对路径
            var nowNum = parseInt(this.getAttribute('href').substring(1));

            obj.innerHTML = '';

            page({

                id: opt.id,
                nowNum: nowNum,
                allNum: allNum,
                callBack: callBack

            });

            return false;//阻止单击a链接的默认事件，如单击a链接会在url中把href中的内容加入到url中

        };
    }

}
