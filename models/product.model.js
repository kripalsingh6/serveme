import mongoose from "mongoose";

const ProductSchema= mongoose.Schema({
    name: {
         type: String,
       
    },
    image:{
        type:Array,
        default: [],
    },
    category: [{
        type:mongoose.Schema.ObjectId,
        ref:'category',

    }],
    subCategory:[{
        type: mongoose.Schema.ObjectId,
        ref: 'subCategory',
    }],
    unit:{
         type: String,
        default: null,
    },
    stock:{
        type:Number,
        default: 0,
    },
    price:{
        type: Number,
        default:0
    },
    discount:{
        type:Number,
        default: null,
    },
    description: {
         type: String,
        default: "",
    },
    more_detail:{
         type: Object,
        default: {},
    },
    publish: {
        type:Boolean,
        default:true,
    }


},
{
    timeStamps:true
});
const ProductModel= mongoose.model("Product", ProductSchema);
export default ProductModel;