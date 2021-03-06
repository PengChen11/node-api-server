# LAB: API Server

Dynamic API Phase 4: Completing work on the API server

In this final phase, we’ll be making our API easier to manage, and much more extensible, allowing for it to automatically recognize new data models, backed by any database type. We’ll also be preparing it for delivery with a full suite of documentation, tests, and a permanent deployment

We will continue working in the virtual storefront domain, creating a list of categories and products.

## Phase 4 Requirements

From a business requirements standpoint, once again, nothing changes. Our API must continue to work as advertised on day 1. The focus of this phase is purely on refactoring. That means we’ll be targeting creating elegant, highly performant code that scales well and is extensible.

Specifically, from the API side, we will be combining our router modules into a single module that can load the correct model dynamically. On the data model side, we’ll be DRYing up the collection module for our 2 data models into a common “mongo” collection so that adding new data models in the future is as easy as adding a schema file

## Technical Requirements / Notes

### API Server

In Phase 4, we have 2 primary goals:

- Create a single router module that will work for any data model, rather than having separate router modules for every data module.
- Create a single “mongo” collection class that every data model can extend from, keeping the CRUD logic for our models very DRY
Noted here are the relevant changes you’ll need to make to your server to complete Phase 3:

#### Create a new generic “api” router module

In this part of the refactor, we’ll be dynamically loading the model specified in the routes, dynamically, and using that in our route handlers for all CRUD operations. This is done in place of requiring the data model as a normal dependency in our route module.

- Name it something generic like lib/routes/api.js or lib/routes/api-v1.js
- Model this after one of your other working routes
- Setup express params middleware at the top level, to run a function on the “model” parameter
  - In this middleware, dynamically require() the data model specified by the model parameter:
  - Identify a valid model in the route param
  - Finds the module in the file system
  - Requires and instantiates it
  - Makes that model available to the handler functions so that they can still call, for example, `request.model.create()
- Change your route definitions to recognize dynamic models, and engage this new middleware
  - i.e. router.get('/api/v1/:model', handleGetAll)
- In your route handlers, use the model your params middleware (above) identified and loaded
  - Ideally, these will be on the request object, so you can simply call the methods like:
    - request.model.create( request.body ) instead of categories.create( request.body )

#### Modularize the “model” middleware

If you haven’t already done so, move that “model finder” params middleware to a separate module in your middleware folder and have your generic api router require it.

- This will allow you to write separate unit tests for this middleware
- You can (and should at some point) add extra logic and security to this module, perhaps extending it with additional functionality such as
  - Pre-loading data models
  - Listing available models
  - Validation and security checks

#### DRY your data models and collections

At this point, we have 2 data model folders, categories and products, each with both a collection and a schema. The schemas are clearly unique to each data model, but the collections are basically identical. They each require their schema, and export a class that performs basic CRUD operations using the appropriate Mongoose methods from the schema.

Since the only real difference between those 2 collections is the schema itself, let’s take this opportunity to create ONE collection class, and have the “collections” for each of these schemas simply extend from that.

- Create a new file at the root of your models folder called mongo.js
  - This will serve as the “master” class for Mongo data collections
- This module should export a Class that has methods for the CRUD operations, just as we currently have for categories and products
- Change the module’s constructor to accept a schema as an argument when creating an instance, and use that throughout the methods to operate on the mongoose schema
- Edit your current category and product collections
  - Change these to extend from the master class you just created, but send their own schema into the constructor
  - Remove all of the methods that the master class is now providing for you
  - Export these new (and vastly smaller) classes
  - Pro-Tip – if you export an instance of the class, your API won’t have to instantiate after it requires these modules
    - This is called a “singleton” in classical object oriented programming vernacular

Engineering Note - Modularity is a tool that not only makes your code more readable and consumable by other developers, it helps you to think about how to break problems down

### Testing

- Write tests as follows
  - Unit tests for your middleware
  - Route tests for our server
  - Every route should respond with the right status code and the expected data
  - CRUD tests for your collection classes
  - Use the supergoose testing library to ensure that none of your data is persisted into a live database and that your server need not be started.
