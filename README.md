
## 简介
轻轻的我走来，带走了一点点云彩。
自动爬网程序，可以基于json的配置转为爬网逻辑，无需编写爬网逻辑。


## 流程控制Activity 和 关联的Factory
- [x] Activity                          活动基类
- [x] ContainerActivity                 还有children的活动基类
- [x] CodeActivity                      代码活动
- [x] DelayActivity                     延时活动
- [x] ParallelActivity                  类似Promise.all
- [x] RaceActivity                      类似Promise.race
- [x] SequenceActivity                  顺序执行的活动
- [x] WhileActivity                     while
- [x] AssertActivity                    断言，主要是配合while, ifelse使用
- [x] AssertSequenceActivity            如果满足条件，顺序执行
- [x] IFElseActivity                    if else
- [x] RequestActivity                   网络请求
- [x] BreakActivity                     break，作用于继承于ContainerActivity的活动
- [x] TerminateActivity                 终止活动
- [x] TryCatch                          try catch



## 爬网相关Activity 和关联的Factory
TODO::


## logger
TODO::

## 消息
TODO::

## 可视化进度
TODO::