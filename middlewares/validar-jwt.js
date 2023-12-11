const jwt  = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    // Read token
    const token = req.header('x-token');

    if (!token) {
        console.log(token);
        return res.status(401).json({
            ok: false,
            msg: 'No token in request'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;

        console.log(uid);
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token not valid'
        });
    }

    next();
}

module.exports = {
    validarJWT
}