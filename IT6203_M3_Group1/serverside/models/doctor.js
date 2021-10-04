const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const doctorSchema = new mongoose.Schema({
    name:  { type: String, required: true},
    specialities:  { type: String, required: true},
    location:  { type: String, required: true},
    phoneNumber:  { type: String, required: true},
    visitingHours:  { type: String, required: true}
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Doctor',
 doctorSchema,'Doctor');
//note capital S in the collection name