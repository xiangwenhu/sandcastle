
## 整体设计
```
transformer: json => Activity

Manager: 流程运行控制,
    logger  日志
    emitter 消息控制

Activity：  活动
    CrawlActivity  爬网活动

```

## Transformer


## Manager



## Activity 
```
{ 
    parent,    // 父节点
    context,   // 整个流的上下文
    status,    // 状态

    run(params)
}
```


## Activity Context
```
context: {
    logger,      // 日志
    global,   
}

```

## CrawlActivity Context
```
context: {
    page,        // 页面对象
    browser,     // 浏览器对象
}
```