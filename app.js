require("./db")
require("express-async-errors");
const config = require("./config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

//body-parser 中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//日志打印中间件
app.use(morgan("combined"));

//响应中间件
app.use(require("./middleware/response-mid"));

//token处理中间件
app.use(require("./middleware/token-mid"))
//权限中间件
app.use(require("./middleware/permission-mid"))

//用户登录router
app.use("/user", require("./router/user"));

//类目中间件
app.use("/category", require("./router/category"));

//商品中间件
app.use("/product", require("./router/product"));

//订单中间件
app.use("/order", require("./router/order"));

//错误处理中间件
app.use((err, req, res, next) => {
    res.fail(err.toString())
});

app.listen(config.PORT);
