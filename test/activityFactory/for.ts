import { $, IActivityConfig, createInstance } from '../../src';


const activityProps: IActivityConfig = $.for_({
    type: 'for',
    name: 'for',
    options: {
        values: [{ name: 1 }, { name: 2 }],
        indexName: "index",
        itemName: "item"
    },
    children: [{
        useParentCtx: true,
        type: 'delay',
        name: '延时2秒',
        options: { timeout: 1000 * Math.random() }
    }, $.code({
        useParentCtx: true,
        type: 'code',
        name: '输出当前日期',
        // options: { code: 'console.log($$.item.name)' }
        options: {
            code(params){
                
            }
        }
    })]
})

const instance = createInstance();
const activity = instance.createActivity(activityProps);

activity.run();