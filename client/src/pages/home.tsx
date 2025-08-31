import { useState } from "react";
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

  const isValidYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+(&[\w=]*)?$/;
    return youtubeRegex.test(url.trim());
  };

  const generateMockTranscript = (): TranscriptData => {
    const mockTranscripts = [
      "Welcome everyone to today's presentation on artificial intelligence and machine learning. In this video, we'll explore the fascinating world of neural networks and how they're revolutionizing various industries. First, let's start with the basics of what artificial intelligence actually means. Artificial intelligence, or AI, refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving. Machine learning is a subset of AI that focuses on the development of computer programs that can access data and use it to learn for themselves. The process of learning begins with observations or data, such as examples, direct experience, or instruction, in order to look for patterns in data and make better decisions in the future based on the examples that we provide. The primary aim is to allow computers to learn automatically without human intervention or assistance and adjust actions accordingly. Today, we'll dive deep into these concepts and explore real-world applications that are already changing our daily lives.",
      
      "Hello and welcome to our comprehensive guide on sustainable living and environmental consciousness. Climate change is one of the most pressing issues of our time, and each of us has a role to play in creating a more sustainable future. In this video, we'll discuss practical steps you can take to reduce your carbon footprint and live more environmentally friendly. From simple changes in your daily routine to more significant lifestyle adjustments, every action counts. We'll start by examining energy consumption in your home. Simple changes like switching to LED light bulbs, using programmable thermostats, and unplugging electronics when not in use can significantly reduce your energy usage. Next, we'll talk about transportation choices. Consider walking, cycling, or using public transportation instead of driving when possible. If you must drive, carpooling or choosing fuel-efficient vehicles can make a big difference. We'll also explore sustainable shopping habits, including buying local produce, reducing packaging waste, and choosing products from environmentally responsible companies.",
      
      "Today we're going to learn about the fundamentals of web development and how to create modern, responsive websites. Web development has evolved tremendously over the past decade, with new frameworks, tools, and best practices emerging regularly. Whether you're a complete beginner or looking to update your skills, this comprehensive guide will walk you through everything you need to know. We'll start with HTML, the backbone of every website. HTML provides the structure and content of web pages using elements and tags. Then we'll move on to CSS, which handles the styling and layout of your websites. CSS allows you to control colors, fonts, spacing, and positioning of elements. Finally, we'll cover JavaScript, the programming language that brings interactivity to your websites. JavaScript enables dynamic content, user interactions, and complex functionality. Throughout this tutorial, we'll build a complete project from scratch, implementing responsive design principles and modern development practices. By the end of this session, you'll have the knowledge and confidence to create your own professional websites."
    ];

    const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
    const durations = ["12:34", "8:42", "15:17", "6:23", "11:08"];
    const languages = ["English", "Spanish", "French", "German", "Italian"];
    const confidenceScores = ["94%", "96%", "92%", "98%", "95%"];

    return {
      text: randomTranscript,
      duration: durations[Math.floor(Math.random() * durations.length)],
      language: languages[Math.floor(Math.random() * languages.length)],
      confidence: confidenceScores[Math.floor(Math.random() * confidenceScores.length)]
    };
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
      // Simulate API call with 2-second delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData = generateMockTranscript();
      setTranscriptData(mockData);
      
      toast({
        title: "Success!",
        description: "Transcript extracted successfully.",
      });
      
    } catch (error) {
      setError("Failed to extract transcript. Please try again.");
      toast({
        title: "Error",
        description: "Failed to extract transcript. Please try again.",
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

  const wordCount = transcriptData?.text ? transcriptData.text.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-4xl text-center">
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-6xl md:text-7xl font-bold mb-4" data-testid="heading-main">
                <span className="text-white">Free </span>
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  YouTube Transcript
                </span>
                <br />
                <span className="text-white">Generator</span>
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
                  placeholder="https://youtu.be/6umk3wMl6OY"
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
              <div className="mt-12 max-w-4xl mx-auto" data-testid="result-container">
                <Card className="bg-white/10 backdrop-blur border-white/20 shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white flex items-center" data-testid="heading-transcript">
                        <FileText className="text-purple-400 mr-2 h-6 w-6" />
                        Transcript
                      </h3>
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

        </div>
      </div>
    </div>
  );
}
