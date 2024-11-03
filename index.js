const express = require('express')
const app = express();
const fs= require('fs')
const path= require('path')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
   fs.readdir(`./files`, function(err,files){
      res.render("index",{files: files})
   })
  
})
app.listen(3000, (req,res)=>{
    console.log("its running")
})
