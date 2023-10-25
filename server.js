import express, { urlencoded } from "express";
import "dotenv/config";

const app = express();
import routes from "./routes/index.js";

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
    return res.send("Hi everyone");
})

// Route file

app.use(routes)



app.listen(3000,()=>{
    console.log("Server started a port 3000");
})