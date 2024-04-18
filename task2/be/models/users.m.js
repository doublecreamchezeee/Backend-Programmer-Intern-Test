const { connectToMongoDB, closeMongoDBConnection } = require('../utils/db');
const {ObjectID} = require('bson');
// Function to get the users collection
async function getUsersCollection() {
  const client = await connectToMongoDB();
  return client.db("task2").collection("users");
}

// Function to get all users from the collection
async function getAllUsers() {
  try {
    const collection = await getUsersCollection();
    const users = await collection.find({}).toArray();
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
}
async function updateAllUser(users){
  // const users = await getAllUsers();
  const collection = await getUsersCollection();
  const list = {};

  users.forEach(user => {
    const { _id, username, email, birthdate } = user;
    list[_id] = { username, email, birthdate };
  });

  for (let i = 0; i < users.length; i++) {
    await updateUser(collection, users[i]._id, list[users[i]._id]);
  }

  return list
}
// Function to update a user in the collection
async function updateUser(collection, userID, userData) {
  try {
    console.log(userID,userData)
    
    await collection.updateOne(
      { _id: ObjectID(userID) }, 
      { $set: userData }
    );
    
    // if (result.modifiedCount === 0) {
    //   throw new Error(`User '${userID}' not found or update failed.`);
    // }

  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}


module.exports = {
  getAllUsers,
  updateAllUser,
  
};