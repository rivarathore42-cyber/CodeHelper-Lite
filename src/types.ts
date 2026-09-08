export type TaskMode =
  | "completion"
  | "syntax_doctor"
  | "refactor"
  | "docstring"
  | "complexity";

export type CodeLanguage =
  | "python"
  | "typescript"
  | "javascript"
  | "rust"
  | "go"
  | "cpp"
  | "sql";

export interface InferenceParams {
  temperature: number;
  topP: number;
  maxTokens: number;
  repetitionPenalty: number;
  mode: TaskMode;
  language: CodeLanguage;
  systemPrompt: string;
}

export interface InferenceMetrics {
  latencyMs: number;
  ttftMs: number;
  tokensGenerated: number;
  tokensPerSecond: number;
  modelParams: string;
  memoryFootprint: string;
  contextWindow: string;
  modeUsed: string;
  language: string;
}

export interface ConsoleMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  metrics?: InferenceMetrics;
  mode?: TaskMode;
  language?: CodeLanguage;
  codeSnippet?: string;
  diagnostics?: string;
  isStreaming?: boolean;
}

export interface PresetPrompt {
  id: string;
  title: string;
  category: "Algorithms" | "Syntax Fix" | "Optimization" | "Type Systems" | "Concurrency";
  language: CodeLanguage;
  mode: TaskMode;
  code: string;
  description: string;
}

export interface LayerParameter {
  name: string;
  formula: string;
  shape: string;
  count: number;
  percentage: number;
  category: "Embedding" | "Attention" | "FFN (SwiGLU)" | "Norm & Head";
}

export interface TrainingStepMetric {
  step: number;
  trainLoss: number;
  valLoss: number;
  perplexity: number;
  learningRate: number;
  humanEvalPass1: number;
  gradNorm: number;
}

export interface ModelComparison {
  name: string;
  params: string;
  contextLen: string;
  memoryINT8: string;
  humanEvalPass1: string;
  mbppPass1: string;
  syntaxAccuracy: string;
  tokensPerSecCPU: string;
  isTargetModel?: boolean;
}
