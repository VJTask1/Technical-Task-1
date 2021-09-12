import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

exports.sendeMail = functions.https.onRequest(async (request, response) => {
    if (request.method !== "POST") {
      response.status(400).send('Please send a POST request');
      return;
    }
  
    let data:any = request.body;
    console.log(data);

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'vjtask1@gmail.com',
            clientId: '223245186845-ie1abch9fr4v6qi0r8tlt5idh73d7lgs.apps.googleusercontent.com',
            clientSecret: 'oKj_Ndm0O8QCpuu6C2n2mjZ0',
            refreshToken: '1//04CbKoNK9zXy6CgYIARAAGAQSNwF-L9IrHfMDFBM15q9C2pehMcHcVpE-9KL8lrFJS9bzmcGFO5QMK0ZBSj37OrvzSY5XlwMmRmc',
            accessToken: 'ya29.a0ARrdaM_n_UDlyD184jJzkAjrwdvgE_Jrjjal3OntZu5avvQp0il_QA6rCc1CjQqJZeZSXaBiwXp3zXxy1QYxZP5x7KfheOM7pqoPaoaT15iScYflSu2jwX6EHD3Z6b39fOallS6gXc2B0YL9fcQh9432NBkm'
        }
    });
    
    var mail = {
        from: "vjtask1@gmail.com",
        to: data.email_to,
        subject: data.subject,
        text: data.body
    }
    
    transporter.sendMail(mail, function(err, info) {
        if (err) {
            response.send("Error: " + JSON.stringify(err));
        } else {
            response.send("Success: " + JSON.stringify(info));
        }
        transporter.close();
    });

});
