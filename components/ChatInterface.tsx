import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, SyllabusFile, ChatMode } from '../types';
import { Stream } from '../types';
import { SendIcon, BotIcon, UserIcon, NewSessionIcon, FileTextIcon, BoltIcon, CodeIcon, GearIcon, BuildingIcon, DownloadIcon, SparklesIcon } from './Icons';
import { LoadingSpinner } from './LoadingSpinner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DownloadsModal from './DownloadsModal';

interface ChatInterfaceProps {
  chatHistory: ChatMessage[];
  onSendMessage: (message: string, mode: ChatMode) => void;
  isLoading: boolean;
  onReset: () => void;
  syllabusFiles: SyllabusFile[];
  stream: Stream;
}

const ChatMessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isModel = message.role === 'model';
  const isGeneralAi = isModel && message.source === 'gemini';

  const Icon = () => {
      if (isGeneralAi) return <SparklesIcon className="w-5 h-5 text-primary" />;
      if (isModel) return <BotIcon className="w-5 h-5 text-primary" />;
      return <UserIcon className="w-5 h-5 text-text-primary" />;
  }

  return (
    <div className={`flex items-start gap-4 ${isModel ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isGeneralAi ? 'bg-purple-400' : isModel ? 'bg-accent' : 'bg-secondary'}`}>
        <Icon />
      </div>
      <div className={`max-w-xl p-4 rounded-2xl ${isModel ? 'bg-secondary rounded-tl-none' : 'bg-slate-700 rounded-tr-none'}`}>
        <div className="prose prose-invert prose-sm max-w-none text-text-primary">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

const StreamIcon: React.FC<{stream: Stream}> = ({stream}) => {
    switch(stream) {
        case Stream.EEE: return <BoltIcon className="w-5 h-5 text-accent"/>;
        case Stream.CSE: return <CodeIcon className="w-5 h-5 text-accent"/>;
        case Stream.MECH: return <GearIcon className="w-5 h-5 text-accent"/>;
        case Stream.CIVIL: return <BuildingIcon className="w-5 h-5 text-accent"/>;
        default: return null;
    }
}

const ChatModeToggle: React.FC<{ mode: ChatMode; onModeChange: (mode: ChatMode) => void; }> = ({ mode, onModeChange }) => (
    <div className="flex items-center bg-slate-800 border border-slate-600 rounded-lg p-1 text-sm">
        <button 
            onClick={() => onModeChange('syllabus')} 
            className={`px-3 py-1 rounded-md transition-colors duration-200 ${mode === 'syllabus' ? 'bg-accent text-primary font-semibold' : 'text-text-secondary'}`}
        >
            Syllabus
        </button>
        <button 
            onClick={() => onModeChange('gemini')}
            className={`px-3 py-1 rounded-md transition-colors duration-200 ${mode === 'gemini' ? 'bg-purple-400 text-primary font-semibold' : 'text-text-secondary'}`}
        >
            Gemini
        </button>
    </div>
);


const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatHistory, onSendMessage, isLoading, onReset, syllabusFiles, stream }) => {
  const [input, setInput] = useState('');
  const [chatMode, setChatMode] = useState<ChatMode>('syllabus');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isDownloadsModalOpen, setIsDownloadsModalOpen] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim(), chatMode);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const placeholderText = chatMode === 'syllabus' 
    ? "Ask a question about the syllabus..."
    : "Ask Gemini anything...";

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto w-full bg-secondary shadow-2xl rounded-2xl border border-slate-700 animate-fade-in">
        <div className="p-4 border-b border-slate-600 flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center space-x-4 overflow-hidden">
                <div className="flex items-center space-x-2 flex-shrink-0">
                    <StreamIcon stream={stream} />
                    <p className="text-sm text-text-primary font-bold">{stream}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0">
                <button onClick={() => setIsDownloadsModalOpen(true)} className="flex items-center space-x-2 text-sm text-text-secondary hover:text-accent transition-colors duration-200">
                    <DownloadIcon className="w-4 h-4"/>
                    <span>Downloads</span>
                </button>
                <button onClick={onReset} className="flex items-center space-x-2 text-sm text-text-secondary hover:text-accent transition-colors duration-200">
                    <NewSessionIcon className="w-4 h-4"/>
                    <span>New Session</span>
                </button>
            </div>
        </div>
        <div className="flex-grow p-6 overflow-y-auto space-y-6">
          {chatHistory.map((msg, index) => (
            <ChatMessageBubble key={index} message={msg} />
          ))}
          {isLoading && chatHistory[chatHistory.length - 1]?.role === 'user' && (
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-accent">
                <BotIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="max-w-xl p-4 rounded-2xl bg-secondary rounded-tl-none">
                  <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse-fast"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse-fast" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse-fast" style={{animationDelay: '0.4s'}}></div>
                  </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="p-4 border-t border-slate-600 space-y-3">
           <div className="flex justify-center">
             <ChatModeToggle mode={chatMode} onModeChange={setChatMode} />
           </div>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholderText}
              rows={1}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-4 pr-12 resize-none focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-200 text-text-primary"
              disabled={isLoading}
              aria-label="Chat input"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-accent text-primary hover:bg-sky-400 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Send message"
            >
              {isLoading ? <LoadingSpinner /> : <SendIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      <DownloadsModal 
        isOpen={isDownloadsModalOpen}
        onClose={() => setIsDownloadsModalOpen(false)}
        files={syllabusFiles}
      />
    </>
  );
};

export default ChatInterface;