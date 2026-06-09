require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await res.json();
    if (data.error) {
        console.log("Error:", data.error);
    } else {
        console.log("Available models:");
        data.models.forEach(m => console.log(m.name));
    }
  } catch (e) {
    console.error("Fetch Error:", e);
  }
}

listModels();
