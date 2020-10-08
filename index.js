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

accessSpreadsheet();
