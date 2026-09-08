import React, { useState } from "react";
import { Copy, Check, Download, FileCode, CheckCircle2, Sliders, ShieldCheck, Terminal, BookOpen } from "lucide-react";
import { PYTHON_TRAINING_SCRIPT, GGUF_CONVERSION_SNIPPET } from "../data/trainingScript";

export const TrainingScriptViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copiedGguf, setCopiedGguf] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"pytorch" | "gguf" | "calculator">("pytorch");

  // Dynamic Parameter Calculator State
  const [calcLayers, setCalcLayers] = useState(8);
  const [calcHiddenDim, setCalcHiddenDim] = useState(512);
  const [calcVocab, setCalcVocab] = useState(32000);
  const [calcFfnDim, setCalcFfnDim] = useState(1536);

  // Parameter calculation formulas:
  // 1. Embeddings = vocab * hiddenDim = 32000 * 512 = 16,384,000
  // 2. Per layer (8 layers):
  //    - Q: hiddenDim * (n_heads * head_dim) = 512 * 512 = 262,144
  //    - K, V: 2 * hiddenDim * (n_kv_heads * head_dim) = 2 * 512 * 256 = 262,144
  //    - O: hiddenDim * hiddenDim = 262,144
  //    - SwiGLU: gate (512 * 1536 = 786,432) + up (786,432) + down (786,432) = 2,359,296
  //    - RMSNorms: 2 * 512 = 1,024
  //    - Total per layer = 786,432 + 2,359,296 + 1,024 = 3,146,752
  // 3. Final RMSNorm = 512
  // 4. LM Head = 0 (Tied)
  // Total = 16,384,000 + 8 * 3,146,752 + 512 = 41,558,528
  const calcEmbedParams = calcVocab * calcHiddenDim;
  const calcAttnParams = (calcHiddenDim * calcHiddenDim) + (2 * calcHiddenDim * (calcHiddenDim / 2)) + (calcHiddenDim * calcHiddenDim);
  const calcFfnParams = 3 * (calcHiddenDim * calcFfnDim);
  const calcNorms = (calcLayers * 2 + 1) * calcHiddenDim;
  const calcLayerTotal = (calcAttnParams + calcFfnParams) * calcLayers;
  const totalCalculatedParams = calcEmbedParams + calcLayerTotal + calcNorms;
  const isUnder50M = totalCalculatedParams <= 50000000;

  const handleCopyPyTorch = () => {
    navigator.clipboard.writeText(PYTHON_TRAINING_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyGguf = () => {
    navigator.clipboard.writeText(GGUF_CONVERSION_SNIPPET);
    setCopiedGguf(true);
    setTimeout(() => setCopiedGguf(false), 2000);
  };

  const handleDownloadPy = () => {
    const blob = new Blob([PYTHON_TRAINING_SCRIPT], { type: "text/x-python" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "train_codehelper_lite.py";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0f172a] border border-slate-800/90 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/90 pb-5">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-100 font-mono tracking-tight">
              train_codehelper_lite.py
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              PyTorch 2.4+ / BF16
            </span>
            <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
              41.6M Parameters (&lt;50M)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5 max-w-2xl">
            Production-grade training script for Foundational LLM Track 01. Implements RoPE, SwiGLU, Grouped-Query Attention (GQA), Cosine Warmup, Mixed Precision, and tied embeddings.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="btn-download-train-script"
            onClick={handleDownloadPy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .py File</span>
          </button>

          <button
            id="btn-copy-train-script"
            onClick={handleCopyPyTorch}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Script!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Script</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <button
          onClick={() => setActiveSubTab("pytorch")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
            activeSubTab === "pytorch"
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          PyTorch Training Pipeline
        </button>
        <button
          onClick={() => setActiveSubTab("calculator")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
            activeSubTab === "calculator"
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Dynamic Parameter Math Calculator
        </button>
        <button
          onClick={() => setActiveSubTab("gguf")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
            activeSubTab === "gguf"
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          ONNX &amp; GGUF Export Script
        </button>
      </div>

      {/* Content Panels */}
      {activeSubTab === "pytorch" ? (
        <div className="relative">
          <div className="bg-[#0b0f19] border border-slate-800/90 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[620px] custom-scrollbar leading-relaxed whitespace-pre selection:bg-sky-500/30 selection:text-sky-200">
            {PYTHON_TRAINING_SCRIPT}
          </div>
        </div>
      ) : activeSubTab === "calculator" ? (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-sky-400" />
                  Interactive Transformer Parameter Budget Calculator
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Adjust architecture dimensions to dynamically verify the &lt;50 Million parameter ceiling constraint.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Calculated Model Size:</span>
                <span
                  className={`px-3 py-1 rounded-lg font-mono font-bold text-sm border ${
                    isUnder50M
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                  }`}
                >
                  {totalCalculatedParams.toLocaleString()} Params ({isUnder50M ? "PASSED <50M" : "EXCEEDS LIMIT"})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="text-slate-400">Layers (Depth)</span>
                  <span className="font-mono text-sky-400 font-bold">{calcLayers}</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="24"
                  step="1"
                  value={calcLayers}
                  onChange={(e) => setCalcLayers(parseInt(e.target.value, 10))}
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="text-slate-400">Hidden Dim (d_model)</span>
                  <span className="font-mono text-sky-400 font-bold">{calcHiddenDim}</span>
                </div>
                <input
                  type="range"
                  min="256"
                  max="1024"
                  step="64"
                  value={calcHiddenDim}
                  onChange={(e) => setCalcHiddenDim(parseInt(e.target.value, 10))}
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="text-slate-400">SwiGLU FFN Dim</span>
                  <span className="font-mono text-sky-400 font-bold">{calcFfnDim}</span>
                </div>
                <input
                  type="range"
                  min="512"
                  max="3072"
                  step="128"
                  value={calcFfnDim}
                  onChange={(e) => setCalcFfnDim(parseInt(e.target.value, 10))}
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="text-slate-400">Vocabulary Size</span>
                  <span className="font-mono text-sky-400 font-bold">{calcVocab}</span>
                </div>
                <input
                  type="range"
                  min="8000"
                  max="64000"
                  step="4000"
                  value={calcVocab}
                  onChange={(e) => setCalcVocab(parseInt(e.target.value, 10))}
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-300">
              <div className="p-3 bg-[#0b0f19] border border-slate-800 rounded-lg">
                <div className="text-slate-500 text-[10px]">EMBEDDING PARAMETERS</div>
                <div className="text-sky-400 font-bold text-sm mt-1">{calcEmbedParams.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500">{((calcEmbedParams / totalCalculatedParams) * 100).toFixed(1)}% of total</div>
              </div>
              <div className="p-3 bg-[#0b0f19] border border-slate-800 rounded-lg">
                <div className="text-slate-500 text-[10px]">TRANSFORMER BLOCKS ({calcLayers}×)</div>
                <div className="text-sky-400 font-bold text-sm mt-1">{calcLayerTotal.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500">{((calcLayerTotal / totalCalculatedParams) * 100).toFixed(1)}% of total</div>
              </div>
              <div className="p-3 bg-[#0b0f19] border border-slate-800 rounded-lg">
                <div className="text-slate-500 text-[10px]">LM HEAD (TIED)</div>
                <div className="text-emerald-400 font-bold text-sm mt-1">0 (Weight-Tied)</div>
                <div className="text-[10px] text-slate-500">Saves ~16.38M redundant params</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-mono">convert_to_gguf.py</span>
            <button
              onClick={handleCopyGguf}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white border border-slate-700 transition"
            >
              {copiedGguf ? "Copied!" : "Copy Conversion Snippet"}
            </button>
          </div>
          <div className="bg-[#0b0f19] border border-slate-800/90 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed whitespace-pre">
            {GGUF_CONVERSION_SNIPPET}
          </div>
        </div>
      )}
    </div>
  );
};
