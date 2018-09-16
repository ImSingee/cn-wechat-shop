/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://oavmcitg.qcloud.la/';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // 获取商品数据接口
        productListUrl: `${host}/weapp/product`,
        productDetailUrl: `${host}/weapp/product/`,

        // 购买商品接口
        orderAddUrl: `${host}/weapp/order`,
        // 订单列表接口
        orderListUrl: `${host}/weapp/order`,

        // 添加到购物车接口
        trolleyAddUrl: `${host}/weapp/trolley`,
        // 获取购物车产品接口
        trolleyListUrl: `${host}/weapp/trolley`
    }
};

module.exports = config;
