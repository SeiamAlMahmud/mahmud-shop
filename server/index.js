const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 3000


app.use(bodyParser.json())
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your React app's origin
  credentials: true, // Allow cookies for cross-origin requests (if applicable)
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allowed HTTP methods
};
app.use(cors(corsOptions))
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@first-project.dkbbjak.mongodb.net/?retryWrites=true&w=majority&appName=First-Project`;


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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = await client.db('mahmudShop')
    const usersCollection = database.collection('users')
    const productsCollection = database.collection('products')


    // get all users
    app.get('/users', async (req, res) => {
      
      console.log(req.query.email)
      if (req.query.email) {
        const result = await usersCollection.find({email: req.query.email}).toArray();
        res.send(result)

      }
      if (!req.query.email) {
        const result = await usersCollection.find({}).toArray();
        res.send(result)

      }
    })
    app.post('/addUser', async (req,res) => {
      const user = req.body
      console.log(user)
      const isAvailable = await usersCollection.find({email: user.email}).toArray()
      console.log(isAvailable)
      if (isAvailable.length == 0) {
        
        const result = await usersCollection.insertOne(user)
        console.log(result)
        res.json(result[0])
      }
      if (isAvailable.length !== 0) {
        res.json(isAvailable[0])
      }
    })
    


   
// get all data from database
    app.get('/products', async (req,res)=> {
      const result = await productsCollection.find({}).toArray();
      // console.log(result)
      res.json(result)
    })

    //get single data from database
    app.get('/product/:key', async (req,res) => {
      console.log(req.params.key)
      const result = await productsCollection.find({id: req.params.key}).toArray();
      res.json(result[0])
    })
  } finally {
    // Ensures that the client will close when you finish/error
    //   await client.close();
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})