/**
 * Created by gongchuangshidai on 16/3/9.
 */
/*取url中的值*/
function GetPhone(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
/*手机号码正则*/
function isPhone(phone){
    var rules = /^1[3|4|5|7|8][0-9]{9}$/;
    return rules.test(phone)
}
/*邮箱正则*/
function CheckMail(mail) {
    var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(mail)) return true;
    else {
        alert('您的电子邮件格式不正确');
        return false;}
}
/*错误弹出*/
function showDialog(ele) {
    ele.setAttribute('style', "opacity: 1;visibility: visible;");
    setTimeout(function() {
        ele.setAttribute('style', "opacity: 0;visibility: hidden;");
    }, 1500)
}
/*判断是否微信*/
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
/*判断手机类型*/
function isPhoneType() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        return 'android';
    } else if (u.indexOf('iPhone') > -1) {
        return 'iphone';
    } else if (u.indexOf('Windows Phone') > -1) {
        return 'winphone';
    }
}
