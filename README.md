
## 简介
轻轻的我走来，带走了一点点云彩。
自动爬网程序，可以基于json的配置转为爬网逻辑，无需编写爬网逻辑。


## 流程控制和 关联的Factory

|类名|注册类型| 是否有children|状态| 说明|
|----|----|----|----|----|
|Activity         |-              |  ❌    |  ✅ | 活动基类 |
|Container        |-              |  ✅    |  ✅ | 有children的活动基类 |
|Code             |code           |  ❌    |  ✅ | 代码活动 |
|Delay            |delay          |  ❌    |  ✅ | 延时活动 |
|Parallel         |parallel       |  ✅    |  ✅ | 类似Promise.all |
|Race             |race           |  ✅    |  ✅ | 类似Promise.race|
|Sequence         |sequence       |  ✅    |  ✅ | 顺序执行的活动 |
|While            |while          |  ✅    |  ✅ | while |
|Assert           |assert         |  ✅    |  ✅ | 断言，主要是配合while, ifelse使用 |
|AssertSequence   |assertSequence |  ✅    |  ✅ | 如果满足条件，顺序执行 |
|IFElse           |ifElse         |  ✅    |  ✅ | if else |
|Request          |request        |  ❌    |  ✅ | 网络请求  |
|Break            |break          |  ✅    |  ✅ | break，作用于继承于ContainerActivity的活动 |
|Terminate        |terminate      |  ❌    |  ✅ | 终止整个流程 |
|TryCatch         |tryCatch       |  ❌    |  ✅ | try catch |
|For              |for            |  ❌    |  ❌ | for       |
|WriteJsonFile    |writeJsonFile  |  ❌    |  ❌ | 写JSON文件   |
|ReadJSONFile     |readFile       |  ❌    |  ❌ | 读JSON文件   |



## 爬网相关和关联的Factory

Page相关API，详情查看[Page class | Puppeteer](https://pptr.dev/api/puppeteer.page)

|类名|注册类型| 是否有children|状态| 说明|
|----|----|----|----|----|
|Browser         |c.browser               |  ✅    |  ✅ | 浏览器 |
|Page            |c.page                  |  ✅    |  ✅ | Page |
|GetCookie       |c.page.getCookie        |  ❌    |  ✅ | 获取页面的cookie |
|SetCookie       |c.page.setCookie        |  ❌    |  ✅ | 设置cookie |
|PageChild       |-                       |  ❌    |  ✅ | page孩子，自带page,browser属性 |
|Goto            |c.page.goto             |  ❌    |  ✅ | page.goto |
|Evaluate        |c.page.evaluate         |  ❌    |  ✅ | page.evaluate |
|Reload          |c.page.reload           |  ❌    |  ✅ | page.reload |
|Click           |c.page.click            |  ❌    |  ✅ | page.click |
|SetUserAgent    |c.page.setUserAgent     |  ❌    |  ✅ | page.setUserAgent |
|Url             |c.page.url              |  ❌    |  ✅ | page.url |
|Content         |c.page.content          |  ❌    |  ✅ | page.content |
|WaitForNav      |c.page.waitForNav       |  ❌    |  ✅ | page.waitForNavigation |
|WaitForRequest  |c.page.waitForRequest   |  ❌    |  ✅ | page.waitForRequest |
|WaitForResponse |c.page.waitForResponse  |  ❌    |  ✅ | page.waitForResponse |
|GoBack          |c.page.goBack           |  ❌    |  ✅ | page.goBack |
|GoForward       |c.page.goForward        |  ❌    |  ✅ | page.goForward |
|Title           |c.page.title            |  ❌    |  ✅ | page.title |
|Close           |c.page.close            |  ❌    |  ✅ | page.close |
|IsClosed        |c.page.isClosed         |  ❌    |  ✅ | page.IsClosed |
|EvaluateClick   |c.page.eClick           |  ❌    |  ✅ | page.evaluate((el)=> el.click()) |
|Type            |c.page.type             |  ❌    |  ✅ | page.type  |
|WaitForSelector |c.page.waitForSelector  |  ❌    |  ✅ | page.waitForSelector  |
|FetchJSON       |c.page.fetchJSON        |  ❌    |  ✅ | page.evaluate(()=>fetch())  |
|FetchText       |c.page.fetchText        |  ❌    |  ✅ | page.evaluate(()=>fetch())  |
|UploadFile      |c.page.uploadFile       |  ❌    |  ❌ | 上传文件|



## logger
TODO::

## 消息
TODO::

## 可视化进度
TODO::