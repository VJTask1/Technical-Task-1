# Technical-Task-1

**Usecase**: Build a highly available emailing microservice

**Platform**: Google Firebase

**Service**: Google Cloud Functions

**Database**: Cloud Firestore (NoSQL)

### Description

The microservices has been created using Google Cloud Functions (GCFs). GCFs are serverless, scalable functions-as-a-service components which can be used for quick development and deployment. <br>
For the mailing service, I have used the Gmail SMTP server. I have created a dummy gmail ID from where the mails would be sent. I have obtained the Google OAuth2 Keys (clientID, clientSecret, etc) from Google Cloud Platform by enabling the Gmail API service. These credentials have been added to a Cloud Firestore (NoSQL cloud database) document. 

The Cloud function created is a HTTP POST service, with the inputs as sender email, message subject and message body. 
The node module used for configuring the smtp, and sending the mail is **nodemailer**

On call of the function, we check whether all the required parameters are present before going ahead with the mail function. <br>
Once this check is completed, the function would get the Google OAuth2 Keys from Cloud Firestore document. Using this data, nodemailer would define the connection data and the mail would be sent.

Below is the runtime configuration data for the Cloud function. We would be using the default autoscaling functionality, which would increase the number of instances if there is any high usage.

<img width="533" alt="Screenshot 2021-09-12 at 10 38 19 PM" src="https://user-images.githubusercontent.com/90556203/132992854-d78ab2bc-968a-4f3c-ac20-ae87956a5122.png">

Due to the time constraint, I have not build the front end screen to get the imput parameters from the user. <br>
My idea for the screen was to create a web application using Angular and host it in Firebase itself. The screen would be a simple form with 3 input fields (sender email, Mail Subject and Mail Body), and a send button which would trigger the HTTP function.

### Scope for Enhancement

We can have a basic queueing system implemented for this, using the following services. <br>
**Firestore**: We can add the data related to the emails, Sender ID, Subject, Body and Email Status (Delivered/Failed) in a new collection.<br>
**Cloud Function Triggers**: We can use cloud function triggers to check if there are any failed emails from Firestore collection, and resend them.
