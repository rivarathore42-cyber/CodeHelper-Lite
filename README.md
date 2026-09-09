# CodeHelper-Lite 🚀

**CodeHelper-Lite** is a lightweight, domain-specific 41.6M parameter Causal Transformer model designed specifically for local coding assistance, syntax checking, and multi-language code synthesis. Built for the Global Innovation Build Challenge V2 (Track 01: Foundational LLM Development).

---

## 🌟 Overview
Modern developers often rely on massive, resource-heavy LLMs that are over-engineered for basic daily tasks like syntax completion and refactoring. **CodeHelper-Lite** bridges this gap by providing an ultra-efficient, edge-ready foundational model that runs smoothly with low latency and high token-per-second throughput.

---

## ⚙️ Technical Architecture & Specifications
- **Model Type:** Causal Transformer Architecture
- **Parameter Count:** 41.6M parameters (Strictly optimized under the 50M limit)
- **Core Components:**
  - RoPE (Rotary Position Embeddings) for enhanced context handling.
  - SwiGLU Feed-Forward Networks for superior representation.
  - RMSNorm for stable and fast training convergence.
  - bfloat16 Mixed-Precision Optimization.
- **Frameworks:** Built using PyTorch, Hugging Face ecosystem concepts, and custom optimization scripts.

---

## 🎨 Developer Console & UI
The project includes a sleek, minimalist Dark Mode developer console featuring a professional **Sky Blue (`#0ea5e9`)** accent palette designed for offline evaluation, syntax highlighting, and seamless local code completions.

---

## 📂 Repository Structure
- `train_codehelper_lite.py` — Core training and model architecture script.
- `index.html` — The interactive developer console UI.
- `README.md` — Project documentation and setup guide.

---

## 🚀 How to Run & Use
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/CodeHelper-Lite.git](https://github.com/your-username/CodeHelper-Lite.git)
   cd CodeHelper-Lite

