
import mongoose from "mongoose";

const addressSchema= mongoose.Schema({
    address_line:{
        type: String,
        default: "",
    },
    city:{
         type: String,
        default: "",
    },
    state:{
         type: String,
        default: "",
    },
    pincode:{
         type: String,
        
    },
    country: {
         type: String,
        
    },
    mobile:{
        type:Number,
        default: null,
    },

},
{
    timeStamps:true
});

const AddressModel= mongoose.model("Address", addressSchema);
export default AddressModel;