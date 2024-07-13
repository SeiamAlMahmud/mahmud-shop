const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const compression = require('compression')
const multer = require('multer');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

const path = require('path');
const fs = require('fs');
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000

app.use(compression({
  level: 6,
  threshold: 10 * 1000,
  filter: (req, res) => {
    if (req.header['x-no-compression']) {
      return false
    }
  }

}))

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

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + path.extname(file.originalname));
      }
    });

    const upload = multer({
      storage

    });

    // get all users
    app.get('/users', async (req, res) => {

      console.log(req.query.email)
      if (req.query.email) {
        const result = await usersCollection.find({ email: req.query.email }).toArray();
        res.send(result)

      }
      if (!req.query.email) {
        const result = await usersCollection.find({}).toArray();
        res.send(result)

      }
    })
    app.post('/addProduct', upload.single('image'), async (req, res) => {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
      console.log(req.body)
      try {
        const img = fs.readFileSync(path.join(__dirname, 'uploads', req.file.filename))

        const encode_image = img.toString('base64');

        const finalImg = {
          contentType: req.file.mimetype,
          img: encode_image,
          name: req.body.name,
          price: req.body.price,
          quantity: req.body.quantity,
          description: req.body.description,
        };

        const result = await productsCollection.insertOne(finalImg);
        res.status(200).json({
          success: true,
          id: result.insertedId
        });
        // Delete the image file after saving to MongoDB
        fs.unlink(path.join(__dirname, 'uploads', req.file.filename), (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        })
        // const { name, price, quantity ,description} = req.body;
        // const imageUrl = `http://127.0.0.1:3000/uploads/${req.file.filename}`;

        // const result =await productsCollection.insertOne(user)
        // const result = await productsCollection.insertOne({
        //   name,
        //   price: parseFloat(price),
        //   quantity: parseInt(quantity),
        //   imageUrl,
        //   description
        // });

        // res.status(201).json({ message: 'Product added successfully', id: result.insertedId });
      } catch (error) {
        console.error('Error saving to database:', error);
        res.status(500).send('Error saving to database');
      }


    }
    )
    app.post('/addUser', async (req, res) => {
      const user = req.body
      // console.log(user)
      const isAvailable = await usersCollection.find({ email: user.email }).toArray()
      // console.log(isAvailable)
      if (isAvailable.length == 0) {

        const result = await usersCollection.insertOne(user)
        console.log(result)
        // res.json(result[0])
      }
      if (isAvailable.length !== 0) {
        res.json(isAvailable[0])
      }
    })




    // get all data from database
    app.get('/products', async (req, res) => {
      try {
        console.log(req.query.page)
        const limit = req.query.limit || 10
        const page = req.query.page || 1
        const skipAmount = (page - 1) * limit;
  

        const cacheKey = `products_${page}_${limit}`;
  
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
          return res.json(cachedData);
        }
      

        const products = await productsCollection.find({})
    .skip(skipAmount)
    .limit(limit)
    .project({
      _id: 1,     
       id: 1,
      name: 1,
      rating: 1,
      seller: 1,
      stock: 1,
      img: 1,
      quantity: 1,
      description: 1
    })
    .toArray();

    cache.set(cacheKey, products);
  res.json(products);

      

      } catch (error) {

      }
    })

    //get single data from database
    app.get('/product/:key', async (req, res) => {
      // console.log(req.params.key)
      const result = await productsCollection.find({ id: req.params.key }).toArray();
      res.json(result[0])
    })
    app.get('/productbyid', async (req, res) => {
      console.log(req.query.id)

      const result = await productsCollection.find({ _id: new ObjectId(req.query.id) }).toArray();
      res.send(result)
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