# subscription-management-system

Based on JavaScript Mastery's backend course on YouTube

## Features included:

1. Routes, using Express Router

   - in routes folder, contains \[auth,subscription,user\].routes.js files which handle individual routes

2. Models

   - data schema definitions to be stored on **MongoDB** (using mongoose)

3. Middleware

   - standard express middleware: json, urlencoded
   - dependencies: cookie parser
   - error.middleware.js, handles specific error codes/name
   - auth.middleware.js, sits between router requests to controllers for security, only users with valid bearer tokens can make authorized requests
     - |    No bearer token     |      bearer token      |
       | :--------------------: | :--------------------: |
       | ![](/images/auth2.png) | ![](/images/auth1.png) |

4. Controllers

   - auth.controller.js handles auth logic for sign up/in/out using JWT(JSON Web Tokens), img shows experimenting with auth POST request using HTTPie (API testing tool)
   - ![HTTPie experimenting with auth POST request](/images/httpie-signup.png)
   - user.controller.js handles retrieval of user information
