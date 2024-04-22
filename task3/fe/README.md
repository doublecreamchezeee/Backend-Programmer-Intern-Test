# Task 3 - Family Tree Management System
Task 3 is an implementation of a family tree management system and display on the frontend.


## Development
To run the project locally for development: 
- Navigate to the `fe` and run `npm install` to install dependencies.
- Start the server by running `npm start`.
- Server will running on the `http://localhost:3000`

## Route
- **'/'** : Display the family tree with each card contains avatar, name and id
- **'/dayofbirth'** : Display the family tree with each card contains day of birth and id

## Features
- **Export JSON** : Download the file data of the family tree in the json format.
- **Edit Data** : Edit the data of family tree directly in the data.json file

## Implementation
Move to each foler to see the way of implementation for each component and logic

- Folder `utils` for handle the logic of tree implementation and the display of the tree.
- Folder `components` configure the layout and configuration for the UI of the tree's component such as Card, Link, Button, ... 
- Folder `redux` for setup, save and update for the setting & configure of tree. 
