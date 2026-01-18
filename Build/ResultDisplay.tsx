
import React from 'react';
import { DetectionResult, Verdict } from '../types';

interface ResultDisplayProps {
  result: DetectionResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const getVerdictColor = (verdict: Verdict) => {
    switch (verdict) {
      case Verdict.REAL: return 'text-green-400 border-green-400';
      case Verdict.MOSTLY_REAL: return 'text-emerald-400 border-emerald-400';
      case Verdict.MIXED: return 'text-yellow-400 border-yellow-400';
      case Verdict.MOSTLY_FAKE: return 'text-orange-400 border-orange-400';
      case Verdict.FAKE: return 'text-red-400 border-red-400';
      default: return 'text-blue-400 border-blue-400';
    }
  };

  const getVerdictBg = (verdict: Verdict) => {
    switch (verdict) {
      case Verdict.REAL: return 'bg-green-400/10';
      case Verdict.MOSTLY_REAL: return 'bg-emerald-400/10';
      case Verdict.MIXED: return 'bg-yellow-400/10';
      case Verdict.MOSTLY_FAKE: return 'bg-orange-400/10';
      case Verdict.FAKE: return 'bg-red-400/10';
      default: return 'bg-blue-400/10';
    }
  };

  return (
    <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`p-6 rounded-lg border ${getVerdictColor(result.verdict)} ${getVerdictBg(result.verdict)}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <i className={`fas ${result.verdict === Verdict.REAL ? 'fa-check-circle' : 'fa-exclamation-triangle'}`}></i>
            Verdict: {result.verdict}
          </h3>
          <div className="text-right">
            <div className="text-sm opacity-70">Confidence</div>
            <div className="text-xl font-mono">{result.confidenceScore}%</div>
          </div>
        </div>
        <p className="text-gray-200 leading-relaxed mb-4">{result.analysis}</p>
        
        <div className="mt-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-60 mb-2">Key Findings</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {result.keyFindings.map((finding, idx) => (
              <li key={idx}>{finding}</li>
            ))}
          </ul>
        </div>
      </div>

      {result.sources.length > 0 && (
        <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-60 mb-3">Verification Sources</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.sources.map((source, idx) => (
              <a
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded bg-gray-900/50 hover:bg-gray-900 border border-gray-700 transition-colors"
              >
                <i className="fas fa-link text-blue-400 text-xs"></i>
                <span className="text-sm text-gray-300 truncate">{source.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
