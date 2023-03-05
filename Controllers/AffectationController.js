const AFFECTATION   = require('../Models/affectation');
const CLIENT = require('../Models/Client');
const Auditeur   = require('../Models/auditeur');
const TQT = require('../Models/TQT')




const recupereaff = async(req,res) =>{
 
    let data = await AFFECTATION.find(
        { 
            NUM_CLIENT:req.params.key,
         }
        ).select('INTITULE_QT')
        
    res.send(data);
    
   }

   const recupereaffaud = async(req,res) =>{
 
    let data = await AFFECTATION.find(
        { 
            COD_AUDITEUR:req.params.key,
         }
        ).select('INTITULE_QT')
        
    res.send(data);
    
   }



const affecte= async (req, res) => {
    console.log(
        req.body.que
)


console.log(
    req.body.DATE_AFF
)
console.log(
    req.body.num
)
console.log(
    req.body.aud
)

console.log(
    req.body.iti
)





  
const { DATE_AFF } = req.body;
    
    
  

    const pharm = await CLIENT.findOne({RS_CLIENT : req.body.num}).select('NUM_CLIENT')
    const s1 = await TQT.findOne({ INTITULE_QT : req.body.que}).select('NUM_QT INTITULE_QT')
    const s2 = await Auditeur.findOne({NOM_AUDITEUR : req.body.aud}).select('COD_AUDITEUR')
    //const s3 = await TQT.findOne({NOM_AUDITEUR : req.body.iti}).select('INTITULE_QT')
    

console.log(s2)
    let nouvellenews = new AFFECTATION({});

    nouvellenews.NUM_QT = s1.NUM_QT;
    nouvellenews.DATE_AFF = DATE_AFF;
    nouvellenews.NUM_CLIENT = pharm.NUM_CLIENT;
    nouvellenews.COD_AUDITEUR = s2.COD_AUDITEUR;
    nouvellenews.INTITULE_QT = s1.INTITULE_QT;
  
  
    
    nouvellenews.save();

    res.status(201).send({ message: "success"});
}
module.exports = {
    affecte,recupereaff,recupereaffaud

}