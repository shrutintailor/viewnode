const  express  = require("express")

const app = express();
const Cust = require("./model/cust")
const db =require("./db/conn")
const port=process.env.PORT||8002;
const hbs=require("hbs");
const bodyparser=require("body-parser");
const cust = require("./model/cust");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));
app.set("view engine","hbs");
app.get("/",(req,res)=>{
    try {
        cust.find((err,docs)=>{
            if(!err)
            {
                console.log(docs);
                res.render("list",{
                    list:docs,
                    viewTitle:"customor List"
                });
            }   
            else
            {
                console.log("error in retriveing employee list"+err);
            }
        });
    } catch (error) {
        res.status(401).send(error);
    }
});
app.get("/cust",(req,res)=>{
    try {
            res.render("create",{
                viewTitle:"Add Employee"
            });
    } catch (error) {
        console.log(`erro in opening the page ${error}`);
    }
});
//app.post("/cust/add",(req,res))
app.post('/cust/add',(req,res)=>{
    try{
        var Cust =new cust();
        Cust.name =req.body.name;
        Cust.email = req.body.email;
        Cust.state =req.body.state;
        Cust.city=req.body.city;
        Cust.gender=req.body.gender;
        Cust.save((err)=>
        {
            if(!null)
            {
                res.redirect("/");
            }
            else
            {
                console.log(`erro in adding the data ${err}`);
            }
        })
    }catch(err){
        res.send("err"+err)
    }
})
app.get("/cust/delete/:id",(req,res)=>{
    try {
        const id=req.params.id;
        cust.findByIdAndRemove(id,(err,doc)=>{
            if(!err)
            {
                console.log("Deleted");
                res.redirect('/');
            }
            else
            {
                console.log("Error in deleteing record:"+err)
            }
        });
    } catch (error) {
        console.log(`data is not delete${error}`);
    }
});
app.get("/cust/edit/:id",(req,res)=>{
    try {
        cust.findById(req.params.id,(err,doc)=>{
            if(!err)
            {
                res.render("edit",{
                    cust:doc,
                    viewTitle:"Update Employee"
                });
            }
            else
            {
                console.log("Error in reterving data"+err);
            }
        })
    } catch (error) {
        console.log(`error on getting data by id${error}`);
    }
});
app.post("/cust/edit/:id",(req,res)=>{
    try {
        console.log(req.params.id);
        cust.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},(err,doc)=>{
            if(!err)
            {
                res.redirect('/');
            }
            else
            {
                console.log("Error during record update"+err);
            }
        })
    } catch (error) {
        console.log(`error on updateing data by id${error}`);
    }
})
app.listen(port,()=>{
    console.log(`running on the port no ${port}`);
})