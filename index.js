var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./credentials.json");

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet(
  "1J1U8awhcpyYrQg5z4Vx9uTu8Jn3-ycwZTGnZCpOPSMo"
);

function printDetails(element) {
  console.log("\n");
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log(`Timestamp: ${element["Timestamp"]}`);
  console.log(`Drop your name here: ${element["Drop your name here"]}`);
  console.log(`Your email?: ${element["Your email?"]}`);   
  let name = element["Drop your name here"];
  let email = element["Your email?"];
  console.log(`Your Contact Number? ${element["Your Contact Number?"]}`);
  console.log(
    `Drop your Linkedin Profile (URL): ${element["Drop your Linkedin Profile (URL)"]}`
  );
  console.log(
    `Proficiency in MERN Stack? ${element["Proficiency in MERN Stack?"]}`
  );
  console.log(
    `What are you currently doing? ${element["What are you currently doing? "]}`
  );
  console.log(
    `What are your expectation from the 100-days-of-code and why you want to join? ${element["What are your expectation from the 100-days-of-code and why you want to join?"]}`
  );
  console.log(`Github URL ${element["Github URL"]}`);
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log("\n");

  dbwrite(email,name,1);
  
} 

async function dbread(){ 
  let db = new sqlite3.Database('coders.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  }); 
  let sql = `SELECT email from coders`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
}); 

  db.close(); 
} 

function dbwrite(email,name,batch) {  
  console.log("about to insert  values",email) 
  console.log("about to insert  values",name)
  let db = new sqlite3.Database('coders.db', (err) => {
    if (err) {
      return console.error("database not connected",err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });  
  db.run(`INSERT INTO coders VALUES(?)`, ['C'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
}

async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  const rows = await sheet.getRows({
    offset: 1,
  });
  rows.forEach((element) => {
    printDetails(element);
  });
}

dbread();
// accessSpreadsheet();
