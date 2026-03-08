import mongoose from "mongoose";

const categorySchema= new  mongoose.Schema({
    name: {
        type: String,
        default: " ",
    },
    image: {
        type: String,
        default: "",
    }
},
{
    timeStamps:true
});

const CategoryModel= mongoose.model("Category", categorySchema);

export default CategoryModel;