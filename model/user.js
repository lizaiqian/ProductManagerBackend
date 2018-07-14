const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let user = new Schema({
    username: {
        type: String,
        required: [true, "用户名不能为空"],
        unique: [true, "用户名已存在"]
    },
    password: {
        type: String,
        required: [true, "密码不能为空"]
    },
    age: {
        type: Number,
        min: [0, "年龄必须大于0"],
        max: [120, "年龄必须小于120"]
    },
    role: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("user", user);