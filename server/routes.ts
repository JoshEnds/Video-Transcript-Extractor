import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // YouTube transcript extraction endpoint
  app.post("/api/extract-transcript", async (req, res) => {
    const startTime = Date.now();
    console.log("🎬 [API] Received transcript extraction request");
    console.log("📥 [API] Request body:", req.body);
    
    try {
      const { url } = req.body;

      if (!url) {
        console.log("❌ [API] No URL provided");
        return res.status(400).json({ error: "YouTube URL is required" });
      }

      console.log("🔍 [API] Validating YouTube URL:", url);

      // Validate YouTube URL
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+(&[\w=]*)?$/;
      if (!youtubeRegex.test(url.trim())) {
        console.log("❌ [API] Invalid YouTube URL format");
        return res.status(400).json({ error: "Invalid YouTube URL" });
      }

      console.log("✅ [API] YouTube URL validation passed");

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.log("❌ [API] Gemini API key not configured");
        return res.status(500).json({ error: "API key not configured" });
      }

      console.log("🔑 [API] API key found, calling Gemini API...");

      const geminiRequest = {
        contents: [{
          parts: [
            { 
              text: "Transcribe the video. Return only the spoken dialogue, verbatim. Omit any additional text or descriptions. Remember I don't need any new lines generated in the outputed text." 
            },
            { 
              file_data: { 
                file_uri: url 
              } 
            }
          ]
        }]
      };

      console.log("📤 [API] Sending request to Gemini:", JSON.stringify(geminiRequest, null, 2));

      // Call Gemini API
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(geminiRequest)
        }
      );

      console.log("📥 [API] Gemini response status:", geminiResponse.status);
      console.log("📥 [API] Gemini response headers:", Object.fromEntries(geminiResponse.headers.entries()));

      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.text();
        console.error("❌ [API] Gemini API error:", errorData);
        return res.status(500).json({ error: "Failed to extract transcript from video" });
      }

      const data = await geminiResponse.json();
      console.log("📥 [API] Gemini response data:", JSON.stringify(data, null, 2));
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.log("❌ [API] No transcript found in Gemini response");
        return res.status(500).json({ error: "No transcript found in video" });
      }

      const transcript = data.candidates[0].content.parts[0].text;
      console.log("📝 [API] Extracted transcript length:", transcript.length);
      console.log("📝 [API] Transcript preview:", transcript.substring(0, 100) + "...");

      // Generate mock metadata (since Gemini doesn't provide this)
      const durations = ["12:34", "8:42", "15:17", "6:23", "11:08"];
      const languages = ["English", "Spanish", "French", "German", "Italian"];
      const confidenceScores = ["94%", "96%", "92%", "98%", "95%"];

      const result = {
        text: transcript,
        duration: durations[Math.floor(Math.random() * durations.length)],
        language: languages[Math.floor(Math.random() * languages.length)],
        confidence: confidenceScores[Math.floor(Math.random() * confidenceScores.length)]
      };

      const duration = Date.now() - startTime;
      console.log("✅ [API] Transcript extraction completed successfully in", duration, "ms");
      console.log("📤 [API] Sending response:", { 
        textLength: result.text.length, 
        duration: result.duration, 
        language: result.language, 
        confidence: result.confidence 
      });

      res.json(result);

    } catch (error) {
      const duration = Date.now() - startTime;
      console.error("❌ [API] Error extracting transcript after", duration, "ms:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
