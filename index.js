const express = require("express")
const app = express()

const db = require("./model/connection")

app.use(express.json())  //middleware


//create user
app.post("/adduser",(req,res)=>{
    console.log(req.body)
    const user = {name:req.body.name,email:req.body.email,phone:req.body.phone,city:req.body.city}
    let sql ="INSERT INTO `employee` SET ?"
    db.query(sql,user,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})
//show user
app.get("/showuser",(req,res)=>{
    let sql = "SELECT * FROM `EMPLOYEE`"
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.json(result)
    })
})
//show a particular user
app.get("/showuser/:id",(req,res)=>{
    let sql = "SELECT * FROM `EMPLOYEE` WHERE id = "+req.params.id
    db.query(sql,(err,result)=>{
        if (err) throw err
        else
        res.json(result)
    })
})
//delete a user
app.delete("/deleteuser/:id",(req,res)=>{
    let id = req.params.id
    let sql = "DELETE FROM `employee` WHERE id="+id
    db.query(sql,(err,result)=>{
        if (err) throw err
        else
        res.json(result)
    })
            
})
//update a user
 app.put("/updateuser/:id",(req,res)=>{
let name = req.params.name
const email = req.params.email
const phone = req.body.phone
const city = req.body.city

// const user = {name:req.body.name,email:req.body.email,phone:req.body.phone,city:req.body.city}
 let sql = `UPDATE EMPLOYEE SET name='${name}',email='${email}',phone='${phone}',city='${city}'`
 
  db.query(sql,(err,result)=>{
         if (err) throw err
         else
          res.json(result)
    })          
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log(`server is running at ${PORT}`))