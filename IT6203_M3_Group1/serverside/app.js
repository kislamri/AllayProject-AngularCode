const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
//specify where to find the schema
const Patient = require('./models/patient');
// Appoitment Schema
const Appointment = require('./models/appointment');
// Sickness Schema
const Sickness = require('./models/sickness');
//Doctor Scheman
const Doctor = require('./models/doctor');
//connect and display the status
/*  mongoose.connect('mongodb://localhost:27017/IT6203', {
     useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => { console.log("connected"); })
    .catch(() => { console.log("error connecting"); }); */   


// connect MongoDB Atlas

mongoose.connect('mongodb+srv://team1:team123@cluster0.bpub3.mongodb.net/IT6203?retryWrites=true&w=majority',{
     useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => { console.log("connected"); })
   .catch(() => { console.log("error connecting"); });   

     

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
})
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//parse application/json
app.use(bodyParser.json())

//in the app.get() method below we add a path for the students API 
//by adding /patients, we tell the server that this method will be called every time http://localhost:8000/students is requested. 
app.get('/patient', (req, res, next) => {

// call mongoose method find (MongoDB db.Patient.find())
Patient.find()
//if data is returned, send data as a response
.then(data => res.status(200).json(data))
//if error, send internal server error
.catch(err =>{
    console.log('Error: ${err}');
    res.status(500).json(err);
});

});

//in the app.get() method below we add a path for the students API 
//by adding /appointment, we tell the server that this method will be called every time http://localhost:8000/students is requested. 
app.get('/appointment', (req, res, next) => {
    //we will add an array named students to pretend that we received this data from the database

// call mongoose method find (MongoDB db.Appointment.find())
Appointment.find()
//if data is returned, send data as a response
.then(data => res.status(200).json(data))
//if error, send internal server error
.catch(err =>{
    console.log('Error: ${err}');
    res.status(500).json(err);
});

});

// GET sickness method
app.get('/sickness', (req, res, next) => {
 
    Sickness.find() 
    //if data is returned, send data as a response 
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');   
    res.status(500).json(err);
});
});

// GET doctor method
app.get('/doctor', (req, res, next) => {
 
    Doctor.find() 
    //if data is returned, send data as a response 
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');   
    res.status(500).json(err);
});
});

//serve incomming post request to / patients
app.post('/patient', (req, res, next) =>{

    //Create a new patient variable and save request's fields
    const patient = new Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        phone: req.body.phone,
        patientType: req.body.patientType,
        gender: req.body.gender,
        reasonOfVisit: req.body.reasonOfVisit,
      /*   street: req.body.street,
        cityName: req.body.cityName,
        state: req.body.state,
        zip: req.body.zip */
    });
    
    
    //send the document to the database
    patient.save()
    //incase of success
    .then(() =>{console.log('Success');})
    //if error
    .catch(err =>{ console.log('Error:' +err);});
    });

//serve incomming post request to / appointment
app.post('/appointment', (req, res, next) =>{

    //Create a new appointment variable and save request's fields
        const appointment = new Appointment({
            findLocation: req.body.findLocation,
            planVisit: req.body.planVisit,
            findDoctor: req.body.findDoctor,
            insured: req.body.insured,
            
        });
        
        //send the document to the database
        appointment.save()
        //incase of success
        .then(() =>{console.log('Success');})
        //if error
        .catch(err =>{ console.log('Error:' +err);});
        });



//serve incomming post request to / doctor
app.post('/doctor', (req, res, next) =>{

    //Create a new appointment variable and save request's fields
        const doctor = new Doctor({
            name: req.body.name,
            specialities: req.body.specialities,
            location: req.body.location,
            phoneNumber: req.body.phoneNumber,
            visitingHours: req.body.visitingHours,
        });
        
        //send the document to the database
        doctor.save()
        //incase of success
        .then(() =>{console.log('Success');})
        //if error
        .catch(err =>{ console.log('Error:' +err);});
        });
    
//Post Sickness

app.post('/sickness', (req, res, next) => {
    const sickness = new Sickness({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth,
        patientType: req.body.patientType,
        symptoms1: req.body.symptoms1,
        symptoms2: req.body.symptoms2,
        symptoms3: req.body.symptoms3,
        diseases: req.body.diseases
    });
    //send the document to the database 
    sickness.save()
        //in case of success
        .then(() => { console.log('Success');})
        //if error
        .catch(err => {console.log('Error1:' + err);});
});


//serve incoming put requests to /patients 
app.put('/patient/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        Patient.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
                phone: req.body.phone,
                patientType: req.body.patientType,
                gender: req.body.gender,
                reasonOfVisit: req.body.reasonOfVisit     
            }}, 
            {new:true} 
        ) 
        .then((patient) => { 
            if (patient) { //what was updated 
                console.log(patient); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

//serve incoming put requests to /appointmetns 
app.put('/appointment/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        Appointment.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                findLocation: req.body.findLocation,
                planVisit: req.body.planVisit,
                findDoctor: req.body.findDoctor,
                insured: req.body.insured,
                
            }}, 
            {new:true} 
        ) 
        .then((appointment) => { 
            if (appointment) { //what was updated 
                console.log(appointment); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

//serve incoming put requests to /sickness
app.put('/sickness/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        Sickness.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                phoneNumber: req.body.phoneNumber,
                dateOfBirth: req.body.dateOfBirth,
                patientType: req.body.patientType,
                symptoms1: req.body.symptoms1,
                symptoms2: req.body.symptoms2,
                symptoms3: req.body.symptoms3,
                diseases: req.body.diseases
            }}, 
            {new:true} 
        ) 
        .then((sickness) => { 
            if (sickness) { //what was updated 
                console.log(sickness); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

//serve incoming put requests to /doctor
app.put('/doctor/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        Doctor.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                name: req.body.name,
                specialities: req.body.specialities,
                location: req.body.location,
                phoneNumber: req.body.phoneNumber,
                visitingHours: req.body.visitingHours, 
            }}, 
            {new:true} 
        ) 
        .then((doctor) => { 
            if (doctor) { //what was updated 
                console.log(doctor); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/doctor/:id", (req, res, next) => {
    Doctor.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
 
});

app.delete("/patient/:id", (req, res, next) => {
    Patient.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
 
});

app.delete("/appointment/:id", (req, res, next) => {
    Appointment.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
 
});app.delete("/sickness/:id", (req, res, next) => {
    Sickness.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
 
});


//to use this middleware in other parts of the application
module.exports=app;
                    
