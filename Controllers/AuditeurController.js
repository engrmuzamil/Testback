const Auditeur   = require('../Models/auditeur');
const CONTRAT = require('../Models/TCONTRAT');
const Tphase = require('../Models/Tphase');
const TTYPCONTRAT = require('../Models/TTYP_CONTRAT');
const bcrypt  =require('bcryptjs');
const config = require("../config.json");
const jwt    =require('jsonwebtoken')
const nodemailer = require('nodemailer');



const recupererclient = async(req,res ,data) =>{
    Auditeur.find((err, data)=>{
        res.json(data);
        
    });
}

const recupererauditeur = async(req,res ,data) =>{
    Auditeur.find((err, data)=>{
        res.json(data);
        
    }).select('NOM_AUDITEUR');
}
const recupererphase = async(req,res) =>{
    
    resultarray = [];
    resultss = [];
   let data = await Tphase.find(
    
        
            { COD_AUDITEUR: req.params.key}
        
    
   )
console.log(data)
 
data.forEach(   async element => {
    
    console.log("this is the element:"+ element);
     
     
     
        
        await getcontrat(element.NUM_CONTRAT).then(function (result) {
            resultarray.push(result[0]);
            res.json(result);
            

            console.log(resultarray)
        });
       

    
        

    
   })
  
   

   
 
   //let result = { name: "hello", tarray: resultarray}
   //console.log("+++++++++")


   result.forEach(   async element => {
    
    console.log("this is tthe resultt:"+ element);
     
     
     
        
        await getttcontrat(element.COD_TYP_CONTRAT).then(function (resu) {
            resultss.push(resu[0]);
            
console.log("***************************")
            console.log(resultss)
        });
       

    
        

    
   })
   setTimeout(function(){
    console.log("this is the array:"+ resultss);
    res.send(resultss);
 },1000);

}
async function getcontrat(numcontrat){
    console.log("this is the passed value:"+numcontrat)
    let data = await CONTRAT.find({ 
        NUM_CONTRAT : numcontrat } )
console.log("this the data:"+data);
            return data;
            
        

}
async function getttcontrat(codetypecontrat){
    console.log("this is the passed value:"+codetypecontrat)
    let data = await TTYPCONTRAT.find({ 
        COD_TYP_CONTRAT : codetypecontrat } )
console.log("this the data:"+data);
            return data;
            
        

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
    Auditeur.findOne({ E_mail: email }, function (err, user) {
  
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
  
                COD_AUDITEUR: user.COD_AUDITEUR,
           
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
    recupererclient,recupererphase,recupererauditeur,login,
    }