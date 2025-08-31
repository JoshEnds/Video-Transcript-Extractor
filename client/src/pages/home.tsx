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
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-secondary/30 to-primary/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <Card className="glass-effect border-border/50 w-full max-w-2xl shadow-2xl">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="gradient-bg rounded-xl p-3 shadow-lg">
                  <Play className="text-primary-foreground h-6 w-6" />
                </div>
              </div>
              <h1 className="text-4xl font-bold gradient-text mb-3" data-testid="heading-main">
                Instant YouTube Transcripts
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed" data-testid="text-description">
                Paste a YouTube URL below to get its full transcript in seconds.
              </p>
            </div>

            {/* Input form */}
            <form onSubmit={handleExtract} className="space-y-6" data-testid="form-extract">
              <div className="space-y-3">
                <Label htmlFor="youtubeUrl" className="text-sm font-medium text-foreground">
                  YouTube URL
                </Label>
                <div className="relative">
                  <Input
                    type="url"
                    id="youtubeUrl"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className={`w-full px-4 py-3 pr-10 transition-all duration-200 ${
                      url && !isValidYouTubeUrl(url) 
                        ? 'border-destructive focus:ring-destructive' 
                        : 'border-border focus:ring-ring'
                    }`}
                    placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    disabled={isLoading}
                    data-testid="input-youtube-url"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gradient-bg text-primary-foreground font-semibold py-3 px-6 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Get Transcript
                  </>
                )}
              </Button>
            </form>

            {/* Loading state */}
            {isLoading && (
              <div className="text-center py-8 fade-in" data-testid="loading-state">
                <div className="flex items-center justify-center space-x-3">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="text-muted-foreground font-medium">Extracting transcript...</span>
                </div>
                <div className="mt-4 bg-secondary rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full rounded-full animate-pulse" style={{ width: "70%" }}></div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg slide-up" data-testid="error-message">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-destructive" />
                  <span className="text-destructive font-medium" data-testid="text-error">{error}</span>
                </div>
              </div>
            )}

            {/* Results */}
            {transcriptData && (
              <div className="mt-8 space-y-4 fade-in" data-testid="result-container">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground flex items-center" data-testid="heading-transcript">
                    <FileText className="text-primary mr-2 h-5 w-5" />
                    Transcript
                  </h3>
                  <Button
                    onClick={handleCopy}
                    variant="secondary"
                    className="flex items-center space-x-2 hover:bg-accent transition-colors duration-200"
                    data-testid="button-copy"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy to Clipboard</span>
                      </>
                    )}
                  </Button>
                </div>

                <div className="relative">
                  <Textarea
                    value={transcriptData.text}
                    readOnly
                    rows={12}
                    className="w-full p-4 bg-muted border border-border rounded-lg resize-none focus:ring-2 focus:ring-ring text-foreground text-sm leading-relaxed"
                    placeholder="Your transcript will appear here..."
                    data-testid="textarea-transcript"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded" data-testid="text-word-count">
                    {wordCount} words
                  </div>
                </div>

                {/* Transcript metadata */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-2" data-testid="container-metadata">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Video Duration:</span>
                    <span className="font-medium text-foreground" data-testid="text-duration">{transcriptData.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Language:</span>
                    <span className="font-medium text-foreground" data-testid="text-language">{transcriptData.language}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence Score:</span>
                    <span className="font-medium text-foreground" data-testid="text-confidence">{transcriptData.confidence}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Feature highlights */}
            <div className="mt-12 pt-8 border-t border-border">
              <h4 className="text-center text-sm font-medium text-muted-foreground mb-6" data-testid="heading-features">
                Why choose our transcript extractor?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Zap className="text-primary h-6 w-6" />
                  </div>
                  <h5 className="font-semibold text-foreground" data-testid="heading-feature-speed">Lightning Fast</h5>
                  <p className="text-xs text-muted-foreground" data-testid="text-feature-speed">Get transcripts in seconds, not minutes</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Shield className="text-primary h-6 w-6" />
                  </div>
                  <h5 className="font-semibold text-foreground" data-testid="heading-feature-security">Secure & Private</h5>
                  <p className="text-xs text-muted-foreground" data-testid="text-feature-security">No data stored, complete privacy</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Sparkles className="text-primary h-6 w-6" />
                  </div>
                  <h5 className="font-semibold text-foreground" data-testid="heading-feature-accuracy">High Accuracy</h5>
                  <p className="text-xs text-muted-foreground" data-testid="text-feature-accuracy">AI-powered transcription technology</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
