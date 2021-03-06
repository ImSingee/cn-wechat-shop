const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx70688e9c6ca4264b',

    // 微信小程序 App Secret
    appSecret: 'b836ea326f522780d5d128c54427253d',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'mina',
        db: 'cAuth',
        pass: 'wx70688e9c6ca4264b',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-shanghai',
        // Bucket 名称
        fileBucket: 'minatest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh',

    // 腾讯云
    qcloudAppId: '1251115520',
    qcloudSecretId: 'AKIDW6XnrjetFPN9oI4jlcIn7HF1d4JMrqKc',
    qcloudSecretKey: 'VfkjZDf4HLEB3jIgs7GDxa2ymPq6A4mI',
}

module.exports = CONF
