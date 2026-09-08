import { PresetPrompt } from "../types";

export const BENCHMARK_PRESETS: PresetPrompt[] = [
  {
    id: "lru-cache",
    title: "LRU Cache Implementation (O(1))",
    category: "Algorithms",
    language: "python",
    mode: "completion",
    description: "Implement a thread-safe Least Recently Used (LRU) Cache with capacity eviction in O(1) get/put operations.",
    code: `class LRUCache:
    """
    Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
    All operations must run in O(1) average time complexity.
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        # TODO: Initialize hash map and doubly-linked list
        pass

    def get(self, key: int) -> int:
        # TODO: Return value and move node to head
        pass

    def put(self, key: int, value: int) -> None:
        # TODO: Insert or update key, evict LRU if capacity exceeded
        pass`,
  },
  {
    id: "async-memleak",
    title: "Diagnose Async Event Leak",
    category: "Syntax Fix",
    language: "typescript",
    mode: "syntax_doctor",
    description: "Identify syntax bugs, unhandled promise rejections, and event listener memory leaks in this Node.js stream handler.",
    code: `import { EventEmitter } from 'events';

class StreamPipeline {
  private emitter = new EventEmitter();
  private buffer: any[] = [];

  constructor() {
    // BUG: Missing listener cleanup causing leak
    this.emitter.on('data', (chunk) => {
      this.buffer.push(chunk)
    })
  }

  async processQueue(items: string[]) {
    items.forEach(async (item) => {
      // BUG: unhandled async in forEach & syntax error in try/catch
      try
        const res = await fetch(\`/api/transform/\${item}\`);
        const json = res.json();
        this.buffer.push(json);
      catch(e) {
        console.log("Error:" + e.message)
      }
    });
    return this.buffer;
  }
}`,
  },
  {
    id: "rust-borrow-checker",
    title: "Rust Lifetime & Borrow Fix",
    category: "Syntax Fix",
    language: "rust",
    mode: "syntax_doctor",
    description: "Resolve lifetime mismatch, double-borrow mutation bug, and missing trait bounds in Rust code.",
    code: `struct StringProcessor {
    cache: Vec<String>,
}

impl StringProcessor {
    fn new() -> Self {
        StringProcessor { cache: Vec::new() }
    }

    // ERROR: Returning reference with invalid lifetime & mutating while borrowed
    pub fn get_or_insert(&mut self, text: &str) -> &String {
        for s in &self.cache {
            if s == text {
                return s; // borrow error
            }
        }
        self.cache.push(text.to_string());
        self.cache.last().unwrap()
    }
}`,
  },
  {
    id: "nested-loop-refactor",
    title: "Refactor O(N²) Quadratic Search to O(N)",
    category: "Optimization",
    language: "python",
    mode: "refactor",
    description: "Optimize duplicate search and two-sum pairing algorithm to linear O(N) time using hash tables.",
    code: `def find_matching_pairs(users: list, transactions: list) -> list:
    """
    Very slow O(N * M) nested scan across large user and transaction logs.
    Refactor to O(N + M) hash-indexed linear lookup.
    """
    matches = []
    for user in users:
        for tx in transactions:
            if tx['user_id'] == user['id'] and tx['amount'] > 100:
                if tx['currency'] == user['preferred_currency']:
                    matches.append({
                        'username': user['name'],
                        'tx_id': tx['id'],
                        'amount': tx['amount']
                    })
    return matches`,
  },
  {
    id: "go-concurrency-worker",
    title: "Worker Pool with Graceful Cancellation",
    category: "Concurrency",
    language: "go",
    mode: "completion",
    description: "Build a bounded goroutine worker pool with context cancellation and error group synchronization.",
    code: `package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

type Job struct {
	ID    int
	Task  string
}

type Result struct {
	JobID  int
	Output string
	Err    error
}

// Implement WorkerPool that processes jobs with N workers
// Supports context cancellation and returns results channel
func RunWorkerPool(ctx context.Context, numWorkers int, jobs []Job) ([]Result, error) {
	// TODO: Implement channels, waitgroup, and worker loop
	return nil, nil
}`,
  },
  {
    id: "cpp-simd-dot-product",
    title: "High-Performance Vector Dot Product",
    category: "Optimization",
    language: "cpp",
    mode: "refactor",
    description: "Transform naive loop dot product into cache-aligned vectorization with loop unrolling and bounds checks.",
    code: `#include <vector>
#include <cstddef>

// Naive scalar loop. Refactor for vectorization/cache-locality & compile hints
float compute_dot_product(const std::vector<float>& a, const std::vector<float>& b) {
    float sum = 0.0f;
    for (size_t i = 0; i < a.size(); ++i) {
        sum += a[i] * b[i];
    }
    return sum;
}`,
  },
];
