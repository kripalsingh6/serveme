import mongoose from "mongoose";

const orderSchema= new mongoose.Schema({
   
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    orderId: {
        type:String,
        required: [true, "Provide order"],
        unique: true,
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
    },
    product_details: {
        name: String,
        image: Array,
    },
    paymentId: {
        type: String,
        default: ""
    },
    payment_Status:{
         type: String,
        default: ""
    },
    delivery_address:{
        type:mongoose.Schema.ObjectId,
        ref:"address",
    },
    subTotalAmt: {
        type: Number,
        default:0,
    },
    totalAmt: {
        type: Number,
        default:0,
    },
    Invoice_receipt: {
        type: String,
        default: ""
    }

},
{
    timestamps:true
});

const OrderModel= mongoose.Model("Order", orderSchema);

export default OrderModel;