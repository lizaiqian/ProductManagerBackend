const User = require("../model/user");
const hash = require("hash.js");
const crypto = require("crypto");
const config = require("../config");

async function getUser(user) {
    let result = await User.findOne(user)
    return result;
}

async function userLogin(user) {
    const digestPassword = hash.sha224().update(user.password + user.username).digest("hex");

    if(await getUser({username: user.username, password: digestPassword})) {
        return user
    } else {
        throw new Error("用户名或密码不正确")
    }
}

async function userRegister(user) {
    if(await getUser({username: user.username})) {
        throw Error("用户名已存在")
    } else {
        const digestPassword = hash.sha224().update(user.password + user.username).digest("hex");
        user.password = digestPassword;
        user.role = 0
        const result = await User.create(user);
        return result;
    }
}

async function deleteUser(user) {
    if(await getUser(user)) {
        await User.deleteOne(user)
    } else {
        throw Error("用户不存在，删除失败")
    }
}

function aesEncode(content) {
    const cipher = crypto.createCipher("aes192", config.TOKEN_PASSWORD);
    let token = cipher.update(content, "utf8", "hex");
    token += cipher.final("hex")

    return token
}

module.exports = {
    getUser,
    userLogin,
    userRegister,
    deleteUser,
    aesEncode
}