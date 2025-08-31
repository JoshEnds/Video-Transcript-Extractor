import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Play, Download, Copy, Check, Zap, Shield, Sparkles, FileText, Link as LinkIcon } from "lucide-react";

interface TranscriptData {
  text: string;
  duration: string;
  language: string;
  confidence: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(null);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  // Load transcript data from localStorage on component mount
  React.useEffect(() => {
    const savedTranscript = localStorage.getItem('youtube-transcript');
    if (savedTranscript) {
      try {
        const parsedTranscript = JSON.parse(savedTranscript);
        setTranscriptData(parsedTranscript);
        console.log("📱 Loaded saved transcript from localStorage");
      } catch (error) {
        console.error("❌ Error parsing saved transcript:", error);
        localStorage.removeItem('youtube-transcript');
      }
    }
  }, []);

  // Save transcript data to localStorage whenever it changes
  React.useEffect(() => {
    if (transcriptData) {
      localStorage.setItem('youtube-transcript', JSON.stringify(transcriptData));
      console.log("💾 Saved transcript to localStorage");
    }
  }, [transcriptData]);

  const isValidYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+(&[\w=]*)?$/;
    return youtubeRegex.test(url.trim());
  };



  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError("");
    setTranscriptData(null);
    
    if (!url.trim()) {
      setError("Please enter a YouTube URL.");
      return;
    }
    
    if (!isValidYouTubeUrl(url)) {
      setError("Please enter a valid YouTube URL.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("🚀 Starting transcript extraction for URL:", url.trim());
      
      const requestBody = { url: url.trim() };
      console.log("📤 Sending API request:", requestBody);
      
      const response = await fetch("/api/extract-transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("📥 Received response status:", response.status);
      console.log("📥 Response headers:", Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log("📥 Response data:", data);

      if (!response.ok) {
        console.error("❌ API request failed:", data);
        throw new Error(data.error || "Failed to extract transcript");
      }

      console.log("✅ Transcript extraction successful!");
      setTranscriptData(data);
      
      toast({
        title: "Success!",
        description: "Transcript extracted successfully.",
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to extract transcript. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!transcriptData?.text) return;
    
    try {
      await navigator.clipboard.writeText(transcriptData.text);
      setIsCopied(true);
      
      toast({
        title: "Copied!",
        description: "Transcript copied to clipboard.",
      });
      
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleClearTranscript = () => {
    setTranscriptData(null);
    setUrl("");
    setError("");
    localStorage.removeItem('youtube-transcript');
    console.log("🗑️ Cleared transcript and localStorage");
    
    toast({
      title: "Cleared!",
      description: "Transcript has been cleared.",
    });
  };

  const wordCount = transcriptData?.text ? transcriptData.text.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-4xl text-center">
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-6xl md:text-7xl font-bold mb-4" data-testid="heading-main">
                <span className="text-white">Video </span>
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Transcript
                </span>
                <br />
                <span className="text-white">Extractor</span>
              </h1>
              <p className="text-gray-400 text-xl mb-12" data-testid="text-description">
                Instantly, without uploading video files.
              </p>
            </div>

            {/* Input form */}
            <form onSubmit={handleExtract} className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-8" data-testid="form-extract">
              <div className="flex-1">
                <Input
                  type="url"
                  id="youtubeUrl"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full h-14 px-6 bg-white/10 backdrop-blur border-white/20 text-white placeholder:text-gray-400 rounded-full focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  placeholder="Enter URL here"
                  disabled={isLoading}
                  data-testid="input-youtube-url"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-14 px-8 bg-white/20 backdrop-blur border border-white/30 text-white font-medium rounded-full hover:bg-white/30 transition-all duration-200 focus:ring-2 focus:ring-purple-400 whitespace-nowrap"
                data-testid="button-extract"
              >
                {isLoading ? (
                  <>
                    <div className="loading-dots mr-2">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    Extracting...
                  </>
                ) : (
                  "Get Video Transcript"
                )}
              </Button>
            </form>
            
            <p className="text-gray-400 text-lg mb-12" data-testid="text-tagline">
              Quick and simple. No catch.
            </p>

            {/* Loading state */}
            {isLoading && (
              <div className="text-center py-12 fade-in" data-testid="loading-state">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="text-white font-medium text-lg">Extracting transcript...</span>
                </div>
                <div className="max-w-md mx-auto bg-white/10 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-400 to-purple-400 h-full rounded-full animate-pulse" style={{ width: "70%" }}></div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg slide-up max-w-md mx-auto" data-testid="error-message">
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="h-4 w-4 text-red-400" />
                  <span className="text-red-400 font-medium" data-testid="text-error">{error}</span>
                </div>
              </div>
            )}

            {/* Results */}
            {transcriptData && (
              <div className="mt-12 max-w-4xl mx-auto mb-16" data-testid="result-container">
                <Card className="bg-white/10 backdrop-blur border-white/20 shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white flex items-center" data-testid="heading-transcript">
                        <FileText className="text-purple-400 mr-2 h-6 w-6" />
                        Transcript
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={handleClearTranscript}
                          variant="outline"
                          className="bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-colors duration-200"
                          data-testid="button-clear"
                        >
                          Clear
                        </Button>
                        <Button
                          onClick={handleCopy}
                          className="bg-white/20 backdrop-blur border border-white/30 text-white hover:bg-white/30 transition-colors duration-200"
                          data-testid="button-copy"
                        >
                          {isCopied ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              <span>Copy to Clipboard</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="relative mb-6">
                      <Textarea
                        value={transcriptData.text}
                        readOnly
                        rows={12}
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-lg resize-none focus:ring-2 focus:ring-purple-400 text-white text-sm leading-relaxed placeholder:text-gray-400"
                        placeholder="Your transcript will appear here..."
                        data-testid="textarea-transcript"
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-black/30 px-2 py-1 rounded" data-testid="text-word-count">
                        {wordCount} words
                      </div>
                    </div>

                    {/* Transcript metadata */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3" data-testid="container-metadata">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Video Duration:</span>
                        <span className="font-medium text-white" data-testid="text-duration">{transcriptData.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Language:</span>
                        <span className="font-medium text-white" data-testid="text-language">{transcriptData.language}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Confidence Score:</span>
                        <span className="font-medium text-white" data-testid="text-confidence">{transcriptData.confidence}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tutorial Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                How to get the transcript of a YouTube video
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Step 1 */}
                <Card className="bg-white/10 backdrop-blur border-white/20 p-6 relative">
                  <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-pink-400 to-purple-400 rounded-l-full"></div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">Copy the YouTube URL</h3>
                      <p className="text-gray-400 mb-4">
                        Copy the URL from the address bar of your web browser or right-click the video and select 'Copy Video URL'.
                      </p>
                      <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-gray-300 text-sm font-mono">https://youtube.com/watch?v=...</span>
                        <Button size="sm" variant="outline" className="ml-auto text-xs">
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Step 2 */}
                <Card className="bg-white/10 backdrop-blur border-white/20 p-6 relative">
                  <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-blue-400 rounded-l-full"></div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">Paste the URL above</h3>
                      <p className="text-gray-400 mb-4">
                        Simply paste the copied YouTube video URL above and click 'Get Video Transcript.'
                      </p>
                      <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-3 border border-white/10">
                        <Play className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300 text-sm">Enter YouTube URL...</span>
                        <Button size="sm" className="ml-auto bg-gradient-to-r from-pink-400 to-purple-400 text-white text-xs">
                          Get Transcript
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Step 3 - Full width */}
              <Card className="bg-white/10 backdrop-blur border-white/20 p-6 relative">
                <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-blue-400 rounded-l-full"></div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">View the Youtube Transcript</h3>
                    <p className="text-gray-400 mb-4">
                      Instantly view, copy and download the YouTube video's transcript text without entering your email.
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 bg-white/5 rounded-lg p-4 border border-white/10 relative">
                        <div className="absolute left-0 bottom-0 w-1 h-full bg-gradient-to-t from-purple-400 to-blue-400 rounded-l-full"></div>
                        <div className="space-y-2">
                          <div className="h-2 bg-gray-600 rounded w-full"></div>
                          <div className="h-2 bg-gray-600 rounded w-4/5"></div>
                          <div className="h-2 bg-gray-600 rounded w-full"></div>
                          <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                          <div className="h-2 bg-gray-600 rounded w-5/6"></div>
                          <div className="h-2 bg-gray-600 rounded w-2/3"></div>
                          <div className="h-2 bg-gray-600 rounded w-full"></div>
                          <div className="h-2 bg-gray-600 rounded w-4/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>



        </div>
      </div>
    </div>
  );
}
