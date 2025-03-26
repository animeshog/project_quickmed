import axios from "axios";

// Replace with your actual API key
const API_KEY = "AIzaSyDJTJK8HtZgES_JtEZYTmyYxWFfi4qD51Q";

export default async function askGemini(query: string, params: string): Promise<void> {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `${query} my params: ${params}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    

    // Log the response data
    const GEM_RES =  response.data.candidates[0].content.parts[0].text;
    return GEM_RES;
  } catch (error) {
    console.error("Error:", error);
  }
}

