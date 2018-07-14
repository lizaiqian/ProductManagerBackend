const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(`mongodb://127.0.0.1/${config.DB}`)

const db = mongoose.connection;

db.on("error", function (err) {
    if(!err) {
        console.log("连接失败");
    }
})

db.once("open", function () {
    console.log("连接成功");
})