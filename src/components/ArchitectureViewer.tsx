import React from "react";
import { Cpu, HardDrive, Layers, ShieldCheck, CheckCircle2, Zap, Server, Smartphone, Laptop } from "lucide-react";
import { LAYER_BREAKDOWN, MODEL_CONFIG } from "../data/modelArchitecture";

export const ArchitectureViewer: React.FC = () => {
  return (
    <div className="bg-[#0f172a] border border-slate-800/90 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/90 pb-5">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-100 font-sans tracking-tight">
              Foundational Transformer Architecture &amp; Parameter Math
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Exact: 41,558,528 Parameters
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5 max-w-3xl">
            Strict adherence to Track 01 &lt;50 Million parameter ceiling constraint. Evaluated with 8 Pre-RMSNorm blocks, Grouped-Query Attention (GQA), and SwiGLU FFN activations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Budget Limit: </span>
            <strong className="text-sky-400">50,000,000</strong>
          </div>
        </div>
      </div>

      {/* Layer Breakdown Table */}
      <div>
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span>Mathematical Layer-by-Layer Parameter Breakdown</span>
          <span className="text-[11px] font-mono text-slate-400">({LAYER_BREAKDOWN.length} structural components)</span>
        </h3>

        <div className="overflow-x-auto border border-slate-800/90 rounded-xl bg-[#0b0f19]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3.5 font-semibold">Layer Component</th>
                <th className="p-3.5 font-semibold">Category</th>
                <th className="p-3.5 font-semibold">Analytical Formula</th>
                <th className="p-3.5 font-semibold">Tensor Shape</th>
                <th className="p-3.5 font-semibold text-right">Parameter Count</th>
                <th className="p-3.5 font-semibold text-right">Share (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {LAYER_BREAKDOWN.map((layer, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-semibold text-slate-200">{layer.name}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-sky-400 border border-slate-700">
                      {layer.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400">{layer.formula}</td>
                  <td className="p-3.5 text-slate-400">{layer.shape}</td>
                  <td className="p-3.5 text-right font-bold text-slate-100">
                    {layer.count.toLocaleString()}
                  </td>
                  <td className="p-3.5 text-right text-sky-400 font-semibold">
                    {layer.percentage.toFixed(2)}%
                  </td>
                </tr>
              ))}
              <tr className="bg-sky-950/30 font-bold text-sky-200 border-t-2 border-sky-500/40">
                <td className="p-3.5" colSpan={4}>
                  TOTAL TRAINABLE PARAMETERS (CodeHelper-Lite)
                </td>
                <td className="p-3.5 text-right text-sky-400 text-sm font-mono">
                  41,558,528
                </td>
                <td className="p-3.5 text-right text-sky-300 font-mono">100.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Memory Footprint & Hardware Deployment Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Memory across Precisions */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-sky-400" />
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Quantization &amp; Memory Footprint
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            {Object.entries(MODEL_CONFIG.precisionTiers).map(([key, item]) => (
              <div key={key} className="p-3 bg-[#0b0f19] border border-slate-800 rounded-lg space-y-1">
                <div className="text-slate-400 text-[11px] font-sans font-semibold">{item.name}</div>
                <div className="text-sky-400 font-bold text-base">{item.sizeMB} MB</div>
                <div className="text-[10px] text-slate-500">RAM Needed: {item.ramReq}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
            * SmoothQuant INT8 allows full local execution inside standard browser memory (WebGPU) or micro single-board computers.
          </p>
        </div>

        {/* Hardware Compatibility */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Edge &amp; Cloud Deployment Benchmarks
            </h4>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {MODEL_CONFIG.hardwareCompatibility.map((hw, i) => (
              <div key={i} className="p-2.5 bg-[#0b0f19] border border-slate-800/90 rounded-lg flex items-center justify-between text-slate-300">
                <span className="truncate">{hw.split(" - ")[0]}</span>
                <span className="font-bold text-emerald-400 shrink-0 ml-2">{hw.split(" - ")[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
