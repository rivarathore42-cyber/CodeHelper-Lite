import React from "react";
import { Cpu, Terminal, FileCode2, Layers, LineChart, Download, Sparkles, ShieldCheck } from "lucide-react";
import { MODEL_CONFIG } from "../data/modelArchitecture";

interface HeaderProps {
  activeTab: "console" | "training" | "architecture" | "metrics";
  setActiveTab: (tab: "console" | "training" | "architecture" | "metrics") => void;
  onOpenExportModal: () => void;
  onDownloadPythonScript: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExportModal,
  onDownloadPythonScript,
}) => {
  return (
    <header className="border-b border-slate-800/90 bg-[#0f172a]/95 backdrop-blur sticky top-0 z-30 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Brand & Track info */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700 flex items-center justify-center text-white font-mono font-bold text-lg shadow-lg shadow-sky-500/20 ring-1 ring-sky-400/30">
            &lt;/&gt;
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-bold text-slate-100 text-base sm:text-lg tracking-tight font-sans">
                CodeHelper-Lite
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono font-bold rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                <Cpu className="w-3 h-3" />
                41.6M Params (&lt;50M)
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                Track 01: Foundational LLM
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Domain-Specific Lightweight Causal Transformer for Code &amp; Syntax Assistance
            </p>
          </div>
        </div>

        {/* Center/Right: Navigation Tabs & Export Buttons */}
        <div className="flex items-center gap-2 flex-wrap justify-between md:justify-end">
          {/* Navigation Pill Group */}
          <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800">
            <button
              id="nav-tab-console"
              onClick={() => setActiveTab("console")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "console"
                  ? "bg-sky-500 text-white shadow-sm font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Inference Console</span>
            </button>

            <button
              id="nav-tab-training"
              onClick={() => setActiveTab("training")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "training"
                  ? "bg-sky-500 text-white shadow-sm font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>PyTorch Training</span>
            </button>

            <button
              id="nav-tab-architecture"
              onClick={() => setActiveTab("architecture")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "architecture"
                  ? "bg-sky-500 text-white shadow-sm font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Architecture (&lt;50M)</span>
            </button>

            <button
              id="nav-tab-metrics"
              onClick={() => setActiveTab("metrics")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "metrics"
                  ? "bg-sky-500 text-white shadow-sm font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <LineChart className="w-3.5 h-3.5" />
              <span>Loss Curves</span>
            </button>
          </div>

          {/* Export Action */}
          <button
            id="btn-export-singlefile"
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-500/20 border border-sky-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Download complete standalone single-file HTML bundle"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Single-File HTML</span>
          </button>
        </div>
      </div>
    </header>
  );
};
