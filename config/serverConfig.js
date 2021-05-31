var fs = require('fs')

var serverConfig = {
    local: {
        port : "3000",
        mongoDbUri : 'localhost:27017/chatMongo',
    }
}

exports.get = function get(env) {
    if (env == null || env == undefined) {
        console.log("[serverChat] {local} node app.js")
        process.exit(0);
    }
    return serverConfig[env] || serverConfig.default;
}