const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/custdb1",{

    useNewUrlparser:true,
   // useUndifindTopology:true;
    useUnifiedTopology:true
}).then(()=>
{
 console.log("success")
}).catch((e)=>{
    console.log(`no connection ${e}`)
})

