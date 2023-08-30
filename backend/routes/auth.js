const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'naz@secKey';
const fetchuser = require('../middleware/fetchuser');
//Route 1 :: create a user using POST : "/api/auth/createuser" , no login required
router.post('/createuser', [
    body('name', 'enter valid name').isLength({ min: 3 }),
    body('email', 'enter valid email').isEmail(),
    body('password', 'password must be atleast 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    //if there are errors return those errors and bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, error: errors.array() });
    }
    try {

        //checks wheather a user exists with this email or not
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "sorry a user already exists with this email " })
        }
        //if user with entered email doesn't exist then we will create user in mongo db using UserSchema model created in user.js
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const jwtData = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(jwtData, JWT_SECRET);
        // .then(user => res.json(user))
        // .catch(err => { console.log(err), res.json({ error: "please enter a valid unique email id ", message: err.message }) });
        success = true;
        return res.json({ success, authToken });
    }
    catch {
        console.error(errors.message);
        return res.status(500).send("Internal server error ")
    }
})

//Route 2 :: authenticate a user using POST : "/api/auth/loginuser" , no login required

router.post('/loginuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    //if there are errors returns bad request and the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, error: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "please try to login with valid credentials" })
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ success, error: 'please try to login with valid credentials' })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

//Route 3 :: get logged-in user details uing POST : "/api/auth/getuser" , Login required
router.post('/getuser', fetchuser, async (req, res) => {
    let success = false
    try {
        const userid = req.user.id;
        //we can't get password we will fetch remaining fields
        const user = await User.findById(userid).select('-password');
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router;