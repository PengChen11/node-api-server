# Code Fellows Javascript 401 lab -- build an API Server

## Stage 1

We’re opening a online store! In order to support our web application, we need to create an API that will serve specific data (namely, categories and products) to our application. We will write an API to interface with our databases to provide category and product information to our front end app.

[Click here to see stage 1 documents](phase_docs/store_backend/readme.md);

## Stage 2

Our business is expanding! We have a real need to manage a list of users of many types, and control their access to our data accordingly. The system to be built will have the following core features:

1. Users can create an account, associated with a “role”
2. User Roles will be pre-defined and will each have a list of allowed capabilities
     - admin can read, create, update, delete
     - editor can read, create, update
     - writer can read, create
     - user can read
3. Users can then login with a valid username and password
4. Alternatively, users can login using an OAuth provider such as Google or GitHub
    - In this case, users should be automatically assigned the role of user
5. Once logged in, Users can then access any route on the server, so long as they are permitted by the capabilities that match their role.
    - For example, a route that deletes records should only work if your user role is “admin”

[Click here to see Stage 2 docs](phase_docs/Authentication/readme.md)
