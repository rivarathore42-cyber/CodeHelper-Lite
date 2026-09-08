import React, { useState } from "react";
import { Sliders, Zap, Stethoscope, RefreshCw, FileSignature, Activity, ChevronDown, ChevronUp, Sparkles, Cpu, HardDrive } from "lucide-react";
import { CodeLanguage, InferenceParams, PresetPrompt, TaskMode } from "../types";
import { BENCHMARK_PRESETS } from "../data/benchmarkPrompts";
import { MODEL_CONFIG } from "../data/modelArchitecture";

interface SidebarProps {
  params: InferenceParams;
  setParams: React.Dispatch<React.SetStateAction<InferenceParams>>;
  onLoadPreset: (preset: PresetPrompt) => void;
  activePresetId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  params,
  setParams,
  onLoadPreset,
  activePresetId,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const modeOptions: { id: TaskMode; label: string; icon: any; desc: string }[] = [
    {
      id: "syntax_doctor",
      label: "Syntax Doctor & Bug Fix",
      icon: Stethoscope,
      desc: "Detect syntax errors, edge cases, and repair broken code.",
    },
    {
      id: "completion",
      label: "Code Completion & Gen",
      icon: Zap,
      desc: "Fast context-aware code continuation and implementation.",
    },
    {
      id: "refactor",
      label: "Refactor & Complexity",
      icon: RefreshCw,
      desc: "Optimize time/space complexity to O(1) or O(N).",
    },
    {
      id: "docstring",
      label: "Docstrings & Strict Types",
      icon: FileSignature,
      desc: "Generate strict types, PEP 257 docstrings, and JSDoc.",
    },
    {
      id: "complexity",
      label: "AST & Complexity Score",
      icon: Activity,
      desc: "Compute Big-O, cyclomatic complexity, and AST metrics.",
    },
  ];

  const languageOptions: { id: CodeLanguage; label: string; ext: string }[] = [
    { id: "python", label: "Python 3.12 (PEP 8 / Type Hints)", ext: ".py" },
    { id: "typescript", label: "TypeScript 5.x / ES2024", ext: ".ts" },
    { id: "rust", label: "Rust 1.78 (Borrow Checker / Safety)", ext: ".rs" },
    { id: "go", label: "Go 1.22 (Goroutines / Channels)", ext: ".go" },
    { id: "cpp", label: "C++20 (Modern STL / SIMD)", ext: ".cpp" },
    { id: "sql", label: "SQL (ANSI / PostgreSQL)", ext: ".sql" },
  ];

  return (
    <aside className="w-full lg:w-80 bg-[#0f172a] border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col gap-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Inference Engine
            </h2>
            <p className="text-[11px] text-slate-400">Hyperparameters &amp; Tasks</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
          INT8 / BF16
        </span>
      </div>

      {/* Mode Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Specialized Task Mode
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {modeOptions.map((mode) => {
            const Icon = mode.icon;
            const isSelected = params.mode === mode.id;
            return (
              <button
                key={mode.id}
                id={`btn-mode-${mode.id}`}
                onClick={() => setParams((prev) => ({ ...prev, mode: mode.id }))}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-all ${
                  isSelected
                    ? "bg-sky-500/15 border border-sky-500/40 text-sky-300 shadow-sm"
                    : "bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 text-slate-300 hover:text-slate-100"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-sky-400" : "text-slate-400"}`} />
                <div className="truncate">
                  <div className="font-medium text-slate-200">{mode.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{mode.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Language */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Target Language
        </label>
        <select
          id="select-language"
          value={params.language}
          onChange={(e) => setParams((prev) => ({ ...prev, language: e.target.value as CodeLanguage }))}
          className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
        >
          {languageOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Hyperparameters Sliders */}
      <div className="space-y-3.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
        {/* Temperature */}
        <div>
          <div className="flex justify-between text-xs text-slate-300 mb-1">
            <span className="text-[11px] font-medium text-slate-400">Temperature (Creativity)</span>
            <span id="slider-val-temp" className="font-mono text-sky-400 font-semibold">{params.temperature.toFixed(2)}</span>
          </div>
          <input
            type="range"
            id="slider-temp"
            min="0"
            max="1"
            step="0.05"
            value={params.temperature}
            onChange={(e) => setParams((prev) => ({ ...prev, temperature: parseFloat(e.target.value) }))}
            className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
            <span>0.0 (Deterministic)</span>
            <span>1.0 (Creative)</span>
          </div>
        </div>

        {/* Top-P */}
        <div>
          <div className="flex justify-between text-xs text-slate-300 mb-1">
            <span className="text-[11px] font-medium text-slate-400">Top-P (Nucleus Sampling)</span>
            <span id="slider-val-topp" className="font-mono text-sky-400 font-semibold">{params.topP.toFixed(2)}</span>
          </div>
          <input
            type="range"
            id="slider-topp"
            min="0.1"
            max="1.0"
            step="0.05"
            value={params.topP}
            onChange={(e) => setParams((prev) => ({ ...prev, topP: parseFloat(e.target.value) }))}
            className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Max Tokens */}
        <div>
          <div className="flex justify-between text-xs text-slate-300 mb-1">
            <span className="text-[11px] font-medium text-slate-400">Max Tokens</span>
            <span id="slider-val-tokens" className="font-mono text-sky-400 font-semibold">{params.maxTokens}</span>
          </div>
          <input
            type="range"
            id="slider-tokens"
            min="64"
            max="1024"
            step="32"
            value={params.maxTokens}
            onChange={(e) => setParams((prev) => ({ ...prev, maxTokens: parseInt(e.target.value, 10) }))}
            className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Advanced Accordion */}
        <div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between text-[11px] text-slate-400 hover:text-slate-200 pt-1"
          >
            <span>Custom System Prompt &amp; Rules</span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {showAdvanced && (
            <div className="mt-2 pt-2 border-t border-slate-800/80">
              <textarea
                value={params.systemPrompt}
                onChange={(e) => setParams((prev) => ({ ...prev, systemPrompt: e.target.value }))}
                placeholder="e.g. Adhere to strict type guards, prevent recursion, output zero explanation..."
                rows={3}
                className="w-full bg-[#0b0f19] border border-slate-800 rounded-lg p-2 text-[11px] text-slate-200 font-mono focus:outline-none focus:border-sky-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Judge Benchmark Presets */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Judge Test Benchmarks ({BENCHMARK_PRESETS.length})
          </label>
        </div>
        <div className="space-y-1.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
          {BENCHMARK_PRESETS.map((preset) => {
            const isCurrent = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                id={`btn-preset-${preset.id}`}
                onClick={() => onLoadPreset(preset)}
                className={`w-full text-left p-2 rounded-xl border text-xs transition-all flex flex-col gap-0.5 ${
                  isCurrent
                    ? "bg-sky-500/10 border-sky-500/40 text-sky-200"
                    : "bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 truncate">{preset.title}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-sky-400 shrink-0 ml-1">
                    {preset.category}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1">{preset.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Memory & Budget Gauge */}
      <div className="border-t border-slate-800/80 pt-3 text-[11px] space-y-1.5 font-mono text-slate-400">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-sky-400" /> Model Size:</span>
          <span className="text-sky-400 font-bold">41.6M &lt; 50M Limit</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1"><HardDrive className="w-3 h-3 text-emerald-400" /> INT8 Footprint:</span>
          <span className="text-emerald-400 font-semibold">41.6 MB (Edge Ready)</span>
        </div>
      </div>
    </aside>
  );
};
