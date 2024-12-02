
## 简介
轻轻的我走来，带走了一点点云彩。
自动爬网程序，可以基于json的配置转为爬网逻辑，无需编写爬网逻辑。

## 类型推到
https://juejin.cn/post/7436020932488151067

## 流程控制和 关联的Factory

| 类名           | 注册类型       | 是否有children | 状态 | 说明                                       |
| -------------- | -------------- | -------------- | ---- | ------------------------------------------ |
| Activity       | -              | ❌              | ✅    | 活动基类                                   |
| Container      | -              | ✅              | ✅    | 有children的活动基类                       |
| Code           | code           | ❌              | ✅    | 代码活动                                   |
| Delay          | delay          | ❌              | ✅    | 延时活动                                   |
| Parallel       | parallel       | ✅              | ✅    | 类似Promise.all                            |
| Race           | race           | ✅              | ✅    | 类似Promise.race                           |
| Sequence       | sequence       | ✅              | ✅    | 顺序执行的活动                             |
| While          | while          | ✅              | ✅    | while                                      |
| Assert         | assert         | ✅              | ✅    | 断言，主要是配合while, ifelse使用          |
| AssertSequence | assertSequence | ✅              | ✅    | 如果满足条件，顺序执行                     |
| IFElse         | ifElse         | ✅              | ✅    | if else                                    |
| Request        | request        | ❌              | ✅    | 网络请求                                   |
| Break          | break          | ❌              | ✅    | break，作用于继承于ContainerActivity的活动 |
| Terminate      | terminate      | ❌              | ✅    | 终止整个流程                               |
| TryCatch       | tryCatch       | ✅              | ✅    | try catch                                  |
| For            | for            | ✅              | ✅    | for                                        |
| ParallelFor    | parallelFor    | ✅              | ✅    | parallel For  |
| Function       | function       | ✅              | ✅    | 执行某个函数  |

**fs**
| 类名         | 注册类型        | 是否有children | 状态 | 说明               |
| ------------ | --------------- | -------------- | ---- | ------------------ |
| WriteFile    | fs.writeFile    | ❌              | ✅    | 写文件             |
| ReadFile     | fs.readFile     | ❌              | ✅    | 读文件（txt/json） |
| DownloadFile | fs.downloadFile | ❌              | ✅    | 下载文件           |
| RemoveFile   | fs.removeFile   | ❌              | ✅    | 删除文件           |

## 爬网相关和关联的Factory

Page相关API，详情查看[Page class | Puppeteer](https://pptr.dev/api/puppeteer.page)

| 类名                   | 注册类型                      | 是否有children | 状态 | 说明                             |
| ---------------------- | ----------------------------- | -------------- | ---- | -------------------------------- |
| Browser                | c.browser                     | ✅              | ✅    | 浏览器                           |
| Page                   | c.page                        | ✅              | ✅    | Page                             |
| GetCookie              | c.page.getCookie              | ❌              | ✅    | 获取页面的cookie                 |
| SetCookie              | c.page.setCookie              | ❌              | ✅    | 设置cookie                       |
| PageChild              | -                             | ❌              | ✅    | page孩子，自带page,browser属性   |
| Goto                   | c.page.goto                   | ❌              | ✅    | page.goto                        |
| Evaluate               | c.page.evaluate               | ❌              | ✅    | page.evaluate                    |
| Reload                 | c.page.reload                 | ❌              | ✅    | page.reload                      |
| Click                  | c.page.click                  | ❌              | ✅    | page.click                       |
| SetUserAgent           | c.page.setUserAgent           | ❌              | ✅    | page.setUserAgent                |
| Url                    | c.page.url                    | ❌              | ✅    | page.url                         |
| Content                | c.page.content                | ❌              | ✅    | page.content                     |
| WaitForNavigation      | c.page.waitForNavigation      | ❌              | ✅    | page.waitForNavigation           |
| WaitForRequest         | c.page.waitForRequest         | ❌              | ✅    | page.waitForRequest              |
| WaitForResponse        | c.page.waitForResponse        | ❌              | ✅    | page.waitForResponse             |
| GoBack                 | c.page.goBack                 | ❌              | ✅    | page.goBack                      |
| GoForward              | c.page.goForward              | ❌              | ✅    | page.goForward                   |
| Title                  | c.page.title                  | ❌              | ✅    | page.title                       |
| Close                  | c.page.close                  | ❌              | ✅    | page.close                       |
| IsClosed               | c.page.isClosed               | ❌              | ✅    | page.IsClosed                    |
| EvaluateClick          | c.page.eClick                 | ❌              | ✅    | page.evaluate((el)=> el.click()) |
| Type                   | c.page.type                   | ❌              | ✅    | page.type                        |
| WaitForSelector        | c.page.waitForSelector        | ❌              | ✅    | page.waitForSelector             |
| Fetch                  | c.page.fetch                  | ❌              | ✅    | page.evaluate(()=>fetch()) (text | json) |
| $Eval                  | c.page.$eval                  | ❌              | ✅    | page.$eval                       |
| $$Eval                 | c.page.$$val                  | ❌              | ✅    | page.$$eval                      |
| Focus                  | c.page.focus                  | ❌              | ✅    | page.focus                       |
| Hover                  | c.page.hover                  | ❌              | ✅    | page.hover                       |
| UploadFile             | c.page.uploadFile             | ❌              | ✅    | 上传文件                         |
| clearValue             | c.page.clearValue             | ❌              | ✅    | 清除输入控制的值    |
| ExposeFunction         | c.page.exposeFunction         | ❌              | ✅    | 暴露函数      |
| RemoveExposedFunction  | c.page.removeExposedFunction  | ❌              | ✅    | 删除暴露函数 |
| Pdf                    | c.page.pdf                    | ❌              | ✅    | pdf        |
| Screenshot             | c.page.screenshot             | ❌              | ✅    | 截屏      |
| SetViewport            | c.page.setViewport            | ❌              | ✅    | setViewport   |
| SetRequestInterception | c.page.setRequestInterception | ❌              | ✅    | setRequestInterception |
| SetExtraHTTPHeaders    | c.page.setExtraHTTPHeaders    | ❌              | ✅    | setExtraHTTPHeaders   |
| SetGeolocation         | c.page.setGeolocation         | ❌              | ✅    | setGeolocation    |
| AddStyleTag            | c.page.addStyleTag            | ❌              | ✅    | 添加style         |
| AddScriptTag           | c.page.addScriptTag           | ❌              | ✅    | 添加script      |
| Select                 | c.page.select                 | ❌              | ✅    | select选中      |
| ActionActivity         | c.page.action                 | ❌              | ✅    | 通用page方法操作    |
| PropertyActivity       | c.page.property               | ❌              | ✅    | 通用page获取属性  |

**键盘**
| 类名                  | 注册类型                      | 是否有children | 状态 | 说明     |
| --------------------- | ----------------------------- | -------------- | ---- | -------- |
| KeyboardDown          | c.page.keyboard.down          | ❌              | ✅    | 键down   |
| KeyboardPress         | c.page.keyboard.press         | ❌              | ✅    | 键press  |
| KeyboardSendCharacter | c.page.keyboard.sendCharacter | ❌              | ✅    | 键盘输入 |
| KeyboardType          | c.page.keyboard.type          | ❌              | ✅    | 键盘输入 |
| KeyboardUp            | c.page.keyboard.up            | ❌              | ✅    | 键盘up   |

**鼠标**
| 类名             | 注册类型                 | 是否有children | 状态 | 说明            |
| ---------------- | ------------------------ | -------------- | ---- | --------------- |
| MouseClick       | c.page.mouse.click       | ❌              | ✅    | 鼠标点          |
| MouseDown        | c.page.mouse.down        | ❌              | ✅    | 鼠标down        |
| MouseDrag        | c.page.mouse.drag        | ❌              | ✅    | 鼠标drag        |
| MouseDragAndDrop | c.page.mouse.dragAndDrop | ❌              | ✅    | 鼠标dragAndDrop |
| MouseDragEnter   | c.page.mouse.dragEnter   | ❌              | ✅    | 鼠标dragEnter   |
| MouseDragOver    | c.page.mouse.dragOver    | ❌              | ✅    | 鼠标dragOver    |
| MouseDrop        | c.page.mouse.drop        | ❌              | ✅    | 鼠标drop        |
| MouseMove        | c.page.mouse.move        | ❌              | ✅    | 鼠标move        |
| MouseReset       | c.page.mouse.reset       | ❌              | ✅    | 鼠标reset       |
| MouseUp          | c.page.mouse.up          | ❌              | ✅    | 鼠标up          |
| MouseWheel       | c.page.mouse.wheel       | ❌              | ✅    | 鼠标wheel       |



## logger [✅]
默认使用console，可以自定义logger.


## 消息
TODO::

## 可视化进度
TODO::


## TODO::
- [x] 活动CodeActivity执行中，如何提供内置的变量或者方法
    * 动态函数 + 扩展运算符
     `$c`:常量，`$m` 方法
- [x] 集合?变量?的操作和管理
    * 比如for循环
- [x] 注册函数和变量
```typescript  
// 使用 默认属性为 $c, 方法为 $m
addMethod("getName",function getName() {return "name"});
addVariable("money", 1000);
// 批量使用如下
batchaddVariables
batchaddMethods
```
- [x] 注册的函数和变量 只读
  除 `$v`外, `$c`, `$m`, `$a` 添加的属性为只读
- [ ] 类型推导，已知type，推导具体的 IActivityConfig
- [x] ctx指向问题, useParentCtx即可使用父节点的ctx替换自身的ctx
  - [x] For
  - [x] IFElse
  - [x] Parallel
  - [x] ParallelFor
  - [x] Race
  - [x] Sequence
  - [x] While
  - [x] All
  - [x] doWhile
- [x] Activity.run 参数属性，例如`$preRes`, `$item`等的多级传递性
- [x] 改进或者删除AssertSequence
- [x] 给父节点打名称，通过名称访问
- [x] options 改进变量替换
- [x] globalContext的改进
  * 内置globalBuiltinContext
- [x] 支持多实例
- [x] register活动支持装饰器
- [ ] 保证paramObject的数据安全
- [ ] 类似use，支持扩展Activities
