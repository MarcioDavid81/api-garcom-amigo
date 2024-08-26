"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    //Recebr o token
    const authToken = req.headers.authorization;
    //Validar se o token está preenchido
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        //Validar o token
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_JWT);
        //Recuperar informações do usuário
        req.user_id = sub;
        return next();
        //Em caso de erro
    }
    catch (err) {
        return res.status(401).end();
    }
}
