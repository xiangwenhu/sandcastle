
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
|Break            |break          |  ❌     |  ✅ | break，作用于继承于ContainerActivity的活动 |
|Terminate        |terminate      |  ❌    |  ✅ | 终止整个流程 |
|TryCatch         |tryCatch       |  ✅    |  ✅ | try catch |
|For              |for            |  ✅    |  ✅ | for       |
|ParallelFor      |parallelFor    |  ✅    |  ✅ | parallel For       |
|WriteFile        |writeFile      |  ❌    |  ✅ | 写文件  |
|ReadFile         |readFile       |  ❌    |  ✅ | 读文件（txt/json） |
|DownloadFile     |downloadFile   |  ❌    |  ✅ | 下载文件     |
|RemoveFile       |removeFile     |  ❌    |  ✅ | 删除文件     |

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
|WaitForNav      |**c.page.waitForNav**   |  ❌    |  ✅ | page.waitForNavigation |
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
|Fetch           |c.page.fetch            |  ❌    |  ❌ | page.evaluate(()=>fetch())  |
|$Eval           |c.page.$eval            |  ❌    |  ✅ | page.$eval  |
|$$Eval          |c.page.$$val            |  ❌    |  ✅ | page.$$eval  |
|Focus           |c.page.focus            |  ❌    |  ✅ | page.focus  |
|Hover           |c.page.hover            |  ❌    |  ✅ | page.hover  |
|UploadFile      |c.page.uploadFile       |  ❌    |  ❌ | 上传文件|
|KeyboardDown    |c.page.keyboard.down    |  ❌    |  ✅ | 键down|
|KeyboardPress   |c.page.keyboard.press   |  ❌    |  ✅ | 键press|
|KeyboardSendCharacter  |c.page.keyboard.sendCharacter |  ❌    |  ✅ | 键盘输入|
|KeyboardType    |c.page.keyboard.type    |  ❌    |  ✅  | 键盘输入|
|MouseClick      |c.page.mouse.click      |  ❌    |  ✅  | 鼠标点|
|MouseDown       |c.page.mouse.down       |  ❌    |  ✅  | 鼠标down|
|MouseDrag       |c.page.mouse.drag       |  ❌    |  ✅  | 鼠标drag|
|MouseDragAndDrop|c.page.mouse.dragAndDrop|  ❌    |  ✅  | 鼠标dragAndDrop|
|MouseDragEnter  |c.page.mouse.dragEnter  |  ❌    |  ✅  | 鼠标dragEnter|
|MouseDragOver   |c.page.mouse.dragOver   |  ❌    |  ✅  | 鼠标dragOver|
|MouseDrop       |c.page.mouse.drop       |  ❌    |  ✅  | 鼠标drop|
|MouseMove       |c.page.mouse.move       |  ❌    |  ✅  | 鼠标move|
|MouseReset      |c.page.mouse.reset      |  ❌    |  ✅  | 鼠标reset|
|MouseUp         |c.page.mouse.up         |  ❌    |  ✅  | 鼠标up|
|MouseWheel      |c.page.mouse.wheel      |  ❌    |  ✅  | 鼠标wheel|



## logger
TODO::

## 消息
TODO::

## 可视化进度
TODO::