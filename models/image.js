const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    title:String,
    image:String
}
// ,{ timestamps: true }
)
// module.exports = mongoose.model('Image',imageSchema);
module.exports = imageSchema;