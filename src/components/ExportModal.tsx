import React, { useState } from "react";
import { X, Download, Copy, Check, FileCode, Sparkles, CheckCircle2 } from "lucide-react";
import { generateSingleFileHtml } from "../data/singleFileHtmlGenerator";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [htmlContent] = useState(() => generateSingleFileHtml());

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "codehelper_lite_single_file_submission.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <span>Single-File HTML Hackathon Submission</span>
                <span className="px-2 py-0.5 text-xs font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  100% Self-Contained
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Complete bundle with embedded CSS, JavaScript, PyTorch training script, parameter math, and offline evaluation engine.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Preview */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
          <div className="p-3.5 bg-sky-950/20 border border-sky-500/20 rounded-xl text-xs text-sky-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong>Instant Standalone Execution</strong>
              <p className="text-slate-300 mt-0.5">
                This single HTML file can be opened directly in any browser (Chrome, Firefox, Safari, Edge) without requiring Node.js, npm, or an active internet connection. Perfect for offline hackathon jury evaluation!
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Source Preview (codehelper_lite_single_file_submission.html)</span>
              <span>Size: ~{Math.round(htmlContent.length / 1024)} KB</span>
            </div>
            <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-slate-300 max-h-[340px] overflow-auto custom-scrollbar whitespace-pre">
              {htmlContent.slice(0, 1500)}
              {"\n\n... [Embedded PyTorch Training Script, Interactive Evaluation Console, & Parameter Breakdown] ...\n\n"}
              {htmlContent.slice(-400)}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono">
            Track 01: Foundational LLM Development
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied HTML!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy HTML Content</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 transition flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download .html File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
