const express = require('express');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
//jwt
const jwt = require('jsonwebtoken');

//jwt
const cors = require('cors')
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());

//codeblock


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pwytamz.mongodb.net/?retryWrites=true&w=majority`;

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

    //database collections
    const userCollection = client.db("e-home").collection('users');
    const propertyCollection = client.db("e-home").collection('properties');
    const wishCollection = client.db("e-home").collection('wishlist');
    const offerCollection = client.db("e-home").collection('offers');
    const reviewCollection = client.db("e-home").collection('reviews');
    const paymentCollection = client.db("e-home").collection('payments');
    const adsCollection = client.db("e-home").collection('ads');

    //jwt related api
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.send({ token });
    })


    //advertise Property
    app.get('/advertiseProperty', async (req, res) => {
      const result = await adsCollection.find().toArray();
      res.send(result);
    })
    app.get('/advertiseFeaturedProperty', async (req, res) => {
      const adlist = await adsCollection.find().toArray();
      // Extract property IDs from the wishlist
      const propertyIds = adlist.map(item => item.propertyId);

      //const adIds = adsCollection.find().toArray();
      const detailedProperties = await Promise.all(
        propertyIds.map(async id => {
          const propertyQuery = { _id: new ObjectId(id) };
          return await propertyCollection.findOne(propertyQuery);
        })
      );

      res.send(detailedProperties);
    })

    app.post('/advertiseProperty', async (req, res) => {
      const newAdvert = req.body;
      const adsCount = await adsCollection.countDocuments();
      if (adsCount < 6) {
        const result = await adsCollection.insertOne(newAdvert);
        res.send(result);
      } else {
        return res.send({ message: 'Cannot insert more than 6 advertisements.', insertedId: null })
      }
    })
    app.delete('/advertiseProperty/:id', async (req, res) => {
      const id = req.params.id;
      const query = { propertyId: id }
      const result = await adsCollection.deleteOne(query);
      res.send(result);
    })

    //user related api

    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    })

    app.get('/users/:email', async (req, res) => {
      const email = req.params.email;
      console.log(email)
      const query = { email: email }
      const result = await userCollection.findOne(query);
      res.send(result);
    })

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email }
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'user already exists', insertedId: null })
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    app.patch('/makeAdmin/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await userCollection.updateOne(filter, updatedDoc)
      res.send(result);
    })
    app.patch('/makeAgent/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          role: 'agent'
        }
      }
      const result = await userCollection.updateOne(filter, updatedDoc)
      res.send(result);
    })
    app.patch('/makeFraud/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          role: 'fraud'
        }
      }
      const result = await userCollection.updateOne(filter, updatedDoc)
      res.send(result);
    })
    app.get('/users/admin/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin })//true or false
    })
    app.get('/users/agent/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const user = await userCollection.findOne(query);
      let agent = false;
      if (user) {
        agent = user?.role === 'agent';
      }
      res.send({ agent })//true or false
    })


    //property related api
    app.get('/properties', async (req, res) => {
      const result = await propertyCollection.find().toArray();
      res.send(result);
    })

    app.get('/verifiedProperties', async (req, res) => {
      const query = {
        verificationStatus: 'verified',

      }
      const result = await propertyCollection.find(query).toArray();
      res.send(result);
    })
    app.get('/featuredProperties', async (req, res) => {
      const query = {
        verificationStatus: 'verified',
      };

      // Add the limit(6) to restrict the result to 6 documents
      const result = await propertyCollection.find(query).limit(6).toArray();
      res.send(result);
    });

    app.get('/properties/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await propertyCollection.findOne(query)
      res.send(result)
    })



    app.get('/agentProperties/:email', async (req, res) => {
      const email = req.params.email;
      const query = { agentEmail: email }
      const result = await propertyCollection.find(query).toArray();
      res.send(result)
    })
    app.delete('/agentProperties/:email', async (req, res) => {
      const email = req.params.email;
      const query = { agentEmail: email };
      const result = await propertyCollection.deleteMany(query);
      res.send(result);
    });

    app.post('/properties', async (req, res) => {
      const newProperty = req.body;
      const result = await propertyCollection.insertOne(newProperty);
      res.send(result);
    })

    app.patch('/verifyProperty/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          verificationStatus: 'verified'
        }
      }
      const result = await propertyCollection.updateOne(filter, updatedDoc)
      res.send(result);
    })

    app.patch('/rejectProperty/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          verificationStatus: 'rejected'
        }
      }
      const result = await propertyCollection.updateOne(filter, updatedDoc)
      res.send(result);
    })

    app.patch('/updateProperty/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedProperty = req.body;
      console.log(updatedProperty);
      const updateDoc = {
        $set: {
          propertyTitle: updatedProperty.propertyTitle,
          propertyImage: updatedProperty.propertyImage,
          propertyLocation: updatedProperty.propertyLocation,
          minPrice: updatedProperty.minPrice,
          maxPrice: updatedProperty.maxPrice,
        },
      };
      const result = await propertyCollection.updateOne(filter, updateDoc);
      res.send(result);
    })


    app.delete('/properties/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await propertyCollection.deleteOne(query);
      res.send(result);
    })



    //wishlist related api

    app.get('/wishlist/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const query = { email: email };
        const wishlist = await wishCollection.find(query).toArray();

        // Extract property IDs from the wishlist
        const propertyIds = wishlist.map(item => item.propertyId);

        // Fetch detailed information for each property
        const detailedProperties = await Promise.all(
          propertyIds.map(async id => {
            const propertyQuery = { _id: new ObjectId(id) };
            return await propertyCollection.findOne(propertyQuery);
          })
        );
        // Filter out null values from detailedProperties
        const filteredProperties = detailedProperties.filter(property => property !== null);

        res.send(filteredProperties);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    app.delete('/wishlist/:email/:id', async (req, res) => {
      const id = req.params.id;
      const email = req.params.email;
      console.log('wishlist remove', id, email)
      const query = {
        propertyId: id,
        email: email
      }
      const result = await wishCollection.deleteOne(query);
      res.send(result);
    })


    app.post('/wishlist', async (req, res) => {
      const latestWish = req.body;
      const result = await wishCollection.insertOne(latestWish);
      res.send(result);
    })

    //offer related api

    app.get('/offers/:email', async (req, res) => {
      const email = req.params.email;
      const query = { buyerEmail: email }
      const result = await offerCollection.find(query).toArray();
      res.send(result)
    })

    app.get('/agentOffers/:email', async (req, res) => {
      const email = req.params.email;
      const query = { agentEmail: email }
      const result = await offerCollection.find(query).toArray();
      res.send(result)
    })

    app.get('/agentPropertiesSold/:email', async (req, res) => {
      const email = req.params.email;
      const query = { agentEmail: email, offerStatus: 'bought' }
      const result = await offerCollection.find(query).toArray();
      res.send(result)
    })

    app.post('/offers', async (req, res) => {
      const newOffer = req.body;
      const result = await offerCollection.insertOne(newOffer);
      res.send(result);
    })
    app.patch('/rejectOffer/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          offerStatus: 'rejected'
        }
      }
      const result = await offerCollection.updateOne(filter, updatedDoc)
      res.send(result);
    })
    //////////////////////////////////////////////////////offerAccept//////////////////////////////////
    app.patch('/acceptOffer/:id/:propertyId', async (req, res) => {
      const id = req.params.id;
      const propertyId = req.params.propertyId;

      const filterAcceptedOffer = {
        _id: new ObjectId(id),
        propertyId: propertyId
      };

      const updatedDocAcceptedOffer = {
        $set: {
          offerStatus: 'accepted'
        }
      };

      const filterRejectedOffers = {
        propertyId: propertyId,
        _id: { $ne: new ObjectId(id) }, // Exclude the offer with the provided id
        offerStatus: { $ne: 'rejected' } // Exclude already rejected offers
      };

      const updatedDocRejectedOffers = {
        $set: {
          offerStatus: 'rejected'
        }
      };

      try {
        // Update the accepted offer
        const resultAcceptedOffer = await offerCollection.updateOne(filterAcceptedOffer, updatedDocAcceptedOffer);

        // Update other offers with the same propertyId to be rejected
        const resultRejectedOffers = await offerCollection.updateMany(filterRejectedOffers, updatedDocRejectedOffers);

        res.send({
          acceptedOffer: resultAcceptedOffer,
          rejectedOffers: resultRejectedOffers
        });
      } catch (error) {
        res.status(500).send(`Error updating offers: ${error.message}`);
      }
    });
    ///////////////////////////////////////////////////////offerAccept///////////////
    app.delete('/offers/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await offerCollection.deleteOne(query);
      res.send(result);
    })

    //review related api
    app.get('/reviews', async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result)
    })
    app.get('/latestReviews', async (req, res) => {
      // Sort by reviewTime in descending order and limit the result to 3 .limit(3).sort({ reviewTime: -1 })
      const result = await reviewCollection.find().limit(3).sort({ reviewTime: -1 }).toArray();
      res.send(result);
    });


    app.post('/reviews', async (req, res) => {
      const newReview = req.body;
      const result = await reviewCollection.insertOne(newReview);
      res.send(result);
    })

    app.get('/reviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = { propertyId: id }
      const result = await reviewCollection.find(query).toArray();
      res.send(result)
    })

    app.get('/userReviews/:email', async (req, res) => {
      const email = req.params.email;
      const query = { reviewerEmail: email }
      const result = await reviewCollection.find(query).toArray();
      res.send(result)
    })
    app.delete('/reviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    })

    // payment intent
    app.post('/create-payment-intent', async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(amount, 'amount inside the intent')

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      });

      res.send({
        clientSecret: paymentIntent.client_secret
      })
    });


    app.get('/payments/:email', async (req, res) => {
      const query = { email: req.params.email }
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    })

    app.post('/payments/:id', async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);
      //
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          offerStatus
            : 'bought'
        }
      }
      const updateResult = await offerCollection.updateOne(filter, updatedDoc)



      res.send({ paymentResult, updateResult });
    })

    app.get('/offersPay/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await offerCollection.findOne(query);
      res.send(result)
    })


    /////////////////////////

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);

//codeblock

app.get('/', (req, res) => {
  res.send('e-home server is running')
})

app.listen(port, () => {
  console.log('e-home server is running on port ', port)
})
