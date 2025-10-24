import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js"
import expenseRoutes from "./routes/expenseRoutes.js"

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());
connectDb ();

app.use("/api/expenses",expenseRoutes);

app.get("/", (req,res)=>{
    res.send("api is running...");
})

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`) );