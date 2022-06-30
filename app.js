// node modules
const express = require("express");
const bodyParser = require("body-parser")
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/",function(req,res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

const data = {
members:[
    { 
        email_address:email,
        status:"subscribed",
        merge_fields:{
        FNAME:firstname,
        LNAME:lastname,
      }
    }
  ]   
};
 const jsondata = JSON.stringify(data);
const url = "https://us14.api.mailchimp.com/3.0/lists/ca535e406b";
const options={
    method:"post",
    auth:"ankur:df8e6bf5f5ccdd7d1b7afa57ffffcc50-us14"
}
 const request = https.request(url,options,function(response){
if(response.statusCode===200){
    res.sendFile(__dirname + "/success.html");
}else{
    res.sendFile(__dirname + "/failure.html")
}

response.on("data",function(data){
console.log(JSON.parse(data));
})
 })
 request.write(jsondata);
 request.end();
// console.log(firstname,lastname,email);
})
app.post("/failure.html",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server listen on port 3000");
})

// df8e6bf5f5ccdd7d1b7afa57ffffcc50-us14
// df8e6bf5f5ccdd7d1b7afa57ffffcc50-us14

//list id --> ca535e406b