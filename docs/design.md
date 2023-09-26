


## 数据抓取方式

### 1. 直接http请求
1. cookie设置
    * 匿名：直接http请求，或者无头浏览器获取
    * 具名：直接设置
2. http请求
   1. html
   2. api
3. 数据解析
   * html. 节点内容解析
   * text/json 接口


### 2.无头浏览器
1. 启动浏览器
2. cookie设置
    * 匿名：无需设置
    * 具名：直接设置cookie
    * 登录：账号密码，二维码，扫码 + 滑块/文字点选/计算题等等
3. 抓取数据
   * 拦截请求
     * 直接拦截
     * evaluate/evaluateHandle
   * 页面抓取
   * cookie
   * storage
   * indexedDB

## 爬取流程/闭环


## 全流程
