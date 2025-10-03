import { GoogleGenAI, Content } from "@google/genai";
import type { SyllabusFile, Stream, ChatMessage } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

const buildSyllabusPrompt = (files: SyllabusFile[], stream: Stream): string => {
  const syllabusContent = files.map(file => 
    `File: ${file.name}\n---\n${file.content}\n---\n`
  ).join('\n');

  return `You are an expert assistant for the Visvesvaraya Technological University (VTU) syllabus.
Your primary knowledge base is the content of the syllabus documents provided below for the "${stream}" stream.
When answering, prioritize information found within these documents.
Format your answers clearly using markdown for lists, bolding, etc.
If a question cannot be answered using the provided syllabus, you may use your general knowledge to provide a helpful response.
When using external knowledge, you MUST state that the information is not from the provided syllabus documents.
Always be helpful and informative.

[Syllabus Content for ${stream} Stream]
${syllabusContent}
`;
};

export const askSyllabusQuestion = async (question: string, files: SyllabusFile[], stream: Stream | null): Promise<string> => {
  if (!stream) {
    return "An academic stream was not selected. Please restart the session.";
  }

  try {
    const systemInstruction = buildSyllabusPrompt(files, stream);
    
    const response = await ai.models.generateContent({
      model,
      contents: question,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for syllabus question:", error);
    if (error instanceof Error) {
        return `Failed to get response from AI: ${error.message}`;
    }
    return "An unexpected error occurred while communicating with the AI.";
  }
};

export const askGeneralQuestion = async (question: string, history: ChatMessage[]): Promise<string> => {
    try {
        const systemInstruction = "You are a helpful and friendly general-purpose AI assistant named Gemini. Answer the user's questions clearly and concisely.";

        // Convert our chat history to the format expected by the API
        const contents: Content[] = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));
        
        // Add the new user question
        contents.push({ role: 'user', parts: [{ text: question }] });

        const response = await ai.models.generateContent({
          model,
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7, // Allow for more creative responses
          }
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for general question:", error);
        if (error instanceof Error) {
            return `Failed to get response from AI: ${error.message}`;
        }
        return "An unexpected error occurred while communicating with the AI.";
    }
};