var express=require("express")
var app=express()
const path=require("path")
///////////////////////////////////////////////
const MongoClient = require("mongodb").MongoClient;
const assert=require("assert");
const { callbackify } = require("util");
const url='mongodb://localhost:27017';
const dbname='dbase';
const client=new MongoClient(url)

//////////////////////////////////////////////

app.use(express.static(path.join(__dirname,"public")))

app.set('view engine','ejs')
 

 app.get('/',(req,res)=>{
     res.sendFile(path.join(__dirname+'/firstpage.html'))
 });

 const Router=express.Router();

 Router.route('/second').get((req,res)=>{
     res.sendFile(path.join(__dirname+'/secondpage.html'))
 })

 Router.route('/second/third').get((req,res)=>{
    res.sendFile(path.join(__dirname+'/last.html'))
})

app.use('/',Router);

app.get('/hospital',(req,res)=>{

    const db=client.db(dbname);
    const collection=db.collection('hospital')

    collection.find({}).toArray(function(err,hosp_list){
        console.log("found")
        res.render('hospital',{'hospitals':hosp_list})
    })
    
})

client.connect(function(err){
    console.log("connected to mongo")
    app.listen(3000,()=>{
        console.log("server is running")
    })
})




 