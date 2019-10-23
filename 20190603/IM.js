/** 
 * IM账号集成与登陆：App在用户注册时 用App Server通过创建账号的接口向网易云通信Web Server 发起创建账号的请求
 * 创建账号成功后 网易云通信 Web Server会返回该账户的token等信息 App Server要负责保存token信息
 * App发起登陆请求时 先走自有的登陆验证逻辑 如账号密码验证
 * 验证成功后 App Server将该用户对应的token返回给App客户端 客户端负责保存token
 * 当App需要调用网易云通信的IM服务时 需要先进行token验证 以登陆IM服务
 * token验证成功后 登陆IM服务成功 即可调用SDK的相关接口进行IM消息服务
*/