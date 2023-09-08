const mongoose = require('mongoose')

let SmartphoneSchema = new mongoose.Schema({
    name: String,
    price: Number,
    inStock: Boolean
  });

const Smartphone = mongoose.model("Smartphone", SmartphoneSchema);

// export default Smartphone;
module.exports =  Smartphone;