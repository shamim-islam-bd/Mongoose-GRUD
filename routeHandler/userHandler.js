const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);


// Sign-Up
router.post("/signup", async (req, res)=>{
    try{
    const hasPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: hasPassword,
    });
    // console.log(newUser);
    await newUser.save();
    res.status(200).json({
          message: "Sign-Up was successfully!",
       });
   } catch{
    res.status(500).json({
          message: "Sign up failed.",
      });
   }

});

//Login 
// router.post("/login", async(req, res) => {
//     try {
//         const user = await User.find({ username: req.body.username });
//         console.log(user);
//         if(user && user.length > 0){
//             const isValiedPassword = await bcrypt.compare(req.body.password, user[0].password);
//              console.log(isValiedPassword);
//             if(isValiedPassword){
//               //generate token.
//              const token = jwt.sign({
//                 username: req.body.username,
//                 userId: user[0]._id,
//                }, process.env.JWT_SECRET, {
//                  expiresIn: '1h'
//                 });
               
//                 res.status(200).json({
//                     'access-token': token,
//                     'message': "Login successfully!",
//                 });

//             }else{
//                 res.status(401).json({
//                     "error" : "Authetication failed!"
//                 })
//             }
           
//         } else{
//             res.status(401).json({
//                 "error" : "Authetication failed!"
//             })
//         }
//     } catch (error) {
//         res.status(401).json({
//             "error" : "Authetication failed!"
//         })
//     }
// })



router.post("/login", async(req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        console.log(user);
        if(user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if(isValidPassword) {
                // generate token
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "Login successful!"
                });
            } else {
                res.status(401).json({
                    "error": "Authetication failed!"
                });
            }
        } else {
            res.status(401).json({
                "error": "Authetication failed!"
            });
        }
    } catch {
        res.status(401).json({
            "error": "Authetication failed!"
        });
    }
});



module.exports = router;