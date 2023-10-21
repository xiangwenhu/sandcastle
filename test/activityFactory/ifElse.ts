
import { IActivityProps } from './../../src/types/activity';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
    type: 'ifElse',
    name: 'if else 测试',
    context: {
        count: 10
    },
    if: {
        type: "assertSequence",
        assert: 'ctx.count  <= 5',
        name: '如果count小于等于5',
        children: [ {
            type: 'code',
            name: '分支输出',
            code: `console.log("count小于等于5分支")`
        },{
            type: 'delay',
            name: 'delay 5 秒',
            time: 1000
        }, {
            type: 'sequence',
            name: '连续睡觉',
            children: [{
                type: 'sequence',
                name: '连续睡觉二',
                children: [{
                    type: 'delay',
                    timeout: 2000,
                    name: '连续睡觉delay2000'
                }, {
                    type: 'delay',
                    timeout: 500
                }]
            }, {
                type: 'code',
                name: '输出连续睡觉二 code Activity',
                code: 'console.log("连续睡觉二 code Activity")'
            }]
        }, {
            type: 'code',
            name: '输出当前时间',
            code: 'console.log(new Date().toLocaleString())'
        }]
    },
    elseif: [{
        type: "assertSequence",
        assert: 'ctx.count <=10 ',
        name: '如果count小于等于10',
        children: [{
            type: 'code',
            name: '分支输出',
            code: `console.log("count小于等于10分支")`
        },{
            type: 'delay',
            name: 'delay 10 秒',
            time: 10000
        }, {
            type: 'code',
            name: '输出当前时间',
            code: 'console.log(new Date().toLocaleString())'
        }]
    }, {
        type: "assertSequence",
        assert: 'ctx.count <=15 ',
        name: '如果count小于等于15',
        children: [{
            type: 'code',
            name: '分支输出',
            code: `console.log("count小于等于15分支")`
        },{
            type: 'delay',
            name: 'delay 15秒',
            time: 15000
        }, {
            type: 'code',
            name: '输出当前时间',
            code: 'console.log(new Date().toLocaleString())'
        }]
    }, {
        type: "assertSequence",
        assert: 'ctx.count <=25 ',
        name: '如果count小于等于25',
        children: [{
            type: 'code',
            name: '分支输出',
            code: `console.log("count小于等于25分支")`
        },{
            type: 'delay',
            name: 'delay 25秒',
            time: 25000
        }, {
            type: 'code',
            name: '输出当前时间',
            code: 'console.log(new Date().toLocaleString())'
        }]
    }],
    else: {
        type: "assertSequence",
        name: '如果count大于25',
        children: [{
            type: 'code',
            name: '分支输出',
            code: `console.log("count大于25分支")`
        },{
            type: 'delay',
            name: 'delay 50秒',
            time: 50000
        }, {
            type: 'code',
            name: '输出当前时间',
            code: 'console.log(new Date().toLocaleString())'
        }]
    }
}


const activity = createActivity(activityProps);

activity.run();