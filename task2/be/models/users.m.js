const { connectToMongoDB, closeMongoDBConnection } = require('../utils/db');

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

module.exports = {
  getAllUsers
};