let config = null
const dev = require("./dev");
const prod = require("./prod");

if(process.env.manageProject == "product") {
    config = prod
} else {
    config = dev
}

module.exports = config;