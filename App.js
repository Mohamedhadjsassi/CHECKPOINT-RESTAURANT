const { log } = require("console");
const express=require("express");
const { default: mongoose } = require("mongoose");
app=express()

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.set("view engine", "ejs");
app.set("views", "./views");


// Connecting to the database
mongoose.connect("mongodb+srv://mohamedhadjsassi18:6I3S5Q2RReBdBZCd@cluster0.qlrcjl8.mongodb.net/Yummy")
.then(()=>console.log("connected to database"))
.catch((err)=>console.log(err))

// Customer schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number, max: 90, min: 10 },
  favoriteFoods: [String],
});


const arrayOfCustommer = [
  {
    name: "tonny kroos",
    age: 38,
    favoriteFoods: ["jilbana", "Burger"],
  },
  {
    name: "lewandowski",
    age: 19,
    favoriteFoods: ["spaghetti", "fish","Pizza"],
  },
  {
    name: "Harry kane",
    age: 29,
    favoriteFoods: ["3ssida"],
  },
];

// Model for customer collection
const Cuuustomer = mongoose.model("Cuuustomer", customerSchema);

app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const isOnService = day >= 1 && day <= 6 && hour >= 9 && hour < 17;


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


  app.get("/Test",async (req, res) => {
   
    res.render("Test");
    // Create a new customer
    const cuuustomer = new Cuuustomer({
    name: "Thomas Muller",
    age: 25,
    favoriteFoods: ["Peporoni", "frikassé","Pizza"],
    });
    // cuuustomer
    // .save()
    // .then((data) => console.log("The new cuuustomer has been saved", data))
    // .catch((err) => console.log(err));

    const data=await    cuuustomer.save()
    console.log("The new cuuustomer has been saved", data)

    //creating an array of custommer

   const createdPeople = await Cuuustomer.create(arrayOfCustommer)
    console.log("People created:", createdPeople);
    



    // Find all customers
    const data2=await  Cuuustomer.find()
     console.log("Customers found:", data2);
    
    
    // Find a person based on their favorite food 
     const food = "frikassé";
     const person=await  Cuuustomer.findOne({ favoriteFoods: food }) 
     console.log(`Person with '${food}' in their favorite foods:`, person)
    });
    app.get("/Test2",async (req, res) => {
     
      res.render("Test2");

   // Find a person by ID : "661d1aa0d471e0a0ba703ece"
    const personId = "661d1aa0d471e0a0ba703ece";
    const person2=await  Cuuustomer.findById(personId)
    console.log(`Person found by ID '${personId}':`, person2)
    // Update a person's favorite foods by ID
    person2.favoriteFoods.push("hamburger");
     const person2updated=await  person2.save()
      console.log(`Person with ID '${personId}' updated with favorite food 'hamburger':`, person2updated)
   
    // Update a person's age by name
     const personName = "Harry kane"; 
     const personAged=await  Cuuustomer.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true })
    console.log(`${personName}'s age has been updated to 20: ` + personAged)
 
    // Delete a person by ID
    const personId4="661d1aa0d471e0a0ba703ecf"
    removedPerson=await Cuuustomer.findByIdAndDelete(personId4)
    console.log("Person removed:", removedPerson);
    
    // Delete multiple people by name ('tuchel')
    const deletedperson=await Cuuustomer.deleteMany({ name: "tuchel" })
    console.log( `Number of people with name "tuchel" deleted: ${deletedperson}` );
  

  // Find people with favorite food 'Pizza', sort by name, limit them to 2 and exclude age field
  const data5=await Cuuustomer.find({ favoriteFoods: "Pizza" }).sort({ name: 1 }).limit(2).select("-age").exec()
  console.log("People with favourite food as pizza:", data5);

})
    
   
 


  
  app.listen(8000, () => {
   console.log("the server is running well on the port 8000");
  });
  







