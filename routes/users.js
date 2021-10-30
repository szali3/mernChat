const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require ('../models/User')

router.get("/",(req,res)=>{
  res.send("hey its user route")
})

//udpate user
router.put("/:id" , async (req,res)=>{
  // if(req.body.userId === req.params.id || req.user.isAdmin){
  if(req.body.userId === req.params.id){

    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hast(req.body.password, salt)
      } catch(err){
        return res.status(500).json(err)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      res.status(200).json("Account has been updated ")
    } catch(err){
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json("You can only update your own account")
  }
})
//delete user
//get a user
//follow a user
//unfollow a user

module.exports = router;


//                 44 MINS  https://www.youtube.com/watch?v=ldGl6L4Vktk&t=0s