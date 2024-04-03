const { log } = require("console");
const express=require("express")
app=express()

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.set("view engine", "ejs");
app.set("views", "./views");


app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const isOnService = day >= 1 && day <= 5 && hour >= 9 && hour < 17;


  if (isOnService) {
    next();
  } else {
    res.status(500).render("Out");
  }
});


app.get("/", (req, res) => {
    res.render("Home");
  });
  
  app.get("/Contact", (req, res) => {
    res.render("Contact");
  });
    
  app.post("/Contact", (req, res) => {
    const a=req.body
    log(a)
    res.render("Contact");
  });

  app.get("/Services", (req, res) => {
    res.render("Services");
  });
  
  app.listen(8000, () => {
   console.log("the server is running well on the port 3000");
  });