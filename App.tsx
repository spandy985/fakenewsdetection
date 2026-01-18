
import React, { useState } from 'react';
import { analyzeNews } from './services/geminiService';
import { DetectionResult } from './types';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeNews(inputText);
      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-20 px-4 md:px-0">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
            <i className="fas fa-newspaper text-[#0d1117] text-2xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">TruthScan</h1>
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-white mb-4">AI Fake News Detection System</h2>
          <p className="text-gray-400 text-lg mb-4">
            Enter a news headline or article to check whether it is Fake or Real using an AI-based text classification model.
          </p>
          <p className="text-gray-400 text-lg">
            This system utilizes advanced large language models for natural language processing and factual verification via real-time search grounding.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-[#161b22] p-6 rounded-lg border border-gray-800 shadow-2xl">
          <div className="flex items-center gap-2 mb-3 text-white font-medium">
            <i className="fas fa-keyboard text-gray-400"></i>
            <span>Enter News Text</span>
          </div>
          
          <textarea
            className="w-full h-48 bg-[#0d1117] text-gray-200 p-4 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none placeholder-gray-600"
            placeholder="Paste a news headline or article here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <button
              onClick={handleCheck}
              disabled={isLoading || !inputText.trim()}
              className={`flex items-center justify-center gap-3 px-6 py-3 rounded-md font-semibold transition-all shadow-lg
                ${isLoading || !inputText.trim() 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#238636] hover:bg-[#2ea043] text-white active:scale-95'
                }`}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-search"></i>
                  <span>Check Authenticity</span>
                </>
              )}
            </button>

            {inputText.length > 0 && (
              <span className="text-xs text-gray-500 italic">
                {inputText.length} characters entered
              </span>
            )}
          </div>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="mt-6 p-4 bg-red-900/30 border border-red-800 text-red-200 rounded-lg flex items-center gap-3">
            <i className="fas fa-circle-xmark"></i>
            <span>{error}</span>
          </div>
        )}

        {/* Results Section */}
        {result && <ResultDisplay result={result} />}

        {/* Footer info */}
        <footer className="mt-20 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} TruthScan AI. Powered by Google Gemini.</p>
          <p className="mt-1">For educational purposes only. Always cross-verify critical information.</p>
        </footer>
      </div>

      {/* Fork Ribbon (optional decorative element from original image) */}
      <div className="fixed top-0 right-0 p-4">
        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Fork</a>
      </div>
    </div>
  );
};

export default App;
