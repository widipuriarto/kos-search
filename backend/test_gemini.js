require('dotenv').config();
const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key exists?", !!apiKey);

const genAI = new GoogleGenerativeAI(apiKey || "");

const searchCriteriaSchema = {
  type: SchemaType.OBJECT,
  properties: {
    city: { type: SchemaType.STRING, nullable: true },
    maxPrice: { type: SchemaType.INTEGER, nullable: true },
    minPrice: { type: SchemaType.INTEGER, nullable: true },
    type: { type: SchemaType.STRING, nullable: true },
    keyword: { type: SchemaType.STRING, nullable: true },
    isChatOnly: { type: SchemaType.BOOLEAN },
    chatReply: { type: SchemaType.STRING }
  },
  required: ["isChatOnly", "chatReply"],
};

async function test() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: searchCriteriaSchema,
        temperature: 0.1,
      },
    });

    const result = await model.generateContent(`Halo, cari kos di semarang`);
    console.log(result.response.text());
  } catch (e) {
    console.error("Error:", e);
  }
}

test();
