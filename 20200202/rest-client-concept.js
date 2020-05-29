/** 
 * encode: 编码 decode：解码 initial:最初的 字首的 inherit: 继承
 * rest-client's concept
 *  REST Client allows you to send HTTP request and view the response in Visual Studio Code directly
 *  REST的客户端插件
 *  优势：基于HTTP语言 HTTP语言是一门非常简单的语言 使用HTTP语言可以轻松的描述请求
 *        纯文本纪录 并且纯文本可以使用git追踪内容的变化 
 *        无需切换窗口 测试 调试 代码编辑都在一个VScode中完成
 *  语法：类似那种原生的http请求 只是用规定的格式写出来
 *     新建 .rest 或者 .http 为后缀的文件 写出请求 发送请求 
 *  HTTP语言基础
 *    注意的地方 请求文本最后面需要有一个空行 或者一个#开头的行 建议空行 这样多个请求看起来回非常好看
 *              如果需要把x-www-form-urlencoded类型的参数拆分为多行 那么第二个参数开始必须以&开始
 *              get请求也可以将参数拆分多行 每行开头必须以？或者&开始
 *  查看请求历史 Ctrl + Alt + H
 *  使用变量
 *    变量的好处 在开发过程中 我们都知道 在HTTP语言中同样可以使用变量来帮助我们组织请求代码
 *  自定义变量
 *    我们可以在http文件中直接定义变量 使用@符号开头 以{{variable name}}的格式来使用
 *  环境变量
 *    除了使用自定义变量之外还可以对当前的项目或是创建编辑器全局的环境变量 $shared中的变量表示在所有
 *    环境设置中都可以使用/设置后 通过 Ctrl + Alt + E 切换环境
 *  系统变量
 *    REST client提供了一些自带的系统变量 方便我们直接使用
 *  验证和证书
 *    Basic Auth 可以使用已经Base64后的username:password 也可以直接填入username 和password
 *    Digest Auth 直接填入 username 和password即可
 *    SSL证书 ssl证书在设置文件中对特定域名知道证书路径后 就可以自动生效了
 *      每个host我们可以设置下面的内容
 *        cert: x509证书路径
 *        key: 私钥路径
 *        pfx: PKCS#12或者PFX证书路径
 *        passphrase: 证书密码(需要时设置)
 *  代码生成
 *    选中一个请求后 点击右键选中copy Request as curl可以把当前的请求复制成curl的命令 也可以使用Ctrl + Alt + C
 *    呼出代码生成菜单 选择需要生成的语言
 *  命名请求
 *    之前我们发送的所有请求都是匿名请求 匿名请求和命名请求的区别就是在一个http文件内 可以引用命名请求的
 *    请求信息和响应信息 在请求之间有依赖关系时非常有用 例如每次登陆成功后其他请求都需要更新登陆返回的token
 *    命名请求可以用过JSONPath 或者 XPath获取响应数据
 *  Main Features
 *    Send/Cancel/Return HTTP request in editor and view response in a separate pane with syntax highlight
 *    Send GraphQL query and author GraphQL variables in editor
 *    Send cURL command in editor and copy HTTP request as cURL command
 *    Auto save and view/clear request history
 *    Organize MULTIPLE request in the same file(separated by ### delimiter)
 *    View image response directly in pane
 *    Save raw response and response body only to local disk
 *    Fold and unfold response body
 *    Customize font(size/family/weight) in response preview
 *    Preview response with expected parts(headers only body only, full response and both request and response)
 *    Authentication support for:
 *      Basic Auth/Digest Auth/SSL Client Certificates(证书)/Azure Active Directory
 *    Environments and custom/system variables support for
 *      Use variables in any place of request(URL Header Body)
 *      Support both environment file and request custom variables
 *      Auto completion and hover support for both environment file and request custom variables
 *      Diagnostic support for request and file custom variables
 *      Go to definition support for request and file custom variables
 *      Find all references support ONLY for file custom variables
 *      Provide system dynamic variables
*/
