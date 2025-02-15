const mongoose =require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>console.log("mongodb connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));