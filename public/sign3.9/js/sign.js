/**
 * Created by gongchuangshidai on 16/3/10.
 */
$(function(){
    $("#getcode").click(function(){
        var a={
            phoneNum:$("#phoneNum").val(),
            pwd:$("#pwd").val()
        }
        if(a.phoneNum ==""){
            $("#error").html("手机号不能为空")
            showDialog(error)
            return
        }
        if(a.pwd == ""){
            $("#error").html("密码不能为空")
            showDialog(error)
            return
        }
        if(!isPhone(a.phoneNum)){
            $("#error").html("手机号码格式错误!")
            showDialog(error)
            return
        }

        $.ajax({
            url:"https://licai.gongshidai.com/v3_1/code",
            type:"post",
            data:{
                type:'reg',
                phone: a.phoneNum
            },
            success:function(data){
                if(data.code == 10002){
                    $("#error").html("号码已注册,请重新输入!");
                    showDialog(error);
                    $("#phonenum").val("")
                    return
                }else if(data.code ==0){
                    $("#wirtecode").removeAttr("disabled")
                    sendCode(getCode)
                }
            },
            error:function(){}

        });
    });
    $("#sign-now").click(function(){
        var phoneNum= $("#phoneNum").val(),
            pwd= $("#pwd").val(),
            writecode= $("#writecode").val();

        var data={};
        if(phoneNum ==""){
            $("#error").html("请输入手机号")
            showDialog(error)
            return
        };
        if(pwd == ""){
            $("#error").html("请输入密码")
            showDialog(error)
            return
        };
        if(writecode == ""){
            $("#error").html("请输入验证码")
            showDialog(error)
            return
        };

        var apptype = isPhoneType();
        if (isWeiXin()) {
            apptype = apptype + 'wechat';
        }
        data.apptype = apptype;
        data.pwd = pwd;
        data.code = writecode;
        data.phone = phoneNum;
        data.channel = GetPhone("channel");
        $.ajax({
            url:"https://licai.gongshidai.com/v3_1/user",
            type:"post",
            data:data,
            success:function(data){
                if(data.code ==0){
                    $("#error").html("注册成功!")
                    showDialog(error)
                    if(isPhoneType()== "iphone"){
                        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.gongshidai.mistGSD"
                    }else{
                        window.location.href = ""
                    }

                }else if (data.code == 10011){
                    $("#error").html("验证码错误!");
                    showDialog(error);
                }else if(data.code == 10028){
                    $("#error").html("验证码失效!");
                    showDialog(error);
                }else if(data.code == 10002){
                    $("#error").html(data.msg);
                    showDialog(error);
                }else{
                    $("#error").html("注册失败请重新注册!");
                    showDialog(error);
                }
            },
            error:function(){}
        })
    });
});
var clock = '';
var nums = 60;
var btn;
var getCode = document.getElementById("getcode")
function sendCode(thisBtn)
{
    btn = thisBtn;
    btn.disabled = true; //将按钮置为不可点击
    btn.value = nums+'秒';
    clock = setInterval(doLoop, 1000); //一秒执行一次
}
function doLoop()
{
    nums--;
    if(nums > 0){
        btn.value = nums+'秒';
    }else{
        clearInterval(clock); //清除js定时器
        btn.disabled = false;
        btn.value = '发送验证码';
        nums = 10; //重置时间
    }
}
