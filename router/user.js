const UserService = require("../service/user");

const express = require("express");
const router = express.Router();
const config = require("../config")

router.post("/login", async (req, res) => {

    const user = await UserService.userLogin(req.body);

    let data = {
        username: user.username,
        empire: Date.now() + config.TOKEN_DURABLE
    }

    const token = UserService.aesEncode(JSON.stringify(data));

    user.password = ""
    res.success(token)

});

router.post("/register", async (req, res) => {

    const user = await UserService.userRegister(req.body);
    user.password = ""
    res.success(user)
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await UserService.deleteUser({_id: id});
    res.success(user)

});

module.exports = router