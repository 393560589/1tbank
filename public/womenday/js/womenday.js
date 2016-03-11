/**
 * Created by gongchuangshidai on 16/3/1.
 */
/*滚动*/




$(function(){


    var name=[],
        phone=[],
        money=[],
        phs=[],
        mys=[],
        names = $("#con1 .name"),
        phones = $("#con1 .phone"),
        moneys = $("#con1 .money"),
        ph = $("#con1 .rank"),
        toprank = $("#con2 .topranks"),
        topname = $("#con2 .topname"),
        topphone = $("#con2 .topphone"),
        topmoney = $("#con2 .topmoney"),
        myrank = $("#con3 .myrank"),
        mymoney = $("#con3 .mymoney"),
        str='';
   /* if(GetPhone("phone") != ''){
        $("#phone-sign").css("visibility","hidden")
        var phoneval = GetPhone("phone"),
            str = '?phone='+phoneval
    }*/
    console.log(str)
    /*小事件*/
    $("#shareF").click(function(){
        $("#shareF").css("display","none")
    })
    $("#sharebtn").click(function(){
        $("#shareF").css("display","block")
    })

    $("#close-btn").click(function(){
        $("#phone-sign").css("display","none")
    });
    $("#close-btn2").click(function(){
        $("#toprank").css("display","none")
    });
    $(".act-three a").click(function(){
        $(".act-three .erweima").addClass("move")
    })
    /**/
    $("#phone-strat").click(function(){
        var phoneNum = $("#phoneval").val();

        /* var phoneNum = $("#phonenum").val();*/
        if(phoneNum ==""){
            $("#error").html("不能为空")
            showDialog(error)
            return
        }
        if(!isPhone(phoneNum)){
            $("#error").html("手机号码格式错误!")
            showDialog(error)
            return
        }
        $.ajax({
            url:"http://licai.gongshidai.com:88/v3_1/code",
            type:"post",
            data:{
                type:'reg',
                phone:phoneNum
            },
            success:function(data){
                if (data.code ==10002){
                    $("#sign1").css("display","none")
                    $("#sign2").css("display","block")
                     var str = '?phone='+phoneNum
                    $("#bgImg").data("data-type",str)
                    str = $("#bgImg").data("data-type")
                    console.log(str)
                    ajaxstart()
                    console.log($("#bgImg").data("data-type"))
                }else{
                    $("#sign1").css("display","block")
                    $("#sign2").css("display","none")
                    ajaxMon()
                }
                $("#phone-sign").css("display","none")
            },


            error:function(){}

        });

    });

    /*if($("#bgImg").data("data-type")!=""){
        $("#phone-sign").css("visibility","hidden")
    }*/
    /*页面载入时获取排名信息*/
    function ajaxstart(){
        str = $("#bgImg").data("data-type")
        console.log(str)
        $.ajax({

            url:"https://licai.gongshidai.com/v3_1/wlist"+str,
            type:"get",
            async:false,
            success:function(data){
               for(var i=0;i<data.list.length;i++){
                   name.push(data.list[i].realname)
                   phone.push(data.list[i].phone)
                   money.push(data.list[i].amounts)
                   phs.push(data.list[i].ph)

               }
                if(data.rank == 0){
                    $(".myself").html("")
                    $("#myRanks").css("fontSize","14px")
                    $("#myRanks").html("当前排名:未上榜");
                }else{
                    mys.push(data.rank);
                    myrank.html(mys[0]);
                }
                if(data.amount == 0){
                    $("#myMoney").css("fontSize","14px");
                    $("#myMoney").css("fontWeight","600")
                    $("#myMoney").html("当前投资:未投资");
                }else{
                    mys.push(data.amount);
                    mymoney.html(mys[1]);
                }

            },
            error:function(){}
        });
    }
    $.ajax({
        url:"https://licai.gongshidai.com/v3_1/wlist",
        type:"get",
        async:false,
        success:function(data){
            for(var i=0;i<data.list.length;i++){
                name.push(data.list[i].realname)
                phone.push(data.list[i].phone)
                money.push(data.list[i].amounts)
                phs.push(data.list[i].ph)

            }
        },
        error:function(){}
    });
    console.log(name)
    /*前三*/
    for(var a = 0;a<3;a++){
        /* toprank.eq(a).html(phs[a]);*/
        topname.eq(a).html(name[a]);
        topmoney.eq(a).html(money[a]);
        topphone.eq(a).html(phone[a]);
    }
    /*四到三十*/

    /*我的排名*/



    /*判断手机号码的值*/
    $("#Prank").click(function(){
            $("#toprank").css("display","block")
    });

})
function ajaxMon(){
    var phoneNum = $("#phoneval").val(),
        key = GetPhone("key"),
        opid = $("#sign1").attr("data-opid");
    console.log(opid)
    $.ajax({
        url:"http://licai.gongshidai.com:88/v3_1/bound",
        type:"post",
        data:{
            phone:phoneNum,
            key:key,
            opid:opid
        },
        success:function(data){
            console.log(data)
        },



        error:function(){}

    });

}
/*获取链接中的值*/
function showH(value1,value2){
    $(value1).css("visibility","hidden")
    $(value2).css("visibility","visible")
}
function hide(value){
    $(value).css("visibility","hidden")
}
/*获取链接中个别属性的方法*/
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
/*错误弹出*/
function showDialog(ele) {
    ele.setAttribute('style', "opacity: 1;visibility: visible;");
    setTimeout(function() {
        ele.setAttribute('style', "opacity: 0;visibility: hidden;");
    }, 1500)
}