const { MongoClient, ServerApiVersion } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URI
const uri = "mongodb+srv://nguyenthanhtri2112:htht01225923050@thanhtri.ivktvpn.mongodb.net/?retryWrites=true&w=majority&appName=thanhtri";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    useUnifiedTopology: true,
    useNewUrlParser: true 
  }
});

// Function to connect to MongoDB and return the client
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Function to close the MongoDB client
async function closeMongoDBConnection() {
  try {
    await client.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
  closeMongoDBConnection
};