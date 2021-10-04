const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const sicknessschema = new mongoose.Schema({
    firstName:  { type: String, required: true},
    lastName:  { type: String, required: true},
    emailId:  { type: String, required: true},
    phoneNumber:  { type: Number, required: true},
    dateOfBirth:  { type: String, required: true},
    patientType:  { type: String, required: true},
    symptoms1:  { type: String  },
    symptoms2:  { type: String },
    symptoms3:  { type: String },
    diseases:  { type: String, required: true}
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Sickness', sicknessschema,'sickness');
//note capital S in the collection name