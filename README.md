# 🎬 Video Transcript Extractor

A modern, fast, and beautiful web application that extracts transcripts from YouTube videos using Google's Gemini 2.0 Flash AI model.

![Video Transcript Extractor](https://img.shields.io/badge/Video-Transcript%20Extractor-blue?style=for-the-badge&logo=youtube)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=for-the-badge&logo=typescript)
![Gemini](https://img.shields.io/badge/Gemini-2.0%20Flash-orange?style=for-the-badge&logo=google)

## ✨ Features

- 🎯 **Real-time Transcript Extraction** - Get accurate transcripts from any YouTube video
- 🎨 **Beautiful Dark UI** - Modern glassmorphism design with gradient accents
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 💾 **Persistent Storage** - Transcripts are saved locally and survive page refreshes
- 📋 **Copy to Clipboard** - One-click copying of extracted transcripts
- 🧹 **Clear Functionality** - Easy reset to start fresh
- ⚡ **Fast Processing** - Powered by Gemini 2.0 Flash for quick results
- 🔍 **Comprehensive Logging** - Detailed console logs for debugging
- 🎓 **Interactive Tutorial** - 3-step visual guide for new users

## 🚀 Live Demo

[Try it out here!](https://your-demo-url.com) *(Coming soon)*

## 📸 Screenshots

### Main Interface
![Main Interface](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Video+Transcript+Extractor)

### Tutorial Steps
![Tutorial](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=3-Step+Tutorial+Guide)

### Results Display
![Results](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Transcript+Results+with+Metadata)

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI framework
- **TypeScript 5.6.3** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **Wouter** - Lightweight routing
- **TanStack Query** - Server state management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe server code
- **dotenv** - Environment variable management

### AI Integration
- **Google Gemini 2.0 Flash** - Advanced AI model for video transcription
- **REST API** - Clean API integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JoshEnds/Video-Transcript-Extractor.git
   cd Video-Transcript-Extractor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Add it to your `.env` file

## 📖 How to Use

1. **Enter a YouTube URL** in the input field
2. **Click "Get Video Transcript"** to start extraction
3. **Wait for processing** (usually 30-120 seconds depending on video length)
4. **View your transcript** with metadata (duration, language, confidence)
5. **Copy to clipboard** or clear to start over

## 🎯 Supported URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://youtube.com/embed/VIDEO_ID`
- `https://youtube.com/v/VIDEO_ID`

## 🏗️ Project Structure

```
Video-Transcript-Extractor/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   └── routes.ts         # API routes
├── shared/               # Shared types and schemas
├── .env                  # Environment variables (not in repo)
├── .env.example         # Environment variables template
└── README.md            # This file
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking

## 🌟 Features in Detail

### 🎨 Modern UI Design
- Dark theme with glassmorphism effects
- Gradient accents (pink, purple, blue)
- Smooth animations and transitions
- Mobile-first responsive design

### 💾 Smart Persistence
- Transcripts automatically saved to localStorage
- Survives browser refreshes and tab closures
- Easy clear functionality to start fresh

### 🔍 Comprehensive Logging
- Detailed console logs for debugging
- Request/response tracking
- Error handling with user-friendly messages

### ⚡ Performance Optimized
- Fast Vite build system
- Optimized bundle sizes
- Efficient state management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) for the powerful AI transcription capabilities
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling
- [Vite](https://vitejs.dev/) for the fast development experience

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the existing issues for solutions
- Review the documentation above

---

**Made with ❤️ by [JoshEnds](https://github.com/JoshEnds)**
