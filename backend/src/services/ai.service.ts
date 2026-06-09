import { GoogleGenerativeAI, Schema, SchemaType } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// Skema untuk memastikan Gemini merespon dengan format JSON yang ketat
const searchCriteriaSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    city: {
      type: SchemaType.STRING,
      description: "Nama kota tempat kos berada. Contoh: 'Jakarta Selatan', 'Semarang', 'Bandung'. Jika tidak disebutkan, biarkan kosong.",
      nullable: true
    },
    maxPrice: {
      type: SchemaType.INTEGER,
      description: "Harga maksimal sewa kos per bulan dalam satuan Rupiah (angka bulat). Contoh: jika user bilang 'di bawah 2 juta' atau 'max 2jt', nilainya adalah 2000000.",
      nullable: true
    },
    minPrice: {
      type: SchemaType.INTEGER,
      description: "Harga minimal sewa kos per bulan. Contoh: jika user bilang 'di atas 500 ribu', nilainya adalah 500000.",
      nullable: true
    },
    type: {
      type: SchemaType.STRING,
      description: "Tipe kos: 'PUTRA', 'PUTRI', atau 'CAMPUR'. Jika tidak disebutkan secara eksplisit (seperti 'kos cowok', 'kos khusus perempuan'), biarkan kosong.",
      nullable: true
    },
    keyword: {
      type: SchemaType.STRING,
      description: "Kata kunci spesifik selain fasilitas. Contoh: 'dekat UGM', 'bebas jam malam', 'eksklusif'. JANGAN masukkan nama fasilitas ke sini.",
      nullable: true
    },
    facilities: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Fasilitas yang diinginkan user, contoh: 'AC', 'WiFi', 'Kamar Mandi Dalam', 'Parkir'.",
      nullable: true
    },
    isChatOnly: {
      type: SchemaType.BOOLEAN,
      description: "Set true JIKA DAN HANYA JIKA user TIDAK sedang mencari kos (misalnya hanya menyapa 'Halo', 'Siapa kamu?', dsb). Set false jika user memiliki intensi mencari kos.",
    },
    chatReply: {
      type: SchemaType.STRING,
      description: "Teks balasan ramah dari AI. Jika isChatOnly=true, balas percakapan mereka. Jika user mencari kos (isChatOnly=false), berikan kalimat pembuka singkat seperti 'Tentu, saya menemukan beberapa rekomendasi kos sesuai kriteria Anda:'"
    }
  },
  required: ["isChatOnly", "chatReply"],
};

export interface SearchCriteria {
  city?: string | null;
  maxPrice?: number | null;
  minPrice?: number | null;
  type?: string | null;
  keyword?: string | null;
  facilities?: string[] | null;
  isChatOnly: boolean;
  chatReply: string;
}

export const processChatPrompt = async (prompt: string): Promise<SearchCriteria> => {
  if (!apiKey) {
    throw new Error("API Key Gemini belum dikonfigurasi.");
  }

  // Menggunakan model gemini-2.5-flash karena cepat dan mendukung structured outputs
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: searchCriteriaSchema,
      temperature: 0.1, // Suhu rendah agar hasilnya deterministik dan akurat mengekstrak data
    },
  });

  const systemInstruction = `Kamu adalah AI Asisten handal dari 'Kos Search'. 
Tugas utamamu adalah membantu pengguna mencari kos idaman mereka.
Kamu harus mengekstrak informasi dari prompt pengguna ke dalam format JSON sesuai skema yang diberikan.
Gunakan bahasa Indonesia yang ramah, sopan, dan profesional pada field 'chatReply'.`;

  try {
    const result = await model.generateContent(`${systemInstruction}\n\nPrompt User: "${prompt}"`);
    const responseText = result.response.text();
    
    // Karena kita memakai responseSchema, responseText sudah pasti JSON string
    const jsonResult = JSON.parse(responseText) as SearchCriteria;
    return jsonResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Gagal memproses permintaan AI.");
  }
};
