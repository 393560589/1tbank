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
     if(rules.test(phone)) return;
    else{
         alert("您的手机号码格式不正确");
         return false
     }
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
