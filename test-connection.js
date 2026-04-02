// const { MongoClient } = require("mongodb");

// // REPLACE WITH YOUR ACTUAL PASSWORD
// const uri =
//   "mongodb+srv://abditadesse89_db_user:4XzujhyHNdvd579@devflow.zvnm81m.mongodb.net/?retryWrites=true&w=majority";

// // Remove the options object completely or leave it empty
// const client = new MongoClient(uri); // ← No options needed!

// async function testConnection() {
//   try {
//     console.log("🔄 Connecting to MongoDB Atlas...");
//     await client.connect();
//     console.log("✅ SUCCESS! Connected to MongoDB!");

//     // Test by listing databases
//     const databases = await client.db().admin().listDatabases();
//     console.log(
//       "📊 Available databases:",
//       databases.databases.map((db) => db.name)
//     );
//   } catch (error) {
//     console.error("❌ Connection failed:", error.message);
//   } finally {
//     await client.close();
//   }
// }

// testConnection();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://abditadesse89_db_user:4XzujhyHNdvd579@devflow.zvnm81m.mongodb.net/?appName=DevFlow";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
