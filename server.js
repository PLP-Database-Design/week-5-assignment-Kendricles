// HTTP framework for handling requests
const express = require('express');
//Instance of express framework
const app = express(); 
// DBMS Mysql 
const mysql = require('mysql2');
// Cross Origin Resourse Sharing 
const cors = require('cors');
// Environment variable doc 
const dotenv = require('dotenv'); 


//Initialize dependencies
app.use(express.json());
app.use(cors());
dotenv.config();

//connection to teh database
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWROD,
	database: process.env.DB_NAME
});


//Check if there is a connection
db.connect((err) => {
	//If no connection
	if(err) return console.log("Error connecting to database:", err);

	//If successfully connected
	console.log("Connected to MYSQL as id: ", db.threadID);
})


//Retrieve required information from database
 
//Set view engine and views path

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Retrieve all patients
app.get('/data', (req,res) => {

    // Retrieve data from database 
    db.query(query_1, (err, results) =>{
    	const query_1 = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});


//Retrieve all providers
app.get('/data', (req,res) => {
	const query_2 = 'SELECT first_name, last_name, provider_specialty FROM providers';

    // Retrieve data from database 
    db.query(query_2, (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});

//Retrieve patients, filter by first_name
app.get('/data', (req,res) => {
	const {first_name} = req.query;
	const query_3 = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    // Retrieve data from database 
    db.query(query_3, [first_name], (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});


//Retrieve providers, filter by specialty
app.get('/data', (req,res) => {
	const {specialty} = req.query;
	const query_3 = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    // Retrieve data from database 
    db.query(query_4, [specialty], (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});


// Start the server 
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);

    // Sending a message to the browser 

    console.log('Sending message to browser...');
    app.get('/', (req,res) => {
        res.send('Server Started Successfully!');
    });

});