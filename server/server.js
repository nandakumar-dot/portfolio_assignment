require('dotenv').config();

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '../'))); 


app.use(express.json());

const uri = process.env.MONGO_URI;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


async function connectToMongoDB() {
  try {
    
    await client.connect();
    
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectToMongoDB().catch(console.dir);


app.post('/submit-form', async (req, res) => {
  try {
    
    const { name, email, message } = req.body;
    console.log(req.body)
    
    const database = client.db('portfolio'); 
    const collection = database.collection('forms');

    const formData = { name, email, message };

    await collection.insertOne(formData);

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting form. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
