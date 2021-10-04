const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const appointmentSchema = new mongoose.Schema({
    findLocation:  { type: String, required: true},
    planVisit:  { type: String, required: true},
    findDoctor:  { type: String, required: true},
    insured:  { type: String, required: true}
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Appointment',
 appointmentSchema,'Appointment');
//note capital S in the collection name
