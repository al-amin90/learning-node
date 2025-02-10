// local module
const {add , a} = require('./local.js')
const {add:add2 , a:a2} = require('./local2.js')

console.log(add2(a, 1, 2));


// built in module
const path = require("path")
console.log(path.dirname("C:/projects/level2/learning-node/local.js"));
console.log(path.parse("C:/projects/level2/learning-node/local.js"));
console.log(path.join("C:/projects/level2/learning-node/", "local.js"));