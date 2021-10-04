const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const patientSchema = new mongoose.Schema({
    firstName:  { type: String, required: true},
    lastName:  { type: String, required: true},
    dob:  { type: Date, required: true},
    phone:  { type: String, required: true},
    gender:  { type: String, required: true},
    reasonOfVisit:  { type: String, required: true},
    /* street:  { type: String, required: true},
    cityName:  { type: String, required: true},
    state:  { type: String, required: true},
    zip:  { type: String, required: true} */

});



//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Patient',
 patientSchema,'Patient');

