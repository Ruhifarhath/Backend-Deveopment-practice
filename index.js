const express = require('express')
const app = express()
const path= require('path')

//helps us to use the form
//parsers for the form
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'publc')))
//setting up ejs as view engine
app.set('view engine','ejs')

app.get("/",function(req,res){
    res.render("index")
})

app.listen(3000,function(){
    console.log("its running")
})