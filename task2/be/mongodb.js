const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://nguyenthanhtri2112:htht01225923050@thanhtri.ivktvpn.mongodb.net/?retryWrites=true&w=majority&appName=thanhtri";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Access the task2 collection
    const task2 = client.db("task2");
    const userCollection = task2.collection("users");

    // Now you can perform operations on the task2 collection
    // For example, you can query documents from the collection
    const documents = await userCollection.find({}).toArray();
    console.log("Documents from task2 collection:", documents);
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

/* 
output: 

Documents from task2 collection: [
  {
    _id: 662102c71458be3a98346c4d,
    username: 'thanhtri',
    email: 'ttri@gmail.com',
    birthdate: 2003-10-15T00:00:00.000Z
  },
  {
    _id: 662105c5815e32bf6559dae2,
    username: 'khaihoan',
    email: 'hoan@gmail.com',
    birthdate: 2002-01-26T17:00:00.000Z
  },
  {
    _id: 662106294c9eac8ae2d5fb54,
    username: 'hoangkhanh',
    email: 'khanh@gmail.com',
    birthdate: 2002-12-14T00:00:00.000Z
  }
]

*/