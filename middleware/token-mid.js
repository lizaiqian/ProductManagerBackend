const crypto = require("crypto");
const config = require("../config");
const userService = require("../service/user");

//对token进行解码
async function verifyToken(req, res, next) {

    if (!urlExclude(req.url)) {
        //url需要验证时，对token进行解码
        let token = null;

        try {
            const decipher = crypto.createDecipher("aes192", config.TOKEN_PASSWORD);

            token = decipher.update(req.get("token"), "hex", "utf8");
            token += decipher.final("utf-8");
        } catch (e) {
            throw Error("token不合法")
        }

        //获取token的json对象
        let parseToken = JSON.parse(token);

        let user = await userService.getUser({username: parseToken.username});
        if (!user) {
            throw Error("用户不存在")
        }

        if (Date.now() > parseToken.empire) {
            throw Error("token已过期")
        }

        req.user = user
    }

    next()
}

function urlExclude(url) {
    let excludeUrl = [
        /.*\/user\/login.*/,
        /.*\/user\/register.*/
    ]

    for(let i = 0; i < excludeUrl.length; i++) {
        if(excludeUrl[i].test(url)) {
            return true
        }
    }

    return false
}


module.exports = verifyToken