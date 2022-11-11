const jwt = require('jsonwebtoken');

module.exports = isAuthorized = (req, res, next) => {
    // return next();
    // If Authorization is disabled skip authorization
    // if(process.env.AUTH_DISABLED === true || process.env.AUTH_DISABLED === 'true'){
    //     return next();
    // }


    const authHeader = req.get('Authorization');

    // If header is not set
    if(!authHeader)
        return res.status(401).json({
            message: "Not Authenticated."
        });

    try{
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];

        // If bearer not added
        if(bearer !== 'Bearer')
            throw new Error('Not Authenticated.')

        const isTokenValid = jwt.verify(token, "TEST");

        if(!isTokenValid)
            throw new Error('Not Authenticated');

        next();
    }catch(err){
        res.status(401).json({
            message: "Not Authenticated."
        });
    }
};