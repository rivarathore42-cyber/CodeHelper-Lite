import React, { useState } from "react";
import { LineChart, TrendingDown, Award, Zap, CheckCircle2, BarChart2 } from "lucide-react";
import { TRAINING_METRICS_SERIES, MODEL_COMPARISONS } from "../data/modelArchitecture";

export const MetricsDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<"loss" | "perplexity" | "humaneval">("loss");

  // SVG Chart Dimensions
  const width = 600;
  const height = 240;
  const padding = 40;

  const steps = TRAINING_METRICS_SERIES.map((d) => d.step);
  const maxStep = Math.max(...steps);

  // Scaling helpers
  const getX = (step: number) => padding + (step / maxStep) * (width - 2 * padding);

  // Metric range calculations
  let getY: (val: number) => number;
  let pointsTrain: { x: number; y: number }[] = [];
  let pointsVal: { x: number; y: number }[] = [];

  if (selectedMetric === "loss") {
    const minLoss = 1.8;
    const maxLoss = 11.0;
    getY = (val: number) => height - padding - ((val - minLoss) / (maxLoss - minLoss)) * (height - 2 * padding);
    pointsTrain = TRAINING_METRICS_SERIES.map((d) => ({ x: getX(d.step), y: getY(d.trainLoss) }));
    pointsVal = TRAINING_METRICS_SERIES.map((d) => ({ x: getX(d.step), y: getY(d.valLoss) }));
  } else if (selectedMetric === "perplexity") {
    // Log scale for perplexity
    const minPpl = Math.log(7);
    const maxPpl = Math.log(35000);
    getY = (val: number) => height - padding - ((Math.log(val) - minPpl) / (maxPpl - minPpl)) * (height - 2 * padding);
    pointsVal = TRAINING_METRICS_SERIES.map((d) => ({ x: getX(d.step), y: getY(d.perplexity) }));
  } else {
    // HumanEval Pass@1 (0 to 45%)
    getY = (val: number) => height - padding - (val / 45) * (height - 2 * padding);
    pointsVal = TRAINING_METRICS_SERIES.map((d) => ({ x: getX(d.step), y: getY(d.humanEvalPass1) }));
  }

  const makeSvgPath = (pts: { x: number; y: number }[]) => {
    if (!pts.length) return "";
    return pts.reduce((acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x},${p.y}`, "");
  };

  return (
    <div className="bg-[#0f172a] border border-slate-800/90 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/90 pb-5">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <LineChart className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-100 font-sans tracking-tight">
              Pre-Training Loss Dynamics &amp; Evaluation Metrics
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              50,000 Optimization Steps
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5 max-w-2xl">
            Live loss trajectory during foundational pre-training on 2.4 Billion high-quality code tokens using AdamW and Cosine Annealing.
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedMetric("loss")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedMetric === "loss"
                ? "bg-sky-500 text-white font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Cross-Entropy Loss
          </button>
          <button
            onClick={() => setSelectedMetric("perplexity")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedMetric === "perplexity"
                ? "bg-sky-500 text-white font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Validation Perplexity
          </button>
          <button
            onClick={() => setSelectedMetric("humaneval")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedMetric === "humaneval"
                ? "bg-sky-500 text-white font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            HumanEval Pass@1 (%)
          </button>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-4">
            {selectedMetric === "loss" ? (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-sky-400 rounded"></span> Train Loss (Final: 2.02)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-emerald-400 rounded"></span> Validation Loss (Final: 2.12)
                </span>
              </>
            ) : selectedMetric === "perplexity" ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-amber-400 rounded"></span> Validation Perplexity (33,450 → 8.33)
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-emerald-400 rounded"></span> HumanEval-Lite Pass@1 (0.0% → 38.6%)
              </span>
            )}
          </div>
          <span>X: 0 to 50,000 Steps</span>
        </div>

        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[500px] text-slate-600">
            {/* Grid lines */}
            <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#1e293b" strokeDasharray="3 3" />
            <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#1e293b" strokeDasharray="3 3" />
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#334155" />
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#334155" />

            {/* Curves */}
            {selectedMetric === "loss" && (
              <>
                <path d={makeSvgPath(pointsTrain)} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                <path d={makeSvgPath(pointsVal)} fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
                {pointsVal.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="3" fill="#34d399" />
                ))}
              </>
            )}

            {selectedMetric === "perplexity" && (
              <>
                <path d={makeSvgPath(pointsVal)} fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                {pointsVal.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#fbbf24" />
                ))}
              </>
            )}

            {selectedMetric === "humaneval" && (
              <>
                <path d={makeSvgPath(pointsVal)} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                {pointsVal.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="4" fill="#10b981" />
                ))}
              </>
            )}

            {/* Labels */}
            <text x={padding} y={height - 15} fill="#64748b" fontSize="10" fontFamily="monospace">0</text>
            <text x={width / 2 - 15} y={height - 15} fill="#64748b" fontSize="10" fontFamily="monospace">25,000</text>
            <text x={width - padding - 25} y={height - 15} fill="#64748b" fontSize="10" fontFamily="monospace">50,000</text>
          </svg>
        </div>
      </div>

      {/* Model Benchmark Comparison Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-sky-400" />
          Model Benchmark Matrix (HumanEval &amp; MBPP)
        </h3>

        <div className="overflow-x-auto border border-slate-800/90 rounded-xl bg-[#0b0f19]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3.5 font-semibold">Model Candidate</th>
                <th className="p-3.5 font-semibold">Parameters</th>
                <th className="p-3.5 font-semibold">INT8 VRAM</th>
                <th className="p-3.5 font-semibold">HumanEval-Python (Pass@1)</th>
                <th className="p-3.5 font-semibold">MBPP (Pass@1)</th>
                <th className="p-3.5 font-semibold">Syntax Accuracy</th>
                <th className="p-3.5 font-semibold">CPU Speed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {MODEL_COMPARISONS.map((model, idx) => (
                <tr
                  key={idx}
                  className={`${
                    model.isTargetModel
                      ? "bg-sky-950/30 text-sky-200 font-semibold border-l-4 border-l-sky-400"
                      : "hover:bg-slate-900/40"
                  } transition`}
                >
                  <td className="p-3.5 flex items-center gap-2">
                    {model.isTargetModel && <span className="text-sky-400">⭐</span>}
                    <span className={model.isTargetModel ? "text-slate-100 font-bold" : "text-slate-300"}>
                      {model.name}
                    </span>
                  </td>
                  <td className={`p-3.5 ${model.isTargetModel ? "text-sky-400 font-bold" : ""}`}>{model.params}</td>
                  <td className={`p-3.5 ${model.isTargetModel ? "text-emerald-400 font-bold" : ""}`}>{model.memoryINT8}</td>
                  <td className="p-3.5">{model.humanEvalPass1}</td>
                  <td className="p-3.5">{model.mbppPass1}</td>
                  <td className={`p-3.5 ${model.isTargetModel ? "text-emerald-400 font-bold" : ""}`}>{model.syntaxAccuracy}</td>
                  <td className="p-3.5 text-sky-400 font-semibold">{model.tokensPerSecCPU}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
