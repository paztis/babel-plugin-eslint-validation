const path = require('path');

const pluginPath = path.resolve(process.cwd(), "src/index.js");

module.exports = {
    "plugins": [path.relative(__dirname, pluginPath)]
    // "plugins": [
    //     [path.relative(__dirname, pluginPath), {
    //         "fix": true
    //     }]
    // ]
};
