// http://www.kxdaili.com/dailiip.html

import axios from 'axios';


axios({
    url: "https://www.baidu.com",
    proxy: {
        host: "124.78.242.87",
        port: 7890,
        protocol: "https"
    }
}).then(res => {
    console.log("res:", res.data);
}).catch(err => {
    console.log("error:", err);
})