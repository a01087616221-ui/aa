
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const solveComplexMath = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Calculate this or answer this math question: "${query}". 
      Return ONLY the numerical result or a very brief explanation if it's a word problem. 
      Keep it professional and precise.`,
      config: {
        temperature: 0.1,
      }
    });

    return response.text || "결과를 가져올 수 없습니다.";
  } catch (error) {
    console.error("AI Math Error:", error);
    return "오류가 발생했습니다.";
  }
};
