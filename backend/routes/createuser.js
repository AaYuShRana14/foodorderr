const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtSecret=("sinsondnndjnfjvnjkndeondedndndnefnrfrnrffrf");
const theusers=require('../Models/user');
const { validationResult, body } = require('express-validator');
router.post('/createuser',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 5 }),
        body('name').isLength({ min: 5 }),
        body('age').isNumeric()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        var salt = bcrypt.genSaltSync(10);
        let password = await bcrypt.hash(req.body.password, salt);
        try {
            await theusers.create({
                name: req.body.name,
                password: password,
                email: req.body.email,
                location: req.body.location,
                age: req.body.age
            }).then(res.json({ success: true }))
        }
        catch (e) {
            res.json({ success: fail })
        }
    })
router.post('/loginuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    try{
        let userdata=await theusers.findOne({email:req.body.email});
        if(!userdata){
            return res.status(400).json({errors:"User dont exists"});
        }
        let passwordcompare=await bcrypt.compare(req.body.password,userdata.password);
        if(!passwordcompare){
            return res.status(400).json({errors:"User dont exists"});
        }
        const data={
            user:{
                id:userdata.id,
            }
        }
        const authtoken=jwt.sign(data,jwtSecret);
        return res.json({success:true,authtoken});
    }
    catch(e){
        res.json({success:false})
    }
}
)
module.exports = router;