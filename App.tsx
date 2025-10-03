import React, { useState, useCallback } from 'react';
import ChatInterface from './components/ChatInterface';
import StreamSelection from './components/StreamSelection';
import { askSyllabusQuestion, askGeneralQuestion } from './services/geminiService';
import type { ChatMessage, SyllabusFile, ChatMode } from './types';
import { AppState, Stream } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EEE_SYLLABUS_FILES } from './syllabusData';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.STREAM_SELECTION);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);

  // Syllabus files are now pre-loaded
  const syllabusFiles: SyllabusFile[] = EEE_SYLLABUS_FILES;

  const handleStreamSelect = useCallback((stream: Stream) => {
    setSelectedStream(stream);
    setChatHistory([
      { role: 'model', text: `Hello! I'm ready to answer your questions about the ${stream} stream syllabus. What would you like to know?`, source: 'syllabus' }
    ]);
    setAppState(AppState.CHATTING);
  }, []);

  const handleSendMessage = useCallback(async (message: string, mode: ChatMode) => {
    if (!selectedStream) {
      setError("No stream selected. Please reset the session.");
      return;
    }
    setIsLoading(true);
    setError(null);
    
    const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', text: message }];
    setChatHistory(newHistory);

    try {
      let response = '';
      if (mode === 'syllabus') {
        response = await askSyllabusQuestion(message, syllabusFiles, selectedStream);
      } else {
        // For general questions, we pass the existing chat history for context
        response = await askGeneralQuestion(message, chatHistory);
      }
      setChatHistory([...newHistory, { role: 'model', text: response, source: mode }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred fetching the response.';
      setError(errorMessage);
      setChatHistory([...newHistory, { role: 'model', text: `Sorry, I encountered an error: ${errorMessage}`, source: 'syllabus' }]);
    } finally {
      setIsLoading(false);
    }
  }, [chatHistory, syllabusFiles, selectedStream]);

  const handleReset = () => {
    setAppState(AppState.STREAM_SELECTION);
    setChatHistory([]);
    setError(null);
    setSelectedStream(null);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.STREAM_SELECTION:
        return <StreamSelection onSelectStream={handleStreamSelect} />;
      case AppState.CHATTING:
        if (!selectedStream) {
            handleReset(); // Should not happen, but as a fallback
            return <StreamSelection onSelectStream={handleStreamSelect} />;
        }
        return (
          <ChatInterface 
            chatHistory={chatHistory} 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading}
            onReset={handleReset}
            syllabusFiles={syllabusFiles}
            stream={selectedStream}
          />
        );
      default:
        return <StreamSelection onSelectStream={handleStreamSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-primary text-text-primary flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;