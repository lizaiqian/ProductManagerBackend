require("../../db")
const userService = require("../../service/user");

function testRegister() {
    userService.userRegister({
        username: "232323",
        password: "123",
        age: 22
    })
}

async function testLogin() {
    let result = await userService.userLogin({
        username: "lzq",
        password: "123"
    })
    console.log(result);
}

function testDelete() {
    userService.deleteUser({
        username: "张彩"
    })
}

async function testIsexist() {
    let result = await userService.getUser({
        username: "lzq"
    })
    console.log(result);
}

// testRegister()
// testIsexist()
testLogin()