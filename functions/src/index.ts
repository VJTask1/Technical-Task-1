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
    await admin.firestore().collection("Google Data").get()
    .then(userData => {
        let userDetails = userData.docs[0].data();
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: userDetails.user,
                clientId: userDetails.clientId,
                clientSecret: userDetails.clientSecret,
                refreshToken: userDetails.refreshToken,
                accessToken: userDetails.accessToken
            }
        });
        
        var mail = {
            from: userDetails.user,
            to: data.email_to,
            subject: data.subject,
            text: data.body
        }
        
        return transporter.sendMail(mail, function(err, info) {
            if (err) {
                response.send("Error: " + JSON.stringify(err));
            } else {
                response.send("Success: " + JSON.stringify(info));
            }
            transporter.close();
        });
    });

});
