const CLIENT = require('../Models/Client');
const bcrypt  =require('bcryptjs');





const recupererclient = async(req,res ,data) =>{
    CLIENT.find((err, data)=>{
        res.json(data);
        
    });
}
const recuperercliente = async(req,res ,data) =>{
  CLIENT.find((err, data)=>{
      res.json(data);
      
  }).select('RS_CLIENT');
}


const login = (req, res) => {


    console.log(
      req.body.email
    )
  
    console.log(
      req.body.password
    )
  
  
  
  
    var email = req.body.email
    var password = req.body.password
    CLIENT.findOne({ E_mail: email }, function (err, user) {
  
      if (err) {
        console.log(err);
      }
  
  
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err
            })
          }
  
          if (result) {
          
           
            
            return res.json({
  
                NUM_CLIENT: user.NUM_CLIENT,
           
              E_mail: user.E_mail,
          
              password: user.password,
         
          
  
  
  
  
            })
            
            
          } else {
            res.status(403).send({ message: "password does not matched !" });
  
          }
        })
  
  
      } else {
        res.status(403).send({ message: "Wrong email adress!" });
  
  
  
  
  
      }
    })

  
  }



   

      



module.exports ={
    recupererclient,login,recuperercliente
 }