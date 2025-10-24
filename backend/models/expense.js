import mongoose from "mongoose";

const mongoSchema= new mongoose.Schema(
{
    title:{type: String, required: true},
    amount:{type: Number , required: true},
    date:{type:Date, required: true}
},
{ timestamps: true}
);

const Expense=mongoose.model("Expense",mongoSchema);

export default Expense ;
