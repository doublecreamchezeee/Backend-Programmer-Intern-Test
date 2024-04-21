# Task 2 - Backend APIs custom
Task T1.2 is an implementation of the custom APIs to processing the data from MongoDB and also deploy on AWS. Furthermore, an alternative on React for frontend development to show the data and the way 2 server frontend and backend communicate.


## Development
To run the project locally for development: 
- Navigate to the `be` or `fe` folder and run `npm install` to install dependencies.
- Set up the `.env` file on the root in both folder.
- Start the both server by running `npm start`.

## Backend
The backend application is developed using Express and provides RESTful APIs to interact with the data stored in MongoDB

#### Features & APIs
- **GET '/'** : Fetches all data from MongoDB
- **POST '/update'** : Updates the data from MongoDB

#### Deployment 
The backend application is developed and accessible at `http://54.253.35.37:9000`

#### Authentication
Authentication is required to access the APIs. Please refer to the authentication documentation for details on how to authenticate

#### Error Handling
The backend application includes middleware to handle exceptions and errors, ensuring a smooth user experience.

## Frontend
The frontend application is built with React and provides a user interface to view and update data.

#### Features
- Table of Values: Displays data in a tabular format.
- Search Functionality: Allows users to search for specific data using a search input field.
- Data Update: Enables users to update data in the table by making changes and pressing the update button.
#### Deployment
The frontend application is deployed and accessible at `http://3.27.58.162:3000`.
