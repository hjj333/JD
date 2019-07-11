$(function () {
    $.ajax({
        type: "get",
        // js文件在html中引入使用加载，请求路径是相对html发送
        url: "js/data.json",
        data: "",
        // dataType强制转换后台返回的数据为json对象，转换不成功会报错，不会执行success，执行error回调函数
        dataType: "json",
        success: function (response) {
           console.log(response);
            
        }
    });
  });