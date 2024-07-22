import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { GoogleAuth } from "google-auth-library";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionId = "123456"; // You can generate a unique session ID for each user
const languageCode = "en-US";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the service account key JSON file
const keyFilename = path.join(__dirname, './client_secret_119029937178-s7pkfr0tadbh73an0dqm2tvra7281rrp.apps.googleusercontent.com.json');
const auth = new GoogleAuth({
  keyFilename,
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

app.use(bodyParser.json());

app.post("/chatbot", async (req, res) => {
  const { query } = req.body;
  console.log(query);
  try {
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    const url = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`;

    const response = await axios.post(
      url,
      {
        queryInput: {
          text: {
            text: query,
            languageCode,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.token}`,
        },
      }
    );

    const responseText = response.data.queryResult.fulfillmentText;
    res.status(200).json({ message: responseText });
  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Error processing request" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
