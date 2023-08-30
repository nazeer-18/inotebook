const jwt = require('jsonwebtoken');
const JWT_SECRET = 'naz@secKey';
const fetchuser = async (req, res, next) => {
    //Get the user from the jwt token and add id to request as object
    const authToken = req.header('auth-token');
    //if authToken is empty it sends bad request as response
    //console.log("yours auth token is ", authToken)
    if (!authToken) {
        return res.status(401).send({ error: 'please authenticate using a  token ' });
    }
    try {
        const data = jwt.verify(authToken, JWT_SECRET);
        //adds id obejct to request 
        req.user = data.user
        //next will run the following function
        next();
    }
    catch (error) {
        // if authtoken is not verified then it sends bad request
        return res.status(401).send('please authenticate using a valid token ');
    }
}

module.exports = fetchuser;