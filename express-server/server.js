const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

// -------------------------
// MongoDB Configuration
// -------------------------
const MONGO_URL = "mongodb://mongodb:27017";
const DB_NAME = "RF_user";

let db = null;

async function connectMongo() {
    try {
        const client = await MongoClient.connect(MONGO_URL);

        db = client.db(DB_NAME);

        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed");
        console.error(err.message);
    }
}

connectMongo();

// -------------------------
// Health Check
// -------------------------
app.get("/", (req, res) => {
    res.json({
        message: "Express Gateway Running"
    });
});

// -------------------------
// React -> Express
// -------------------------
app.post("/api/submit", async (req, res) => {

    const userData = req.body;

    console.log("Received Data:");
    console.log(userData);

    try {

        // Send request to FastAPI container
        const response = await axios.post(
            "http://fastapi:8000/predict",
            userData
        );

        console.log("Prediction received from FastAPI");

        console.log(response.data);

        // Save to MongoDB
        if (db) {

            await db.collection("results").insertOne({

                createdAt: new Date(),

                input: userData,

                prediction: response.data

            });

            console.log("Saved prediction to MongoDB");

        }

        res.status(200).json({

            message: "Prediction Successful",

            fastapiData: response.data

        });

    }

    catch (err) {

        console.error("Error calling FastAPI");

        if (err.response) {

            console.error(err.response.data);

            return res.status(err.response.status).json({

                error: err.response.data

            });

        }

        console.error(err.message);

        res.status(500).json({

            error: "Unable to communicate with FastAPI"

        });

    }

});

// -------------------------
// Start Server
// -------------------------
app.listen(5000, () => {

    console.log("Express gateway listening on port 5000");

});
