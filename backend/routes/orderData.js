const express=require('express');
const router=express.Router();
const theorders=require('../Models/orders');
router.post('/orderData',async(req,res)=>{
    let data=req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date});
    let emailId=await theorders.findOne({'email':req.body.email});
    if(emailId===null){
        try{
            await theorders.create({
                email:req.body.email,
                order_data:[data],
            }).then(res.json({success:true}))
        }
        catch(e){
            res.send("Server error",e.message);
        }
    }
    else{
        try{
            await theorders.findOneAndUpdate({email:req.body.email},{
                $push:{order_data:data}
            }).then(()=>{
                res.json({success:true});
            })
        }
        catch(e){
            res.send("Server error",e.message);
        }
    }
});
router.post('/myorders',async(req,res)=>{
    try{
        let userEmail=req.body.email;
        let mydata=await theorders.findOne({'email':userEmail});
        res.json({orderData:mydata})
    }
    catch(e){
        res.send("Server error",e.message);
    }
})
module.exports=router;