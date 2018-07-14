'use strict';


let managerUrl = [
    /.*/
]

let generalUrl = [
    /^.*\/product\/.*$/,
    /^.*\/order\/.*$/,
    /^.*\/category\/.*$/,
    /^.*\/user\/login.*$/
]

module.exports = (req, res, next) => {

    if(req.user) {

        let flag = false;

        const role = req.user.role;
        if(role == 0) {
            for(let i = 0; i < generalUrl.length; i++) {
                if(generalUrl[i].test(req.url)) {
                    flag = true;
                }
            }
        }

        if(role == 100) {
            for(let i = 0; i < managerUrl.length; i++) {
                if(managerUrl[i].test(req.url)) {
                    flag = true;
                }
            }
        }

        if(!flag) {
            throw Error("权限不足")
        }
    }

    next();
}